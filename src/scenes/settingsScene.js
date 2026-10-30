// Ajustes: solo colocados, los botones todavía no cambian nada.
export default class SettingsScene extends Phaser.Scene {
    constructor() {
        super({ key: "settings" });
    }

    create() {
        this.cameras.main.setBackgroundColor("#14111a");

        // Panel 
        this.add.nineslice(400, 290, "buttons", 0, 187, 140, 5, 5, 5, 5).setScale(3);
        this.add.text(400, 125, "AJUSTES", { font: "bold 32px monospace", fill: "#f3e9e4" }).setOrigin(0.5);

        let style = { font: "bold 18px monospace", fill: "#f3e9e4" };

        // Música
        // menos, barra, más 
        this.add.text(170, 198, "Música", style);
        this.add.image(330, 210, "icons", 18).setScale(3);
        this.add.image(460, 210, "auraBars", 25).setScale(4.5);   // barra rosa
        this.add.image(590, 210, "icons", 8).setScale(3);

        // Efectos
        this.add.text(170, 278, "Efectos", style);
        this.add.image(330, 290, "icons", 18).setScale(3);
        this.add.image(460, 290, "auraBars", 5).setScale(4.5);    // barra azul
        this.add.image(590, 290, "icons", 8).setScale(3);

        // Pantalla completa
        this.add.text(170, 358, "Pantalla completa", style);
        this.add.image(590, 370, "icons", 10).setScale(3);

        this.createButton(400, 470, "Volver", "title");
    }

    // Igual que en el título
    createButton(x, y, label, sceneKey) {
        let bg = this.add.nineslice(x, y, "buttons", 0, 80, 15, 5, 5, 5, 5).setScale(3);
        this.add.text(x, y - 2, label, { font: "bold 18px monospace", fill: "#f3e9e4" }).setOrigin(0.5);
        bg.setInteractive();
        bg.on("pointerover", () => bg.setTint(0xffc9e8));
        bg.on("pointerout", () => bg.clearTint());
        bg.on("pointerup", () => this.scene.start(sceneKey));
    }
}