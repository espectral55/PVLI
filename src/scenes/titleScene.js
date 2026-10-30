// Pantalla de inicio

export default class TitleScene extends Phaser.Scene{
    constructor() {
        super({ key: "title" });
    }

 create() {
        this.cameras.main.setBackgroundColor("#fdfafb");

        // Fondo
        this.add.image(400, 300, "baseBackground").setDisplaySize(800, 533);

        // Título
        this.add.text(60, 60, "IDENTITY", { font: "bold 64px monospace", fill: "#3a2a33" });
        this.add.text(64, 132, "(título pendiente de cambio)", { font: "bold 14px monospace", fill: "#9a7f8c" });

        // Protagonista 
        this.add.image(620, 330, "effects", 5).setScale(4.5).setAlpha(0.45);
        this.add.sprite(620, 330, "player", 1).setScale(6).play("player_down");

        // Botones, cada uno lleva a una escena
        this.createButton(190, 230, "Continuar", "park");
        this.createButton(190, 290, "Nueva partida", "park");
        this.createButton(190, 350, "Ajustes", "settings");
        this.createButton(190, 410, "Créditos", "credits");
    }
   
    // Botón
    // nineslice(x, y, clave, frame, ancho, alto, bordeIzq, bordeDer, bordeArriba, bordeAbajo)
    createButton(x, y, label, sceneKey) {
        let bg = this.add.nineslice(x, y, "buttons", 0, 80, 15, 5, 5, 5, 5).setScale(3);
        this.add.text(x, y - 2, label, { font: "bold 18px monospace", fill: "#f3e9e4" }).setOrigin(0.5);

        bg.setInteractive();
        bg.on("pointerover", () => bg.setTint(0xffc9e8));      // ratón encima, se ilumina
        bg.on("pointerout", () => bg.clearTint());
        bg.on("pointerup", () => this.scene.start(sceneKey));  // flecha para que funcione el this
    }
}


