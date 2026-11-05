// Final de una incursión
// Game Over -aura rota ç
//  mente completada -ecuerdo esencial
// Recibe { win: true/false, levelId: número } desde la sala
export default class ResultScene extends Phaser.Scene {
    constructor() {
        super({ key: "result" });
    }

    // init recibe los datos que se pasan en this.scene.start y eso
    init(data) {
        this.win = data.win || false;
        this.levelId = data.levelId || 1;
    }

    create() {
        this.cameras.main.setBackgroundColor(this.win ? "#1b1626" : "#1a0f14");
        this.add.nineslice(400, 300, "buttons", 0, 173, 157, 5, 5, 5, 5).setScale(3);

        // Título distinto si gana o pierde 
        let title = this.win ? "MENTE COMPLETADA" : "TU AURA SE HA ROTO";
        let color = this.win ? "#7fd6ff" : "#ff6b81";
        this.add.text(400, 105, title, { font: "bold 30px monospace", fill: color }).setOrigin(0.5);

        // La persona del nivel 
        // frame levelId - 1, como en el parque
        this.add.sprite(400, 175, "people", this.levelId - 1).setScale(2);

        if (this.win) {
            // Recuerdo esencial
            //  cofre dorado y texto random pòr ahora
            this.add.image(255, 252, "dungeon", 367).setScale(2.5);
            this.add.text(285, 240, "Recuerdo esencial", { font: "bold 16px monospace", fill: "#f4a8d9" });
            this.add.text(285, 262, "(texto de la historia pendiente)", { font: "bold 13px monospace", fill: "#b8a9a3" });
        } else {
            this.add.text(400, 255, "Vuelves al parque", { font: "bold 16px monospace", fill: "#b8a9a3" }).setOrigin(0.5);
        }

        // Resumen de la incursión
        this.add.circle(285, 330, 8, 0x7fd6ff);
        this.add.text(305, 330, "Almas ganadas: 0", { font: "bold 16px monospace", fill: "#f3e9e4" }).setOrigin(0, 0.5);
        this.add.text(275, 362, "Enemigos derrotados: 0", { font: "bold 16px monospace", fill: "#f3e9e4" }).setOrigin(0, 0.5);

        this.createButton(400, 445, "Volver al parque", "park");
        if (!this.win) {
            this.createButton(400, 503, "Reintentar", "room");
        }
    }

    createButton(x, y, label, sceneKey) {
        let bg = this.add.nineslice(x, y, "buttons", 0, 80, 15, 5, 5, 5, 5).setScale(3);
        this.add.text(x, y - 2, label, { font: "bold 18px monospace", fill: "#f3e9e4" }).setOrigin(0.5);
        bg.setInteractive();
        bg.on("pointerover", () => bg.setTint(0xffc9e8));
        bg.on("pointerout", () => bg.clearTint());
        // Al reintentar se vuelve a pasar el nivel para que la sala sepa cuál es
        bg.on("pointerup", () => this.scene.start(sceneKey, { levelId: this.levelId }));
    }
}