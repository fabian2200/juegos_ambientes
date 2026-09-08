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
                    maquina2("bienvenida", 'Hola, soy Genio. <br> A continuación se te presentaran 10 figuras, en las cuales deberas calcular el área, responde mas de 6 preguntas correctamente para ganar el juego. <br> ¡Tú Puedes!', 50, 1);
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
                preguntar();
            }, 2000)
        }, 2000);
    }
}

let pregunta_actual = 1;

function preguntar() {
    if (pregunta_actual <= 10) {
        generarArea();
        document.getElementById("pregunta_numero").innerText = pregunta_actual+" / 10";
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

        document.getElementById("texto_final").innerText = "Has calculado correctamente el área de " + correctas + "  figuras geométricas.";

        if (correctas >= 6) {
            var audio = new Audio('../../sounds/victory.mp3');
            audio.play();
        } else {
            var audio = new Audio('../../sounds/game_over.mp3');
            audio.play();
        }
    }
}

let area = 0;
let array_figuras = [
    {
        tipo: "Cuadrado",
        formula: "a * a",
        imagen: "img/cuadrado.png"
    },
    {
        tipo: "Rectángulo",
        formula: "b * a",
        imagen: "img/rectangulo.png"
    },
    {
        tipo: "Triángulo",
        formula: "(b * h)/2",
        imagen: "img/triangulo.png"
    },
    {
        tipo: "Paralelogramo",
        formula: "b * h",
        imagen: "img/paralelogramo.png"
    },
    {
        tipo: "Rombo",
        formula: "(D * d) / 2",
        imagen: "img/rombo.png"
    },
    {
        tipo: "Pentágono",
        formula: "((5 * b)*a) / 2",
        imagen: "img/pentagono.png"
    },
    {
        tipo: "Hexágono",
        formula: "((6 * b)*a) / 2",
        imagen: "img/hexagono.png"
    }
]


let clases = ["btn-success", "btn-danger", "btn-warning", "btn-primary"];

function generarArea() {
    let tipo = Math.floor(Math.random() * ((array_figuras.length - 1) - 0 + 1) + 0);
    let figura = array_figuras[tipo];
    let p = "";
    switch (tipo) {
        case 0:
            var a = Math.floor(Math.random() * (20 - 1 + 1) + 1);
            p = "<p style='font-size: 30px; color: black;'><strong style='color: red; font-size: 38px;'>a </strong> = "+a+" Mts.</p>";
            area = eval(figura.formula)
            break;
        case 1:
            var a = Math.floor(Math.random() * (15 - 1 + 1) + 1);
            var b = Math.floor(Math.random() * (20 - a + 1) + a);
            p = "<p style='font-size: 30px; color: black;'><strong style='color: red; font-size: 38px;'>a </strong> = "+a+" Mts.</p>"+
            "<p style='font-size: 30px; color: black;'><strong style='color: red; font-size: 38px;'>b </strong> = "+b+" Mts.</p>";
            area = eval(figura.formula)
            break;
        case 2:
            var b = Math.floor(Math.random() * (15 - 1 + 1) + 1);
            var h = Math.floor(Math.random() * (20 - b + 1) + b);
            p = "<p style='font-size: 30px; color: black;'><strong style='color: red; font-size: 38px;'>b </strong> = "+b+" Mts.</p>"+
            "<p style='font-size: 30px; color: black;'><strong style='color: red; font-size: 38px;'>h </strong> = "+h+" Mts.</p>";
            area = eval(figura.formula)
            break;
        case 3:
            var h = Math.floor(Math.random() * (15 - 1 + 1) + 1);
            var b = Math.floor(Math.random() * (20 - h + 1) + h);
            p = "<p style='font-size: 30px; color: black;'><strong style='color: red; font-size: 38px;'>b </strong> = "+b+" Mts.</p>"+
            "<p style='font-size: 30px; color: black;'><strong style='color: red; font-size: 38px;'>h </strong> = "+h+" Mts.</p>";
            area = eval(figura.formula)
            break;
        case 4:
            var d = Math.floor(Math.random() * (15 - 10 + 1) + 10);
            var D = Math.floor(Math.random() * (20 - d + 1) + d);
            p = "<p style='font-size: 30px; color: black;'><strong style='color: red; font-size: 38px;'>d </strong> = "+d+" Mts.</p>"+
            "<p style='font-size: 30px; color: black;'><strong style='color: red; font-size: 38px;'>D </strong> = "+D+" Mts.</p>";
            area = eval(figura.formula)
            break;
        case 5:
            var b = Math.floor(Math.random() * (15 - 1 + 1) + 1);
            var a =  b + Math.floor(Math.random() * (2 - 1 + 1) + 1);
            p = "<p style='font-size: 30px; color: black;'><strong style='color: red; font-size: 38px;'>b </strong> = "+b+" Mts.</p>"+
            "<p style='font-size: 30px; color: black;'><strong style='color: red; font-size: 38px;'>a </strong> = "+a+" Mts.</p>";
            area = eval(figura.formula)
            break;
        case 6:
            var b = Math.floor(Math.random() * (15 - 1 + 1) + 1);
            var a =  b + Math.floor(Math.random() * (2 - 1 + 1) + 1);
            p = "<p style='font-size: 30px; color: black;'><strong style='color: red; font-size: 38px;'>b </strong> = "+b+" Mts.</p>"+
            "<p style='font-size: 30px; color: black;'><strong style='color: red; font-size: 38px;'>a </strong> = "+a+" Mts.</p>";
            area = eval(figura.formula)
            break;
        default:
            break;
    }

    let op2 = area+1;
    let op3 = area-1;
    let op4 = area+2;

    let opciones = [area, op2, op3, op4];

    clases = randomValueGenerator(clases);
    opciones = randomValueGenerator(opciones);

    let botones = "";
    for (let index = 0; index   < 4; index++) {
        const element = opciones[index];
        botones += "<button onclick='verificar("+element+", this)' class='opcion btn "+clases[index]+"'>"+element+" m<sup>2</sup.</button>";
    }

    document.getElementById("imagen").style.backgroundImage = "url("+figura.imagen+")"
    document.getElementById("valores").innerHTML = "";
    document.getElementById("valores").innerHTML = p;

    document.getElementById("botones").innerHTML = "";
    document.getElementById("botones").innerHTML = botones;
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

    if (valor == area) {
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
       preguntar();
    }, 2000)
}