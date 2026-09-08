let conse = 0;
let score = 0;
let timer;
let PregMostrada = [];

let preguntas = [
  {
    pregunta: "La Ilustración fue un movimiento que tuvo lugar en Europa en el siglo XVII.",
    respuesta: false,
  },
  {
    pregunta: "La Ilustración se caracterizó por considerar que el conocimiento verdadero se alcanza a través del razonamiento y la observación",
    respuesta: true,
  },
  {
    pregunta:
      "La Ilustración sostenía que todas las personas nacían iguales y tenían derechos naturales.",
    respuesta: true,
  },
  {
    pregunta:
      "La Ilustración valoraba la religión como fuente de conocimiento",
    respuesta: false,
  },
  {
    pregunta:
      "El pensamiento ilustrado dio origen a la Revolución Francesa y al despotismo ilustrado en España.",
    respuesta: true,
  },
  {
    pregunta: "La cultura occidental se define únicamente por su ubicación geográfica.",
    respuesta: false,
  },
  {
    pregunta: "El término 'Occidente' comenzó a utilizarse en Europa antes de la Era Moderna.",
    respuesta: true,
  },
  {
    pregunta:
      "La cultura occidental se basa en la herencia de la Antigüedad Griega.",
    respuesta: true,
  },
  {
    pregunta:
      "Todas las naciones occidentales comparten los mismos rasgos culturales y geográficos.",
    respuesta: false,
  },
  {
    pregunta: "El cristianismo es la única religión que se reconoce como parte del pensamiento religioso occidental.",
    respuesta: false,
  },
  {
    pregunta: "El motivo principal de la expansión europea fue la necesidad de los europeos de disponer de metales preciosos para acuñar monedas.",
    respuesta: true,
  },
  {
    pregunta: "La expansión europea comenzó en el siglo XV y finalizó en el siglo XVIII.",
    respuesta: false,
  },
  {
    pregunta: "Las ciudades portuarias de las Amalfi, Venecia, Pisa y Génova controlaban el tráfico con el Oriente y proveían a la Europa medieval de las especies necesarias para la conservación y preparación de los alimentos.",
    respuesta: true,
  },
  {
    pregunta: "La caída de Constantinopla en manos de los turcos en 1453 permitió a muchas naciones europeas buscar nuevas rutas terrestres para llegar a la fuente del comercio oriental.",
    respuesta: false,
  },
  {
    pregunta: "Enrique el Navegante fue uno de los más grandes promotores de la expansión portuguesa y se lanzó a la conquista de África en búsqueda de un paso interoceánico.",
    respuesta: true,
  },
  {
    pregunta: "El imperialismo aboga por el control de un Estado a través del poder de otro Estado 'superior'.",
    respuesta: true,
  },
  {
    pregunta: "El imperialismo y el colonialismo tienen diferencias fundamentales en cuanto a sus objetivos.",
    respuesta: false,
  },
  {
    pregunta: "El marxismo condena el imperialismo por considerarlo un mecanismo que permite el control de países a través del capital.",
    respuesta: true,
  },
  {
    pregunta:
      "El imperialismo nació y desapareció en el siglo XV. ",
    respuesta: false,
  },
  {
    pregunta: "El imperialismo económico se basa en el dominio de una nación sobre otra mediante la fuerza militar.",
    respuesta: false,
  },
  {
    pregunta: "El Islam es una religión monoteísta fundada por Mahoma.",
    respuesta: true,
  },
  {
    pregunta: "El Islamismo no es una de las religiones más importantes del mundo en la actualidad.",
    respuesta: false,
  },
  {
    pregunta:
      "El Corán es el libro sagrado de los judíos",
    respuesta: false,
  },
  {
    pregunta:
      "La peregrinación a La Meca es una obligación para todo creyente musulmán.",
    respuesta: true,
  },
  {
    pregunta:
      "La peregrinación a La Meca es una obligación para todo creyente musulmán.",
    respuesta: true,
  },
  {
    pregunta:
      "El estado islámico se estableció en el año 622 según la constitución de Medina",
    respuesta: true,
  },
  {
    pregunta:
      "El Corán establece explícitamente la forma en que se debe gobernar la comunidad islámica",
    respuesta: false,
  },
  {
    pregunta:
      "Los hadices desarrollan la doctrina de la necesidad de reconocer a un soberano en la comunidad musulmana.",
    respuesta: true,
  },
  {
    pregunta:
      "El orden político islámico establece como ideal la existencia de una comunidad de fieles unida con su rector en armonía.",
    respuesta: true,
  },
  {
    pregunta:
      "El Imperio Chino abarcó desde la dinastía Qin hasta la dinastía Qing.",
    respuesta: true,
  },
  {
    pregunta:
      "El estado chino monárquico creado por Yuan Shikai no es lo mismo que el Imperio Chino. ",
    respuesta: true,
  },
  {
    pregunta:
      "Las fronteras del Imperio Chino variaron dependiendo de las dinastías que lo gobernaban.",
    respuesta: true,
  },
  {
    pregunta:
      "Los Qin unificaron los distintos reinos independientes de China en una sola nación en 221 a.C.",
    respuesta: true,
  },
  {
    pregunta:
      "La dinastía Tang gobernó China durante tres siglos y luego cayó en 907.",
    respuesta: true,
  },
  {
    pregunta:
      "El Imperio mongol fue fundado por Gengis Kan en el año 1206",
    respuesta: true,
  },
  {
    pregunta:
      "El Imperio mongol fue el segundo imperio más extenso de la historia después del Imperio Romano.",
    respuesta: true,
  },
  {
    pregunta:
      " Los mongoles basaban su convivencia en un código de leyes llamado Yassa.",
    respuesta: true,
  },
  {
    pregunta:
      "Los kanes exigían a los comerciantes extranjeros que les proporcionaran información sobre las culturas de los pueblos vecinos.",
    respuesta: true,
  },
  {
    pregunta:
      "Aunque el budismo tibetano fue una de las principales religiones del Imperio mongol, el chamanismo y el islam también desempeñaron papeles importantes en la vida religiosa de los mongoles.",
    respuesta: false,
  },
  {
    pregunta:
      "Alejandro Magno conquistó el Imperio Persa en ocho años.",
    respuesta: true,
  },
  {
    pregunta:
      "Alejandro Magno era un rey de Macedonia que recibió una excelente educación y era valiente, decidido y violento.",
    respuesta: true,
  },
  {
    pregunta:
      "Las falanges macedonias destruyeron el Imperio persa en dos combates..",
    respuesta: false,
  },
  {
    pregunta:
      "Después de la Batalla de Gaugamela, Alejandro Magno ocupó Mesopotamia (Babilonia), destruyó Persépolis y persiguiendo al derrotado Darío III se adentró en la Meseta de Irán y en las regiones de Bactriana y Sogdiana.",
    respuesta: true,
  },
  {
    pregunta:
      "El Imperio romano estableció su poder en Asia Menor y el Mar Egeo con la Paz de Apamea en el 188 a.C.",
    respuesta: true,
  },
];

// Función para iniciar el juego
function startGame() {
  // Configuración inicial
  inicioTiempo();
  score = 0;

  setInterval(moveDiv, 500);
}

const miDiv = document.getElementById("miDiv");
let divImgResp=  document.getElementById("img-resp");
let position = -750;
let movement = 40;
let RespActual;

mostrarPregunta();

function moveDiv() {
  position += movement;
  miDiv.style.left = position + "px";

  if (position > (window.innerWidth + 100)) {
    position = -750;
    miDiv.style.transition="";
    miDiv.style.left = position + "px";
    divImgResp.src = "";
    document.getElementById("btn-respuestas").style.pointerEvents = "auto";
    setTimeout(()=> mostrarPregunta(), 500);
  }
}

function mostrarPregunta() {
  miDiv.style.transition="all 0.5s linear";
  divImgResp.style.display="none";
  document.getElementById("texto-nave").style.display="block";

  movement = 40;
  position += movement;
  miDiv.style.left = position + "px";
  let indexPreg = obtenerIndiceAleatorio();

  document.getElementById("texto-nave").innerHTML =preguntas[indexPreg].pregunta;
  RespActual = preguntas[indexPreg].respuesta;
}

function obtenerIndiceAleatorio() {
  let indice = Math.floor(Math.random() * preguntas.length);
  while (PregMostrada.includes(indice)) {
    indice = Math.floor(Math.random() * preguntas.length);
  }
  PregMostrada.push(indice);

  return indice;
}

function verfResp(resp) {
  conse++;
  document.getElementById("btn-respuestas").style.pointerEvents = "none";

  
  document.getElementById("texto-nave").style.display="none";
  divImgResp.style.display="block";

  if (resp === RespActual) {
    score++;
    movement = 140;
    position += movement;
    miDiv.style.left = position + "px";
    divImgResp.src="../../images/correcto.gif";
  } else {
    movement = 140;
    position += movement;
    miDiv.style.left = position + "px";
    divImgResp.src="../../images/incorrecto.gif";

  }

  console.log(score);
}

$(document).ready(function () {
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
            "Hola, soy Genio. <br> En este juego se iran presentando afirmaciones relacionadas a los temas de la Ilustración y Los grandes imperios de Asia y África, donde tendras que identificar si es Verdadera o Falsa",
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
      startGame();
    }, 2000);
  }, 2000);
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
