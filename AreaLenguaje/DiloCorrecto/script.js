var colores = [{ op1: '#662482', op2: '#39134a' }, { op1: '#4494d0', op2: '#3372a1' }, { op1: '#f08218', op2: '#c86b12' }, { op1: '#e83967', op2: '#be3156' }, { op1: "#FF0032", op2: "#CD0404" }, { op1: "#2146C7", op2: "#0008C1" }];
var frases = []

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
  

$(document).ready(function () {
    base_preguntas = readText("data.json");
    frases = JSON.parse(base_preguntas);
    colores = randomValueGenerator(colores);
    frases = randomValueGenerator(frases);
    generarFrase();
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
                    maquina2("bienvenida", 'Hola, soy Genio. <br> En este juego deberas ubicar en cada espacio en blanco, el signo que creas correcto, debes acertar mas del 60% para ganar. <br> ¡Tú Puedes!', 50, 1);
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
      }, 2000);
    }, 2000);
  }
}


var numeroSignos = 0;
var respuesta_actual = 1;
var correctas = 0;
var frase = "";

var signosTotal = 0;
var correctasTotal = 0;

function generarFrase() {
    numeroSignos = 0;
    if (respuesta_actual <= 5) {
        document.getElementById("pregunta_ac").innerText = "Pregunta " + respuesta_actual + " de 5";
        var contenedor = document.getElementById("frase");

        // Define la frase
        var frase = frases[respuesta_actual-1];
        frase = frase.split(" ");

        // Recorre la frase para encontrar los signos de puntuación y reemplazarlos con un elemento de entrada
        var frase_ok = [];
        for (var i = 0; i < frase.length; i++) {
            var caracter = frase[i];
            if (caracter == "Hay" || caracter == "hay" || caracter == "Ahí" || caracter == "ahí" || caracter == "Ay" || caracter == "ay") {
                var input = "<input readonly class='signo_puntuacion' id='signo_" + numeroSignos + "' onclick='seleccionar_signo(\"signo_" + numeroSignos + "\")' type='text' data-id='" + caracter + "' placeholder='?'>";
                frase_ok.push(input);
                numeroSignos++;
            } else {
                frase_ok.push(caracter);
            }
        }
        
        let frase_or = frase_ok.join(" ");

        signosTotal += numeroSignos;

        contenedor.innerHTML = frase_or;

        respuesta_actual++;
    } else {

        $('#principal').fadeToggle(500);
        setTimeout(() => {
            $('#final').fadeToggle(1000);
        }, 500)
        if ((correctasTotal / signosTotal) * 100 < 60) {
            document.getElementById("final").style.backgroundImage = "url(../../images/derrota.gif)";
        } else {
            document.getElementById("final").style.backgroundImage = "url(../../images/victoria.gif)";
        }

        document.getElementById("texto_final").innerText = "Has contestado correctamente el " + ((correctasTotal / signosTotal) * 100).toFixed(2) + "% de los signos.";

        if ((correctasTotal / signosTotal) * 100 >= 60) {
            var audio = new Audio('../../sounds/victory.mp3');
            audio.play();
        } else {
            var audio = new Audio('../../sounds/game_over.mp3');
            audio.play();
        }

    }
}

function randomValueGenerator(vector) {
    return vector.sort(function () { return Math.random() - 0.5 });
};

var respondidas = 0;
function seleccionar_signo(elemento) {
    Swal.fire({
        title: 'Selecciona la palabra que creas correcta',
        icon: 'info',
        html: '<div style="padding-top: 20px"  class="row">' +
            '<div class="col-4"><button onclick="seleccionar_ele(\'' + elemento + '\',\'hay\')" class="btnw btn btn-primary btn-lg"> Hay </button></div>' +
            '<div class="col-4"><button onclick="seleccionar_ele(\'' + elemento + '\',\'ahí\')" class="btnw btn btn-danger btn-lg"> Ahí </button></div>' +
            '<div class="col-4"><button onclick="seleccionar_ele(\'' + elemento + '\',\'ay\')" class="btnw btn btn-warning btn-lg"> ay </button></div>' +
            '</div>',
        showCloseButton: false,
        showCancelButton: false,
        showConfirmButton: false,
        allowOutsideClick: false,
        focusConfirm: false,
    });
}

function seleccionar_ele(elemento, signo) {
    Swal.close();
    document.getElementById(elemento).value = signo;
    document.getElementById(elemento).style.backgroundColor = "#f18313";
    document.getElementById(elemento).style.color = "#fff";
    document.getElementById(elemento).setAttribute("onclick", "");
    document.getElementById(elemento).setAttribute("disabled", true);
    respondidas++;

    setTimeout(() => {
        if (respondidas == numeroSignos) {
            calificar(0, numeroSignos - 1);
        }
    }, 500)
}

var signos_correctos = 0;

function calificar(i, n) {
    if (i <= n) {
        let signo = document.getElementById("signo_" + i);

        if (signo.getAttribute("data-id").toLocaleLowerCase() == signo.value) {
            signo.style.backgroundColor = "#238d23";
            signo.style.borderColor = "#238d23";
            signos_correctos++;
            correctasTotal++;
        } else {
            signo.style.backgroundColor = "#f5153e";
            signo.style.borderColor = "#f5153e";
        }

        setTimeout(function () {
            calificar(i + 1, n);
        }, 800);
    } else {

        document.getElementById("pregunta_corr").innerText = correctasTotal + "/" + signosTotal + " Palabras correctas";

        if ((signos_correctos / numeroSignos) * 100 >= 60) {
            Swal.fire({
                position: "center",
                imageUrl: "../../images/correcto.gif",
                imageWidth: 250,
                imageHeight: 250,
                title: "Vamos bien!",
                showConfirmButton: false,
                timer: 2500,
            });
        } else {
            Swal.fire({
                position: "center",
                imageUrl: "../../images/incorrecto.gif",
                imageWidth: 250,
                imageHeight: 250,
                title: "Aún puedes, ánimo!",
                showConfirmButton: false,
                timer: 2500,
            });
        }

        signos_correctos = 0;
        respondidas = 0;

        setTimeout(() => {
            generarFrase();
        }, 2600)
    }
}