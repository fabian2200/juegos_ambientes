// A javascript-enhanced crossword puzzle [c] Jesse Weisbeck, MIT/GPL
(function ($) {
  $(function () {
    // provide crossword entries in an array of objects like the following example
    // Position refers to the numerical order of an entry. Each position can have
    // two entries: an across entry and a down entry

    var crucigrama1 = [
      {
        clue: "Es un proceso biológico que permite la creación de nuevos organismos.",
        answer: "reproduccion",
        position: 2,
        orientation: "across",
        startx: 2,
        starty: 6,
      },
      {
        clue: "En este tipo de fecundación, la unión del espermatozoide y el gameto femenino se efectúa afuera del cuerpo de los progenitores",
        answer: "extena",
        position: 4,
        orientation: "across",
        startx: 3,
        starty: 10,
      },
      {
        clue: "Es poco común en animales y consiste en la alternancia de un ciclo con reproducción sexual seguido de otro asexual.",
        answer: "heterogonia",
        position: 6,
        orientation: "across",
        startx: 5,
        starty: 13,
      },
      {
        clue: "Producción de Gametos.",
        answer: "gametogenesis",
        position: 1,
        orientation: "down",
        startx: 3,
        starty: 3,
      },
      {
        clue: "Funsión de Gametos.",
        answer: "fecundacion",
        position: 3,
        orientation: "down",
        startx: 10,
        starty: 4,
      },
      {
        clue: "Proceso de reproducción asexual, que produce una yema como resultado del crecimiento y separación de una parte del cuerpo del organismo original",
        answer: "gemacion",
        position: 5,
        orientation: "down",
        startx: 6,
        starty: 12,
      },
    ];

    var puzzleData2 = [
      {
        clue: "Etapa del desarrollo humano que suele ocurrir entre los 10 y 15 años.",
        answer: "pubertad",
        position: 1,
        orientation: "across",
        startx: 4,
        starty: 7,
      },

      {
        clue: "Es el órgano copulador del varón",
        answer: "pene",
        position: 3,
        orientation: "across",
        startx: 6,
        starty: 15,
      },

      {
        clue: "Bolsa de piel que contiene los testículos. ",
        answer: "escroto",
        position: 4,
        orientation: "across",
        startx: 8,
        starty: 5,
      },

      {
        clue: "Órgano Femenino que albergará al feto o embrión durante la gestación.",
        answer: "utero",
        position: 5,
        orientation: "across",
        startx: 8,
        starty: 10,
      },
      {
        clue: "La función biológica primordial del aparato reproductor masculino.",
        answer: "reproduccion",
        position: 2,
        orientation: "down",
        startx: 8,
        starty: 4,
      },
      {
        clue: "Son los órganos contenedores de los óvulos.",
        answer: "ovarios",
        position: 6,
        orientation: "down",
        startx: 14,
        starty: 5,
      },
    ];

    var puzzleData3 = [
      {
        clue: "Nombre del recubrimiento uterino que se rompe y sale por la vagina en forma de sangre cuando no ocurre fecundación en las mujeres. ",
        answer: "endometrio",
        position: 1,
        orientation: "across",
        startx: 3,
        starty: 6,
      },
      {
        clue: "Nombre del proceso que permite la liberación de los espermatozoides en los hombres",
        answer: "eyaculacion",
        position: 4,
        orientation: "across",
        startx: 4,
        starty: 19,
      },
      {
        clue: "Proceso con el cual culmina naturalmente el embarazo en los humanos.  ",
        answer: "parto",
        position: 6,
        orientation: "across",
        startx: 10,
        starty: 9,
      },
      {
        clue: "Es la unión de un óvulo y un espermatozoide humanos ",
        answer: "fecundacion",
        position: 2,
        orientation: "down",
        startx: 3,
        starty: 5,
      },
      {
        clue: "Es el órgano que se desarrolla en la pared del útero y sirve de conexión entre la madre y el embrión ",
        answer: "cordonhumbilical",
        position: 3,
        orientation: "down",
        startx: 6,
        starty: 5,
      },
      {
        clue: "Nombre de la primera menstruación de una mujer.",
        answer: "menarquia",
        position: 5,
        orientation: "down",
        startx: 8,
        starty: 5,
      },
      {
        clue: "Órganos Femeninos encargados de liberan las hormonas femeninas como el estrógeno y progesterona.",
        answer: "ovarios",
        position: 7,
        orientation: "down",
        startx: 12,
        starty: 6,
      },
    ];

    var puzzleData4 = [
      {
        clue: "Sistema nervioso que está formado por el encéfalo y la médula espinal",
        answer: "central",
        position: 1,
        orientation: "across",
        startx: 3,
        starty: 6,
      },

      {
        clue: "Principales células altamente diferenciadas encargadas de recibir, conducir y transmitir señales por medio de corrientes eléctricas o impulsos nerviosos. ",
        answer: "neuronas",
        position: 3,
        orientation: "across",
        startx: 2,
        starty: 15,
      },
      {
        clue: "Tiene la función de conducir la señal eléctrica desde las dendritas hasta los botones sinápticos. En esos botones se liberarán los neurotransmisores para informar a la siguiente neurona.",
        answer: "axon",
        position: 6,
        orientation: "across",
        startx: 6,
        starty: 9,
      },
      {
        clue: "Son ramificaciones que se encuentran en las porciones distales de los axones, siendo estas estructuras las que generalmente entran en contacto con otras neuronas",
        answer: "dendritas",
        position: 2,
        orientation: "down",
        startx: 4,
        starty: 5,
      },

      {
        clue: "Su función es coordinar y controlar todas las actividades del cuerpo, conscientes e inconscientes. Recibe, analiza para enseguida emitir una respuesta al estímulo inicial que la provocó",
        answer: "sistemanervioso",
        position: 4,
        orientation: "down",
        startx: 6,
        starty: 3,
      },
      {
        clue: "También conocido como cuerpo celular es la zona en donde se “ordenan” y “coordinan” todas las funciones de la Neurona y contiene el núcleo de la misma.",
        answer: "soma",
        position: 5,
        orientation: "down",
        startx: 8,
        starty: 3,
      },
    ];

    var puzzleData5 = [
      {
        clue: "Parte de la nariz que separa verticalmente los orificios nasales, está compuesto por el hueso, cartílago y un revestimiento de mucosas.",
        answer: "tabiquenasal",
        position: 2,
        orientation: "across",
        startx: 2,
        starty: 7,
      },

      {
        clue: "Es la funcional principal de las aletas o cornetes nasales",
        answer: "humedecer",
        position: 4,
        orientation: "across",
        startx: 2 ,
        starty: 11,
      },
      {
        clue: "Son receptores que se estimulan por sustancias químicas en el aire, el agua o el alimento. La nariz y la boca los contienen",
        answer: "quimiorreceptores",
        position: 1,
        orientation: "down",
        startx: 5,
        starty: 3,
      },

      {
        clue: "Son receptores que responden a las vibraciones, la presión u a otros estímulos mecánicos.",
        answer: "mecanorreceptores",
        position: 3,
        orientation: "down",
        startx: 9,
        starty: 3,
      },
      {
        clue: "Órgano representativo de sistema Olfativo. ",
        answer: "nariz",
        position: 5,
        orientation: "down",
        startx: 12,
        starty: 6,
      },
    ];

    var puzzleData6 = [
      {
        clue: "La unidad funcional del sentido del gusto.",
        answer: "botongustativo",
        position: 2,
        orientation: "across",
        startx: 2,
        starty: 5,
      },

      {
        clue: "Es percibido en las regiones laterales y anteriores de la lengua, y se debe a la presencia de átomos de sodio o de potasio en la comida.",
        answer: "salado",
        position: 5,
        orientation: "across",
        startx: 10 ,
        starty: 9,
      },
      {
        clue: "Órgano musculoso de la boca y es el asiento principal del gusto y parte importantes en la fonación.",
        answer: "lengua",
        position: 1,
        orientation: "down",
        startx: 6,
        starty: 3,
      },

      {
        clue: "Nombre del sentido que permite percibir el sabor.",
        answer: "gusto",
        position: 3,
        orientation: "down",
        startx: 8,
        starty: 4,
      },
      {
        clue: "¿En la lengua los botones gustativos se agrupan formando?",
        answer: "papilas",
        position: 4,
        orientation: "down",
        startx: 11,
        starty: 4,
      },
      {
        clue: "Es percibido en la región lateral posterior de la lengua, y se debe a la presencia de cationes de hidrógeno en los alimentos.",
        answer: "agrio",
        position: 6,
        orientation: "down",
        startx: 13,
        starty: 2,
      },
      {
        clue: "Es el sabor que se percibe preferentemente en la punta de la lengua, y es asociado de manera natural con las fuentes de energía bioquímica, como los carbohidratos.",
        answer: "dulce",
        position: 7,
        orientation: "down",
        startx: 14,
        starty: 9,
      },
    ];

  let num = Math.floor((Math.random() * (6 - 1 + 1)) + 1);
  //  let num = 2;
    switch (num) {
      case 1:
        preguntas = crucigrama1;
        break;
      case 2:
        preguntas = puzzleData2;
        break;
      case 3:
        preguntas = puzzleData3;
        break;
      case 4:
        preguntas = puzzleData4;
        break;
      case 5:
        preguntas = puzzleData5;
        break;
      case 6:
        preguntas = puzzleData6;
        break;
    }

    $("#puzzle-wrapper").crossword(preguntas);
  });
})(jQuery);
