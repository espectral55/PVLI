import Player from "../player.js";

// Casa del protagonista 
// Al hacer click en la puerta se sale al parque.
export default class HouseScene extends Phaser.Scene {
    constructor() {
        super({ key: "house" });
    }

    create() {
        this.cameras.main.setBackgroundColor("#14111a");

        this.createMap();
        // Borde de la habitación rectángulo sin relleno, solo borde
        this.add.rectangle(400, 300, 480, 384).setStrokeStyle(10, 0x3b322c);

        // Jugador
        this.player = new Player(this, 400, 420).setScale(1.5);

        this.physics.add.collider(this.player, this.wallsLayer);
        this.physics.add.collider(this.player, this.propsLayer);
        this.physics.add.collider(this.player, this.doorLayer, () => {
            this.scene.start('park');
        });



        this.add.text(160, 544, "CASA", { font: "bold 18px monospace", fill: "#b8a9a3" });
    }

       createMap(){
        const map = this.make.tilemap({key: 'casa'});
        const stoneTiles = map.addTilesetImage('StoneGroundTileset', 'stoneGround');
        const wallTiles = map.addTilesetImage('WallTileset', 'walls');
        const propsTiles = map.addTilesetImage('PropsTileset', 'parkProps');

        const allTilesets = [stoneTiles, wallTiles, propsTiles];

        this.groundLayer = map.createLayer('Ground', allTilesets);
        this.wallsLayer = map.createLayer('Walls', allTilesets);
        this.doorLayer = map.createLayer('Door', allTilesets);
        this.propsLayer = map.createLayer('Props', allTilesets);

        const offsetX = (800 - map.widthInPixels) / 2;
        const offsetY = (600 - map.heightInPixels) / 2;
        [this.groundLayer, this.wallsLayer, this.doorLayer, this.propsLayer].forEach(layer => layer.setPosition(offsetX, offsetY));

        this.wallsLayer.setCollisionByExclusion([-1]);
        this.propsLayer.setCollisionByExclusion([-1]);
        this.doorLayer.setCollisionByExclusion([-1]);
    }
}