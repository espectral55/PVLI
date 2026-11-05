import Bullet from "./bullet.js";

const SPEED = 100; // para las anims
const IDLE = { down: 1, up: 4, left: 7, right: 10 }; // frame del medio de cada fila

export default class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, "player", IDLE.down);
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this)
        this.body.setSize(7, 7, true);
        this.life = 5; //vida jugador
        this.canMove = true; // false mientras hay un popup abierto
       
        this.keys = {}
        this.keys.a = this.scene.input.keyboard.addKey("A");
        this.keys.s = this.scene.input.keyboard.addKey("S");
        this.keys.d = this.scene.input.keyboard.addKey("D");
        this.keys.w = this.scene.input.keyboard.addKey("W");

    }

    shoot(targetX, targetY){
        const bullet = new Bullet(this.scene, this.x, this.y);
        if (this.scene.playerBullets){
            this.scene.playerBullets.add(bullet);
            bullet.fire(targetX, targetY, 600);
        }
    }

    takeDamage(amount = 1){
        this.life -= amount;
        if (this.life < 0){
            this.life = 0;
        }
    }

    preUpdate(t, dt) {
        // para qe avance la anim
        super.preUpdate(t, dt);  

        if (!this.canMove) {
            this.setVelocity(0, 0);
            this.anims.stop();
            this.setFrame(IDLE[this.facing]);
            return;
        }

        let dx = (this.keys.d.isDown ? 1 : 0) - (this.keys.a.isDown ? 1 : 0);
        let dy = (this.keys.s.isDown ? 1 : 0) - (this.keys.w.isDown ? 1 : 0);

        // animacion idle para cuando esté parado
        if (dx === 0 && dy === 0) {
            this.setVelocity(0, 0);
            this.anims.stop();
            this.setFrame(IDLE[this.facing]);
            return;
        }

        // movimiento normalizado
        this.setVelocity(dx, dy);
        this.body.velocity.normalize().scale(SPEED);

        // si hay movimiento horizontal, si no el vertical
        if (dx < 0) this.facing = "left";
        else if (dx > 0) this.facing = "right";
        else if (dy < 0) this.facing = "up";
        else this.facing = "down";

        this.play("player_" + this.facing, true);  
}

}