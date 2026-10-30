// Créditos
export default class CreditsScene extends Phaser.Scene {
    constructor() {
        super({ key: "credits" });
    }

    create() {
        this.cameras.main.setBackgroundColor("#14111a");
        this.add.nineslice(400, 280, "buttons", 0, 200, 153, 5, 5, 5, 5).setScale(3);

        this.add.text(400, 85, "CRÉDITOS", { font: "bold 32px monospace", fill: "#f3e9e4" }).setOrigin(0.5);
        this.add.text(400, 125, "Burnt Bistec", { font: "bold 18px monospace", fill: "#f4a8d9" }).setOrigin(0.5);

        //align centra todas las líneas
        let team = "Álvaro Sosa Rodríguez\nRafael Campos García\nAlexia Pérez Santana\nLaura Garay Zubiaguirre";
        this.add.text(400, 220, team, { font: "bold 18px monospace", fill: "#f3e9e4", align: "center", lineSpacing: 8 }).setOrigin(0.5);

        this.add.text(400, 310, "Assets", { font: "bold 18px monospace", fill: "#f4a8d9" }).setOrigin(0.5);
        let assetsText = "Tileset mazmorra: 0x72\nParque: Cainos (Pixel Art Top Down)\nPersonajes y enemigos: Pipoya\nBotones y barras: (autor pendiente)";
        this.add.text(400, 380, assetsText, { font: "bold 14px monospace", fill: "#b8a9a3", align: "center", lineSpacing: 6 }).setOrigin(0.5);

        this.createButton(400, 540, "Volver", "title");
    }

    createButton(x, y, label, sceneKey) {
        let bg = this.add.nineslice(x, y, "buttons", 0, 80, 15, 5, 5, 5, 5).setScale(3);
        this.add.text(x, y - 2, label, { font: "bold 18px monospace", fill: "#f3e9e4" }).setOrigin(0.5);
        bg.setInteractive();
        bg.on("pointerover", () => bg.setTint(0xffc9e8));
        bg.on("pointerout", () => bg.clearTint());
        bg.on("pointerup", () => this.scene.start(sceneKey));
    }
}