class preg {
    constructor(p, resp, op1, op2, op3) {
        this.p = p;
        this.resp = resp;
        this.op1 = op1;
        this.op2 = op2;
        this.op3 = op3;
    }

    op() {

        return [this.resp, this.op1, this.op2, this.op3].sort((a, b) => Math.random() - 0.5);
    }
}

var presidentes = [];
var interprete_bp = [];
var preguntas = [];

$(document).ready(function () {
    generarPreguntas();
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
                    maquina2("bienvenida", 'Hola, soy Genio. <br> En este juego, se le presentaran una serie de 10 preguntas relacionadas con el tema "Conflicto armado interno de Colombia", tendra varios comodines, como 50/50, ayuda del público, y llamada a un amigo. <br> ¡Tú Puedes!', 50, 1);
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
        }, 2000)
    }, 2000);
}

function generarPreguntas() {
    presidentes = [];
    var base_preguntas = readText("js/data.json");
    interprete_bp = JSON.parse(base_preguntas);
    interprete_bp = randomValueGenerator(interprete_bp);

    for (let index = 0; index < 10; index++) {
        var element = interprete_bp[index];

        element2 = Object.values(element.respuestas);
        switch (element.respuesta_correcta) {
            case "A":
                preguntas.push(
                    new preg("<p style='font-size: 21pt; padding-left: 20px; padding-right: 20px'>" + element.pregunta + "</p>", element2[0], element2[1], element2[2], element2[3], element.respuesta_correcta)
                );
                break;
            case "B":
                preguntas.push(
                    new preg("<p style='font-size: 21pt; padding-left: 20px; padding-right: 20px'>" + element.pregunta + "</p>", element2[1], element2[0], element2[2], element2[3], element.respuesta_correcta)
                );
                break;
            case "C":
                preguntas.push(
                    new preg("<p style='font-size: 21pt; padding-left: 20px; padding-right: 20px'>" + element.pregunta + "</p>", element2[2], element2[1], element2[0], element2[3], element.respuesta_correcta)
                );
                break;
            case "D":
                preguntas.push(
                    new preg("<p style='font-size: 21pt; padding-left: 20px; padding-right: 20px'>" + element.pregunta + "</p>", element2[3], element2[2], element2[1], element2[0], element.respuesta_correcta)
                );
                break;
            default:
                break;
        }
    }

    cambiar_pregunta(preguntas[nivel].p, preguntas[nivel].op());

}

function randomValueGenerator(vector) {
    return vector.sort(function () { return Math.random() - 0.5 });
};


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



//Funciones necesarias para el juego
function aparecer_ventana() {//ventana de comoddines y mensajes
    ventana.style.transform = "scale(1)";
    document.getElementById(identificacion).style.display = "block";
    clearInterval(intrv);
}

btn_comodin.onclick = () => {

    ventana.style.transform = "scale(0)";
    document.getElementById(identificacion).style.display = "none";

    if (identificacion == "resp_correcta") {

        cambiar_pregunta(preguntas[nivel].p, preguntas[nivel].op());

    }
    temporizador();

}

function cambiar_pregunta(p, r) {
    pregunta.innerHTML = p;

    for (var i = 0; i < 4; i++) {
        respuestas[i].innerText = r[i];
    }

    cont_tiempo = 31;


}

function felicidades() {//Mensaje Ganador
    ventana2.style.transform = "scale(1)";
    victoria.style.display = "inline-block";
    ganado.innerText = dinero_ganado;
}

function perder() {//Mensaje Perdedor
    if (sonar) {
        intro.muted = true;
        m_perdiste.play();
    }
    ventana2.style.transform = "scale(1)";
    clearInterval(intrv);
    victoria.innerHTML = "¡Haz perdido! Intenta nuevamente";
    victoria.style.display = "inline-block";
    document.getElementById("img_vent").setAttribute("src", "../../images/derrota.gif");
    ganado.innerText = dinero_ganado;
}



for (let i = 0; i < respuestas.length; i++) {
    resp[i].onclick = () => {
        if (respuestas[i].innerText == preguntas[nivel].resp) {
            resp[i].style.animationName = "titileo";
            setTimeout(()=>{
                identificacion = "resp_correcta";
                if (sonar){
                    m_correcto.play()
                    nivel++;
                    pasaste.innerText = "Pasaste al nivel:" + (nivel + 1);
                    aparecer_ventana();
                    recompenza = recompenza + 100 * (nivel + 1);
                    dinero_ganado += recompenza;
                    document.getElementById("dinero").innerText = dinero_ganado;
                }

                if (nivel >= 10) {
                    felicidades();
                } else {
                    if ((nivel) % 5 == 0) {
                        dinero.innerText = dinero_ganado;
                    }
                }
                resp[i].style.animationName = "";
            }, 3000)
        } else {
            resp[i].style.animationName = "titileo2";
            setTimeout(()=>{
                resp[i].style.animationName = "";
                perder();
            }, 3000); 
        }
    }
}


//Comodines de ayuda a la resolución de las preguntas


cont_comodin.addEventListener("click", (e) => {

    if (e.target.classList.contains("comodines")) {

        e.target.style.backgroundColor = "gray";
    }

    if (amigo == false & e.target.classList.contains("icon-phone")) {
        amigo = true;
        identificacion = "llamar";
        aparecer_ventana();
        document.getElementById("correcto").innerText = preguntas[nivel].resp;
    } else if (publico == false & e.target.classList.contains("icon-users")) {
        publico = true;
        identificacion = "audiencia";
        aparecer_ventana();
        for (var i = 0; i < 4; i++) {

            if (respuestas[i].innerText == preguntas[nivel].resp) barra[i].value = "70";

        }

    } else if (mitad == false & e.target.classList.contains("mitad")) {
        mitad = true;
        let aux1 = 0;
        for (var i = 0; i < 4 & aux1 < 2; i++) {

            if (respuestas[i].innerText != preguntas[nivel].resp) {
                aux1++;
                respuestas[i].innerText = "";
            }

        }


    }




});



//Botones para rendirse o terminar el juego
rendirse.onclick = () => {
    ventana2.style.transform = "scale(1)";
    ganado.innerText = ganado.innerText + " " + dinero_ganado;
}

terminar.onclick = () => { //Una vez termina el juego se recarga la pagina y vuelve al inicio
    location.reload();
}





