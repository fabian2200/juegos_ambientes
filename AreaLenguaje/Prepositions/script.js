let frases = [];

var objeto = document.getElementById('rana');
var angulo = 0;
var currentPosition = objeto.getBoundingClientRect().top;
var intervalId;
var elementoSel = null;

function agregarMovimiento(evento, elemento) {
    elementoSel = elemento;
    objeto.setAttribute("src", "rana2.png");
    var x = evento.clientX - objeto.offsetLeft - objeto.offsetWidth / 2;
    var y = evento.clientY - objeto.offsetTop - objeto.offsetHeight / 2;
    angulo = Math.atan2(y, x) * 180 / Math.PI;
    objeto.style.transform = 'rotate(' + angulo + 'deg)';

    var posicion = elemento.getBoundingClientRect();
    objeto.style.left = (posicion.left - 40) + "px";
    objeto.style.top = (posicion.top + 15) + "px";

    setTimeout(()=>{
        objeto.setAttribute("src", "rana.png");
        objeto.style.transform = "rotate(1deg)";
        calificarPregunta();
    }, 1300)
}

let correctas = 0;
function calificarPregunta(){
    elementoSel.innerHTML = "";
    if(elementoSel.getAttribute("data-id") == "true"){
        correctas++;
        for (let index = ultimo - 4; index < ultimo; index++) {
            if(elementoSel.getAttribute("id") != "div"+index){
                document.getElementById("div"+index).parentElement.style.opacity = "0";
            }
        }
        setTimeout(()=>{
            if(correctas < 5){
                document.getElementById("principal_preguntas").style.left = (document.getElementById("principal_preguntas").getBoundingClientRect().left - 250)+"px";
                objeto.style.transition = "top 1.3s linear, left 2.4s linear"
                objeto.style.left = (objeto.getBoundingClientRect().left - 250) + "px"; 
                setTimeout(()=>{
                    objeto.style.transition = "top 1.3s linear, left 1.3s linear";
                    preguntar();
                }, 2400)
            }else{
                document.getElementById("principal_preguntas").style.left = (document.getElementById("principal_preguntas").getBoundingClientRect().left - 250)+"px";
                objeto.style.transition = "top 1.3s linear, left 2.4s linear"
                objeto.style.left = (objeto.getBoundingClientRect().left - 250) + "px"; 
                setTimeout(()=>{
                    objeto.setAttribute("src", "rana2.png");
                    objeto.style.left = (objeto.getBoundingClientRect().left + 350) + "px"; 
                    objeto.style.transition = "top 1.3s linear, left 2.4s linear"
                    objeto.style.top = "43%"; 
                    setTimeout(()=>{
                        objeto.setAttribute("src", "rana.png");
                        finalJuego();
                    }, 1300)
                }, 2400)
               
            }
        }, 1000)
    }else{
        setTimeout(()=>{
            finalJuego();
        }, 1000);
    }
}

$(document).ready(function () {
    base_preguntas = readText("data.json");
    frases = JSON.parse(base_preguntas);
    frases = randomValueGenerator(frases);

    setTimeout(() => {
        $('#principal').fadeToggle(1000);
        $('#fondo_blanco').fadeToggle(3000);
        setTimeout(() => {
            const divAnimado = document.querySelector('.overlay');
            divAnimado.style.animationName = 'moverDerecha';
            divAnimado.style.animationDirection = 'normal';
            divAnimado.style.display = 'block';
            setTimeout(() => {
                const divAnimado2 = document.querySelector('.nube');
                divAnimado2.style.animationName = 'moverArriba';
                divAnimado2.style.animationDirection = 'normal';
                divAnimado2.style.display = 'block';
                setTimeout(() => {
                    divAnimado.style.backgroundImage = "url(../../images/normal2.gif)"
                    maquina2("bienvenida", 'Hola, soy Genio. <br> A continuación se te mostraran 5 oraciones de las cuales deberás seleccionar la preposición correspondiente <br> ¡Tú Puedes!', 50, 1);
                }, 3000)
            }, 2000)
        })
    }, 200)
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
                    document.querySelector('#btnomitir').style.display = "none";
                    setTimeout(() => {
                        cerrar_anuncio();
                    }, 3000)
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
                pintardivs();
                setTimeout(()=>{
                    preguntar();
                    reloj();
                }, 500)
            }, 2000)
        }, 2000);
    }
}

var intervalos = [];
let preguntaActual = 0;

function pintardivs(){
    let divss = "";
    for (let index = 0; index < 20; index++) {
        divss += "<div class='wave'>"+
			"<div onclick='agregarMovimiento(event, this)' id='div"+index+"' class='collapsedd'></div>"+
		"</div>";
    }

    document.getElementById("principal_preguntas").innerHTML = "";
    document.getElementById("principal_preguntas").innerHTML = divss;


    var divs = $(".wave");
    var posicionInicial = 400;
    var posicionInicial2 = 90;

    for (var i = 0; i < divs.length; i++) {
        var div = divs[i];

        $(div).css("transition", "");
        $(div).css("left", posicionInicial + "px");
        $(div).css("top", posicionInicial2 + "px");

        if((i+1) % 4 == 0){
            posicionInicial += 400;
        }

        if((i+1) % 4 == 0){
            posicionInicial2 = 90;
        }else{
            posicionInicial2 += 140;
        }
    }
}

var ultimo = 0;
function preguntar() {
    let pregunta = frases[preguntaActual];
    document.getElementById("pregunta").innerText = pregunta.pregunta;

    let opciones = randomValueGenerator(pregunta.opciones);
   
    let i = 0;
    for (let index = ultimo; index < ultimo + 4; index++) {
        const element = opciones[i];
        const elemento = document.getElementById("div"+index);
        if(pregunta.tipo == 1){
            elemento.innerHTML = "<p class='borde' id='pregunta"+index+"'>"+ element.opcion+"</p>";
        }else{
            elemento.innerHTML = "<image src='img/"+ element.opcion+"' height='80'>";
        }
        elemento.setAttribute("data-id", element.es_correcta); 
        i++;
    }
    ultimo += 4;
    preguntaActual++;
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

function finalJuego() {
    $('#principal').fadeToggle(500);
    setTimeout(() => {
        $('#final').fadeToggle(1000);
    }, 500);

    if (correctas < 5) {
        document.getElementById("final").style.backgroundImage = "url(../../images/derrota.gif)";
    } else {
        document.getElementById("final").style.backgroundImage = "url(../../images/victoria.gif)";
    }

    document.getElementById("texto_final").innerText = "Has contestado correctamente " + correctas + " pregunta(s)";

    if (correctas == 5) {
        var audio = new Audio('../../sounds/victory.mp3');
        audio.play();
    } else {
        var audio = new Audio('../../sounds/game_over.mp3');
        audio.play();
    }
}

function reloj(){
    var timeleft = 180;
    var downloadTimer = setInterval(function(){
      var minutes = Math.floor(timeleft / 60);
      var seconds = timeleft - minutes * 60;
      if(seconds < 10) {
        seconds = "0" + seconds;
      }
      document.getElementById("timer").innerHTML = minutes + ":" + seconds;
      timeleft -= 1;
      if(timeleft <= 0){
        clearInterval(downloadTimer);
        document.getElementById("timer").innerHTML = "0:00";
        setTimeout(() => {
            clearInterval(intervalos.shift());
            intervalos = [];
            posicionInicial = 0;
            finalJuego();
        }, 2500)
      }
    }, 1000);
}
