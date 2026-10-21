export default class Player extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, "player", 0);
        this.scene.add.existing(this);

       
        this.keys = {}
        this.keys.a = this.scene.input.keyboard.addKey("A");
        this.keys.s = this.scene.input.keyboard.addKey("S");
        this.keys.d = this.scene.input.keyboard.addKey("D");
        this.keys.w = this.scene.input.keyboard.addKey("W");
    }

    preUpdate(t, dt) {

    }
}