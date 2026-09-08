$(document).ready(function () {
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
                    maquina2("bienvenida", 'Hola, soy Genio. <br> A continuación se te presentaran 10 coordenadas, las cuales deberas ubicar en el plano cartesiano, responde mas de 6 preguntas correctamente para ganar el juego. <br> ¡Tú Puedes!', 50, 1);
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
    if (!cerrardo) {
        let audio = new Audio('../../sounds/fondo.mp3');
        audio.play();
        audio.volume = 0.2;
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
                pintar_plano();
            }, 2000)
        }, 2000);
    }
}

let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

let pregunta_actual = 1;

function pintar_plano() {
    // Dibujar los números en los ejes

    // Dibujar los ejes del plano cartesiano
    ctx.beginPath();
    ctx.moveTo(canvas.width / 2, 0);
    ctx.lineTo(canvas.width / 2, canvas.height);
    ctx.moveTo(0, canvas.height / 2);
    ctx.lineTo(canvas.width, canvas.height / 2);
    ctx.stroke();

    for (var i = -15; i <= 15; i++) {
        if (i != 0) {
            // Números sobre el eje X
            ctx.fillText(i, canvas.width / 2 + i * 20 - 3, canvas.height / 2 + 15);
            // Números sobre el eje Y
            ctx.fillText(i, canvas.width / 2 - 15, canvas.height / 2 - i * 20 + 3);
        }
    }

    // Dibujar las cuadrículas
    ctx.strokeStyle = "#ccc";
    ctx.lineWidth = 0.5;
    for (var i = -15; i <= 15; i++) {
        // Líneas verticales
        ctx.beginPath();
        ctx.moveTo(canvas.width / 2 + i * 20, 0);
        ctx.lineTo(canvas.width / 2 + i * 20, canvas.height);
        ctx.stroke();

        // Líneas horizontales
        ctx.beginPath();
        ctx.moveTo(0, canvas.height / 2 - i * 20);
        ctx.lineTo(canvas.width, canvas.height / 2 - i * 20);
        ctx.stroke();
    }

    // agrega un listener para el evento clic en el canvas
    canvas.addEventListener("click", dibujarCoordenada);

    setTimeout(() => {
        preguntar();
    }, 2000)
}

function preguntar() {
    if (pregunta_actual <= 10) {
        generarPunto();
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

        document.getElementById("texto_final").innerText = "Has ubicado correctamente " + correctas + " coordenadas de 10 posibles.";

        if (correctas >= 6) {
            var audio = new Audio('../../sounds/victory.mp3');
            audio.play();
        } else {
            var audio = new Audio('../../sounds/game_over.mp3');
            audio.play();
        }
    }
}
let puntox, puntoy = 0;

function generarPunto() {
    const div = document.querySelector('.overlay2');
    div.style.backgroundImage = "url(../../images/normal2.gif)"
    puntox = Math.floor((Math.random() * (15 - (-15) + 1)) + (-15));
    puntoy = Math.floor((Math.random() * (15 - (-15) + 1)) + (-15));
    maquina("puntograficar", 'Ubica en el plano cartesiano la siguiente coordenada ( ' + puntox + ' , ' + puntoy + ' ).', 50, 1);
}

function maquina(contenedor, texto, intervalo, n) {
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
                setTimeout(() => {
                    const div = document.querySelector('.overlay2');
                    div.style.backgroundImage = "url(../../images/normal1.gif)"
                }, 1000)
            }
        }, intervalo);
}

let correctas = 0;
function dibujarCoordenada(event) {
    // calcula la posición relativa del clic dentro del canvas
    let rect = canvas.getBoundingClientRect();
    let x = event.clientX - rect.left;
    let y = event.clientY - rect.top;

    // convierte la posición del clic a coordenadas del plano cartesiano
    let coordenadaX = Math.round((x - canvas.width / 2) / 20);
    let coordenadaY = -Math.round((y - canvas.height / 2) / 20);

    // dibuja el punto en las coordenadas calculadas
    ctx.beginPath();
    ctx.arc(canvas.width / 2 + coordenadaX * 20, canvas.height / 2 - coordenadaY * 20, 6, 0, 2 * Math.PI);
    ctx.fillStyle = coordenadaX == puntox && coordenadaY == puntoy ? "#16760B" : "#E80606";
    ctx.fill();
    ctx.strokeStyle = "#fff";
    ctx.stroke();

    setTimeout(() => {
        if (coordenadaX == puntox && coordenadaY == puntoy) {
            Swal.fire({
                position: "center",
                imageUrl: "../../images/correcto.gif",
                imageWidth: 250,
                imageHeight: 250,
                title: '¡ coordenada correcta !',
                showConfirmButton: false,
                timer: 2500,
            });

            var audio = new Audio('../../sounds/ok.mp3');
            audio.play();

            correctas++;
        } else {
            Swal.fire({
                position: "center",
                imageUrl: "../../images/incorrecto.gif",
                imageWidth: 250,
                imageHeight: 250,
                title: '¡ coordenada incorrecta !',
                showConfirmButton: false,
                timer: 2500,
            });

            var audio = new Audio('../../sounds/over.mp3');
            audio.play();
        }
    }, 300)

    setTimeout(() => {
        preguntar();
    }, 2800)
}