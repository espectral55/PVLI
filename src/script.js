var config = {
	type: Phaser.AUTO,
	width: 800,
	height: 600,
	scale: {
		autoCenter: Phaser.Scale.CENTER_HORIZONTALLY
	},
	scene: {
		preload: preload,
		create: create
	}
};


var game = new Phaser.Game(config);

	
function preload ()
{
  this.load.image('sky', 'assets/sky.png');
	
}

function create ()
{
  //this.add.text(400,200, "It works!");
	// Añadimos el fondo
	this.add.image(0, 0, 'sky').setOrigin(0, 0);
}

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