// Menú de pausa
//  se abre ENCIMA de la sala con ESC 
export default class PauseScene extends Phaser.Scene {
    constructor() {
        super({ key: "pause" });
    }

    create() {
        // Oscurece la sala que se ve detrás
        this.add.rectangle(400, 300, 800, 600, 0x000000, 0.6);

        this.add.nineslice(400, 300, "buttons", 0, 113, 110, 5, 5, 5, 5).setScale(3);
        this.add.text(400, 185, "PAUSA", { font: "bold 30px monospace", fill: "#f3e9e4" }).setOrigin(0.5);

        this.createButton(400, 250, "Continuar", () => this.resumeRoom());
        this.createButton(400, 310, "Salir al parque", () => this.leaveTo("park"));
        this.createButton(400, 370, "Salir al título", () => this.leaveTo("title"));

        // ESC otra vez también quita la pausa
        this.input.keyboard.on("keydown-ESC", () => this.resumeRoom());
    }

    // Quita la pausa
    //  la sala sigue donde estaba y se cierra este menú
    resumeRoom() {
        this.scene.resume("room");
        this.scene.stop();
    }

    // Cierra la sala y va a otra escena
    leaveTo(sceneKey) {
        this.scene.stop("room");
        this.scene.start(sceneKey);
    }

    // Igual que en el título, pero en vez de una escena recibe la función que hace el botón
    createButton(x, y, label, onClick) {
        let bg = this.add.nineslice(x, y, "buttons", 0, 80, 15, 5, 5, 5, 5).setScale(3);
        this.add.text(x, y - 2, label, { font: "bold 18px monospace", fill: "#f3e9e4" }).setOrigin(0.5);
        bg.setInteractive();
        bg.on("pointerover", () => bg.setTint(0xffc9e8));
        bg.on("pointerout", () => bg.clearTint());
        bg.on("pointerup", onClick);
    }
}