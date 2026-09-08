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
                    maquina2("bienvenida", 'Hola, soy Genio. <br> A continuación se te presentaran 10 polinomios, resuelvelos y selecciona la respuesta correcta, responde mas de 6 preguntas correctamente para ganar el juego. <br> ¡Tú Puedes!', 50, 1);
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
var respuesta = 0;
function preguntar() {
    if (pregunta_actual <= 10) {
        let polinomio = generarPolinomio();
        respuesta = resolverPolinomio(polinomio.polinomio, polinomio.variables, polinomio.valores);
        document.getElementById("pregunta_numero").innerText = pregunta_actual+" de 10";
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

        document.getElementById("texto_final").innerText = "Resolviste correctamente " + correctas + "  polinomios.";

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

function resolverPolinomio(polinomio, variables, valores) {
    const valoresVariables = {};
    console.log(polinomio);
    let i = 0;
    variables.forEach(variable => {
        valoresVariables[variable] = valores[i];
        i++;
    });

    const resultado = math.evaluate(polinomio, valoresVariables);
    let p = "";
    variables.forEach(variable => {
        p += "<p style='padding-left: 50px; font-size: 50px'><strong style='color: red;'>"+variable+"</strong>: "+valores[variables.indexOf(variable)]+"</p>";
    });

    document.getElementById("valores").innerHTML = p;

    const polinomioElemento = document.getElementById("polinomio");
    polinomio = polinomio.replace(/(\d+)\*(\w\^\d+)/g, "$1$2").replace(/\^(\d+)/g, "<sup>$1</sup>");
    polinomio = polinomio.replace(expReg, agregarParentesis);

    var polinomioHTML = polinomio;
    polinomioElemento.innerHTML = polinomioHTML;

    let opciones = [{
        opcion: resultado,
        respuesta: true
    }];

   opciones.push({
    opcion: resultado - Math.floor((Math.random() * (6 - 1 + 1)) + 1),
    respuesta: false
   });

   opciones.push({
    opcion: resultado + Math.floor((Math.random() * (6 - 1 + 1)) + 1),
    respuesta: false
   })

   let botones = "";
   clases = randomValueGenerator(clases);
   opciones = randomValueGenerator(opciones);
   for (let index = 0; index   < opciones.length; index++) {
    const element = opciones[index];
    botones += "<button onclick='verificar("+element.respuesta+", this)' class='opcion btn "+clases[index]+"'>"+element.opcion+" </button>";
   }

   document.getElementById("botones").innerHTML = "";
   document.getElementById("botones").innerHTML = botones;
}

const expReg = /(-\d+)/g;

function agregarParentesis(match) {
  return `(${match})`;
}

function generarPolinomio() {
    const variables = ["x", "y", "z"];
    const coeficientes = [-5, -4, -3, -2, -1, 1, 2, 3, 4, 5];
    const grado = Math.floor((Math.random() * (3 - 1 + 1)) + 1);
    let polinomio = "";
    const variablesPresentes = new Set();
  
    for (let i = grado; i > 0; i--) {
      const variable = variables[Math.floor(Math.random() * variables.length)];
      variablesPresentes.add(variable);
      const coeficiente = coeficientes[Math.floor(Math.random() * coeficientes.length)];
      polinomio += `${coeficiente}*${variable}^${i} + `;
    }
  
    const constante = coeficientes[Math.floor(Math.random() * coeficientes.length)];
    const constanteStr = constante;
    polinomio += constanteStr;

  
    return {
      "polinomio": polinomio,
      "variables": [...variablesPresentes],
      "valores": [...variablesPresentes].map(() => Math.floor(Math.random() * 10))
    };
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
       preguntar();
    }, 2000)
}