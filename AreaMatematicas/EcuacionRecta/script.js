$(document).ready(function () {
    setTimeout(() => {
        $("#principal").fadeToggle(1000);
        $("#fondo_blanco").fadeToggle(3000);
        setTimeout(() => {
            const divAnimado = document.querySelector(".overlay");
            divAnimado.style.animationName = "moverDerecha";
            divAnimado.style.animationDirection = "normal";
            divAnimado.style.display = "block";
            setTimeout(() => {
                const divAnimado2 = document.querySelector(".nube");
                divAnimado2.style.animationName = "moverArriba";
                divAnimado2.style.animationDirection = "normal";
                divAnimado2.style.display = "block";
                setTimeout(() => {
                    divAnimado.style.backgroundImage = "url(../../images/normal2.gif)";
                    maquina2(
                        "bienvenida",
                        "Hola, soy Genio. <br> A continuación se te presentaran 5 graficas, las cuales deberás hayar la ecuación de la recta utilizando los puntos que se te danhaya mas de 3 ecuaciones para ganar el juego. <br> ¡Tú Puedes!",
                        50,
                        1
                    );
                }, 3000);
            }, 2000);
        });
    }, 200);
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
                    document.querySelector("#btnomitir").style.display = "none";
                    setTimeout(() => {
                        cerrar_anuncio();
                    }, 3000);
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
        let audio2 = new Audio("../../sounds/fondo.mp3");
        audio2.play();
        audio2.volume = 0.2;
        cerrardo = true;
        const divAnimado2 = document.querySelector(".nube");
        divAnimado2.style.animationName = "moverabajo";
        const divAnimado = document.querySelector(".overlay");
        divAnimado.style.backgroundImage = "url(../../images/normal1.gif)";
        $("#fondo_blanco").fadeToggle(3000);
        setTimeout(function () {
            divAnimado.style.animationName = "moverIzquierda";
            divAnimado.style.animationDirection = "normal";
            setTimeout(() => {
                $("#principal").fadeToggle(1000);
                preguntar();
            }, 2000);
        }, 2000);
    }
}

let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

let pregunta_actual = 0;

function pintar_plano(puntos) {
    console.log(puntos);
    // Obtener el valor máximo en el eje Y de los puntos
    var maximoY = Math.max(...puntos.map(punto => punto.y));

    // Calcular el incremento de las cuadrículas en el eje Y
    var incrementoY = Math.ceil(maximoY / 10);

    // Dibujar los ejes del plano cartesiano
    ctx.beginPath();
    ctx.moveTo(canvas.width / 2, 0);
    ctx.lineTo(canvas.width / 2, canvas.height);
    ctx.moveTo(0, canvas.height / 2);
    ctx.lineTo(canvas.width, canvas.height / 2);
    ctx.stroke();

    // Dibujar los números en el eje X
    for (var i = -10; i <= 10; i++) {
        ctx.fillText(i, canvas.width / 2 + i * 24 - 3, canvas.height / 2 + 15);
    }

    // Dibujar las cuadrículas en el eje Y y los números
    ctx.strokeStyle = "#ccc";
    ctx.lineWidth = 0.5;
    for (var i = -10; i <= 10; i++) {
        // Líneas horizontales
        ctx.beginPath();
        ctx.moveTo(0, canvas.height / 2 - i * 24);
        ctx.lineTo(canvas.width, canvas.height / 2 - i * 24);
        ctx.stroke();

        // Líneas verticales
        ctx.beginPath();
        ctx.moveTo(canvas.width / 2 + i * 24, 0);
        ctx.lineTo(canvas.width / 2 + i * 24, canvas.height);
        ctx.stroke();

        // Números sobre el eje Y
        var valorY = i * incrementoY;
        ctx.fillText(valorY, canvas.width / 2 - 15, canvas.height / 2 - i * 24 + 3);
    }

    // Pintar los puntos y trazar una línea que los une
    ctx.strokeStyle = "blue";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(canvas.width / 2 + puntos[0].x * 24, canvas.height / 2 - puntos[0].y / incrementoY * 24);
    for (var i = 1; i < puntos.length; i++) {
        ctx.lineTo(canvas.width / 2 + puntos[i].x * 24, canvas.height / 2 - puntos[i].y / incrementoY * 24);
    }
    ctx.stroke();
    ctx.closePath();

    // Pintar las coordenadas de los puntos
    ctx.fillStyle = "red";
    for (var i = 0; i < puntos.length; i++) {
        var punto = puntos[i];
        ctx.fillText("(" + punto.x + "," + punto.y + ")", canvas.width / 2 + punto.x * 24 - 15, canvas.height / 2 - punto.y / incrementoY * 24 - 6);

        ctx.fillStyle = "red";
        ctx.beginPath();
        ctx.arc(canvas.width / 2 + punto.x * 24, canvas.height / 2 - punto.y / incrementoY * 24, 3, 0, 2 * Math.PI);
        ctx.fill();
    }

    pintarOpciones();
}

let clases = ["btn-success", "btn-danger", "btn-warning", "btn-primary"];

function pintarOpciones() {
    let botones = "";

    let opciones = [];

    opciones.push({
        respuesta: true,
        opcion: ecu
    });

    opciones.push({
        respuesta: false,
        opcion: (pendiente + Math.floor(Math.random() * 10) - 5) + " * X + " + (intercepto + Math.floor(Math.random() * 21) - 10)
    });

    opciones.push({
        respuesta: false,
        opcion: (pendiente) + " * X + " + (intercepto + Math.floor(Math.random() * 21) - 10)
    });

    opciones.push({
        respuesta: false,
        opcion: (pendiente + Math.floor(Math.random() * 10) - 5) + " * X + " + (intercepto)
    });

    clases = randomValueGenerator(clases);
    opciones = randomValueGenerator(opciones);
    for (let index = 0; index < opciones.length; index++) {
        const element = opciones[index];
        botones += "<button onclick='verificar(" + element.respuesta + ", this)' class='opcion btn " + clases[index] + "'>" + element.opcion + " </button>";
    }

    document.getElementById("botones").innerHTML = "";
    document.getElementById("botones").innerHTML = botones;
}

function preguntar() {
    if (pregunta_actual < 5) {
        var puntos = generarEcuacionRecta();
        pintar_plano(puntos);
        pregunta_actual++;
        document.getElementById("pregunta_numero").innerText = pregunta_actual + " de 5"
    } else {
        $("#principal").fadeToggle(500);
        setTimeout(() => {
            $("#final").fadeToggle(1000);
        }, 500);
        if (correctas >= 3) {
            document.getElementById("final").style.backgroundImage =
                "url(../../images/victoria.gif)";
        } else {
            document.getElementById("final").style.backgroundImage =
                "url(../../images/derrota.gif)";
        }

        document.getElementById("texto_final").innerText =
            "Has hayado correctamente " + correctas + " ecuaciones de 5 posibles.";

        if (correctas >= 3) {
            var audio = new Audio("../../sounds/victory.mp3");
            audio.play();
        } else {
            var audio = new Audio("../../sounds/game_over.mp3");
            audio.play();
        }
    }
}

var ecu = "";
var pendiente = 0;
var intercepto = 0;

function generarEcuacionRecta() {
    // Generar coeficientes aleatorios para la ecuación de la recta
    pendiente = Math.floor(Math.random() * 10) - 5; // Valor entre -5 y 5
    intercepto = Math.floor(Math.random() * 21) - 10; // Valor entre -10 y 10

    // Array para almacenar los puntos de la recta
    var puntos = [];

    // Generar puntos en el rango de -10 a 10
    for (var x = -10; x <= 10; x++) {
        var y = pendiente * x + intercepto;
        puntos.push({ x: x, y: y });
        x++;
    }

    ecu = pendiente + " * X + " + intercepto;
    return puntos;
}

function randomValueGenerator(vector) {
    return vector.sort(function () { return Math.random() - 0.5 });
};


var correctas = 0;
function verificar(valor, elemento) {

    var respuestas = document.getElementsByClassName("opcion");

    for (let index = 0; index < respuestas.length; index++) {
        const element = respuestas[index];
        element.classList.remove("btn-success");
        element.classList.remove("btn-primary");
        element.classList.remove("btn-warning");
        element.classList.remove("btn-info");
        element.classList.remove("btn-danger");
        element.setAttribute("onclick", "");
    }

    if (valor == true) {
        elemento.classList.add("btn-success");
        var audio = new Audio('../../sounds/ok.mp3');
        audio.play();
        correctas++;
    } else {
        elemento.classList.add("btn-danger");
        var audio = new Audio('../../sounds/over.mp3');
        audio.play();
    }

    setTimeout(() => {
        var canvas = document.getElementById("canvas");
        var ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        setTimeout(()=>{
            preguntar();
        }, 500)
    }, 2000)
}