let frases = [];
var intervalId;

$(document).ready(function () {
    //base_preguntas = readText("preguntas.json");
    //frases = JSON.parse(base_preguntas);

    frases = [
        {
          "tipo": "permutacion",
          "ejemplos": [
            {
              "enunciado": "¿De cuántas formas se pueden organizar las letras de la palabra 'CASA'?",
              "respuesta": "24"
            },
            {
              "enunciado": "¿De cuántas formas se pueden acomodar 5 libros en un estante?",
              "respuesta": "120"
            },
            {
              "enunciado": "¿De cuántas formas se pueden sentar 8 personas alrededor de una mesa redonda?",
              "respuesta": "5040"
            },
            {
              "enunciado": "¿De cuántas formas se pueden seleccionar 3 ganadores en una carrera de 10 corredores?",
              "respuesta": "720"
            },
            {
              "enunciado": "¿De cuántas formas se pueden ordenar las cartas de una baraja de póker?",
              "respuesta": "8320"
            },
            {
              "enunciado": "¿De cuántas formas se pueden acomodar los colores rojo, verde y azul en una cadena de luces de Navidad con 6 bombillas?",
              "respuesta": "360"
            },
            {
              "enunciado": "¿De cuántas formas se pueden organizar los números 1, 2, 3 y 4 en una secuencia?",
              "respuesta": "24"
            },
            {
              "enunciado": "¿De cuántas formas se pueden acomodar 7 estudiantes en una fila?",
              "respuesta": "5040"
            },
            {
              "enunciado": "¿De cuántas formas se pueden seleccionar 2 cartas de una baraja de 52 cartas sin reemplazo?",
              "respuesta": "2652"
            },
            {
              "enunciado": "¿Cuántas permutaciones se pueden hacer con 4 elementos distintos?",
              "respuesta": "24"
            },
            {
              "enunciado": "¿Cuántas formas diferentes se pueden ordenar las letras de la palabra 'CASA'?",
              "respuesta": "24"
            },
            {
              "enunciado": "¿Cuántos arreglos distintos se pueden formar con las letras A, B, C y D?",
              "respuesta": "24"
            },
            {
              "enunciado": "¿De cuántas formas diferentes se pueden sentar 6 personas alrededor de una mesa redonda?",
              "respuesta": "120"
            },
            {
              "enunciado": "¿Cuántos números de tres dígitos se pueden formar utilizando los dígitos 1, 2, 3, 4, 5 y sin repetir ninguno?",
              "respuesta": "120"
            },
            {
              "enunciado": "¿Cuántos anagramas distintos se pueden formar con las letras de la palabra 'ROMA'?",
              "respuesta": "12"
            },
            {
              "enunciado": "¿De cuántas formas diferentes se pueden seleccionar 3 cartas de un mazo de 52 cartas?",
              "respuesta": "22100"
            },
            {
              "enunciado": "¿De cuántas formas diferentes se pueden ordenar las letras de la palabra 'EJERCICIO'?",
              "respuesta": "40320"
            },
            {
              "enunciado": "¿Cuántas permutaciones se pueden hacer con 5 elementos distintos?",
              "respuesta": "120"
            },
            {
              "enunciado": "¿Cuántas formas diferentes se pueden ordenar las letras de la palabra 'BARCO'?",
              "respuesta": "120"
            },
            {
              "enunciado": "¿Cuántos arreglos distintos se pueden formar con las letras A, B, C, D y E?",
              "respuesta": "120"
            },
            {
              "enunciado": "¿De cuántas formas diferentes se pueden sentar 7 personas en un banco sin restricciones?",
              "respuesta": "5040"
            },
            {
              "enunciado": "¿Cuántos números de cuatro dígitos se pueden formar utilizando los dígitos 1, 2, 3 y 4 sin repetir ninguno?",
              "respuesta": "24"
            },
            {
              "enunciado": "¿Cuántos anagramas distintos se pueden formar con las letras de la palabra 'TORTA'?",
              "respuesta": "60"
            },
            {
              "enunciado": "¿De cuántas formas diferentes se pueden seleccionar 4 cartas de un mazo de 52 cartas?",
              "respuesta": "270725"
            },
            {
              "enunciado": "¿Cuántos arreglos distintos se pueden formar con los números 1, 2, 2, 3 y 3?",
              "respuesta": "20"
            },
            {
              "enunciado": "¿Cuántos anagramas distintos se pueden formar con las letras de la palabra 'EXAMEN'?",
              "respuesta": "720"
            },
            {
              "enunciado": "¿De cuántas formas diferentes se pueden ordenar las letras de la palabra 'PROGRAMA'?",
              "respuesta": "40320"
            }
          ]
        },
        {
          "tipo": "combinacion",
          "ejemplos": [
            {
              "enunciado": "¿Cuántas combinaciones se pueden hacer al elegir 2 elementos de un conjunto de 15 elementos?",
              "respuesta": "105"
            },
            {
              "enunciado": "¿De cuántas formas diferentes se pueden seleccionar 3 cartas de un mazo de 52 cartas sin importar el orden?",
              "respuesta": "22100"
            },
            {
              "enunciado": "¿Cuántas combinaciones de 4 letras se pueden formar con las letras A, B, C y D?",
              "respuesta": "6"
            },
            {
              "enunciado": "¿Cuántos grupos de 2 personas se pueden formar con un conjunto de 5 personas?",
              "respuesta": "10"
            },
            {
              "enunciado": "¿Cuántas formas diferentes se pueden seleccionar 5 elementos de un conjunto de 10 elementos?",
              "respuesta": "252"
            },
            {
              "enunciado": "¿Cuántas combinaciones se pueden hacer al elegir 3 sabores de helado de un menú de 7 sabores?",
              "respuesta": "35"
            },
            {
              "enunciado": "¿Cuántas combinaciones de 3 colores se pueden formar con los colores rojo, verde, azul y amarillo?",
              "respuesta": "4"
            },
            {
              "enunciado": "¿De cuántas formas diferentes se pueden seleccionar 4 libros de una biblioteca con 8 libros?",
              "respuesta": "70"
            },
            {
              "enunciado": "¿Cuántos grupos de 3 jugadores se pueden formar con un equipo de 8 jugadores?",
              "respuesta": "56"
            },
            {
              "enunciado": "¿Cuántas combinaciones se pueden hacer al elegir 2 ingredientes de un conjunto de 6 ingredientes?",
              "respuesta": "15"
            },
            {
              "enunciado": "¿De cuántas formas diferentes se pueden seleccionar 2 números de un conjunto de 10 números?",
              "respuesta": "45"
            },
            {
              "enunciado": "¿Cuántos grupos de 4 amigos se pueden formar con un grupo de 7 personas?",
              "respuesta": "35"
            },
            {
              "enunciado": "¿Cuántas combinaciones se pueden hacer al elegir 3 frutas de un conjunto de 5 frutas?",
              "respuesta": "10"
            },
            {
              "enunciado": "¿De cuántas formas diferentes se pueden seleccionar 2 juguetes de un conjunto de 8 juguetes?",
              "respuesta": "28"
            },
            {
              "enunciado": "¿Cuántas combinaciones de 2 números se pueden formar con los números 1, 2, 3, 4 y 5?",
              "respuesta": "10"
            },
            {
              "enunciado": "¿Cuántos grupos de 3 letras se pueden formar con las letras A, B, C, D y E?",
              "respuesta": "10"
            },
            {
              "enunciado": "¿Cuántas combinaciones se pueden hacer al elegir 4 objetos de un conjunto de 20 objetos?",
              "respuesta": "4845"
            },
            {
              "enunciado": "¿De cuántas formas diferentes se pueden seleccionar 3 colores de un conjunto de 12 colores?",
              "respuesta": "220"
            },
            {
              "enunciado": "¿Cuántas combinaciones de 2 elementos se pueden formar con los números 1, 2, 3 y 4?",
              "respuesta": "6"
            },
            {
              "enunciado": "¿Cuántas combinaciones se pueden hacer al elegir 3 elementos de un conjunto de 20 elementos?",
              "respuesta": "20"
            },
            {
              "enunciado": "¿De cuántas formas diferentes se pueden seleccionar 4 cartas de un mazo de 52 cartas sin importar el orden?",
              "respuesta": "270725"
            },
            {
              "enunciado": "¿Cuántas combinaciones de 3 letras se pueden formar con las letras A, B, C, D, E, F, G, H y I?",
              "respuesta": "84"
            },
            {
              "enunciado": "¿Cuántos grupos de 2 personas se pueden formar con un conjunto de 7 personas?",
              "respuesta": "21"
            },
            {
              "enunciado": "¿Cuántas formas diferentes se pueden seleccionar 6 elementos de un conjunto de 10 elementos?",
              "respuesta": "210"
            },
            {
              "enunciado": "¿Cuántas combinaciones se pueden hacer al elegir 4 sabores de helado de un menú de 8 sabores?",
              "respuesta": "70"
            },
            {
              "enunciado": "¿Cuántas combinaciones de 2 colores se pueden formar con los colores rojo, verde, azul, negro, violeta, rosado, morado y amarillo?",
              "respuesta": "28"
            },
            {
              "enunciado": "¿De cuántas formas diferentes se pueden seleccionar 3 libros de una biblioteca con 10 libros?",
              "respuesta": "120"
            },
            {
              "enunciado": "¿Cuántos grupos de 4 jugadores se pueden formar con un equipo de 9 jugadores?",
              "respuesta": "126"
            },
            {
              "enunciado": "¿Cuántas combinaciones se pueden hacer al elegir 3 ingredientes de un conjunto de 7 ingredientes?",
              "respuesta": "35"
            }
          ]
        },
        {
          "tipo": "ordenacion",
          "ejemplos": [
            {
              "enunciado": "¿Cuántas variaciones se pueden hacer con las palabras 'Rojo', 'Azul', 'Verde' tomadas de 2 en 2?",
              "respuesta": "6"
            },
            {
              "enunciado": "¿De cuántas formas diferentes se pueden organizar los dígitos 1, 2, 3, 4, 5 en números de 5 dígitos sin repetición?",
              "respuesta": "120"
            },
            {
              "enunciado": "¿Cuántas variaciones se pueden formar con los números 1, 2, 3, 4 tomados de 2 en 2?",
              "respuesta": "12"
            },
            {
              "enunciado": "¿De cuántas formas diferentes se pueden distribuir 6 libros en 3 estantes si cada estante puede contener todos los libros?",
              "respuesta": "720"
            },
            {
              "enunciado": "¿Cuántas variaciones se pueden formar con las letras A, B, C, D tomadas de 2 en 2?",
              "respuesta": "12"
            },
            {
              "enunciado": "¿De cuántas formas diferentes se pueden ordenar las cifras 1, 2, 3, 4 en números de 3 dígitos sin repetición?",
              "respuesta": "24"
            },
            {
              "enunciado": "¿Cuántas variaciones se pueden hacer con las palabras 'Hola', 'Mundo' tomadas de 1 en 1?",
              "respuesta": "10"
            },
            {
              "enunciado": "¿De cuántas formas diferentes se pueden sentar 5 personas en una fila si hay 8 asientos disponibles?",
              "respuesta": "6720"
            },
            {
              "enunciado": "¿Cuántas variaciones se pueden formar con las letras A, B, C, D, E tomadas de 3 en 3?",
              "respuesta": "60"
            },
            {
              "enunciado": "¿Cuántas variaciones se pueden formar con las letras A, B, C tomadas de 2 en 2?",
              "respuesta": "6"
            },
            {
              "enunciado": "¿De cuántas formas diferentes se pueden organizar los números 1, 2, 3 en una lista de 3 elementos sin repetición?",
              "respuesta": "6"
            },
            {
              "enunciado": "¿Cuántas variaciones se pueden hacer con las palabras 'Hola', 'Amigo' tomadas de 1 en 1?",
              "respuesta": "9"
            },
            {
              "enunciado": "¿De cuántas formas diferentes se pueden sentar 4 personas en un banco si hay 6 asientos disponibles?",
              "respuesta": "360"
            },
            {
              "enunciado": "¿Cuántas variaciones se pueden formar con las letras A, B, C, D tomadas de 3 en 3?",
              "respuesta": "24"
            },
            {
              "enunciado": "¿Cuántas variaciones se pueden hacer con las palabras 'Rojo', 'Azul', 'Verde' tomadas de 3 en 3?",
              "respuesta": "6"
            },
            {
              "enunciado": "¿De cuántas formas diferentes se pueden distribuir 5 libros en 2 estantes si cada estante puede contener todos los libros?",
              "respuesta": "20"
            },
            {
              "enunciado": "¿Cuántas variaciones se pueden formar con los números 1, 2, 3, 4 tomados de 3 en 3?",
              "respuesta": "24"
            },
            {
              "enunciado": "¿De cuántas formas diferentes se pueden asignar 4 tareas a 3 empleados si cada empleado puede realizar todas las tareas?",
              "respuesta": "81"
            },
            {
              "enunciado": "¿Cuántas variaciones se pueden formar con las letras A, A, B tomadas de 2 en 2?",
              "respuesta": "3"
            },
            {
              "enunciado": "¿De cuántas formas diferentes se pueden organizar las cifras 1, 2, 3, 4 en números de 2 dígitos sin repetición?",
              "respuesta": "12"
            },
            {
              "enunciado": "¿Cuántas variaciones se pueden hacer con las palabras 'Hola', 'Amigo' tomadas de 2 en 2?",
              "respuesta": "12"
            },
            {
              "enunciado": "¿De cuántas formas diferentes se pueden sentar 6 personas en un banco si hay 8 asientos disponibles?",
              "respuesta": "40320"
            },
            {
              "enunciado": "¿Cuántas variaciones se pueden formar con las letras A, B, C, D, E tomadas de 4 en 4?",
              "respuesta": "120"
            },
            {
              "enunciado": "¿De cuántas formas diferentes se pueden ordenar las letras de la palabra 'MATEMATICA'?",
              "respuesta": "9720"
            },
            {
              "enunciado": "¿Cuántas variaciones se pueden hacer con los números 1, 1, 2, 3 tomados de 2 en 2?",
              "respuesta": "6"
            },
            {
              "enunciado": "¿De cuántas formas diferentes se pueden distribuir 8 regalos en 5 niños si cada niño puede recibir cualquier número de regalos?",
              "respuesta": "32768"
            },
            {
              "enunciado": "¿Cuántas variaciones se pueden formar con las letras A, B, C, D tomadas de 1 en 1?",
              "respuesta": "4"
            },
            {
              "enunciado": "¿De cuántas formas diferentes se pueden organizar los números 1, 2, 3, 4 en una lista de 4 elementos sin repetición?",
              "respuesta": "24"
            }
          ]
        }
      ];      
    for (let index = 0; index < frases.length; index++) {
        const element = frases[index];
        element.ejemplos = randomValueGenerator(element.ejemplos);
    }

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
                        'Hola, soy Genio. <br> A continuación se te mostraran 5 enunciados, los cuales deberás resolver y disparar al pato que tenga la respuesta correcta, acierta mas del 60% para ganar.<br> ¡Tú Puedes!',
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
        timer = setInterval(function () {
            if (i < texto.length) {
                $("#" + contenedor).html(texto.substr(0, i++) + "_");
            } else {
                clearInterval(timer);
                $("#" + contenedor).html(texto);
                if (!cerrardo) {
                    document.querySelector("#btnomitir").style.display = "none";
                    setTimeout(() => {
                        cerrar_anuncio();
                    }, 3000);
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
                reloj();
            }, 2000);
        }, 2000);
    }
}

let preguntaActual = 0;
var divs = [];
var divs2 = [];
var opciones = [];
var respuestas = [];
var op = 0;
var opcion = null;

function preguntar() {
    generarPreguntas();
    divs = $(".miDiv");
    for (let index = 0; index < divs.length; index++) {
        var div = divs[index];
        div.innerHTML = "<h5 class='borde' style='font-size: 12px; cursor: url(mira.png), auto !important; padding: 25px'>"+respuestas[op]+"</h5>";
        div.setAttribute("onclick", "verificar(this)");
        $(div).css("animation", "");
        $(div).css("left", "1700px");
        $(div).css("top", "200px");
        op++;
    }

    recorrerDivs(0, divs.length);

    divs2 = $(".miDiv2");
    for (let index = 0; index < divs2.length; index++) {
        var div = divs2[index];
        div.innerHTML = "<h5 class='borde' style='font-size: 12px; cursor: url(mira.png), auto !important; padding: 25px'>"+respuestas[op]+"</h5>";
        div.setAttribute("onclick", "verificar(this)");
        $(div).css("animation", "");
        $(div).css("left", "-300px");
        $(div).css("top", "330px");
        op++;
    }

    recorrerDivs2(0, divs2.length);

    pintarPregunta();
}

var correctas = 0;
function pintarPregunta(){
    if(preguntaActual < 5){
        opcion = opciones[preguntaActual];
        console.log(opcion.resultado);
        document.getElementById("enunciado").innerText = opcion.oracion;
    }else{
        finalJuego();
    }
}

function verificar(elemento){
    if(parseInt(elemento.innerText) == opcion.resultado){
        elemento.classList.add('fall');
        correctas++;
        setTimeout(() => {
            preguntaActual++;
            pintarPregunta();
        }, 1000)
    }else{
        document.body.style.animation = "shake 1s linear infinite forwards";
        setTimeout(() => {
            document.body.style.animation = "mover 9s linear infinite forwards";
        }, 1800)
    }
}

function generarPreguntas() {
    for (let index = 0; index < 5; index++) {
        var tipo = Math.floor(Math.random() * (2 - 0 + 1) + 0);
        var oracion = "";
        var resultado = 0;
        switch (tipo) {
            case 0:
                oracion = frases[0].ejemplos[index].enunciado,
                    resultado = parseInt(frases[0].ejemplos[index].respuesta)
                break;
            case 1:
                oracion = frases[1].ejemplos[index].enunciado,
                    resultado = parseInt(frases[1].ejemplos[index].respuesta)
                break;
            case 2:
                oracion = frases[2].ejemplos[index].enunciado,
                    resultado = parseInt(frases[2].ejemplos[index].respuesta)
                break;
            default:
                break;
        }

        if (!verificarObjetoPorAtributo(opciones, 'resultado', resultado)) {
            opciones.push({
                oracion: oracion,
                resultado: resultado
            });
            respuestas.push(resultado);
        } else {
            index--;
        }
    }

    var maximo = Math.max(...respuestas);
    var minimo = Math.min(...respuestas);

    for (let index = 0; index < 5; index++) {
        var numero = Math.floor(Math.random() * (maximo - minimo + 1) + minimo);
        if (!respuestas.includes(numero)) {
            respuestas.push(numero);
        } else {
            index--;
        }
    }

    respuestas = randomValueGenerator(respuestas);
}

function verificarObjetoPorAtributo(array, atributo, valorBuscado) {
    for (var i = 0; i < array.length; i++) {
        if (array[i][atributo] === valorBuscado) {
            return true;
        }
    }
    return false;
}

function recorrerDivs(i, n) {
    if (i < n) {
        var div = divs[i];
        $(div).css("animation", "mover_div 15s infinite");
        $(div).css("animation-timing-function", "linear");
        setTimeout(function () {
            recorrerDivs(i + 1, n);
        }, 3000);
    }
}

function recorrerDivs2(i, n) {
    if (i < n) {
        var div = divs2[i];
        $(div).css("animation", "mover_div2 15s infinite");
        $(div).css("animation-timing-function", "linear");
        setTimeout(function () {
            recorrerDivs2(i + 1, n);
        }, 3000);
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
    return vector.sort(function () {
        return Math.random() - 0.5;
    });
}

function finalJuego() {
    $("#principal").fadeToggle(500);
    setTimeout(() => {
        $("#final").fadeToggle(1000);
    }, 500);

    if ((correctas / (preguntaActual + 1)) * 100 < 60) {
        document.getElementById("final").style.backgroundImage =
            "url(../../images/derrota.gif)";
    } else {
        document.getElementById("final").style.backgroundImage =
            "url(../../images/victoria.gif)";
    }

    document.getElementById("texto_final").innerText =
        "Has contestado correctamente el " +
        ((correctas / (preguntaActual + 1)) * 100).toFixed(2) +
        "% de las pregunta(s)";

    if ((correctas / (preguntaActual + 1)) * 100 < 60) {
        var audio = new Audio("../../sounds/victory.mp3");
        audio.play();
    } else {
        var audio = new Audio("../../sounds/game_over.mp3");
        audio.play();
    }
}

var progressBar = document.getElementById("progress-bar");
var duration = 120;
var remainingSeconds = duration;
var intervalId;

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
