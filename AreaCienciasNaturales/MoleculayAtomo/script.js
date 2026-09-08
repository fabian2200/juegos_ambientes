let conse = 0;
let respuestaPreg = "";
let letraActual = "";

const isTouchDevice = () => {
  try {
    //We try to create Touch Event (It would fail for desktops and throw error)
    document.createEvent("TouchEvent");
    deviceType = "touch";
    return true;
  } catch (e) {
    deviceType = "mouse";
    return false;
  }
};

var initialXx = 0;
var initialYy = 0;

var top_o = 0;
var left_o = 0;
var id_sel = "";
function mover_tactil (event) {
  event.preventDefault();
  // Obtener la posición inicial del dedo
  initialXx = event.touches[0].clientX - event.target.parentElement.offsetLeft;
  initialYy = event.touches[0].clientY - event.target.parentElement.offsetTop;
  

  if(id_sel != event.target.id){
    currentElement = event.target;
    id_sel = currentElement.id;
    var offsets = document.getElementById(id_sel).parentElement;
    top_o = offsets.style.top;
    left_o = offsets.style.left;
  }

}

function mover_tactil2 (event) {
  event.preventDefault();
  // Obtener la posición actual del dedo
  var currentX = event.touches[0].clientX - initialXx;
  var currentY = event.touches[0].clientY - initialYy;

  // Actualizar la posición de la div
  event.target.parentElement.style.width = "50px";
  event.target.parentElement.style.height = "50px";

  event.target.parentElement.style.left = currentX + 'px';
  event.target.parentElement.style.top = currentY + 'px';

}

function dragStart(e) {
  if (isTouchDevice()) {
    initialX = e.touches[0].clientX;
    initialY = e.touches[0].clientY;
    //Start movement for touch
    moveElement = true;
    currentElement = e.target;
  } else {
    //For non touch devices set data to be transfered
    e.dataTransfer.setData("text", e.target.id);
  }
}

function dragEnd() {
  this.classList.remove("dragging");
}

function dragOver(e) {
  e.preventDefault();
}

function dragEnter(e) {
  e.preventDefault();
  this.classList.add("over");
}

function dragLeave() {
  this.classList.remove("over");
}

let cont = 0;

const drop = (e) => {
  e.preventDefault();
  //For touch screen
  if (isTouchDevice()) {
    moveElement = false;
    //Select country name div using the custom attribute
    const pos = currentElement.getBoundingClientRect();
    const currentDrop = document.elementsFromPoint(pos.left, pos.top);
    if(currentDrop[2].classList.contains("cajon")){
      currentDrop[2].innerHTML = ``;
      //Insert new img element
      currentDrop[2].insertAdjacentHTML(
        "afterbegin",
        `<img data-id='${id_sel}' class='img_drag' style='height: auto; width: 80%' src="img/${id_sel}.png">`
      );
      cont++; 
    }
  
    var off = document.getElementById(id_sel).parentElement;
    off.style.position = "absolute",
    off.style.top = top_o;
    off.style.left = left_o;
    off.style.width = "100px";
    off.style.height = "100px";
   
  } else {
    //Access data
    const draggedElementData = e.dataTransfer.getData("text");
    //Get custom attribute value
    const droppableElementData = e.target.getAttribute("data-id");
    const draggedElement = document.getElementById(draggedElementData);
    let imagen_id = draggedElement.getAttribute("data-id");

    if (droppableElementData === imagen_id) {
      draggedElement.classList.add("hide");
      e.target.innerHTML = "";
      e.target.classList.add("dropped");
      e.target.insertAdjacentHTML(
        "afterbegin",
        `<img data-id='${imagen_id}' class='img_drag' style='height: 95%; width: 95%' src="img/${imagen_id}.png">`
      );
      var audio = new Audio("../../sounds/ok.mp3");
      audio.play();
    } else {
      e.target.innerHTML = "";
      draggedElement.classList.add("hide");
      var audio = new Audio("../../sounds/over.mp3");
      audio.play();
      e.target.classList.add("error");
      e.target.insertAdjacentHTML(
        "afterbegin",
        `<img data-id='${imagen_id}' class='img_drag' style='height: 95%; width: 95%' src="img/${imagen_id}.png">`
      );
    }
    cont++;
   
  }
  if (cont == numero_elementos) {
    debugger
    let elementos_cajon = document.getElementsByClassName("cajon");
    let corerctas2=0;
    for (let index = 0; index < elementos_cajon.length; index++) {
      const element = elementos_cajon[index];
      if(element.getAttribute("data-id") == element.firstChild.getAttribute("data-id")){
        element.style.backgroundColor = "green";
        corerctas2++;
      }else{
        element.style.backgroundColor = "red";
      }

    }

    if(corerctas2==numero_elementos){
      correctas++;
      var audio = new Audio("../../sounds/ok.mp3");
      audio.play();
    }else{
      var audio = new Audio("../../sounds/over.mp3");
      audio.play();
    }

    setTimeout(() => {
      document.getElementById("molecule").innerHTML = "";
      cont=0;
      amarMolecula();
    }, 3000)

  }
};


var molecula_el = null;
var pregunta_actual = 0;
let correctas = 0;
let actual;

let numero_elementos = 0;



function amarMolecula() {
console.log(pregunta_actual);
  if (pregunta_actual < 5) {
    molecula_el = moleculas_array[pregunta_actual];
    // Obtener el contenedor de la molécula
    var molecula = document.getElementById("molecule");
    document.getElementById("tipo_mol").innerText = molecula_el.molecula;
    // Iterar sobre los elementos de la molécula
    numero_elementos = molecula_el.elementos.length;
    molecula_el.elementos.forEach(function (elemento) {
      // Crear el elemento div
      var div = document.createElement("div");
      div.setAttribute("data-id", elemento.nombre)

      // Asignar el simbolo del elemento como clase para aplicar los estilos
      div.className = elemento.nombre;
      div.classList.add("cajon");

      // Asignar las coordenadas y los estilos
      div.style.position = "absolute";
      div.style.left = elemento.coordenadas.x + "px";
      div.style.top = elemento.coordenadas.y + "px";
      div.style.width = elemento.ancho + "px";
      div.style.height = elemento.ancho + "px";
      div.style.borderRadius = "50%";
      div.style.border = "1px solid black";



      div.addEventListener("dragover", dragOver);
      div.addEventListener("dragenter", dragEnter);
      div.addEventListener("dragleave", dragLeave);
      div.addEventListener("drop", drop);

      molecula.appendChild(div);

    });
    pregunta_actual++;
  } else {
    $('#principal').fadeToggle(500);
    setTimeout(() => {
      $('#final').fadeToggle(1000);
    }, 500)
    if (correctas < 3) {
      document.getElementById("final").style.backgroundImage = "url(../../images/ciencia/derrota.gif)";
    } else {
      document.getElementById("final").style.backgroundImage = "url(../../images/ciencia/victoria.gif)";
    }

    document.getElementById("texto_final").innerText = "Has logrado armar correctamente " + correctas + " moléculas.";

    if (correctas >= 3) {
      var audio = new Audio('../../sounds/victory.mp3');
      audio.play();
    } else {
      var audio = new Audio('../../sounds/game_over.mp3');
      audio.play();
    }
  }
}

// Declaración de variables
let oxygen = {
  name: "oxigeno",
  image: "img/oxigeno.png",
};
let nitrogen = {
  name: "nitrogeno",
  image: "img/nitrogeno.png",
};
let carbon = {
  name: "carbono",
  image: "img/carbono.png",
};
let hidrogeno = {
  name: "hidrogeno",
  image: "img/hidrogeno.png",
};
let currentMolecule = [];
let score = 0;
let timer;

let atomNitrogeno = 0;
let atomOxigeno = 0;
let atomHidrogeno = 0;
let atomCarbono = 0;
let moleculeDiv = document.getElementById("molecule");

// Función para iniciar el juego
function startGame() {
  // Configuración inicial
  inicioTiempo();
  score = 0;
  amarMolecula();

  currentMolecule = [];


  let seconds = 0;
}



function randomValueGenerator(vector) {
  return vector.sort(function () { return Math.random() - 0.5 });
};


let moleculas_array = [
  {
    "molecula": "Agua",
    "elementos": [
      {
        "nombre": "oxigeno",
        "simbolo": "O",
        "ancho": 200,
        "coordenadas": {
          "x": 260,
          "y": 50
        }
      },
      {
        "nombre": "hidrogeno",
        "simbolo": "H",
        "ancho": 100,
        "coordenadas": {
          "x": 443,
          "y": 170
        }
      },
      {
        "nombre": "hidrogeno",
        "simbolo": "H",
        "ancho": 100,
        "coordenadas": {
          "x": 178,
          "y": 170
        }
      }
    ]
  },
  {
    "molecula": "metano",
    "elementos": [
      {
        "nombre": "carbono",
        "simbolo": "C",
        "ancho": 150,
        "coordenadas": {
          "x": 250,
          "y": 101
        }
      },
      {
        "nombre": "hidrogeno",
        "simbolo": "H",
        "ancho": 50,
        "coordenadas": {
          "x": 297,
          "y": 51
        }
      },
      {
        "nombre": "hidrogeno",
        "simbolo": "H",
        "ancho": 50,
        "coordenadas": {
          "x": 210,
          "y": 191
        }
      },
      {
        "nombre": "hidrogeno",
        "simbolo": "H",
        "ancho": 50,
        "coordenadas": {
          "x": 391,
          "y": 191
        }
      },
      {
        "nombre": "hidrogeno",
        "simbolo": "H",
        "ancho": 50,
        "coordenadas": {
          "x": 298,
          "y": 250
        }
      }
    ]
  },
  {
    "molecula": "Ácido nítrico",
    "elementos": [
      {
        "nombre": "nitrogeno",
        "simbolo": "N",
        "ancho": 200,
        "coordenadas": {
          "x": 170,
          "y": 102
        }
      },
      {
        "nombre": "oxigeno",
        "simbolo": "O",
        "ancho": 100,
        "coordenadas": {
          "x": 222,
          "y": 3
        }
      },
      {
        "nombre": "oxigeno",
        "simbolo": "O",
        "ancho": 100,
        "coordenadas": {
          "x": 75,
          "y": 188
        }
      },
      {
        "nombre": "oxigeno",
        "simbolo": "O",
        "ancho": 100,
        "coordenadas": {
          "x": 366,
          "y": 188
        }
      },
      {
        "nombre": "hidrogeno",
        "simbolo": "H",
        "ancho": 100,
        "coordenadas": {
          "x": 464,
          "y": 188
        }
      }
    ]
  },
  {
    "molecula": "Oxígeno",
    "elementos": [
      {
        "nombre": "oxigeno",
        "simbolo": "O",
        "ancho": 200,
        "coordenadas": {
          "x": 140,
          "y": 100
        }
      },
      {
        "nombre": "oxigeno",
        "simbolo": "O",
        "ancho": 200,
        "coordenadas": {
          "x": 340,
          "y": 100
        }
      }
    ]
  },
  {
    "molecula": "Dióxido de carbono",
    "elementos": [
      {
        "nombre": "carbono",
        "simbolo": "C",
        "ancho": 200,
        "coordenadas": {
          "x": 243,
          "y": 84
        }
      },
      {
        "nombre": "oxigeno",
        "simbolo": "O",
        "ancho": 150,
        "coordenadas": {
          "x": 96,
          "y": 148
        }
      },
      {
        "nombre": "oxigeno",
        "simbolo": "O",
        "ancho": 150,
        "coordenadas": {
          "x": 439,
          "y": 148
        }
      }
    ]
  },
  {
    "molecula": "Ácido clorhídrico",
    "elementos": [
      {
        "nombre": "cloro",
        "simbolo": "Cl",
        "ancho": 200,
        "coordenadas": {
          "x": 182,
          "y": 86
        }
      },
      {
        "nombre": "hidrogeno",
        "simbolo": "H",
        "ancho": 100,
        "coordenadas": {
          "x": 378,
          "y": 163
        }
      }
    ]
  },
  {
    "molecula": "Nitrógeno molecular",
    "elementos": [
      {
        "nombre": "nitrogeno",
        "simbolo": "N",
        "ancho": 150,
        "coordenadas": {
          "x": 182,
          "y": 104
        }
      },
      {
        "nombre": "nitrogeno",
        "simbolo": "N",
        "ancho": 150,
        "coordenadas": {
          "x": 330,
          "y": 104
        }
      }
    ]
  },
  {
    "molecula": "Cloruro de sodio",
    "elementos": [
      {
        "nombre": "sodio",
        "simbolo": "Na",
        "ancho": 150,
        "coordenadas": {
          "x": 166,
          "y": 130
        }
      },
      {
        "nombre": "cloro",
        "simbolo": "Cl",
        "ancho": 200,
        "coordenadas": {
          "x": 315,
          "y": 104
        }
      }
    ]
  },
  {
    "molecula": "Amoníaco",
    "elementos": [
      {
        "nombre": "nitrogeno",
        "simbolo": "N",
        "ancho": 200,
        "coordenadas": {
          "x": 242,
          "y": 46
        }
      },
      {
        "nombre": "hidrogeno",
        "simbolo": "H",
        "ancho": 80,
        "coordenadas": {
          "x": 178,
          "y": 170
        }
      },
      {
        "nombre": "hidrogeno",
        "simbolo": "H",
        "ancho": 80,
        "coordenadas": {
          "x": 421,
          "y": 180
        }
      },
      {
        "nombre": "hidrogeno",
        "simbolo": "H",
        "ancho": 80,
        "coordenadas": {
          "x": 300,
          "y": 245
        }
      }
    ]
  },
  {
    "molecula": "Dióxido de Nitrógeno",
    "elementos": [
      {
        "nombre": "nitrogeno",
        "simbolo": "N",
        "ancho": 200,
        "coordenadas": {
          "x": 238,
          "y": 81
        }
      },
      {
        "nombre": "oxigeno",
        "simbolo": "O",
        "ancho": 100,
        "coordenadas": {
          "x": 163,
          "y": 212
        }
      },
      {
        "nombre": "oxigeno",
        "simbolo": "O",
        "ancho": 100,
        "coordenadas": {
          "x": 414,
          "y": 212
        }
      }
    ]
  },
  {
    "molecula": "Ácido Fórmico",
    "elementos": [
      {
        "nombre": "carbono",
        "simbolo": "C",
        "ancho": 200,
        "coordenadas": {
          "x": 180,
          "y": 122
        }
      },
      {
        "nombre": "hidrogeno",
        "simbolo": "H",
        "ancho": 100,
        "coordenadas": {
          "x": 471,
          "y": 223
        }
      },
      {
        "nombre": "oxigeno",
        "simbolo": "O",
        "ancho": 100,
        "coordenadas": {
          "x": 232,
          "y": 23
        }
      },
      {
        "nombre": "oxigeno",
        "simbolo": "O",
        "ancho": 100,
        "coordenadas": {
          "x": 371,
          "y": 223
        }
      },
      {
        "nombre": "hidrogeno",
        "simbolo": "H",
        "ancho": 100,
        "coordenadas": {
          "x": 89,
          "y": 223
        }
      }
    ]
  },
  {
    "molecula": "Ácido nítrico",
    "elementos": [
      {
        "nombre": "nitrogeno",
        "simbolo": "N",
        "ancho": 200,
        "coordenadas": {
          "x": 180,
          "y": 122
        }
      },
      {
        "nombre": "oxigeno",
        "simbolo": "O",
        "ancho": 100,
        "coordenadas": {
          "x": 232,
          "y": 23
        }
      },
      {
        "nombre": "oxigeno",
        "simbolo": "O",
        "ancho": 100,
        "coordenadas": {
          "x": 371,
          "y": 223
        }
      },
      {
        "nombre": "oxigeno",
        "simbolo": "O",
        "ancho": 100,
        "coordenadas": {
          "x": 89,
          "y": 223
        }
      },
      {
        "nombre": "hidrogeno",
        "simbolo": "H",
        "ancho": 100,
        "coordenadas": {
          "x": 471,
          "y": 223
        }
      }
    ]
  },
  {
    "molecula": "Óxido de Hierro",
    "elementos": [
      {
        "nombre": "hierro",
        "simbolo": "Fe",
        "ancho": 100,
        "coordenadas": {
          "x": 204,
          "y": 150
        }
      },
      {
        "nombre": "hierro",
        "simbolo": "Fe",
        "ancho": 100,
        "coordenadas": {
          "x": 403,
          "y": 150
        }
      },
      {
        "nombre": "oxigeno",
        "simbolo": "O",
        "ancho": 150,
        "coordenadas": {
          "x": 80,
          "y": 50
        }
      },
      {
        "nombre": "oxigeno",
        "simbolo": "O",
        "ancho": 150,
        "coordenadas": {
          "x": 278,
          "y": 50
        }
      },
      {
        "nombre": "oxigeno",
        "simbolo": "O",
        "ancho": 150,
        "coordenadas": {
          "x": 476,
          "y": 50
        }
      }
    ]
  },
  {
    "molecula": "Óxido de Calcio",
    "elementos": [
      {
        "nombre": "calcio",
        "simbolo": "Ca",
        "ancho": 200,
        "coordenadas": {
          "x": 250,
          "y": 99
        }
      },
      {
        "nombre": "oxigeno",
        "simbolo": "O",
        "ancho": 100,
        "coordenadas": {
          "x": 163,
          "y": 92
        }
      }
    ]
  },
  {
    "molecula": "Dióxido de azufre",
    "elementos": [
      {
        "nombre": "azufre",
        "simbolo": "S",
        "ancho": 200,
        "coordenadas": {
          "x": 247,
          "y": 83
        }
      },
      {
        "nombre": "oxigeno",
        "simbolo": "O",
        "ancho": 100,
        "coordenadas": {
          "x": 150,
          "y": 160
        }
      },
      {
        "nombre": "oxigeno",
        "simbolo": "O",
        "ancho": 100,
        "coordenadas": {
          "x": 444,
          "y": 160
        }
      }
    ]
  },
  {
    "molecula": "Monóxido de azufre",
    "elementos": [
      {
        "nombre": "azufre",
        "simbolo": "S",
        "ancho": 200,
        "coordenadas": {
          "x": 220,
          "y": 50
        }
      },
      {
        "nombre": "oxigeno",
        "simbolo": "O",
        "ancho": 100,
        "coordenadas": {
          "x": 419,
          "y": 110
        }
      }
    ]
  },
  {
    "molecula": "Óxido de Sodio",
    "elementos": [
      {
        "nombre": "sodio",
        "simbolo": "Na",
        "ancho": 100,
        "coordenadas": {
          "x": 162,
          "y": 150
        }
      },
      {
        "nombre": "sodio",
        "simbolo": "Na",
        "ancho": 100,
        "coordenadas": {
          "x": 457,
          "y": 150
        }
      },
      {
        "nombre": "oxigeno",
        "simbolo": "O",
        "ancho": 200,
        "coordenadas": {
          "x": 259,
          "y": 82
        }
      }
    ]
  },
  {
    "molecula": "Trióxido de azufre",
    "elementos": [
      {
        "nombre": "azufre",
        "simbolo": "S",
        "ancho": 200,
        "coordenadas": {
          "x": 239,
          "y": 111
        }
      },
      {
        "nombre": "oxigeno",
        "simbolo": "O",
        "ancho": 100,
        "coordenadas": {
          "x": 291,
          "y": 12
        }
      },
      {
        "nombre": "oxigeno",
        "simbolo": "O",
        "ancho": 100,
        "coordenadas": {
          "x": 152,
          "y": 214
        }
      },
      {
        "nombre": "oxigeno",
        "simbolo": "O",
        "ancho": 100,
        "coordenadas": {
          "x": 428,
          "y": 214
        }
      }
    ]
  },
  {
    "molecula": "Cloruro de calcio",
    "elementos": [
      {
        "nombre": "calcio",
        "simbolo": "Ca",
        "ancho": 200,
        "coordenadas": {
          "x": 241,
          "y": 54
        }
      },
      {
        "nombre": "cloro",
        "simbolo": "Cl",
        "ancho": 100,
        "coordenadas": {
          "x": 152,
          "y": 161
        }
      },
      {
        "nombre": "cloro",
        "simbolo": "Cl",
        "ancho": 100,
        "coordenadas": {
          "x": 429,
          "y": 162
        }
      }
    ]
  }
]

$(document).ready(function () {
  moleculas_array = randomValueGenerator(moleculas_array);

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
          divAnimado.style.backgroundImage = "url(../../images/ciencia/normal2.gif)";
          maquina2(
            "bienvenida",
            "Hola, soy Genio. <br> Se presentara el nombre de la molécula que tienes que construir, para construirla tendras que arrastra  los átomos que componen la molécula.",
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

function inicioTiempo() {
  // Obtenemos el elemento del contador
  var contador = document.getElementById("contador");

  // Convertimos 3 minutos a milisegundos
  var tiempoLimite = 5 * 60 * 1000;

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
      "url(../../images/ciencia/derrota.gif)";
  } else {
    document.getElementById("final").style.backgroundImage =
      "url(../../images/ciencia/victoria.gif)";
    var audio = new Audio("../../sounds/victory.mp3");
    audio.play();
  }
  document.getElementById("texto_final").innerText =
    "Lograste armar correctamente " + score + " moléculas de " + npreg;
}



const atoms = document.querySelectorAll(".atom");
if(isTouchDevice()){
  var miDivs = document.getElementsByClassName('miDiv');
  var izquierda = 200;
  
  for (let index = 0; index < atoms.length; index++) {
    var miDiv = atoms[index];

    miDiv.addEventListener('touchstart', mover_tactil);
    miDiv.addEventListener('touchmove', mover_tactil2);
    miDiv.addEventListener("touchend", drop);
    miDiv.style.position = "absolute";
    miDiv.style.zIndex ="1000",
    miDiv.style.left = izquierda+"px";
    miDiv.style.top = "61px";
    izquierda += 100;
  }
}

atoms.forEach((bin) => {
  bin.addEventListener("dragstart", dragStart);
  bin.addEventListener("dragend", dragEnd);
});