export default class PowerUps extends Phaser.Events.EventEmitter {
    // con # son privados
    #upgrades = []; //ids mejoras permanentes compradas
    #consumables = {shield: 0,  medkit: 0}; //cuantos quedanam de cada consumible

    hasUpgrade(id){
        return this.#upgrades.includes(id);
    }

    addUpgrade(id){
        if (this.hasUpgrade(id)){
            return false;
        }

        this.#upgrades.push(id);

        this.emit("upgrades-changed", id);
        return true;
    }

    getCount(id){
        return this.#consumables[id] || 0;
    }

    addConsumable(id, amount = 1){
        this.#consumables[id] = this.getCount(id) + amount;
        this.emit("consumables-changed" , id, this.#consumables[id]);
    }

    useConsumable(id){
        if(this.getCount(id) <= 0){
            return false;
        }

        this.#consumables[id]--;
        this.emit("consumables-changed", id, this.#consumables[id]);
        return true;
    }
}