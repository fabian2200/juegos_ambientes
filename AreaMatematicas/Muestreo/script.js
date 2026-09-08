var frases = [];

$(document).ready(function () {
    var base_preguntas = readText("data.json");
    frases = JSON.parse(base_preguntas);
    frases = randomValueGenerator(frases);

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
                    maquina2("bienvenida", 'Hola, soy Genio. <br> A continuación se te presentaran 10 enunciados, en las cuales deberás  llevar el tren a la estación que tenga la respuesta correcta, deberas llevar mas de 6 trenes a la estación adecuada para ganar. <br> ¡Tú Puedes!', 50, 1);
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
                preguntar();
            }, 2000)
        }, 2000);
    }
}

let pregunta_actual = 1;
var correctas = 0;
var tren = document.getElementById("tren");
var pregunta;

function preguntar() {
    if (pregunta_actual <= 10) {
        tren.style.transition = "left 0s ease-out, top 0s ease-out";
        tren.style.left = "-300px";
        tren.style.top = "285px";
        tren.style.transform = "rotate(0deg)";

        setTimeout(()=>{
            tren.style.transition = "left 3s ease-out, top 3s ease-out";
            tren.style.left = "200px";
        }, 500);

        pregunta = frases[pregunta_actual];
        
        Swal.fire(
            'Lee y responde',
            pregunta.enunciado,
            'question'
        )

    } else {
        $('#principal').fadeToggle(500);
        setTimeout(() => {
            $('#final').fadeToggle(1000);
        }, 500)
        if (correctas >= 6) {
            document.getElementById("final").style.backgroundImage = "url(../../images/victoria.gif)";
            var audio = new Audio('../../sounds/victory.mp3');
            audio.play();
        } else {
            document.getElementById("final").style.backgroundImage = "url(../../images/derrota.gif)";
            var audio = new Audio('../../sounds/game_over.mp3');
            audio.play();
        }

        document.getElementById("texto_final").innerText = "Has llevado a la estación correcta " + correctas + "  trenes de 10.";
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
    return vector.sort(function () { return Math.random() - 0.5 });
};

function verificar(elemento, tipo){
    let timer = 0;
    if(tipo == 1){
        tren.style.transition = "left 1s ease-out, top 1s ease-out";
        tren.style.transform = "rotate(0deg)";
        tren.style.left = (tren.offsetLeft+103)+"px";
        setTimeout(()=>{
            tren.style.transition = "left 3s ease-out, top 3s ease-out, transform .3s linear";
            tren.style.transform = "rotate(-90deg)";
            setTimeout(()=>{
                tren.style.top = (tren.offsetTop-217)+"px";
                setTimeout(()=>{
                    tren.style.transform = "rotate(-180deg)";
                    tren.style.left = (tren.offsetLeft-228)+"px";
                }, 3000)
            }, 150)
        }, 1000)

        timer = 7150;
    }

    if(tipo == 4){
        tren.style.transition = "left 1s ease-out, top 1s ease-out";
        tren.style.transform = "rotate(0deg)";
        tren.style.left = (tren.offsetLeft+103)+"px";
        setTimeout(()=>{
            tren.style.transition = "left 3s ease-out, top 3s ease-out, transform .3s linear";
            tren.style.transform = "rotate(90deg)";
            setTimeout(()=>{
                tren.style.top = (tren.offsetTop+283)+"px";
                setTimeout(()=>{
                    tren.style.transform = "rotate(180deg)";
                    tren.style.left = (tren.offsetLeft-228)+"px";
                }, 3000)
            }, 150)
        }, 1000)

        timer = 7150;
    }

    if(tipo == 2){
        tren.style.transition = "left 3.8s ease-out, top 3.8s ease-out";
        tren.style.transform = "rotate(0deg)";
        tren.style.left = (tren.offsetLeft+465)+"px";
        setTimeout(()=>{
            tren.style.transition = "left 3s ease-out, top 3s ease-out, transform .3s linear";
            tren.style.transform = "rotate(-90deg)";
            setTimeout(()=>{
                tren.style.top = (tren.offsetTop-240)+"px";
            }, 150)
        }, 3800)

        timer = 6950;
    }

    if(tipo == 5){
        tren.style.transition = "left 3.8s ease-out, top 3.8s ease-out";
        tren.style.transform = "rotate(0deg)";
        tren.style.left = (tren.offsetLeft+465)+"px";
        setTimeout(()=>{
            tren.style.transition = "left 3s ease-out, top 3s ease-out, transform .3s linear";
            tren.style.transform = "rotate(90deg)";
            setTimeout(()=>{
                tren.style.top = (tren.offsetTop+260)+"px";
            }, 150)
        }, 3800)

        timer = 6950;
    }

    if(tipo == 3){
        tren.style.transition = "left 4.8s ease-out, top 3.8s ease-out";
        tren.style.transform = "rotate(0deg)";
        tren.style.left = (tren.offsetLeft+975)+"px";
        setTimeout(()=>{
            tren.style.transition = "left 3s ease-out, top 3s ease-out, transform .3s linear";
            tren.style.transform = "rotate(-90deg)";
            setTimeout(()=>{
                tren.style.top = (tren.offsetTop-240)+"px";
            }, 150)
        }, 4800)

        timer = 7950;
    }

    if(tipo == 6){
        tren.style.transition = "left 4.8s ease-out, top 3.8s ease-out";
        tren.style.transform = "rotate(0deg)";
        tren.style.left = (tren.offsetLeft+975)+"px";
        setTimeout(()=>{
            tren.style.transition = "left 3s ease-out, top 3s ease-out, transform .3s linear";
            tren.style.transform = "rotate(90deg)";
            setTimeout(()=>{
                tren.style.top = (tren.offsetTop+240)+"px";
            }, 150)
        }, 4800)

        timer = 7950;
    }

    setTimeout(()=>{
        if(elemento.getAttribute("data-id") == pregunta.tipo){
            correctas++;
        }
        if(elemento.getAttribute("data-id") == pregunta.tipo){
            correctas++;
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
                title: "Respuesta incorrecta!",
                showConfirmButton: false,
                timer: 2500,
            });
        }
        pregunta_actual++;
        setTimeout(()=>{
            preguntar();
        }, 2500)
    }, (timer+300))
}