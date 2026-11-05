import BootScene from "./scenes/bootScene.js";
import TitleScene from "./scenes/titleScene.js";
import SettingsScene from "./scenes/settingsScene.js";
import CreditsScene from "./scenes/creditsScene.js";
import ParkScene from "./scenes/parkScene.js";
import RoomScene from "./scenes/roomScene.js";
import HouseScene from "./scenes/houseScene.js";
import ShopScene from "./scenes/shopScene.js";
import PauseScene from "./scenes/pauseScene.js";
import ResultScene from "./scenes/resultScene.js";

var config = {
	type: Phaser.AUTO,
	width: 800,
	height: 600,
	pixelArt: true, // pixelart no se ve borroso al escalarlo
	scale: {
		autoCenter: Phaser.Scale.CENTER_HORIZONTALLY
	},
	physics: {
		default : 'arcade',
		arcade: {
			gravity : { y: 0},
			debug: true
		}
	},
	// La primera de la lista es la que arranca
	scene: [BootScene, TitleScene, SettingsScene, CreditsScene, ParkScene, RoomScene, HouseScene, ShopScene, PauseScene, ResultScene]
};

var game = new Phaser.Game(config);