import shopItems from "../shopItems.js";
import {getCandies, spendCandies} from "../candy.js";

// Tienda del parque:
// Solo colocado los botones de comprar todavía no hacen nada
export default class ShopScene extends Phaser.Scene {
    constructor() {
        super({ key: "shop" });
    }

    create() {

        this.powerUps = this.registry.get("powerUps");

        this.cameras.main.setBackgroundColor("#fdfafb");

        // Fondo
        // la mancha rosa vacía y el tendero dentro
        this.add.image(400, 300, "baseBackground").setDisplaySize(800, 533);
        this.add.image(640, 340, "shopkeeper", "shopkeeper").setScale(5);

        // Cabecera
        // título, caramelos y botón de cerrar 
        this.add.text(40, 40, "TIENDA", { font: "bold 36px monospace", fill: "#3a2a33" });
        this.add.image(262, 62, "candy").setScale(1.5);
        this.candyText = this.add.text(280, 62, "", {font:"bold 18px monospace", fill: "#3a2a33" }).setOrigin(0, 0.5);
        this.updateCandyText();

        let close = this.add.image(490, 60, "icons", 16).setScale(3);
        close.setInteractive();
        close.on("pointerup", () => this.scene.start("park"));

        //mensaje de avisp, comprado
        this.message = this.add.text(245, 570, "", { font: "bold 16px monospace", fill: "#3a2a33" }).setOrigin(0.5);

        //una fila por objetoi
        this.rows = [];
        for(let i = 0; i < shopItems.length; i++){
            this.rows.push(this.createItemRow(shopItems[i], 110 + i * 62));
        }

        //cuando cambian los caramelos del registry se actualiza el contador
        this.registry.events.on("changedata-candies", this.updateCandyText, this);
        //al cerra escena dejamos de escuchar
        this.events.once(Phaser.Scenes.Events.SHUTDOWN, () => {
            this.registry.events.off("changedata-candies", this.updateCandyText, this);
        });


        this.input.keyboard.on("keydown-M", () => this.registry.set("candies", getCandies(this.registry) + 50)); // PRUEBA
    }

    updateCandyText() {
        this.candyText.setText("Caramelos: " + getCandies(this.registry));
    }

    // Fila de la tienda
    //  fondo, icono, nombre, tipo, precio y botón mas de comprar
    createItemRow(item, y) {
        this.add.rectangle(245, y + 22, 420, 54, 0xf6e9f0).setStrokeStyle(2, 0xe2c3d5);

        let icon = this.add.image(65, y + 22, item.key, item.frame);
        icon.setDisplaySize(36, 36 * icon.height / icon.width);   // todos los iconos del mismo ancho

        this.add.text(95, y + 6, item.name, { font: "bold 16px monospace", fill: "#3a2a33" });
        let typeText = this.add.text(95, y + 26, "", { font: "bold 12px monospace", fill: "#8a6f7c" });

        let coin = this.add.image(345, y + 22, "icons", 26).setScale(1.6);    // icono dinero
        let priceText = this.add.text(360, y + 22, String(item.price), { font: "bold 16px monospace", fill: "#3a2a33" }).setOrigin(0, 0.5);

        let buyButton = this.add.image(425, y + 22, "icons", 8).setScale(2.2);     // botón +
        buyButton.setInteractive({ useHandCursor: true });
        buyButton.on("pointerover", () => buyButton.setTint(0xffc9e8));
        buyButton.on("pointerout", () => buyButton.clearTint());
        buyButton.on("pointerup", () => this.buy(item));

        let row = { item, typeText, coin, priceText, buyButton };
        this.updateRow(row);
        return row;
    }

    updateRow(row){
        let item = row.item;
        if (item.permanent){
            let owned = this.powerUps.hasUpgrade(item.id);
            row.typeText.setText(owned ? "COMPRADO" : "Mejora permanente");
            row.typeText.setColor(owned ? "#2e9e5b" : "#8a6f7c");
            row.coin.setVisible(!owned);
            row.priceText.setVisible(!owned);
            row.buyButton.setVisible(!owned);
        }else{
            row.typeText.setText("Consumible · tienes " + this.powerUps.getCount(item.id));
        }
    }

    buy(item){
        if(item.permanent && this.powerUps.hasUpgrade(item.id)){
            this.showMessage("Ya lo tienes", "#8a6f7c");
            return;
        }

        //resta caramelos y devuelve false si no hay sufcicientes
        if(!spendCandies(this.registry, item.price)){
            this.showMessage("No tienes caramelos suficientes", "#c2185b");
            return;
        }

        if (item.permanent){
            this.powerUps.addUpgrade(item.id);
        }else{
            this.powerUps.addConsumable(item.id);
        }
        this.showMessage("¡Comprado: " + item.name + "!", "#2e9e5b");

        //actuializamos filas
        this.rows.forEach(row => this.updateRow(row));
    }

    showMessage(text, color){
        this.message.setText(text).setColor(color).setAlpha(1);
        this.tweens.killTweensOf(this.message);
        this.tweens.add({ targets: this.message, alpha: 0, delay: 1200, duration: 400 });
    }
}