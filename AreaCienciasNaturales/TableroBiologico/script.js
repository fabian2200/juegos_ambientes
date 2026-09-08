let conse = 0;
let score = 0;
let timer;
let PregMostrada = [];
let partesR = 16;
let imgSistema = "";
let nombreSistema = "";

var preguntasParte = [
  {
    pregunta:
      "¿Qué parte de la célula se encarga de almacenar el material genético?",
    respuesta: "Núcleo",
  },
  {
    pregunta:
      "¿Cuál es la parte de la célula encargada de la síntesis de proteínas?",
    respuesta: "Ribosomas",
  },
  {
    pregunta:
      "¿Qué estructura celular es responsable de la digestión y degradación de desechos celulares?",
    respuesta: "Lisosomas",
  },
  {
    pregunta:
      "¿Cuál es la parte de la célula encargada de la generación de energía?",
    respuesta: "Mitocondrias",
  },
  {
    pregunta:
      "¿Qué parte de la célula está involucrada en el transporte de proteínas y lípidos?",
    respuesta: "Retículo_endoplasmático",
  },
  {
    pregunta:
      "¿Cuál es la parte de la célula encargada de la síntesis y empaquetamiento de proteínas?",
    respuesta: "Aparato_de_Golgi",
  },
  {
    pregunta:
      "¿Qué estructura celular se encarga de la fotosíntesis en las células vegetales?",

    respuesta: "Cloroplastos",
  },
  {
    pregunta:
      "¿Cuál es la parte de la célula que controla el paso de sustancias hacia y desde el exterior?",
    respuesta: "Membrana_plasmática",
  },
  {
    pregunta:
      "¿Qué parte de la célula está compuesta principalmente de agua y organelos suspendidos?",
    respuesta: "Citoplasma",
  },
  {
    pregunta:
      "¿Cuál es la parte de la célula que participa en la división celular?",
    respuesta: "Centriolos",
  },
  {
    pregunta: "¿Qué organelo celular contiene el ADN mitocondrial?",
    respuesta: "Mitocondrias",
  },
  {
    pregunta:
      "¿Cuál es la parte de la célula responsable de la síntesis de proteínas?",
    respuesta: "Ribosomas",
  },
  {
    pregunta:
      "¿Qué estructura celular se encarga del almacenamiento de sustancias?",
    respuesta: "Vacuolas",
  },
  {
    pregunta:
      "¿Cuál es la parte de la célula responsable del mantenimiento de la forma y el movimiento?",
    respuesta: "Citoesqueleto",
  },
  {
    pregunta: "¿Qué parte de la célula contiene los cromosomas?",
    respuesta: "Núcleo",
  },
  {
    pregunta:
      "¿Cuál es la parte de la célula que almacena lípidos y desempeña funciones metabólicas?",
    respuesta: "Aparato_de_Golgi",
  },
  {
    pregunta:
      "¿Qué estructura celular está involucrada en la síntesis de lípidos y detoxificación de sustancias?",
    respuesta: "Retículo_endoplasmático_liso",
  },
  {
    pregunta: "¿Cuál es la parte de la célula encargada de la síntesis de RNA?",
    respuesta: "Nucleolo",
  },
  {
    pregunta:
      "¿Qué parte de la célula se encarga de la traducción del RNA en proteínas?",
    respuesta: "Ribosomas",
  },
  {
    pregunta:
      "¿Cuál es la parte de la célula responsable del almacenamiento y liberación de energía en forma de ATP?",
    respuesta: "Mitocondrias",
  },

  {
    pregunta:
      "¿Cuál es la estructura celular que está cubierta de ribosomas y se encarga de la síntesis de proteínas?",
    respuesta: "Retículo_endoplasmático_rugoso",
  },
  {
    pregunta:
      "¿Qué estructura celular se encarga de la detoxificación de sustancias tóxicas y la producción de peróxido de hidrógeno?",
    respuesta: "Peroxisoma",
  },
  {
    pregunta:
      "¿Cuál es la estructura que se encuentra en las células vegetales y bacterianas, brindando rigidez y protección?",
    respuesta: "Pared_celular",
  },
  {
    pregunta:
      "¿Qué estructura se encuentra cerca del núcleo y contiene los centriolos, desempeñando un papel crucial en la división celular?",
    respuesta: "Centrosoma",
  },
];

var preguntasBacterias = [
  {
    pregunta: "¿Cuál es la bacteria responsable de la salmonelosis?",
    respuesta: "Salmonella",
  },
  {
    pregunta:
      "¿Cuáles son las bacterias patógenas más comunes que pueden causar infecciones urinarias?",
    respuesta: "Staphylococcus",
  },
  {
    pregunta: "¿Qué bacteria es responsable de la faringitis bacteriana?",
    respuesta: "Estreptococcus",
  },
  {
    pregunta:
      "¿Cuál es la bacteria causante de la infección sexual por gonorrea?",
    respuesta: "Neisseria",
  },
  {
    pregunta:
      "¿Qué bacteria puede producir intoxicación alimentaria y el síndrome de shock tóxico?",
    respuesta: "Staphylococcus",
  },
  {
    pregunta:
      "¿Cuál es la bacteria que produce infecciones gastrointestinales severas y salmonelosis?",
    respuesta: "Salmonella",
  },
  {
    pregunta:
      "¿Qué bacteria se transmite a través de alimentos como aves de corral poco cocidas y causa diarrea bacteriana en niños?",
    respuesta: "Spirilla",
  },
  {
    pregunta:
      "¿Cuál es la bacteria responsable de la meningitis meningocócica?",
    respuesta: "Neisseria",
  },
  {
    pregunta:
      "¿Qué bacteria se encuentra de forma natural en el tracto genital femenino y puede causar enfermedades graves como la enfermedad inflamatoria pélvica?",
    respuesta: "Neisseria",
  },
  {
    pregunta:
      "¿Cuál es la bacteria responsable de mantener un ambiente apropiado en el intestino y la producción de vitamina K y vitamina B12?",
    respuesta: "Escherichia_coli",
  },
  {
    pregunta:
      "¿Qué bacterias ayudan en la digestión de alimentos y contribuyen al mantenimiento de un pH óptimo en el tracto digestivo?",
    respuesta: "Lactobacillus",
  },
  {
    pregunta:
      "¿Cuál es la bacteria presente en alimentos fermentados como el yogurt y ayuda en la digestión de la lactosa?",
    respuesta: "Lactobacillus",
  },
  {
    pregunta:
      "¿Qué género de bacterias forma parte de la microbiota beneficiosa de la piel y produce sustancias antimicrobianas?",
    respuesta: "Staphylococcus",
  },
  {
    pregunta:
      "¿Cuál es el género de bacterias beneficiosas presente en lácteos fermentados y se ha asociado con el tratamiento de alergias y enfermedades inflamatorias?",
    respuesta: "Lactococcus",
  },
  {
    pregunta:
      "¿Qué bacteria probiótica habita el tracto digestivo humano y contribuye a una buena digestión y competencia con bacterias dañinas?",
    respuesta: "Bifidobacterium_animalis",
  },
];

var preguntasBacteriasGen = [
  
    {
      pregunta: "¿De forma esférica u ovalada?",
      respuesta: "COCOS",
    },
    {
      pregunta: "¿De formas alargadas, como barras microscópicas?",
      respuesta: "BACILIOS",
    },
    {
      pregunta: "¿De forma helicoidal rígida o de tirabuzón?",
      respuesta: "ESPIRILOS",
    },
    {
      pregunta: "¿De forma de tirabuzón flexible?",
      respuesta: "ESPIROQUETAS",
    },
    {
      pregunta: "¿De forma de coma y ligeramente curvados?",
      respuesta: "VIBRIOS",
    },
    {
      pregunta: "¿Qué tipo de bacterias tienen una pared celular engrosada?",
      respuesta: "GRAM_POSITIVAS",
    },
    {
      pregunta: "¿Qué tipo de bacterias tienen una pared celular delgada?",
      respuesta: "GRAM_NEGATIVAS",
    },
    {
      pregunta:
        "¿Qué tipo de bacterias utilizan la luz solar como fuente de energía y sustancias inorgánicas como fuente de carbono?",
      respuesta: "FOTOAUTÓTROFAS",
    },
    {
      pregunta:
        "¿Qué tipo de bacterias utilizan compuestos inorgánicos reducidos como fuente de energía y dióxido de carbono como fuente de carbono?",
      respuesta: "QUIMIOAUTÓTROFAS",
    },
    {
      pregunta:
        "¿Qué tipo de bacterias utilizan la luz como fuente de energía y moléculas orgánicas como fuente de carbono?",
      respuesta: "FOTOHETERÓTROFAS",
    },
    {
      pregunta:
        "¿Qué tipo de bacterias utilizan moléculas orgánicas como fuente de carbono y obtienen energía a partir de ellas?",
      respuesta: "QUIMIOHETERÓTROFAS",
    },
    {
      pregunta:
        "¿Cuál es una bacteria gram negativa frecuente en los tractos gastrointestinales del ser humano?",
      respuesta: "ESCHERICHIA_COLI",
    },
    {
      pregunta:
        "¿Cuál es un gonococo que ocasiona la gonorrea en los seres humanos?",
      respuesta: "NEISSERIA_GONORRHOEAE",
    },
    {
      pregunta:
        "¿Cuál es una bacteria gram positiva que produce lesiones negras reconocibles en la piel?",
      respuesta: "BACILLUS_ANTHRACIS",
    },
    {
      pregunta:
        "¿Cuál es una Mycobacteria gram negativa sumamente frecuente en los suelos y de metabolismo inocuo?",
      respuesta: "SORANGIUM_CELLULOSUM",
    },
    {
      pregunta:
        "¿Cuál es una bacteria ácido-láctica habitante mutualista del intestino humano y otros mamíferos?",
      respuesta: "LACTOBACILLUS_ACIDOPHILUS",
    },
    {
      pregunta: "¿Qué estructuras permiten a las bacterias desplazarse?",
      respuesta: "FLAGELOS",
    },
    {
      pregunta:
        "¿Qué estructuras están involucradas en el intercambio de material genético entre bacterias?",
      respuesta: "PILI",
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
  let num = Math.floor(Math.random() * (3 - 1 + 1) + 1);
  //let num = 3;
  switch (num) {
    case 1:
      preguntas = preguntasParte;
      cargImg(1);
      break;
    case 2:
      preguntas = preguntasBacterias;
      cargImg(2);
      break;
    case 3:
      preguntas = preguntasBacteriasGen;
      cargImg(3);
      break;
  }

  preguntasAleatorias = preguntas.sort(() => Math.random() - 0.5).slice(0, 10);
  cargPreg();
}

function cargPreg() {
  if (index < preguntasAleatorias.length) {
    var preguntaActual = preguntasAleatorias[index];
    document.getElementById("texto-nave").innerHTML = preguntaActual.pregunta;
    respactual = preguntaActual.respuesta;
    index++;
    actual = actual + 1;
  document.getElementById("idnpreg").innerHTML = actual;
  } else {
    document.getElementById("divTemas").style.pointerEvents = "none";
    setTimeout(function () {
      resultadoFinal();
    }, 5000);
  }
}

function verfResp(organelo) {
  if (organelo == respactual) {
    respCorrectas++;
    document.getElementById("puntoBien").innerHTML = respCorrectas;
  } else {
    respIncorrectas++;
    document.getElementById("puntoMal").innerHTML = respIncorrectas;
  }

  

  cargPreg();
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
            "Hola, soy Genio. <br> ¡Hola, soy Genio. En  este juego se irá presentando imágenes relacionadas con el sistema reproductor de una forma desordenada y tendrás que ordenarla pulsando en un cuadro y luego en otro para intercambiar sus posiciones!",
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

function resultadoFinal() {
  $("#principal").fadeToggle(1000);
  $("#final").fadeToggle(1000);


  if (respCorrectas < 6) {
    var audio = new Audio("../../sounds/game_over.mp3");
    audio.play();
    document.getElementById("final").style.backgroundImage =
      "url(../../images/ciencia/derrota.gif)";
    document.getElementById("texto_final").innerText = "Lo siento solo has logrado contestar correctamente  " + respCorrectas+" de 10 preguntas posibles";
  } else {
    document.getElementById("final").style.backgroundImage =
      "url(../../images/ciencia/victoria.gif)";
    var audio = new Audio("../../sounds/victory.mp3");
    audio.play();
    document.getElementById("texto_final").innerText = "Felicitaciones has logrado contestar Correctamente  " + respCorrectas+" de 10 Preguntas Posibles";
  }
}

function cargImg(opc) {
  correctas = 0;
  cont = 0;
  let array_divs = [];

  if (opc == 1) {
    let organelos = randomValueGenerator([
      "Aparato_de_Golgi",
      "Centriolos",
      "Centrosoma",
      "Citoesqueleto",
      "Citoplasma",
      "Cloroplastos",
      "Lisosomas",
      "Membrana_plasmática",
      "Mitocondrias",
      "Núcleo",
      "Nucleolo",
      "Pared_celular",
      "Peroxisoma",
      "Retículo_endoplasmático",
      "Retículo_endoplasmático_liso",
      "Retículo_endoplasmático_rugoso",
      "Ribosomas",
      "Vacuolas",
    ]);

    for (let index = 0; index < 18; index++) {
      array_divs.push(
        "<div class='col-1 cuadro' onclick='verfResp(this.id)' id='" +
          organelos[index] +
          "' ><img style='width: 100px;'  src='img/organelos/" +
          organelos[index] +
          ".png'></div>"
      );
    }
    document.getElementById("centrarDiv").style.paddingTop="183pt";
  } else if (opc == 2) {
    let baterias = randomValueGenerator([
      "Bifidobacterium_animalis",
      "Escherichia_coli",
      "Estreptococcus",
      "Lactobacillus",
      "Lactococcus",
      "Neisseria",
      "Salmonella",
      "Spirilla",
      "Staphylococcus",

    ]);

    for (let index = 0; index < 9; index++) {
      array_divs.push(
        "<div class='col-1 cuadro' onclick='verfResp(this.id)' id='" +
        baterias[index] +
          "' ><img style='width: 100px; border-radius:20px;'  src='img/bacterias/" +
          baterias[index] +
          ".png'></div>"
      );
    }
    document.getElementById("centrarDiv").style.paddingTop="200pt";

  } else {
    let baterias = randomValueGenerator([
      "BACILIOS",
      "BACILLUS_ANTHRACIS",
      "COCOS",
      "ESCHERICHIA_COLI",
      "ESPIRILOS",
      "ESPIROQUETAS",
      "FLAGELOS",
      "FOTOAUTÓTROFAS",
      "FOTOHETERÓTROFAS",
      "GRAM_NEGATIVAS",
      "GRAM_POSITIVAS",
      "LACTOBACILLUS_ACIDOPHILUS",
      "NEISSERIA_GONORRHOEAE",
      "PILI",
      "QUIMIOAUTÓTROFAS",
      "QUIMIOHETERÓTROFAS",
      "SORANGIUM_CELLULOSUM",
      "VIBRIOS"
    ]);

    for (let index = 0; index < 18; index++) {
      array_divs.push(
        "<div class='col-1 cuadro' onclick='verfResp(this.id)' id='" +
        baterias[index] +
          "' ><img style='width: 100px; border-radius:20px;'  src='img/bacteriasGen/" +
          baterias[index] +
          ".png'></div>"
      );
    }
    document.getElementById("centrarDiv").style.paddingTop="227pt";

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

//Random value from Array
const randomValueGenerator = (vector) => {
  return vector.sort(function (a, b) {
    return Math.random() - 0.5;
  });
};
