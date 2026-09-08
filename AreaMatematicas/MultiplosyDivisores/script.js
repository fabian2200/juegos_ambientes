// Obtener el ancho y alto de la pantalla
var screenWidth = window.innerWidth;
var screenHeight = window.innerHeight;

// Función para generar coordenadas aleatorias dentro de la pantalla
function randomCoordinates() {
    var x = Math.floor(Math.random() * (screenWidth - 0 + 1) + 0);
    var y = Math.floor(Math.random() * (screenHeight - 100 + 1) + 100);
    return { x: x, y: y };
}

function llenarArray(num, tipo) {
    let arrayNumeros = [];
    if (tipo == 1) {
        arrayNumeros = generateMultiplos(num);
        document.getElementById("tipo").innerHTML = "Selecciona los multiplos del número " + num;
    } else {
        arrayNumeros = generateDivisores(num);
        document.getElementById("tipo").innerHTML = "Selecciona los divisores del número " + num;
    }

    let div = "";
    for (let index = 0; index < arrayNumeros.length; index++) {
        let element = arrayNumeros[index];
        div +=
            "<div onclick='nuevodivAzar(this)' style='background-image: url(img/" + index + ".png)' class='elemento " + element.tipo + "' data-id='" +
            element.tipo +
            "'>" +
            "<h2>" + element.numero.toLocaleString() + "</h2>" +
            "</div>";
    }

    document.getElementById("principal2").innerHTML = div;
    moveImages();
    moveImages();
    setInterval(moveImages, 4000);
}


function generateMultiplos(num) {
    let multiples = [];

    for (let i = 1; i <= 100; i++) {
        multiples.push(num * i);
    }

    multiples = randomValueGenerator(multiples);

    let mul = [];
    for (let index = 0; index < 6; index++) {
        const element = multiples[index];
        mul.push({
            numero: element,
            tipo: "correcta",
        });
    }

    for (let i = 1; i <= 10; i++) {
        mul.push({
            numero: num + 3 * i,
            tipo: (num + 3 * i) % num == 0 ? "correcta" : "incorrecta",
        });
    }

    return mul.sort(function (a, b) {
        return a - b;
    });
}

function generateDivisores(num) {
    let divisores = [];
    let no_divisores = [];
    let div = [];
    if (esPrimo(num)) {
        div.push({
            numero: 1,
            tipo: "correcta",
        });
        div.push({
            numero: num,
            tipo: "correcta",
        });

        for (let index = 0; index < 14; index++) {
            div.push({
                numero: Math.floor(Math.random() * (num - 100 + 1) + 100),
                tipo: "incorrecta",
            });
        }
    } else {
        for (let i = 1; i <= num; i++) {
            if (num % i == 0) {
                divisores.push(i);
            } else {
                no_divisores.push(i);
            }
        }

        divisores = randomValueGenerator(divisores);
        no_divisores = randomValueGenerator(no_divisores);

        for (let index = 0; index < divisores.length; index++) {
            const element = divisores[index];
            div.push({
                numero: element,
                tipo: "correcta",
            });
        }

        for (let index = 0; index < (16 - div.length); index++) {
            const element = no_divisores[index];
            div.push({
                numero: element,
                tipo: "incorrecta",
            });
        }

        if (div.length < 16) {
            let faltan = 16 - (div.length);
            for (let index = 0; index < faltan; index++) {
                let numero = Math.floor(Math.random() * (num - 100 + 1) + 100);
                if (num % numero == 0) {
                    div.push({
                        numero: numero,
                        tipo: "correcta",
                    });
                } else {
                    div.push({
                        numero: numero,
                        tipo: "incorrecta",
                    });
                }
            }
        }
    }

    return div.sort(function (a, b) {
        return a - b;
    });
}

function randomValueGenerator(vector) {
    return vector.sort(function () {
        return Math.random() - 0.5;
    });
}

function esPrimo(numero) {
    if (numero < 2) return false;
    for (let i = 2; i < numero; i++) {
        if (numero % i === 0) {
            return false;
        }
    }
    return true;
}

// Función para mover las imágenes
function moveImages() {
    let images = document.getElementsByClassName("elemento");

    for (let index = 0; index < images.length; index++) {
        const imgElem = images[index];
        var newCoords = randomCoordinates();
        imgElem.style.left = newCoords.x - 100 + "px";
        imgElem.style.top = newCoords.y - 100 + "px";
    }
}


let introConfig = null;
let conversacionCancelada = false;

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

function sleep(ms) {
    return new Promise(function (resolve) {
        setTimeout(resolve, ms);
    });
}

function renderPersonajes(personajes) {
    const container = document.getElementById("personajes-container");
    container.innerHTML = "";
    const cantidad = personajes.length;
    const posiciones = cantidad === 1
        ? ["uno"]
        : ["izquierda", "derecha"];

    personajes.forEach(function (personaje, index) {
        const div = document.createElement("div");
        div.className = "personaje-char " + posiciones[index];
        div.style.backgroundImage = "url(" + personaje.gif_idle + ")";
        div.dataset.index = index;
        container.appendChild(div);
    });
}

function obtenerGifsPersonajes(personajes) {
    const urls = [];

    personajes.forEach(function (personaje) {
        [personaje.gif_idle, personaje.gif_hablando].forEach(function (gif) {
            if (gif && urls.indexOf(gif) === -1) {
                urls.push(gif);
            }
        });
    });

    return urls;
}

function preloadGifsEnCSS(personajes) {
    const urls = obtenerGifsPersonajes(personajes);
    const content = urls.map(function (gif) {
        return 'url("' + gif + '")';
    }).join(" ");

    let style = document.getElementById("preload-gifs-style");
    if (!style) {
        style = document.createElement("style");
        style.id = "preload-gifs-style";
        document.head.appendChild(style);
    }

    style.textContent =
        "#personajes-container::after {" +
        "position:absolute;width:0;height:0;overflow:hidden;z-index:-1;opacity:0;pointer-events:none;" +
        "content:" + content + ";" +
        "}";

    personajesCssPreload(personajes);
}

function personajesCssPreload(personajes) {
    let reglas = "";
    personajes.forEach(function (personaje, index) {
        reglas +=
            '.personaje-char[data-index="' + index + '"]::before {' +
            "position:absolute;width:0;height:0;overflow:hidden;opacity:0;pointer-events:none;" +
            'content:url("' + personaje.gif_idle + '") url("' + personaje.gif_hablando + '");' +
            "}";
    });

    let style = document.getElementById("preload-personajes-style");
    if (!style) {
        style = document.createElement("style");
        style.id = "preload-personajes-style";
        document.head.appendChild(style);
    }
    style.textContent = reglas;
}

function preloadGifs(personajes) {
    const urls = obtenerGifsPersonajes(personajes);
    preloadGifsEnCSS(personajes);

    let container = document.getElementById("preload-gifs");
    if (!container) {
        container = document.createElement("div");
        container.id = "preload-gifs";
        container.className = "preload-gifs";
        document.body.appendChild(container);
    }
    container.innerHTML = "";

    const promesas = urls.map(function (gif) {
        return new Promise(function (resolve) {
            const img = document.createElement("img");
            img.onload = resolve;
            img.onerror = resolve;
            img.src = gif;
            container.appendChild(img);
        });
    });

    return Promise.all(promesas);
}

let nubePersonajeActual = null;

function setPersonajesVisual(index) {
    const personajes = introConfig.personajes;
    const chars = document.querySelectorAll(".personaje-char");

    chars.forEach(function (el, i) {
        if (i === index) {
            el.style.backgroundImage = "url(" + personajes[i].gif_hablando + ")";
            el.classList.add("activo");
            el.classList.remove("inactivo");
        } else {
            el.style.backgroundImage = "url(" + personajes[i].gif_idle + ")";
            el.classList.add("inactivo");
            el.classList.remove("activo");
        }
    });
}

function aplicarClaseNube(index) {
    const nube = document.querySelector(".nube");
    const personajes = introConfig.personajes;

    nube.classList.remove("nube-centro", "nube-izquierda", "nube-derecha");
    if (personajes.length === 1) {
        nube.classList.add("nube-centro");
    } else if (index === 0) {
        nube.classList.add("nube-izquierda");
    } else {
        nube.classList.add("nube-derecha");
    }
}

function esperarFrame() {
    return new Promise(function (resolve) {
        requestAnimationFrame(function () {
            requestAnimationFrame(resolve);
        });
    });
}

function fijarNubeEnPosicion() {
    const nube = document.querySelector(".nube");
    nube.style.animationName = "none";
    nube.style.bottom = "38%";
}

async function fadeNube(opacidad) {
    const nube = document.querySelector(".nube");
    const duracion = (introConfig.configuracion && introConfig.configuracion.duracionCambioNube) || 350;

    nube.style.transition = "opacity " + (duracion / 1000) + "s ease";
    nube.style.opacity = String(opacidad);
    await sleep(duracion);
}

async function cambiarNubeAPersonaje(index) {
    const personajes = introConfig.personajes;

    setPersonajesVisual(index);

    if (personajes.length === 1 || nubePersonajeActual === index) {
        aplicarClaseNube(index);
        nubePersonajeActual = index;
        return;
    }

    $("#bienvenida").html("");
    fijarNubeEnPosicion();

    const nube = document.querySelector(".nube");
    nube.style.opacity = "1";
    await esperarFrame();
    await fadeNube(0);

    aplicarClaseNube(index);
    nubePersonajeActual = index;

    await esperarFrame();
    await fadeNube(1);
}

function resetPersonajesIdle() {
    if (!introConfig) return;
    introConfig.personajes.forEach(function (personaje, index) {
        const el = document.querySelector('.personaje-char[data-index="' + index + '"]');
        if (el) {
            el.style.backgroundImage = "url(" + personaje.gif_idle + ")";
            el.classList.remove("activo", "inactivo");
        }
    });
}

function maquina2(contenedor, texto, intervalo, callback) {
    var i = 0,
        timer = setInterval(function () {
            if (conversacionCancelada) {
                clearInterval(timer);
                if (callback) callback();
                return;
            }
            if (i < texto.length) {
                $("#" + contenedor).html(texto.substr(0, i++) + "_");
            } else {
                clearInterval(timer);
                $("#" + contenedor).html(texto);
                if (callback) callback();
            }
        }, intervalo);
}

function mostrarNubeYConversacion() {
    const primeraLinea = introConfig.conversacion[0];
    const indiceInicial = primeraLinea && primeraLinea.personaje != null ? primeraLinea.personaje : 0;
    let conversacionLista = false;

    setPersonajesVisual(indiceInicial);
    aplicarClaseNube(indiceInicial);
    nubePersonajeActual = indiceInicial;

    const nube = document.querySelector(".nube");
    nube.style.animationName = "moverArriba";
    nube.style.animationDirection = "normal";
    nube.style.display = "block";

    function iniciarConversacion() {
        if (conversacionLista) return;
        conversacionLista = true;
        fijarNubeEnPosicion();
        document.querySelector(".nube").style.opacity = "1";
        setTimeout(function () {
            reproducirConversacion();
        }, 400);
    }

    nube.addEventListener("animationend", function (e) {
        if (e.animationName === "moverArriba") {
            iniciarConversacion();
        }
    });

    setTimeout(iniciarConversacion, 2800);
}

function iniciarAnimacionIntro() {
    const overlay = document.querySelector(".overlay");
    const chars = document.querySelectorAll(".personaje-char");
    const cantidad = introConfig.personajes.length;

    overlay.style.display = "block";

    if (cantidad === 1) {
        chars[0].style.animationName = "entradaIzquierda";
        setTimeout(mostrarNubeYConversacion, 3500);
        return;
    }

    chars[0].style.animationName = "entradaIzquierda";
    setTimeout(function () {
        chars[1].style.animationName = "entradaDerecha";
    }, 1200);
    setTimeout(mostrarNubeYConversacion, 4800);
}

function salirPersonajes(callback) {
    const chars = document.querySelectorAll(".personaje-char");
    const cantidad = introConfig.personajes.length;

    if (cantidad === 1) {
        chars[0].style.animationName = "salidaIzquierda";
        setTimeout(callback, 2800);
        return;
    }

    chars[0].style.animationName = "salidaIzquierda";
    chars[1].style.animationName = "salidaDerecha";
    setTimeout(callback, 2800);
}

async function reproducirConversacion() {
    const cfg = introConfig.configuracion || {};
    const intervalo = cfg.intervalo || 50;
    const pausaEntreLineas = cfg.pausaEntreLineas || 2000;
    const pausaFinal = cfg.pausaFinal || 3000;
    const lineas = introConfig.conversacion;

    for (let i = 0; i < lineas.length; i++) {
        if (conversacionCancelada || cerrardo) return;

        const linea = lineas[i];
        const indicePersonaje = linea.personaje != null ? linea.personaje : 0;
        await cambiarNubeAPersonaje(indicePersonaje);

        await new Promise(function (resolve) {
            maquina2("bienvenida", linea.texto, intervalo, resolve);
        });

        if (conversacionCancelada || cerrardo) return;

        if (i < lineas.length - 1) {
            await sleep(pausaEntreLineas);
        }
    }

    if (!cerrardo && !conversacionCancelada) {
        document.querySelector("#btnomitir").style.display = "none";
        await sleep(pausaFinal);
        cerrar_anuncio();
    }
}


$(document).ready(function () {
    var baseIntro = readText("intro.json");
    introConfig = JSON.parse(baseIntro);

    preloadGifs(introConfig.personajes).then(function () {
        renderPersonajes(introConfig.personajes);
        iniciarIntro();
    });
});

function iniciarIntro() {
    setTimeout(function () {
        $("#principal").fadeToggle(1000);
        $("#fondo_blanco").fadeToggle(3000);
        setTimeout(function () {
            iniciarAnimacionIntro();
        }, 200);
    }, 200);
}

let cerrardo = false;
function cerrar_anuncio() {
    if(!cerrardo) {
        conversacionCancelada = true;

        let audio = new Audio('../../sounds/fondo.mp3');
        audio.play();
        audio.volume = 0.2;

        cerrardo = true;
        const divAnimado2 = document.querySelector(".nube");
        divAnimado2.style.animationName = "moverabajo";
        resetPersonajesIdle();
        $("#fondo_blanco").fadeToggle(3000);
        setTimeout(function () {
            salirPersonajes(function () {
                document.querySelector(".overlay").style.display = "none";
                $("#principal").fadeToggle(1000);
                seleccionar_item();
            });
        }, 2000);
    }
}

function seleccionar_item() {
    Swal.fire({
        title: 'Seleccione una categoria',
        icon: 'warning',
        html: '<hr><div class="row">' +
            '<div class="col-2"></div>' +
            '<div class="col-4"><div><button onclick="seleccionar(this,1)" style="font-size: 30px;" class="btn btn-warning">Multiplos <img width="30%" src="img/mul.png"></button></div></div>' +
            '<div class="col-4"><div><button onclick="seleccionar(this,2)" style="font-size: 30px;" class="btn btn-success">Divisores <img width="30%" src="img/divi.png"></button></div></div>' +
            '<div class="col-2"></div>' +
            '</div><hr>',
        showCloseButton: false,
        showCancelButton: false,
        focusConfirm: false,
        showConfirmButton: false,
        allowOutsideClick: false,
    })
}

let tipo_ope = 0;
function seleccionar(element, tipo) {
    tipo_ope = tipo;
    Swal.close();
    if (tipo == 1) {
        llenarArray(Math.floor(Math.random() * (12 - 2 + 1) + 2), 1)
    } else {
        llenarArray(Math.floor(Math.random() * (10000 - 100 + 1) + 100), 2)
    }
}

let errores = 0;
function nuevodivAzar(element, tipo) {
    let respuesta = element.getAttribute("data-id");

    if (respuesta == "correcta") {
        element.style.backgroundImage = "";
        setTimeout(() => {
            element.style.backgroundImage = 'url("img/bueno.png")';
        }, 200)
    } else {
        errores++;
        element.style.backgroundImage = "";
        setTimeout(() => {
            element.style.backgroundImage = 'url("img/malo.png")';
        }, 200)
    }

    element.style.opacity = "0";
    element.setAttribute("onclick", "")
    element.classList.remove("correcta");
    let correctas = document.getElementsByClassName("correcta").length;

    if (correctas == 0) {
        $('#principal').fadeToggle(500);
        setTimeout(() => {
            $('#final').fadeToggle(1000);
        }, 500)

        document.getElementById("final").style.backgroundImage = "url(../../images/victoria.gif)";

        document.getElementById("texto_final").innerText = "Has terminado, respondiste " + errores + " respuestas incorrectas";

        var audio = new Audio('../../sounds/victory.mp3');
        audio.play();

    }
}