var colores = [{ op1: '#662482', op2: '#39134a' }, { op1: '#4494d0', op2: '#3372a1' }, { op1: '#f08218', op2: '#c86b12' }, { op1: '#e83967', op2: '#be3156' }, { op1: '#28a745', op2: '#1a5628' }];

$(document).ready(function () {
    let audio2 = new Audio('../../sounds/fondo.mp3');
    audio2.play();
    audio2.volume = 0.2;
    colores = randomValueGenerator(colores);
    generarFraccionesEquivalentesAlAzar();
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
                    maquina2("bienvenida", 'Hola, soy Genio. <br> Relaciona cada función con su grupo funcional, relaciona mas de 3 para ganar el juego. <br> ¡Tú Puedes!', 50, 1);
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
            }, 2000)
        }, 2000);
    }
}

var carpetas = [
    {
        nombre: "Alcanos",
        cantidad: 4,
    },
    {
        nombre: "Alquinos",
        cantidad: 4,
    },
    {
        nombre: "Aromáticos",
        cantidad: 3,
    },
    {
        nombre: "Alcoholes",
        cantidad: 5,
    },
    {
        nombre: "Éteres",
        cantidad: 3,
    },
    {
        nombre: "Aldehídos",
        cantidad: 4,
    },
    {
        nombre: "Cetonas",
        cantidad: 2,
    },
    {
        nombre: "Ácidos Carboxílicos",
        cantidad: 3,
    },
    {
        nombre: "Ésteres",
        cantidad: 3,
    },
    {
        nombre: "Derivados Halogenados",
        cantidad: 3,
    },
    {
        nombre: "Aminas",
        cantidad: 3,
    },
    {
        nombre: "Amidas",
        cantidad: 6,
    },
    {
        nombre: "Nitrilos",
        cantidad: 4,
    },
    {
        nombre: "Nitrocompuestos",
        cantidad: 3,
    }
]

var funciones = []

var funcion = [];
var grupoFuncional = [];

function generarFraccionesEquivalentesAlAzar() {

    for (let index = 0; index < carpetas.length; index++) {
        const element = carpetas[index];
        for (let index2 = 1; index2 <= element.cantidad; index2++) {
            funciones.push({    
                imagen: "img/"+element.nombre+"/"+index2+".png",
                tipo: element.nombre
            })
        }
    }

    funciones = randomValueGenerator(funciones);
    
    grupoFuncional = [];
    funcion = [];
    for (let index = 0; index < 5; index++) {
        var element = funciones[index];
        funcion.push({
            html: "<h2>" + element.tipo + "</h2>",
            id: element.tipo
        });

        grupoFuncional.push({
            html: "<img src='"+element.imagen+"' alt='' style='height: 100px;'>",
            id: element.tipo
        });
    }

    funcion = randomValueGenerator(funcion);
    grupoFuncional = randomValueGenerator(grupoFuncional);

    crearDivs();
}

function randomValueGenerator(vector) {
    return vector.sort(function () { return Math.random() - 0.5 });
};

function crearDivs() {
    var columna1 = document.getElementById("columna1");
    var i = 0;
    funcion.forEach(element => {
        let div = "<div style='padding-left: 16%; padding-right: 16%;' onclick='crear_linea(this, 1)' data-id='" + element.id + "' class='point'>" + element.html + "</div><br>";
        columna1.insertAdjacentHTML('beforeend', div);
        i++
    });

    var columna2 = document.getElementById("columna2");
    grupoFuncional.forEach(element => {
        let div = "<div style='padding-left: 2%; padding-right: 2%;' onclick='crear_linea(this, 2)' data-id='" + element.id + "' class='point'>" + element.html + "</div><br>";
        columna2.insertAdjacentHTML('beforeend', div);
    });
}

var respuesta_actual = 0;
var respuestas_reci = [];
var point1 = null;
var point2 = null;
var respuesta_a = 0;
var id_linea = 0;
function crear_linea(elemento, tipo) {

    if (tipo == 1 && point1 == null) {
        point1 = elemento;
        point1.style.backgroundColor = colores[respuesta_a].op1;
        point1.style.borderColor = colores[respuesta_a].op2;
        point1.style.color = "#ffff";
    }

    if (tipo == 2 && point2 == null) {
        point2 = elemento;
        point2.style.backgroundColor = colores[respuesta_a].op1;
        point2.style.borderColor = colores[respuesta_a].op2;
        point2.style.color = "#ffff";
    }

    if (point1 != null && point2 != null) {
        point1.setAttribute("onclick", "");
        point2.setAttribute("onclick", "");
        //save respuestas
        respuestas_reci.push({
            pregunta: point1.getAttribute('data-id'),
            respuesta: point2.getAttribute('data-id'),
            linea: "line_" + id_linea,
        });


        var line = document.createElement("div");
        line.classList.add("line");
        line.setAttribute("id", "line_" + id_linea)
        id_linea++;

        // Find the points based off the elements left and top
        var p1 = { x: point1.offsetLeft, y: point1.offsetTop };
        var p2 = { x: point2.offsetLeft, y: point2.offsetTop };

        // Get distance between the points for length of line
        var a = p1.x - p2.x;
        var b = p1.y - p2.y;
        var length = Math.sqrt(a * a + b * b);

        // Get angle between points
        var angleDeg = Math.atan2(p2.y - p1.y, p2.x - p1.x) * 180 / Math.PI;

        // Get distance from edge of point to center
        var pointWidth = point1.clientWidth / 2 + 20;
        var pointHeight = point1.clientHeight / 2 + 20;

        // Set line distance and position
        // Add width/height from above so the line starts in the middle instead of the top-left corner
        line.style.width = length + 'px';
        line.style.left = (p1.x + pointWidth * 3) + 'px';
        line.style.top = (p1.y + pointHeight) + 'px';

        // Rotate line to match angle between points
        line.style.transform = "rotate(" + angleDeg + "deg)";

        document.body.appendChild(line);

        setTimeout(() => {
            point1 = null;
            point2 = null;
        }, 500);

        respuesta_a++;

        point1 = null;
        point2 = null;
    }

    if (respuesta_a >= 5) {
        setTimeout(() => {
            calificar();
        }, 1000)
    }
}

function calificar() {
    let buenas = 0;

    for (let index = 0; index < respuestas_reci.length; index++) {
        const element = respuestas_reci[index];
        var linea = document.getElementById(element.linea);
        if (element.pregunta == element.respuesta) {
            linea.style.backgroundColor = "#1a7412";
            buenas++;
        } else {
            linea.style.backgroundColor = "#aa1b1b";
        }
    }

    setTimeout(() => {
        $('#final').fadeToggle(1000);
        if (buenas < 6) {
            document.getElementById("final").style.backgroundImage = "url(../../images/derrota.gif)";
        } else {
            document.getElementById("final").style.backgroundImage = "url(../../images/victoria.gif)";
        }

        document.getElementById("texto_final").innerText = "Has contestado correctamente " + buenas + " preguntas de 5"

        if (buenas >= 3) {
            var audio = new Audio('../../sounds/victory.mp3');
            audio.play();
        } else {
            var audio = new Audio('../../sounds/game_over.mp3');
            audio.play();
        }
    }, 2000)
}