const scoreBoard = document.querySelector("#score");
const moles = document.querySelectorAll(".mole");
const holes = document.querySelectorAll(".hole");

let score = 0;
let inscore = 0;
let timeUp = false;
let lastHole;

function ramdomTime(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

function ramdomHole(holes) {
  const randomHans = Math.floor(Math.random() * holes.length);
  const hole = holes[randomHans];
  if (hole === lastHole) {
    console.log("es el mismo hueco " + randomHans);
    return ramdomHole(holes);
  }

  lastHole = hole;
  return hole;
}

function peep() {
  const time = ramdomTime(2500, 3000);
  const topo = ramdomHole(holes);
  topo.classList.remove("over");
  topo.classList.remove("bajar");
  topo.classList.add("up");
  setTimeout(() => {
    topo.classList.remove("up");
    if (!timeUp) peep();
  }, time);
}

let numeroPregunta = 0;
let preguntas = [];

function startGame() {
  if (numeroPregunta < 10) {
    let moles_divs = [];
    for (let index = 0; index < moles.length; index++) {
      const element = moles[index];
      moles_divs.push(element);
    }

    moles_divs = randomValueGenerator(moles_divs);

    var pregunta = preguntas[numeroPregunta];

    document.getElementById("pregunta").innerText = pregunta.pregunta;
    var opciones = pregunta.opciones;

    for (let index = 0; index < 4; index++) {
      const element = moles_divs[index];
      element.setAttribute("data-id", opciones[index][1]);
      element.innerHTML = "<h5 style='margin-top: 36%; width: 50%; height: fit-content;' class='respuesta'>" + opciones[index][0] + "</h5>"
    }

    moles.forEach((topo) => topo.addEventListener("click", wack));
    timeUp = false;
    peep();
    setTimeout(() => (timeUp = true), 900000);
  } else {
    $('#principal').fadeToggle(500);
    setTimeout(() => {
      $('#final').fadeToggle(1000);
    }, 500)

    if (((score / 10) * 100) < 60) {
      document.getElementById("final").style.backgroundImage = "url(../../images/derrota.gif)";
      var audio = new Audio('../../sounds/game_over.mp3');
      audio.play();
    } else {
      document.getElementById("final").style.backgroundImage = "url(../../images/victoria.gif)";
      var audio = new Audio('../../sounds/victory.mp3');
      audio.play();
    }

    document.getElementById("texto_final").innerText = "Has contestado correctamente " + score + " de " + "10 preguntas.";
    
  }
}

function wack(e) {
  moles.forEach((topo) => topo.setAttribute("onclick", ""));
  timeUp = true;
  if (!e.isTrusted) return;
  let dt = this.getAttribute("data-id");
  if (dt == "true") {
    this.parentElement.classList.add("ok");
    setTimeout(() => {
      this.parentElement.classList.add("bajar");

      setTimeout(() => {
        this.parentElement.classList.remove("ok");
        numeroPregunta++;
        startGame();
      }, 2000);
    }, 1500)
    score++;
    scoreBoard.innerText = "Correctas " + score;
  } else {
    this.parentElement.classList.add("over");
    setTimeout(() => {
      this.parentElement.classList.add("bajar");
      setTimeout(() => {
        this.parentElement.classList.remove("over");
        numeroPregunta++;
        startGame();
      }, 2000);
    }, 1500)
    inscore++;
  }

}

let tipo_ope = 0;
$(document).ready(function () {
  var base_preguntas = readText("preguntas.json");
  preguntas = JSON.parse(base_preguntas);
  preguntas = randomValueGenerator(preguntas);

  setTimeout(() => {
    $('#principal').fadeToggle(1000);
    $('#fondo_blanco').fadeToggle(3000);
    setTimeout(() => {
      const divAnimado = document.querySelector('.overlay');
      divAnimado.style.animationName = 'moverDerecha';
      divAnimado.style.animationDirection = 'normal';
      divAnimado.style.display = 'block';
      setTimeout(() => {
        const divAnimado2 = document.querySelector('.nube');
        divAnimado2.style.animationName = 'moverArriba';
        divAnimado2.style.animationDirection = 'normal';
        divAnimado2.style.display = 'block';
        setTimeout(() => {
          divAnimado.style.backgroundImage = "url(../../images/normal2.gif)"
          maquina2("bienvenida", 'Hola, soy Genio. <br> En este juego deberás seleccionar el topo que tenga la respuesta correcta, de la pregunta que se te muestra en el enunciado. <br> ¡Tu Puedes!', 50, 1);
        }, 3000)
      }, 2000)
    })
  }, 200)
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
          document.querySelector('#btnomitir').style.display = "none";
          setTimeout(() => {
            cerrar_anuncio();
          }, 3000)
        }
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
    const divAnimado2 = document.querySelector('.nube');
    divAnimado2.style.animationName = 'moverabajo';
    const divAnimado = document.querySelector('.overlay');
    divAnimado.style.backgroundImage = "url(../../images/normal1.gif)";
    $('#fondo_blanco').fadeToggle(3000);
    setTimeout(function () {
      divAnimado.style.animationName = 'moverIzquierda';
      divAnimado.style.animationDirection = 'normal';
      setTimeout(() => {
        $('#principal').fadeToggle(1000);
        startGame();
      }, 2000)
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