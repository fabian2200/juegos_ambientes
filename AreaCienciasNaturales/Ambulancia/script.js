var motos = [
  "genioAzulInicio.gif",
  "genioRojaInicio.gif",
  "genioRosadaInicio.gif",
  "genioVerdeInicio.gif",
];
var motSel = [];

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
          divAnimado.style.backgroundImage =
            "url(../../images/ciencia/normal2.gif)";
          maquina2(
            "bienvenida",
            "Hola, soy Genio. <br> En este juego deberas llegar primero a la meta, para esto debes responder correctamente las preguntas relacionadas al tema DESCRIBING PEOPLE: APPEARANCE, para poder tomar la delantera.  <br> ¡Tú Puedes!",
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
  var background = document.body.style.backgroundPosition;
  if (background === "") {
    document.body.style.animation = "moverFondo 100s linear infinite";
    // animationInterval = setInterval(moveMeta,10000)
  }

  moverAmbu();

  setTimeout(() => {
    cargPreg();
    updateNave();
  }, 1000);
}

let cerrardo = false;
function cerrar_anuncio() {
  if (!cerrardo) {
    cerrardo = true;
    const divAnimado2 = document.querySelector(".nube");
    divAnimado2.style.animationName = "moverabajo";
    const divAnimado = document.querySelector(".overlay");
    divAnimado.style.backgroundImage = "url(../../images/ciencia/normal1.gif)";
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

var imgSel = "";

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
  document.getElementById("pregunta").src = preguntaActual.imagen;

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
var setVerCol;

function verResp(elemento) {
  var camilla = document.getElementById("camilla");
 
  cards.forEach((card, index) => {
    card.style.pointerEvents = "none";   
  });
  
  if (elemento.textContent == respCorrecta) {
    elemento.classList.add("card-selOk");
    
    isThrusting = true;
    naveEsp.style.backgroundImage = "url(img/camillero-rapido.gif)";

    setTimeout(function () {
      isThrusting = false;
    }, 300);

    setTimeout(function () {
  
      naveEsp.style.backgroundImage = "url(img/camillero-normal.gif)";
    }, 5000);

    respcorrectas++;
  } else {
    elemento.classList.add("card-selFail");
    var divhueco = document.createElement("div");
    divhueco.id = "huecoContainer";
    document.getElementById("Motos").appendChild(divhueco);
    detenerHueco = setTimeout(showHuecoImage, 10);
    setVerCol = setInterval(verificarColision, 10);

    setTimeout(function () {
      divhueco.remove();
      clearInterval(setVerCol);
    }, 8000);
  }

  setTimeout(function () {
    cargPreg();
    cards.forEach((card, index) => {
      card.style.pointerEvents = "auto";   
    });
  }, 4000);
}

function moverAmbu() {
  var ambuDiv = document.getElementById("ambuImage");

  setTimeout(function () {
    ambuDiv.style.animationPlayState = "paused";
  }, 3000);
}

function showHuecoImage() {
  var huecoContainer = document.getElementById("huecoContainer");
  huecoContainer.style.display = "block";
  huecoContainer.style.right = "0%";
}

function resultadoFinal(resul) {
  $("#principal").fadeToggle(1000);
  $("#final").fadeToggle(1000);

  if (resul == "pierde") {
    var audio = new Audio("../../sounds/game_over.mp3");
    audio.play();
    document.getElementById("final").style.backgroundImage =
      "url(../../images/ciencia/derrota.gif)";
    document.getElementById("texto_final").innerText =
      "Lo siento no has logrado alcanzar la Ambulancia ";
  } else {
    document.getElementById("final").style.backgroundImage =
      "url(../../images/ciencia/victoria.gif)";
    var audio = new Audio("../../sounds/victory.mp3");
    audio.play();
    document.getElementById("texto_final").innerText =
      "Felicitaciones has logrado alcanzar la ambulancia";
  }
}

// Después de 30 segundos, se muestra la imagen de la meta

function showMetaImage() {
  var metaContainer = document.getElementById("ambuImage");
  metaContainer.style.display = "block";
  metaContainer.style.right = "80%";
}


var tierra = document.getElementById("ambuImage");
var naveEsp = document.getElementById("camilla");
var naveVelocity = 0;
var naveThrust = 0.01;
var naveGravity = 0.0001; // Valor de gravedad reducido
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
  var navePosition = parseFloat(getComputedStyle(camilla).left);
  navePosition -= naveVelocity;
  camilla.style.left = navePosition + "px";

  // // Verificar si la nave ha llegado a la Tierra
  var tierraPosition = parseFloat(getComputedStyle(ambuImage).left);
  if (navePosition + parseFloat(getComputedStyle(camilla).width) >= tierraPosition+1000) {
    // La nave ha llegado a la Tierra, aquí puedes agregar la lógica correspondiente
    setTimeout(function () {
      resultadoFinal("ganaste");
    }, 1000);
    naveExp = false;

  }

  // Verificar si la nave ha tocado el sol
  var solPosition = parseFloat(getComputedStyle(pierde).left) + parseFloat(getComputedStyle(pierde).width);

  if (navePosition <= solPosition) {
    naveExp = false;
    setTimeout(function () {
      resultadoFinal("pierde");
    }, 100);
  }

  // Solicitar la siguiente animación
  if (naveExp) {
    requestAnimationFrame(updateNave);

  }
}


function showHuecoImage() {
  var huecoContainer = document.getElementById("huecoContainer");
  huecoContainer.style.display = "block";
  huecoContainer.style.right = "0%";
}

function verificarColision() {
  var div1 = document.getElementById("camilla");
  var div2 = document.getElementById("huecoContainer");

  var rect1 = div1.getBoundingClientRect();
  var rect2 = div2.getBoundingClientRect();

  if (
    rect1.left < rect2.right &&
    rect1.right > rect2.left &&
    rect1.top < rect2.bottom &&
    rect1.bottom > rect2.top
  ) {
    isThrusting = false;
  
    div1.classList.add("tambaleo");

    setTimeout(() => {
      div1.classList.remove("tambaleo");
    }, 1000);

  }
}
