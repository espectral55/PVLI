export default class Bullet extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, x, y){
        super(scene, x, y, 'bullet');

        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        this.setScale(0.2);
        
    }

    fire(targetX, targetY, speed = 600){
        let angle = Phaser.Math.Angle.Between(this.x, this.y, targetX, targetY);
        this.setRotation(angle);
        this.scene.physics.velocityFromRotation(angle, speed, this.body.velocity);
    }

    preUpdate(t, dt){
        super.preUpdate(t, dt);

        let bounds = this.scene.scale;
        if (this.x < 0 || this.x > bounds.width || this.y < 0 || this.y > bounds.height){
            this.destroy();
        }
    }
}