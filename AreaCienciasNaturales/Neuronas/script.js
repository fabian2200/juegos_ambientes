let conse = 0;
let score = 0;
let timer;
let PregMostrada = [];
let partesR = 16;
let imgSistema = "";
let nombreSistema = "";

var preguntas = [
  {
    parte: "Nucleo",
    imagen: "img/neuronas/Nucleo.png",
    definiciones: {
      1: "Almacenamiento de ADN",
      2: "Regulación de la síntesis proteica",
    },
  },
  {
    parte: "Axon",
    imagen: "img/neuronas/Axon.png",
    definiciones: {
      1: "Transmisión de señales eléctricas",
      2: "Conducción rápida de impulsos nerviosos",
    },
  },
  {
    parte: "Dendritas",
    imagen: "img/neuronas/Dendritas.png",
    definiciones: {
      1: "Recepción de señales de otras células nerviosas",
      2: "Integración de información neuronal",
    },
  },
  {
    parte: "Sinapsis",
    imagen: "img/neuronas/Sinapsis.png",
    definiciones: {
      1: "Transmisión de señales entre neuronas",
      2: "Regulación de la comunicación neuronal",
    },
  },
  {
    parte: "Soma",
    imagen: "img/neuronas/Soma.png",
    definiciones: {
      1: "Integración y procesamiento de señales nerviosas",
      2: "Producción de proteínas necesarias para el funcionamiento neuronal",
    },
  },
  {
    parte: "Neuronas_sensoriales",
    imagen: "img/neuronas/Neuronas_sensoriales.png",
    definiciones: {
      1: "Recepción de estímulos sensoriales del entorno",
      2: "Transmisión de la información sensorial al sistema nervioso central",
    },
  },
  {
    parte: "Neuronas_motoras",
    imagen: "img/neuronas/Neuronas_motoras.png",
    definiciones: {
      1: "Activación de la contracción muscular",
      2: "Transmisión de señales motoras desde el sistema nervioso central hacia los músculos y glándulas",
    },
  },
  {
    parte: "Interneuronas",
    imagen: "img/neuronas/Interneuronas.png",
    definiciones: {
      1: "Conexión y comunicación entre otras neuronas",
      2: "Integración y procesamiento de la información dentro del sistema nervioso central",
    },
  },
  {
    parte: "Neuronas_unipolares",
    imagen: "img/neuronas/Neuronas_unipolares.png",
    definiciones: {
      1: "Poseen una sola prolongación que se divide en una rama central y una rama periférica",
      2: "Transmiten señales sensoriales desde los receptores hacia el sistema nervioso central",
    },
  },
  {
    parte: "Neuronas_bipolares",
    imagen: "img/neuronas/Neuronas_bipolares.png",
    definiciones: {
      1: "Tienen dos prolongaciones: un axón y una dendrita opuesta",
      2: "Se encuentran principalmente en los órganos sensoriales especializados, como la retina y el oído interno",
    },
  },
  {
    parte: "Neuronas_multipolares",
    imagen: "img/neuronas/Neuronas_multipolares.png",
    definiciones: {
      1: "Poseen múltiples dendritas y un solo axón",
      2: "Son las neuronas más comunes y se encuentran en el sistema nervioso central y periférico",
    },
  },
  {
    parte: "Neuronas_seudo-unipolares",
    imagen: "img/neuronas/Neuronas_seudo-unipolares.png",
    definiciones: {
      1: "Tienen una única prolongación que se ramifica en dos ramas distintas",
      3: "Estas neuronas son comunes en los ganglios espinales y en los ganglios de los nervios craneales",
    },
  },
];

// Función para iniciar el juego
var preguntasAleatorias;
var index = 0;
var respactual = "";
var respCorrectas = 0;
var respIncorrectas = 0;
var actual = 0;

function startGame() {
  preguntasAleatorias = preguntas.sort(() => Math.random() - 0.5).slice(0, 6);
  cargPreg();
  inicioTiempo();
}
function inicioTiempo() {
  // Obtenemos el elemento del contador
  var contador = document.getElementById("contador");

  // Convertimos 3 minutos a milisegundos
  var tiempoLimite = 2 * 60 * 1000;

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
    contador.innerHTML = (minutos < 10 ? "0" : "") + minutos + ":" + (segundos < 10 ? "0" : "") +
      segundos;

    // Si el tiempo ha expirado, detenemos el intervalo y mostramos un mensaje
    if (distancia < 0) {
      clearInterval(intervalo);
      contador.innerHTML = "00:00";
      resultadoFinal("tiempo");
    }
  }, 1000);
}

function cargPreg() {
  let array_divs = [];
  let x = 0;

  for (let index = 0; index < preguntasAleatorias.length; index++) {
    x++;
    array_divs.push(
      "<div class='col-3 cuadro' data-id='" +
        preguntasAleatorias[index].parte +
        "' onclick='verfResp(this.id)' id='" +
        x +
        "' ><img style='width: 100px;'  src='" +
        preguntasAleatorias[index].imagen +
        "'></div>"
    );

    // Obtener las definiciones del elemento aleatorio
    var definiciones = preguntasAleatorias[index].definiciones;

    // Obtener una clave aleatoria de las definiciones
    var keys = Object.keys(definiciones);
    var randomKey = keys[Math.floor(Math.random() * keys.length)];

    // Obtener la definición correspondiente a la clave aleatoria
    var randomDefinicion = definiciones[randomKey];
    x++;

    array_divs.push(
      "<div class='col-3 cuadro' style='background-image: url(img/pregunta.png); background-size: 70% 70%; background-repeat: no-repeat; background-position: center;' data-id='" +
        preguntasAleatorias[index].parte +
        "' onclick='verfResp(this.id)' id='" +
        x +
        "' ><label class='textCuadro'>" +
        randomDefinicion +
        "</label></div>"
    );
  }

  array_divs = randomValueGenerator(array_divs);

  div = "";
  for (let index = 0; index < array_divs.length; index++) {
    const element = array_divs[index];
    div += element;
  }

  document.getElementById("divTemas").innerHTML = "";
  document.getElementById("divTemas").innerHTML = div;
}
var neusel = "";

function verfResp(neur) {
  var element = document.getElementById(neur);
  element.classList.add("cuadroSelected");
  var neur = element.getAttribute("data-id");


  if (neusel == "") {
    neusel = neur;
  } else {
    if (neusel == neur) {
      const elementos = document.getElementsByClassName("cuadroSelected");
      for (let i = 0; i < elementos.length; i++) {
        elementos[i].classList.add("desintegrar");
      }

      setTimeout(function() {
        for (let i = 0; i < elementos.length; i++) {
        elementos[i].parentNode.removeChild(elementos[i]);
      }
      }, 1000); 

    } else {
      element.classList.remove("cuadroSelected");

      const elementos = document.getElementsByClassName("cuadroSelected");

      // Recorre los elementos y elimina la clase
      for (let i = 0; i < elementos.length; i++) {
        elementos[i].classList.remove("cuadroSelected");
      }

      neusel = "";
    }
  }

  const elementos = document.getElementsByClassName("desintegrar");

  if(elementos.length==7){
    resultadoFinal("finalizdo");
  }
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
          divAnimado.style.backgroundImage =
            "url(../../images/ciencia/normal2.gif)";
          maquina2(
            "bienvenida",
            "Hola, soy Genio. En este juego se mostrarán definiciones relacionadas con las Neuronas, deberás relacionar la definición con la imagen correspondiente. Terminar el Juego antes de que termine el tiempo y ganaras. Tú Puedes...",
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
    let audio2 = new Audio("../../sounds/fondo.mp3");
    audio2.play();
    audio2.volume = 0.2;
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
        startGame();
      }, 2000);
    }, 2000);
  }
}

function resultadoFinal(resul) {
  $("#principal").fadeToggle(1000);
  $("#final").fadeToggle(1000);


  if (resul == "tiempo") {
    var audio = new Audio("../../sounds/game_over.mp3");
    audio.play();
    document.getElementById("final").style.backgroundImage =
      "url(../../images/ciencia/derrota.gif)";
    document.getElementById("texto_final").innerText ="Lo siento el tiempo a terminado y no has logrado completar el reto";
  } else {
    document.getElementById("final").style.backgroundImage = "url(../../images/ciencia/victoria.gif)";
    var audio = new Audio("../../sounds/victory.mp3");
    audio.play();
    document.getElementById("texto_final").innerText = "Felicitaciones has logrado completar el reto";
  }
}

//Random value from Array
const randomValueGenerator = (vector) => {
  return vector.sort(function (a, b) {
    return Math.random() - 0.5;
  });
};
