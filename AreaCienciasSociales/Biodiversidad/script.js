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

let preguntaActual = 0;
var habitatActual = 0;
var correctas = 0;
var habitats = [["Arrecife", "arrecife"], ["Bosque", "bosque"], ["Desierto", "desierto"], ["Páramo", "paramo"], ["Sabana", "sabana"], ["Manglar", "manglar"], ["Costa", "costa"], ["Lago", "lago"], ["Aereo", "aereo"]];
var preguntas = [];
function preguntar() {
    habitats = randomValueGenerator(habitats);
    for (var i = 0; i < 4; i++) {
        generarPunto("habitat" + i);
        document.getElementById("habitat" + i).style.backgroundImage = "url(img/lugares/" + habitats[i][1] + ".png)";
        var preguntas_array = frases.filter(function (objeto) { return objeto.tipo === habitats[i][0] });
        preguntas_array = randomValueGenerator(preguntas_array);
        for (let index2 = 0; index2 < 4; index2++) {
            preguntas.push(preguntas_array[index2]);
        }
    }

    setTimeout(() => {
        pintar_pregunta();
    }, 2000)
}

var colores = ["#eb1b31", "#6abb45", "#0173ba", "#ffd703", "#eb1b31", "#6abb45", "#0173ba", "#ffd703"];
var colores2 = [{ op1: '#662482', op2: '#39134a' }, { op1: '#4494d0', op2: '#3372a1' }, { op1: '#f08218', op2: '#c86b12' }, { op1: '#e83967', op2: '#be3156' }];

function pintar_pregunta() {
    if (preguntaActual < 15) {
        $('#myModal').modal('show');
        var pregunta = preguntas[preguntaActual];
        var enunciado = pregunta.pregunta;
        var opciones = pregunta.opciones;
        var personaje = document.getElementById("miObjeto");

        if(pregunta.imagen == "nadando"){
            personaje.style.width = "70px"; 
        }else{
           personaje.style.width = "55px"; 
        }

        personaje.style.backgroundImage = "url(img/personaje/"+pregunta.imagen + ".gif)";

        opciones = randomValueGenerator(opciones);
        colores = randomValueGenerator(colores);

        document.getElementById("enunciado").innerText = enunciado;

        let div = "";
        for (let index = 0; index < opciones.length; index++) {
            var element = opciones[index];
            element = Object.values(element);
            div += "<div class='col-6 respuesta'><div onclick='respuesta(\"" + element[1] + "\", this)' class='res' style='background-color: " + colores2[index].op1 + "; color: white; border: 6px solid " + colores2[index].op2 + "'><h4>" + element[0] + "</h4></div></div>";
        }

        document.getElementById("respuestas").innerHTML = "";
        document.getElementById("respuestas").innerHTML = div;
    } else {
        finalJuego();
    }
}

function respuesta(respuesta, elemento) {
    if (respuesta == "true") {
        elemento.classList.add("correcto");
        var audio = new Audio('../../sounds/ok.mp3');
        audio.play();
        correctas++;
        setTimeout(() => {
            $('#myModal').modal('hide');
            preguntaActual++;
            setTimeout(() => {
                var pregunta = preguntas[preguntaActual];
                var miDiv = $("#punto" + (preguntaActual));
                var offset = miDiv.offset();
                var coordenadaX = offset.left;
                var coordenadaY = offset.top;

                var miDiv2 = $("#miObjeto");
                var offset2 = miDiv2.offset();
                var coordenadaX2 = offset2.left;

                var personaje = document.getElementById("miObjeto");
                if(coordenadaX <= coordenadaX2){
                    personaje.style.transform = "scaleX(-1)";
                }else{
                    personaje.style.transform = "scaleX(1)";
                }

                crear_linea();
                
                personaje.style.backgroundImage = "url(img/personaje/"+pregunta.imagen + ".gif)";
                personaje.style.left = (coordenadaX - 30) + "px";
                personaje.style.top = (coordenadaY - 30) + "px";
                setTimeout(() => {
                    personaje.style.backgroundImage = "url(img/personaje/"+pregunta.imagen + ".png)";
                    pintar_pregunta();
                    resetProgressBar();
                }, 6000)
            }, 500)
        }, 2000)
    } else {
        elemento.classList.add("incorrecto");
        var audio = new Audio('../../sounds/over.mp3');
        audio.play();
        setTimeout(() => {
            $('#myModal').modal('hide');
            setTimeout(() => {
                pintar_pregunta();
                resetProgressBar();
            }, 6000)
        }, 2000)
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

    document.getElementById("texto_final").innerText = "Felicitaciones, has contestado llegado al final del recorrido, espero hayas aprendido cosas nuevas.";

    if ((correctas / (preguntaActual + 1) * 100) < 60) {
        var audio = new Audio('../../sounds/victory.mp3');
        audio.play();
    } else {
        var audio = new Audio('../../sounds/game_over.mp3');
        audio.play();
    }
}

var numeroPunto = 0;
var xAnterior = 0;
var yAnterior = 0;
function generarPunto(id) {
    var objeto = document.getElementById('miObjeto');
    var container = document.getElementById(id);
    for (let index = 0; index < 4; index++) {
        var rect = container.getBoundingClientRect();

        var posicionInicialx = rect.left;
        var posicionFinalx = rect.left + rect.width;
        var x = Math.floor((Math.random() * (posicionFinalx - posicionInicialx + 1)) + posicionInicialx);

        var posicionInicialy = rect.top;
        var posicionFinaly = rect.top + rect.height;
        var y = Math.floor((Math.random() * (posicionFinaly - posicionInicialy + 1)) + posicionInicialy);

        if (x >= (xAnterior + 100) && y >= (yAnterior + 100)) {
            var punto = document.createElement("div");
            punto.classList.add("point");
            punto.style.left = x + "px";
            punto.style.top = y + "px";
            punto.setAttribute("id", "punto" + numeroPunto)
            container.appendChild(punto);

            if (numeroPunto == 0) {
                objeto.style.left = (x - 20) + "px";
                objeto.style.top = (y - 20) + "px";
            }

           

            numeroPunto++;
        } else {
            index--;
        }
    }
}

var progressBar = document.getElementById("progress-bar");
var duration = 90;
var remainingSeconds = duration;
var intervalId;


function resetProgressBar() {
    clearInterval(intervalId);
    var currentSeconds = remainingSeconds;
    var newSeconds = currentSeconds + 15;
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



function crear_linea() {
    var point1 = document.getElementById("punto"+(preguntaActual-1));
    var point2 = document.getElementById("punto"+preguntaActual);

    var line = document.createElement("div");
    line.classList.add("line");
    line.setAttribute("id", "line_" + point1.getAttribute('data-id'))

    // Find the points based off the elements left and top
    var p1 = { x: point1.offsetLeft, y: point1.offsetTop };
    var p2 = { x: point2.offsetLeft, y: point2.offsetTop };

    // Get distance between the points for length of line
    var a = p1.x - p2.x;
    var b = p1.y - p2.y;
    var length = Math.sqrt(a * a + b * b);

    // Get angle between points
    var angleDeg = Math.atan2(p2.y - p1.y, p2.x - p1.x) * 180 / Math.PI;

    // Get distance from edge of point to center
    var pointWidth = point1.clientWidth / 2 + 20;
    var pointHeight = point1.clientHeight / 2 + 20;

    // Set line distance and position
    // Add width/height from above so the line starts in the middle instead of the top-left corner
    document.getElementById("contenedor").appendChild(line);
    line.style.left = (p1.x + pointWidth) - 19 + 'px';
    line.style.top = (p1.y + pointHeight) - 43 + 'px';
    line.style.transition = " width 5s ease-in";
    line.style.width = "0px";

    setTimeout(()=>{
        line.style.width = length + 'px';
    }, 100)
    
   

    // Rotate line to match angle between points
    line.style.transform = "rotate(" + angleDeg + "deg)";

   
}