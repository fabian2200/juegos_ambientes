var grupos = ["Metales Alcalinos", "Alcalinotérreos", "Lantánidos", "Actínidos", "Metales de Transición", "Otros Metales", "Metaloides", "No Metales", "Halógenos", "Gases Nobles"]
var elementos_array = [];

$(document).ready(function () {
    let audio2 = new Audio('../../sounds/fondo.mp3');
    audio2.play();
    audio2.volume = 0.2;
    grupos = randomValueGenerator(grupos);
    generarTabla();
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
                    divAnimado.style.backgroundImage = "url(../../images/ciencia/normal2.gif)"
                    maquina2("bienvenida", 'Hola, soy Genio. <br> En este juego deberas ubicar los elementos según el grupo que se te pida, ubica todos los elementos para ganar el juego. <br> ¡Tú Puedes!', 50, 1);
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
        divAnimado.style.backgroundImage = "url(../../images/ciencia/normal1.gif)";
        $('#fondo_blanco').fadeToggle(3000);
        setTimeout(function () {
            divAnimado.style.animationName = 'moverIzquierda';
            divAnimado.style.animationDirection = 'normal';
            setTimeout(() => {
                $('#principal').fadeToggle(1000);
                startGame();
            }, 2000)
        }, 2000);
    }
}


function randomValueGenerator(vector) {
    return vector.sort(function () { return Math.random() - 0.5 });
}

var numero_elementos = 0;
var grupo_seleccionado = "";
function startGame(){
    grupo_seleccionado = grupos[0];
    numero_elementos =  elementos_array.filter(word => word.grupo == grupo_seleccionado).length;
    document.getElementById("grupo").innerText = grupo_seleccionado;
}

let correctas = 0;
let incorrectas = 0;
function verificar(elemento, grupo, color){
    if(grupo == grupo_seleccionado){
        elemento.style.backgroundColor = color;
        correctas++;
    }else{
        elemento.style.backgroundColor = "red";
        elemento.style.color = "#fff";
        incorrectas++;
    }

    if(correctas == numero_elementos){
        $('#principal').fadeToggle(500);
        setTimeout(() => {
            $('#final').fadeToggle(1000);
        }, 500)

        if (incorrectas > (numero_elementos / 2)) {
            document.getElementById("final").style.backgroundImage = "url(../../images/ciencia/derrota.gif)";
        } else {
            document.getElementById("final").style.backgroundImage = "url(../../images/ciencia/victoria.gif)";
        }

        document.getElementById("texto_final").innerText = "Encontraste todos los elementos del grupo de los "+grupo_seleccionado+" con "+incorrectas+" respuestas incorrectas.";

        if (correctas > (numero_elementos / 2)) {
            var audio = new Audio('../../sounds/victory.mp3');
            audio.play();
        } else {
            var audio = new Audio('../../sounds/game_over.mp3');
            audio.play();
        }
    }
}

function generarTabla() {
    // ---------------
    //     START
    // ---------------
    var lista = new Array();

    var lantanidos = "#d0ff8b";
    var actinidos = "#b6ff8a";
    var noMetalicos = "#ab8ffe";
    var metalAlcalinos = "#fec68d";
    var alcalinoterros = "#ffe08c";
    var otrosMetalaes = "#fff988";
    var metalTransicion = "#ecff86";
    var metaloides = "#90fe99";
    var alogenos = "#fa8cfe";
    var gasesNobles = "#8eddfe";
    var elementosDesconocidos = "#c8c8c8";


    var e1 = {
        ma: '1.00794',
        en: '1312.0',
        el: '2.20',
        na: '1',
        sq: 'H',
        nom: 'Hidrogeno',
        con: '1s1',
        pos: '1x1',
        grupo: "No Metales",
        col: noMetalicos,
        clase: 'td-norm'
    };

    lista.push(e1);

    var blanco = {
        ma: '',
        en: '',
        el: '',
        na: '',
        sq: '',
        nom: '',
        con: '',
        pos: '',
        col: 'white',
        clase: 'td-blanco'
    };

    for (var z = 0; z < 16; z++) {
        lista.push(blanco);
    }

    var e18 = {
        ma: '4.002602',
        en: '2372.3',
        el: '',
        na: '2',
        sq: 'He',
        nom: 'Helio',
        con: '1s2',
        pos: '1x18',
        grupo: "Gases Nobles",
        col: gasesNobles,
        clase: 'td-norm'
    };

    lista.push(e18);

    var e19 = {
        ma: '6.941',
        en: '520.2',
        el: '0.98',
        na: '3',
        sq: 'Li',
        nom: 'Litio',
        con: '1s32x1',
        pos: '2x1',
        grupo: "Metales Alcalinos",
        col: metalAlcalinos,
        clase: 'td-norm'
    };

    lista.push(e19);

    var e20 = {
        ma: '9.012182',
        en: '899.5',
        el: '1.57',
        na: '4',
        sq: 'Be',
        nom: 'Berilio',
        con: '1s12x3',
        pos: '2x2',
        grupo: "Alcalinotérreos",
        col: alcalinoterros,
        clase: 'td-norm'
    };

    lista.push(e20);

    for (var z = 0; z < 10; z++) {
        lista.push(blanco);
    }

    var e31 = {
        ma: '10.811',
        en: '800.6',
        el: '2.04',
        na: '5',
        sq: 'B',
        nom: 'Boro',
        con: '1s22s22p1',
        pos: '2x13',
        grupo: "Metaloides",
        col: metaloides,
        clase: 'td-norm'
    };

    lista.push(e31);

    var e32 = {
        ma: '12.0107',
        en: '1086.5',
        el: '2.55',
        na: '6',
        sq: 'C',
        nom: 'Carbono',
        con: '1s22s22p1p1',
        pos: '2x14',
        grupo: "No Metales",
        col: noMetalicos,
        clase: 'td-norm'
    };

    lista.push(e32);

    var e33 = {
        ma: '14.0067',
        en: '1402.3',
        el: '3.04',
        na: '7',
        sq: 'N',
        nom: 'Nitrogeno',
        con: '1s22s32p2',
        pos: '2x15',
        grupo: "No Metales",
        col: noMetalicos,
        clase: 'td-norm'
    };

    lista.push(e33);

    var e34 = {
        ma: '15.9994',
        en: '1313.9',
        el: '3.41',
        na: '8',
        sq: 'O',
        nom: 'Oxigeno',
        con: '1s22s32p4',
        pos: '2x16',
        grupo: "No Metales",
        col: noMetalicos,
        clase: 'td-norm'
    };

    lista.push(e34);

    var e35 = {
        ma: '18.998403',
        en: '1681.0',
        el: '3.98',
        na: '9',
        sq: 'F',
        nom: 'Fluor',
        con: '1s22s22p8',
        pos: '2x17',
        grupo: "Halógenos",
        col: alogenos,
        clase: 'td-norm'
    };

    lista.push(e35);

    var e36 = {
        ma: '20.1797',
        en: '2080.7',
        el: '',
        na: '10',
        sq: 'Ne',
        nom: 'Neon',
        con: '1s22s22p4',
        pos: '2x18',
        grupo: "Gases Nobles",
        col: gasesNobles,
        clase: 'td-norm'
    };

    lista.push(e36);

    var e37 = {
        ma: '22.98976',
        en: '495.8',
        el: '0.93',
        na: '11',
        sq: 'Na',
        nom: 'Sodio',
        con: '[Ne]3s1',
        pos: '3x1',
        grupo: "Metales Alcalinos",
        col: metalAlcalinos,
        clase: 'td-norm'
    };

    lista.push(e37);

    var e38 = {
        ma: '24.3050',
        en: '737.7',
        el: '1.31',
        na: '12',
        sq: 'Mg',
        nom: 'Magnesio',
        con: '[Ne]3s²',
        pos: '3x2',
        grupo: "Alcalinotérreos",
        col: alcalinoterros,
        clase: 'td-norm'
    };

    lista.push(e38);

    for (var z = 0; z < 10; z++) {
        lista.push(blanco);
    }

    var e49 = {
        ma: '26.98153',
        en: '577.5',
        el: '1.61',
        na: '13',
        sq: 'Al',
        nom: 'Aluminio',
        con: '[Ne]3s23p1',
        pos: '3x13',
        grupo: "Otros Metales",
        col: otrosMetalaes,
        clase: 'td-norm'
    };

    lista.push(e49);

    var e50 = {
        ma: '28.0855',
        en: '786.5',
        el: '1.90',
        na: '14',
        sq: 'Si',
        nom: 'Silicio',
        con: '[Ne]3s2 3p2',
        pos: '3x14',
        grupo: "Metaloides",
        col: metaloides,
        clase: 'td-norm'
    };

    lista.push(e50);

    var e51 = {
        ma: '30.97696',
        en: '1011.8',
        el: '2.19',
        na: '15',
        sq: 'P',
        nom: 'Fosforo',
        con: '[Ne]3s2 3p3',
        pos: '3x15',
        grupo: "No Metales",
        col: noMetalicos,
        clase: 'td-norm'
    };

    lista.push(e51);

    var e52 = {
        ma: '32.065',
        en: '999.6',
        el: '2.58',
        na: '16',
        sq: 'S',
        nom: 'Azufre',
        con: '[Ne] 3s2 3p4',
        pos: '3x16',
        grupo: "No Metales",
        col: noMetalicos,
        clase: 'td-norm'
    };

    lista.push(e52);

    var e53 = {
        ma: '35.453',
        en: '1251.2',
        el: '3.16',
        na: '17',
        sq: 'Cl',
        nom: 'Cloro',
        con: '[Ne]3s² 3p5',
        pos: '3x17',
        grupo: "Halógenos",
        col: alogenos,
        clase: 'td-norm'
    };

    lista.push(e53);

    var e54 = {
        ma: '39.948',
        en: '1520.6',
        el: '',
        na: '18',
        sq: 'Ar',
        nom: 'Argon',
        con: '[Ne]3s23p6',
        pos: '3x18',
        grupo: "Gases Nobles",
        col: gasesNobles,
        clase: 'td-norm'
    };

    lista.push(e54);

    var e55 = {
        ma: '39.0983',
        en: '418.8',
        el: '0.82',
        na: '19',
        sq: 'K',
        nom: 'Potasio',
        con: '[Ar]4s1',
        pos: '4x1',
        grupo: "Metales Alcalinos",
        col: metalAlcalinos,
        clase: 'td-norm'
    };

    lista.push(e55);

    var e56 = {
        ma: '40.078',
        en: '589.8',
        el: '1.00',
        na: '20',
        sq: 'Ca',
        nom: 'Calcio',
        con: '[Ar]4s²',
        pos: '4x2',
        grupo: "Alcalinotérreos",
        col: alcalinoterros,
        clase: 'td-norm'
    };

    lista.push(e56);

    var e57 = {
        ma: '44.95591',
        en: '633.1',
        el: '1.36',
        na: '21',
        sq: 'Sc',
        nom: 'Escandio',
        con: '[Ar]4s2 3d1',
        pos: '4x3',
        grupo: "Metales de Transición",
        col: metalTransicion,
        clase: 'td-norm'
    };

    lista.push(e57);

    var e58 = {
        ma: '47.867',
        en: '658.8',
        el: '1.54',
        na: '22',
        sq: 'Ti',
        nom: 'Titanio',
        con: '[Ar]3d2 4s2',
        pos: '4x4',
        grupo: "Metales de Transición",
        col: metalTransicion,
        clase: 'td-norm'
    };

    lista.push(e58);

    var e59 = {
        ma: '50.9415',
        en: '650.9',
        el: '1.63',
        na: '23',
        sq: 'V',
        nom: 'Vanadio',
        con: '[Ar]3d3 4s2',
        pos: '4x5',
        grupo: "Metales de Transición",
        col: metalTransicion,
        clase: 'td-norm'
    };

    lista.push(e59);

    var e60 = {
        ma: '51.9962',
        en: '652.9',
        el: '1.66',
        na: '24',
        sq: 'Cr',
        nom: 'Cromo',
        con: '[Ar]3d5 4s1',
        pos: '4x6',
        grupo: "Metales de Transición",
        col: metalTransicion,
        clase: 'td-norm'
    };

    lista.push(e60);

    var e61 = {
        ma: '54.93804',
        en: '717.3',
        el: '1.55',
        na: '25',
        sq: 'Mn',
        nom: 'Manganeso',
        con: '[Ar]3d5 4s2',
        pos: '4x7',
        grupo: "Metales de Transición",
        col: metalTransicion,
        clase: 'td-norm'
    };

    lista.push(e61);

    var e62 = {
        ma: '55.845',
        en: '762.5',
        el: '1.83',
        na: '26',
        sq: 'Fe',
        nom: 'Hierro',
        con: '[Ar]3d6 4s2',
        pos: '4x8',
        grupo: "Metales de Transición",
        col: metalTransicion,
        clase: 'td-norm'
    };

    lista.push(e62);

    var e63 = {
        ma: '58.93319',
        en: '760.4',
        el: '1.91',
        na: '27',
        sq: 'Co',
        nom: 'Cobalto',
        con: '[Ar]3d7 4s2',
        pos: '4x9',
        grupo: "Metales de Transición",
        col: metalTransicion,
        clase: 'td-norm'
    };

    lista.push(e63);

    var e64 = {
        ma: '58.6934',
        en: '737.1',
        el: '1.88',
        na: '28',
        sq: 'Ni',
        nom: 'Níquel',
        con: '[Ar]4s2 3d8',
        pos: '4x10',
        grupo: "Metales de Transición",
        col: metalTransicion,
        clase: 'td-norm'
    };

    lista.push(e64);

    var e65 = {
        ma: '63.546',
        en: '745.5',
        el: '1.90',
        na: '29',
        sq: 'Cu',
        nom: 'Cobre',
        con: '[Ar]3d10 4s1',
        pos: '4x11',
        grupo: "Metales de Transición",
        col: metalTransicion,
        clase: 'td-norm'
    };

    lista.push(e65);

    var e66 = {
        ma: '65.38',
        en: '906.4',
        el: '1.65',
        na: '30',
        sq: 'Zn',
        nom: 'Zinc',
        con: '[Ar]3d10 4s2',
        pos: '4x12',
        grupo: "Metales de Transición",
        col: metalTransicion,
        clase: 'td-norm'
    };

    lista.push(e66);

    var e67 = {
        ma: '69.723',
        en: '578.8',
        el: '1.81',
        na: '31',
        sq: 'Ga',
        nom: 'Galio',
        con: '[Ar]3d10 4s2 4p1',
        pos: '4x13',
        grupo: "Otros Metales",
        col: otrosMetalaes,
        clase: 'td-norm'
    };

    lista.push(e67);

    var e68 = {
        ma: '72.64',
        en: '762.0',
        el: '2.01',
        na: '32',
        sq: 'Ge',
        nom: 'Germanio',
        con: '[Ar]3d10 4s2 4p2',
        pos: '4x14',
        grupo: "Metaloides",
        col: metaloides,
        clase: 'td-norm'
    };

    lista.push(e68);

    var e69 = {
        ma: '74.92160',
        en: '947.0',
        el: '2.18',
        na: '33',
        sq: 'As',
        nom: 'Arsénico',
        con: '[Ar]4s2 3d10 4p3',
        pos: '4x15',
        grupo: "Metaloides",
        col: metaloides,
        clase: 'td-norm'
    };

    lista.push(e69);

    var e70 = {
        ma: '78.96',
        en: '941.0',
        el: '2.55',
        na: '34',
        sq: 'Se',
        nom: 'Selenio',
        con: '[Ar]3d10 4s2 4p3',
        pos: '4x16',
        grupo: "No Metales",
        col: noMetalicos,
        clase: 'td-norm'
    };

    lista.push(e70);

    var e71 = {
        ma: '79.904',
        en: '1139.9',
        el: '2.96',
        na: '35',
        sq: 'Br',
        nom: 'Bromo',
        con: '[Ar]4s2 3d10 4p5',
        pos: '4x17',
        grupo: "Halógenos",
        col: alogenos,
        clase: 'td-norm'
    };

    lista.push(e71);

    var e72 = {
        ma: '83.798',
        en: '1350.8',
        el: '3.00',
        na: '36',
        sq: 'Kr',
        nom: 'Kriptón',
        con: '[Ar]3d10 4s2 4p6',
        pos: '4x18',
        grupo: "Gases Nobles",
        col: gasesNobles,
        clase: 'td-norm'
    };

    lista.push(e72);

    var e73 = {
        ma: '85.4678',
        en: '403.0',
        el: '0.82',
        na: '37',
        sq: 'Rb',
        nom: 'Rubidio',
        con: '[Kr]5s1',
        pos: '5x1',
        grupo: "Metales Alcalinos",
        col: metalAlcalinos,
        clase: 'td-norm'
    };

    lista.push(e73);

    var e74 = {
        ma: '87.62',
        en: '549.5',
        el: '0.95',
        na: '38',
        sq: 'Sr',
        nom: 'Estroncio',
        con: '[Kr]5s2',
        pos: '5x2',
        grupo: "Alcalinotérreos",
        col: alcalinoterros,
        clase: 'td-norm'
    };

    lista.push(e74);

    var e75 = {
        ma: '88.90585',
        en: '600.0',
        el: '1.22',
        na: '39',
        sq: 'Y',
        nom: 'Itrio',
        con: '[Kr]4d1 5s2',
        pos: '5x3',
        grupo: "Metales de Transición",
        col: metalTransicion,
        clase: 'td-norm'
    };

    lista.push(e75);

    var e76 = {
        ma: '91.224',
        en: '640.1',
        el: '1.33',
        na: '40',
        sq: 'Zr',
        nom: 'Zirconio',
        con: '[Kr] 4d2 5s2',
        pos: '5x4',
        grupo: "Metales de Transición",
        col: metalTransicion,
        clase: 'td-norm'
    };

    lista.push(e76);

    var e77 = {
        ma: '92.90638',
        en: '652.1',
        el: '1.60',
        na: '41',
        sq: 'Nb',
        nom: 'Niobio',
        con: '[Kr]4d4 5s1',
        pos: '5x5',
        grupo: "Metales de Transición",
        col: metalTransicion,
        clase: 'td-norm'
    };

    lista.push(e77);

    var e78 = {
        ma: '95.96',
        en: '684.3',
        el: '2.16',
        na: '42',
        sq: 'Mo',
        nom: 'Molibdeno',
        con: '[Kr]4d5 5s1',
        pos: '5x6',
        grupo: "Metales de Transición",
        col: metalTransicion,
        clase: 'td-norm'
    };

    lista.push(e78);

    var e79 = {
        ma: '98',
        en: '702.0',
        el: '1.90',
        na: '43',
        sq: 'Tc',
        nom: 'Tecnecio',
        con: '[Kr]4d5 5s2',
        pos: '5x7',
        grupo: "Metales de Transición",
        col: metalTransicion,
        clase: 'td-norm'
    };

    lista.push(e79);

    var e80 = {
        ma: '101.07',
        en: '710.2',
        el: '2.20',
        na: '44',
        sq: 'Ru',
        nom: 'Rutenio',
        con: '[Kr]4d7 5s1',
        pos: '5x8',
        grupo: "Metales de Transición",
        col: metalTransicion,
        clase: 'td-norm'
    };

    lista.push(e80);

    var e81 = {
        ma: '102.9055',
        en: '719.7',
        el: '2.28',
        na: '45',
        sq: 'Rh',
        nom: 'Rodio',
        con: '[Kr] 5s1 4d8',
        pos: '5x9',
        grupo: "Metales de Transición",
        col: metalTransicion,
        clase: 'td-norm'
    };

    lista.push(e81);

    var e82 = {
        ma: '106.42',
        en: '804.4',
        el: '2.20',
        na: '46',
        sq: 'Pd',
        nom: 'Paladio',
        con: '[Kr]5s2 4f8',
        pos: '5x10',
        grupo: "Metales de Transición",
        col: metalTransicion,
        clase: 'td-norm'
    };

    lista.push(e82);

    var e83 = {
        ma: '107.8682',
        en: '731.0',
        el: '2.20',
        na: '47',
        sq: 'Ag',
        nom: 'Plata',
        con: '[Kr]4d10 5s1',
        pos: '5x11',
        grupo: "Metales de Transición",
        col: metalTransicion,
        clase: 'td-norm'
    };

    lista.push(e83);

    var e84 = {
        ma: '112.441',
        en: '867.8',
        el: '1.69',
        na: '48',
        sq: 'Cd',
        nom: 'Cadmio',
        con: '[Kr]4d10 5s2',
        pos: '5x12',
        grupo: "Metales de Transición",
        col: metalTransicion,
        clase: 'td-norm'
    };

    lista.push(e84);

    var e85 = {
        ma: '114.818',
        en: '558.3',
        el: '1.78',
        na: '49',
        sq: 'In',
        nom: 'Indio',
        con: '[Kr]4d10 5s2 5p1',
        pos: '5x13',
        grupo: "Otros Metales",
        col: otrosMetalaes,
        clase: 'td-norm'
    };

    lista.push(e85);

    var e86 = {
        ma: '118.710',
        en: '708.6',
        el: '1.96',
        na: '50',
        sq: 'Sn',
        nom: 'Estaño',
        con: '[Kr]4d10 5s2 5p2',
        pos: '5x14',
        grupo: "Otros Metales",
        col: otrosMetalaes,
        clase: 'td-norm'
    };

    lista.push(e86);

    var e87 = {
        ma: '121.760',
        en: '834.0',
        el: '2.05',
        na: '51',
        sq: 'Sb',
        nom: 'Antimonio',
        con: '[Kr]4d10 5s2 5p3',
        pos: '5x15',
        grupo: "Metaloides",
        col: metaloides,
        clase: 'td-norm'
    };

    lista.push(e87);

    var e88 = {
        ma: '127.60',
        en: '869.3',
        el: '2.10',
        na: '52',
        sq: 'Te',
        nom: 'Telurio',
        con: '[Kr]4d10 5s2 5p41',
        pos: '5x16',
        grupo: "Metaloides",
        col: metaloides,
        clase: 'td-norm'
    };

    lista.push(e88);

    var e89 = {
        ma: '126.9044',
        en: '1008.4',
        el: '2.66',
        na: '53',
        sq: 'I',
        nom: 'Yodo',
        con: '[Kr]4d10 5s2 5p5',
        pos: '5x17',
        grupo: "Halógenos",
        col: alogenos,
        clase: 'td-norm'
    };

    lista.push(e89);

    var e90 = {
        ma: '131.293',
        en: '1170.4',
        el: '2.60',
        na: '54',
        sq: 'Xe',
        nom: 'Xenón',
        con: '[Kr]5s2 4d10 5p6',
        pos: '5x18',
        grupo: "Gases Nobles",
        col: gasesNobles,
        clase: 'td-norm'
    };

    lista.push(e90);

    var e91 = {
        ma: '132.9054',
        en: '375.7',
        el: '0079',
        na: '55',
        sq: 'Cs',
        nom: 'Cesio',
        con: '[Xe]6s1',
        pos: '6x1',
        grupo: "Metales Alcalinos",
        col: metalAlcalinos,
        clase: 'td-norm'
    };

    lista.push(e91);

    var e92 = {
        ma: '137.327',
        en: '502.9',
        el: '0.89',
        na: '56',
        sq: 'Ba',
        nom: 'Bario',
        con: '[Xe]6s2',
        pos: '6x2',
        grupo: "Alcalinotérreos",
        col: alcalinoterros,
        clase: 'td-norm'
    };

    lista.push(e92);

    var e93 = {
        ma: '174.9668',
        en: '523.5',
        el: '1.27',
        na: '71',
        sq: 'Lu',
        nom: 'Lutecio',
        con: '[Xe]4p4 5d1 6s2',
        pos: '6x3',
        grupo: "Metales de Transición",
        col: metalTransicion,
        clase: 'td-norm'
    };

    lista.push(e93);

    var e94 = {
        ma: '178.49',
        en: '658.5',
        el: '1.30',
        na: '72',
        sq: 'Hf',
        nom: 'Hafnio',
        con: '[Xe]4f14 5d2 6s2',
        pos: '6x4',
        grupo: "Metales de Transición",
        col: metalTransicion,
        clase: 'td-norm'
    };

    lista.push(e94);

    var e95 = {
        ma: '180.9478',
        en: '761.0',
        el: '1.50',
        na: '73',
        sq: 'Ta',
        nom: 'Tantalio',
        con: '[Xe]4f14 5d3 6s2',
        pos: '6x5',
        grupo: "Metales de Transición",
        col: metalTransicion,
        clase: 'td-norm'
    };

    lista.push(e95);

    var e96 = {
        ma: '183.84',
        en: '770.0',
        el: '2.36',
        na: '74',
        sq: 'W',
        nom: 'Wolframio',
        con: '[Xe]4p4 5d4 6s2',
        pos: '6x6',
        grupo: "Metales de Transición",
        col: metalTransicion,
        clase: 'td-norm'
    };

    lista.push(e96);

    var e97 = {
        ma: '186.207',
        en: '760.0',
        el: '1.90',
        na: '75',
        sq: 'Re',
        nom: 'Renio',
        con: '[Xe]4p14 5d5 6s2',
        pos: '6x7',
        grupo: "Metales de Transición",
        col: metalTransicion,
        clase: 'td-norm'
    };

    lista.push(e97);

    var e98 = {
        ma: '190.23',
        en: '760.0',
        el: '1.90',
        na: '76',
        sq: 'Os',
        nom: 'Osmio',
        con: '[Xe]4p14 5d6 6s2',
        pos: '6x8',
        grupo: "Metales de Transición",
        col: metalTransicion,
        clase: 'td-norm'
    };

    lista.push(e98);

    var e99 = {
        ma: '192.217',
        en: '880.0',
        el: '2.20',
        na: '77',
        sq: 'Ir',
        nom: 'Iridio',
        con: '[Xe]4p14 5d7 6s2',
        pos: '6x9',
        grupo: "Metales de Transición",
        col: metalTransicion,
        clase: 'td-norm'
    };

    lista.push(e99);

    var e100 = {
        ma: '195.084',
        en: '70.0',
        el: '2.28',
        na: '78',
        sq: 'Pt',
        nom: 'Platino',
        con: '[Xe]4p14 5d9 6s1',
        pos: '6x10',
        grupo: "Metales de Transición",
        col: metalTransicion,
        clase: 'td-norm'
    };

    lista.push(e100);

    var e101 = {
        ma: '196.9665',
        en: '890.1',
        el: '2.54',
        na: '79',
        sq: 'Au',
        nom: 'Oro',
        con: '[Xe]4f14 5d10 6s1',
        pos: '6x11',
        grupo: "Metales de Transición",
        col: metalTransicion,
        clase: 'td-norm'
    };

    lista.push(e101);

    var e102 = {
        ma: '200.59',
        en: '1007.1',
        el: '2.00',
        na: '80',
        sq: 'Hg',
        nom: 'Mercurio',
        con: '[Xe]4f14 5d10 6s2',
        pos: '6x12',
        grupo: "Metales de Transición",
        col: metalTransicion,
        clase: 'td-norm'
    };

    lista.push(e102);

    var e103 = {
        ma: '204.3833',
        en: '589.4',
        el: '1.62',
        na: '81',
        sq: 'Tl',
        nom: 'Talio',
        con: '[Xe]4f14 5d10 6s2 6p1',
        pos: '6x13',
        grupo: "Otros Metales",
        col: otrosMetalaes,
        clase: 'td-norm'
    };

    lista.push(e103);

    var e104 = {
        ma: '207.2',
        en: '715.6',
        el: '2.33',
        na: '82',
        sq: 'Pb',
        nom: 'Plomo',
        con: '[Xe]4f14 5d10 6s2 6p2',
        pos: '6x14',
        grupo: "Otros Metales",
        col: otrosMetalaes,
        clase: 'td-norm'
    };

    lista.push(e104);

    var e105 = {
        ma: '208.9804',
        en: '703.0',
        el: '2.02',
        na: '83',
        sq: 'Bi',
        nom: 'Bismuto',
        con: '[Xe]4f14 5d10 6s2 6p3',
        pos: '6x15',
        grupo: "Otros Metales",
        col: otrosMetalaes,
        clase: 'td-norm'
    };

    lista.push(e105);

    var e106 = {
        ma: '(210)',
        en: '812.1',
        el: '2.00',
        na: '84',
        sq: 'Po',
        nom: 'Polonio',
        con: '[Xe]4f14 5d10 6s2 6p4',
        pos: '6x16',
        grupo: "Metaloides",
        col: metaloides,
        clase: 'td-norm'
    };

    lista.push(e106);

    var e107 = {
        ma: '(210)',
        en: '890.0',
        el: '2.20',
        na: '85',
        sq: 'At',
        nom: 'Astato',
        con: '[Xe]4f14 5d10 6s2 6p5',
        pos: '6x17',
        grupo: "Halógenos",
        col: alogenos,
        clase: 'td-norm'
    };

    lista.push(e107);

    var e108 = {
        ma: '(220)',
        en: '1037.0',
        el: '',
        na: '86',
        sq: 'Rn',
        nom: 'Radón',
        con: '[Xe]4f14 5d10 6s2 6p6',
        pos: '6x18',
        grupo: "Gases Nobles",
        col: gasesNobles,
        clase: 'td-norm'
    };

    lista.push(e108);

    var e109 = {
        ma: '(223)',
        en: '380.0',
        el: '0.70',
        na: '87',
        sq: 'Fr',
        nom: 'Francio',
        con: '[Rn]7s1',
        pos: '7x1',
        grupo: "Metales Alcalinos",
        col: metalAlcalinos,
        clase: 'td-norm'
    };

    lista.push(e109);

    var e110 = {
        ma: '(226)',
        en: '509.3',
        el: '0.90',
        na: '88',
        sq: 'Ra',
        nom: 'Radio',
        con: '[Rn]7s2',
        pos: '7x2',
        grupo: "Alcalinotérreos",
        col: alcalinoterros,
        clase: 'td-norm'
    };

    lista.push(e110);

    var e111 = {
        ma: '(262)',
        en: '470.0',
        el: '',
        na: '103',
        sq: 'Lr',
        nom: 'Laurencio',
        con: '[Rn]7s2 7s2 7p1',
        pos: '7x3',
        grupo: "Metales de Transición",
        col: metalTransicion,
        clase: 'td-norm'
    };

    lista.push(e111);

    var e112 = {
        ma: '(261)',
        en: '580.0',
        el: '',
        na: '104',
        sq: 'Rf',
        nom: 'Rutherfordio',
        con: '[Rn]7s2 7s2 7p2',
        pos: '7x4',
        grupo: "Metales de Transición",
        col: metalTransicion,
        clase: 'td-norm'
    };

    lista.push(e112);

    var e113 = {
        ma: '(262)',
        en: '',
        el: '',
        na: '105',
        sq: 'Db',
        nom: 'Dubnio',
        con: '',
        pos: '7x5',
        grupo: "Metales de Transición",
        col: metalTransicion,
        clase: 'td-norm'
    };

    lista.push(e113);

    var e114 = {
        ma: '(266)',
        en: '',
        el: '',
        na: '106',
        sq: 'Sg',
        nom: 'Seaborgio',
        con: '',
        pos: '7x6',
        grupo: "Metales de Transición",
        col: metalTransicion,
        clase: 'td-norm'
    };

    lista.push(e114);

    var e115 = {
        ma: '(264)',
        en: '',
        el: '',
        na: '107',
        sq: 'Bh',
        nom: 'Bohrio',
        con: '',
        pos: '7x7',
        grupo: "Metales de Transición",
        col: metalTransicion,
        clase: 'td-norm'
    };

    lista.push(e115);

    var e116 = {
        ma: '(277)',
        en: '',
        el: '',
        na: '108',
        sq: 'Hs',
        nom: 'Hassio',
        con: '',
        pos: '7x8',
        grupo: "Metales de Transición",
        col: metalTransicion,
        clase: 'td-norm'
    };

    lista.push(e116);

    var e117 = {
        ma: '(268)',
        en: '',
        el: '',
        na: '109',
        sq: 'Mt',
        nom: 'Meitnerio',
        con: '',
        pos: '7x9',
        grupo: "Metales de Transición",
        col: metalTransicion,
        clase: 'td-norm'
    };

    lista.push(e117);

    var e118 = {
        ma: '(271)',
        en: '',
        el: '',
        na: '110',
        sq: 'Ds',
        nom: 'Darmstadio',
        con: '',
        pos: '7x10',
        grupo: "Metales de Transición",
        col: metalTransicion,
        clase: 'td-norm'
    };

    lista.push(e118);

    var e119 = {
        ma: '(272)',
        en: '',
        el: '',
        na: '111',
        sq: 'Rg',
        nom: 'Roentgenio',
        con: '',
        pos: '7x11',
        grupo: "Metales de Transición",
        col: metalTransicion,
        clase: 'td-norm'
    };

    lista.push(e119);

    var e120 = {
        ma: '(285)',
        en: '',
        el: '',
        na: '112',
        sq: 'Cn',
        nom: 'Copernicio',
        con: '',
        pos: '7x12',
        grupo: "Metales de Transición",
        col: metalTransicion,
        clase: 'td-norm'
    };

    lista.push(e120);

    var e121 = {
        ma: '(284)',
        en: '',
        el: '',
        na: '113',
        sq: 'Uut',
        nom: 'Ununtrio',
        con: '',
        pos: '7x13',
        grupo: "Elementos Desconocidos",
        col: elementosDesconocidos,
        clase: 'td-norm'
    };

    lista.push(e121);

    var e122 = {
        ma: '(286)',
        en: '',
        el: '',
        na: '114',
        sq: 'Fl',
        nom: 'Flerovio',
        con: '',
        pos: '7x14',
        grupo: "Elementos Desconocidos",
        col: elementosDesconocidos,
        clase: 'td-norm'
    };

    lista.push(e122);

    var e123 = {
        ma: '(288)',
        en: '',
        el: '',
        na: '115',
        sq: 'Uup',
        nom: 'Unumpentioo',
        con: '',
        pos: '7x15',
        grupo: "Elementos Desconocidos",
        col: elementosDesconocidos,
        clase: 'td-norm'
    };

    lista.push(e123);

    var e124 = {
        ma: '(292)',
        en: '',
        el: '',
        na: '116',
        sq: 'Lv',
        nom: 'Livermorio',
        con: '',
        pos: '7x16',
        grupo: "Elementos Desconocidos",
        col: elementosDesconocidos,
        clase: 'td-norm'
    };

    lista.push(e124);

    var e125 = {
        ma: '',
        en: '',
        el: '',
        na: '117',
        sq: 'Uus',
        nom: 'Ununseptio',
        con: '',
        pos: '7x17',
        grupo: "Elementos Desconocidos",
        col: elementosDesconocidos,
        clase: 'td-norm'
    };

    lista.push(e125);

    var e126 = {
        ma: '(294)',
        en: '',
        el: '',
        na: '118',
        sq: 'Uuo',
        nom: 'Ununoctio',
        con: '',
        pos: '7x18',
        grupo: "Elementos Desconocidos",
        col: elementosDesconocidos,
        clase: 'td-norm'
    };

    lista.push(e126);

    var contador = 0;
    var tabla = $("#tablaP");
    var contenido = '<table id="test1">';

    for (var fila = 1; fila <= 7; fila++) {
        contenido += '<tr>';
        for (var colu = 1; colu <= 18; colu++) {
            contenido += '<td class=' + lista[contador].clase + '><div onclick="verificar(this, \''+lista[contador].grupo+'\', \''+lista[contador].col+'\')" class="caja-id"><div class="caja-top"><div class="caja-top-rigth"><p>' + lista[contador].na + '</p></div></div><!-- CENTRITO --><div class="caja-centro"><div class="caja-centro-left"><div class="caja-centro-left-top"><p>' + lista[contador].sq + '</p></div><div class="caja-centro-left-bottom"><p>' + lista[contador].nom + '</p></div></div></div><!-- BOTTOMCITO --></div></td>'
            contador++;
        }
        contenido += '</tr>';
    }

    contenido += '</table>';
    tabla.append(contenido);
    // ---------------
    //     TABLITA 2
    // ---------------

    var lista2 = new Array();

    for (var z = 0; z < 22; z++) {
        lista2.push(blanco);
    }

    var ee23 = {
        ma: '138.9054',
        en: '538.1',
        el: '1.10',
        na: '57',
        sq: 'La',
        nom: 'Lantano',
        con: '[Xe]5d1 6s1',
        pos: '2x5',
        grupo: "Lantánidos",
        col: lantanidos,
        clase: 'td-norm'
    };

    lista2.push(ee23);

    var ee24 = {
        ma: '140.116',
        en: '534.4',
        el: '1.12',
        na: '58',
        sq: 'Ce',
        nom: 'Cerio',
        con: '[Xe]4f1 5d1 6s2',
        pos: '2x6',
        grupo: "Lantánidos",
        col: lantanidos,
        clase: 'td-norm'
    };

    lista2.push(ee24);

    var ee25 = {
        ma: '140.9076',
        en: '527.0',
        el: '1.13',
        na: '59',
        sq: 'Pr',
        nom: 'praseodimio',
        con: '[Xe]4f3 6s2',
        pos: '2x7',
        grupo: "Lantánidos",
        col: lantanidos,
        clase: 'td-norm'
    };

    lista2.push(ee25);

    var ee26 = {
        ma: '144.242',
        en: '533.1',
        el: '1.14',
        na: '60',
        sq: 'Nd',
        nom: 'Neodimio',
        con: '4f4 6s2',
        pos: '2x8',
        grupo: "Lantánidos",
        col: lantanidos,
        clase: 'td-norm'
    };

    lista2.push(ee26);

    var ee27 = {
        ma: '(145)',
        en: '540.0',
        el: '',
        na: '60',
        sq: 'Pm',
        nom: 'Prometio',
        con: '[Xe]4f5 6s2',
        pos: '2x9',
        grupo: "Lantánidos",
        col: lantanidos,
        clase: 'td-norm'
    };

    lista2.push(ee27);

    var ee28 = {
        ma: '150.36',
        en: '544.5',
        el: '1.17',
        na: '62',
        sq: 'Sm',
        nom: 'Samario',
        con: '[Xe]4f6 6s2',
        pos: '2x10',
        grupo: "Lantánidos",
        col: lantanidos,
        clase: 'td-norm'
    };

    lista2.push(ee28);

    var ee29 = {
        ma: '151.964',
        en: '547.1',
        el: '',
        na: '63',
        sq: 'Eu',
        nom: 'Europio',
        con: '[Xe]4f7 6s2',
        pos: '2x11',
        grupo: "Lantánidos",
        col: lantanidos,
        clase: 'td-norm'
    };

    lista2.push(ee29);

    var ee30 = {
        ma: '157.25',
        en: '593.4',
        el: '1.20',
        na: '64',
        sq: 'Gd',
        nom: 'Gadolionio',
        con: '[Xe]4f7 5d1 6s1  ',
        pos: '2x12',
        grupo: "Lantánidos",
        col: lantanidos,
        clase: 'td-norm'
    };

    lista2.push(ee30);

    var ee31 = {
        ma: '157.9253',
        en: '565.8',
        el: '1.20',
        na: '64',
        sq: 'Tb',
        nom: 'Terbio',
        con: '[Xe]4f9 5d1 6s2',
        pos: '2x13',
        grupo: "Lantánidos",
        col: lantanidos,
        clase: 'td-norm'
    };

    lista2.push(ee31);

    var ee32 = {
        ma: '162.500',
        en: '573.0',
        el: '1.22',
        na: '65',
        sq: 'Dy',
        nom: 'Disprosio',
        con: '[Xe]4f10 6s2',
        pos: '2x14',
        grupo: "Lantánidos",
        col: lantanidos,
        clase: 'td-norm'
    };

    lista2.push(ee32);

    var ee33 = {
        ma: '164.500',
        en: '573.0',
        el: '1.22',
        na: '68',
        sq: 'Ho',
        nom: 'Holmio',
        con: '[Xe]4f11 6s2',
        pos: '2x15',
        grupo: "Lantánidos",
        col: lantanidos,
        clase: 'td-norm'
    };

    lista2.push(ee33);

    var ee34 = {
        ma: '167.259',
        en: '589.3',
        el: '1.24',
        na: '68',
        sq: 'Er',
        nom: 'Erbio',
        con: '[Xe]4f12 6s2',
        pos: '2x16',
        grupo: "Lantánidos",
        col: lantanidos,
        clase: 'td-norm'
    };

    lista2.push(ee34);

    var ee35 = {
        ma: '168.9342',
        en: '589.3',
        el: '1.24',
        na: '69',
        sq: 'Tm',
        nom: 'Tulio',
        con: '[Xe]4f13 6s2',
        pos: '2x17',
        grupo: "Lantánidos",
        col: lantanidos,
        clase: 'td-norm'
    };

    lista2.push(ee35);

    var ee36 = {
        ma: '173.054',
        en: '603.4',
        el: '',
        na: '70',
        sq: 'Yb',
        nom: 'Iterbio',
        con: '[Xe]4f14 6s2',
        pos: '2x18',
        grupo: "Lantánidos",
        col: lantanidos,
        clase: 'td-norm'
    };

    lista2.push(ee36);

    for (var z = 0; z < 4; z++) {
        lista2.push(blanco);
    }

    //Comienzo Actínidoss

    var ee41 = {
        ma: '138.9054',
        en: '538.1',
        el: '1.10',
        na: '89',
        sq: 'Ac',
        nom: 'Actinio',
        con: '[Rn]6d1 7s2 ',
        pos: '3x5',
        grupo: "Actínidos",
        col: actinidos,
        clase: 'td-norm'
    };

    lista2.push(ee41);

    var ee42 = {
        ma: '232.0380',
        en: '587.0',
        el: '1.30',
        na: '90',
        sq: 'Th',
        nom: 'Torio',
        con: '[Rn] 6d2 7s2',
        pos: '3x6',
        grupo: "Actínidos",
        col: actinidos,
        clase: 'td-norm'
    };

    lista2.push(ee42);

    var ee43 = {
        ma: '231.0358',
        en: '569.0',
        el: '1.50',
        na: '91',
        sq: 'Pa',
        nom: 'Protactinio',
        con: '[Rn]5f2 6d1 7s2',
        pos: '3x7',
        grupo: "Actínidos",
        col: actinidos,
        clase: 'td-norm'
    };

    lista2.push(ee43);

    var ee44 = {
        ma: '238.0289',
        en: '597.6',
        el: '1.38',
        na: '92',
        sq: 'U',
        nom: 'Uranio',
        con: '[Rn]5f3 6d1 7s2',
        pos: '3x8',
        grupo: "Actínidos",
        col: actinidos,
        clase: 'td-norm'
    };

    lista2.push(ee44);

    var ee45 = {
        ma: '(237)',
        en: '604.5',
        el: '1.36',
        na: '93',
        sq: 'Np',
        nom: 'Neptunio',
        con: '[Rn]5f4 6d1 7s2',
        pos: '3x9',
        grupo: "Actínidos",
        col: actinidos,
        clase: 'td-norm'
    };

    lista2.push(ee45);

    var ee46 = {
        ma: '(244)',
        en: '584.7',
        el: '1.28',
        na: '94',
        sq: 'Pu',
        nom: 'Plutonio',
        con: '[Rn] 5f6 7s2',
        pos: '3x10',
        grupo: "Actínidos",
        col: actinidos,
        clase: 'td-norm'
    };

    lista2.push(ee46);

    var ee47 = {
        ma: '(243)',
        en: '578.0',
        el: '1.30',
        na: '95',
        sq: 'Am',
        nom: 'Americio',
        con: '[Rn] 5f7 7s2',
        pos: '3x11',
        grupo: "Actínidos",
        col: actinidos,
        clase: 'td-norm'
    };

    lista2.push(ee47);


    var ee48 = {
        ma: '(247)',
        en: '581.0',
        el: '1.30',
        na: '96',
        sq: 'Cm',
        nom: 'Curio',
        con: '[Rn]5f7 6d1 7s2',
        pos: '3x12',
        grupo: "Actínidos",
        col: actinidos,
        clase: 'td-norm'
    };

    lista2.push(ee48);


    var ee49 = {
        ma: '(247)',
        en: '601.0',
        el: '1.30',
        na: '97',
        sq: 'Bk',
        nom: 'Berkelio',
        con: '[Rn] 5f9 7s2',
        pos: '3x13',
        grupo: "Actínidos",
        col: actinidos,
        clase: 'td-norm'
    };

    lista2.push(ee49);


    var ee50 = {
        ma: '(251)',
        en: '608.0',
        el: '1.30',
        na: '98',
        sq: 'Cf',
        nom: 'Californio',
        con: '[Rn]5f10 7s2',
        pos: '3x14',
        grupo: "Actínidos",
        col: actinidos,
        clase: 'td-norm'
    };

    lista2.push(ee50);


    var ee51 = {
        ma: '(252)',
        en: '619.0',
        el: '1.30',
        na: '99',
        sq: 'Es',
        nom: 'Einstenio',
        con: '[Rn] 5f11 7s2',
        pos: '3x15',
        grupo: "Actínidos",
        col: actinidos,
        clase: 'td-norm'
    };

    lista2.push(ee51);


    var ee52 = {
        ma: '(257)',
        en: '627.0',
        el: '1.30',
        na: '100',
        sq: 'Fm',
        nom: 'Fermio',
        con: '[Rn] 5f12 7s2',
        pos: '3x16',
        grupo: "Actínidos",
        col: actinidos,
        clase: 'td-norm'
    };

    lista2.push(ee52);


    var ee53 = {
        ma: '(258)',
        en: '635.0',
        el: '1.30',
        na: '101',
        sq: 'Md',
        nom: 'Mendelevio',
        con: '[Rn] 5f13 7s2',
        pos: '3x17',
        grupo: "Actínidos",
        col: actinidos,
        clase: 'td-norm'
    };

    lista2.push(ee53);


    var ee54 = {
        ma: '(259)',
        en: '642.0',
        el: '1.30',
        na: '102',
        sq: 'No',
        nom: 'Nobelio',
        con: '[Rn] 5f14 7s2',
        pos: '3x18',
        grupo: "Actínidos",
        col: actinidos,
        clase: 'td-norm'
    };

    lista2.push(ee54);

    elementos_array = lista.concat(lista2);
    

    // Fin de elementos tabla periodica

    var contador2 = 0;

    var tabla2 = $("#tablaS");
    var contenido2 = '<table id="test2">';
    for (var fila = 1; fila <= 3; fila++) {
        contenido2 += '<tr>';
        for (var colu = 1; colu <= 18; colu++) {
            contenido2 += '<td class=' + lista2[contador2].clase + '><div onclick="verificar(this, \''+lista2[contador2].grupo+'\', \''+lista2[contador2].col+'\')" class="caja-id" style="background-color: white"><div class="caja-top"><div class="caja-top-left"></div><div class="caja-top-rigth"><p>' + lista2[contador2].na + '</p></div></div><!-- CENTRITO --><div class="caja-centro"><div class="caja-centro-left"><div class="caja-centro-left-top"><p>' + lista2[contador2].sq + '</p></div><div class="caja-centro-left-bottom"><p>' + lista2[contador2].nom + '</p></div></div></div><!-- BOTTOMCITO --></div></td>'
            contador2++;
        }
        contenido2 += '</tr>';
    }
    contenido2 += '</table>';
    tabla2.append(contenido2);
}