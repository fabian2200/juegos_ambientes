// A javascript-enhanced crossword puzzle [c] Jesse Weisbeck, MIT/GPL
(function ($) {
    $(function () {
        // provide crossword entries in an array of objects like the following example
        // Position refers to the numerical order of an entry. Each position can have
        // two entries: an across entry and a down entry

        var crucigrama1 = [
            {
                clue: "Sistema económico basado en la propiedad privada y el libre mercado.",
                answer: "capitalismo",
                position: 1,
                orientation: "across",
                startx: 3,
                starty: 5,
            },
            {
                clue: "Lugar donde se intercambian bienes y servicios en una economía capitalista.",
                answer: "mercado",
                position: 2,
                orientation: "across",
                startx: 3,
                starty: 7,
            },
            {
                clue: "Etapa transitoria entre el capitalismo y el comunismo, donde el Estado controla los medios de producción.",
                answer: "socialismo",
                position: 3,
                orientation: "across",
                startx: 6,
                starty: 10,
            },
            {
                clue: "Divisiones sociales basadas en la relación con los medios de producción en el comunismo",
                answer: "clases",
                position: 3,
                orientation: "across",
                startx: 9,
                starty: 15,
            },
            {
                clue: "Sistema socioeconómico en el que los medios de producción son propiedad común y no hay clases sociales.",
                answer: "comunismo",
                position: 1,
                orientation: "down",
                startx: 3,
                starty: 5,
            },
            {
                clue: "Acción de utilizar bienes y servicios para satisfacer necesidades en una economía capitalista.",
                answer: "consumo",
                position: 5,
                orientation: "down",
                startx: 6,
                starty: 7,
            },
            {
                clue: "Filósofo y economista que desarrolló la teoría comunista junto con Engels.",
                answer: "marx",
                position: 6,
                orientation: "down",
                startx: 12,
                starty: 5,
            },
            {
                clue: "Una Características Del Capitalismo.",
                answer: "capital",
                position: 7,
                orientation: "down",
                startx: 10,
                starty: 9,
            }
        ];

        var puzzleData2 = [
            {
                clue: "Regula el Mercado del sistema capitalista",
                answer: "economia",
                position: 1,
                orientation: "across",
                startx: 4,
                starty: 5,
            },
            {
                clue: "Sistema en el que el precio de los bienes es acordado por el consentimiento entre los vendedores y los compradores.",
                answer: "libremercado",
                position: 2,
                orientation: "across",
                startx: 3,
                starty: 11,
            },
            {
                clue: "Capitalismo Dirigido y que tiene la iniciativa de la inversión y el desarrollo como parte de su política de crecimiento económico.",
                answer: "estado",
                position: 2,
                orientation: "across",
                startx: 9,
                starty: 16,
            },
            {
                clue: "Nombre del Filósofo y economista que desarrolló la teoría comunista.",
                answer: "karl",
                position: 4,
                orientation: "across",
                startx: 7,
                starty: 14,
            },

            {
                clue: "La Carrera del Espacio y Carrera Armamentista son características de que era.",
                answer: "guerrafria",
                position: 5,
                orientation: "down",
                startx: 4,
                starty: 3,
            },
            {
                clue: "La Guerra Fría estaba principalmente enfocada en la lucha americana en contra del.",
                answer: "comunismo",
                position: 6,
                orientation: "down",
                startx: 8,
                starty: 4,
            },
            {
                clue: "El Capitalismo Cuyas ganancias se basan en la producción de mercancías para el consumo, fue dominante a lo largo de todo el siglo XIX y se mantiene vigente hasta hoy.",
                answer: "industrial",
                position: 7,
                orientation: "down",
                startx: 10,
                starty: 5,
            },
            {
                clue: "El capitalismo que surgió en la segunda mitad del siglo XVIII junto la revolución industrial, en un contexto profundamente influido por las ideas del liberalismo.",
                answer: "moderno",
                position: 8,
                orientation: "down",
                startx: 14,
                starty: 10,
            },
        ];

        var puzzleData3 = [
            {
                clue: "Nombre dado a la competencia ideológica, política y económica entre Estados Unidos y la Unión Soviética",
                answer: "guerrafria",
                position: 1,
                orientation: "across",
                startx: 4,
                starty: 4,
            },
            {
                clue: "En el ámbito de la Guerra Fría se produjo la división del mundo en dos zonas de influencia, liderada una de ellas por EE.UU. La Alemania dividida se reunificó en 1990 y entre los hechos que contribuyeron a ello, el de mayor simbolismo fue la caída del Muro.",
                answer: "berlin",
                position: 2,
                orientation: "across",
                startx: 3,
                starty: 6,
            },
            {
                clue: "La disolución de la Unión Soviética en 1991 generó un cambio en los equilibrios de poder en el Mundo, consolidándose algunos países como nuevos polos de poder por su relevancia política y su explosivo crecimiento económico. Entre ellos se puede destacar a:",
                answer: "china",
                position: 3,
                orientation: "across",
                startx: 10,
                starty: 10,
            },
           {
                clue: "Los primeros años de la Guerra Fría están marcados por el",
                answer: "bipolarismo",
                position: 4,
                orientation: "down",
                startx: 12,
                starty: 3,
            },
            {
                clue: "Cómo se conoce al período comprendido entre mediado de los años 50, y mediados de los años 70",
                answer: "guerragalaxias",
                position: 1,
                orientation: "down",
                startx: 4,
                starty: 4,
            },
            {
                clue: "La OTAN nace en 1949 en defensa de los países europeos occidentales, en 1955 la URSS y sus países satélites fundan la contraparte occidental denominada el Pacto de.",
                answer: "varsovia",
                position: 6,
                orientation: "down",
                startx: 14,
                starty: 9,
            },

        ];

        var puzzleData4 = [
          {
            clue: "Nombre con que se conoció el Plan de ayuda económico de la URSS, destinado a Europa del Este",
            answer: "comecon",
            position: 1,
            orientation: "across",
            startx: 3,
            starty: 4,
          },
          {
              clue: "Siglas de la Unión de Repúblicas Soviéticas Socialista",
              answer: "urss",
              position: 3,
              orientation: "across",
              startx: 3,
              starty: 7,
          },
          {
              clue: "Etapas de la Guerra Fría La Guerra Fría fue un conflicto complejo y prolongado, que abarcó numerosas etapas y diversos escenarios de conflicto, a saber, la primera Etapa se llamó.",
              answer: "mundobipolar",
              position: 4,
              orientation: "across",
              startx: 3,
              starty: 11,
          },
          {
              clue: "El sostenimiento por parte de EE. UU. de los gobiernos de los países del bloque occidental se basó en la doctrina",
              answer: "truman",
              position: 5,
              orientation: "across",
              startx: 5,
              starty: 16,
          },
          {
            clue: "Los Estados Unidos le temía a que forma de gobierno durante la guerra fría.",
            answer: "comunismo",
            position: 1,
            orientation: "down",
            startx: 3,
            starty: 4,
          },
          {
              clue: "Organización militar liderada por Estados Unidos durante la Guerra Fría",
              answer: "otam",
              position: 6,
              orientation: "down",
              startx: 7,
              starty: 11,
          },
          {
              clue: "País líder del bloque comunista durante la Guerra Fría",
              answer: "unionsovietica",
              position: 7,
              orientation: "down",
              startx: 9,
              starty: 3,
          }
        ];
        var puzzleData5 = [
            {
                clue: "La causa de la Guerra Fría donde se activó la guerra entre ambas naciones, probablemente por temor a una escalada nuclear se le llamo.",
                answer: "segundaguerra",
                position: 1,
                orientation: "across",
                startx: 3,
                starty: 4,
            },
            {
                clue: "País aliado occidental que determino en el inicio de la Guerra Fría se gestan durante el final de la Segunda Guerra Mundial.",
                answer: "francia",
                position: 3,
                orientation: "across",
                startx: 6,
                starty: 9,
            },
            {
                clue: "Las causas del efecto que trajo consigo la Guerra Fría fueron el derribo del ",
                answer: "comunismo",
                position: 4,
                orientation: "across",
                startx: 7,
                starty: 18,
            },
            {
                clue: "La guerra de Afganistán resultó un factor importante para la quiebra de ",
                answer: "sovieticos",
                position: 1,
                orientation: "down",
                startx: 3,
                starty: 4,
            },
            {
                clue: "Cuál fue el país que en 1980 La Unión Soviética invadió  ",
                answer: "afganistan",
                position: 5,
                orientation: "down",
                startx: 15,
                starty: 4,
            },
            {
                clue: "Se convirtió en el líder de la Unión Soviética, adoptando una actitud conciliadora con los americanos, firmando muchos pactos de reducción de armas. En 1989 hubo una retirada soviética de Afganistán y un año más tarde se firmó la reunificación de Alemania, como Gorbachov como figura importante.",
                answer: "gorbachov",
                position: 6,
                orientation: "down",
                startx: 10,
                starty: 4,
            },
            {
                clue: "Las principales consecuencias de la Guerra Fría apuntan al triunfo del.",
                answer: "capitalismo",
                position: 7,
                orientation: "down",
                startx: 8,
                starty: 8,
            }
        ];
        var puzzleData6 = [
            {
                clue: "La 'Guerra Fría' se inició Con la división de.",
                answer: "alemania",
                position: 1,
                orientation: "across",
                startx: 3,
                starty: 5,
            },
            {
                clue: "Cuál fue la principal consecuencia de las relaciones internacionales agresivas en la Guerra Fría entre corea y de Vietnam",
                answer: "division",
                position: 3,
                orientation: "across",
                startx: 8,
                starty: 12,
            },
            {
                clue: "EL pacto de Varsovia entre los países se les llamo orden.",
                answer: "socialista",
                position: 4,
                orientation: "across",
                startx: 4,
                starty: 16,
            },
            {
                clue: "La Guerra Fria finaliza con la caída del Muro de:",
                answer: "berlin",
                position: 5,
                orientation: "across",
                startx: 8,
                starty: 7,
            },
            {
                clue: "Existía durante la guerra fría un temor generalizado a nivel mundial, este podría generar una tercera guerra donde el mayor de los miedos estaba en la utilización del poderío.",
                answer: "atomico",
                position: 1,
                orientation: "down",
                startx: 3,
                starty: 5,
            },
            {
                clue: "La guerra Fria consistió un enfrentamiento entre la unión soviética y estados unidos a esto se le llamo.",
                answer: "ideologico",
                position: 6,
                orientation: "down",
                startx: 9,
                starty: 5,
            },
            {
                clue: "Uno de los conflictos bélicos más destacados de la Guerra Fría fue la Guerra de Corea en la década de 1950, en la que Estados Unidos participó directamente con soldados y armamentos. En este contexto, una década después, Estados Unidos participó de la misma manera en el conflicto conocido como la guerra de",
                answer: "vietnam",
                position: 7,
                orientation: "down",
                startx: 13,
                starty: 11,
            }
        ];
        var puzzleData7 = [
            {
                clue: "Se ha convertido en la forma más eficaz de gobierno para luchar contra el comunismo.",
                answer: "dictadura",
                position: 1,
                orientation: "across",
                startx: 3,
                starty: 6,
            },
            {
                clue: "Los partidos son proyectados al poder por las clases medias de las ciudades y ganan con el apoyo de los partidos comunistas y socialistas a estos se les llamo:",
                answer: "reformistas",
                position: 3,
                orientation: "across",
                startx: 3,
                starty: 11,
            },
            {
                clue: "Se denomina así al cambio violento de las instituciones políticas, económicas o sociales de una Nación",
                answer: "revolucion",
                position: 4,
                orientation: "across",
                startx: 5,
                starty: 14,
            },
            {
                clue: "Revolución encabezada por Francisco Madero y Emiliano Zapata en 1910, buscaba el re estructuración del poder económico y una reforma agraria",
                answer: "mexicana",
                position: 5,
                orientation: "across",
                startx: 3,
                starty: 8,
            },
            {
                clue: "Sistema político que defiende la soberanía del pueblo",
                answer: "democracia",
                position: 1,
                orientation: "down",
                startx: 3,
                starty: 6,
            },
            {
                clue: "Está ubicada en el edificio de la Unión Panamericana en Washington DC.",
                answer: "oea",
                position: 6,
                orientation: "down",
                startx: 7,
                starty: 4,
            },
            {
                clue: "Una Característica de la dictadura",
                answer: "fuerza",
                position: 7,
                orientation: "down",
                startx: 5,
                starty: 11,
            }
        ];
        var puzzleData8 = [
            {
                clue: "País cuya intromisión internacional causó varios enfrentamientos bélicos al rededor del mundo, invadió países de la región para mantener su dominio político derrocando gobiernos como el guatemalteco y financiando grupos paramilitares.",
                answer: "estadosunidos",
                position: 1,
                orientation: "across",
                startx: 3,
                starty: 4,
            },
            {
                clue: "Las dictaduras en América Latina fueron de tipo.",
                answer: "militares",
                position: 2,
                orientation: "across",
                startx: 3,
                starty: 13,
            },
            {
                clue: "Forma de obtener el poder ejecutivo de una persona que no es electa popularmente.",
                answer: "golpeestado",
                position: 3,
                orientation: "across",
                startx: 2,
                starty: 9,
            },
            {
                clue: "Aliado de estados unidos para eliminar revoluciones, guerrillas y dictaduras",
                answer: "otan",
                position: 4,
                orientation: "across",
                startx: 3,
                starty: 16,
            },
            {
                clue: "En 1961 de declarar como República socialista Estados Unidos intentó invadirlo sin éxito Apoyado por la Unión soviética Discordia por su control casi causó el inicio de la Guerra entre Estados Unidos y la Unión Soviética.",
                answer: "cuba",
                position: 5,
                orientation: "down",
                startx: 10,
                starty: 3,
            },
            {
                clue: "Los regímenes militares generalmente no respetan",
                answer: "derechoshumanos",
                position: 6,
                orientation: "down",
                startx: 3,
                starty: 3,
            },
            {
                clue: "Es una tendencia política que pretende atraerse a las clases populares, esto define a",
                answer: "populismo",
                position: 7,
                orientation: "down",
                startx: 14,
                starty: 3,
            }
        ];

       let num = Math.floor((Math.random() * (8 - 1 + 1)) + 1);
       // let num = 8;
        switch (num) {
            case 1:
                preguntas = crucigrama1;
                titulo = "Capitalismo y Comunismo";
                break;
            case 2:
                preguntas = puzzleData2;
                titulo = "Capitalismo y Comunismo";
                break;
            case 3:
                preguntas = puzzleData3;
                titulo = "Guerra fría y Etapas de la guerra fría";

                break;
            case 4:
                preguntas = puzzleData4;
                titulo = "Guerra fría y Etapas de la guerra fría";
                break;
            case 5:
                preguntas = puzzleData5;
                titulo = "La guerra fría: Causas y consecuencias";
                break;
            case 6:
                preguntas = puzzleData6;
                titulo = "La guerra fría: Causas y consecuencias";
                break;
            case 7:
                preguntas = puzzleData7;
                titulo = "La guerra fría en américa latina: revoluciones, guerrillas y dictaduras.";
                break;
            case 8:
                preguntas = puzzleData8;
                titulo = "La guerra fría en américa latina: revoluciones, guerrillas y dictaduras.";
                break;
        }
        console.log(preguntas);

        document.getElementById("titulo").innerHTML ='Resuelve el siguiente Crucigrama, relacionado al tema "'+ titulo+'"';
        $("#puzzle-wrapper").crossword(preguntas);
    });
})(jQuery);
