let conse = 0;
let score = 0;
let timer;

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
            "Hola, soy Genio. En este juego, deberás identificar el tejido oculto. Para lograrlo, deberás responder correctamente una serie de preguntas las cuales contarán con un tiempo para responder, debes de presionar el botón para contestar. ",
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
  if(!cerrardo){
    let audio2 = new Audio("../../sounds/fondo.mp3");
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
        iniciar();
      }, 2000);
    }, 2000);
  }
}

function resultadoFinal(resul) {
  $("#principal").fadeToggle(1000);
  $("#final").fadeToggle(1000);

  console.log(userScore);
  if (userScore <3) {
    var audio = new Audio("../../sounds/game_over.mp3");
    audio.play();
    document.getElementById("final").style.backgroundImage = "url(../../images/derrota.gif)";
    document.getElementById("texto_final").innerText = "Vuelve a intentarlo, solo has identificado "+userScore +" de 5 Posibles";
  } else {
    document.getElementById("final").style.backgroundImage = "url(../../images/victoria.gif)";
    var audio = new Audio("../../sounds/victory.mp3");
    audio.play();
    document.getElementById("texto_final").innerText = "Felicitaciones Lograste identificar "+userScore+" de 5 Posibles";
  }
}

let respCorrecta = "";
let idPreSelect;
let PregMostrada = [];
let divMostrado = [];
var divs = document.getElementsByClassName("ocultarDiv");
var intervalo;
var intervaloTimeOut;
let ctpreg=0;

function iniciar() {
  ctpreg++;
  document.getElementById("idnpreg").innerHTML=ctpreg;
  idPreSelect = obtenerIndiceAleatorio();
  var preguntaActual = Preguntas[idPreSelect];
  document.getElementById("preguntaActual").innerHTML = preguntaActual.question;
  document.getElementById("imagenDiv").style.backgroundImage =
    "url(img/" + preguntaActual.img + ")";
  respactual = preguntaActual.respuesta;
  document.getElementById("imgBoton").style.pointerEvents = "auto"
  intervalo = setInterval(actualizarContador, 1000);
  setTimeout(inicioMostrarimg, 1000);
}

function inicioMostrarimg() {
  let indeimg = obtenerIndiceAleatorioDiv();
  divs[indeimg].style.opacity = 0;

  if (indeimg < divs.length) {
    intervaloTimeOut = setTimeout(inicioMostrarimg, 1000); // Espera 1 segundo antes de cambiar al siguiente div
  }
}


function descubrirTejido() {
  contador = 30;
  intervaloTimeOut = setTimeout(inicioMostrarimgToda, 100);
 // clearTimeout(intervaloTimeOut);
 if(ctpreg<5){
  setTimeout(ocultardivsImg, 10000);
  setTimeout(iniciar, 15000);
  
 }else{
  setTimeout(resultadoFinal, 9000);
 }
}

function inicioMostrarimgToda() {
  let indeimg = obtenerIndiceAleatorioDiv();
  divs[indeimg].style.opacity = 0;
  if (indeimg < divs.length) {
    intervaloTimeOut = setTimeout(inicioMostrarimgToda, 100); // Espera 1 segundo antes de cambiar al siguiente div
  }

}

var contadorElemento = document.getElementById("contador");
var contador = 30;

function actualizarContador() {
  contador--;
  contadorElemento.textContent = contador;

  if (contador === 0) {
    clearInterval(intervalo);
    clearTimeout(intervaloTimeOut);
    $("#principal").fadeToggle(1000);

    abrirModal();
    document.getElementById("imgBoton").style.pointerEvents = "none";
  }
}

function contestador() {    
  clearInterval(intervalo);
  clearTimeout(intervaloTimeOut);
  $("#principal").fadeToggle(1000);
  abrirModal();
  document.getElementById("imgBoton").style.pointerEvents = "none";

}

function obtenerIndiceAleatorio() {
  let indice = Math.floor(Math.random() * Preguntas.length);
  while (PregMostrada.includes(indice)) {
    indice = Math.floor(Math.random() * Preguntas.length);
  }
  PregMostrada.push(indice);

  return indice;
}

function obtenerIndiceAleatorioDiv() {
  let indice = Math.floor(Math.random() * divs.length);
  if (divMostrado.length < divs.length) {
    while (divMostrado.includes(indice)) {
      console.log(divMostrado.length + "<=" + divs.length);
      indice = Math.floor(Math.random() * divs.length);
    }
    divMostrado.push(indice);
  }
  return indice;
}

function abrirModal() {
  const modal = document.querySelector("#modal");
  modal.classList.add("md--active");

  iniciarTrivia(idPreSelect);
  // Agregar la clase 'abierto' al modal después de un breve retraso para que se aplique la animación
  setTimeout(function () {
    // modal.classList.add('abierto');
  }, 100);
}

var ocultarDivs = document.getElementsByClassName("ocultarDiv");
var imagenDiv = document.getElementById("imagenDiv");
ocultardivsImg();

function ocultardivsImg(){
  // Oculta la imagen de fondo
clearTimeout(intervaloTimeOut);
imagenDiv.style.opacity = "1";

// Calcula el número de filas y columnas necesarias para distribuir los divs uniformemente
var filas = Math.ceil(Math.sqrt(ocultarDivs.length));
var columnas = Math.ceil(ocultarDivs.length / filas);

// Calcula el tamaño y la posición de cada div
var divWidth = 100 / columnas;
var divHeight = 100 / filas;
var divIndex = 0;

for (var i = 0; i < filas; i++) {
  for (var j = 0; j < columnas; j++) {
    if (divIndex >= ocultarDivs.length) {
      break;
    }

    var posX = j * divWidth;
    var posY = i * divHeight;

    ocultarDivs[divIndex].style.width = divWidth + "%";
    ocultarDivs[divIndex].style.height = divHeight + "%";
    ocultarDivs[divIndex].style.left = posX + "%";
    ocultarDivs[divIndex].style.top = posY + "%";
    ocultarDivs[divIndex].style.opacity = "1";

    divIndex++;
  }
}
}

