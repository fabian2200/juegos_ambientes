let preguntas = [];
var colores2 = [{op1: '#662482', op2: '#39134a'},{op1: '#4494d0', op2: '#3372a1'}, {op1: '#f08218', op2: '#c86b12'}, {op1: '#e83967', op2: '#be3156'}];

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
                    maquina2("bienvenida", 'Hola, soy Genio. <br> En este juego deberás calcular la notación cientifica del número que se te de, para llegar lo mas lejos posible.  <br> ¡Tú Puedes!', 50, 1);
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
                pintar_tablero();
                setTimeout(()=>{
                    preguntar();
                }, 1500)
            }, 2000)
        }, 2000);
    }
}

var colores = ["#eb1b31", "#6abb45", "#0173ba", "#ffd703", "#eb1b31", "#6abb45", "#0173ba", "#ffd703"];

function randomValueGenerator(vector) {
    return vector.sort(function () { return Math.random() - 0.5 });
}

let correctas = 0;
let incorrectas = 0;
let pregunta_actual = 1;

function pintar_tablero(){
    let div = "";
    posx = 10;
    posy = 17;
    for (let index = 1; index <= 8 ; index++) {
        div += "<div id='div_"+index+"' style='top: "+posy+"px; left: "+posx+"px' class='estacion'></div>";

        if(index % 2 == 0){
            posx = 10;
            posy += 150;
        }else{
            posx = 680;
        }
        
    }

    document.getElementById("caja_prin").innerHTML += div;
}

function preguntar(){
    if (pregunta_actual <= 8) {
        pintar_pregunta();
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

        document.getElementById("texto_final").innerText = "Llegaste hasta el nivel " + correctas + "  de 8.";

        if (correctas >= 6) {
            var audio = new Audio('../../sounds/victory.mp3');
            audio.play();
        } else {
            var audio = new Audio('../../sounds/game_over.mp3');
            audio.play();
        }
    }
}

let clases = ["btn-success", "btn-info", "btn-warning", "btn-primary"];
function pintar_pregunta(){
    let tipo = Math.floor((Math.random() * (1 - 0 + 1)) + 0);
    let base = 10;
    let expo = Math.floor((Math.random() * (5 - (-5) + 1)) + (-5));
    let numero = ((Math.random() * (200 - 1 + 1)) + 1);
    let resultado = numero * (Math.pow(base , expo));
    
    clases = randomValueGenerator(clases);
    var opciones = [];
    
    let not = "";
    let opcionesHTML = "";
    if(tipo == 1){
        not = numero.toFixed(5)+" X "+base+"<sup>"+expo+"</sup>";
        opciones.push({
            opcion: resultado.toFixed(5),
            respuesta: true
        })

        let i = 0;
        while(i < 3){
            let expo2 = Math.floor((Math.random() * (6 - (-6) + 1)) + (-6));
            if(expo2 != expo){   
                opciones.push({
                    opcion: (numero * (Math.pow(base , expo2))).toFixed(5),
                    respuesta: false
                })
                i++;
            }
        }
    }else{
        not = resultado.toFixed(5);
        
        opciones.push({
            opcion: numero.toFixed(5)+" X "+base+"<sup>"+expo+"</sup>",
            respuesta: true
        })

        opciones.push({
            opcion: (numero+Math.floor((Math.random() * (10 - (1) + 1)) + (1))).toFixed(5)+" X "+base+"<sup>"+(expo)+"</sup>",
            respuesta: false
        })

        opciones.push({
            opcion: (numero+Math.floor((Math.random() * (10 - (1) + 1)) + (1))).toFixed(5)+" X "+base+"<sup>"+(expo)+"</sup>",
            respuesta: false
        })

        opciones.push({
            opcion: (numero+Math.floor((Math.random() * (10 - (1) + 1)) + (1))).toFixed(5)+" X "+base+"<sup>"+(expo)+"</sup>",
            respuesta: false
        })
    }

    opciones = randomValueGenerator(opciones);
    
    for (let index = 0; index < opciones.length; index++) {
        let opcion = opciones[index];
        opcionesHTML += "<div class='col-6' onclick='verificar("+opcion.respuesta+", this)' style='padding: 5px'><button class='opcion btn "+clases[index]+"'><h2>"+opcion.opcion+"</h2></button></div>"
    }
   
    document.getElementById("numero_not").innerHTML = not;
    document.getElementById("opciones").innerHTML = opcionesHTML;
    
}


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
        elemento.firstElementChild.classList.add("btn-success");
        var audio = new Audio('../../sounds/ok.mp3');
        audio.play();
        correctas++;
        manejar();
        setTimeout(() => {
            pregunta_actual++;
            if((pregunta_actual+1) % 2 != 0){
                personaje.setAttribute("src", "parado2.png")
            }else{
                personaje.setAttribute("src", "parado.png")
            }

            personaje.style.transform = "rotate(360deg)"
            preguntar();
        }, 5000)
    } else {
        elemento.firstElementChild.classList.add("btn-danger");
        var audio = new Audio('../../sounds/over.mp3');
        audio.play();
        incorrectas++;
        pregunta_actual = 11;
        setTimeout(() => {
            preguntar();
        }, 2000)
    }
}



function manejar(){
    var miDiv = $("#div_"+(pregunta_actual+1));
    var objeto = document.getElementById("div_"+(pregunta_actual+1));
    var offset = miDiv.offset();
    var coordenadaX = offset.left;
    var coordenadaY = offset.top;

    var personaje = document.getElementById("personaje");
    personaje.style.left = coordenadaX+"px"; 
    personaje.style.top = coordenadaY+"px"; 

    if((pregunta_actual+1) % 2 != 0){
        var x = coordenadaX - objeto.offsetLeft - objeto.offsetWidth / 2;
        var y = coordenadaY - objeto.offsetTop - objeto.offsetHeight / 2;
        angulo = Math.atan2(y, x) * 180 / Math.PI;
        personaje.style.transform = 'rotate(' + (angulo+115) + 'deg)';
    }
};