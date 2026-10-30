import BootScene from "./scenes/bootScene.js";
import TitleScene from "./scenes/titleScene.js";
import SettingsScene from "./scenes/settingsScene.js";
import CreditsScene from "./scenes/creditsScene.js";
import ParkScene from "./scenes/parkScene.js";
import RoomScene from "./scenes/roomScene.js";

var config = {
	type: Phaser.AUTO,
	width: 800,
	height: 600,
	pixelArt: true, // el pixel art no se ve borroso al escalarlo
	scale: {
		autoCenter: Phaser.Scale.CENTER_HORIZONTALLY
	},
	// La primera de la lista es la que arranca
	scene: [BootScene, TitleScene, SettingsScene, CreditsScene, ParkScene, RoomScene]
};

var game = new Phaser.Game(config);