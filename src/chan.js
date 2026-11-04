import LEVEL_DATA from "./levelData.js";

// clase para los personajes en la escena del parque.
export default class Chan extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, levelId) {
        super(scene, x, y, "people", levelId - 1);
        scene.add.existing(this);
        this.setScale(1.4);

        this.levelId = levelId;
        this.levelKey = "level" + levelId;

        let info = LEVEL_DATA[levelId - 1] || {};
        this.title = info.title || "NIVEL " + levelId;
        this.titleBig = info.titleBig || "";
        this.description = info.description || "";

        // distancia del popup del personaje correspondiente
        this.triggerRadius = 40;
        this.playerWasNear = false;
        this.setName("chan" + levelId);

        // n del nivel debajo de cada persona
        scene.add.text(x, y + 32, String(levelId), { font: "bold 11px monospace", fill: "#ffffff", backgroundColor: "#00000088", padding: { x: 3, y: 0 } }).setOrigin(0.5, 0);
    }

    isPlayerNear(player) {
        return Phaser.Math.Distance.Between(this.x, this.y, player.x, player.y) < this.triggerRadius;
    }
}