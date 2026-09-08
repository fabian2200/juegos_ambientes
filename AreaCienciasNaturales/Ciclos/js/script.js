let correctas = 0;
let cont = 0;
let avatar = "";
let array_divs = [];
let x = 1;
let cantElem = 0;


function elegir() {
     let ciclo = Math.floor((Math.random() * (3 - 1 + 1)) + 1);
   // let ciclo = 3;
    seleccionar(ciclo);
}

function seleccionar(ciclo) {

    switch (ciclo) {
        case 1:
            categoria = "Mueve cada elemento del ciclo del Agua segun corresponda.";
            textTitulo = "Hola, soy Genio. <br> En este juego debes arrastrar los elementos de cada ciclo al lugar correspodiente dentro del ciclo del Agua.";
            break;
        case 2:
            categoria = "Mueve cada elemento del ciclo del Oxígeno segun corresponda.";
            textTitulo = "Hola, soy Genio. <br> En este juego debes arrastrar los elementos de cada ciclo al lugar correspodiente dentro del ciclo del Oxígeno.";
            break;
        case 3:
            categoria = "Mueve cada elemento del ciclo del Nitrógeno segun corresponda.";
            textTitulo = "Hola, soy Genio. <br> En este juego debes arrastrar los elementos de cada ciclo al lugar correspodiente dentro del ciclo del Nitrógeno.";
            break;
    }


    document.getElementById("categoria").innerText = categoria;

    setTimeout(function () {
        swal.close();
        if (ciclo == 1) {
            CargarJuegoCicloAgua(textTitulo);
        } else if (ciclo == 2) {
            CargarJuegoCicloOxigeno(textTitulo);
        } else {
            CargarJuegoCicloNitrogeno(textTitulo);

        }
    }, 2000);
}



function CargarJuegoCicloAgua() {
    cantElem = 5;

    cargarPresentacion(textTitulo);
    document.getElementById("opcionAgua").style.display = "block";

    correctas = 0;
    cont = 0;
    avatar = "";

    array_divs = [];
    x = 1;
    var izquierda = 192;

    array_divs.push(
        "<img id='NombAgua1' style='top: 20px; left: "+izquierda+"px;' data-id='condensacion' draggable='true' width='60' class='nombreAgua'  src='img/agua/condensacion.png' />"
    );
    
    izquierda += 110;

    array_divs.push(
        "<img id='NombAgua2' style='top: 20px; left: "+izquierda+"px;' data-id='precipitacio' draggable='true' width='60' class='nombreAgua'  src='img/agua/precipitacio.png' />"
    );

    izquierda += 110;

    array_divs.push(
        "<img id='NombAgua3' style='top: 20px; left: "+izquierda+"px;' data-id='evaporacion' draggable='true' width='60' class='nombreAgua'  src='img/agua/evaporacion.png' />"
    );

    izquierda += 110;

    array_divs.push(
        "<img id='NombAgua4' style='top: 20px; left: "+izquierda+"px;' data-id='transpiracion' draggable='true' width='60' class='nombreAgua'  src='img/agua/transpiracion.png' />"
    );

    izquierda += 110;

    array_divs.push(
        "<img id='NombAgua5' style='top: 20px; left: "+izquierda+"px;' data-id='infiltracion' draggable='true' width='60' class='nombreAgua'  src='img/agua/infiltracion.png' />"
    );


    array_divs = randomValueGenerator(array_divs);

    div = "";
    for (let index = 0; index < array_divs.length; index++) {
        const element = array_divs[index];
        div += element;
    }

    //document.getElementById("animales").innerHTML = "";
    document.getElementById("nombrCiclosAgua").innerHTML = div;

    setTimeout(()=>{
        startGame("puntoAgua", "nombreAgua");
    })
    
}


///CICLO DE OXIGENO

function CargarJuegoCicloOxigeno() {
    cantElem = 4;

    cargarPresentacion(textTitulo);
    document.getElementById("opcionOxigeno").style.display = "block";

    correctas = 0;
    cont = 0;
    avatar = "";

    array_divs = [];
    x = 1;

    var izquierda = 152;

    array_divs.push(
        "<img id='NombOxigeno1' style='top: 20px; left: "+izquierda+"px;' data-id='dioxido_carbono' draggable='true' width='150' class='nombreOxigeno'  src='img/oxigeno/dioxido_carbono.png' />"
    );

    izquierda += 130;

    array_divs.push(
        "<img id='NombOxigeno2' style='top: 20px; left: "+izquierda+"px;' data-id='fotosintesis' draggable='true' width='150' class='nombreOxigeno'  src='img/oxigeno/fotosintesis.png' />"
    );

    izquierda += 130;

    array_divs.push(
        "<img id='NombOxigeno3' style='top: 20px; left: "+izquierda+"px;' data-id='oxigeno' draggable='true' width='150' class='nombreOxigeno'  src='img/oxigeno/oxigeno.png' />"
    );

    izquierda += 130;

    array_divs.push(
        "<img id='NombOxigeno4' style='top: 20px; left: "+izquierda+"px;' data-id='oxigeno_atmoferico' draggable='true' width='150' class='nombreOxigeno'  src='img/oxigeno/oxigeno_atmoferico.png' />"
    );

    

    array_divs = randomValueGenerator(array_divs);

    div = "";
    for (let index = 0; index < array_divs.length; index++) {
        const element = array_divs[index];
        div += element;
    }

    //document.getElementById("animales").innerHTML = "";
    document.getElementById("nombrCiclosOxigeno").innerHTML = div;

    setTimeout(()=>{
        startGame("puntoOxigeno", "nombreOxigeno");
    })
}

///CICLO DE NITROGENO

function CargarJuegoCicloNitrogeno() {
    cantElem = 5;

    cargarPresentacion(textTitulo);
    document.getElementById("opcionNitrogeno").style.display = "block";

    correctas = 0;
    cont = 0;
    avatar = "";

    array_divs = [];
    x = 1;
    var izquierda = 192;

    array_divs.push(
        "<img id='NombNitrogeno1'  style='top: 20px; left: "+izquierda+"px;' data-id='absorcion' draggable='true' width='120' class='nombreNitrogeno'  src='img/nitrogeno/absorcion.png' />"
    );

    izquierda += 110;

    array_divs.push(
        "<img id='NombNitrogeno2'  style='top: 20px; left: "+izquierda+"px;' data-id='amonificacion' draggable='true' width='120' class='nombreNitrogeno'  src='img/nitrogeno/amonificacion.png' />"
    );

    izquierda += 110;

    array_divs.push(
        "<img id='NombNitrogeno3'  style='top: 20px; left: "+izquierda+"px;' data-id='desnitrificacion' draggable='true' width='120' class='nombreNitrogeno'  src='img/nitrogeno/desnitrificacion.png' />"
    );

    izquierda += 110;

    array_divs.push(
        "<img id='NombNitrogeno4'  style='top: 20px; left: "+izquierda+"px;' data-id='fijacion' draggable='true' width='120' class='nombreNitrogeno'  src='img/nitrogeno/fijacion.png' />"
    );

    izquierda += 110;

    array_divs.push(
        "<img id='NombNitrogeno5'  style='top: 20px; left: "+izquierda+"px;' data-id='nitrificacion' draggable='true' width='120' class='nombreNitrogeno'  src='img/nitrogeno/nitrificacion.png' />"
    );

    izquierda += 110;


    array_divs = randomValueGenerator(array_divs);

    div = "";
    for (let index = 0; index < array_divs.length; index++) {
        const element = array_divs[index];
        div += element;
    }

    //document.getElementById("animales").innerHTML = "";
    document.getElementById("nombrCiclosNitrogeno").innerHTML = div;

    setTimeout(()=>{
        startGame("puntoNitrogeno", "nombreNitrogeno");
    })
}

const randomValueGenerator = (vector) => {
    return vector.sort(function (a, b) {
        return Math.random() - 0.5;
    });
};

function permitirSoltar1(evento) {
    evento.preventDefault();
}

function permitirSoltar2(evento) {
    evento.preventDefault();
}



function soltarNombre2(evento) {
    evento.preventDefault();

    // Obtenemos el ID del nombre que se está soltando
    var idNombre = evento.dataTransfer.getData("text");

    // Obtenemos el ID del punto donde se soltó el nombre
    var idPunto = evento.target.parentElement.getAttribute("id")


    var Ubicacion = evento.target.getAttribute("data-id");

    document.getElementById(idPunto).style.color = "#050519";
    document.getElementById(idPunto).style.fontSize = "1px";

    // Obtenemos el elemento del nombre
    var nombre = document.getElementById(idNombre);
    const ciclo = nombre.getAttribute("data-id");
    // Lo movemos al punto donde se soltó
    evento.target.appendChild(nombre);

    // Centramos el nombre dentro del punto
    var rectPunto = evento.target.getBoundingClientRect();
    var rectNombre = nombre.getBoundingClientRect();
    var desplazamientoX = rectPunto.left - rectNombre.left + 0.5 * (rectPunto.width - rectNombre.width);
    var desplazamientoY = rectPunto.top - rectNombre.top + 0.5 * (rectPunto.height - rectNombre.height);

    nombre.style.transform = "translate(" + desplazamientoX + "px, " + desplazamientoY + "px)";

    // Verificamos si el nombre ha sido soltado en el punto correcto

    if (Ubicacion == ciclo) {
        correctas++;
        nombre.draggable = false;
        document.getElementById("img-mascota").src = "../../images/correcto.gif";
    } else {
        nombre.draggable = false;
        document.getElementById("img-mascota").src = "../../images/incorrecto.gif";
    }

    setTimeout(function () {
        document.getElementById("img-mascota").src = "../../images/pensando.gif";
    }, 2000)

    cont++;

    if (cont == cantElem) {

        $("#principal").fadeToggle(1000);
        $("#final").fadeToggle(1000);

        let prom=(correctas / parseInt(cantElem)) * 100
        
        if (prom < 60) {
            var audio = new Audio("../../sounds/game_over.mp3");
            audio.play();
            document.getElementById("final").style.backgroundImage = "url(../../images/derrota.gif)";
        } else {
            document.getElementById("final").style.backgroundImage = "url(../../images/victoria.gif)";
            var audio = new Audio("../../sounds/victory.mp3");
            audio.play();
        }
        document.getElementById("texto_final").innerText = "Has obtenido " + correctas + " puntos de " + cantElem + " posibles";

    }
}

// Funciones para arrastrar y soltar los nombres
function arrastrar1(evento) {
    evento.dataTransfer.setData("text", evento.target.id);
    evento.target.style.opacity = "0.5";
}

function soltar1(evento) {
    evento.target.style.opacity = "1";
}
// Funciones para arrastrar y soltar los nombres
function arrastrar2(evento) {
    evento.dataTransfer.setData("text", evento.target.id);
    evento.target.style.opacity = "0.5";
}

function soltar2(evento) {
    evento.target.style.opacity = "1";
}

elegir();

function cargarPresentacion(textTitulo) {
    setTimeout(() => {
        $("#principal").fadeToggle(1000);
        $("#fondo_blanco").fadeToggle(3000);
        setTimeout(() => {
            const divAnimado = document.querySelector(".overlay");
            divAnimado.style.animationName = "moverDerecha";
            divAnimado.style.animationDirection = "normal";
            divAnimado.style.display = "block";
            setTimeout(() => {
                const divAnimado2 = document.querySelector(".nube");
                divAnimado2.style.animationName = "moverArriba";
                divAnimado2.style.animationDirection = "normal";
                divAnimado2.style.display = "block";
                setTimeout(() => {
                    divAnimado.style.backgroundImage =
                        "url(../../images/normal2.gif)";
                    maquina2("bienvenida", textTitulo, 100, 1);
                }, 3000);
            }, 2000);
        });
    }, 200);
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
                $("#img-mascota").show();
            }, 2000)
        }, 2000);
    }
}

function startGame(claseSeleccionada, claseSeleccionada2){
    currentElement = "";

    dropPoints = document.querySelectorAll("."+claseSeleccionada);
    
    var miDivs = document.getElementsByClassName(claseSeleccionada2);

    for (let index = 0; index < miDivs.length; index++) {
        var miDiv = miDivs[index];

        miDiv.addEventListener('touchstart', mover_tactil);
        miDiv.addEventListener('touchmove', mover_tactil2);
        miDiv.addEventListener("touchend", drop);
    }

    dropPoints.forEach((element) => {
        element.addEventListener("dragover", dragOver);
        element.addEventListener("drop", drop);
    });
};


//For touchscreen movement
var initialXx = 0;
var initialYy = 0;
var currentElement;
var top_o = 0;
var left_o = 0;
var id_sel = "";

function mover_tactil(event) {
    event.preventDefault();
    // Obtener la posición inicial del dedo
    initialXx = event.touches[0].clientX - event.target.offsetLeft;
    initialYy = event.touches[0].clientY - event.target.offsetTop;
    currentElement = event.target;

    if(id_sel != event.target.id){
        id_sel = currentElement.id;
        var offsets = document.getElementById(id_sel);
        top_o = offsets.style.top;
        left_o = offsets.style.left;
    }
}

function mover_tactil2(event) {
    event.preventDefault();
    // Obtener la posición actual del dedo
    var currentX = event.touches[0].clientX - initialXx;
    var currentY = event.touches[0].clientY - initialYy;

    // Actualizar la posición de la div
    event.target.style.left = currentX + 'px';
    event.target.style.top = currentY + 'px';

    initialX = event.touches[0].clientX;
    initialY = event.touches[0].clientY;
}


//Events fired on the drop target
function dragOver(e) {
    e.preventDefault();
}

//Detect touch device
const isTouchDevice = () => {
    try {
        //We try to create Touch Event (It would fail for desktops and throw error)
        document.createEvent("TouchEvent");
        deviceType = "touch";
        return true;
    } catch (e) {
        deviceType = "mouse";
        return false;
    }
};


let moveElement = false;
const drop = (e) => {
    e.preventDefault();
    //For touch screen
    if (isTouchDevice()) {
        moveElement = false;
        //Select country name div using the custom attribute
        const pos = currentElement.getBoundingClientRect();
        const currentDrop = document.elementsFromPoint(pos.left, pos.top);
    
        let id1 = currentElement.getAttribute("data-id");
        let id2 = currentDrop[1].getAttribute("data-id");
        if (id1 == id2) {
            currentDrop[1].classList.add("dropped");
            //hide actual image
            currentElement.classList.add("hide");
            currentDrop[1].innerHTML = ``;
            //Insert new img element
            currentDrop[1].insertAdjacentHTML(
                "afterbegin",
                `<img class='img_drag' style='height: 35px; width: 90px;' src="${currentElement.getAttribute("src")}">`
            );
            correctas++;
            currentElement.style.display = "none";
            cont++;

            document.getElementById("img-mascota").src = "../../images/correcto.gif";
        }else{
            var off = document.getElementById(id_sel);
            off.style.position = "absolute",
            off.style.top = top_o;
            off.style.left = left_o;

            document.getElementById("img-mascota").src = "../../images/incorrecto.gif";
        }

        setTimeout(function () {
            document.getElementById("img-mascota").src = "../../images/pensando.gif";
        }, 2000)
    } 

    if (cont == cantElem) {

        $("#principal").fadeToggle(1000);
        $("#final").fadeToggle(1000);

        let prom=(correctas / parseInt(cantElem)) * 100
        
        if (prom < 60) {
            var audio = new Audio("../../sounds/game_over.mp3");
            audio.play();
            document.getElementById("final").style.backgroundImage = "url(../../images/derrota.gif)";
        } else {
            document.getElementById("final").style.backgroundImage = "url(../../images/victoria.gif)";
            var audio = new Audio("../../sounds/victory.mp3");
            audio.play();
        }
        document.getElementById("texto_final").innerText = "Has obtenido " + correctas + " puntos de " + cantElem + " posibles";

    }
};