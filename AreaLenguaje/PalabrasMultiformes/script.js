let frases = [];

var objeto = document.getElementById('miObjeto');
var angulo = 0;
var currentPosition = objeto.getBoundingClientRect().top;
var intervalId;


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
    if(!cerrardo) {
        let audio2 = new Audio('../../sounds/fondo.mp3');
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
                reloj();
            }, 2000)
        }, 2000);
    }
}

var intervalos = [];
var posicionInicial = 0;
var posicionInicial2 = 0;
let preguntaActual = 0;

function preguntar() {
    if(preguntaActual < 10){
        posicionInicial = 0;
        posicionInicial2 = 0;
        let pregunta = frases[preguntaActual];
        document.getElementById("pregunta").innerText = "";
        document.getElementById("pregunta").innerText = pregunta.oracion;


        var miDivs = document.getElementsByClassName("miDiv");
        var elementosArray = Array.from(miDivs);
        elementosArray.forEach(function (elemento) {
            elemento.remove();
        });

        setTimeout(() => {
            let opciones = randomValueGenerator(pregunta.opciones);
            var divContenedor = document.getElementById("principal");
            for (let index = 0; index < opciones.length; index++) {
                const element = opciones[index];

                var nuevoDiv = document.createElement("div");
                nuevoDiv.className = "miDiv";
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


            for (var i = 0; i < divs.length; i++) {
                var div = divs[i];
                div.style.backgroundImage = "url(nube" + i + ".png)";

                if (posicionInicial == 0) {
                    posicionInicial = Math.floor(Math.random() * ( window.screen.width - 1400 + 1)) + 1400;
                } else {
                    posicionInicial += Math.floor((Math.random() * (400 - 200 + 1)) + 200);
                }

                if (divs.length == 2) {
                    if (posicionInicial2 == 0) {
                        posicionInicial2 = 160;
                    } else {
                        posicionInicial2 += Math.floor((Math.random() * (250 - 190 + 1)) + 190);
                    }
                } else {
                    if (posicionInicial2 == 0) {
                        posicionInicial2 = 120;
                    } else {
                        posicionInicial2 += Math.floor((Math.random() * (180 - 140 + 1)) + 140);
                    }
                }


                $(div).css("transition", "");
                $(div).css("left", posicionInicial + "px");
                $(div).css("top", posicionInicial2 + "px");

                var intervalo = setInterval(moverDiv, 1500, div);
                intervalos.push(intervalo);

                if (posicionInicial > pos_mayor) {
                    pos_mayor = posicionInicial;
                    ultimoDiv = div;
                }
            }
        }, 400)
    }else{
        var objeto_nave = document.getElementById('miObjeto');
        var miDivs = document.getElementsByClassName("miDiv");
        var elementosArray = Array.from(miDivs);
        elementosArray.forEach(function (elemento) {
            elemento.remove();
        });

        var divContenedor = document.getElementById("principal");
           
        var nuevoDiv = document.createElement("div");
        nuevoDiv.className = "miDiv2";
        divContenedor.appendChild(nuevoDiv);
        setTimeout(()=>{
            nuevoDiv.style.transition = "left 3s linear";
            nuevoDiv.style.left = "1020px";
            setTimeout(()=>{
                objeto_nave.style.left = (nuevoDiv.offsetLeft + 90)+"px";
                objeto_nave.style.top = (nuevoDiv.offsetTop+170)+"px";
                setTimeout(()=>{
                    clearInterval(intervalId);
                    clearInterval(intervalo_estrelladas);
                    finalJuego();
                }, 4000)
            }, 3000)
        }, 200)
    }
}

function moverDiv(div) {
    posicion = div.offsetLeft;
    posicion -= 170;
    $(div).css("transition", "");
    $(div).css("transition", "left 1.5s linear");
    $(div).css("left", posicion + "px");
    if (ultimoDiv.offsetLeft <= -330) {
        clearInterval(intervalos.shift());
        intervalos = [];
        posicionInicial = 0;
        var nubes = document.getElementsByClassName("miDiv");
        for (let index = 0; index < nubes.length; index++) {
            const element2 = nubes[index];
            element2.style.backgroundImage = "url(nube" + index + ".png)";
        }
        eliminarBalas();
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

var intervalo_estrelladas = setInterval(() => {
    verificarEstrellada();
}, 200);

var correctas = 0;
function verificarEstrellada() {
    var nubes = document.getElementsByClassName("miDiv");
    var balas = document.getElementsByClassName("bala");
    let bandera = false;
    for (let index = 0; index < nubes.length; index++) {
        const element = nubes[index].firstElementChild;
        var rect1 = element.getBoundingClientRect();
        for (let index2 = 0; index2 < balas.length; index2++) {
            var rect2 = balas[index2].getBoundingClientRect();
            if (rect1.bottom > rect2.top && rect1.top < rect2.bottom && rect1.right > rect2.left && rect1.left < rect2.right) {
                preguntaActual++;
                if (element.getAttribute("data-id") == "true") {
                    resetProgressBar();
                    explotarNave(nubes[index]);
                    correctas++;
                    element.setAttribute("data-id", "explotado")
                } else {
                    explotarNaves();
                    document.body.style.animation = "shake 1s linear infinite forwards";
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
        clearInterval(intervalId);
        clearInterval(intervalo_estrelladas);
        objeto.style.backgroundImage = "url(arma_mal.gif)"
        setTimeout(() => {
            document.body.style.animation = "mover 9s linear infinite forwards";
            preguntaActual++;
            finalJuego();
        }, 1800)
    }

}

function explotarNave(naveExplotar) {
    naveExplotar.style.backgroundImage = "url(explosion.gif)";
    naveExplotar.firstElementChild.firstElementChild.innerText = "";
    eliminarBalas();
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
        var newSeconds = currentSeconds - 15;
        if (newSeconds > duration) {
            newSeconds = duration;
        }
        remainingSeconds = newSeconds;
        reloj();
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
var currentPosition = objeto2.getBoundingClientRect().top;

function subir() {
    currentPosition -= 50;
    if(currentPosition >= 0){
        objeto2.style.top = currentPosition + "px";
        abajo = false;
    }else{
        currentPosition += 50;
    }
}

function bajar() {
    currentPosition += 50;
    if(currentPosition <= 523){
        objeto2.style.top = currentPosition + "px";
        abajo = true;
    }else{
        currentPosition -= 50;
    }  
}

document.addEventListener("keydown", function (event) {
    if (event.code === "ArrowUp") {
        currentPosition -= 50;
        if(currentPosition >= 0){
            objeto2.style.top = currentPosition + "px";
            abajo = false;
        }else{
            currentPosition += 50;
        }   
        event.preventDefault();
    }

    if (event.code === "ArrowDown") {
        currentPosition += 50;
        if(currentPosition <= 523){
            objeto2.style.top = currentPosition + "px";
            abajo = true;
        }else{
            currentPosition -= 50;
        }  
        event.preventDefault();
    }

    if (event.code === "Space") {
        disparar();
    }
});

function disparar() {
    var naves = document.getElementsByClassName("miDiv");
    var bandera = false;

    for (let index = 0; index < naves.length; index++) {
        const element = naves[index];
        if(element.offsetLeft <= 1024){
            bandera = true;
        }
    }

    if(bandera){
        var espacio = document.getElementById("principal");
        var div = document.createElement("div");
        div.classList.add("bala");
        var currentPositionB = objeto2.getBoundingClientRect().top;
        div.style.top = (currentPositionB + 30) + "px";
        div.style.left = "130px";
        espacio.appendChild(div);

        setTimeout(() => {
            div.style.left = "2000px";
        }, 10);
    }
}

function eliminarBalas() {
    var balas = document.getElementsByClassName("bala");
    var elementosArray = Array.from(balas);
    elementosArray.forEach(function (elemento) {
        elemento.remove();
    });
}