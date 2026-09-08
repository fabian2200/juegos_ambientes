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
          divAnimado.style.backgroundImage = "url(../../images/normal2.gif)";
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
  //Cambiar motos
  var divs = document.getElementsByClassName("moto-div");
  // Recorrer cada elemento y obtener el src de la imagen
  for (var i = 0; i < divs.length; i++) {
    var div = divs[i];
    var img = div.querySelector("img");
    var src = img.getAttribute("src");

    var newSrc = src.replace("Inicio", "");

    img.setAttribute("src", newSrc);
  }

  var background = document.body.style.backgroundPosition;
  if (background === "") {
    document.body.style.animation = "moverFondo 100s linear infinite";
    // animationInterval = setInterval(moveMeta,10000)
  }
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
        seleccionaPersonaje();
      }, 2000);
    }, 2000);
  }
}

function seleccionaPersonaje() {
  let audio2 = new Audio("../../sounds/fondo.mp3");
  audio2.play();

  Swal.fire({
    title: "Selecciona Tu Personaje ",
    html:
      '<div style="padding-top: 20px"  class="row">' +
      '<div class="col-3 "><div ><img onclick="seleccionarMoto(this, 0)" class="imagen_Moto" src="img/genioAzulInicio.gif" style="cursor:pointer;" width="100" alt=""></div></div>' +
      '<div class="col-3"><div ><img onclick="seleccionarMoto(this, 1)" class="imagen_Moto" src="img/genioRojaInicio.gif" style="cursor:pointer;" width="100" alt=""></div></div>' +
      '<div class="col-3"><div ><img onclick="seleccionarMoto(this, 2)" class="imagen_Moto" src="img/genioRosadaInicio.gif" style="cursor:pointer;" width="100" alt=""></div></div>' +
      '<div class="col-3"><div ><img onclick="seleccionarMoto(this, 3)" class="imagen_Moto" src="img/genioVerdeInicio.gif" style="cursor:pointer;" width="100" alt=""></div></div>' +
      '<div class="col-12 mt-1"><h2>Selecciona el Tema</h2></div>' +
      '<div class="col-1 ml-5"></div>' +
      '<div class="col-3 "><div style="pointer-events: none;" onclick="seleccionaTema(this,1)" class="div_tema">DEMONSTRATIVE: THIS/THESE/THAT/THOSE</div></div>' +
      '<div class="col-3"><div style="pointer-events: none;"  onclick="seleccionaTema(this,2)" class="div_tema">QUESTIONS WORDS WITH WHICH</div></div>' +
      '<div class="col-3"><div style="pointer-events: none;"  onclick="seleccionaTema(this,3)" class="div_tema">ADVERBS OF FREQUENCY</div></div>' +
      '<div class="col-1"></div>' +
      "</div>",
    showCloseButton: false,
    showCancelButton: false,
    showConfirmButton: false,
    allowOutsideClick: false,
    focusConfirm: false,
  });
}
var imgSel = "";

function seleccionarMoto(elemento, tipo) {
  elemento.classList.add("seleccionado");

  document.getElementById("Motos").style.display = "block";

  imgSel = motos[tipo];

  document.getElementById("imgMoto0").src = "img/" + imgSel;

  let newmoto = motos.filter((item) => item !== imgSel);

  let cons = 1;
  newmoto.forEach((mot, index) => {
    document.getElementById("imgMoto" + cons).src = "img/" + mot;
    cons++;
  });

  var temas = document.getElementsByClassName("div_tema");
  for (var i = 0; i < temas.length; i++) {
    var tem = temas[i];
    tem.style.pointerEvents = 'auto';
  }

}

var preguntasAleatoria;

function seleccionaTema(elemento, tem) {
  elemento.classList.add("seleccionado");

  switch (tem) {
    case 1:
      Preguntas = PreguntasTema1;
      break;
    case 2:
      Preguntas = PreguntasTema2;
      break;
    case 3:
      Preguntas = PreguntasTema2;
      break;
    default:
      break;
  }

  preguntasAleatoria = Preguntas.sort(() => Math.random() - 0.5).slice(0, 10);

  setTimeout(() => {
    swal.close();
    updateCounter();
  }, 1000);
}

var counterElement = document.getElementById("counter");

// Iniciar el contador en 3
var count = 3;

// Función para actualizar el contador y verificar si ha terminado
function updateCounter() {
  // Mostrar el número actual del contador
  counterElement.textContent = count;

  // Aplicar el zoom al cambiar de número
  counterElement.style.transform = "scale(1.5)";

  // Restaurar el tamaño original después del zoom
  setTimeout(function () {
    counterElement.style.transform = "scale(1)";
  }, 300);

  // Verificar si ha terminado el contador
  if (count === 0) {
    // Generar una alerta
    document.getElementById("counter").innerHTML = "Let`s go →";
    setTimeout(function () {
      document.getElementById("counter").innerHTML = "";
      iniciarCarrera();
      cargPreg();
    }, 300);

    return; // Terminar la ejecución de la función
  }

  // Reducir el contador en 1
  count--;

  // Esperar 1 segundo y llamar nuevamente a la función
  setTimeout(updateCounter, 1000);
}

var respCorrecta;
var index = 0;
var detenerMete;
const cards = document.querySelectorAll(".card");
function cargPreg() {

  cards.forEach((card, index) => {
    card.classList.remove(
      "card-selOk",
      "card-selFail"
    );
 
  });

  if (index < preguntasAleatoria.length) {
    var preguntaActual = preguntasAleatoria[index];
    document.getElementById("pregunta").innerHTML = preguntaActual.pregunta;

    let x = 1;
    for (var i = 0; i < preguntaActual.opciones.length; i++) {
      document.getElementById("Opc" + x).innerHTML = preguntaActual.opciones[i];
      x++;
    }
    respCorrecta = preguntaActual.opcion_correcta;
    index++;
  } else {
    cards.forEach((card, index) => {
      card.style.pointerEvents = "none";   
    });
    detenerMete= setTimeout(showMetaImage, 3000);

    setTimeout(function () {
      resultadoFinal();
    }, 6000);
  }
}

var animationInterval;
var respcorrectas=0;

function verResp(elemento) {
  if (elemento.textContent == respCorrecta) {
    elemento.classList.add("card-selOk");
    moverMoto(0);
    respcorrectas++;
  } else {
    elemento.classList.add("card-selFail");
    var motoAle = Math.floor(Math.random() * 3) + 1;
    moverMoto(motoAle);

  }

  setTimeout(function () {
    cargPreg();
  }, 2000);

}

function moverMoto(id) {
  var motoDiv = document.getElementById('motoDiv'+id);

  motoDiv.style.animationPlayState = 'running';

  setTimeout(function() {
    motoDiv.style.animationPlayState = 'paused';
  }, 1000);
  
}


function resultadoFinal() {
  $("#principal").fadeToggle(1000);
  $("#final").fadeToggle(1000);
clearTimeout(detenerMete);
  if (respcorrectas < 5) {
    var audio = new Audio("../../sounds/game_over.mp3");
    audio.play();
    document.getElementById("final").style.backgroundImage =
      "url(../../images/derrota.gif)";
    document.getElementById("texto_final").innerText = "Lo siento solo has perdido la carrera, solo lograste  contestar  " +
    respcorrectas +
      " de 10 Preguntas Posibles";
  } else {
    document.getElementById("final").style.backgroundImage =
      "url(../../images/victoria.gif)";
    var audio = new Audio("../../sounds/victory.mp3");
    audio.play();
    document.getElementById("texto_final").innerText =
      "Felicitaciones has ganado la Carrera, lograste contestar Correctamente  " +
      respcorrectas +
      " de 10 Preguntas Posibles";
  }

}

 // Después de 30 segundos, se muestra la imagen de la meta

function showMetaImage() {
var metaContainer = document.getElementById('metaImage');
metaContainer.style.display='block';
metaContainer.style.right = '0%';
}