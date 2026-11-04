import Bullet from "./bullet.js";
import Player from "./player.js";

export default class Enemy extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y){
        super(scene, x, y, "paranoid", 0);
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);

        this.life = 5; // Vida del enemigo
        this.cooldown = 3000; // Tiempo entre balas (3 segs)
    }

    takeDamage(amount){
        this.life -= amount;
        if (this.life < 0){
            this.life = 0;
            this.destroy();
        }
        console.log("enemigo golpeado: " + this.life)
    }

    shoot(targetX, targetY){
        const bullet = new Bullet(this.scene, this.x, this.y);
        if (this.scene.enemyBullets){
            this.scene.enemyBullets.add(bullet);
            bullet.fire(targetX, targetY, 600);
        }
    }

    preUpdate(t, dt){
        super.preUpdate(t, dt);
        if (this.scene.player){
            let playerX = this.scene.player.x;
            let playerY = this.scene.player.y;
            if (this.cooldown <= 0){
                this.cooldown = 3000;
                this.shoot(playerX, playerY);
            }
            this.cooldown -= dt;

        }
        
    }
}