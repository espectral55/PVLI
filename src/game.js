import TitleScene from "./titleScene.js";

var config = {
	type: Phaser.AUTO,
	width: 800,
	height: 600,
	scale: {
		autoCenter: Phaser.Scale.CENTER_HORIZONTALLY
	},
	scene: [{preload: preload, create: create}, TitleScene]
};


var game = new Phaser.Game(config);

	
function preload ()
{
  this.load.image('sky', 'assets/sky.png');
  this.load.image('playImage', 'assets/play.jpg');
  this.load.image('player', 'assets/player.png');
	
}

function create ()
{
	this.add.image(0, 0, 'sky').setOrigin(0, 0);
	let button = this.add.image(this.sys.canvas.width /2, this.sys.canvas.height  /4, "playImage").setOrigin(0, 0);
	button.setInteractive();

	button.on("pointerup", ()=>{
		this.scene.start("titleScene");
	})
  //this.add.text(400,200, "It works!");
	// Añadimos el fondo
	
}

// CAMBIAR A INGLÉS
function devuelveTextoDeAlerta() {
  return "Hola :)";
}

function desaparece(nombre) {
	var button = document.getElementById(nombre);
  button.style.visibility='hidden';
}

window.onload = (event) => {
  let allBottom = document.querySelectorAll("button");
  for (let i = 0; i < allBottom.length; i++){
    allBottom[i].classList.add("botones");
  }
}