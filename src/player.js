import Bullet from "./bullet.js";

const SPEED = 100; // para las anims

//powerups
const BULLET_SPEED = 600; 
const SHOTGUN_ANGLES = [-15, 0, 15]; //grados de cada bala de la escopeta respecto al raton
const INVULNERABLE_TIME = 500;

const IDLE = { down: 1, up: 4, left: 7, right: 10 }; // frame del medio de cada fila

export default class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, "player", IDLE.down);
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this)
        this.body.setSize(7, 8, true);

        //mejopras
        this.powerUps = this.scene.registry.get("powerUps");
        this.maxLife = this.powerUps.hasUpgrade("maxLife") ? 6 : 5;
        this.life = this.maxLife;
        this.speed = this.powerUps.hasUpgrade("speed") ? SPEED * 1.25 : SPEED;
        this.damage = this.powerUps.hasUpgrade("damage") ? 2 : 1;
        this.invulnerableTime = 0;

        this.canMove = true; // false mientras hay un popup abierto
        this.facing = "down";
       
        this.keys = {}
        this.keys.a = this.scene.input.keyboard.addKey("A");
        this.keys.s = this.scene.input.keyboard.addKey("S");
        this.keys.d = this.scene.input.keyboard.addKey("D");
        this.keys.w = this.scene.input.keyboard.addKey("W");

    }

    shoot(targetX, targetY){
       if(!this.scene.playerBullets) return;

       let offsets = this.powerUps.hasUpgrade("shotgun") ? SHOTGUN_ANGLES : [0];
       let center = Phaser.Math.RadToDeg(Phaser.Math.Angle.Between(this.x, this.y, targetX, targetY));
       for (let offset of offsets){
        const bullet = new Bullet(this.scene, this.x, this.y);
        this.scene.playerBullets.add(bullet);
        bullet.setAngle(center + offset);
        this.scene.physics.velocityFromAngle(center + offset, BULLET_SPEED, bullet.body.velocity);
       }
    }

    takeDamage(amount = 1){
        if (this.invulnerableTime > 0) return;

        //escudo
        if (this.powerUps.useConsumable("shield")){
            this.invulnerableTime = INVULNERABLE_TIME;
            return;
        }

        //con aura activada cualquier golpe te mata
        if(this.scene.auraActive){
            amount = this.life;
        }
        this.life -= amount;
        if (this.life < 0){
            this.life = 0;
        }
    }

    heal(amount){
        this.life = Math.min(this.maxLife, this.life + amount);
    }

    preUpdate(t, dt) {
        // para qe avance la anim
        super.preUpdate(t, dt);  

        //parpadeo mientras invulnerable
        if (this.invulnerableTime > 0){
            this.invulnerableTime -= dt;
            this.setAlpha(this.invulnerableTime > 0 ? 0.5 : 1);
        }

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
        this.body.velocity.normalize().scale(this.speed);

        // si hay movimiento horizontal, si no el vertical
        if (dx < 0) this.facing = "left";
        else if (dx > 0) this.facing = "right";
        else if (dy < 0) this.facing = "up";
        else this.facing = "down";

        this.play("player_" + this.facing, true);  
}

}