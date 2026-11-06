import Player from "../player.js";

// sala final del personaje que desbloquea el recuerdo esencial
export default class BonusScene extends Phaser.Scene {
    constructor() {
        super({ key: "bonus" });
    }

    init(data) {
        this.levelId = data.levelId || 1;
        this.triggered = false;
    }

    create() {
        this.cameras.main.setBackgroundColor("#0d0b14");

        // isla de tamaño común
        this.add.rectangle(400, 570, 500, 24, 0x3a2838);
        this.add.tileSprite(150, 188, 500, 372, "dungeon", 225).setOrigin(0, 0).setTileScale(3);
        this.add.tileSprite(150, 140, 500, 48, "dungeon", 33).setOrigin(0, 0).setTileScale(3);
        this.add.rectangle(400, 350, 500, 420).setStrokeStyle(6, 0x2b1d2a);

        // copia del puente qe hay por aahora de placeholder
        this.add.rectangle(75, 350, 150, 64, 0x8a6244);
        this.add.rectangle(75, 316, 150, 6, 0x4a3222);
        this.add.rectangle(75, 384, 150, 6, 0x4a3222);

        this.player = new Player(this, 240, 350).setScale(2);

        // recuerdo esencial,, por ahora usa el sprite del personaje
        this.memory = this.physics.add.sprite(400, 350, "people", this.levelId - 1).setScale(2);
        // pequeña animacion flotante,, target es el qué anima, y es la posicion a la que queremos llegar, duration es el tiempo que tarda en llegar
        // yoyo hace que vuelva a la pos og y repeat hace que entre en bucle
        this.tweens.add({ targets: this.memory, y: 340, duration: 900, yoyo: true, repeat: -1 });

        // cuando tocamos el sprite se muestra el recuerdo esencial
        this.physics.add.overlap(this.player, this.memory, this.showMemory, null, this);
    }

    showMemory() {
        if (this.triggered) return;
        this.triggered = true;
        this.player.canMove = false;

        this.add.rectangle(400, 300, 800, 600, 0x000000, 0.85).setDepth(10);

        // imagen del recuerdo en funcion del nivel
        let key = "memory" + this.levelId;
        if (!this.textures.exists(key)) key = "level" + this.levelId;
        const img = this.add.image(400, 265, key).setDepth(11);
        img.setScale(Math.min(700 / img.width, 440 / img.height));

        // botón para terminar el nivel
        const bg = this.add.nineslice(400, 540, "buttons", 0, 80, 15, 5, 5, 5, 5).setScale(3).setDepth(12);
        this.add.text(400, 538, "BORRAR RECUERDO", { font: "bold 18px monospace", fill: "#f3e9e4" })
            .setOrigin(0.5).setDepth(13);
        bg.setInteractive({ useHandCursor: true });
        bg.on("pointerover", () => bg.setTint(0xffc9e8));
        bg.on("pointerout", () => bg.clearTint());
        bg.on("pointerup", () => {
            this.scene.start("result", { win: true, levelId: this.levelId });
        });
    }
}