import Player from "../player.js";

// Sala dentro de la mente de una persona 
export default class RoomScene extends Phaser.Scene {
    constructor() {
        super({ key: "room" });
    }

    create() {
        this.cameras.main.setBackgroundColor("#0d0b14");   // fondo oscuro de la mente

        this.createBackground();
        this.createIsland();
        this.createBridges();

        // Jugador con el aura alrededor
        this.aura = this.add.image(240, 350, "effects", 5).setScale(1.6).setAlpha(0.5);
        this.player = new Player(this, 240, 350).setScale(2);

        this.createEnemies();
        this.createBullets();
        this.createHUD();

        // Prueba, K quita 1 de vida
        this.input.keyboard.on("keydown-K", () => {
            this.player.takeDamage(1);
        });
    }

    // Estrellas y "recuerdos" flotando en el fondo
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

    // Isla
    //  grosor, suelo, pared, borde y antorchas
    createIsland() {
        this.add.rectangle(400, 570, 500, 24, 0x3a2838);   // grosor de la isla
        // Frame = fila * 32 + columna en el tileset 
        // 225 = suelo, 33 = ladrillo
        this.add.tileSprite(150, 188, 500, 372, "dungeon", 225).setOrigin(0, 0).setTileScale(3);
        this.add.tileSprite(150, 140, 500, 48, "dungeon", 33).setOrigin(0, 0).setTileScale(3);
        this.add.rectangle(400, 350, 500, 420).setStrokeStyle(6, 0x2b1d2a);   // borde

        // Antorchas: llama (frame 296) encima del soporte (frame 328)
        let torchX = [270, 400, 530];
        for (let i = 0; i < torchX.length; i++) {
            this.add.image(torchX[i], 148, "dungeon", 296).setScale(2);
            this.add.image(torchX[i], 180, "dungeon", 328).setScale(2);
        }
    }

    // Puente desbloqueado (izquierda) y bloqueado (derecha, transparente y con una X)
    createBridges() {
        this.add.rectangle(75, 350, 150, 64, 0x8a6244);
        this.add.rectangle(75, 316, 150, 6, 0x4a3222);   // barandillas
        this.add.rectangle(75, 384, 150, 6, 0x4a3222);

        this.add.rectangle(725, 350, 150, 64, 0x8a6244).setAlpha(0.35);
        this.add.rectangle(725, 316, 150, 6, 0x4a3222).setAlpha(0.35);
        this.add.rectangle(725, 384, 150, 6, 0x4a3222).setAlpha(0.35);
        this.add.image(725, 350, "icons", 16).setScale(2.5);   // X = bloqueado
    }

    // enemigos con baras de vida
    createEnemies() {
        this.add.sprite(570, 230, "paranoid", 1).setScale(2).play("paranoid_idle");
        this.add.image(570, 188, "healthBars", 74).setScale(2);

        this.add.sprite(570, 350, "martyr", 1).setScale(2).play("martyr_idle");
        this.add.image(570, 308, "healthBars", 76).setScale(2);

        this.add.sprite(570, 470, "aggressor", 1).setScale(2).play("aggressor_idle");
        this.add.image(570, 428, "healthBars", 74).setScale(2);
    }

    // Balas random de ejemplpo
    createBullets() {
        // Anillo de 12 balas alrededor del Paranoico
        for (let i = 0; i < 12; i++) {
            let angle = Phaser.Math.DegToRad(i * 30);
            this.add.circle(570 + Math.cos(angle) * 70, 230 + Math.sin(angle) * 70, 6, 0xff5fa2);
        }
        // Disparos del jugador hacia el Mártir
        for (let x = 290; x < 530; x += 60) {
            this.add.rectangle(x, 350, 14, 6, 0xffe066);
        }
        // Alma soltada por un enemigo
        this.add.circle(470, 515, 8, 0x7fd6ff);
    }

    // ui
    createHUD() {
        this.add.rectangle(400, 52, 800, 104, 0x000000, 0.45);   // franja oscura

        // Retrato
        this.add.nineslice(52, 48, "buttons", 0, 26, 26, 5, 5, 5, 5).setScale(3);
        this.add.image(52, 48, "player", "face").setScale(3);

        // Aura 10 = verde llena
        this.add.text(104, 8, "AURA ELEVADA", { font: "bold 14px monospace", fill: "#7fd6ff" });
        this.add.image(104, 22, "auraBars", 10).setOrigin(0, 0).setScale(4);

        // Vida texto + barra de 5 rayas 
        this.lifeText = this.add.text(104, 84, "VIDA: " + this.player.life, { font: "bold 14px monospace", fill: "#f3e9e4" }).setOrigin(0, 0.5);
        this.lifeBar = this.add.image(190, 84, "healthBars", 0).setScale(3).setOrigin(0, 0.5);

        // Sala actual
        this.add.text(14, 110, "SALA 1/3", { font: "bold 16px monospace", fill: "#f3e9e4", backgroundColor: "#000000aa", padding: { x: 6, y: 3 } });

        // Almas y arma 
        this.add.circle(650, 28, 8, 0x7fd6ff);
        this.add.text(668, 28, "Almas: 0", { font: "bold 16px monospace", fill: "#f3e9e4" }).setOrigin(0, 0.5);
        this.add.nineslice(696, 72, "buttons", 4, 60, 13, 5, 5, 5, 5).setScale(3);
        this.add.image(624, 72, "dungeon", "sword").setScale(1.2).setAngle(45);
        this.add.text(644, 72, "Pistola", { font: "bold 14px monospace", fill: "#f3e9e4" }).setOrigin(0, 0.5);

        // Controles abajo
        this.add.text(400, 585, "WASD mover · Click disparar · SHIFT aura · ESC pausa", { font: "bold 12px monospace", fill: "#b8a9a3" }).setOrigin(0.5);
    }

    update() {
        // El aura sigue al jugador
        this.aura.x = this.player.x;
        this.aura.y = this.player.y;

        // Cada frame copiamos la vida del jugador al HUD
        this.lifeText.setText("VIDA: " + this.player.life);
        this.lifeBar.setFrame(5 - this.player.life);
    }
}