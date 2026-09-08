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
                    maquina2("bienvenida", 'Hola, soy Genio. <br> A continuación se te mostraran 10 oraciones, identifica la respuesta correcta y dispara hacia ella para salvar la nave amiga, ayudala a llegar hasta el destino. <br> ¡Tú Puedes!', 50, 1);
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
var posicionInicial = 300;
let preguntaActual = 0;

function preguntar() {
    if (preguntaActual < 10) {
        console.log("pregunta: " + (preguntaActual + 1));
        let pregunta = frases[preguntaActual];
        document.getElementById("pregunta").innerText = "";
        document.getElementById("pregunta").innerText = pregunta.oracion;


        var miDivs = document.getElementsByClassName("miDiv");
        var elementosArray = Array.from(miDivs);
        elementosArray.forEach(function (elemento) {
            elemento.remove();
        });

        setTimeout(() => {
            var naves = randomValueGenerator(["1.png", "2.png", "3.png", "4.png", "5.png"]);
            let opciones = randomValueGenerator(pregunta.opciones);
            var divContenedor = document.getElementById("principal");
            for (let index = 0; index < opciones.length; index++) {
                const element = opciones[index];

                var nuevoDiv = document.createElement("div");
                nuevoDiv.className = "miDiv";
                nuevoDiv.style.backgroundImage = "url(" + naves[index] + ")";
                var divInterno = document.createElement("div");
                divInterno.className = "collapse";
                divInterno.setAttribute("data-id", element[1]);

                var parrafo = document.createElement("p");
                parrafo.className = "borde2";
                parrafo.id = "pregunta" + index;
                var texto = document.createTextNode(element[0]);
                parrafo.appendChild(texto);

                divInterno.appendChild(parrafo);
                nuevoDiv.appendChild(divInterno);

                divContenedor.appendChild(nuevoDiv);
            }
        }, 100)

        setTimeout(() => {
            var divs = $(".miDiv");
            pos_mayor = 0;
            posicionInicial = 300;
            for (var i = 0; i < divs.length; i++) {
                var div = divs[i];

                $(div).css("transition", "");
                $(div).css("left", posicionInicial + "px");
                $(div).css("transition", "top 1.5s linear");

                var intervalo = setInterval(moverDiv, 1500, div);
                intervalos.push(intervalo);

                if (posicionInicial > pos_mayor) {
                    pos_mayor = posicionInicial;
                    ultimoDiv = div;
                }

                posicionInicial += 250;
            }
        }, 400)
    } else {
        clearInterval(intervalId);
        clearInterval(intervalo_estrelladas);
        finalJuego();
    }
}

function moverDiv(div) {
    posicion = div.offsetTop;
    posicion += 30;
    $(div).css("top", posicion + "px");
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

var intervalo_estrelladas = setInterval(() => {
    verificarEstrellada();
}, 200);

var correctas = 0;
function verificarEstrellada() {
    let bandera = false;
    var nubes = document.getElementsByClassName("miDiv");
    var balas = document.getElementsByClassName("bala");
    for (let index = 0; index < nubes.length; index++) {
        const element = nubes[index].firstElementChild;
        var rect1 = element.getBoundingClientRect();
        for (let index2 = 0; index2 < balas.length; index2++) {
            var rect2 = balas[index2].getBoundingClientRect();
            if (rect1.bottom > rect2.top && rect1.top < rect2.bottom && rect1.right > rect2.left && rect1.left < rect2.right) {
                if (element.getAttribute("data-id") == "true") {
                    resetProgressBar();
                    explotarNaves(); 
                    correctas++;
                } else {
                    document.body.style.animation = "shake 1s linear infinite forwards";

                    intervalos.forEach(element => {
                        clearInterval(element);
                    });

                    var divs = $(".miDiv");
                    for (var i = 0; i < divs.length; i++) {
                        var div = divs[i];
                        $(div).css("transition", "top .2s linear");
                        var intervalo = setInterval(moverDiv, 200, div);
                        intervalos.push(intervalo);
                    }
                    setTimeout(() => {
                        document.body.style.animation = "mover 9s linear infinite forwards";
                    }, 800)
                }
            }
        }

        var rect3 = objeto.getBoundingClientRect();
        if (rect1.bottom > rect3.top && rect1.top < rect3.bottom && rect1.right > rect3.left && rect1.left < rect3.right && element.getAttribute("data-id") != "explotado") {
            document.body.style.animation = "shake 1s linear infinite forwards";
            bandera = true;
        }
    }

    if (bandera) {
        clearInterval(intervalo_estrelladas);
        explotarNaves();
        setTimeout(() => {
            document.body.style.animation = "mover 4s linear infinite forwards";
            intervalo_estrelladas = setInterval(() => {
                verificarEstrellada();
            }, 200);
        }, 800)
    }

}

function explotarNaves() {
    var naves = document.getElementsByClassName("miDiv");
    for (let index = 0; index < naves.length; index++) {
        const element = naves[index];
        element.style.backgroundImage = "url(explosion.gif)";
        element.firstElementChild.firstElementChild.innerText = "";
    }

    eliminarBalas();

    setTimeout(() => {
        clearInterval(intervalId);
        var currentSeconds = remainingSeconds;
        var newSeconds = currentSeconds - 4;
        if (newSeconds > duration) {
            newSeconds = duration;
        }
        remainingSeconds = newSeconds;
        reloj();
        preguntaActual++;
        preguntar();
    }, 1000)
}

function finalJuego() {
    $('#principal').fadeToggle(500);
    setTimeout(() => {
        $('#final').fadeToggle(1000);
    }, 500);

    if ((correctas / (preguntaActual + 1) * 100) < 60) {
        document.getElementById("final").style.backgroundImage = "url(../../images/derrota.gif)";
    } else {
        document.getElementById("final").style.backgroundImage = "url(../../images/victoria.gif)";
    }

    document.getElementById("texto_final").innerText = "Has contestado correctamente el " + ((correctas / (preguntaActual) * 100)).toFixed(2) + "% de las pregunta(s)";

    if ((correctas / (preguntaActual + 1) * 100) < 60) {
        var audio = new Audio('../../sounds/victory.mp3');
        audio.play();
    } else {
        var audio = new Audio('../../sounds/game_over.mp3');
        audio.play();
    }
}

var progressBar = document.getElementById("progress-bar");
var duration = 120;
var remainingSeconds = duration;
var intervalId;


function resetProgressBar() {
    clearInterval(intervalId);
    var currentSeconds = remainingSeconds;
    var newSeconds = currentSeconds + 25;
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

        if (width <= 70) {
            progressBar.style.backgroundColor = "yellow";
        }

        if (width <= 40) {
            progressBar.style.backgroundColor = "red";
        }

        if (width <= 0) {
            clearInterval(intervalId);
            clearInterval(intervalos.shift());
            intervalos = [];
            preguntaActual++;
            finalJuego();
        }
    }, 1000);
}

var objeto2 = document.getElementById('miObjeto');
var currentPosition = objeto2.getBoundingClientRect().left;

function izquierda() {
    currentPosition -= 40;
    if (currentPosition >= 350) {
        objeto2.style.left = currentPosition + "px";
        abajo = false;
    } else {
        currentPosition += 40;
    }
}

function derecha() {
    currentPosition += 40;
    if (currentPosition <= 890) {
        objeto2.style.left = currentPosition + "px";
        abajo = true;
    } else {
        currentPosition -= 40;
    }
}

document.addEventListener("keydown", function (event) {
    if (event.code === "ArrowLeft") {
        currentPosition -= 40;
        if (currentPosition >= 410) {
            objeto2.style.left = currentPosition + "px";
            abajo = false;
        } else {
            currentPosition += 40;
        }
        event.preventDefault();
    }

    if (event.code === "ArrowRight") {
        currentPosition += 40;
        if (currentPosition <= 890) {
            objeto2.style.left = currentPosition + "px";
            abajo = true;
        } else {
            currentPosition -= 40;
        }
        event.preventDefault();
    }

    if (event.code === "Space") {
        disparar();
    }
});

function disparar() {

    var espacio = document.getElementById("principal");
    var div = document.createElement("div");
    div.classList.add("bala");
    var currentPositionB = objeto2.getBoundingClientRect().top;
    var currentPositionL = objeto2.getBoundingClientRect().left;
    div.style.top = (currentPositionB + 30) + "px";
    div.style.left = (currentPositionL + 25) + "px";

    espacio.appendChild(div);
    setTimeout(() => {
        div.style.top = "-200px";
    }, 10);
}

function eliminarBalas() {
    var balas = document.getElementsByClassName("bala");
    var elementosArray = Array.from(balas);
    elementosArray.forEach(function (elemento) {
        elemento.remove();
    });
}