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
                    maquina2("bienvenida", 'Hola, soy Genio. <br> Convierte a numeros romanos los numeros que se te presentaran a continuación. <br> ¡Tú Puedes!', 50, 1);
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
                convertirANumerosRomanos();
            }, 2000)
        }, 2000);
    }
}

let pregunta_actual = 1;
function convertirANumerosRomanos() {
    if (pregunta_actual <= 10) {
        document.getElementById("pregunta_numero").innerText = pregunta_actual + " / 10"
        let numero = Math.floor(Math.random() * (3999 - 100 + 1) + 100);

        document.getElementById("numero_normal").innerText = numero;

        let resultado = "";

        // Valores romanos y decimales
        const valoresRomanos = [
            ["M", 1000],
            ["CM", 900],
            ["D", 500],
            ["CD", 400],
            ["C", 100],
            ["XC", 90],
            ["L", 50],
            ["XL", 40],
            ["X", 10],
            ["IX", 9],
            ["V", 5],
            ["IV", 4],
            ["I", 1],
        ];

        // Conversión a números romanos
        for (let i = 0; i < valoresRomanos.length; i++) {
            let letraRomana = valoresRomanos[i][0];
            let valorDecimal = valoresRomanos[i][1];
            while (numero >= valorDecimal) {
                resultado += letraRomana;
                numero -= valorDecimal;
            }
        }
        pintar_cajas(resultado);

        pregunta_actual++;
    } else {
        $('#principal').fadeToggle(500);
        setTimeout(() => {
            $('#final').fadeToggle(1000);
        }, 500)
        if (incorrectas >= 6) {
            document.getElementById("final").style.backgroundImage = "url(../../images/derrota.gif)";
        } else {
            document.getElementById("final").style.backgroundImage = "url(../../images/victoria.gif)";
        }

        document.getElementById("texto_final").innerText = "Has convertido correctamente " + (10-incorrectas) + " números de 10, al sistema numeríco romano ";

        if (incorrectas >= 6) {
            var audio = new Audio('../../sounds/game_over.mp3');
            audio.play();
        } else {
            var audio = new Audio('../../sounds/victory.mp3');
            audio.play();
        }
    }
}

function pintar_cajas(numero) {
    document.getElementById("numero_romano").innerHTML = "";
    numero = numero.toString();
    div = "";

    for (let index = 0; index < numero.length; index++) {
        div += "<div id='cajon_" + (index + 1) + "' data-id='" + numero[index] + "' class='cajon'></div>";
    }

    document.getElementById("numero_romano").innerHTML = div;

    document.getElementById("cajon_1").classList.add("activo");
}

let respuesta_pos = 1;
function responder(letra) {
    let div = document.getElementById("cajon_" + respuesta_pos);
    div.innerHTML = letra;

    setTimeout(() => {
        div.classList.remove("activo");
    }, 10)

    let numero_cajones = document.getElementsByClassName("cajon").length;

    if (respuesta_pos < numero_cajones) {
        setTimeout(() => {
            respuesta_pos++;
            div = document.getElementById("cajon_" + respuesta_pos);
            div.classList.add("activo");
        }, 50);
    } else {
        respuesta_pos = 1;
        calificar(1, numero_cajones);
    }

}

let mala = false;
let incorrectas = 0;
function calificar(i, n) {
    if (i <= n) {
        let cajon = document.getElementById("cajon_" + i);

        if (cajon.getAttribute("data-id") == cajon.innerHTML) {
            cajon.style.backgroundColor = "#238d23";
            cajon.style.borderColor = "#238d23";
        } else {
            cajon.style.backgroundColor = "#f5153e";
            cajon.style.borderColor = "#f5153e";
            mala = true;
        }

        setTimeout(function () {
            calificar(i + 1, n);
        }, 500);
    } else {
        if (mala) {
            incorrectas++;
            var audio = new Audio('../../sounds/over.mp3');
            audio.play();
        }else{
            var audio = new Audio('../../sounds/ok.mp3');
            audio.play();
        }
        
        setTimeout(() => {
            mala = false;
            convertirANumerosRomanos();
        }, 800)
    }
}