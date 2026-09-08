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
                    maquina2("bienvenida", 'Hola, soy Genio. <br> A continuación completa el dialogo según el escenario y contexto que se te presente, seleccionando la respuesta correcta. <br> ¡Tú Puedes!', 50, 1);
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
                aparecer_personas();
            }, 2000)
        }, 2000);
    }
}

let vector_ninios = [];
let vector_adultos = [];
let datos = [];
let actual = 0;
function aparecer_personas() {

    let tipo = Math.floor((Math.random() * (2 - 1 + 1)) + 1);

    var base_preguntas = readText("dialogos.json");
    interprete_bp = JSON.parse(base_preguntas);

    for (let index = 0; index < interprete_bp.length; index++) {
        const element = interprete_bp[index];
        if (index < 5) {
            vector_adultos.push(element)
        } else {
            vector_ninios.push(element)
        }
    }

    let base = ""
    if (tipo == 1) {
        base = "img/ninios/"
        datos = randomValueGenerator(vector_ninios)[0];
    } else {
        base = "img/adultos/"
        datos = randomValueGenerator(vector_adultos)[0];
    }

    const divAnimado = document.querySelector('.persona1');
    divAnimado.style.backgroundImage = "url(" + base + datos[0].personas[0] + ".png)"
    divAnimado.style.animationName = 'mover_persona_1';
    const divAnimado2 = document.querySelector('.persona2');
    divAnimado2.style.backgroundImage = "url(" + base + datos[0].personas[1] + ".png)"
    divAnimado2.style.animationName = 'mover_persona_2';
    document.body.style.backgroundImage = 'url(img/'+datos[0].fondo+')'

    setTimeout(() => {
        $('#dialogo1').fadeToggle(2000);
        document.getElementById("dialogo1").style.display = "flex";
        document.getElementById("dialogo1").style.alignItems = "center";
        document.getElementById("dialogo1").style.justifyContent = "center";
    }, 4000)

    setTimeout(() => {
        dialogo_primario();
    }, 5000)
}

function dialogo_Secundario() {
    let opciones = randomValueGenerator(datos[actual].options);
    let div = "<button style='width: 80%' onclick='verificar_respuesta(this)' data-id='" + opciones[0].is_correct + "' class='opcion btn btn-success'>" + opciones[0].text + "</button><br><br>" +
        "<button style='width: 80%' onclick='verificar_respuesta(this)' data-id='" + opciones[1].is_correct + "' class='opcion btn btn-primary'>" + opciones[1].text + "</button><br><br>" +
        "<button style='width: 80%' onclick='verificar_respuesta(this)' data-id='" + opciones[2].is_correct + "' class='opcion btn btn-info'>" + opciones[2].text + "</button><br><br>";

    Swal.fire({
        title: 'Selecciona una respuesta...',
        html: div,
        showCloseButton: false,
        showCancelButton: false,
        showConfirmButton: false,
        allowOutsideClick: false,
        focusConfirm: false,
    });

    actual++;
}

function dialogo_primario() {
    document.getElementById("dialogo1").style.display = "flex";
    document.getElementById("dialogo1").style.alignItems = "center";
    document.getElementById("dialogo1").style.justifyContent = "center";
    //verificar si es la ultima posicion
    if(actual == datos.length){
        $('#final').fadeToggle(1000);
        document.getElementById("final").style.backgroundImage = "url(../../images/victoria.gif)";
        document.getElementById("texto_final").innerText = "Felicitaciones, has terminado!"
        var audio = new Audio('../../sounds/victory.mp3');
        audio.play();
    }else{
       maquina("parrafo1", datos[actual].text, 50, 1); 
    }
    
}

function verificar_respuesta(elemento) {
    var textop = elemento.innerHTML;
    var respuesta = elemento.getAttribute('data-id');
    var respuestas = document.getElementsByClassName("opcion");

    for (let index = 0; index < respuestas.length; index++) {
        const element = respuestas[index];
        element.classList.remove("btn-success");
        element.classList.remove("btn-primary");
        element.classList.remove("btn-info");
    }

    if (respuesta == "true") {
        elemento.classList.add("btn-success");
    } else {
        elemento.classList.add("btn-danger");
    }

    if (document.getElementById("dialogo2").style.display == "") {
        $('#dialogo2').fadeToggle(2000);
    }

    setTimeout(() => {
        Swal.close();
        if (respuesta == "true") {
            maquina("parrafo2", textop, 50, 1);
        } else {
            $('#final').fadeToggle(1000);
            document.getElementById("final").style.backgroundImage = "url(../../images/derrota.gif)";
            document.getElementById("texto_final").innerText = "juego terminado, sigue intentando."
            var audio = new Audio('../../sounds/game_over.mp3');
            audio.play();
        }
    }, 2000)
}

let ok = false;
function maquina(contenedor, texto, intervalo) {
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

                if (ok) {
                    $('#parrafo1').text("");
                    setTimeout(() => {
                        dialogo_primario();
                    }, 2000)
                    ok = false;
                } else {
                    $('#parrafo2').text("")
                    setTimeout(() => {
                        dialogo_Secundario();
                    }, 3000)
                    ok = true;
                }
            }
        }, intervalo);
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
    return vector.sort(function () { return Math.random() - 0.5 });
};

