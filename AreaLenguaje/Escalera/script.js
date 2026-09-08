let preguntas = [];
var colores2 = [{op1: '#662482', op2: '#39134a'},{op1: '#4494d0', op2: '#3372a1'}, {op1: '#f08218', op2: '#c86b12'}, {op1: '#e83967', op2: '#be3156'}];

$(document).ready(function () {
    base_preguntas = readText("preguntas.json");
    preguntas = JSON.parse(base_preguntas);
    preguntas = randomValueGenerator(preguntas);
    pintar_tablero();
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
                    maquina2("bienvenida", 'Hola, soy Genio. <br> En este juego deberas lanzar el dado y responder la pregunta correctamente para poder avanzar, debes acertar mas del 60% de las preguntas que se te presenten para ganar. <br> ¡Tú Puedes!', 50, 1);
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
            }, 2000)
        }, 2000);
    }
}

var colores = ["#eb1b31", "#6abb45", "#0173ba", "#ffd703", "#eb1b31", "#6abb45", "#0173ba", "#ffd703"];
function pintar_tablero(){
    let div_array = ""
    let id = 0;
    var linea = 0;
    var tipo_escalera = 0;
    for (let index = 1; index <= 13; index++) {  
        if(index % 2 == 0){
            for(let index2 = (id+11); index2 >= id; index2--){
                if(linea == 0){
                    if(index2 == id){
                        div_array += "<div class='col-1' id='caja_"+index2+"' style='height: 60px; padding: 0; border-left: 2px solid'><p style='z-index: 1002' class='borde'>"+index2+"</p></div>"
                    }else{
                        div_array += "<div class='col-1' style='height: 60px; padding: 0; border: 0px;'></div>"
                    }
                }else{
                    if(index2 == (id+11)){
                        div_array += "<div class='col-1' id='caja_"+(index2-11)+"' style='height: 60px; padding: 0; border-right: 2px solid'><p style='z-index: 1002' class='borde'>"+(index2-11)+"</p></div>"
                    }else{
                        div_array += "<div class='col-1' style='height: 60px; padding: 0; border: 0px'></div>"
                    }
                }
            }

            if(linea == 0){
                linea = 1;
            }else{
                linea = 0;
            }
            id += 1;
        }else{
            if(tipo_escalera == 0){
                tipo_escalera = 1;
                for(let index2 = id; index2 < (id+12); index2++){
                    div_array += "<div class='col-1' id='caja_"+index2+"' style='height: 60px; padding: 0;'><p style='z-index: 1002' class='borde'>"+index2+"</p></div>"
                }
                id += 12;
            }else{
                tipo_escalera = 0;
                for(let index2 = (id+11); index2 >= id; index2--){
                    div_array += "<div class='col-1' id='caja_"+index2+"' style='height: 60px; padding: 0;'><p style='z-index: 1002' class='borde'>"+index2+"</p></div>"
                }
                id += 12;
            }
           
        }
    }

    document.getElementById("caja_prin").innerHTML += div_array;
}

function randomValueGenerator(vector) {
    return vector.sort(function () { return Math.random() - 0.5 });
}

var pos_actual = 0;
var pos_anterior = 0;
var imagenes = new Array(
    ["img/1.png", "1"],
    ["img/2.png", "2"],
    ["img/3.png", "3"],
    ["img/4.png", "4"],
    ["img/5.png", "5"],
    ["img/6.png", "6"]
);

function lanzarDados() {
    setTimeout(()=>{
        rotarImagenes(0, 7);
    }, 500)
}

let dad1 = 0;
function rotarImagenes(i, n) {
    if(pos_actual >= 85){
        const imagen = document.getElementById("dado1_1");
        dad1 = Math.floor(Math.random() * (3 - 0 + 1) + 0);
        imagen.src = imagenes[dad1][0];
        imagen.alt = imagenes[dad1][1];
        if (i < n) {
            setTimeout(function () {     
                rotarImagenes(i + 1, n);
            }, 300);
        }else{
            $('#myModal').modal('show');
            pintar_pregunta();
        }
    }else{
        if (i < n) {
            const imagen = document.getElementById("dado1_1");
            dad1 = Math.floor(Math.random() * (5 - 0 + 1) + 0);
            imagen.src = imagenes[dad1][0];
            imagen.alt = imagenes[dad1][1];
            setTimeout(function () {
                rotarImagenes(i + 1, n);
            }, 300);
        } else {
            setTimeout(function () {
                if((pos_actual + dad1) < 89){
                    $('#myModal').modal('show');
                    pintar_pregunta();
                }else{
                    Swal.fire({
                        position: 'center',
                        icon: 'error',
                        title: 'lanza nuevamente los dados',
                        showConfirmButton: false,
                        timer: 1500
                    })
                }   
            }, 500);     
        }
    }
}


function recorrerDivs(i, n) {
    if (i <= n) {
        var miDiv = $("#caja_"+i);
        var offset = miDiv.offset();
        var coordenadaX = offset.left;
        var coordenadaY = offset.top;

        var personaje = document.getElementById("personaje");
      
        if(i == 12 || i == 13 || i == 25 || i == 26 || i == 38 || i == 39 || i == 51 || i == 52 || i == 64 ||i == 65 || i == 77 || i == 78){
            personaje.setAttribute("src", "caminando.gif");
            personaje.style.top = (coordenadaY-40)+"px";
        }

        if((i >= 0 && i <= 12) || (i >= 26 && i <= 37) || (i >= 52 && i <= 63) || (i >= 78 && i <= 89)){
            personaje.setAttribute("src", "caminando.gif");
        }else{
            personaje.setAttribute("src", "caminando2.gif");
        }
        personaje.style.left = coordenadaX+"px";
        

        setTimeout(function () {
            recorrerDivs(i + 1, n);
        }, 1000);
    }else{
        var personaje = document.getElementById("personaje");
        personaje.setAttribute("src", "parado.png");
        pos_anterior = n;
        if(pos_anterior == 89){
            $('#principal').fadeToggle(500);
            setTimeout(() => {
                $('#final').fadeToggle(1000);
            }, 500)

            if ((correctas / (pregunta_actual)) * 100 < 60) {
                document.getElementById("final").style.backgroundImage = "url(../../images/derrota.gif)";
            } else {
                document.getElementById("final").style.backgroundImage = "url(../../images/victoria.gif)";
            }
    
            document.getElementById("texto_final").innerText = "Has contestado correctamente " +correctas+ " de "+(pregunta_actual)+" preguntas.";
    
            if ((correctas / (pregunta_actual)) * 100 >= 60) {
                var audio = new Audio('../../sounds/victory.mp3');
                audio.play();
            } else {
                var audio = new Audio('../../sounds/game_over.mp3');
                audio.play();
            }
        }else{
            if(pos_anterior == 6 || pos_anterior == 15 || pos_anterior == 23 || pos_anterior == 47 || pos_anterior == 69 || pos_anterior == 78){
                verificar_escalera();
            }
        }
       
    }
}

function verificar_escalera(){
    var personaje = document.getElementById("personaje");
    if(pos_anterior == 6){
        personaje.style.animationName = "reducir";
        setTimeout(()=>{
            var miDiv = $("#caja_23");
            var offset = miDiv.offset();
            var coordenadaX = offset.left;
            var coordenadaY = offset.top;

            personaje.style.left = coordenadaX+"px";
            personaje.style.top = (coordenadaY-40)+"px";

            setTimeout(()=>{
                pos_anterior = 23;
                pos_actual = 23;
                personaje.style.animationName = "aumentar";
                setTimeout(()=>{
                    personaje.style.animationName = "";
                }, 1000)
            }, 1000)
        }, 1000)
    }else{
        if(pos_anterior == 15){
            personaje.style.animationName = "reducir";
            setTimeout(()=>{
                var miDiv = $("#caja_47");
                var offset = miDiv.offset();
                var coordenadaX = offset.left;
                var coordenadaY = offset.top;
    
                personaje.style.left = coordenadaX+"px";
                personaje.style.top = (coordenadaY-40)+"px";
    
                setTimeout(()=>{
                    pos_anterior = 47;
                    pos_actual = 47;
                    personaje.style.animationName = "aumentar";
                    setTimeout(()=>{
                        personaje.style.animationName = "";
                    }, 1000)
                }, 1000)
            }, 1000)
        }else{
            if(pos_anterior == 23){
                personaje.style.animationName = "reducir";
                setTimeout(()=>{
                    var miDiv = $("#caja_6");
                    var offset = miDiv.offset();
                    var coordenadaX = offset.left;
                    var coordenadaY = offset.top;
        
                    personaje.style.left = coordenadaX+"px";
                    personaje.style.top = (coordenadaY-40)+"px";
        
                    setTimeout(()=>{
                        pos_anterior = 6;
                        personaje.style.animationName = "aumentar";
                        setTimeout(()=>{
                            personaje.style.animationName = "";
                        }, 1000)
                    }, 1000)
                }, 1000)
            }else{
                if(pos_anterior == 47){
                    personaje.style.animationName = "reducir";
                    setTimeout(()=>{
                        var miDiv = $("#caja_15");
                        var offset = miDiv.offset();
                        var coordenadaX = offset.left;
                        var coordenadaY = offset.top;
            
                        personaje.style.left = coordenadaX+"px";
                        personaje.style.top = (coordenadaY-40)+"px";
            
                        setTimeout(()=>{
                            pos_anterior = 15;
                            pos_actual = 15;
                            personaje.style.animationName = "aumentar";
                            setTimeout(()=>{
                                personaje.style.animationName = "";
                            }, 1000)
                        }, 1000)
                    }, 1000)
                }else{
                    if(pos_anterior == 69){
                        personaje.style.animationName = "reducir";
                        setTimeout(()=>{
                            var miDiv = $("#caja_23");
                            var offset = miDiv.offset();
                            var coordenadaX = offset.left;
                            var coordenadaY = offset.top;
                
                            personaje.style.left = coordenadaX+"px";
                            personaje.style.top = (coordenadaY-40)+"px";
                
                            setTimeout(()=>{
                                pos_anterior = 23;
                                pos_actual = 23;
                                personaje.style.animationName = "aumentar";
                                setTimeout(()=>{
                                    personaje.style.animationName = "";
                                }, 1000)
                            }, 1000)
                        }, 1000)
                    }else{
                        if(pos_anterior == 78){
                            personaje.style.animationName = "reducir";
                            setTimeout(()=>{
                                var miDiv = $("#caja_15");
                                var offset = miDiv.offset();
                                var coordenadaX = offset.left;
                                var coordenadaY = offset.top;
                    
                                personaje.style.left = coordenadaX+"px";
                                personaje.style.top = (coordenadaY-40)+"px";
                    
                                setTimeout(()=>{
                                    pos_anterior = 15;
                                    pos_actual = 15;
                                    personaje.style.animationName = "aumentar";
                                    setTimeout(()=>{
                                        personaje.style.animationName = "";
                                    }, 1000)
                                }, 1000)
                            }, 1000)
                        }
                    }
                }
            }
        }
    }
}


function pintar_pregunta(){
    var pregunta = preguntas[0];
    var enunciado = pregunta.pregunta;
    var opciones = pregunta.opciones;

    opciones = randomValueGenerator(opciones);
    colores = randomValueGenerator(colores);

    document.getElementById("enunciado").innerText = enunciado;

    let div = "";
    for (let index = 0; index < opciones.length; index++) {
        var element = opciones[index];
        element = Object.values(element);
        div += "<div class='col-6 respuesta'><div onclick='respuesta(\""+element[1]+"\", this)' class='res' style='background-color: "+colores2[index].op1+"; color: white; border: 6px solid "+colores2[index].op2+"'><h4>"+element[0]+"</h4></div></div>";
    }
    
    document.getElementById("respuestas").innerHTML = "";
    document.getElementById("respuestas").innerHTML = div;
}

let correctas = 0;
let pregunta_actual = 0;

function  respuesta(tipo, elemento){
    pregunta_actual++;
    var opciones = document.getElementsByClassName("res");
    for (let index = 0; index < opciones.length; index++) {
        const element = opciones[index];
        element.setAttribute("onclick", "");
        element.style.backgroundColor = "#9ca8b1";
        element.style.border = "6px solid #919191";
    }

    if(tipo == "Sí"){
        elemento.classList.add("correcto");
        var audio = new Audio('../../sounds/ok.mp3');
        audio.play();
        correctas++;
        setTimeout(()=>{
            pos_actual += (dad1+1);
            recorrerDivs(pos_anterior+1, pos_actual);
        }, 2100)
    }else{
        elemento.classList.add("incorrecto");
        var audio = new Audio('../../sounds/over.mp3');
        audio.play(); 
    }

    setTimeout(()=>{
        preguntas.shift() 
        $('#myModal').modal('hide');
        document.getElementById("respuestas").innerHTML = "";
    }, 2000)
}