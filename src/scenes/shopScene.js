// Tienda del parque:
// Solo colocado los botones de comprar todavía no hacen nada
export default class ShopScene extends Phaser.Scene {
    constructor() {
        super({ key: "shop" });
    }

    create() {
        this.cameras.main.setBackgroundColor("#fdfafb");

        // Fondo
        // la mancha rosa vacía y el tendero dentro
        this.add.image(400, 300, "baseBackground").setDisplaySize(800, 533);
        this.add.image(640, 340, "shopkeeper", "shopkeeper").setScale(5);

        // Cabecera
        // título, almas y botón de cerrar 
        this.add.text(40, 40, "TIENDA", { font: "bold 36px monospace", fill: "#3a2a33" });
        this.add.circle(262, 62, 8, 0x7fd6ff);
        this.add.text(280, 62, "Almas: 0", { font: "bold 18px monospace", fill: "#3a2a33" }).setOrigin(0, 0.5);

        let close = this.add.image(440, 60, "icons", 16).setScale(3);
        close.setInteractive();
        close.on("pointerup", () => this.scene.start("park"));

        // Objetos
        //  nombre, tipo, precio e icono 
        let items = [
            { name: "Vida máxima +1", type: "Mejora permanente", price: 10, key: "dungeon", frame: 364 },
            { name: "Daño +", type: "Mejora permanente", price: 15, key: "dungeon", frame: "sword" },
            { name: "Velocidad +", type: "Mejora permanente", price: 12, key: "dungeon", frame: 396 },
            { name: "Duración del aura +", type: "Mejora permanente", price: 20, key: "effects", frame: 5 },
            { name: "Escudo de un golpe", type: "Power-up (1 incursión)", price: 8, key: "effects", frame: 0 },
            { name: "Escopeta", type: "Arma nueva", price: 30, key: "dungeon", frame: "swordBlue" }
        ];

        // Una fila por objeto, cada fila baja 62 píxeles
        for (let i = 0; i < items.length; i++) {
            this.createItemRow(items[i], 120 + i * 62);
        }
    }

    // Fila de la tienda
    //  fondo, icono, nombre, tipo, precio y botón mas de comprar
    createItemRow(item, y) {
        this.add.rectangle(245, y + 22, 420, 54, 0xf6e9f0).setStrokeStyle(2, 0xe2c3d5);

        let icon = this.add.image(65, y + 22, item.key, item.frame);
        icon.setDisplaySize(36, 36 * icon.height / icon.width);   // todos los iconos del mismo ancho

        this.add.text(95, y + 6, item.name, { font: "bold 16px monospace", fill: "#3a2a33" });
        this.add.text(95, y + 26, item.type, { font: "bold 12px monospace", fill: "#8a6f7c" });

        this.add.image(345, y + 22, "icons", 26).setScale(1.6);    // icono dienroo
        this.add.text(360, y + 22, String(item.price), { font: "bold 16px monospace", fill: "#3a2a33" }).setOrigin(0, 0.5);
        this.add.image(425, y + 22, "icons", 8).setScale(2.2);     // botón + 
    }
}