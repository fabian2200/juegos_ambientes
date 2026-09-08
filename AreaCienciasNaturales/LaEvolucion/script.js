let conse = 0;
let score = 0;
let timer;

function obtenerIndiceAleatorio() {
  let indice = Math.floor(Math.random() * preguntas.length);
  while (PregMostrada.includes(indice)) {
    indice = Math.floor(Math.random() * preguntas.length);
  }
  PregMostrada.push(indice);

  return indice;
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
            "Hola, soy Genio. <br> En este juego, deberás identificar qué homínido aparece en la imagen. Para lograrlo, deberás responder correctamente una serie de preguntas que te mostrarán partes del homínido a identificar.</strong> ",
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



  if (resul=="fail") {
    var audio = new Audio("../../sounds/game_over.mp3");
    audio.play();
    document.getElementById("final").style.backgroundImage =
      "url(../../images/derrota.gif)";
      document.getElementById("texto_final").innerText = "Vuelve a intentarlo, no Logrado identificar el Homínido";
  } else {
    document.getElementById("final").style.backgroundImage =
      "url(../../images/victoria.gif)";
    var audio = new Audio("../../sounds/victory.mp3");
    audio.play();
    document.getElementById("texto_final").innerText = "Felicitaciones Lograste identificar el Homínido";
  }

}

let respCorrecta = "";
function iniciar() {
  // Obtener un índice aleatorio dentro del rango del array
  var indiceAleatorio = Math.floor(Math.random() * hominidos.length);

  // Obtener el elemento aleatorio seleccionado
  var elementoAleatorio = hominidos[indiceAleatorio];
  document.getElementById("imagenDiv").style.backgroundImage =
    "url(" + elementoAleatorio.imagen + ")";

  respCorrecta = elementoAleatorio.opcion_correcta;

  let x=1;
  for (var i = 0; i < elementoAleatorio.opciones.length; i++) {
    document.getElementById("Opt" + x).innerHTML = elementoAleatorio.opciones[i];
    x++;
  }
 

  iniciarTrivia();
}

var ocultarDivs = document.getElementsByClassName("ocultarDiv");
var imagenDiv = document.getElementById("imagenDiv");

// Oculta la imagen de fondo
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

function verfResp(id) {
  var divsel= document.getElementById(id);
  var elementoP = divsel.querySelector("p.tip");
  var ocultarDivs = document.getElementsByClassName("ocultarDiv");
  // Obtener el texto contenido en el elemento <p>
  var RespSel = elementoP.innerText;
  // Calcula el número de filas y columnas necesarias para distribuir los divs uniformemente
  var filas = Math.ceil(Math.sqrt(ocultarDivs.length));
  var columnas = Math.ceil(ocultarDivs.length / filas);
  var divIndex = 0;
  if (RespSel == respCorrecta) {
   
    divsel.classList.remove("blue");
    divsel.classList.add("green");
  
    for (var i = 0; i < filas; i++) {
      for (var j = 0; j < columnas; j++) {
        if (divIndex >= ocultarDivs.length) {
          break;
        }
        ocultarDivs[divIndex].style.opacity = "0";

        divIndex++;
      }
    }

    setTimeout(()=> {
      resultadoFinal("ok");
    },5000)
    


  }else{
    divsel.classList.remove("blue");
    divsel.classList.add("red");
    setTimeout(()=> {
      resultadoFinal("fail");
    },5000)
  }
}


