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
            "Hola, soy Genio. <br> En este juego se seleccionará un Tema aleatorio, y debes elegir si quieres resolver preguntas de <strong>Verdadero o Falso</strong> o preguntas de <strong>Opción Múltiple</strong> ",
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
    divAnimado.style.backgroundImage = "url(../../images/normal1.gif)";
    $("#fondo_blanco").fadeToggle(3000);
    setTimeout(function () {
      divAnimado.style.animationName = "moverIzquierda";
      divAnimado.style.animationDirection = "normal";
      setTimeout(() => {
        $("#principal").fadeToggle(1000);
      
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

function iniciar(){
  var divs = document.querySelectorAll('.cuadro');
  var indiceAleatorio = Math.floor(Math.random() * divs.length);

  divs.forEach(function(div) {
    div.classList.remove('mi-clase');
  });

  divs[indiceAleatorio].classList.add('mi-clase');
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


var divs = document.querySelectorAll('.cuadro');
var divsOpc = document.querySelectorAll('.cuadroOpc');
var totalDivs = divs.length;
var timeoutId;
var animationRunning = true;
var idTem="";
var texto="";

// Aplica una animación suave a los divs
function animateDivs() {
  if (!animationRunning) {
    return;
  }

  var nextIndex = Math.floor(Math.random() * totalDivs);
  divs[nextIndex].classList.add('hoverDiv');

  timeoutId = setTimeout(function() {
    divs[nextIndex].classList.remove('hoverDiv');
    animateDivs();
  }, 1000); // Repetir cada 1 segundo
}

// Mostrar el índice del div seleccionado después de 10 segundos y detener la animación
function showIndexDuringAnimation() {
  var currentIndex = Array.from(divs).findIndex(function(div) {
    return div.classList.contains('hoverDiv');
  });

   var selectedDiv = divs[currentIndex];
   texto = selectedDiv.innerText;
   idTem = selectedDiv.id;

  console.log("El div seleccionado es el de índice: " + currentIndex);
  console.log("Texto: " + texto);
  console.log("ID: " + idTem);

  for (var i = 0; i < divsOpc.length; i++) {
    divsOpc[i].classList.remove('disabled');
  }

  animationRunning = false;
}


function AbrirVerdaderoFalso(){
  document.getElementById("divPregVerdFalso").style.display = "block";
  document.getElementById("divTemas").style.display = "none";
  iniciarVerdFalso(texto,idTem);
}

function AbrirMultiple(){
  document.getElementById("divPreguntas").style.display = "block";
  document.getElementById("divTemas").style.display = "none";
  iniciarTrivia(texto,idTem);
}


function iniciar(){
// Inicia la animación
var div = document.getElementById("textCentral");
  div.classList.add("disabledCentro");


animateDivs();

// Detener la animación después de 10 segundos
setTimeout(function() {
  showIndexDuringAnimation();
  clearTimeout(timeoutId);
}, 10000); // Detener después de 10 segundos (10,000 milisegundos)


}


function iniciarVerdFalso(text,idTem){

 
  if(idTem=="Div1"){
    questionsVerdFalso = Div1VF;
   }else if(idTem=="Div2"){
    questionsVerdFalso = Div2VF;
   }else if(idTem=="Div3"){
    questionsVerdFalso = Div3VF;
   }else if(idTem=="Div4"){
    questionsVerdFalso = Div4VF;
   }else if(idTem=="Div5"){
    questionsVerdFalso = Div5VF;
   }else if(idTem=="Div6"){
    questionsVerdFalso = Div6VF;
   }else if(idTem=="Div7"){
    questionsVerdFalso = Div7VF;
   }else if(idTem=="Div8"){
    questionsVerdFalso = Div8VF;
   }else if(idTem=="Div9"){
    questionsVerdFalso = Div9VF;
   }else if(idTem=="Div10"){
    questionsVerdFalso = Div10VF;
   }else if(idTem=="Div11"){
    questionsVerdFalso = Div11VF;
   }else if(idTem=="Div12"){
    questionsVerdFalso = Div12VF;
   }

   motrarPreg();


}
var  currentQuestionIndex=1;
var  PregMostradaVerFal=[];
var PregVerFalCorrectas=0;
var indexAle=0;
var imgGenio= document.getElementById("imgGenio");



    // Función para verificar la respuesta seleccionada
   
    function checkAnswer(answer) {

      const question = questionsVerdFalso[indexAle];
     

      if (answer === question.answer) {
        PregVerFalCorrectas++;
        imgGenio.src="../../images/correcto.gif";
      } else {
        imgGenio.src="../../images/incorrecto.gif";
       
      }
      setTimeout(function(){
        nextQuestion();
      },2000);
    }

    // Función para avanzar a la siguiente pregunta
    function nextQuestion() {
   
      imgGenio.src="../../images/pensando.gif";

      currentQuestionIndex++;
      if (currentQuestionIndex >= 11) {
        setTimeout(function(){
          resultadoFinalVerFal();
        },1500);
     
      } else {
        motrarPreg(); 
      }
    }

 function motrarPreg() {
  
   indexAle = obtenerIndiceAleatorioVerFal();
  const question = questionsVerdFalso[indexAle];
  console.log(questionsVerdFalso[indexAle]);
  document.getElementById("nPreg").innerHTML = "Pregunta "+currentQuestionIndex+"/10";
  document.getElementById('text_pregunta').textContent = question.text;

 }

 function obtenerIndiceAleatorioVerFal() {
  let indice = Math.floor(Math.random() * questionsVerdFalso.length);
  while (PregMostradaVerFal.includes(indice)) {
      indice = Math.floor(Math.random() * questionsVerdFalso.length);
  }
  PregMostradaVerFal.push(indice);

  return indice;
}
  

function resultadoFinalVerFal() {
  $("#principal").fadeToggle(1000);
  $("#final").fadeToggle(1000);

  if (PregVerFalCorrectas <= 6) {
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
    "Lograste responder correctamente " + PregVerFalCorrectas + " de 10 Preguntas.";
}

