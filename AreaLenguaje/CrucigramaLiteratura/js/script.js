// A javascript-enhanced crossword puzzle [c] Jesse Weisbeck, MIT/GPL
(function ($) {
    $(function () {
        // provide crossword entries in an array of objects like the following example
        // Position refers to the numerical order of an entry. Each position can have
        // two entries: an across entry and a down entry

        var crucigrama1 = [
            {
                clue: "Lengua que provenía del Imperio Romano y se mantuvo en el inicio de la Edad Media.",
                answer: "latin",
                position: 1,
                orientation: "across",
                startx: 5,
                starty: 5,
            },
            {
                clue: "Características de la literatura medieval que desarrollo los generos afianzando la utilización del verso.",
                answer: "liricoyepico",
                position: 2,
                orientation: "across",
                startx: 3,
                starty: 17,
            },
            {
                clue: "Los temas de la literatura medieval eran escritos son uno de ellos.",
                answer: "laicos",
                position: 3,
                orientation: "across",
                startx: 7,
                starty: 15,
            },
            {
                clue: "Podía ser popular representada por los cantares de gesta o culta relacionada a epopeya.",
                answer: "epica",
                position: 4,
                orientation: "across",
                startx: 8,
                starty: 8,
            },
            {
                clue: "Fue un movimiento que se sirvió para el desarrollo de la novela y del cuento",
                answer: "narrativa",
                position: 5,
                orientation: "across",
                startx: 2,
                starty: 10,
            },
            {
                clue: "Los reinos romano-germánicos son apoyados por:.",
                answer: "carlomagno",
                position: 6,
                orientation: "down",
                startx: 6,
                starty: 4,
            },
            {
                clue: "Características más representativas de la literatura medieval y finaliza en el inicio del Renacimiento",
                answer: "imperioromano",
                position: 7,
                orientation: "down",
                startx: 8,
                starty: 5,
            },
            {
                clue: "Podía ser culta o popular. Por el lado popular podemos citar los villancicos, las canticas de amigos y las Jarchas.",
                answer: "lirica",
                position: 8,
                orientation: "down",
                startx: 12,
                starty: 3,
            },
            {
                clue: "También estaba enfocado a sus dos tipos de público el culto y el popular. El teatro culto estaba relacionado con temas religiosos y el popular con los cantares juglarescos..",
                answer: "teatro",
                position: 9,
                orientation: "down",
                startx: 4,
                starty: 6,
            }
        ];

        var puzzleData2 = [
            {
                clue: "Período histórico caracterizado por un renovado interés por la cultura clásica y un florecimiento de las artes y las ciencias.",
                answer: "renacimiento",
                position: 1,
                orientation: "across",
                startx: 2,
                starty: 4,
            },
            {
                clue: "Pais donde fue el centro cultural en que se originó el movimiento renacentista.",
                answer: "italia",
                position: 2,
                orientation: "across",
                startx: 4,
                starty: 13,
            },
            {
                clue: "tema de la literatura del renacimiento que le canta al amor y a la belleza del alma y del cuerpo.",
                answer: "amor",
                position: 3,
                orientation: "across",
                startx: 7,
                starty: 9,
            },
            {
                clue: "En este periodo, además, surgen nuevas formas literarias Y aparecen nuevos géneros estos son",
                answer: "ensayo",
                position: 4,
                orientation: "across",
                startx: 7,
                starty: 6,
            },

            {
                clue: "Movimiento artístico y cultural que buscaba imitar y revivir la antigüedad clásica.",
                answer: "grecolatina",
                position: 5,
                orientation: "down",
                startx: 2,
                starty: 3,
            },
            {
                clue: "La principal característica de la literatura renacentista es el regreso a la cultura clásica llamada.",
                answer: "neoclasicismo",
                position: 6,
                orientation: "down",
                startx: 4,
                starty: 4,
            },
            {
                clue: "La vuelta a la valoración de la cultura y las artes de la antigua Grecia y Roma durante el Renacimiento se conoce como",
                answer: "humanismo",
                position: 7,
                orientation: "down",
                startx: 8,
                starty: 2,
            },
        ];

        var puzzleData3 = [
            {
                clue: "El Renacimiento es un movimiento artístico que recibe su nombre por el.",
                answer: "renacer",
                position: 1,
                orientation: "across",
                startx: 6,
                starty: 5,
            },
            {
                clue: "Una característica del renacimiento",
                answer: "naturaleza",
                position: 2,
                orientation: "across",
                startx: 3,
                starty: 10,
            },
            {
                clue: "El famoso ensayista renacentista, moralista y pensador, a quien se le considera EL PADRE DEL ENSAYO es.",
                answer: "montaigne",
                position: 3,
                orientation: "across",
                startx: 4,
                starty: 13,
            },
            {
                clue: "Se considera que el Siglo de Oro O renacimiento abarca dos períodos estéticos distintos uno de ellos es el renacimiento:",
                answer: "español",
                position: 4,
                orientation: "across",
                startx: 4,
                starty: 7,
            },
            {
                clue: "Primer Renacimiento el cual Se introducen las formas italianas en una poesía cuyo tema principal es el.",
                answer: "amor",
                position: 5,
                orientation: "down",
                startx: 9,
                starty: 5,
            },
            {
                clue: "¿Qué obra no corresponde al Renacimiento?",
                answer: "elavaro",
                position: 6,
                orientation: "down",
                startx: 7,
                starty: 5,
            },
            {
                clue: "¿Qué obra corresponde al Renacimiento?",
                answer: "hamlet",
                position: 7,
                orientation: "down",
                startx: 12,
                starty: 9,
            }
          
        ];
        var puzzleData4 = [
            {
                clue: "A la Escuela Barroca, también se le llama.",
                answer: "nacionalista",
                position: 1,
                orientation: "across",
                startx: 4,
                starty: 6,
            },
            {
                clue: "El Neoclasicismo es un movimiento artístico que surge en oposición al",
                answer: "barroquismo",
                position: 2,
                orientation: "across",
                startx: 3,
                starty: 8,
            },
            {
                clue: "Uno de los principales autores de la época barroca",
                answer: "lopedevega",
                position: 3,
                orientation: "across",
                startx: 4,
                starty: 11,
            },
            {
                clue: "Período de la historia conocido por su exuberancia y teatralidad.",
                answer: "barroco",
                position: 4,
                orientation: "down",
                startx: 5,
                starty: 5,
            },
            {
                clue: "La estética barroca busca el contraste,la exageración y el:",
                answer: "dinamismo",
                position: 5,
                orientation: "down",
                startx: 15,
                starty: 3,
            },
            {
                clue: "El barroco alcanzó un esplendor único en la historia literaria universal, gracias a diversas tendencias una de estas es",
                answer: "lacomedia",
                position: 6,
                orientation: "down",
                startx: 13,
                starty: 11,
            }
        ];
        var puzzleData5 = [
            {
                clue: "Filósofo francés conocido por su obra 'Candide'.",
                answer: "voltaire",
                position: 1,
                orientation: "across",
                startx: 3,
                starty: 5,
            },
            {
                clue: "Alcanza grandes logros dejando al planeta casi sin espacios desconocidos. Los círculos polares y algunas regiones en el África quedan aún sin poder ser cartografiadas del todo.",
                answer: "cartografia",
                position: 2,
                orientation: "across",
                startx: 3,
                starty: 11,
            },
            {
                clue: "Filósofo francés conocido por su obra 'El contrato social'.",
                answer: "rousseau",
                position: 3,
                orientation: "across",
                startx: 7,
                starty: 8,
            },
            {
                clue: "La confianza de los ilustrados estaba depositada en el progreso que los hombres y mujeres podían alcanzar a través de la razón, defendiendo algunos derechos se conocio como.",
                answer: "libertad",
                position: 4,
                orientation: "across",
                startx: 6,
                starty: 15,
            },
            {
                clue: "Género literario que utiliza la sátira y la ironía para criticar vicios y defectos sociales.",
                answer: "novelasatirica",
                position: 5,
                orientation: "down",
                startx: 4,
                starty: 4,
            },
            {
                clue: "Género literario caracterizado por la crítica social y política.",
                answer: "satirapolitica",
                position: 6,
                orientation: "down",
                startx: 7,
                starty: 4,
            },
            {
                clue: "Apellido del Filósofo alemán que propuso una ética basada en la razón y la libertad.",
                answer: "kant",
                position: 7,
                orientation: "down",
                startx: 10,
                starty: 10,
            }
        ];
        var puzzleData6 = [
            {
                clue: "El género literario que se popularizó durante el Romanticismo y se caracteriza por la exaltación de los sentimientos y la imaginación es la poesía.",
                answer: "romantica",
                position: 1,
                orientation: "across",
                startx: 3,
                starty: 4,
            },
            {
                clue: "El género literario que combina elementos románticos y sobrenaturales es el género del Romanticismo.",
                answer: "gotico",
                position: 2,
                orientation: "across",
                startx: 2,
                starty: 15,
            },
            {
                clue: "El poeta inglés conocido por sus composiciones románticas como 'Las Rimas' es:",
                answer: "samueltaylor",
                position: 3,
                orientation: "across",
                startx: 3,
                starty: 13,
            },
            {
                clue: "El movimiento político y social que se relaciona con el Romanticismo y busca la unificación y libertad de los pueblos es el:",
                answer: "nacionalismo",
                position: 4,
                orientation: "across",
                startx: 3,
                starty: 8 ,
            },
            {
                clue: "Movimiento artístico y literario que surge como reacción al racionalismo de la Ilustración.",
                answer: "romanticismo",
                position: 5,
                orientation: "down",
                startx: 3,
                starty: 4,
            },
            {
                clue: "El romántico aprecia el amor por el amor mismo, pero también le recuerda la finitud de la vida y proximidad de la Muerte a esto se le llamo",
                answer: "amor",
                position: 6,
                orientation: "down",
                startx: 13,
                starty: 7,
            },
            {
                clue: "El poeta es un demiurgo, es decir, es un:",
                answer: "creador",
                position: 7,
                orientation: "down",
                startx: 10,
                starty: 10,
            }
        ];
        var puzzleData7 = [
            {
                clue: "Movimiento literario y artístico que se opuso al idealismo romántico.",
                answer: "realismo",
                position: 1,
                orientation: "across",
                startx: 4,
                starty: 5,
            },
            {
                clue: "Realismo se entiende una tendencia estética y artísticas, fundamentalmente literaria, pictórica y escultórica, que aspira a la semejanza o la correlación lo más exacta posible entre las formas",
                answer: "arte",
                position: 2,
                orientation: "across",
                startx: 11,
                starty: 10,
            },
            {
                clue: "Hacía sus primeras apariciones cuando el realismo se convirtió en la escuela imperante",
                answer: "fotografia",
                position: 3,
                orientation: "down",
                startx: 11,
                starty: 4,
            },
            {
                clue: "La corriente filosófica que influyó en el Realismo, postulando que el conocimiento se basa en la experiencia sensorial",
                answer: "emperismo",
                position: 4,
                orientation: "down",
                startx: 5,
                starty: 5,
            },
            {
                clue: "Escritor francés conocido por su obra 'Los Miserables'.",
                answer: "victorhugo",
                position: 5,
                orientation: "down",
                startx: 8,
                starty: 4,
            },
            {
                clue: "El pintor francés considerado uno de los principales representantes del Realismo en el arte.",
                answer: "gustavecourbet",
                position: 6,
                orientation: "down",
                startx: 14,
                starty: 4,
            }
        ];

        let num = Math.floor((Math.random() * (7 - 1 + 1)) + 1);
       // let num = 7 ;
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
            case 7:
                preguntas = puzzleData7;
                break;
        }
        console.log(preguntas);

        $("#puzzle-wrapper").crossword(preguntas);
    });
})(jQuery);
