export default class Bullet extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y, targetX, targetY){
        super(scene, x, y, 'bullet');

        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        this.setScale(0.2);
        let angle = Phaser.Math.Angle.Between(x, y, targetX, targetY);
        this.setRotation(angle);
        let speed = 600;
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