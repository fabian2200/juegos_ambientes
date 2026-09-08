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
            "Hola, soy Genio. <br> En este juego deberas abrir cada una de las puertas de los ascensores que se encuentran, al abrir las puertas debes responder la pregunta que se muestra. <br> ¡Tu Puedes!",
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
let divSel;
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

document.addEventListener("DOMContentLoaded", function () {
  var ascensor = "";
  for (var i = 1; i <= 10; i++) {
    switch (i) {
      case 1:
        Pregtmas = Div1;
        break;
      case 2:
        Pregtmas = Div2;
        break;
      case 3:
        Pregtmas = Div3;
        break;
      case 4:
        Pregtmas = Div4;
        break;
      case 5:
        Pregtmas = Div5;
        break;
      case 6:
        Pregtmas = Div6;
        break;
      case 7:
        Pregtmas = Div7;
        break;
      case 8:
        Pregtmas = Div8;
        break;
      case 9:
        Pregtmas = Div9;
        break;
      case 10:
        Pregtmas = Div10;
        break;
    }

    let index = Math.floor(Math.random() * (9 - 1 + 1) + 1);
  
    var preg = Pregtmas[index].question;
    var numb = Pregtmas[index].numb;

    ascensor +=
      '<div data-id="' +
      numb +
      '" class="miDiv" id="' +
      i +
      '">' +
      '<div class="puerta puerta-izquierda"></div>' +
      '<div class="puerta puerta-derecha"></div>' +
      '<labe class="pregunta"  id="pregAsc' +
      i +
      '">' +
      preg +
      " </labe>" +
      " </div>";
  }

  document.getElementById("contDivs").innerHTML = ascensor;

  const divElements = document.querySelectorAll(".miDiv");

  const abrirCerrarPuertas = function (divElement) {
    divElement.addEventListener("click", function () {
      divElement.classList.add("abierto");

      setTimeout(function () {
        //divElement.classList.remove('abierto');
        divSel = divElement;
        abrirModal(divElement);
      }, 1000);
    });
  };

  divElements.forEach(function (div) {
    abrirCerrarPuertas(div);
  });
});

function abrirModal(div) {
  let idDiv = div.getAttribute("id");
  let idPre = div.getAttribute("data-id");

  const modal = document.querySelector("#modal");
  modal.classList.add("md--active");
  console.log("inicial=" + idDiv + "-" + idPre);

  iniciarTrivia(idDiv, idPre);
  // Agregar la clase 'abierto' al modal después de un breve retraso para que se aplique la animación
  setTimeout(function () {
    // modal.classList.add('abierto');
  }, 100);
}

function cerrarModal() {

  const puertaIzquierda = divSel.querySelector(".puerta-izquierda");
  const puertaDerecha = divSel.querySelector(".puerta-derecha");

  if (Respuesta == "ok") {
    puertaIzquierda.style.backgroundImage = "url(izquierdaV.png)";
    puertaDerecha.style.backgroundImage = "url(derechaV.png)";
  } else {
    puertaIzquierda.style.backgroundImage = "url(izquierdaF.png)";
    puertaDerecha.style.backgroundImage = "url(derechaF.png)";
  }

  // Cambia la imagen de fondo de los elementos

  setTimeout(function () {
    divSel.classList.remove("abierto");
    divSel.style.pointerEvents = "none";

  }, 700);

  if (document.querySelector(".md--active"))
    document.querySelector(".md--active").classList.remove("md--active");
}
