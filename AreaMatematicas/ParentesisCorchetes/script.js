$(document).ready(function () {

    let audio = new Audio('../../sounds/fondo.mp3');
    audio.play();
    audio.volume = 0.2;

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
                    maquina2("bienvenida", 'Hola, soy Genio. <br> A continuación se te presentaran 10 operaciones matematicas, resuelvelos y selecciona la respuesta correcta, responde mas de 6 preguntas correctamente para ganar el juego. <br> ¡Tú Puedes!', 50, 1);
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
            }, 2000)
        }, 2000);
    }
}

let pregunta_actual = 1;
var respuesta = 0;
function preguntar() {
    if (pregunta_actual <= 10) {
        let polinomio = generarOperacion();
        respuesta = resolverPolinomio(polinomio);
        document.getElementById("pregunta_numero").innerText = pregunta_actual + " / 10";
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

        document.getElementById("texto_final").innerText = "Resolviste correctamente " + correctas + "  operaciones.";

        if (correctas >= 6) {
            var audio = new Audio('../../sounds/victory.mp3');
            audio.play();
        } else {
            var audio = new Audio('../../sounds/game_over.mp3');
            audio.play();
        }
    }
}

let clases = ["btn-success", "btn-danger", "btn-warning", "btn-primary"];

function resolverPolinomio(polinomio) {
    console.log(polinomio);
    var resultado =  eval(polinomio);
    if(Array.isArray(resultado)){
        resultado = resultado[0];
    }

    let valorOriginal = "*";
    let valorReemplazo = " X ";
    let arrayCadena = polinomio.split(valorOriginal);
    let nuevaCadena = arrayCadena.join(valorReemplazo);
    const polinomioElemento = document.getElementById("polinomio");
    polinomioElemento.innerText = nuevaCadena;
    
    let opciones = [];

    opciones.push({
        opcion: parseFloat(resultado - Math.floor((Math.random() * (6 - 1 + 1)) + 1)),
        respuesta: false
    });

    opciones.push({
        opcion: parseFloat(resultado + Math.floor((Math.random() * (6 - 1 + 1)) + 1)),
        respuesta: false
    })

    opciones.push({
        opcion: parseFloat(resultado),
        respuesta: true
    })

    let botones = "";
    clases = randomValueGenerator(clases);
    opciones = randomValueGenerator(opciones);
    for (let index = 0; index < opciones.length; index++) {
        const element = opciones[index];
        botones += "<button onclick='verificar(" + element.respuesta + ", this)' class='opcion btn " + clases[index] + "'>" + element.opcion.toFixed(2) + " </button>";
    }

    document.getElementById("botones").innerHTML = "";
    document.getElementById("botones").innerHTML = botones;
}

function generarOperacion() {
    const operadores = ['+', '-', '*', '/']; 
    const maxNivel = Math.floor((Math.random() * (3 - 2 + 1)) + 2);
    const maxNumero = 10;

    function generarOperacionRecursiva(nivel) {
        if (nivel === 0) {
            return Math.floor(Math.random() * maxNumero) + 1;
        } else {
            const operador = operadores[Math.floor(Math.random() * operadores.length)];
            const subOperacion = generarOperacionRecursiva(nivel - 1);
            if (nivel % 2 === 0) {
                return '[' + subOperacion + operador + generarOperacionRecursiva(nivel - 1) + ']';
            } else {
                return '(' + subOperacion + operador + generarOperacionRecursiva(nivel - 1) + ')';
            }
        }
    }

    const operacion = generarOperacionRecursiva(maxNivel);
    return operacion;
}

function randomValueGenerator(vector) {
    return vector.sort(function () { return Math.random() - 0.5 });
};

let correctas = 0;

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

    var pajaro = document.getElementById("pajaro");
    if (valor == true) {
        elemento.classList.add("btn-success");
        var audio = new Audio('../../sounds/ok.mp3');
        audio.play();
        pajaro.setAttribute("src", "../../images/correcto.gif")
        correctas++;
    } else {
        elemento.classList.add("btn-danger");
        var audio = new Audio('../../sounds/over.mp3');
        audio.play();
        pajaro.setAttribute("src", "../../images/incorrecto.gif")
    }

    setTimeout(() => {
        pajaro.setAttribute("src", "../../images/pensando.gif");
        pregunta_actual++;
        preguntar();
    }, 2000)
}