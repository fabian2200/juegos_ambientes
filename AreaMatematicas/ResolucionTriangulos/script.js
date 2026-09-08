let frases = [];
var intervalId;

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
            'Hola, soy Genio. <br> A continuación se te mostraran 5 preguntas con un triangulo y dos medidas, ya sea un lado y un ángulo, o dos lados, y deberás calcular los valores que se te pidan, para disparar a los globos que contengan la respuesta correcta. <br> ¡Tú Puedes!',
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

let cerrardo = false;
function cerrar_anuncio() {
  if (!cerrardo) {
    let audio = new Audio("../../sounds/fondo.mp3");
    audio.play();
    audio.volume = 0.2;
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
        pintarPregunta();
        reloj();
      }, 2000);
    }, 2000);
  }
}

var preguntaActual = 0;
var correctas = 0;
function pintarPregunta() {
  if (preguntaActual < 5) {
    var tipo = Math.floor(Math.random() * (2 - 0 + 1) + 0);
    var respuestas = [];
    var opciones = [];
    switch (tipo) {
      case 0:
        var catetoB = Math.floor(Math.random() * (20 - 5 + 1) + 5);
        var anguloA = Math.floor(Math.random() * (45 - 20 + 1) + 20);
        document.getElementById("valor1").innerText = "Cateto b = " + catetoB;
        document.getElementById("valor2").innerText = "Ángulo A = " + anguloA;
        var res = calcularLadosTrianguloRectangulo(catetoB, anguloA);
        respuestas = [res.catetoA, res.catetoB, res.hipotenusa];
        opciones = ["Cateto a", "Cateto b", "Hipotenusa"];
        break;
      case 1:
        var hipotenusa = Math.floor(Math.random() * (20 - 5 + 1) + 5);
        var anguloA = Math.floor(Math.random() * (45 - 20 + 1) + 20);
        document.getElementById("valor1").innerText =
          "Hipotenusa = " + hipotenusa;
        document.getElementById("valor2").innerText = "Ángulo A = " + anguloA;
        var res2 = calcularLadosTrianguloRectangulo2(hipotenusa, anguloA);
        respuestas = [res2.catetoA, res2.catetoB, res2.anguloB];
        opciones = ["Cateto a", "Cateto b", "Ángulo B"];
        break;
      case 2:
        var catetoA = Math.floor(Math.random() * (20 - 5 + 1) + 5);
        var catetoB = Math.floor(Math.random() * (20 - 5 + 1) + 5);
        document.getElementById("valor1").innerText = "Cateto a = " + catetoA;
        document.getElementById("valor2").innerText = "Cateto b = " + catetoB;
        var res3 = calcularHipotenusaYAngulos3(catetoA, catetoB);
        respuestas = [res3.hipotenusa, res3.anguloA, res3.anguloB];
        opciones = ["Hipotenusa", "Ángulo A", "Ángulo B"];
        break;
      case 3:
        var catetoB = Math.floor(Math.random() * (20 - 5 + 1) + 5);
        var hipotenusa = Math.floor(
          Math.random() * (20 - catetoB + 1) + catetoB
        );
        document.getElementById("valor1").innerText = "Cateto b = " + catetoB;
        document.getElementById("valor2").innerText =
          "Hipotenusa = " + hipotenusa;
        var res4 = calcularCatetoAYAngulos4(catetoB, hipotenusa);
        respuestas = [res4.catetoA, res4.anguloA, res4.anguloB];
        opciones = ["Cateto a", "Ángulo A", "Ángulo B"];
        break;
      default:
        break;
    }

    for (let index = 0; index < opciones.length; index++) {
      const element = opciones[index];
      document.getElementById("opcion" + index).innerText = element;
    }

    for (let index = 0; index < respuestas.length; index++) {
      var element = respuestas[index];
      element = randomValueGenerator(element);
      var globos = randomValueGenerator([
        "globo1",
        "globo2",
        "globo3",
        "globo4",
      ]);
      for (let index2 = 0; index2 < element.length; index2++) {
        const element2 = element[index2];
        document.getElementById("op" + index + "" + index2).innerText =
          Number.isInteger(element2[0])
            ? element2[0].toString()
            : element2[0].toFixed(2);
        document
          .getElementById("op" + index + "" + index2)
          .setAttribute("data-id", element2[1]);
        document
          .getElementById("op" + index + "" + index2)
          .setAttribute("data-globo", globos[index2]);
        document
          .getElementById("op" + index + "" + index2)
          .setAttribute("onclick", "verificar(this, " + index + ")");
        document.getElementById(
          "op" + index + "" + index2
        ).style.backgroundImage = "url(" + globos[index2] + ".png)";
      }
    }

    if (tipo == 1) {
      for (let index = 2; index <= 2; index++) {
        const element = respuestas[index];
        for (let index2 = 0; index2 < element.length; index2++) {
          document.getElementById("op" + index + "" + index2).innerText += "°";
        }
      }
    }

    if (tipo == 2 || tipo == 3) {
      for (let index = 1; index <= 2; index++) {
        const element = respuestas[index];
        for (let index2 = 0; index2 < element.length; index2++) {
          document.getElementById("op" + index + "" + index2).innerText += "°";
        }
      }
    }
  } else {
    finalJuego();
  }
}

function calcularLadosTrianguloRectangulo(catetoB, anguloA) {
  var radianes = (anguloA * Math.PI) / 180;
  var catetoA = (catetoB * Math.sin(radianes)) / Math.sin(Math.PI / 2);
  var hipotenusa = Math.sqrt(catetoA * catetoA + catetoB * catetoB);

  return {
    catetoA: [
      [catetoA, true],
      [catetoA + 10, false],
      [catetoA - 4, false],
      [catetoA + 5, false],
    ],
    catetoB: [
      [catetoB, true],
      [catetoB + 4, false],
      [catetoB - 4, false],
      [catetoB + 3, false],
    ],
    hipotenusa: [
      [hipotenusa, true],
      [hipotenusa - 4, false],
      [hipotenusa + 2, false],
      [hipotenusa + 5, false],
    ],
  };
}

function calcularLadosTrianguloRectangulo2(hipotenusa, anguloA) {
  var radianes = (anguloA * Math.PI) / 180;
  var catetoA = hipotenusa * Math.sin(radianes);
  var anguloB = 90 - anguloA;
  var radianesB = (anguloB * Math.PI) / 180;
  var catetoB = hipotenusa * Math.sin(radianesB);

  return {
    catetoA: [
      [catetoA, true],
      [catetoA + 7, false],
      [catetoA - 2, false],
      [catetoA + 4, false],
    ],
    catetoB: [
      [catetoB, true],
      [catetoB + 2, false],
      [catetoB - 6, false],
      [catetoB + 3, false],
    ],
    anguloB: [
      [anguloB, true],
      [anguloB - 1, false],
      [anguloB + 3, false],
      [anguloB + 5, false],
    ],
  };
}

function calcularHipotenusaYAngulos3(catetoA, catetoB) {
  var hipotenusa = Math.sqrt(catetoA * catetoA + catetoB * catetoB);
  var anguloA = (Math.asin(catetoA / hipotenusa) * 180) / Math.PI;
  var anguloB = 90 - anguloA;

  return {
    hipotenusa: [
      [hipotenusa, true],
      [hipotenusa - 3, false],
      [hipotenusa + 1, false],
      [hipotenusa + 6, false],
    ],
    anguloA: [
      [anguloA, true],
      [anguloA - 1, false],
      [anguloA + 3, false],
      [anguloA + 5, false],
    ],
    anguloB: [
      [anguloB, true],
      [anguloB - 2, false],
      [anguloB + 2, false],
      [anguloB + 1, false],
    ],
  };
}

function calcularCatetoAYAngulos4(catetoB, hipotenusa) {
  var anguloA = (Math.asin(catetoB / hipotenusa) * 180) / Math.PI;
  var catetoA = hipotenusa * Math.sin((anguloA * Math.PI) / 180);
  var anguloB = 90 - anguloA;

  return {
    catetoA: [
      [catetoA, true],
      [catetoA + 3, false],
      [catetoA - 1, false],
      [catetoA + 3, false],
    ],
    anguloA: [
      [anguloA, true],
      [anguloA + 1, false],
      [anguloA - 2, false],
      [anguloA + 8, false],
    ],
    anguloB: [
      [anguloB, true],
      [anguloB + 2, false],
      [anguloB - 4, false],
      [anguloB + 3, false],
    ],
  };
}

var contador = 0;
var bien = 0;
function verificar(elemento, pos) {
  for (let index = 0; index < 3; index++) {
    document
      .getElementById("op" + pos + "" + index)
      .setAttribute("onclick", "");
  }
  contador++;

  elemento.style.backgroundImage =
    "url(" + elemento.getAttribute("data-globo") + "1.png)";

  if (elemento.getAttribute("data-id") == "true") {
    elemento.classList.add("ok");
    bien++;
  } else {
    elemento.classList.add("fall");
    document.body.style.animation = "shake 1s linear infinite forwards";
    setTimeout(() => {
      document.body.style.animation = "mover 9s linear infinite forwards";
    }, 1800);
  }

  var rect = elemento.getBoundingClientRect();
  var puntoMedioX = rect.left + rect.width / 2;
  var puntoMedioY = rect.top + rect.height / 2;

  document.getElementById("principal").innerHTML +=
    "<img class='dardo' src='dardo.png' height='50px' style='position: absolute; left: " +
    (puntoMedioX - 50) +
    "px; top: " +
    (puntoMedioY - 50) +
    "px;' alt=''>";

  if (contador == 3) {
    if (bien == 3) {
      correctas++;
    }
    setTimeout(() => {
      for (let index = 0; index < 3; index++) {
        for (let index2 = 0; index2 < 4; index2++) {
          document
            .getElementById("op" + index + "" + index2)
            .classList.remove("ok");
          document
            .getElementById("op" + index + "" + index2)
            .classList.remove("fall");
        }
      }

      var elementos = document.getElementsByClassName("dardo");
      var elementosArray = Array.from(elementos);
      elementosArray.forEach(function (elemento) {
        elemento.remove();
      });

      contador = 0;
      bien = 0;
      preguntaActual++;
      pintarPregunta();
    }, 1500);
  }
}

function randomValueGenerator(vector) {
  return vector.sort(function () {
    return Math.random() - 0.5;
  });
}

function finalJuego() {
  $("#principal").fadeToggle(500);
  setTimeout(() => {
    $("#final").fadeToggle(1000);
  }, 500);

  if ((correctas / (preguntaActual + 1)) * 100 < 60) {
    document.getElementById("final").style.backgroundImage =
      "url(../../images/derrota.gif)";
  } else {
    document.getElementById("final").style.backgroundImage =
      "url(../../images/victoria.gif)";
  }

  document.getElementById("texto_final").innerText =
    "Has contestado correctamente el " +
    ((correctas / (preguntaActual + 1)) * 100).toFixed(2) +
    "% de las pregunta(s)";

  if ((correctas / (preguntaActual + 1)) * 100 < 60) {
    var audio = new Audio("../../sounds/victory.mp3");
    audio.play();
  } else {
    var audio = new Audio("../../sounds/game_over.mp3");
    audio.play();
  }
}

var progressBar = document.getElementById("progress-bar");
var duration = 120;
var remainingSeconds = duration;
var intervalId;

function reloj() {
  var width = (remainingSeconds / duration) * 100;
  var decrement = 100 / duration;

  intervalId = setInterval(function () {
    width -= decrement;
    progressBar.style.width = width + "%";
    remainingSeconds--;

    if (width <= 70) {
      progressBar.style.backgroundColor = "yellow";
    }

    if (width <= 40) {
      progressBar.style.backgroundColor = "red";
    }

    if (width <= 0) {
      clearInterval(intervalId);
      finalJuego();
    }
  }, 1000);
}
