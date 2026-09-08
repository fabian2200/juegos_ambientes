let preguntas = [];

$(document).ready(function () {
    base_preguntas = readText("data.json");
    preguntas = JSON.parse(base_preguntas);
    preguntas = randomValueGenerator(preguntas);
    pintar_estrellas();
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
                    maquina2("bienvenida", 'Hola, soy Genio. <br> En este juego deberás patear el penalti al lado de la portería que tenga la respuesta correcta, anota más de 3 goles para ganar el juego. <br> ¡Tú Puedes!', 50, 1);
                }, 3000)
            }, 2000)
        })
    }, 200)
});

function pintar_estrellas() {
    var anchoPantalla = window.innerWidth;
    var altoPantalla = window.innerHeight/4;

    let div = "";
    for (let index = 0; index < 20; index++) {
        var x = Math.floor((Math.random() * (anchoPantalla - 0 + 1)) + 0);
        var y = Math.floor((Math.random() * (altoPantalla - 0 + 1)) + 0);
        var animmacion = (Math.random() * (2.5 - 1 + 1) + 1);
        var tamanio = (Math.random() * (120 - 90 + 1) + 90);

        div += "<img src='estrella.png' style='height: "+tamanio+"px; top: "+y+"px; left: "+x+"px; animation: resplandor "+animmacion+"s infinite forwards;' class='estrella' alt=''>";
    }

    document.getElementById("estadio").innerHTML += div;
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
                agregarmov();
                pintar_pregunta();
            }, 2000)
        }, 2000);
    }
}

function randomValueGenerator(vector) {
    return vector.sort(function () { return Math.random() - 0.5 });
}

function pintar_pregunta(){
    if(pregunta_actual < 5){
        let pregunta = preguntas[pregunta_actual];
        let opciones = randomValueGenerator(pregunta.opciones);
        document.getElementById("pregunta").innerText = pregunta.pregunta;
        document.getElementById("respuesta1").innerText = opciones[0][0];
        document.getElementById("respuesta11").setAttribute("data-id", opciones[0][1]);
        document.getElementById("respuesta2").innerText = opciones[1][0];
        document.getElementById("respuesta22").setAttribute("data-id", opciones[1][1]);
    }else{
        $('#principal').fadeToggle(500);
        setTimeout(() => {
            $('#final').fadeToggle(1000);
        }, 500)
        if (correctas < 3) {
            document.getElementById("final").style.backgroundImage = "url(../../images/derrota.gif)";
        } else {
            document.getElementById("final").style.backgroundImage = "url(../../images/victoria.gif)";
        }

        document.getElementById("texto_final").innerText = "Has contestado correctamente " + correctas + " pregunta(s) de 5";

        if (correctas > 3) {
            var audio = new Audio('../../sounds/victory.mp3');
            audio.play();
        } else {
            var audio = new Audio('../../sounds/game_over.mp3');
            audio.play();
        }
    }
}

let correctas = 0;
let pregunta_actual = 0;


function agregarmov(){
    document.getElementById("estadio").addEventListener("click", function(event) {
        // Obtén las coordenadas del clic dentro de la página
        var x = event.clientX;
        var y = event.clientY;

        var balon = document.getElementById("balon");
        var portero = document.getElementById("portero");
        balon.style.animationName = "alejar2";
       
        var windowWidth = document.getElementById("estadio").offsetWidth;
        var windowHeight = document.getElementById("estadio").offsetHeight;
        var midPointX = windowWidth / 2;
        var midPointY = windowHeight / 2;
        
        yaux = windowHeight - y;

        
        let veri = verificar_respuesta(x, y);
        let bandera = false;
        if(veri == 1 || veri == 2){
           
            var respuesta1 =  document.getElementById("respuesta11").getAttribute("data-id");
            var respuesta2 =  document.getElementById("respuesta22").getAttribute("data-id");

            if(veri == 2){
                if(respuesta2 == "false"){
                    if(x > midPointX && yaux < midPointY){
                        portero.setAttribute("src", "porteroderechaabajo.png")
                        portero.style.height = "81pt";
                        portero.style.left = (x - portero.offsetWidth)+"px";
                        portero.style.top = (y - (portero.offsetHeight/1.5))+"px";
                    }else{
                        if(x > midPointX && yaux > midPointY){
                            portero.setAttribute("src", "porteroderechaarriba.png")
                            portero.style.height = "91pt";
                            portero.style.left = (x - portero.offsetWidth)+"px";
                            portero.style.top = (y - (portero.offsetHeight/3.7))+"px";
                        }
                    }
                   
                }else{
                    
                    portero.setAttribute("src", "porteroizquierdaabajo.png")

                    var divRect = document.getElementById("portero").getBoundingClientRect();

                    var minY = divRect.top;
                    var minX = divRect.left;

                    var randomX = minX - 200;
                    var randomY = minY + 30;

                    portero.style.height = "81pt";
                    portero.style.left = randomX+"px";
                    portero.style.top = randomY+"px";
                    correctas++;
                    bandera = true;
                }
                
            }else{
                if(respuesta1 == "false"){   
                    if(x < midPointX && yaux < midPointY){
                        portero.setAttribute("src", "porteroizquierdaabajo.png")
                        portero.style.height = "81pt";
                        portero.style.left = x+"px";
                        portero.style.top = (y - (portero.offsetHeight/1.5))+"px";
                    }else{
                        if(x < midPointX && yaux > midPointY){
                            portero.setAttribute("src", "porteroizquierdaarriba.png");
                            portero.style.height = "91pt";
                            portero.style.left = (x-20)+"px";
                            portero.style.top = (y - (portero.offsetHeight/3.7))+"px";
                        }
                    }
                }else{

                    portero.setAttribute("src", "porteroderechaabajo.png")

                    var divRect = document.getElementById("portero").getBoundingClientRect();

                    var minY = divRect.top;
                    var minX = divRect.left;

                    var randomX = minX + 200;
                    var randomY = minY + 30;
                   
                    portero.style.height = "81pt";
                    portero.style.left = randomX+"px";
                    portero.style.top = randomY+"px";
                    correctas++;
                    bandera = true;
                }
            }
            
        }

        
        balon.style.left = (x-30)+"px";
        balon.style.top = (y-30)+"px";

        setTimeout(()=>{
            balon.style.animationName = "";
            balon.style.height = "41px";
            setTimeout(()=>{
                portero.setAttribute("src", "portero.gif");
                portero.style.height = "125pt";
                portero.style.left = "44.2%";
                portero.style.top =  "41%";
                balon.style.height = "61px";
                balon.style.top = "85%";
                balon.style.left = "47.9%";
                pregunta_actual++;
                pintar_pregunta();
                if(bandera){
                    document.getElementById("marcador").innerHTML += "<img class='imgb' src='balonv.png' style='height: 40px' alt=''>";
                }else{
                    document.getElementById("marcador").innerHTML += "<img class='imgb' src='balonr.png' style='height: 40px' alt=''>";
                }
            }, 1500)
        }, 1000)
       
    });
}

function verificar_respuesta(clicX, clicY){
    var respuesta1 = document.getElementById("respuesta11").getBoundingClientRect();;
    var respuesta2 = document.getElementById("respuesta22").getBoundingClientRect();;

    if (clicX >= respuesta1.left && clicX <= respuesta1.right && clicY >= respuesta1.top && clicY <= respuesta1.bottom){
        return 1;
    }else{
        if (clicX >= respuesta2.left && clicX <= respuesta2.right && clicY >= respuesta2.top && clicY <= respuesta2.bottom){
            return 2;
        }else{
            return 0;
        }
    }
}
