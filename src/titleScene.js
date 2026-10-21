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

        let player = new Player(this, this.sys.canvas.width/2, this.sys.canvas.height/2);
    }
}


