let vector_conver = [];
var datos = [];
let actual = 0;
let actual2 = 0;

$(document).ready(function () {
    let audio = new Audio('../../sounds/fondo.mp3');
    audio.play();
    audio.volume = 0.2;
    

    var base_preguntas = readText("data.json");
    let interprete_bp = JSON.parse(base_preguntas);

    for (let index = 0; index < interprete_bp.length; index++) {
        const element = interprete_bp[index];
        vector_conver.push(element);
    }

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
    if(!cerrardo){
        cerrardo = true;
        let audio2 = new Audio("../../sounds/fondo.mp3");
        audio2.play();
        audio2.volume = 0.2;
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

function aparecer_personas() {
    if(actual < 3){
        base = "img/adultos/"
        datos = randomValueGenerator(vector_conver)[actual];
        
        let tipo = Math.floor((Math.random() * (4 - 1 + 1)) + 1);
        let tipo2 = Math.floor((Math.random() * (4 - 1 + 1)) + 1);

        while(tipo2 == tipo){
           tipo2 = Math.floor((Math.random() * (4 - 1 + 1)) + 1);
        }
    
        const divAnimado = document.querySelector('.persona1');
        divAnimado.style.backgroundImage = "url(" + base + tipo + ".png)"
        divAnimado.style.animationName = 'mover_persona_1';
        const divAnimado2 = document.querySelector('.persona2');
        divAnimado2.style.backgroundImage = "url(" + base + tipo2 + ".png)"
        divAnimado2.style.animationName = 'mover_persona_2';
        document.body.style.backgroundImage = 'url(img/'+Math.floor((Math.random() * (4 - 1 + 1)) + 1)+'.png)'
    
        setTimeout(() => {
            $('#dialogo1').fadeToggle(2000);
            document.getElementById("dialogo1").style.display = "flex";
            document.getElementById("dialogo1").style.alignItems = "center";
            document.getElementById("dialogo1").style.justifyContent = "center";
        }, 4000)
    
        setTimeout(() => {
            dialogo_primario();
        }, 5000)

        actual++;
    }else{
        $('#final').fadeToggle(1000);
        document.getElementById("final").style.backgroundImage = "url(../../images/victoria.gif)";
        document.getElementById("texto_final").innerText = "juego terminado, has logrado completar "+correctas+" conversaciones, felicitaciones!."
        var audio = new Audio('../../sounds/victory.mp3');
        audio.play();
    }
}

function dialogo_Secundario() {
    let random = Math.floor((Math.random() * ((vector_conver.length-1) - 0 + 1)) + 0);

    let opciones = [datos[actual2], vector_conver[random][2], vector_conver[random][4]];

    let div = ["<div class='alert alert-primary opcion' role='alert' style='width: 80%' onclick='verificar_respuesta(this)' data-id='true'>" + opciones[0] + "</div>",
        "<div class='alert alert-info opcion' role='alert' style='width: 80%' onclick='verificar_respuesta(this)' data-id='false' class='opcion btn btn-primary'>" + opciones[1] + "</div>",
        "<div class='alert alert-warning opcion' role='alert' style='width: 80%' onclick='verificar_respuesta(this)' data-id='false' class='opcion btn btn-info'>" + opciones[2] + "</div>"];

    div = randomValueGenerator(div);

    div = div.join(' ');

    Swal.fire({
        title: 'Selecciona una respuesta...',
        html: div,
        showCloseButton: false,
        showCancelButton: false,
        showConfirmButton: false,
        allowOutsideClick: false,
        focusConfirm: false,
    });

    actual2++;
}

let correctas = 0;
function dialogo_primario() {
    document.getElementById("dialogo1").style.display = "flex";
    document.getElementById("dialogo1").style.alignItems = "center";
    document.getElementById("dialogo1").style.justifyContent = "center";
    //verificar si es la ultima posicion
    if(actual2 == datos.length){
        const divAnimado = document.querySelector('.persona1');
        divAnimado.style.animationName = 'quitar_persona_1';
        const divAnimado2 = document.querySelector('.persona2');
        divAnimado2.style.animationName = 'quitar_persona_2';
        $('#dialogo1').fadeToggle(2000);
        $('#dialogo2').fadeToggle(2000);

        actual2 = 0;
        correctas++;
        setTimeout(()=>{
            aparecer_personas();
        }, 4000)
    }else{
       maquina("parrafo1", datos[actual2], 50, 1); 
       actual2++;
    }
    
}

function verificar_respuesta(elemento) {
    var textop = elemento.innerHTML;
    var respuesta = elemento.getAttribute('data-id');
    var respuestas = document.getElementsByClassName("opcion");

    for (let index = 0; index < respuestas.length; index++) {
        const element = respuestas[index];
        element.classList.remove("alert-warning");
        element.classList.remove("alert-primary");
        element.classList.remove("alert-info");
    }

    if (respuesta == "true") {
        elemento.classList.add("alert-success");
    } else {
        elemento.classList.add("alert-danger");
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
            document.getElementById("texto_final").innerText = "juego terminado, has logrado completar "+correctas+" conversaciones, sigue intentando."
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

