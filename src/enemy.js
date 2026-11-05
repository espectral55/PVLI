import Bullet from "./bullet.js";

export default class Enemy extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y){
        super(scene, x, y, "paranoid", 0);
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);

        this.maxLife = 5;
        this.life = this.maxLife;
        this.cooldown = 3000;
        this.isMoving = false;

        // Fila 10 Verde Grande: Frame 82 = 5 bolitas verdes (vida al máximo)
        this.healthBar = this.scene.add.sprite(this.x, this.y - 20, "HealthBars", 82);
        this.healthBar.setDepth(10);
        
        this.updateHealthBar();
    }

    updateHealthBar(){
        if (!this.healthBar || !this.healthBar.active) return;

        // Posicionar sobre el enemigo
        this.healthBar.setPosition(this.x, this.y - this.height / 2 - 10);
        
        // Fila Verde Grande (5 bolitas):
        // Frame 82: 5/5 bolitas (llena)
        // Frame 83: 4/5 bolitas
        // Frame 84: 3/5 bolitas
        // Frame 85: 2/5 bolitas
        // Frame 86: 1/5 bolita
        // Frame 87: 0/5 bolitas (vacía)
        let damageIndex = this.maxLife - this.life;
        let targetFrame = 82 + Phaser.Math.Clamp(damageIndex, 0, 5);

        this.healthBar.setFrame(targetFrame);
    }

    takeDamage(amount){
        this.life -= amount;

        if (this.life <= 0){
            this.life = 0;
            if (this.healthBar) {
                this.healthBar.destroy();
            }
            this.destroy();
        } else {
            this.updateHealthBar();
        }
    }

    shoot(targetX, targetY){
        const bullet = new Bullet(this.scene, this.x, this.y);
        if (this.scene.enemyBullets){
            this.scene.enemyBullets.add(bullet);
            bullet.fire(targetX, targetY, 600);
        }
    }

    move(targetX, targetY, speed = 100){
        let angle = Phaser.Math.Angle.Between(this.x, this.y, targetX, targetY);
        this.scene.physics.velocityFromRotation(angle, speed, this.body.velocity);
    }

    preUpdate(t, dt){
        super.preUpdate(t, dt);

        this.updateHealthBar();

        if (this.scene.player){
            let playerX = this.scene.player.x;
            let playerY = this.scene.player.y;
            let distance = Phaser.Math.Distance.Between(this.x, this.y, playerX, playerY);
            if (distance > 250 && distance < 600){
                this.isMoving = true;
                this.move(playerX, playerY);
            }
            else {
                this.setVelocity(0, 0);
                this.isMoving = false;
            }

            if (this.cooldown <= 0){
                this.cooldown = 3000;
                this.shoot(playerX, playerY);
            }
            this.cooldown -= dt;
        }
    }
}