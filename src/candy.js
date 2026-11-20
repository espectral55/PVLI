export function getCandies(registry) {
    if (!registry.has("candies")) {
        registry.set("candies", 0);
    }
    return registry.get("candies");
}

export function addCandies(registry, amount = 1) {
    registry.set("candies", getCandies(registry) + amount);
}

// metodo para la tienda,, devuelve false si no tenemos suficientes
export function spendCandies(registry, amount) {
    let current = getCandies(registry);
    if (current < amount) return false;
    registry.set("candies", current - amount);
    return true;
}

export default class Candy extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, value = 1) {
        super(scene, x, y, "candy");
        scene.add.existing(this);
        this.setScale(2);
        scene.physics.add.existing(this);

        this.value = value;
        this.collected = false;

        // no m gusta mucho esta anim pero cuando tengamos un sp0rite propio ya me ocupare
        scene.tweens.add({ targets: this, y: y - 4, duration: 600, yoyo: true, repeat: -1, ease: "Sine.InOut" });
    }

    // suma su valor a los caramelos del jugador y desaparece
    collect() {
        if (this.collected) return;   // por si el overlap salta dos veces
        this.collected = true;

        addCandies(this.scene.registry, this.value);

        // qitamos la animacion del sprite
        this.scene.tweens.killTweensOf(this);
        // sin física, pero sigue visible para la animacion
        this.disableBody(true, false);   
        this.scene.tweens.add({
            // animacion kawai para cuando el jugador toca el caramelo,, se hace grande y desaparece
            targets: this, scale: 3.5, alpha: 0, duration: 200,
            // cuando termina la animacion
            onComplete: () => this.destroy()
        });
    }
}

