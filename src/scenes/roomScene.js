import Player from "../player.js";
import Bullet from "../bullet.js";
import Enemy from "../Enemies/enemy.js";
import StaticEnemy from "../Enemies/staticEnemy.js";
import MeleeEnemy from "../Enemies/meeleEnemy.js";
import HealerEnemy from "../Enemies/healerEnemy.js";
import Candy, {getCandies} from "../candy.js";

//valores para e aura
const AURA_SLOW = 0.3; //todo va al 30% de velocidad
const AURA_DRAIN = 25; //energia que gasta por segundo
const AURA_RECHARGE = 10; //energia que recupera

//powerups
const AURA_DRAIN_UPGRADED = 15;
const MEDKIT_HEAL = 2; 

// Sala dentro de la mente de una persona 
export default class RoomScene extends Phaser.Scene {
    constructor() {
        super({ key: "room" });
    }

    // Recibe el nivel desde el parque
    //  this.scene.start("room", { levelId: ... })
    init(data) {
        this.levelId = data.levelId || 1;
        this.cleared = false;
    }


    create() {
        this.cameras.main.setBackgroundColor("#0d0b14");   // fondo oscuro de la mente

        //estado del aura
        this.slowFactor = 1; //velocidad del mundo, 1 es normal, 0.3 lento
        this.auraActivate = false; 
        this.auraEnergy = 100; //energia del aura, 100 lena
        //el reloj de la escena no se reinicia solo, por eso fallaba ek aura
        this.time.timeScale = 1;

        //mejoras
        this.powerUps = this.registry.get("powerUps");
        this.auraDrain = this.powerUps.hasUpgrade("aura") ? AURA_DRAIN_UPGRADED : AURA_DRAIN;

        this.createBackground();
        this.createMap();

        // Jugador con el aura alrededor
        this.aura = this.add.image(240, 350, "effects", 5).setScale(1.6).setAlpha(0.5);
        this.player = new Player(this, 240, 350).setScale(2);

        this.candies = this.add.group();
        this.candies.add(new Candy(this, 330, 260));        // vale 1
        this.candies.add(new Candy(this, 420, 420, 5));     // vale 5
        this.physics.add.overlap(this.player, this.candies, (player, candy) => candy.collect());

        this.createHUD();

        //capa azul q cure pantalla mientras va lento
        this.slowOverlay = this.add.rectangle(400, 300, 800, 600, 0x3b5bff, 0.2).setVisible(false);

        //SHIFT activa el aura
        this.input.keyboard.on("keydown-SHIFT", () => this.startAura());

        //q es botiquin
        this.input.keyboard.on("keydown-Q", () => this.useMedkit());

        // Prueba, K quita 1 de vida
        this.input.keyboard.on("keydown-K", () => {
            this.player.takeDamage(1);
        });
        
        // Prueba, C sala completada ,pantalla  victoria
        this.input.keyboard.on("keydown-C", () => {
            this.scene.start("result", { win: true, levelId: this.levelId });
        });

        // ESC pausa, se congela la sala y se abre el menú de pausa encima
        this.input.keyboard.on("keydown-ESC", () => {
            this.scene.pause();
            this.scene.launch("pause");
        });

        this.input.on("pointerdown", (pointer)=>{
            console.log(pointer.worldX, pointer.worldY); //coordenadas de donde haces click
            if (pointer.leftButtonDown()){
                this.player.shoot(pointer.worldX, pointer.worldY);
            }
        })

         // Colisiones
        this.playerBullets = this.physics.add.group({
            classType: Bullet,
            runChildUpdate: true
        })

        this.enemies = this.physics.add.group({
            classType: Enemy,
            runChildUpdate: true

        })

        this.enemyBullets = this.physics.add.group({
            classType: Bullet,
            runChildUpdate: true
        })

        this.physics.add.overlap(
            this.playerBullets,
            this.enemies,
            this.handleBulletEnemyCollision,
            null,
            this
        )

        this.physics.add.overlap(
            this.enemyBullets,
            this.player,
            this.handleBulletPlayerCollision,
            null,
            this
        )

        this.enemy = new Enemy(this, 570, 230).setScale(2).play("aggressor_idle");
        this.enemies.add(this.enemy);

        this.enemy = new MeleeEnemy(this, 520, 350).setScale(2).play("aggressor_idle");
        this.enemies.add(this.enemy);

        this.enemy = new HealerEnemy(this, 570, 430).setScale(2).play("martyr_idle");
        this.enemies.add(this.enemy);

        this.enemy = new StaticEnemy(this, 420, 300).setScale(2).play("paranoid_idle");
        this.enemies.add(this.enemy);

        this.physics.add.collider(this.player, this.wallsLayer);
        this.physics.add.collider(this.player, this.columnLayer);
        this.physics.add.collider(this.player, this.leftBridgeLayer);
        this.rightBridgeCol = this.physics.add.collider(this.player, this.rightBridgeLayer);

        this.physics.add.collider(this.enemies, this.wallsLayer);
        this.physics.add.collider(this.enemies, this.columnLayer);
        this.physics.add.collider(this.enemies, this.leftBridgeLayer);
        this.physics.add.collider(this.enemies, this.rightBridgeLayer);


        //this.physics.add.collider(this.playerBullets, this.wallsLayer);
        //this.physics.add.collider(this.enemyBullets, this.wallsLayer);


    }

    handleBulletPlayerCollision(player, bullet){
        bullet.destroy();
        player.takeDamage(1);
    }

    handleBulletEnemyCollision(bullet, enemy){
        if (enemy.takeDamage){
            let damage = this.player.damage; //1o 2 con la mejora de daño
            if (this.auraActive) damage *= 2; //si activada el jugador hace doble de daño
            enemy.takeDamage(damage);
        }
        bullet.destroy();
    }

    createMap(){
        const map = this.make.tilemap({key: 'nivel'});
        const tileset = map.addTilesetImage('nivelTileset', 'dungeon');

        this.groundLayer = map.createLayer('Ground', tileset);
        this.wallsLayer = map.createLayer('Walls', tileset);
        this.columnLayer = map.createLayer('Column', tileset);
        this.leftBridgeLayer = map.createLayer('LeftBridge', tileset);
        this.rightBridgeLayer = map.createLayer('RightBridge', tileset).setAlpha(0.35);

        this.blockedIcon = this.add.image(725, 350, "icons", 16).setScale(2.5);  

        const layers = [this.leftBridgeLayer, this.rightBridgeLayer, this.groundLayer, this.wallsLayer, this.columnLayer];
        layers.forEach(layer =>{
            layer.setScale(2);
            layer.setPosition(0, 110);
        })

        this.wallsLayer.setCollisionByExclusion([-1]);
        this.leftBridgeLayer.setCollisionByExclusion([-1]);
        this.rightBridgeLayer.setCollisionByExclusion([-1]);
        this.columnLayer.setCollisionByExclusion([-1]);
    }

    // Estrellas  flotando en el fondo
    createBackground() {
        for (let i = 0; i < 90; i++) {
            let x = Phaser.Math.Between(0, 800);
            let y = Phaser.Math.Between(100, 600);
            this.add.circle(x, y, 1, 0xffffff, 0.4);
        }
        // Objetos del tileset semitransparentes
        this.add.image(60, 170, "dungeon", 97).setScale(3).setAlpha(0.35);
        this.add.image(740, 190, "dungeon", 367).setScale(3).setAlpha(0.35).setAngle(15);
        this.add.image(70, 500, "dungeon", 102).setScale(3).setAlpha(0.35);
        this.add.image(735, 520, "dungeon", 197).setScale(3).setAlpha(0.35).setAngle(-10);
    }

    unlockBridge() {
        this.cleared = true;
        this.rightBridgeLayer.setAlpha(1);
        this.rightBridgeCol.destroy();
        //this.rightBridge.forEach(piece => piece.setAlpha(1));
        //this.rightBridge[0].setFillStyle(0xd9b38c);   // color más claro
        this.blockedIcon.destroy();
    }


    // ui
    createHUD() {
        this.add.rectangle(400, 52, 800, 104, 0x000000, 0.45);   // franja oscura

        // Retrato
        this.add.nineslice(52, 48, "buttons", 0, 26, 26, 5, 5, 5, 5).setScale(3);
        this.add.image(52, 48, "player", "face").setScale(3);

        // Aura 10 = verde llena
        this.auraLabel = this.add.text(104, 8, "AURA ELEVADA", { font: "bold 14px monospace", fill: "#7fd6ff" });
        this.auraBar = this.add.image(104, 22, "auraBars", 10).setOrigin(0, 0).setScale(4);

        // Vida texto + barra de 5 rayas 
        this.lifeText = this.add.text(104, 84, "VIDA: " + this.player.life, { font: "bold 14px monospace", fill: "#f3e9e4" }).setOrigin(0, 0.5);
        this.lifeBar = this.add.image(190, 84, "HealthBars", 0).setScale(3).setOrigin(0, 0.5);

        // Sala actual
        this.add.text(14, 110, "SALA 1/3", { font: "bold 16px monospace", fill: "#f3e9e4", backgroundColor: "#000000aa", padding: { x: 6, y: 3 } });

        // Caramelos y arma
        this.add.image(625, 28, "candy").setScale(1.5);
        this.candyText = this.add.text(643, 28, "", { font: "bold 16px monospace", fill: "#f3e9e4" }).setOrigin(0, 0.5);
        this.updateCandyText();
        this.add.nineslice(696, 72, "buttons", 4, 60, 13, 5, 5, 5, 5).setScale(3);
        let hasShotgun = this.powerUps.hasUpgrade("shotgun");
        this.add.image(624, 72, "dungeon", hasShotgun ? "swordBlue" : "sword").setScale(1.2).setAngle(45);
        this.add.text(644, 72, hasShotgun ? "Escopeta" : "Pistola", { font: "bold 14px monospace", fill: "#f3e9e4" }).setOrigin(0, 0.5);

        // Consumibles
        this.add.image(340, 28, "effects", 0).setScale(0.6);
        this.shieldText = this.add.text(360, 28, "", { font: "bold 14px monospace", fill: "#f3e9e4" }).setOrigin(0, 0.5);
        this.add.image(340, 72, "dungeon", 424).setScale(2);
        this.medkitText = this.add.text(360, 72, "", { font: "bold 14px monospace", fill: "#f3e9e4" }).setOrigin(0, 0.5);
        this.updateConsumablesHUD();

        //cuando cambian los consumibles o los caramelos se actualiza el HUD 
        this.powerUps.on("consumables-changed", this.updateConsumablesHUD, this);
        this.registry.events.on("changedata-candies", this.updateCandyText, this);
        //al cerrar la escena dejamos de escuchar, si no los listeners seguirian vivos
        this.events.once(Phaser.Scenes.Events.SHUTDOWN, () => {
            this.powerUps.off("consumables-changed", this.updateConsumablesHUD, this);
            this.registry.events.off("changedata-candies", this.updateCandyText, this);
        });


        // Controles abajo
        this.add.text(400, 585, "WASD mover · Click disparar · SHIFT aura · ESC pausa · Q botiquín", { font: "bold 12px monospace", fill: "#b8a9a3" }).setOrigin(0.5);
    }

    updateCandyText(){
        this.candyText.setText("Caramelos: " + getCandies(this.registry));
    }

    updateConsumablesHUD(){
        this.shieldText.setText("Escudos: " + this.powerUps.getCount("shield"));
        this.medkitText.setText("Botiquines: " + this.powerUps.getCount("medkit") + " (Q)");
    }

    useMedkit(){
        if(this.player.life >= this.player.maxLife) return;
        if(this.powerUps.useConsumable("medkit")){
            this.player.heal(MEDKIT_HEAL);
        }
    }

    //aura
    startAura(){
        //solo activar si no lo estaba ya y si la barra esta llena
        if (this.auraActive || this.auraEnergy < 100) return;

        this.auraActive = true;
        this.setSlowFactor(AURA_SLOW);

        //visual
        this.slowOverlay.setVisible(true);
        this.aura.setScale(2.4).setAlpha(0.9);
        this.auraLabel.setText("AURA REDUCIDA").setColor("#ff8fb8");
    }

    endAura(){
        this.auraActive = false;
        this.setSlowFactor(1);

        //resetear a como estaba
         //visual
        this.slowOverlay.setVisible(false);
        this.aura.setScale(1.6).setAlpha(0.5);
        this.auraLabel.setText("AURA ELEVADA").setColor("#7fd6ff");
    }

    //cambiar velocidad mundo
    setSlowFactor(newFactor){
        //balas enemigas ralentozar
        let change = newFactor / this.slowFactor;
        for (let bullet of this.enemyBullets.getChildren()){
            bullet.body.velocity.scale(change);
        }

        //animaciones enemigos lentas
        for (let enemy of this.enemies.getChildren()){
            enemy.anims.timeScale = newFactor;
        }

        //relojes de la escena
        this.time.timeScale = newFactor;

        this.slowFactor = newFactor;
    }

    //gasta enegi si esta ctivada y la suma si no
    updateAura(dt){
        let seconds = dt / 1000; //dt viene en ms

        if(this.auraActive){
            this.auraEnergy -= this.auraDrain * seconds;
            if(this.auraEnergy <= 0){
                this.auraEnergy = 0;
                this.endAura();
            }
        }
        else{
            this.auraEnergy = Math.min(100, this.auraEnergy + AURA_RECHARGE * seconds);
        }

        //barra
        let frame = 10 + Math.round((1 - this.auraEnergy / 100) * 4);
        this.auraBar.setFrame(frame);
    }

    update(t, dt) {
        // WIP de desbloqueo de caminosss
        if (!this.cleared && this.enemies.countActive(true) === 0) {
            this.unlockBridge();
        }

        // altura del puente hardcodeada por ahora oofff
        if (this.cleared && this.player.x > 700 && Math.abs(this.player.y - 350) < 32) {
            this.scene.start("bonus", { levelId: this.levelId });
            return;
        }

        // El aura sigue al jugador
        this.aura.x = this.player.x;
        this.aura.y = this.player.y;

        this.updateAura(dt);

        // Cada frame copiamos la vida del jugador al HUD
        this.lifeText.setText("VIDA: " + this.player.life);
        this.lifeBar.setFrame(Math.max(0, 5 - this.player.life)); //con 6 de vida se queda llena

        // Sin vida, pantalla  Gameover
        if (this.player.life === 0) {
            this.scene.start("result", { win: false, levelId: this.levelId });
        }
    }
}