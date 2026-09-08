let frases = [];

var objeto = document.getElementById('miObjeto');
var angulo = 0;
var currentPosition = objeto.getBoundingClientRect().top;
var intervalId;

function agregarMovimiento() {
    document.addEventListener('click', function (evento) {
        var x = evento.clientX - objeto.offsetLeft - objeto.offsetWidth / 2;
        var y = evento.clientY - objeto.offsetTop - objeto.offsetHeight / 2;
        angulo = Math.atan2(y, x) * 180 / Math.PI;
        objeto.style.transform = 'rotate(' + angulo + 'deg)';

        var mouseY = evento.clientY;

        if (mouseY < currentPosition) {
            currentPosition -= 50;
            objeto.style.top = currentPosition + "px";
        } else if (mouseY > currentPosition + 100) {
            currentPosition += 50;
            objeto.style.top = currentPosition + "px";
        }
    });

    document.addEventListener("mousedown", function (event) {
        var x = event.clientX - objeto.offsetLeft - objeto.offsetWidth / 2;
        var y = event.clientY - objeto.offsetTop - objeto.offsetHeight / 2;
        angulo = Math.atan2(y, x) * 180 / Math.PI;
        objeto.style.transform = 'rotate(' + angulo + 'deg)';

        intervalId = setInterval(function () {
            var mouseY = event.clientY;
            if (mouseY < currentPosition - 80) {
                currentPosition -= 25;
                objeto.style.top = currentPosition + "px";
            } else if (mouseY > currentPosition + 80) {
                currentPosition += 25;
                objeto.style.top = currentPosition + "px";
            }
        }, 60);
    });

    window.addEventListener("mouseup", function (event) {
        clearInterval(intervalId);
    });
}


$(document).ready(function () {
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
                agregarMovimiento();
                reloj();
            }, 2000)
        }, 2000);
    }
}

var intervalos = [];
var posicionInicial = 0;
let preguntaActual = 0;
function preguntar() {
    let pregunta = frases[preguntaActual];
    document.getElementById("pregunta").innerText = "";
    document.getElementById("pregunta").innerText = pregunta.pregunta;
    document.getElementById("imagen").setAttribute("src", "");

    for (let index = 0; index < 4; index++) {
        const elemento = document.getElementById("imagen"+index);
        elemento.setAttribute("src", "");
    }

    if(pregunta.tipo == 1){
        let opciones = randomValueGenerator(pregunta.opciones);
        for (let index = 0; index < 4; index++) {
            const element = opciones[index];
            const elemento = document.getElementById("pregunta"+index);
            elemento.innerText = element.opcion;
            elemento.parentElement.setAttribute("data-id", element.es_correcta);
        }
    }else{
        let opciones = randomValueGenerator(pregunta.opciones);
        document.getElementById("imagen").setAttribute("src", pregunta.imagen);
        for (let index = 0; index < 4; index++) {
            const element = opciones[index];
            const elemento = document.getElementById("imagen"+index);
            elemento.setAttribute("src", element.opcion);
            elemento.parentElement.setAttribute("data-id", element.es_correcta);
        }
    }
    

    var divs = $(".miDiv");
    pos_mayor = 0;
    for (var i = 0; i < divs.length; i++) {
        var div = divs[i];
        if (posicionInicial == 0) {
            posicionInicial = Math.floor(Math.random() * (window.screen.width - 1400)) + 1400;
        } else {
            posicionInicial += 500;
        }

        var posicionInicial2 = Math.floor(Math.random() * ((window.screen.height - 250) - 20)) + 20;
        $(div).css("transition", "");
        $(div).css("left", posicionInicial + "px");
        $(div).css("top", posicionInicial2 + "px");
        var intervalo = setInterval(moverDiv, 70, div);
        intervalos.push(intervalo);

        if (posicionInicial > pos_mayor) {
            pos_mayor = posicionInicial;
            ultimoDiv = div;
        }
    }

}

function moverDiv(div) {
    posicion = div.offsetLeft;
    posicion -= 10;
    $(div).css("transition", "left .08s linear");
    $(div).css("left", posicion + "px");
    if (ultimoDiv.offsetLeft <= -330) {
        clearInterval(intervalos.shift());
        intervalos = [];
        posicionInicial = 0;
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
}, 1470);

let estrelladas = 0;
var correctas = 0;
function verificarEstrellada() {
    var nubes = document.getElementsByClassName("miDiv");
    for (let index = 0; index < nubes.length; index++) {
        const element2 = nubes[index];
        const element = element2.firstElementChild;
        var rect1 = element.getBoundingClientRect();
        var rect2 = objeto.getBoundingClientRect();
        if (rect1.bottom > rect2.top && rect1.top < rect2.bottom && rect1.right > rect2.left && rect1.left < rect2.right) {
            preguntaActual++;
            if (element.getAttribute("data-id") == "true") {
                clearInterval(intervalos.shift());
                element2.style.backgroundImage = "url(check.png)";
                setTimeout(() => {
                    intervalos = [];
                    posicionInicial = 0;
                    correctas++;
                    element2.style.backgroundImage = "url(nube.png)"
                    preguntar();
                }, 1400)
            } else {
                estrelladas++;
                if (estrelladas == 2) {
                    clearInterval(intervalo_estrelladas);
                    document.body.style.animation = "shake 1s linear infinite forwards";
                    objeto.style.backgroundImage = "url(avion3.png)";
                    element2.style.backgroundImage = "url(error.png)";
                    setTimeout(() => {
                        document.body.style.animation = "mover 15s linear infinite forwards";
                        element2.style.backgroundImage = "url(nube.png)"
                        clearInterval(intervalos.shift());
                        intervalos = [];
                        posicionInicial = 0;
                        finalJuego();
                    }, 2500)
                }else{
                    element2.style.backgroundImage = "url(error.png)";
                    document.body.style.animation = "shake 1s linear infinite forwards";
                    setTimeout(() => {
                        document.body.style.animation = "mover 15s linear infinite forwards";
                        element2.style.backgroundImage = "url(nube.png)"
                        objeto.style.backgroundImage = "url(avion2.gif)";
                        clearInterval(intervalos.shift());
                        intervalos = [];
                        posicionInicial = 0;
                        preguntar();
                    }, 1400)
                }
            }
        }
    }
}

function finalJuego() {
    $('#principal').fadeToggle(500);
    setTimeout(() => {
        $('#final').fadeToggle(1000);
    }, 500);

    if (correctas < 3) {
        document.getElementById("final").style.backgroundImage = "url(../../images/derrota.gif)";
    } else {
        document.getElementById("final").style.backgroundImage = "url(../../images/victoria.gif)";
    }

    document.getElementById("texto_final").innerText = "Has contestado correctamente " + correctas + " pregunta(s)";

    if (correctas >= 3) {
        var audio = new Audio('../../sounds/victory.mp3');
        audio.play();
    } else {
        var audio = new Audio('../../sounds/game_over.mp3');
        audio.play();
    }
}

function reloj(){
    var timeleft = 300;
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
