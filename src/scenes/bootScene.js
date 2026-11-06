//escena que  arga todas las imagenes una vez, recorta lo q haga falta. crea las ani amciones y pasa al titulo
export default class BootScene extends Phaser.Scene{
    constructor(){
        super({ key: "boot"});
    }


preload(){
         // Imagen entera
        this.load.image("baseBackground", "assets/Base.png");
        this.load.image("titleImage", "assets/titlescreen.png");

        // imagen partida en cuadrados iguales (frames)
        this.load.spritesheet("player", "assets/MainCharacterAnim.png", { frameWidth: 32, frameHeight: 42 });
        this.load.spritesheet("people", "assets/CharactersLevelSelect.png", { frameWidth: 31, frameHeight: 42 });
        this.load.spritesheet("paranoid", "assets/Enemies/pipo-nekonin027.png", { frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet("martyr", "assets/Enemies/pipo-nekonin019.png", { frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet("aggressor", "assets/Enemies/pipo-nekonin020.png", { frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet("buttons", "assets/Buttons/ClassicalButtons.png", { frameWidth: 16, frameHeight: 16 });
        this.load.spritesheet("icons", "assets/Buttons/freebuttons2.png", { frameWidth: 16, frameHeight: 16 });
        this.load.spritesheet("effects", "assets/Effects.png", { frameWidth: 48, frameHeight: 48 });
        this.load.spritesheet("dungeon", "assets/LevelTileset/0x72_16x16DungeonTileset.v5.png", { frameWidth: 16, frameHeight: 16 });

        // HealthBars.png se carga 2 veces porque tiene barras de 2 tamaños
        this.load.spritesheet("HealthBars", "assets/HealthBars.png", { frameWidth: 32, frameHeight: 16 });
        this.load.spritesheet("auraBars", "assets/HealthBars.png", { frameWidth: 48, frameHeight: 16 });

        // Parque
        this.load.image("grass", "assets/CourseSelectMap/TX Tileset Grass.png");
        this.load.image("parkProps", "assets/CourseSelectMap/TX Props.png");
        this.load.image("shadows", "assets/CourseSelectMap/TX Shadow.png");
        this.load.image("plants", "assets/CourseSelectMap/TX Plant.png");
        this.load.image("plantShadows", "assets/CourseSelectMap/TX Shadow Plant.png");
        this.load.image("structures", "assets/CourseSelectMap/TX Struct.png");
        this.load.image("shopkeeper", "assets/CourseSelectMap/TX Player.png");

        // Casa
        this.load.image("stoneGround", "assets/CourseSelectMap/TX Tileset Stone Ground.png");
        this.load.image("walls", "assets/CourseSelectMap/TX Tileset Wall.png");


        for (let i = 1; i <= 10; i++) {
            // imagenes de los niveles
            this.load.image("level" + i, "assets/Level" + i + ".png");
            // imagenes de las memorias
            this.load.image("memory" + i, "assets/Memories/memory" + i + ".png");
        }

        



        // Bala
        this.load.image("bullet", "assets/blue_bullet.png");
}

create() {
    this.createFrames();
    this.createAnims();
    this.scene.start("title");
}

// Algunas imágenes tienen objetos de distintos tamaños
//add(nombre, 0, x, y, ancho, alto)
createFrames() {
        const props = this.textures.get("parkProps");
        props.add("fountain", 0, 352, 268, 96, 74);
        props.add("bench", 0, 291, 18, 58, 43);
        props.add("statue", 0, 444, 19, 43, 75);
        props.add("sign", 0, 98, 159, 29, 34);
        props.add("crate", 0, 159, 17, 34, 48);
        props.add("chest", 0, 95, 29, 34, 33);
        props.add("door", 0, 26, 102, 43, 52);     
        props.add("barrel", 0, 161, 152, 30, 38);  
        props.add("vase", 0, 164, 216, 23, 36);    

        const shadows = this.textures.get("shadows");
        shadows.add("bench", 0, 294, 35, 62, 26);
        shadows.add("statue", 0, 445, 53, 40, 41);

        const plants = this.textures.get("plants");
        plants.add("tree1", 0, 23, 13, 115, 141);
        plants.add("tree2", 0, 160, 16, 99, 138);
        plants.add("bush", 0, 215, 184, 49, 44);

        const plantShadows = this.textures.get("plantShadows");
        plantShadows.add("tree1", 0, 47, 99, 88, 54);
        plantShadows.add("tree2", 0, 172, 104, 84, 48);

        this.textures.get("grass").add("grassTile", 0, 0, 0, 32, 32);
        this.textures.get("structures").add("arch", 0, 407, 26, 82, 66);
        this.textures.get("shopkeeper").add("shopkeeper", 0, 6, 14, 21, 44);
        this.textures.get("player").add("face", 0, 8, 6, 18, 18);
        this.textures.get("dungeon").add("sword", 0, 192, 32, 16, 32);  // icono del arma
        this.textures.get("dungeon").add("swordBlue", 0, 208, 0, 16, 32); // icono de la escopeta (tienda)
        this.textures.get("stoneGround").add("stoneTile", 0, 0, 0, 96, 96); // losa del suelo (casa)
        this.textures.get("walls").add("wallStrip", 0, 32, 192, 128, 64);   // tira de pared (casa)
    }


    // Animaciones
    //clave, frames, velocidad y repetir -1 = en bucle
    createAnims() {
        this.anims.create({
            key: "player_down",
            frames: this.anims.generateFrameNumbers("player", { start: 0, end: 2 }),
            frameRate: 6,
            repeat: -1
        });
        
        this.anims.create({
            key: "player_up",
            frames: this.anims.generateFrameNumbers("player", { start: 3, end: 5 }),
            frameRate: 6,
            repeat: -1
        });
        this.anims.create({
            key: "player_left",
            frames: this.anims.generateFrameNumbers("player", { start: 6, end: 8 }),
            frameRate: 6,
            repeat: -1
        });
        this.anims.create({
            key: "player_right",
            frames: this.anims.generateFrameNumbers("player", { start: 9, end: 11 }),
            frameRate: 6,
            repeat: -1
        });
        

        // Los 3 enemigos tienen la misma animación para cada uno
        let enemies = ["paranoid", "martyr", "aggressor"];
        for (let i = 0; i < enemies.length; i++) {
            this.anims.create({
                key: enemies[i] + "_idle",
                frames: this.anims.generateFrameNumbers(enemies[i], { start: 0, end: 2 }),
                frameRate: 6,
                repeat: -1
            });
        }
    }
}