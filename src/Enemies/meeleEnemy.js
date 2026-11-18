import Enemy from "./enemy.js";

export default class MeleeEnemy extends Enemy {
    constructor(scene, x, y){
        super(scene, x, y);

        this.speed = 80;
        this.attackRange = 45;        // distancia a la que golpea
        this.attackCooldown = 1000;   // ms entre golpes
        this.attackTimer = 0;
        this.damage = 1;
    }

    preUpdate(t, dt){
        Phaser.Physics.Arcade.Sprite.prototype.preUpdate.call(this, t, dt);
        this.updateHealthBar();

        const player = this.scene.player;
        if (!player) return;

        this.attackTimer -= dt * this.getSlow();
        const dist = Phaser.Math.Distance.Between(this.x, this.y, player.x, player.y);

        if (dist > this.attackRange){
            this.move(player.x, player.y, this.speed);
        } else {
            this.setVelocity(0, 0);
            if (this.attackTimer <= 0){
                player.takeDamage(this.damage);
                this.attackTimer = this.attackCooldown;
            }
        }
    }
}