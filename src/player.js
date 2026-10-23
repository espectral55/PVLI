export default class Player extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, "player", 0);
        this.scene.add.existing(this);

        this.life = 5; //vida jugador
       
        this.keys = {}
        this.keys.a = this.scene.input.keyboard.addKey("A");
        this.keys.s = this.scene.input.keyboard.addKey("S");
        this.keys.d = this.scene.input.keyboard.addKey("D");
        this.keys.w = this.scene.input.keyboard.addKey("W");
    }

    takeDamage(amount){
        this.life -= amount;
        if (this.life < 0){
            this.life = 0;
        }
    }

    preUpdate(t, dt) {
        super.preUpdate(t, dt);
        if(this.keys.a.isDown){    
            this.x -= 10 * dt/100;
            this.setFlipX(true);
        }
        else if (this.keys.d.isDown){
            this.x += 10 * dt/100;
            this.setFlipX(false);
        }
        else if (this.keys.w.isDown){
            this.y -= 10 * dt/100;
            this.setFlipY(true);
        }
        else if (this.keys.s.isDown){
            this.y += 10 * dt/100;
            this.setFlipY(false);
        }
    }
}