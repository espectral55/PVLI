import Player from "./player.js";

export default class TitleScene extends Phaser.Scene{
    constructor() {
        super({ key: "titleScene" });
    }

    init(){
        console.log("holi caroli")
    }

    preload() {

    }

    create() {

        this.player = new Player(this, this.sys.canvas.width/2, this.sys.canvas.height/2);

        this.lifeText = this.add.text(10, 10, "Vida: " + this.player.life, {
            font: "24px Arial",
            fill: "#ffffff"
        });
        this.lifeText.setScrollFactor(0);  //queda fijo en pantalla

        //prueba, al pulsar k quita 1 de vida
        this.input.keyboard.on("keydown-K", () => {
            this.player.takeDamage(1);
        });
    }

    update() {
        // copia vida del jugador a texto
        this.lifeText.setText("Vida: " + this.player.life);
    }
}


