// A javascript-enhanced crossword puzzle [c] Jesse Weisbeck, MIT/GPL
(function ($) {
    $(function () {
        // provide crossword entries in an array of objects like the following example
        // Position refers to the numerical order of an entry. Each position can have
        // two entries: an across entry and a down entry

        var crucigrama1 = [
            {
                clue: "¿Qué pueblo invadió y sometió a los cretenses para dar inicio a la civilización minoica?",
                answer: "aqueos",
                position: 7,
                orientation: "across",
                startx: 3,
                starty: 13,
            },
            {
                clue: "¿En qué región se desarrolló la civilización griega?",
                answer: "mediterraneo",
                position: 3,
                orientation: "across",
                startx: 3,
                starty: 6,
            },
            {
                clue: "¿Cómo se llama la ciudad que los Micénicos conquistaron según los poemas épicos de Homero? ",
                answer: "troya",
                position: 5,
                orientation: "across",
                startx: 9,
                starty: 8,
            },
            {
                clue: "¿Qué ciudades-estado se destacaron en la civilización griega? ",
                answer: "Atenas",
                position: 6,
                orientation: "across",
                startx: 9,
                starty: 10,
            },
            {
                clue: "¿Un legado filosófico dejó la civilización griega?",
                answer: "Aristoteles",
                position: 1,
                orientation: "down",
                startx: 6,
                starty: 4,
            },
            {
                clue: "¿Qué producto básico de la dieta griega destacan? ",
                answer: "legumbres",
                position: 2,
                orientation: "down",
                startx: 3,
                starty: 2,
            },
            {
                clue: "¿Qué tipo de viviendas construyeron los griegos? ",
                answer: "adobe",
                position: 4,
                orientation: "down",
                startx: 11,
                starty: 6,
            }
        ];

        var puzzleData2 = [
            {
                clue: "¿Quién era el dios del mar? ",
                answer: "Poseidon",
                position: 2,
                orientation: "across",
                startx: 5,
                starty: 4,
            },
            {
                clue: "¿Qué tipo de gobierno se consolidó en Atenas?",
                answer: "democratico",
                position: 4,
                orientation: "across",
                startx: 3,
                starty: 6,
            },
            {
                clue: "¿Quién era la diosa del inframundo?",
                answer: "persefone",
                position: 5,
                orientation: "across",
                startx: 1,
                starty: 8,
            },
            {
                clue: "¿Qué tipo de religión tenía la antigua Grecia? ",
                answer: "politeista",
                position: 7,
                orientation: "across",
                startx: 4,
                starty: 10,
            },

            {
                clue: "¿Quién era el dios del arte y del deporte? ",
                answer: "apolo",
                position: 1,
                orientation: "down",
                startx: 6,
                starty: 2,
            },
            {
                clue: "¿Quién era el Dios supremo de la religión griega?",
                answer: "zeus",
                position: 3,
                orientation: "down",
                startx: 4,
                starty: 5,
            },
            {
                clue: "¿Quién era la diosa de la paz?",
                answer: "Atenea",
                position: 6,
                orientation: "down",
                startx: 9,
                starty: 6,
            },
        ];

        var puzzleData3 = [
            {
                clue: "¿Qué tipo de materiales utilizaban los griegos para realizar sus objetos y esculturas? ",
                answer: "madera",
                position: 2,
                orientation: "across",
                startx: 3,
                starty: 5,
            },
            {
                clue: "¿Quién fue el fundador de la escuela de medicina? ",
                answer: "hipocrates",
                position: 3,
                orientation: "across",
                startx: 3,
                starty: 7,
            },
            {
                clue: "¿Atenea en la mitología griega? ",
                answer: "diosa",
                position: 4,
                orientation: "across",
                startx: 2,
                starty: 10,
            },
            {
                clue: "¿Cuál era la característica principal del arte griego en la representación de las figuras humanas? ",
                answer: "realismo",
                position: 1,
                orientation: "down",
                startx: 4,
                starty: 3,
            },
            {
                clue: "¿Parte del cuerpo por donde nació Atenea según la mitología griega?",
                answer: "cabeza",
                position: 5,
                orientation: "down",
                startx: 9,
                starty: 6,
            },
            {
                clue: "¿Quién era el dios del fuego? ",
                answer: "hefesto",
                position: 6,
                orientation: "down",
                startx: 11,
                starty: 6,
            },
        ];

        let num = Math.floor((Math.random() * (3 - 1 + 1)) + 1);
        //let num = 3;
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
        }
        console.log(preguntas);

        $("#puzzle-wrapper").crossword(preguntas);
    });
})(jQuery);
