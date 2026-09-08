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
    console.log("es el mismo hueco "+randomHans);
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

function startGame(numeros) {
  let moles_divs = [];
  for (let index = 0; index < moles.length; index++) {
    const element = moles[index];
    moles_divs.push(element);
  }

  moles_divs = randomValueGenerator(moles_divs);

  for (let index = 0; index < 3; index++) {
    const element = moles_divs[index];
    element.setAttribute("data-id", numeros[index].opcion);
    element.innerHTML = "<h5 style='margin-top: 49%;'><span class='"+numeros[index].tipo+" respuesta'>"+numeros[index].numero.toLocaleString()+"</span></h5>"
  }

  for (let index = 3; index < 6; index++) {
    const element = moles_divs[index];
    element.setAttribute("data-id", numeros[index].opcion);
    element.innerHTML = "<h5 style='margin-top: 49%;'><span class='"+numeros[index].tipo+" respuesta'>"+numeros[index].numero.toLocaleString()+"</span></h5>"
  }

  timeUp = false;
  peep();
  setTimeout(() => (timeUp = true), 900000);
  //muestra topos aleatoriamente durante 15 segundos
}

function wack(e) {
  //para que no cuente un click simulado desde js y solo recoja el del usuario.
  if (!e.isTrusted) return;
  let dt = this.getAttribute("data-id");
  if(dt == "correcta"){ 
    score++;
    this.parentElement.classList.add("ok");
    setTimeout(()=>{
      this.parentElement.classList.remove("ok");
      preguntar();
    }, 1000)
   
  }else{
    this.parentElement.classList.add("over");
    setTimeout(()=>{
      this.parentElement.classList.add("bajar");
      preguntar();
    }, 1000)
    inscore++;
  }
}

moles.forEach((topo) => topo.addEventListener("click", wack));

let raiz = 0;
$(document).ready(function() {
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
          maquina2("bienvenida",'Hola, soy Genio. <br> En este juego resuelve la operación y selecciona el topo que tenga la respuesta correcta. <br> ¡Tú Puedes!',50,1);
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
  if(!cerrardo) {
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
            preguntar();
        }, 2000)
    }, 2000);
  }
}


let pregunta_actual = 1;

function preguntar() {
    if (pregunta_actual <= 10) {
      scoreBoard.innerText = pregunta_actual+" / 10";

      var numero = Math.floor(Math.random() * (2 - 1 + 1) + 1);
      if(numero == 1){
        let numeros = generateRaiz();
        startGame(numeros);
      }else{
        let numeros = generatePotencia();
        startGame(numeros);
      }
      
      document.getElementById("score").innerText = pregunta_actual+" de 10";
      pregunta_actual++;
    } else {
        $('#principal').fadeToggle(500);
        setTimeout(() => {
            $('#final').fadeToggle(1000);
        }, 500)
        if (score >= 6) {
            document.getElementById("final").style.backgroundImage = "url(../../images/victoria.gif)";
        } else {
            document.getElementById("final").style.backgroundImage = "url(../../images/derrota.gif)";
        }

        document.getElementById("texto_final").innerText = "Has respondido correctamente " + score + " y "+inscore+ " respuestas incorrectas";

        if (score >= 6) {
            var audio = new Audio('../../sounds/victory.mp3');
            audio.play();
        } else {
            var audio = new Audio('../../sounds/game_over.mp3');
            audio.play();
        }
    }
}

function generateRaiz(){
  var numero = Math.floor(Math.random() * (150 - 4 + 1) + 4);
  let raiz = 0;
  if(numero < 50){
    raiz = Math.floor(Math.random() * (4 - 2 + 1) + 2);
  }else{
    raiz = Math.floor(Math.random() * (3 - 2 + 1) + 2);
  }
  
  let resultado_raiz = numero;
  for (let index = 0; index < raiz-1; index++) {
    resultado_raiz =  resultado_raiz * numero;
  }

  let opciones = [];

  opciones.push({
    numero: numero,
    opcion: "correcta"
  })

  for (let index = 0; index < 5; index++) {
    let numero2 =  Math.floor(Math.random() * ((numero+10) - (numero-10) + 1) + (numero-10));
    if(numero2 != raiz && opciones.filter(e => e.numero === numero2).length == 0){
      opciones.push({
        numero: numero2,
        opcion: "incorrecta"
      })
    }else{
      index--;
    }
    
  }

  let raiz_letra = "";
  switch (raiz) {
    case 2:
      raiz_letra = "cuadrada"
      break;
    case 3:
      raiz_letra = "cúbica"
      break;
    case 4:
      raiz_letra = "cuarta"
      break;
    default:
      break;
  }

  document.getElementById("tipo_t").innerText = "Calcule la raíz "+raiz_letra+" de "+resultado_raiz.toLocaleString();

  return randomValueGenerator(opciones);
}


function generatePotencia(){
  var numero = Math.floor(Math.random() * (150 - 4 + 1) + 4);
  let potencia = 0;
  if(numero < 50){
    potencia = Math.floor(Math.random() * (4 - 2 + 1) + 2);
  }else{
    potencia = Math.floor(Math.random() * (3 - 2 + 1) + 2);
  }
  
  let resultado_potencia = numero;
  for (let index = 0; index < potencia-1; index++) {
    resultado_potencia =  resultado_potencia * numero;
  }

  let opciones = [];

  opciones.push({
    numero: resultado_potencia,
    opcion: "correcta"
  })

  for (let index = 0; index < 5; index++) {
    let numero2 =  Math.floor(Math.random() * ((resultado_potencia+100) - (numero-100) + 1) + (numero-100));
    if(numero2 != resultado_potencia && opciones.filter(e => e.numero === numero2).length == 0){
      opciones.push({
        numero: numero2,
        opcion: "incorrecta"
      })
    }else{
      index--;
    }
    
  }

  document.getElementById("tipo_t").innerHTML = "Calcule la siguiente potencia "+numero+"<sup>"+potencia+"</sup>";

  return randomValueGenerator(opciones);
}

function randomValueGenerator(vector) {
  return vector.sort(function () { return Math.random() - 0.5 });
};
