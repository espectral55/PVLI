import { STICKER_COUNT, STICKER_POS, getStickers, countStickers, unlockNextSticker } from "./stickers.js";
const SCALE = 800 / 2160;  

export default class StickerMenu {
    constructor (scene, buttonX, buttonY) {
        this.scene = scene;
        this.items = null;
        this.stickerImgs = [];

        scene.add.nineslice(buttonX, buttonY, "buttons", 0, 50, 15, 5, 5, 5, 5).setScale(3);
        scene.add.text(buttonX, buttonY, "Stickers", { font: "bold 16px monospace", fill: "#f3e9e4" }).setOrigin(0.5);
        let zone = scene.add.zone(buttonX, buttonY, 150, 45).setInteractive({ useHandCursor: true});
        zone.on ("pointerup", () => this.open());

        scene.input.keyboard.on("keydown-A", (e) => {
            if (this.isOpen && !e.repeat) this.unlockNext();
        });
        scene.input.keyboard.on("keydown-ESC", () => this.close());
    }

    get isOpen() {
        return this.items !== null;
    }

    open() {
        let scene = this.scene;
        if (this.isOpen || scene.levelPopup) return;
        if (scene.player) scene.player.canMove = false;

        let items = [];

         // bloquear clicks de detrás
        items.push(scene.add.rectangle(400, 300, 800, 600, 0x000000, 0.6).setInteractive());  
        items.push(scene.add.image(0, 0, "stickerBase").setOrigin(0, 0).setScale(SCALE));
        // un sticker por silueta
        this.stickerImgs = [];
        for (let i = 0; i < STICKER_COUNT; i++) {
            let img = scene.add.image(0, 0, "sticker" + (i + 1)).setScale(SCALE);
            // se coloca por el centro para que la animación de aparecer crezca desde el medio
            img.setPosition((STICKER_POS[i][0] + img.width / 2) * SCALE, (STICKER_POS[i][1] + img.height / 2) * SCALE);
            this.stickerImgs.push(img);
            items.push(img);
        }

        // contador y botón de cerrar, arriba en el hueco libre del centro
        this.countText = scene.add.text(400, 20, "", {
            font: "bold 20px monospace", fill: "#ffffff", backgroundColor: "#e643aa", padding: { x: 4, y: 2 }
        }).setOrigin(0.5);
        /*let closeBtn = scene.add.text(400, 44, "CERRAR (ESC)", {
            font: "bold 13px monospace", fill: "#ffffff", padding: { x: 4, y: 3 }
        }).setOrigin(0.5).setInteractive({ useHandCursor: true });
        closeBtn.on("pointerup", () => this.close());*/

        let close = scene.add.image(760, 30, "icons", 16).setScale(3);
        close.setInteractive();
        close.on("pointerup", () => this.close());
        items.push(this.countText, close);

        items.forEach(o => o.setDepth(1000));
        this.items = items;
        this.refresh(0);
    }

    close() {
        if (!this.isOpen) return;
        this.items.forEach(o => o.destroy());
        this.items = null;
        if (this.scene.player) this.scene.player.canMove = true;
    }

    // mostrar cada sticker según el estado
    refresh(newId) {
        let unlocked = getStickers(this.scene.registry);
        for (let i = 0; i < STICKER_COUNT; i++) {
            this.stickerImgs[i].setVisible(unlocked[i]);
        }
        this.countText.setText("STICKERS " + countStickers(this.scene.registry) + "/" + STICKER_COUNT);

        if (newId > 0) {
            let img = this.stickerImgs[newId - 1];
            img.setScale(0);
            this.scene.tweens.add({ targets: img, scale: SCALE, duration: 300, ease: "Back.Out" });
        }
    }

    unlockNext() {
        let id = unlockNextSticker(this.scene.registry);
        if (id > 0) this.refresh(id);
    }
}