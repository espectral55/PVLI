import Player from "../player.js";

// Casa del protagonista 
// Al hacer click en la puerta se sale al parque.
export default class HouseScene extends Phaser.Scene {
    constructor() {
        super({ key: "house" });
    }

    create() {
        this.cameras.main.setBackgroundColor("#14111a");

        // Suelo de losas y pared de ladrillo 
        // tileSprite = mosaico
        this.add.tileSprite(160, 206, 480, 324, "stoneGround", "stoneTile").setOrigin(0, 0);
        this.add.tileSprite(160, 110, 480, 96, "walls", "wallStrip").setOrigin(0, 0).setTileScale(1.5);

        // Borde de la habitación rectángulo sin relleno, solo borde
        this.add.rectangle(400, 320, 480, 420).setStrokeStyle(10, 0x3b322c);

        // Puerta en el centro de la pared vaa parque
        let door = this.add.image(400, 168, "parkProps", "door").setScale(1.5);
        door.setInteractive();
        door.on("pointerup", () => this.scene.start("park"));

        // Muebles
        this.add.image(215, 270, "parkProps", "chest").setScale(1.5);
        this.add.image(215, 470, "parkProps", "crate").setScale(1.5);
        this.add.image(590, 250, "parkProps", "barrel").setScale(1.5);
        this.add.image(590, 470, "parkProps", "vase").setScale(1.5);

        // Cama,  no hay sprite, así que son dos rectángulos 
        this.add.rectangle(330, 300, 70, 110, 0x7a5c8f).setStrokeStyle(3, 0x3b2a45);
        this.add.rectangle(330, 262, 56, 24, 0xe8dff0);

        // Jugador
        this.player = new Player(this, 400, 420).setScale(1.5);

        this.add.text(160, 544, "CASA", { font: "bold 18px monospace", fill: "#b8a9a3" });
    }
}