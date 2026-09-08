// A javascript-enhanced crossword puzzle [c] Jesse Weisbeck, MIT/GPL
(function ($) {
    $(function () {
        // provide crossword entries in an array of objects like the following example
        // Position refers to the numerical order of an entry. Each position can have
        // two entries: an across entry and a down entry

        var crucigrama1 = [
            {
                clue: "Líder de la Revolución Cubana. ",
                answer: "fidelcastro",
                position: 1,
                orientation: "across",
                startx: 3,
                starty: 3,
            },
            {
                clue: "Ciudad cubana donde se llevó a cabo la entrada triunfal de los revolucionarios en 1959.",
                answer: "habana",
                position: 2,
                orientation: "across",
                startx: 9,
                starty: 18,
            },
            {
                clue: "Partido el cual su propuesta era la huelga general y el fracasó en medio de la indiferencia popular y por la falta de apoyo de los sindicatos oficialistas y comunistas",
                answer: "socialista",
                position: 3,
                orientation: "across",
                startx: 5,
                starty: 9,
            },
            {
                clue: "Guerrillero argentino-cubano que desempeñó un papel importante en la Revolución.",
                answer: "ernestoguevara",
                position: 4,
                orientation: "down",
                startx: 6,
                starty: 3,
            },
            {
                clue: "Siglas del movimiento liderado por mujeres en apoyo a la Revolución.",
                answer: "fmc",
                position: 1,
                orientation: "down",
                startx: 3,
                starty: 3,
            },
            {
                clue: "El régimen político y social establecido en Cuba tras la Revolución Cubana.",
                answer: "socialista",
                position: 6,
                orientation: "down",
                startx: 12,
                starty: 9,
            },
            {
                clue: "Dictador cubano derrocado durante la Revolución.",
                answer: "batista",
                position: 7,
                orientation: "down",
                startx: 9,
                starty: 8,
            }
        ];

        var puzzleData2 = [
            {
                clue: "Nombre del presidente colombiano asesinado durante el Bogotazo.",
                answer: "gaitan",
                position: 1,
                orientation: "across",
                startx: 10,
                starty: 5,
            },
            {
                clue: "Nombre del colombiano que se hizo conocido por ser el asesino de Jorge Eliécer Gaitán, un prominente líder político y candidato presidencial de Colombia en la década de 1940.",
                answer: "juanroa",
                position: 3,
                orientation: "across",
                startx: 4,
                starty: 17,
            },
            {
                clue: "El Partido Conservador estaba compuesto por las clases",
                answer: "priviligiadas",
                position: 4,
                orientation: "across",
                startx: 2,
                starty: 12,
            },
            {
                clue: "Ciudad colombiana donde se produjo el Bogotazo.",
                answer: "bogota",
                position: 6,
                orientation: "across",
                startx: 5,
                starty: 14,
            },

            {
                clue: "Partido que nacio como representación de la clase mercantil y proponía una organización descentralizada del país, la separación entre la Iglesia y el Estado y un sistema económico de libre mercado.",
                answer: "liberal",
                position: 2,
                orientation: "down",
                startx: 12,
                starty: 4,
            },
            {
                clue: "Estallido de violencia que tuvo lugar en la capital colombiana y acabó extendiéndose a otras zonas del país. El motivo de estas revueltas fue el asesinato del líder político liberal Jorge Eliécer Gaitán.",
                answer: "bogotazo",
                position: 5,
                orientation: "down",
                startx: 9,
                starty: 10,
            },
            {
                clue: "¿Bajo el gobierno de que presidente se dio el bogotazo?",
                answer: "marianoospina",
                position: 7,
                orientation: "down",
                startx: 14,
                starty: 4,
            },
        ];

        var puzzleData3 = [
            {
                clue: "¿Quién gobernaba Cuba antes del triunfo de la Revolución Cubana?",
                answer: "batista",
                position: 1,
                orientation: "across",
                startx: 3,
                starty: 4,
            },
            {
                clue: "Ideología de La Revolución Cubana.",
                answer: "socialista",
                position: 2,
                orientation: "across",
                startx: 3,
                starty: 16,
            },
            {
                clue: "Logro de la revolucion Cubano por fidel castro",
                answer: "salud",
                position: 3,
                orientation: "across",
                startx: 7,
                starty: 13,
            },
            {
                clue: "¿Cuál era el nombre del yate en el que Fidel Castro y sus hombres partieron de México en 1956 para iniciar la lucha guerrillera en Cuba?",
                answer: "granma",
                position: 4,
                orientation: "across",
                startx: 8,
                starty: 7,
            },
            {
                clue: "Nombre del líder carismático de la Revolución Cubana.",
                answer: "fidel",
                position: 5,
                orientation: "down",
                startx: 9,
                starty: 15,
            },
            {
                clue: "Fue una cadena montañosa en Cuba donde los guerrilleros revolucionarios se refugiaron y organizaron su resistencia contra Batista.",
                answer: "sierramaestra",
                position: 6,
                orientation: "down",
                startx: 7,
                starty: 4,
            },
            {
                clue: "Fue uno de los principales comandantes revolucionarios junto a su hermano Fidel Castro.",
                answer: "raulcastro",
                position: 7,
                orientation: "down",
                startx: 4,
                starty: 3,
            },
            {
                clue: "Fue uno de los comandantes al igual de raul castro revolucionario más destacados en el movimiento liderado por Fidel Castro.",
                answer: "juanalmeida",
                position: 8,
                orientation: "down",
                startx: 13,
                starty: 5,
            },
        ];
        var puzzleData4 = [
            {
                clue: "Jorge Eliecer Gaitan ¿De que manera lo mataron?",
                answer: "asesinaron",
                position: 1,
                orientation: "across",
                startx: 3,
                starty: 5,
            },
            {
                clue: "Partido que se involucro en el Bogotazo?",
                answer: "conservador",
                position: 2,
                orientation: "across",
                startx: 5,
                starty: 10,
            },
            {
                clue: "¿Apellido de Quien mato a Giatan?",
                answer: "roa",
                position: 3,
                orientation: "across",
                startx: 5,
                starty: 8,
            },
            {
                clue: "¿Cual fue el mes exacto del Bogotazo?",
                answer: "abril",
                position: 4,
                orientation: "across",
                startx: 2,
                starty: 12,
            },
            {
                clue: "¿Cual fue la principal consecuencia del Bogotazo?",
                answer: "destruccion",
                position: 5,
                orientation: "down",
                startx: 5,
                starty: 4,
            },
            {
                clue: "¿En qué ciudad se originó las primeras revueltas?",
                answer: "bogota",
                position: 6,
                orientation: "down",
                startx: 14,
                starty: 9,
            },
            {
                clue: "¿Cuál era el partido político de Gaitán?",
                answer: "liberal",
                position: 7,
                orientation: "across",
                startx: 9,
                starty: 14,
            }
        ];
        var puzzleData5 = [
            {
                clue: "Entre los logros de la Revolución Cubana destaca la erradicación del.",
                answer: "analfabetismo",
                position: 1,
                orientation: "across",
                startx: 3,
                starty: 11,
            },
            {
                clue: "Después de que Fulgencio Batista fuera elegido presidente en Cuba en 1952, convirtió su gobierno en un",
                answer: "dictadura",
                position: 2,
                orientation: "across",
                startx: 3,
                starty: 8,
            },
            {
                clue: "El bloqueo económico provocó que Fidel Castro entable vínculos con.",
                answer: "moscu",
                position: 3,
                orientation: "across",
                startx: 2,
                starty: 5,
            },
            {
                clue: "En 1961, EE.UU. promovió la expulsión de Cuba de la.",
                answer: "oea",
                position: 4,
                orientation: "across",
                startx: 2,
                starty: 3,
            },
            {
                clue: "¿Cómo se llamó al éxodo masivo de cubanos que ocurrió entre abril y octubre de 1980?",
                answer: "exododemariel",
                position: 5,
                orientation: "down",
                startx: 3,
                starty: 3,
            },
            {
                clue: "Siglas del partido Comunista, conocido como Partido Socialista Popular",
                answer: "psp",
                position: 6,
                orientation: "down",
                startx: 13,
                starty: 10,
            },
            {
                clue: "Un éxito de la revolución cubana.",
                answer: "educacion",
                position: 7,
                orientation: "down",
                startx: 8,
                starty: 7,
            }
        ];
        var puzzleData6 = [
            {
                clue: "Lider militar que planteó ruptura y continuidades de la Violencia",
                answer: "gustavorojas",
                position: 1,
                orientation: "across",
                startx: 3,
                starty: 3,
            },
            {
                clue: "Como era llamado Gaitan",
                answer: "elcaudillo",
                position: 3,
                orientation: "across",
                startx: 4,
                starty: 14,
            },
            {
                clue: "Cuantas balas segaron la vida de Gaitan",
                answer: "tres",
                position: 4,
                orientation: "across",
                startx: 10,
                starty: 8,
            },
            {
                clue: "El Bogotazo, de acuerdo a la opinión de casi todos los historiadores, marcó el comienzo de una sangrienta etapa de la historia de Colombia llamada:",
                answer: "violencia",
                position: 5,
                orientation: "across",
                startx: 6,
                starty: 12,
            },
            {
                clue: "Fue movimiento político liderado por Jorge Eliecer Gaitán. Su principal objetivo era mejorar las condiciones de vida del pueblo en general.",
                answer: "gaitanismo",
                position: 1,
                orientation: "down",
                startx: 3,
                starty: 3,
            },
            {
                clue: "Denominada Marcha del Silencio, tenía como objetivo protestar contra los episodios de violencia política que afectaba especialmente a los liberales.",
                answer: "protesta",
                position: 6,
                orientation: "down",
                startx: 10,
                starty: 2,
            },
            {
                clue: "¿Bajo que presidencia ocurrió el 'Bogotazo'?",
                answer: "marianoospina",
                position: 7,
                orientation: "down",
                startx: 7,
                starty: 2,
            }
        ];

        let num = Math.floor((Math.random() * (6 - 1 + 1)) + 1);
       // let num = 6;
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
        console.log(preguntas);

        $("#puzzle-wrapper").crossword(preguntas);
    });
})(jQuery);
