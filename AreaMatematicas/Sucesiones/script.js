let frases = [];

var objeto = document.getElementById('rana');
var angulo = 0;
var currentPosition = objeto.getBoundingClientRect().top;
var intervalId;
var elementoSel = null;

function agregarMovimiento(evento, elemento) {
    elementoSel = elemento;
    objeto.setAttribute("src", "rana2.png");
    var x = evento.clientX - objeto.offsetLeft - objeto.offsetWidth / 2;
    var y = evento.clientY - objeto.offsetTop - objeto.offsetHeight / 2;
    angulo = Math.atan2(y, x) * 180 / Math.PI;
    
    var posicion = elemento.getBoundingClientRect();

    if(objeto.offsetLeft > (posicion.left-32)){
        objeto.style.transform = 'scaleX(-1)';
    }else{
        objeto.style.transform = 'rotate(' + angulo + 'deg)';
    }
    objeto.style.left = (posicion.left - 32) + "px";
    objeto.style.top = (posicion.top - 15) + "px";

    setTimeout(()=>{
        objeto.setAttribute("src", "rana.png");
        objeto.style.transform = "rotate(1deg)";
    }, 2300)

    setTimeout(() => { 
        calificarPregunta();
    }, 3000)
}

let correctas = 0;
let numeroSaltos = 0;
function calificarPregunta() {
    if (elementoSel.parentElement.getAttribute("data-id") == sucesion[numeroSaltos]+"") {
        elementoSel.parentElement.style.backgroundImage = "url(ok.png)"
        correctas++;
        if (numeroSaltos == 7) {
            objeto.setAttribute("src", "rana2.png");
            objeto.style.left = "93%"
            objeto.style.top = "52%"
            setTimeout(()=>{
                objeto.setAttribute("src", "rana.png");
                objeto.style.transform = "rotate(1deg)";
                finalJuego();
            }, 2900)
        }
    } else {
        elementoSel.parentElement.style.backgroundImage = "url(fail.png)"
        setTimeout(() => {
            finalJuego();
        }, 1500);
    }
    numeroSaltos++;
}

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
                    maquina2("bienvenida", 'Hola, soy Genio. <br> A continuación se te mostrará una fórmula de suceción la cual deberás resolver y llevar la rana por el camino correcto. <br> ¡Tú Puedes!', 50, 1);
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
var sucesion = [];
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
                var formula = generarFormulaAlAzar();
                sucesion = generarSucesion(formula);

                var formulaElement = document.querySelector("#pregunta");

                var formulaMostrada = formula.replace(/\/(\d+)/g, " * <sup>1</sup>&frasl;<sub>$1</sub>");
                formulaElement.innerHTML = formulaMostrada;

                setTimeout(() => {
                    pintarNumeros();
                    reloj();
                }, 500)
            }, 2000)
        }, 2000);
    }
}

function pintarNumeros() {
    var hojas = document.getElementsByClassName("collapsedd");

    var hojas_array = [];

    var sucesion_array = sucesion;
    var maximo = Math.max(...sucesion_array) + 30;
    var minimo = Math.min(...sucesion_array) - 30;

    for (let index3 = 0; index3 < 8; index3++) {
        var aleatorio = Math.floor((Math.random() * (maximo - minimo + 1)) + minimo);
        if(sucesion_array.includes(aleatorio)){
            index3--;
        }else{
            sucesion_array.push(aleatorio);
        }
    }

    for (let index = 0; index < hojas.length; index++) {
        const element = hojas[index];
        hojas_array.push(element);
    }

    hojas_array = randomValueGenerator(hojas_array);

    for (let index = 0; index < hojas_array.length; index++) {
        const element = hojas_array[index];
        element.parentElement.setAttribute("data-id", sucesion_array[index]);
        element.innerHTML = "<h5 class='borde'>" + sucesion_array[index] + "</h5>"
    }

    console.log(sucesion);
}

function generarFormulaAlAzar() {
    var sucesiones = [
        "2 * n + 3",
        "n * n + 5",
        "3 * n - 1",
        "n * (n + 1) / 2",
        "4 * n - 2",
        "2 * n * n - n",
        "n * (n - 1) / 2 + 1",
        "2 * n + 1",
        "3 * n + 4",
        "n * n - 3 * n",
        "2 * n + 3",
        "n * n + 5",
        "3 * n - 1",
        "n * (n + 1) / 2",
        "4 * n - 2",
        "2 * n * n - n",
        "n * (n - 1) / 2 + 1",
        "2 * n + 1",
        "3 * n + 4",
        "n * n - 3 * n",
        "5 * n - 2",
        "n * n * n",
        "2 * n - 1",
        "n * (n + 1)",
        "n * (n - 2) / 2",
        "3 * n + 2",
        "n * n + n + 1",
        "4 * n - 3",
        "n * n + 2 * n - 1",
        "2 * n * n - 2 * n + 1",
        "n * (n + 3) / 2",
        "3 * n - 2",
        "n * n - n",
        "2 * n + 5",
        "n * (n - 3) / 2",
        "5 * n + 1",
        "n * (n + 2) - 1",
        "2 * n * n + 3",
        "4 * n - 1",
        "n * (n + 1) + 1",
        "n * (n - 1) + 1",
        "3 * n + 1",
        "n * n + 4 * n",
        "2 * n * n - n + 3",
        "n * (n + 1) - 1",
        "5 * n - 1",
        "n * n + 3 * n",
        "4 * n - 4",
        "2 * n * n + n",
        "n * (n + 2) + 1",
        "n * (n - 1) / 2 + 2",
        "3 * n",
        "n * n + n",
        "2 * n - 2",
        "n * (n + 1) + 2",
        "n * (n - 2) / 2 + 2",
        "2 * n + 3",
        "n * n + 5",
        "3 * n - 1",
        "n * (n + 1) / 2",
        "4 * n - 2",
        "2 * n * n - n",
        "n * (n - 1) / 2 + 1",
        "2 * n + 1",
        "3 * n + 4",
        "n * n - 3 * n",
        "5 * n - 2",
        "n * n * n",
        "2 * n - 1",
        "n * (n + 1)",
        "n * (n - 2) / 2",
        "3 * n + 2",
        "n * n + n + 1",
        "4 * n - 3",
        "n * n + 2 * n - 1",
        "2 * n * n - 2 * n + 1",
        "n * (n + 3) / 2",
        "3 * n - 2",
        "n * n - n",
        "2 * n + 5",
        "n * (n - 3) / 2",
        "5 * n + 1",
        "n * (n + 2) - 1",
        "2 * n * n + 3",
        "4 * n - 1",
        "n * (n + 1) + 1",
        "n * (n - 1) + 1",
        "3 * n + 1",
        "n * n + 4 * n",
        "2 * n * n - n + 3",
        "n * (n + 1) - 1",
        "5 * n - 1",
        "n * n + 3 * n",
        "4 * n - 4",
        "2 * n * n + n",
        "n * (n + 2) + 1",
        "n * (n - 1) / 2 + 2",
        "3 * n",
        "n * n + n",
        "2 * n - 2",
        "n * (n + 1) + 2",
        "n * (n - 2) / 2 + 2",
        "4 * n - 5",
        "n * n - 2 * n",
        "2 * n * n + 2 * n + 1",
        "n * (n + 3) - 1",
        "5 * n",
        "n * n + 2",
        "3 * n - 3",
        "n * (n + 1) / 2 + 3",
        "2 * n + 3",
        "n * (n - 1) - 1",
        "n * (n + 2)",
        "4 * n - 6",
        "2 * n * n - n - 1",
        "3 * n + 3",
        "n * n + 3 * n + 1",
        "5 * n + 2",
        "n * (n - 2) - 1",
        "n * (n + 1) / 2 + 4",
        "2 * n + 4",
        "n * n - 4",
        "4 * n - 7",
        "n * (n + 2) + 2",
        "2 * n * n + 3 * n",
        "3 * n + 4",
        "n * n + 4 * n + 2",
        "5 * n + 3",
        "n * (n - 1) / 2 + 5"
    ];

    var aleatorio = Math.floor((Math.random() * ((sucesiones.length - 1) - 0 + 1)) + 0);

    var formula = sucesiones[aleatorio];

    return formula;
}

function generarSucesion(formula) {
    var sucesion = [];

    var numero = Math.floor((Math.random() * (30 - 10 + 1)) + 10);

    for (var i = numero; i <= (numero+7); i++) {
        var resultado = eval(formula.replace(/n/g, i));
        sucesion.push(resultado);
    }

    return sucesion;
}

function randomValueGenerator(vector) {
    return vector.sort(function () { return Math.random() - 0.5 });
};

function finalJuego() {
    $('#principal').fadeToggle(500);
    setTimeout(() => {
        $('#final').fadeToggle(1000);
    }, 500);

    if (correctas < 5) {
        document.getElementById("final").style.backgroundImage = "url(../../images/derrota.gif)";
    } else {
        document.getElementById("final").style.backgroundImage = "url(../../images/victoria.gif)";
    }

    document.getElementById("texto_final").innerText = "Has contestado correctamente " + correctas + " pregunta(s)";

    if (correctas == 5) {
        var audio = new Audio('../../sounds/victory.mp3');
        audio.play();
    } else {
        var audio = new Audio('../../sounds/game_over.mp3');
        audio.play();
    }
}

function reloj() {
    var timeleft = 270;
    var downloadTimer = setInterval(function () {
        var minutes = Math.floor(timeleft / 60);
        var seconds = timeleft - minutes * 60;
        if (seconds < 10) {
            seconds = "0" + seconds;
        }
        document.getElementById("timer").innerHTML = minutes + ":" + seconds;
        timeleft -= 1;
        if (timeleft <= 0) {
            clearInterval(downloadTimer);
            document.getElementById("timer").innerHTML = "0:00";
            setTimeout(() => {
                finalJuego();
            }, 2500)
        }
    }, 1000);
}
