let score = 0;
let timer;
let preguntas = [];
$(document).ready(function () {
  var base_preguntas = readText("data.json");
  preguntas = JSON.parse(base_preguntas);
  preguntas = randomValueGenerator(preguntas);
  setTimeout(function () {
    let audio2 = new Audio("../../sounds/enunciado_vocales_1.mp3");
    audio2.play();
  }, 100);

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
            "Hola, soy Genio. <br> En este juego se iran presentando preguntas relacionadas a los ángulos, donde tendras que identificar la respuesta correcta.",
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
        mostrarPregunta();
      }, 2000);
    }, 2000);
  }
}

function readText(ruta_local) {
  var texto = null;
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.open("GET", ruta_local, false);
  xmlhttp.send();
  if (xmlhttp.status == 200) {
      texto = xmlhttp.responseText;
  }
  return texto;
}


function randomValueGenerator(vector) {
  return vector.sort(function () { return Math.random() - 0.5 });
};

const miDiv = document.getElementById("miDiv");
var numPregunta = 0;
let clases = ["btn-success", "btn-info", "btn-warning", "btn-primary"];
function mostrarPregunta() {
  if(numPregunta < 8){
    document.getElementById("contador").innerText = "Pregunta "+(numPregunta+1)+" de 8";
    miDiv.style.animationName = "moveralCentro";

    document.getElementById("img-resp").style.display="none";
    document.getElementById("img-preg").style.display="none";
    document.getElementById("texto-nave").style.display="block";
    
    var preguntaMostrar = preguntas[numPregunta];
    document.getElementById("texto-nave").innerHTML = preguntaMostrar.pregunta; 
    
    if(preguntaMostrar.imagen != ""){
      document.getElementById("img-preg").style.display = "block";
      document.getElementById("img-preg").setAttribute("src", preguntaMostrar.imagen);
    }

    var opiones = preguntaMostrar.opciones;
    opciones = randomValueGenerator(opiones);
    clases = randomValueGenerator(clases);

    setTimeout(()=>{
      miDiv.style.backgroundImage = "url('nave_lenta.gif')";
    }, 5000);

    setTimeout(()=>{
      for (let index = 0; index < opiones.length; index++) {
        const element = opiones[index];
        var div = document.createElement("div");
        div.innerHTML ="<div onclick='verfResp("+element.correcta+", this)' class='opcion btn "+clases[index]+"'><p style='margin: 0'>"+element.opcion+"</p></div>"
        div.classList.add("col-6", "box", "new-box");
        document.querySelector("#btn-respuestas").appendChild(div);
      }
    }, 8000);

    numPregunta++;
  }else{
    $("#principal").fadeToggle(1000);
    $("#final").fadeToggle(1000);
    
    if (score <= 4) {
      var audio = new Audio("../../sounds/game_over.mp3");
      audio.play();
      document.getElementById("final").style.backgroundImage = "url(../../images/derrota.gif)";
    } else {
      document.getElementById("final").style.backgroundImage = "url(../../images/victoria.gif)";
      var audio = new Audio("../../sounds/victory.mp3");
      audio.play();
    }

    document.getElementById("texto_final").innerText = "Lograste responder correctamente " + score + " de 8 preguntas.";
  }
}



function verfResp(resp) {
  document.getElementById("btn-respuestas").style.pointerEvents = "none";

  let divImgResp=  document.getElementById("img-resp");
  document.getElementById("texto-nave").style.display="none";
  document.getElementById("img-preg").style.display="none";
  divImgResp.style.display="block";

  miDiv.style.backgroundImage = "url('nave.gif')"

  if (resp === true) {
    score++;
    divImgResp.src="../../images/correcto.gif";
    miDiv.style.animationName = "moveralFinal";
  } else {
    divImgResp.src="../../images/incorrecto.gif";
    miDiv.style.animationName = "moveralFinal";
  }

  setTimeout(()=>{
    document.getElementById("btn-respuestas").style.pointerEvents = "auto";
    var botones = document.getElementsByClassName("new-box");
    for (let index = 0; index < botones.length; index++) {
      const element = botones[index];
      element.style.animationName = "close-animate";
    }
    setTimeout(()=>{
      document.getElementById("btn-respuestas").innerHTML = "";
    }, 600)
  }, 3000);

  setTimeout(()=>{
    mostrarPregunta();
  }, 4300)
}