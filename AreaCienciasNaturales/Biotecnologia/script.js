let conse = 0;
let score = 0;
let timer;
let PregMostrada = [];
let partesR = 16;
let imgSistema = "";
let nombreSistema = "";

// Función para iniciar el juego
var preguntasAleatorias;
var index = 0;
var respactual = "";
var respCorrectas = 0;
var respIncorrectas = 0;
var actual = 0;
var PregRespuesta = [];

function startGame() {}

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
            "Hola, soy Genio. <br> En este juego deberas salir del laboratorio, para esto deberas recorrer sus pasillos y responder las preguntas que se mostraran cuando llegues a cada punto marcado con un Matraz, al hacerlo la puerta se abrira automatcamente y podras salir.!",
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

  if (userScore < 3) {
    var audio = new Audio("../../sounds/game_over.mp3");
    audio.play();
    document.getElementById("final").style.backgroundImage =
      "url(../../images/ciencia/derrota.gif)";
    document.getElementById("texto_final").innerText =
      "Lo siento solo has logrado contestar Correctamente  " +
      userScore +
      " de 5 Preguntas Posibles";
  } else {
    document.getElementById("final").style.backgroundImage =
      "url(../../images/ciencia/victoria.gif)";
    var audio = new Audio("../../sounds/victory.mp3");
    audio.play();
    document.getElementById("texto_final").innerText =
      "Felicitaciones has logrado contestar Correctamente  " +
      userScore +
      " de 5 Preguntas Posibles";
  }
}

const cells = document.querySelectorAll(".cell");
const player = document.querySelector(".player");
const gridSize = 8; // Cambiado a 8 para trabajar con 64 divs
let playerPosition = 0;
let obstacle1Position = 3;
let obstacle2Position = 33;
let intervalId;
const destinations = [25, 45, 55, 7, 59]; // Cambiado para adaptarse al nuevo tamaño del tablero

// Agregar posiciones de obstáculos

const obstacle1Path = [3, 4, 5];
const obstacle2Path = [31, 32, 33];
const fixedObstacles = [
  9, 10, 12, 14, 20, 22, 24, 26, 27, 30, 37, 38, 41, 42, 43, 46, 52, 56, 57, 58,
  63,
]; // Obstáculos fijos

function updateGameBoard() {
  cells.forEach((cell, index) => {
    cell.classList.remove(
      "playerDer",
      "playerIzq",
      "player-caminando",
      "obstacle",
      "destination",
      "moving-obstacle",
      "fixed-obstacle"
    );
    if (index === playerPosition) {
    } else if (index === obstacle1Position || index === obstacle2Position) {
      //  cell.classList.add('obstacle', 'moving-obstacle');
    } else if (fixedObstacles.includes(index)) {
      cell.classList.add("obstacle", "fixed-obstacle");
    } else if (destinations.includes(index)) {
      cell.classList.add("destination");
    } else if (index === 62) {
      cell.classList.add("destinationMeta");
    }
  });
}

function moveObstacles() {
  obstacle1Position = getNextPosition(obstacle1Path, obstacle1Position);
  obstacle2Position = getNextPosition(obstacle2Path, obstacle2Position);
  updateGameBoard();
  checkCollision();
}

function getNextPosition(path, currentPosition) {
  const currentPositionIndex = path.indexOf(currentPosition);
  return path[(currentPositionIndex + 1) % path.length];
}

function moveObstacle(position, direction, updatePositionCallback) {
  let newPosition;
  switch (direction) {
    case "up":
      newPosition = position - gridSize;
      break;
    case "down":
      newPosition = position + gridSize;
      break;
    case "left":
      newPosition = position - 1;
      break;
    case "right":
      newPosition = position + 1;
      break;
    default:
      return;
  }

  if (
    newPosition >= 0 &&
    newPosition < gridSize * gridSize &&
    !isObstacleCollision(newPosition)
  ) {
    updatePositionCallback(newPosition);
  }
}

let targetCell;
let playe = "playerDer";


function movePlayer(direction) {
  let newPosition;
  var or;
  let oreintaimg = "player-caminado";
  switch (direction) {
    case "up":
      newPosition = playerPosition - gridSize;
      break;
    case "down":
      newPosition = playerPosition + gridSize;
      break;
    case "left":
      newPosition = playerPosition - 1;
      oreintaimg = "player-caminadoLeft";
      playe = "playerIzq";
      or = -1;
      break;
    case "right":
      newPosition = playerPosition + 1;
      oreintaimg = "player-caminadoRiht";
      playe = "playerDer";
      or = 1;
      break;
    default:
      return;
  }

  targetCell = cells[newPosition];
  console.log(targetCell);

  if (targetCell.classList.contains("obstacle")) {
    return; // No permitir moverse hacia un obstáculo fijo
  }

  if (newPosition >= 0 && newPosition < gridSize * gridSize) {
    const targetPosition = targetCell.getBoundingClientRect();
    const targetX = targetPosition.left;
    const targetY = targetPosition.top;
    const player = document.getElementById("player");
    player.classList.add(oreintaimg);

    player.style.transition = "left 3s linear, top 3s linear";
    player.style.transform = "scaleX("+or+")"
    // Actualizar la posición del jugador

    playerPosition = newPosition;
    player.style.left = targetX + "px";
    player.style.top = targetY + "px";
    

  setTimeout(() => {
    player.classList.remove(oreintaimg);
    updateGameBoard(player);
    checkCollision();
    cells[playerPosition].classList.add(oreintaimg);
    setTimeout(() => {
      cells[playerPosition].classList.remove(oreintaimg);
    }, 100);
  },3000)
  }
}

function verfResp() {
  if (Respuesta == "ok") {
    fadeOutBackground(targetCell, 'url("img/pregOk.png")');
    targetCell.style.backgroundSize ="45%";
    targetCell.style.backgroundRepeat = 'no-repeat';
    targetCell.style.backgroundPosition = "center";
  } else {
    fadeOutBackground(targetCell, 'url("img/pregFail.png")');
    targetCell.style.backgroundSize ="45%";
    targetCell.style.backgroundRepeat = 'no-repeat';
    targetCell.style.backgroundPosition = "center";
  }

  if (nResp == 5) {
  let posi = 62;
  setTimeout(() => {
    fadeOutBackground(cells[posi], 'url("img/metaOpen.gif")');
  }, 1000);

  setTimeout(() => {
    fadeOutBackground(cells[posi], 'url("img/metaOpen.png")');
  }, 2000);
}
}

function fadeOutBackground(element, newBackgroundImage) {
  // Agrega una clase para aplicar la transición
  element.classList.add('active');

  // Espera un momento para que la transición se complete
  setTimeout(() => {
    // Cambia la imagen de fondo debajo de la capa superior mientras su opacidad está en cero
    element.style.backgroundImage = newBackgroundImage;

    // Remueve la clase 'active' para desactivar la transición
    element.classList.remove('active');
  }, 300); // Ajusta el tiempo según la duración de la transición en CSS
}




function isObstacleCollision(position) {
  return (
    position === obstacle1Position ||
    position === obstacle2Position ||
    fixedObstacles.includes(position)
  );
}

function checkCollision() {
  //  if (playerPosition === obstacle1Position || playerPosition === obstacle2Position) {
  //     clearInterval(intervalId);
  //     alert('¡Has chocado con un obstáculo móvil!');
  //   } else

  if (playerPosition == 62) {
    if (nResp == 5) {
        setTimeout(() => {
        resultadoFinal();
      }, 3000);
    }
  }

  if (destinations.includes(playerPosition)) {
    let busq = PregRespuesta.includes(playerPosition);
    if (!busq) {
      PregRespuesta.push(playerPosition);
      clearInterval(intervalId);
      const modal = document.querySelector("#modal");
      modal.classList.add("md--active");
      let idPreSelect = obtenerIndiceAleatorio();
      iniciarTrivia(idPreSelect);
    }
  }
}

document.addEventListener("keydown", (event) => {
  const { key } = event;
  switch (key) {
    case "ArrowUp":
      movePlayer("up");
      break;
    case "ArrowDown":
      movePlayer("down");
      break;
    case "ArrowLeft":
      movePlayer("left");
      break;
    case "ArrowRight":
      movePlayer("right");
      break;
  }
});

intervalId = setInterval(moveObstacles, 1000);

updateGameBoard();

function obtenerIndiceAleatorio() {
  let indice = Math.floor(Math.random() * Preguntas.length);
  while (PregMostrada.includes(indice)) {
    indice = Math.floor(Math.random() * Preguntas.length);
  }
  PregMostrada.push(indice);

  return indice;
}

function VerifPregResp() {
  let indice = Math.floor(Math.random() * destinations.length);
  while (PregRespuesta.includes(indice)) {
    indice = Math.floor(Math.random() * destinations.length);
  }
  PregRespuesta.push(indice);

  return indice;
}
