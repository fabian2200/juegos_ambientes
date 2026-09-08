// ### VARIABLES ###

var palabras = [];
// Palabra a averiguar
var palabra = "";
// Nº aleatorio
var rand;
// Palabra oculta
var oculta = [];
// Elemento html de la palabra
var hueco = document.getElementById("palabra");
// Contador de intentos
var cont = 6;
// Botones de letras
var buttons = document.getElementsByClassName('letra');
// Boton de reset
var btnInicio = document.getElementById("reset");

const acentos = {'á':'a','é':'e','í':'i','ó':'o','ú':'u','Á':'A','É':'E','Í':'I','Ó':'O','Ú':'U', 'Ü': 'U'};

var numero_palabra = 1;

// ### FUNCIONES ###

// Escoger palabra al azar
function generaPalabra() {
  palabra = palabras[numero_palabra].palabra.toUpperCase();
  palabra = palabra.split('').map( letra => acentos[letra] || letra).join('').toString();
  console.log(palabra);
}

// Funcion para pintar los guiones de la palabra
function pintarGuiones(num) {
  oculta = [];
  hueco.innerText = ""
  for (var i = 0; i < num; i++) {
    oculta[i] = "_";
  }
  hueco.innerText = oculta.join("");
}

//Generar abecedario
function generaABC (a,z) {
  document.getElementById("abcdario").innerHTML = "";
  var i = a.charCodeAt(0), j = z.charCodeAt(0);
  var letra = "";
  for( ; i<=j; i++) {
    letra = String.fromCharCode(i).toUpperCase();
    document.getElementById("abcdario").innerHTML += "<button value='" + letra + "' onclick='intento(\"" + letra + "\")' class='letra' id='"+letra+"'>" + letra + "</button>";
    if(i==110) {
      document.getElementById("abcdario").innerHTML += "<button value='Ñ' onclick='intento(\"Ñ\")' class='letra' id='"+letra+"'>Ñ</button>";
    }
  }
}

// Chequear intento
function intento(letra) {
  document.getElementById(letra).disabled = true;
  if(palabra.indexOf(letra) != -1) {
    for(var i=0; i<palabra.length; i++) {
      if(palabra[i]==letra) oculta[i] = letra;
    }
    hueco.innerHTML = oculta.join("");
    document.getElementById("acierto").innerHTML = "Bien!";
    document.getElementById("acierto").className += "acierto verde";
  }else{
    cont--;
    document.getElementById("intentos").innerHTML = cont;
    document.getElementById("acierto").innerHTML = "Fallo!";
    document.getElementById("acierto").className += "acierto rojo";

    for (let index = 0; index < 7; index++) {
      document.getElementById("image"+index).style.display = "none";
    }

    for (let index = 0; index < 7; index++) {
      if(index == cont){
        document.getElementById("image"+index).style.display = "block";
      }
    }
  }
  compruebaFin();
  setTimeout(function () { 
    document.getElementById("acierto").className = ""; 
  }, 800);
}

// Obtener pista
function pista() {
  document.getElementById("pista_palabra").innerHTML = "<strong style='color: red'>Pista: </strong>"+palabras[numero_palabra].pista+"";
  document.getElementById("tema").innerText = palabras[numero_palabra].tema;
}

// Compruba si ha finalizado
function compruebaFin() {
  if( oculta.indexOf("_") == -1 ) {
    mensaje_final(1);
    document.getElementById("palabra").className += " encuadre";
    for (var i = 0; i < buttons.length; i++) {
      buttons[i].disabled = true;
    }
    document.getElementById("reset").innerHTML = "Empezar";
    btnInicio.onclick = function() { location.reload() };
  }else if( cont == 0 ) {
    mensaje_final(0);
    for (var i = 0; i < buttons.length; i++) {
      buttons[i].disabled = true;
    }
    document.getElementById("reset").innerHTML = "Empezar";
    btnInicio.onclick = function () { location.reload() };
  }
}

let palabras_adivinadas = 0;
function mensaje_final(tipo){
  if(tipo == 1){
    Swal.fire({
      position: "center",
      imageUrl: "../../images/correcto.gif",
      imageWidth: 250,
      imageHeight: 250,
      title: "Correcto!",
      text:'Has adivinado la palabra',
      showConfirmButton: false,
      timer: 2500,
    });
    palabras_adivinadas++;
    setTimeout(()=>{
      document.getElementById("palabra").classList.remove("encuadre");
      inicio();
    }, 1500)
  }else{
    Swal.fire({
      position: "center",
      imageUrl: "../../images/incorrecto.gif",
      imageWidth: 250,
      imageHeight: 250,
      title: "Incorrecto!",
      text:'¡Sigue intentando!',
      showConfirmButton: false,
      timer: 2500,
    });

    setTimeout(()=>{
      document.getElementById("palabra").classList.remove("encuadre");
      inicio();
    }, 2500)
  }
}

// Restablecer juego
function inicio() {
  if(numero_palabra <= 10){
    generaPalabra();
    pintarGuiones(palabra.length);
    generaABC("a","z");
    cont = 6;
    document.getElementById("intentos").innerHTML=cont;

    for (let index = 0; index < 7; index++) {
      if(index == 6){
        document.getElementById("image"+index).style.display = "block";
      }else{
        document.getElementById("image"+index).style.display = "none";
      }
    }
    pista();
    document.getElementById("numero").innerText = "Palabra "+numero_palabra+" de 10"
    numero_palabra++;
  }else{
      $('#principal').fadeToggle(500);
      setTimeout(()=>{
        $('#final').fadeToggle(1000);
      }, 500)
      if(palabras_adivinadas < 6 ){
        document.getElementById("final").style.backgroundImage = "url(../../images/derrota.gif)";
      }else{
        document.getElementById("final").style.backgroundImage = "url(../../images/victoria.gif)";
      }

      document.getElementById("texto_final").innerText = "Has adivinado "+palabras_adivinadas+" palabras de 10"

      if(palabras_adivinadas >= 6){
        var audio = new Audio('../../sounds/victory.mp3');
        audio.play();
      }else{
        var audio = new Audio('../../sounds/game_over.mp3');
        audio.play();
      }
  }
}

// Iniciar
$(document).ready(function() {
	let audio2 = new Audio('../../sounds/fondo.mp3');
	audio2.play(); 
	audio2.volume = 0.2;

  let base_preguntas = readText("palabras.json");
  palabras = JSON.parse(base_preguntas);
  palabras = randomValueGenerator(palabras);

	setTimeout(()=>{
    $('#principal').fadeToggle(1000);
    $('#fondo_blanco').fadeToggle(3000);
    setTimeout(()=>{
      const divAnimado = document.querySelector('.overlay');
      divAnimado.style.animationName = 'moverDerecha';
      divAnimado.style.animationDirection = 'normal';
      divAnimado.style.display = 'block';
      setTimeout(()=>{
        const divAnimado2 = document.querySelector('.nube');
        divAnimado2.style.animationName = 'moverArriba';
        divAnimado2.style.animationDirection = 'normal';
        divAnimado2.style.display = 'block';
        setTimeout(()=>{
          divAnimado.style.backgroundImage = "url(../../images/normal2.gif)"
          maquina2("bienvenida",'Hola, soy Genio. <br> A continuación se te mostrara una pista haz uso de ella y adivina la palabra, recuerda que tendras 6 intentos para intentar adivinarla. <br> ¡Tu Puedes!',50,1);
        }, 3000)
      }, 2000)
    })
  }, 200)
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
  if(!cerrardo){
    let audio2 = new Audio("../../sounds/fondo.mp3");
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
            inicio();
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
