let preguntas = [];

$(document).ready(function () {
    base_preguntas = readText("data.json");
    preguntas = JSON.parse(base_preguntas);
    preguntas = randomValueGenerator(preguntas);
    pintar_estrellas();
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
                    maquina2("bienvenida", 'Hola, soy Genio. <br> En este juego deberás lanzar el balón al aro que creas que tenga la respuesta correcta, anota más de 6 puntos para ganar el juego. <br> ¡Tú Puedes!', 50, 1);
                }, 3000)
            }, 2000)
        })
    }, 200)
});

function pintar_estrellas() {
    var anchoPantalla = window.innerWidth;
    var altoPantalla = window.innerHeight / 4;

    let div = "";
    for (let index = 0; index < 20; index++) {
        var x = Math.floor((Math.random() * (anchoPantalla - 0 + 1)) + 0);
        var y = Math.floor((Math.random() * (altoPantalla - 0 + 1)) + 0);
        var animmacion = (Math.random() * (2.5 - 1 + 1) + 1);
        var tamanio = (Math.random() * (120 - 90 + 1) + 90);

        div += "<img src='estrella.png' style='height: " + tamanio + "px; top: " + y + "px; left: " + x + "px; animation: resplandor " + animmacion + "s infinite forwards;' class='estrella' alt=''>";
    }

    document.getElementById("contenedor").innerHTML += div;
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
                pintar_pregunta();
            }, 2000)
        }, 2000); 
    }
    
}

function randomValueGenerator(vector) {
    return vector.sort(function () { return Math.random() - 0.5 });
}

function pintar_pregunta() {
    if (pregunta_actual < 10) {
        let pregunta = preguntas[pregunta_actual];
        document.getElementById("pregunta").innerText = pregunta.pregunta;
        var opciones = pregunta.opciones;
        for (let index = 0; index < opciones.length; index++) {
            const element = opciones[index];
            document.getElementById(element[0]).setAttribute("data-id", element[1]);
        }
    } else {
        $('#principal').fadeToggle(500);
        setTimeout(() => {
            $('#final').fadeToggle(1000);
        }, 500)
        if (correctas < 6) {
            document.getElementById("final").style.backgroundImage = "url(../../images/derrota.gif)";
        } else {
            document.getElementById("final").style.backgroundImage = "url(../../images/victoria.gif)";
        }

        document.getElementById("texto_final").innerText = "Has contestado correctamente " + correctas + " pregunta(s) de 10";

        if (correctas > 6) {
            var audio = new Audio('../../sounds/victory.mp3');
            audio.play();
        } else {
            var audio = new Audio('../../sounds/game_over.mp3');
            audio.play();
        }
    }
}

let correctas = 0;
let pregunta_actual = 0;

function dispararDerecha() {
    var div_derecha = document.getElementById("divDerecho");
    var div_izquierda = document.getElementById("divIzquierdo");

    div_derecha.setAttribute("onclick", "");
    div_izquierda.setAttribute("onclick", "");

    var derecha = document.getElementById("divDerecho").getBoundingClientRect();

    var pelota = document.getElementById("disparo");
    pelota.style.left = derecha.left + 65 + "px";
    setTimeout(() => {
        pelota.style.animationName = "alejar";
        pelota.style.top = (derecha.top - 35) + "px";
        pelota.style.transform = "rotate(360deg)";
        setTimeout(() => {
            pelota.style.transform = "rotate(0deg)";
            pelota.style.transition = "transform .7s linear, top .7s ease-in";
            pelota.style.transform = "rotate(360deg)";
            pelota.style.top = (derecha.top + 15) + "px";
            setTimeout(() => {
                pelota.style.display = "none";
                div_derecha.style.backgroundImage = "url(aro2.gif), url(soporte.png)";
                setTimeout(() => {
                    verificar(div_derecha.firstElementChild.getAttribute("data-id"));
                }, 2000)
                setTimeout(() => {
                    div_derecha.style.backgroundImage = "url(aro.gif), url(soporte.png)";
                    setTimeout(() => {
                        volverPelota();
                    }, 1000)
                }, 5200)
            }, 700)
        }, 2000)
    }, 2300)
}

function dispararIzquierda() {
    var div_izquierda = document.getElementById("divIzquierdo");
    var div_derecha = document.getElementById("divDerecho");

    div_derecha.setAttribute("onclick", "");
    div_izquierda.setAttribute("onclick", "");

    var izquierda = document.getElementById("divIzquierdo").getBoundingClientRect();
    var pelota = document.getElementById("disparo");

    var pelota = document.getElementById("disparo");
    pelota.style.left = izquierda.left + 65 + "px";
    setTimeout(() => {
        pelota.style.animationName = "alejar";
        pelota.style.top = (izquierda.top - 35) + "px";
        pelota.style.transform = "rotate(360deg)";
        setTimeout(() => {
            pelota.style.transform = "rotate(0deg)";
            pelota.style.transition = "transform .7s linear, top .7s ease-in";
            pelota.style.transform = "rotate(360deg)";
            pelota.style.top = (izquierda.top + 15) + "px";
            setTimeout(() => {
                pelota.style.display = "none";
                div_izquierda.style.backgroundImage = "url(aro2.gif), url(soporte.png)";
                setTimeout(() => {
                    verificar(div_izquierda.firstElementChild.getAttribute("data-id"));
                }, 2000)
                setTimeout(() => {
                    div_izquierda.style.backgroundImage = "url(aro.gif), url(soporte.png)";
                    setTimeout(() => {
                        volverPelota();
                    }, 1000)
                }, 5200)
            }, 700)
        }, 2000)
    }, 2300)
}

function volverPelota() {
    var pelota = document.getElementById("disparo");

    pelota.style.left = "47%";
    pelota.style.top = "82%";
    pelota.style.display = "block";
    pelota.style.animationName = "";
    pelota.style.width = "70px";
    pelota.style.height = "70px";
    pelota.style.transform = "rotate(0deg)";
    pelota.style.transition = "transform 2s linear, top 2s ease-out, left 2s ease-out";
}

function verificar(tipo) {
    var div_izquierda = document.getElementById("divIzquierdo");
    var div_derecha = document.getElementById("divDerecho");
    pregunta_actual++;
    var pajaro = document.getElementById("pajaro");
    if (tipo == "true") {
        pajaro.setAttribute("src", "../../images/correcto.gif");
        correctas++;
        document.getElementById("marker").innerText = correctas;
    } else {
        pajaro.setAttribute("src", "../../images/incorrecto.gif");
    }

    setTimeout(() => {
        pajaro.setAttribute("src", "../../images/pensando.gif");
        div_derecha.setAttribute("onclick", "dispararDerecha()");
        div_izquierda.setAttribute("onclick", "dispararIzquierda()");
        pintar_pregunta();
    }, 3500)
}