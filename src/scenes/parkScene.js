import Player from "../player.js";

// Parque 
export default class ParkScene extends Phaser.Scene {
    constructor() {
        super({ key: "park" });
    }

    create() {
        // Césped
        // tileSprite repite un trozo como un mosaico
        // setTileScale agranda los trozos
        this.add.tileSprite(0, 0, 800, 600, "grass", "grassTile").setOrigin(0, 0).setTileScale(1.5);

        // Plaza de piedra
        this.add.rectangle(400, 535, 90, 130, 0x9b968a);
        this.add.ellipse(400, 290, 600, 420, 0x9b968a).setStrokeStyle(6, 0x6f6a60);

        // Fuente en el centro
        this.add.image(400, 290, "parkProps", "fountain").setScale(1.4);

        // arboles con su sombra,la sombra va primero para q quede debajo
        this.add.image(61, 159, "plantShadows", "tree1").setScale(1.5);
        this.add.image(45, 95, "plants", "tree1").setScale(1.5);
        this.add.image(767, 164, "plantShadows", "tree2").setScale(1.5);
        this.add.image(760, 100, "plants", "tree2").setScale(1.5);
        this.add.image(30, 330, "plants", "bush").setScale(1.5);
        this.add.image(770, 330, "plants", "bush").setScale(1.5);
        this.add.image(300, 560, "plants", "bush").setScale(1.5);

        // Bancos y estatua con sombra
        this.add.image(258, 53, "shadows", "bench").setScale(1.5);
        this.add.image(250, 40, "parkProps", "bench").setScale(1.5);
        this.add.image(558, 53, "shadows", "bench").setScale(1.5);
        this.add.image(550, 40, "parkProps", "bench").setScale(1.5);
        this.add.image(399, 50, "shadows", "statue").setScale(1.2);
        this.add.image(400, 30, "parkProps", "statue").setScale(1.2);

        this.createPeople();
        this.createShop();

        // Arco para volver a casa
        this.add.image(705, 520, "structures", "arch").setScale(1.3);
        this.add.text(705, 470, "CASA", { font: "bold 14px monospace", fill: "#ffffff", backgroundColor: "#3b322c", padding: { x: 6, y: 2 } }).setOrigin(0.5);

        // Jugador
        this.player = new Player(this, 400, 555).setScale(1.5);

        this.createCounters();
    }

    // Las 10 personas en círculo. El frame i es la persona i+1
    createPeople() {
        let positions = [
            [473, 115], [590, 175], [635, 270], [590, 365], [473, 425],
            [327, 425], [210, 365], [165, 270], [210, 175], [327, 115]
        ];
        for (let i = 0; i < positions.length; i++) {
            let x = positions[i][0];
            let y = positions[i][1];
            let person = this.add.sprite(x, y, "people", i).setScale(1.4);

            // Número de nivel debajo de cada persona
            this.add.text(x, y + 32, String(i + 1), { font: "bold 11px monospace", fill: "#ffffff", backgroundColor: "#00000088", padding: { x: 3, y: 0 } }).setOrigin(0.5, 0);

            // Click en una persona- entra mente 
            person.setInteractive();
            person.on("pointerup", () => this.scene.start("room"));
        }
    }

    // Puesto de la tienda abajo a la izquierda
    createShop() {
        this.add.image(45, 520, "parkProps", "crate").setScale(1.5);
        this.add.image(150, 540, "parkProps", "chest").setScale(1.5);
        this.add.image(100, 530, "shopkeeper", "shopkeeper").setScale(1.5);
        this.add.image(100, 455, "parkProps", "sign").setScale(1.5);
        this.add.text(100, 420, "TIENDA", { font: "bold 14px monospace", fill: "#ffffff", backgroundColor: "#6b4a33", padding: { x: 6, y: 2 } }).setOrigin(0.5);
    }

    // Almas, izquierda
    // mentes completadas, derecha
    createCounters() {
        this.add.nineslice(85, 30, "buttons", 0, 50, 15, 5, 5, 5, 5).setScale(3);
        this.add.circle(32, 30, 8, 0x7fd6ff);   // alma (de momento un círculo)
        this.add.text(52, 30, "Almas: 0", { font: "bold 16px monospace", fill: "#f3e9e4" }).setOrigin(0, 0.5);

        this.add.nineslice(715, 30, "buttons", 0, 50, 15, 5, 5, 5, 5).setScale(3);
        this.add.text(715, 30, "Mentes 0/10", { font: "bold 16px monospace", fill: "#f3e9e4" }).setOrigin(0.5);
    }
}