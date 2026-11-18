import Enemy from "./enemy.js";

export default class HealerEnemy extends Enemy {
    constructor(scene, x, y){
        super(scene, x, y);

        this.speed = 90;
        this.healRange = 70;
        this.healAmount = 1;          // vidas que cura por tick
        this.healCooldown = 1500;     // teimpo entre curaciones
        this.healTimer = 0;
    }

    // enemigo más cercano que no sea él mismo
    findClosestAlly(){
        let closest = null;
        let best = Infinity;
        for (const e of this.scene.enemies.getChildren()){
            if (e === this || !e.active) continue;
            const d = Phaser.Math.Distance.Between(this.x, this.y, e.x, e.y);
            if (d < best){
                best = d;
                closest = e;
            }
        }
        return closest;
    }

    preUpdate(t, dt){
        Phaser.Physics.Arcade.Sprite.prototype.preUpdate.call(this, t, dt);
        this.updateHealthBar();
        this.healTimer -= dt * this.getSlow();

        const ally = this.findClosestAlly();
        if (!ally){
            this.setVelocity(0, 0);
            return;
        }

        const dist = Phaser.Math.Distance.Between(this.x, this.y, ally.x, ally.y);

        if (dist > this.healRange){
            this.move(ally.x, ally.y, this.speed);
        } else {
            this.setVelocity(0, 0);
            if (this.healTimer <= 0 && ally.life < ally.maxLife){
                ally.life = Math.min(ally.maxLife, ally.life + this.healAmount);
                ally.updateHealthBar();
                this.healTimer = this.healCooldown;

                // destello verde para que se note la curación
                ally.setTint(0x66ff66);
                this.scene.time.delayedCall(200, () => { if (ally.active) ally.clearTint(); });
            }
        }
    }
}