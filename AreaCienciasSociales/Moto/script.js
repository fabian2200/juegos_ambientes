let frases = [];

var objeto = document.getElementById('miObjeto');
var angulo = 0;
var currentPosition = objeto.getBoundingClientRect().top;
var intervalId;


$(document).ready(function () {
    let audio = new Audio('../../sounds/fondo.mp3');
    audio.play();
    audio.volume = 0.2;

    base_preguntas = readText("preguntas.json");
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
                    maquina2("bienvenida", 'Hola, soy Genio. <br> A continuación se te mostraran 10 preguntas relacionadas con el tema "El ADN" deberas estrellar el aviòn con la nube que tenga la respuesta correcta. <br> ¡Tú Puedes!', 50, 1);
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
    if (!cerrardo) {
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
                reloj();
            }, 2000)
        }, 2000);
    }
}

var intervalos = [];
var posicionInicial = 0;
var posicionInicial2  = 0;
let preguntaActual = 0;
function preguntar() {
    posicionInicial = 0;
    posicionInicial2  = 0;
    let pregunta = frases[preguntaActual];
    document.getElementById("pregunta").innerText = "";
    document.getElementById("pregunta").innerText = pregunta.pregunta;


    let opciones = randomValueGenerator(pregunta.opciones);
    for (let index = 0; index < 2; index++) {
        const element = opciones[index];
        const elemento = document.getElementById("pregunta" + index);
        elemento.innerText = element.opcion;
        elemento.parentElement.setAttribute("data-id", element.es_correcta);
    }


    var divs = $(".miDiv");
    pos_mayor = 0;


    for (var i = 0; i < divs.length; i++) {
        var div = divs[i];
        if (posicionInicial == 0) {
            posicionInicial = Math.floor(Math.random() * (window.innerWidth - 2100)) + 2100;
        } else {
            posicionInicial += 500;
        }

        if (posicionInicial2 == 0) {
            posicionInicial2 = 420;
        } else {
            posicionInicial2 += 100;
        }


        $(div).css("transition", "");
        $(div).css("left", posicionInicial + "px");
        $(div).css("top", posicionInicial2 + "px");
       
        var intervalo = setInterval(moverDiv, 995, div);
        intervalos.push(intervalo);

        if (posicionInicial > pos_mayor) {
            pos_mayor = posicionInicial;
            ultimoDiv = div;
        }
    }

}

function moverDiv(div) {
    posicion = div.offsetLeft;
    posicion -= 170;
    $(div).css("transition", "");
    $(div).css("transition", "left 1s linear");
    $(div).css("left", posicion + "px");
    if (ultimoDiv.offsetLeft <= -330) {
        clearInterval(intervalos.shift());
        intervalos = [];
        posicionInicial = 0;
        var nubes = document.getElementsByClassName("miDiv");
        for (let index = 0; index < nubes.length; index++) {
            const element2 = nubes[index];
            element2.style.backgroundImage = "url(nube.png)";       
        }
        preguntar();
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

const intervalo_estrelladas = setInterval(() => {
    verificarEstrellada();
}, 500);

var correctas = 0;
function verificarEstrellada() {
    var nubes = document.getElementsByClassName("miDiv");
    for (let index = 0; index < nubes.length; index++) {
        const element2 = nubes[index];
        const element = element2.firstElementChild;
        var rect1 = element.getBoundingClientRect();
        var rect2 = document.getElementById("llanta").getBoundingClientRect();
        if (rect1.bottom > rect2.top && rect1.top < rect2.bottom && rect1.right > rect2.left && rect1.left < rect2.right) {
            preguntaActual++;
            if (element.getAttribute("data-id") == "true") {
                element2.style.backgroundImage = "url(check.png)";
                resetProgressBar();
                correctas++;
            } else {
                resetProgressBar2();
                document.body.style.animation = "shake 1s linear infinite forwards";
                setTimeout(() => {
                    document.body.style.animation = "mover 9s linear infinite forwards";
                }, 1800)
            }
        }
    }
}

function finalJuego() {
    $('#principal').fadeToggle(500);
    setTimeout(() => {
        $('#final').fadeToggle(1000);
    }, 500);

    if ((correctas/(preguntaActual+1)*100) < 60) {
        document.getElementById("final").style.backgroundImage = "url(../../images/derrota.gif)";
    } else {
        document.getElementById("final").style.backgroundImage = "url(../../images/victoria.gif)";
    }

    document.getElementById("texto_final").innerText = "Has contestado correctamente el" + ((correctas/(preguntaActual+1)*100) < 60).toFixed(2) + "% de las pregunta(s)";

    if ((correctas/(preguntaActual+1)*100) < 60) {
        var audio = new Audio('../../sounds/victory.mp3');
        audio.play();
    } else {
        var audio = new Audio('../../sounds/game_over.mp3');
        audio.play();
    }
}

var progressBar = document.getElementById("progress-bar");
var duration = 90;
var remainingSeconds = duration;
var intervalId;


function resetProgressBar() {
    clearInterval(intervalId);
    var currentSeconds = remainingSeconds;
    var newSeconds = currentSeconds + 5;
    if (newSeconds > duration) {
        newSeconds = duration;
    }
    remainingSeconds = newSeconds;
    reloj();
}

function resetProgressBar2() {
    clearInterval(intervalId);
    var currentSeconds = remainingSeconds;
    var newSeconds = currentSeconds - 5;
    if (newSeconds > duration) {
        newSeconds = duration;
    }
    remainingSeconds = newSeconds;
    reloj();
}



function reloj() {
    var width = (remainingSeconds / duration) * 100;
    var decrement = 100 / duration;

    intervalId = setInterval(function () {
        width -= decrement;
        progressBar.style.width = width + "%";
        remainingSeconds--;

        if(width <= 70){
            progressBar.style.backgroundColor = "yellow";
        }

        if(width <= 40){
            progressBar.style.backgroundColor = "red";
        }

        if (width <= 0) {
            clearInterval(intervalId);
            finalJuego();
        }
    }, 1000);
}

var objeto2 = document.getElementById('miObjeto');
var currentPosition = objeto2.getBoundingClientRect().top;
var original = objeto2.getBoundingClientRect().top;

var abajo = false;

function subir(){
    if(abajo){
        currentPosition -= 100;
        objeto2.style.top = currentPosition + "px";
        abajo = false;
    }
}

function bajar(){
    if(!abajo){
        currentPosition += 100;
        objeto2.style.top = currentPosition + "px";
        abajo = true;
    }
}

document.addEventListener("keydown", function(event) {
    if (event.keyCode === 38) { 
        if(currentPosition - 50 >= original){
            currentPosition -= 50;
            objeto2.style.top = currentPosition + "px";
            abajo = false;
        }
    }

    if (event.keyCode === 40) { // Código de la tecla de bajar (40)
        if(currentPosition + 50 <= (original+100)){
            currentPosition += 50;
            objeto2.style.top = currentPosition + "px";
            abajo = true;
        }
      }
});