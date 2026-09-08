let conse = 0;
let score = 0;
let timer;
let PregMostrada = [];

let preguntas = [
  {
    pregunta: "El Sol es una estrella.",
    respuesta: true,
  },
  {
    pregunta: "La Luna es un satélite natural de la Tierra.",
    respuesta: true,
  },
  {
    pregunta:
      "Los planetas del sistema solar giran en órbitas circulares alrededor del Sol.",
    respuesta: false,
  },
  {
    pregunta:
      "La gravedad es la fuerza que mantiene a los planetas en órbita alrededor del Sol.",
    respuesta: true,
  },
  {
    pregunta:
      "El cinturón de asteroides es una región del sistema solar situada entre Venus y la Tierra.",
    respuesta: false,
  },
  {
    pregunta: "La Vía Láctea es la única galaxia en el universo.",
    respuesta: false,
  },
  {
    pregunta: "El planeta más cercano al Sol es Mercurio.",
    respuesta: true,
  },
  {
    pregunta:
      "Los planetas terrestres del sistema solar son Mercurio, Venus, la Tierra y Marte.",
    respuesta: true,
  },
  {
    pregunta:
      "El cometa Halley es visible desde la Tierra cada 10 años aproximadamente.",
    respuesta: true,
  },
  {
    pregunta: "La atmósfera de Marte es similar a la de la Tierra.",
    respuesta: false,
  },
  {
    pregunta: "La Luna tiene un efecto importante en las mareas de la Tierra.",
    respuesta: true,
  },
  {
    pregunta: "El planeta Júpiter tiene un sistema de anillos como Saturno.",
    respuesta: false,
  },
  {
    pregunta: "El universo se está expandiendo constantemente.",
    respuesta: true,
  },
  {
    pregunta: "Las estrellas son cuerpos celestes que emiten luz propia.",
    respuesta: true,
  },
  {
    pregunta: "El planeta Neptuno es el más lejano del sistema solar.",
    respuesta: true,
  },
  {
    pregunta: "La estrella más cercana al sistema solar es Alfa Centauri.",
    respuesta: true,
  },
  {
    pregunta: "El planeta Venus es el más caliente del sistema solar.",
    respuesta: true,
  },
  {
    pregunta: "La estrella polar es la más brillante del cielo nocturno.",
    respuesta: false,
  },
  {
    pregunta:
      "La Nebulosa del Cangrejo es una de las más brillantes en el cielo nocturno.",
    respuesta: true,
  },
  {
    pregunta: "El telescopio Hubble es un telescopio terrestre.",
    respuesta: false,
  },
  {
    pregunta: "La mayoría de las estrellas del universo son enanas rojas.",
    respuesta: true,
  },
  {
    pregunta: "La Luna tiene una superficie lisa y sin cráteres.",
    respuesta: false,
  },
  {
    pregunta:
      "El planeta Saturno tiene más satélites que cualquier otro planeta en el sistema solar.",
    respuesta: true,
  },
  {
    pregunta:
      "El planeta Urano tiene un eje de rotación inclinado en un ángulo de 98 grados.",
    respuesta: true,
  },
  {
    pregunta:
      "La lluvia de meteoros de las Perseidas ocurre cada año en agosto.",
    respuesta: true,
  },
  {
    pregunta:
      "La distancia promedio entre la Tierra y el Sol es de 150 millones de kilómetros.",
    respuesta: true,
  },
  {
    pregunta:
      "La constelación de Orión es visible en el cielo nocturno durante todo el año.",
    respuesta: false,
  },
  {
    pregunta:
      "El cinturón de Kuiper es una región del sistema solar situada más allá de la órbita de Neptuno.",
    respuesta: true,
  },
  {
    pregunta:
      "La estrella Betelgeuse es una supergigante roja que se encuentra en la constelación de Orión.",
    respuesta: true,
  },
];

// Función para iniciar el juego
function startGame() {
  // Configuración inicial
  inicioTiempo();
  score = 0;

  setInterval(moveDiv, 300);
}

const miDiv = document.getElementById("miDiv");
let position = -700;
let movement = 20;
let RespActual;
mostrarPregunta();

function moveDiv() {
  position += movement;
  miDiv.style.transition = "all 0.3s linear";
  miDiv.style.left = position + "px";

  if (position > (window.innerWidth + 100)) {
    miDiv.style.transition = "all 0s linear";
    position = -700;
    miDiv.style.left = position + "px";
    document.getElementById("btn-respuestas").style.pointerEvents = "auto";
    mostrarPregunta();
  }
}

function mostrarPregunta() {

  document.getElementById("img-resp").style.display="none";
  document.getElementById("texto-nave").style.display="block";

  movement = 20;
  position += movement;
  miDiv.style.left = position + "px";
  let indexPreg = obtenerIndiceAleatorio();

  document.getElementById("texto-nave").innerHTML =
    preguntas[indexPreg].pregunta;
  RespActual = preguntas[indexPreg].respuesta;
}

function obtenerIndiceAleatorio() {
  let indice = Math.floor(Math.random() * preguntas.length);
  while (PregMostrada.includes(indice)) {
    indice = Math.floor(Math.random() * preguntas.length);
  }
  PregMostrada.push(indice);

  return indice;
}

function verfResp(resp) {
  conse++;
  document.getElementById("btn-respuestas").style.pointerEvents = "none";

  let divImgResp=  document.getElementById("img-resp");
  document.getElementById("texto-nave").style.display="none";
  divImgResp.style.display="block";

  if (resp === RespActual) {
    score++;
    movement = 100;
    position += movement;
    miDiv.style.left = position + "px";
    divImgResp.src="../../images/correcto.gif";
    var audio = new Audio('../../sounds/ok.mp3');
    audio.play();
  } else {
    movement = 100;
    position += movement;
    miDiv.style.left = position + "px";
    divImgResp.src="../../images/incorrecto.gif";
    var audio = new Audio('../../sounds/over.mp3');
    audio.play();
  }

  console.log(score);
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
            "Hola, soy Genio. <br> En este juego se iran presentando afirmaciones relacionadas al universo, donde tendras que identificar si es Verdadera o Falsa",
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
  if (!cerrardo) {
    let audio = new Audio('../../sounds/fondo.mp3');
    audio.play();
    audio.volume = 0.2;
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

function inicioTiempo() {
  // Obtenemos el elemento del contador
  var contador = document.getElementById("contador");

  // Convertimos 3 minutos a milisegundos
  var tiempoLimite = 3 * 60 * 1000;

  // Obtenemos la hora actual
  var horaActual = new Date().getTime();

  // Establecemos la hora límite
  var horaLimite = horaActual + tiempoLimite;

  // Actualizamos el contador cada segundo
  var intervalo = setInterval(function () {
    // Obtenemos la hora actual
    var horaActual = new Date().getTime();

    // Calculamos la distancia entre la hora límite y la hora actual
    var distancia = horaLimite - horaActual;

    // Calculamos los minutos y segundos restantes
    var minutos = Math.floor((distancia % (1000 * 60 * 60)) / (1000 * 60));
    var segundos = Math.floor((distancia % (1000 * 60)) / 1000);

    // Mostramos el contador en formato mm:ss
    contador.innerHTML =
      "Tiempo restante: " +
      (minutos < 10 ? "0" : "") +
      minutos +
      ":" +
      (segundos < 10 ? "0" : "") +
      segundos;

    // Si el tiempo ha expirado, detenemos el intervalo y mostramos un mensaje
    if (distancia < 0) {
      clearInterval(intervalo);
      contador.innerHTML = "00:00";
      resultadoFinal();
    }
  }, 1000);
}

function resultadoFinal() {
  $("#principal").fadeToggle(1000);
  $("#final").fadeToggle(1000);

  let npreg = conse;
  let prom = npreg / 2;

  if (score <= prom) {
    var audio = new Audio("../../sounds/game_over.mp3");
    audio.play();
    document.getElementById("final").style.backgroundImage =
      "url(../../images/derrota.gif)";
  } else {
    document.getElementById("final").style.backgroundImage =
      "url(../../images/victoria.gif)";
    var audio = new Audio("../../sounds/victory.mp3");
    audio.play();
  }
  document.getElementById("texto_final").innerText =
    "Lograste responder correctamente " + score + " de " + npreg+" preguntas.";
}
