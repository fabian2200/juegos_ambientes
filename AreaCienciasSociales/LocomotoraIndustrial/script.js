let conse = 0;
let score = 0;
let timer;
let PregMostrada = [];

var respuestas = [];

var preguntas = [
  {
    id: 1,
    enunciado:
      "¿Cuál fue el factor que impulsó el desarrollo industrial en Colombia en las primeras décadas del siglo XX?",
    opciones: [
   
      "Las leyes proteccionistas",
      "La elevación de los ingresos en las zonas cafeteras",
         "Los beneficios de la Primera Guerra Mundial",
      "El cierre de las empresas artesanales en el oriente colombiano",
    ],
    respuestaCorrecta: 2,
  },
  {
    id: 2,
    enunciado:
      "¿En qué ciudad de Colombia se inició la fabricación de telas en el siglo XX?",
    opciones: ["Bogotá", "Medellín", "Cali", "Barranquilla"],
    respuestaCorrecta: 1,
  },
  {
    id: 3,
    enunciado:
      "¿Cuál fue el sector industrial más importante numéricamente en esa época?",
    opciones: [

      "La industria del cemento",
      "La industria textil",
      "La industria de alimentos",
      "La industria de la energía eléctrica",
    ],
    respuestaCorrecta: 1,
  },
  {
    id: 4,
    enunciado:
      "¿Cuál fue la cuestión primordial para el impulso de la industrialización en Colombia?",
    opciones: [
      "La paz",
      "La modernización tecnológica",
      "La inversión extranjera",
      "El crecimiento demográfico",
    ],
    respuestaCorrecta: 0,
  },
  {
    id: 5,
    enunciado:
      "¿Qué tipo de energía empezó a relegar a un segundo plano a los motores primarios movidos a vapor?",
    opciones: [
      "Energía hidráulica",
      "Energía eléctrica",
      "Energía solar",
      "Energía nuclear",
    ],
    respuestaCorrecta: 1,
  },
  {
    id: 6,
    enunciado:
      "¿En qué década se fundó la empresa Noel para producir dulces y galletas a escala industrial?",
    opciones: [
    
      "Década de 1930",
      "Década de 1940",
      "Década de 1950",
      "Década de 1920",
    ],
    respuestaCorrecta: 3,
  },
  {
    id: 7,
    enunciado:
      "¿Qué sector industrial experimentó un crecimiento significativo entre 1930 y 1945 en Colombia?",
    opciones: [
   
      "Bienes intermedios",
      "Bienes de capital",
      "Bienes de consumo corriente",
      "Bienes de lujo",
    ],
    respuestaCorrecta: 2,
  },
  {
    id: 8,
    enunciado:
      "¿Qué ocurrió con la producción industrial nacional durante la Segunda Guerra Mundial?",
    opciones: [
      "Se redujo",
      "Se mantuvo estable",
      "Aumentó",
      "No se vio afectada",
    ],
    respuestaCorrecta: 2,
  },
  {
    id: 9,
    enunciado:
      "¿Cuál fue uno de los principales obstáculos para el desarrollo industrial en Colombia en el siglo XX?",
    opciones: [
      "La falta de recursos naturales",
      "La inestabilidad política",
      "La falta de mano de obra calificada",
      "La falta de demanda interna",
    ],
    respuestaCorrecta: 1,
  },
  {
    id: 10,
    enunciado:
      "¿Cuál fue el efecto del modelo de sustitución de importaciones en la industria colombiana?",
    opciones: [
    
      "Incrementó la dependencia de las importaciones",
      "Impulsó el crecimiento de la industria nacional",
      "Generó una crisis económica",
      "Promovió la diversificación de las exportaciones",
    ],
    respuestaCorrecta: 1,
  },
  {
    id: 11,
    enunciado: "¿Cuál fue el período conocido como 'La Violencia' en Colombia?",
    opciones: [ "1960-1970", "1970-1980", "1980-1990","1948-1958",],
    respuestaCorrecta: 3,
  },
  {
    id: 12,
    enunciado:
      "¿Qué industria fue fuertemente afectada por el conflicto armado interno en Colombia?",
    opciones: [
      "La industria petrolera",
      "La industria del turismo",
      "La industria agrícola",
      "La industria de la construcción",
    ],
    respuestaCorrecta: 2,
  },
  {
    id: 13,
    enunciado: "¿En qué década se inició la apertura económica en Colombia?",
    opciones: [
      "Década de 1970",
      "Década de 1980",
      "Década de 1990",
      "Década de 2000",
    ],
    respuestaCorrecta: 2,
  },
  {
    id: 14,
    enunciado:
      "¿Cuál fue uno de los objetivos principales de la apertura económica en Colombia?",
    opciones: [
      "Aumentar las exportaciones",
      "Reducir las importaciones",
      "Promover la autosuficiencia",
      "Fomentar el proteccionismo",
    ],
    respuestaCorrecta: 0,
  },
  {
    id: 15,
    enunciado:
      "¿Qué tratado comercial permitió el ingreso de productos extranjeros a Colombia de manera preferencial?",
    opciones: [
     
      "Tratado de Libre Comercio con México",
      "Tratado de Libre Comercio con Brasil",
      "Tratado de Libre Comercio con Estados Unidos",
      "Tratado de Libre Comercio con China",
    ],
    respuestaCorrecta: 2,
  },
  {
    id: 16,
    enunciado:
      "¿Qué tipo de empresas se vieron especialmente afectadas por la apertura económica en Colombia?",
    opciones: [
 
      "Grandes empresas multinacionales",
      "Pequeñas y medianas empresas (Pymes)",
      "Empresas estatales",
      "Empresas del sector agropecuario",
    ],
    respuestaCorrecta: 1,
  },
  {
    id: 17,
    enunciado:
      "¿Cuál es uno de los sectores industriales que ha experimentado un crecimiento importante en Colombia en los últimos años?",
    opciones: [
      "Manufactura tradicional",
      "Industria pesada",
      "Industria del petróleo",
      "Tecnología de la información",
    ],
    respuestaCorrecta: 3,
  },
  {
    id: 18,
    enunciado:
      "¿Cuál es uno de los retos actuales para la industria colombiana?",
    opciones: [
      "Mejorar la infraestructura de transporte",
      "Reducir la dependencia de las importaciones",
      "Fomentar la investigación y desarrollo",
      "Mejorar la educación técnica",
    ],
    respuestaCorrecta: 2,
  },
  {
    id: 19,
    enunciado: "¿Qué es el concepto de 'industria 4.0'?",
    opciones: [
      "El retorno a métodos de producción artesanales",
      "La implementación de políticas proteccionistas en la industria",
      "El desarrollo de tecnologías sostenibles en la industria",
      "La cuarta revolución industrial basada en la automatización y la digitalización",
    ],
    respuestaCorrecta: 3,
  },
  {
    id: 20,
    enunciado:
      "¿Cuál es uno de los beneficios potenciales de la industria 4.0?",
    opciones: [
      "Reducción de la competitividad",
      "Aumento de la productividad",
      "Incremento de la desigualdad social",
      "Aumento de los costos de producción",
    ],
    respuestaCorrecta: 1,
  },
];

var firstMove = true; // Variable para controlar la primera iteración
function moveDivs(direction) {
  var container = document.querySelector(".container");
  var divs = document.querySelectorAll(".box");
  var moveAmount = 50; // Cantidad de píxeles que se moverán
  var executedLose = false;

  if (direction === 1) {
    document.getElementById("locoDer").src = "locomotoraDerechaMovi.gif";

  } else {
    document.getElementById("locoIzq").src = "locomotoraIzquierdaMovi.gif";
  }

  if (firstMove) {
    divs.forEach(function (div) {
      var currentLeft = parseInt(
        div.style.transform.replace("translateX(", "").replace("px)", "") || 0
      );
      var newLeft = currentLeft + moveAmount * direction;

      div.style.transform = "translateX(" + newLeft + "px)";

      // Escuchar el evento de transición para cada div
      div.addEventListener("transitionend", function () {
        // Verificar si la transición es para el tren que se ha movido
        if (div.id === "div1" && direction === 1) {
          document.getElementById("locoDer").src = "locomotoraDerecha.png";
        } else if (div.id === "div3" && direction === -1) {
          document.getElementById("locoIzq").src = "locomotoraIzquierda.png";
        }
      });

    });
  }

  // Ajustar el ancho del contenedor para que los divs no se desborden
  var containerWidth = divs.length * (moveAmount + 10) - 10;
  container.style.width = containerWidth + "px";
  var resul = "";
  // Verificar si alguna división ha recorrido exactamente 500px
  setTimeout(function () {
    divs.forEach(function (div) {
      var currentLeft = parseInt(
        div.style.transform.replace("translateX(", "").replace("px)", "") || 0
      );
      console.log(Math.abs(currentLeft))
      if (Math.abs(currentLeft) === 300 && !executedLose) {
        executedLose = true;
        if (direction === 1) {
          resultadoFinal('lose');
        } else {
          resultadoFinal('win');
        }
      }
    });

  }, 10000);
}

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
            "Hola, soy Genio. <br> En este juego consiste en responder correctamente las preguntas presentadas, el objetivo final es arrastrar el tren contrario a tu terreno. tú puedes...",
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
        generarPreguntaHTML();
      }, 2000);
    }, 2000);
  }
}

function resultadoFinal(resul) {
  $("#principal").fadeToggle(1000);
  $("#final").fadeToggle(1000);



  if (resul == "lose") {
    var audio = new Audio("../../sounds/game_over.mp3");
    audio.play();
    document.getElementById("final").style.backgroundImage =
      "url(../../images/derrota.gif)";
    document.getElementById("texto_final").innerText =
      "Lo siento no has superado el reto";
  } else {
    document.getElementById("final").style.backgroundImage =
      "url(../../images/victoria.gif)";
    var audio = new Audio("../../sounds/victory.mp3");
    document.getElementById("texto_final").innerText =
      "Feliictaciones has logrado superar el Reto";
    audio.play();

  }

}

function generarPreguntaHTML(pregunta) {
  let index = obtenerIndiceAleatorio();

  var pregunta = preguntas[index];

  var preguntaHTML = document.getElementById("pregunta");
  preguntaHTML.textContent = pregunta.enunciado;

  var opcionesHTML = document.getElementById("opciones");
  opcionesHTML.innerHTML = "";
  opcionesHTML.classList.remove("bloqueada");

  pregunta.opciones.forEach(function (opcion, indice) {
    var opcionHTML = document.createElement("div");
    opcionHTML.classList.add("opcion");
    opcionHTML.textContent = opcion;
    opcionHTML.setAttribute("data-indice", indice);
    opcionesHTML.appendChild(opcionHTML);
  });

  addevento();
}

function addevento() {
  // Obtener todos los elementos de opción
  var opciones = document.querySelectorAll(".opcion");

  // Agregar evento de clic a cada opción
  opciones.forEach(function (opcion) {
    opcion.addEventListener("click", function () {
      // Remover la clase 'seleccionada' de todas las opciones
      opciones.forEach(function (op) {
        op.classList.remove("seleccionada", "correcta", "incorrecta");

      });


      // Agregar la clase 'seleccionada' a la opción clickeada
      opcion.classList.add("seleccionada");
      var opcionesHTML = document.getElementById("opciones");
      opcionesHTML.classList.add("bloqueada");

      // Obtener el índice de la opción seleccionada
      var indiceRespuesta = parseInt(opcion.getAttribute("data-indice"));

      // Obtener la pregunta actual
      var preguntaActual = preguntas.find(function (pregunta) {
        return pregunta.id === 1; // Reemplaza 1 con el ID de la pregunta actual
      });

      // Verificar si la respuesta seleccionada es correcta
      if (indiceRespuesta === preguntaActual.respuestaCorrecta) {
        opcion.classList.add("correcta");
        moveDivs(-1);
        setTimeout(function () {
          generarPreguntaHTML();
        }, 10000);
      } else {
        opcion.classList.add("incorrecta");
        opciones[preguntaActual.respuestaCorrecta].classList.add("correcta");

        moveDivs(1);
        setTimeout(function () {
          generarPreguntaHTML();
        }, 10000);
      }

    });
  });
}
