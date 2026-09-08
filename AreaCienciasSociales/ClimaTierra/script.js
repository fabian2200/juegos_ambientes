let climas = [];
let paises = [];
//arreglo donde se guradaran los paises desordenados
let paisesDesordenados=[];
//variable que guarda la posicion actual
let posJuegoActual = 0;
//variable que guarda la cantidad acertada
let cantidadAcertados = 0;

//funcion para desordenar los paises
function desordenarPaises(){
    paises = paises.sort(function() {return Math.random() - 0.5});
    for(var i=0;i<paises.length;i++){
      //convertimos el pais en un arreglo
      let pais = paises[i].clima;
      pais = pais.toUpperCase();
      let palabras = pais.split(" ");
      palabras.sort(function() {
        return Math.random() - 0.5;
      });

      let fraseDesordenada = palabras.join(" ");
      //Guardamos el pais en el arreglo de paises desordenads
      paisesDesordenados.push(fraseDesordenada);
    }
}

function mostrarNuevoPais(){
  document.getElementById("palabra_actual").innerText = "Frase "+(posJuegoActual+1)+" de 10"
  letras_correctas = 0;
  //controlo si terminaron las palabras
  if(posJuegoActual >= 10){
    mostrarPantallaFinal();
    setTimeout(()=>{
      $('#principal').fadeToggle(500);
      setTimeout(()=>{
        $('#final').fadeToggle(1000);
      }, 500)
      if(cantidadAcertados < 6 ){
        document.getElementById("final").style.backgroundImage = "url(../../images/derrota.gif)";
      }else{
        document.getElementById("final").style.backgroundImage = "url(../../images/victoria.gif)";
      }

      document.getElementById("texto_final").innerText = "Has ordenado correctamente "+cantidadAcertados+" frases de 10"

      if(cantidadAcertados >= 6){
        var audio = new Audio('../../sounds/victory.mp3');
        audio.play();
      }else{
        var audio = new Audio('../../sounds/game_over.mp3');
        audio.play();
      }

      posJuegoActual = 0;
      cantidadAcertados = 0;
    }, 3000)
  }
  let contenedorPais = document.getElementById("pais");
  //eliminamos todo lo que tiene el div del pais
  contenedorPais.innerHTML="";
  let imagen = document.getElementById("imagen_clima");
  imagen.setAttribute("src", "img/"+paises[posJuegoActual].img)

  let pais = paisesDesordenados[posJuegoActual];
  pais = pais.split(' ');

  x=0;
  clearInterval(idInterval);
  move();
  for(i=0;i<pais.length;i++){

    let id = "letra_"+i;
    var div = document.createElement("div");
    if(pais[i] != " "){
      div.className = "letra";
    }else{
      div.className = "letra_2";
      div.classList.add("selector_none");
    }
    div.innerHTML = pais[i];
    div.setAttribute("id", id);
    div.classList.add("cursorImg");
    div.classList.add("data");
    div.setAttribute("data-id", pais[i]);
    contenedorPais.appendChild(div);
  }

  setTimeout(()=>{
    ordenar();
  }, 2000)
}

function ordenar(){
  var items = document.querySelector('.sortable');
  Sortable.create(items, {
      animation: 150,
      chosenClass: "chosen",
      ghostClass: "ghost",
      dragClass: "drag",
      onEnd: () => {
        var paisOrdanedo = paises[posJuegoActual].clima;
        paisOrdanedo = paisOrdanedo.toUpperCase();
        orden_correcto = paisOrdanedo.split(' ').toString();

        let orden = document.getElementsByClassName("data");
        let orden_actual = [];
        for (let index = 0; index < orden.length; index++) {
          const element = orden[index];
          let id = element.dataset.id
          orden_actual.push(id);
        }

        orden_actual = orden_actual.toString();
        
        if(orden_correcto === orden_actual){
          console.log("correcto!");
          var audio = new Audio('../../sounds/victory.mp3');
          audio.play(); 
          setTimeout(() => {
            cantidadAcertados += 1;
            posJuegoActual += 1;
            document.getElementById("contador").innerHTML = cantidadAcertados;
            mostrarNuevoPais();
          }, 500);
        }else{
          console.log("incorrecto!")
        }
      },
      group: "cards",
      store: {
          set:(sortable) => {
              const orden = sortable.toArray();
          },
          //obtener orden de la lista
          get: (sortable) => {
              let orden = ['1','2','3','4','5','6','7','8','9','10'];
              orden = orden.sort(function() {return Math.random() - 0.5});
              return orden;
          }
      }
  });
}

function mostrarPantallaFinal(){
  clearInterval(idInterval);
  document.getElementById("pantalla-juego").style.display = "none";
  document.getElementById("pantalla-final").style.display = "flex";
  document.getElementById("acertadas").innerHTML = cantidadAcertados;
}

//Funcion que compara el pais ingresado con el pais correcto
let x = 0;
let idInterval;
function move() {
  if (x == 0) {
    x= 1;
    let elem = document.getElementById("myBar");
    let width = 1;
    idInterval = setInterval(frame, 400);
    function frame() {
      if (width >= 100) {
        clearInterval(idInterval);
        x = 0;
        posJuegoActual++;
        mostrarNuevoPais();
      } else {
        width++;
        elem.style.width = width + "%";
      }
    }
  }
}

function comenzarJuego(){
 play();
}

var tipo_juego = "";

function play(){
 
    
  tipo_juego = "El CLima de la Tierra";
  paises = climas;
    
  document.getElementById("tipo_juego").innerHTML = tipo_juego;
  setTimeout(()=>{
    paisesDesordenados=[];
    posJuegoActual = 0;
    cantidadAcertados = 0;
    desordenarPaises();
    document.getElementById("pantalla-inicio").style.display = "none";
    document.getElementById("pantalla-juego").style.display = "block";
    document.getElementById("pantalla-final").style.display = "none";
    mostrarNuevoPais();
    document.getElementById("contador").innerHTML = 0;
  }, 500);

}

function comenzar_de_nuevo(){
  document.getElementById("pantalla-inicio").style.display = "flex";
  document.getElementById("pantalla-juego").style.display = "none";
  document.getElementById("pantalla-final").style.display = "none";

  for (i = 10; i >= 0; i--){
    document.getElementById('categoria').style.opacity = "0";
  }
}

$(document).ready(function () {
  var base_preguntas = readText("climas.json");
  climas = JSON.parse(base_preguntas);
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
            "url(../../images/normal2.gif)";
          maquina2(
            "bienvenida",
            "Hola, soy Genio. <br> En este juego deberas tomar la imagen como pìsta, y debes ordenar la frase para poder ganar. <br> ¡Tú Puedes!",
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
                document.querySelector('#btnomitir').style.display = "none";
                  setTimeout(() => {
                      cerrar_anuncio();
                  }, 3000)
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
  if (!cerrardo) {
    let audio = new Audio('../../sounds/fondo.mp3');
    audio.play();
    audio.volume = 0.2;
    
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