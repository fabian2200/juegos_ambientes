$(document).ready(function () {
  let audio = new Audio("../../sounds/fondo.mp3");
  audio.play();
  audio.volume = 0.2;

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
            "Hola, soy Genio. <br> En este juego deberás llegar a la tierra antes que el sol destruya tu nave, para esto tienes que contestar preguntas relacionadas al tema ‘Categoría Gramaticales’ <br> ¡Tú Puedes!",
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
    timer = setInterval(function () {
      if (i < texto.length) {
        $("#" + contenedor).html(texto.substr(0, i++) + "_");
      } else {
        clearInterval(timer);
        $("#" + contenedor).html(texto);
        if (!cerrardo) {
          document.querySelector("#btnomitir").style.display = "none";
          setTimeout(() => {
            cerrar_anuncio();
          }, 3000);
        }
        if (--n != 0) {
          setTimeout(function () {
            maquina2(contenedor, texto, intervalo, n);
          }, 3600);
        }
      }
    }, intervalo);
}

var animationInterval;
function iniciarCarrera() {
  cargPreg();
  updateNave();
}

let cerrardo = false;
function cerrar_anuncio() {
  if (!cerrardo) {
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
        iniciarCarrera();
      }, 2000);
    }, 2000);
  }
}

var preguntasAleatoria;
var PregMostrada = [];

var respCorrecta;
var index = 0;
var detenerMete;
const cards = document.querySelectorAll(".card");
function cargPreg() {
  cards.forEach((card, index) => {
    card.classList.remove("card-selOk", "card-selFail");
  });

  var index = obtenerIndiceAleatorio();

  var preguntaActual = Preguntas[index];
  document.getElementById("pregunta").innerHTML = preguntaActual.frase;

  let x = 1;
  for (var i = 0; i < preguntaActual.opciones.length; i++) {
    document.getElementById("Opc" + x).innerHTML = preguntaActual.opciones[i];
    x++;
  }
  respCorrecta = preguntaActual.opcion_correcta;
  index++;
}

function obtenerIndiceAleatorio() {
  let indice = Math.floor(Math.random() * Preguntas.length);
  while (PregMostrada.includes(indice)) {
    indice = Math.floor(Math.random() * Preguntas.length);
  }
  PregMostrada.push(indice);

  return indice;
}

var animationInterval;
var respcorrectas = 0;

function verResp(elemento) {
  if (elemento.textContent == respCorrecta) {
    elemento.classList.add("card-selOk");
    respcorrectas++;
    isThrusting = true;
    naveEsp.style.backgroundImage = "url(img/nave_acelera.gif)";
    naveEsp.style.transition =  "1.5s left linear";
    naveEsp.style.left = (naveEsp.getBoundingClientRect().left + 150)+"px";
  } else {
    elemento.classList.add("card-selFail");
  }

  setTimeout(function () {
    naveEsp.style.transition =  "";
    isThrusting = false;
  }, 1500);

  setTimeout(function () {
    naveEsp.style.backgroundImage = "url(img/nave.gif)";
  }, 4000);
  setTimeout(function () {
    cargPreg();
  }, 2000);
}

function resultadoFinal(resul) {
  $("#principal").fadeToggle(1000);
  $("#final").fadeToggle(1000);

  if (resul == "sol") {
    var audio = new Audio("../../sounds/game_over.mp3");
    audio.play();
    document.getElementById("final").style.backgroundImage =
      "url(../../images/derrota.gif)";
    document.getElementById("texto_final").innerText =
      "Lo siento no has logrado completar el reto. Vuelve a intentarlo";
  } else {
    document.getElementById("final").style.backgroundImage =
      "url(../../images/victoria.gif)";
    var audio = new Audio("../../sounds/victory.mp3");
    audio.play();
    document.getElementById("texto_final").innerText =
      "Felicitaciones has logrado completar el reto";
  }
}

var tierra = document.getElementById("tierra");
var naveEsp = document.getElementById("nave");
var naveVelocity = 0;
var naveThrust = 0.01;
var naveGravity = 0.001; // Valor de gravedad reducido
var isThrusting = false;
var naveExp = true;

// Función para actualizar la posición y velocidad de la nave
function updateNave() {
  // Aplicar la gravedad
  naveVelocity += naveGravity;

  // Aplicar la fuerza de empuje
  if (isThrusting) {
    naveVelocity -= naveThrust;
  }

  // Actualizar la posición
  var navePosition = parseFloat(getComputedStyle(nave).left);
  navePosition -= naveVelocity;
  nave.style.left = navePosition + "px";

  // Verificar si la nave ha llegado a la Tierra
  var tierraPosition = parseFloat(getComputedStyle(tierra).left);
  if (
    navePosition + parseFloat(getComputedStyle(nave).width) >=
    tierraPosition + 150
  ) {
    // La nave ha llegado a la Tierra, aquí puedes agregar la lógica correspondiente
    setTimeout(function () {
      resultadoFinal("ganaste");
    }, 1000);
    naveExp = false;
  }

  // Verificar si la nave ha tocado el sol
  var solPosition =
    parseFloat(getComputedStyle(sol).left) +
    parseFloat(getComputedStyle(sol).width);

  if (navePosition <= solPosition - 100) {
    naveExp = false;
    setTimeout(function () {
      naveEsp.style.backgroundImage = "url(img/nave_destruida.gif)";
    }, 600);
    setTimeout(function () {
      resultadoFinal("sol");
    }, 2000);
  }

  // Solicitar la siguiente animación
  if (naveExp) {
    requestAnimationFrame(updateNave);
  }
}
