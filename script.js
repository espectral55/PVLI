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