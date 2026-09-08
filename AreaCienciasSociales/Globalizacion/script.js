let conse = 0;
let score = 0;
let timer;
let PregMostrada = [];
let partesR = 16;
let imgSistema = "";
let nombreSistema = "";

// Función para iniciar el juego
var preguntasAleatorias;
var index = 0;
var respactual = "";
var respCorrectas = 0;
var respIncorrectas = 0;
var actual = 0;
var PregRespuesta = [];

function startGame() {
  var element = document.getElementById("puntoIsla0");
  element.style.backgroundImage = "url(img/posActual.png)";
}

$(document).ready(function () {
  setTimeout(() => {
    $("#principal").fadeToggle(1000);
    $("#fondo_blanco").fadeToggle(3000);
    setTimeout(() => {
      const divAnimado = document.querySelector(".overlay");
      divAnimado.style.animationName = "moverDerecha";
      divAnimado.style.animationDirection = "normal";
      divAnimado.style.display = "block";
      setTimeout(() => {
        const divAnimado2 = document.querySelector(".nube");
        divAnimado2.style.animationName = "moverArriba";
        divAnimado2.style.animationDirection = "normal";
        divAnimado2.style.display = "block";
        setTimeout(() => {
          divAnimado.style.backgroundImage = "url(../../images/normal2.gif)";
          maquina2(
            "bienvenida",
            "Hola, soy Genio. <br> En este juego deberás girar la ruleta, la cual te dará el numero de posiciones que genio debe de recorrer, en cada punto se mostrará una pregunta relacionada al tema ‘La Globalización’ que tienes que responder para salir Victorioso. ¡¡¡Tú Puedes!!!",
            50,
            1
          );
        }, 3000);
      }, 2000);
    });
  }, 200);
});

function maquina2(contenedor, texto, intervalo, n) {
  var i = 0,
    // Creamos el timer
    timer = setInterval(function () {
      if (i < texto.length) {
        // Si NO hemos llegado al final del texto..
        // Vamos añadiendo letra por letra y la _ al final.
        $("#" + contenedor).html(texto.substr(0, i++) + "_");
      } else {
        // En caso contrario..
        // Salimos del Timer y quitamos la barra baja (_)
        clearInterval(timer);
        $("#" + contenedor).html(texto);
        if (!cerrardo) {
          document.querySelector("#btnomitir").style.display = "none";
          setTimeout(() => {
            cerrar_anuncio();
          }, 3000);
        }
        // Auto invocamos la rutina n veces (0 para infinito)
        if (--n != 0) {
          setTimeout(function () {
            maquina2(contenedor, texto, intervalo, n);
          }, 3600);
        }
      }
    }, intervalo);
}

let cerrardo = false;
function cerrar_anuncio() {
  if(!cerrardo) {
    let audio2 = new Audio('../../sounds/fondo.mp3');
    audio2.play();
    audio2.volume = 0.2;
    cerrardo = true;
    const divAnimado2 = document.querySelector(".nube");
    divAnimado2.style.animationName = "moverabajo";
    const divAnimado = document.querySelector(".overlay");
    divAnimado.style.backgroundImage = "url(../../images/normal1.gif)";
    $("#fondo_blanco").fadeToggle(3000);
    setTimeout(function () {
      divAnimado.style.animationName = "moverIzquierda";
      divAnimado.style.animationDirection = "normal";
      setTimeout(() => {
        $("#principal").fadeToggle(1000);
        startGame();
      }, 2000);
    }, 2000);
  }
}

function resultadoFinal() {
  $("#principal").fadeToggle(1000);
  $("#final").fadeToggle(1000);

  var porPre =(nResp/userScore)*100;

  if (porPre < 60) {
    var audio = new Audio("../../sounds/game_over.mp3");
    audio.play();
    document.getElementById("final").style.backgroundImage =
      "url(../../images/derrota.gif)";
    document.getElementById("texto_final").innerText =
      "Lo siento solo has logrado contestar Correctamente  " +
      userScore +
      " de "+nResp+" Preguntas Posibles";
  } else {
    document.getElementById("final").style.backgroundImage =
      "url(../../images/victoria.gif)";
    var audio = new Audio("../../sounds/victory.mp3");
    audio.play();
    document.getElementById("texto_final").innerText =
      "Felicitaciones has logrado contestar Correctamente  " +
      userScore +
      " de "+nResp+" Preguntas Posibles";
  }
}

function verfResp() {
  if (Respuesta == "ok") {
    fadeOutBackground(targetCell, 'url("img/pregOk.png")');
    targetCell.style.backgroundSize = "45%";
    targetCell.style.backgroundRepeat = "no-repeat";
  } else {
    fadeOutBackground(targetCell, 'url("img/pregFail.png")');
    targetCell.style.backgroundSize = "45%";
    targetCell.style.backgroundRepeat = "no-repeat";
  }

  if (nResp == 5) {
    let posi = 62;
    setTimeout(() => {
      fadeOutBackground(cells[posi], 'url("img/metaOpen.gif")');
    }, 1000);

    setTimeout(() => {
      fadeOutBackground(cells[posi], 'url("img/metaOpen.png")');
    }, 2000);
  }
}

function obtenerIndiceAleatorio() {
  let indice = Math.floor(Math.random() * Preguntas.length);
  while (PregMostrada.includes(indice)) {
    indice = Math.floor(Math.random() * Preguntas.length);
  }
  PregMostrada.push(indice);

  return indice;
}

var scale = 1;

function cambiarEscala() {
  if (scale === 1) {
    scale = 0.8; // Reducción de escala en un 20%
  } else {
    scale = 1.2; // Aumento de escala en un 20%
  }

  document.getElementById("divGirar").style.transform = "scale(" + scale + ")";
 
}

setInterval(cambiarEscala, 2000); // Cambio de escala cada 2 segundos (2000 milisegundos)

// Iniciar el cambio de escala al cargar la página
window.addEventListener("load", cambiarEscala);
