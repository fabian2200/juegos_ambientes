let frases = [];
$(document).ready(function () {
    let audio = new Audio('../../sounds/fondo.mp3');
    audio.play();
    audio.volume = 0.2;
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
                    maquina2("bienvenida", 'Hola, soy Genio. <br> A continuación se te mostraran 10 oraciones de las cuales deberás releccionar, A (voz Activa) o P (voz Pasiva), según corresponda <br> ¡Tú Puedes!', 50, 1);
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
        cerrardo = true;
        let audio2 = new Audio("../../sounds/fondo.mp3");
        audio2.play();
        audio2.volume = 0.2;

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
        document.getElementById("texto").innerText = frases[pregunta_actual].oracion;
        pregunta_actual++;
    } else {
        $('#principal').fadeToggle(500);
        setTimeout(() => {
            $('#final').fadeToggle(1000);
        }, 500)
        if (correctas >= 6) {
            document.getElementById("final").style.backgroundImage = "url(../../images/victoria.gif)";
        } else {
            document.getElementById("final").style.backgroundImage = "url(../../images/derrota.gif)";
        }

        document.getElementById("texto_final").innerText = "Has respondido correctamente " + correctas + "  preguntas de 10";

        if (correctas >= 6) {
            var audio = new Audio('../../sounds/victory.mp3');
            audio.play();
        } else {
            var audio = new Audio('../../sounds/game_over.mp3');
            audio.play();
        }
    }
}

var img = $('.flecha');
document.onmousemove = function () {
    var offset = img.offset();
    var center_x = (offset.left) + (img.width() / 2);
    var center_y = (offset.top) + (img.height() / 2);
    var mouse_x = event.pageX;
    var mouse_y = event.pageY;
    var radians = Math.atan2(mouse_x - center_x, mouse_y - center_y);
    var degree = (radians * (180 / Math.PI) * -1) - 180;
    img.css('-moz-transform', 'rotate(' + degree + 'deg)');
    img.css('-webkit-transform', 'rotate(' + degree + 'deg)');
    img.css('-o-transform', 'rotate(' + degree + 'deg)');
    img.css('-ms-transform', 'rotate(' + degree + 'deg)');
}

var correctas = 0;
function romper(elemento, opcion, letra) {
    var pos = elemento.getBoundingClientRect();
    var flecha = document.getElementById("flecha");

    if(elemento.getAttribute("data-id") == "globo_1"){
        flecha.style.left = (pos.left+70) + "px";
        flecha.style.top = (pos.top+20) + "px";
    }else{
        flecha.style.left = (pos.left-20) + "px";
        flecha.style.top = (pos.top+20) + "px";
    }
   

    var h1 = elemento.firstElementChild;


    setTimeout(() => {
        flecha.style.display = "none";
    }, 810)

    setTimeout(() => {
        elemento.style.backgroundImage = "url(globo_2.png)"
        if(opcion == frases[pregunta_actual-1].tipo){
            h1.innerText = "!Correcto!"
            h1.style.color = "green";
            correctas++;
        }else{
            h1.innerText = "!Incorrecto!"
            h1.style.color = "red";
        }
    }, 900)

    setTimeout(() => {
        elemento.style.backgroundImage = "url(globo_1.png)"
        h1.innerText = letra
        h1.style.color = "white";
        preguntar();
    }, 4000)

    setTimeout(() => {
        flecha.style.display = "block";
        flecha.style.transitionProperty = "right"
        flecha.style.left = "49%"
        flecha.style.top = "79%"
        setTimeout(() => {
            flecha.style.transitionProperty = "top, left"
        }, 300)
    }, 5000)
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

