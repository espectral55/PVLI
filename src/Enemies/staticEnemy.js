import Enemy from "./enemy.js";

//ms entre disparos
const SPIRAL_COOLDOWN = 150; 
//grados que gira entre disaro y disparo
const SPIRAL_TURN = 20;

export default class StaticEnemy extends Enemy {
    constructor(scene, x, y){
        super(scene, x, y);

        // bool para que no se mueva, solo dispare
        this.canMove = false;
        this.baseCooldown = SPIRAL_COOLDOWN;
        this.cooldown = this.baseCooldown;
        this.spiralAngle = 0; //hacia donde sale la proxima bala

        this.body.setImmovable(true);
    }

    //sustituye abanico de enemy
    shoot(targetX, targetY){
        this.shootAngle(this.spiralAngle);
        this.shootAngle(this.spiralAngle + 180); //la contraria, media vuelto
        this.spiralAngle += SPIRAL_TURN;
    }
}
