import Enemy from "./enemy.js";

// variante provisional de enemigo estático y qe dispara el doble de veces :P
const FIRE_RATE_MULTIPLIER = 1.5;

export default class StaticEnemy extends Enemy {
    constructor(scene, x, y){
        super(scene, x, y);

        // bool para que no se mueva, solo dispare
        this.canMove = false;
        this.baseCooldown = this.baseCooldown / FIRE_RATE_MULTIPLIER;
        this.cooldown = this.baseCooldown;

        this.body.setImmovable(true);
    }
}
