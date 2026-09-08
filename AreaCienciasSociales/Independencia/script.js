// Obtener el ancho y alto de la pantalla
var screenWidth = screen.width - 200;
var screenHeight =  screen.height - 400;
let nIntervId;

// Función para generar coordenadas aleatorias dentro de la pantalla
function randomCoordinates() {
    var x = Math.floor(Math.random() * (screenWidth - 70 + 1) + 70);
    var y = Math.floor(Math.random() * (screenHeight - 10 + 1) + 10);
    return { x: x, y: y };
}

var pregunta_actual = 0;
function llenarArray() {
    if (pregunta_actual < 5) {
        let elemento = preguntas[pregunta_actual];
        document.getElementById("tipo").innerText = elemento.pregunta;
        document.getElementById("principal2").innerHTML = "";
        let div = "";
        
        for (let index = 0; index < elemento.opciones.length; index++) {
            let element = elemento.opciones[index];
            div +=
                "<div id='elemento"+index+"' onclick='nuevodivAzar(this)' style='background-image: url(globo.png); background-size: contain;' class='elemento' data-id='" +
                element.es_correcta +
                "'>" +
                "<div style='justify-content: center; height: 50pt; text-align: center; display: flex;align-items: center;width: 50%;'><h2>" + element.opcion + "</h2></div>" +
                "</div>";
        }

        document.getElementById("principal2").innerHTML = div;
        pregunta_actual++;
        moveImages();
        setTimeout(() => {
           moveImages();
        }, 1000)
        setTimeout(() => {
            nIntervId = setInterval(moveImages, 6000);
        }, 1000)
    } else {
        $('#principal').fadeToggle(500);
        setTimeout(() => {
            $('#final').fadeToggle(1000);
        }, 500)
        if (correctas < 3) {
            document.getElementById("final").style.backgroundImage = "url(../../images/derrota.gif)";
        } else {
            document.getElementById("final").style.backgroundImage = "url(../../images/victoria.gif)";
        }

        document.getElementById("texto_final").innerText = "Has contestado correctamente " + correctas + " pregunta(s) de 5.";

        if (correctas >= 3) {
            var audio = new Audio('../../sounds/victory.mp3');
            audio.play();
        } else {
            var audio = new Audio('../../sounds/game_over.mp3');
            audio.play();
        }
    }
}

let div_sel = "";
function moveImages() {
    let images = document.getElementsByClassName("elemento");

    for (let index = 0; index < images.length; index++) {
        const imgElem = images[index];
        if(div_sel != imgElem.getAttribute("id")){
            var newCoords = randomCoordinates();
            imgElem.style.left = newCoords.x + "px";
            imgElem.style.top = newCoords.y + "px"; 
        } 
    }
}

var preguntas = [];

$(document).ready(function () {
    let base_preguntas = readText("preguntas.json");
    preguntas = JSON.parse(base_preguntas);
    preguntas = randomValueGenerator(preguntas);

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
                    maquina2("bienvenida", 'Hola, soy Genio. <br> Selecciona una de las siguientes categorias para jugar, y luego selecciona los multiplos o divisores del numero indicado. <br> ¡Tú Puedes!', 50, 1);
                }, 3000)
            }, 2000)
        })
    }, 200)
});

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
                llenarArray();
            }, 2000)
        }, 2000);
    }
}



let errores = 0;
let correctas = 0;
function nuevodivAzar(element) {

    var globos = document.getElementsByClassName("elemento");
    for (let index = 0; index < globos.length; index++) {
        const element = globos[index];
        element.setAttribute("onclick", "");
    }

    let respuesta = element.getAttribute("data-id");
    div_sel = element.getAttribute("id");
    if (respuesta == "true") {
        element.style.top = "-400px";
        correctas++;
    } else {
        errores++;
        element.style.backgroundImage = 'url("globo2.png")';
        element.style.top = "1500px";
    }

    element.setAttribute("onclick", "")
    element.classList.remove("correcta");

    setTimeout(() => {
        div_sel = "";
        clearInterval(nIntervId);
        nIntervId = null;
        llenarArray();
    }, 6000)
}