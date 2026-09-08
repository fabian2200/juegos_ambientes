// A javascript-enhanced crossword puzzle [c] Jesse Weisbeck, MIT/GPL
(function ($) {
    $(function () {
        // provide crossword entries in an array of objects like the following example
        // Position refers to the numerical order of an entry. Each position can have
        // two entries: an across entry and a down entry

        var crucigrama1 = [
            {
                clue: "Al final de esta fase se forma el uso acromático en la Meiosis",
                answer: "profasei",
                position: 1,
                orientation: "across",
                startx: 1,
                starty: 6,
            },
              {
                clue: "En esta fase se divide la celula madre diploide en dos celulas hijas haplodes",
                answer: "telofasei",
                position: 3,
                orientation: "across",
                startx: 3,
                starty: 3,
            },
            {
                clue: "En esta fase las cromatidas se separan dando lugar a cromosomas hijos independientes, migrando cada cromatina hacia un polo de la celula.",
                answer: "anafaseii",
                position: 4,
                orientation: "across",
                startx: 5,
                starty: 8,
            },
            {
                clue: "Es el proceso de división celular enque una célula diploide (2n) da lugar a cuatro celulas hijas hapluides",
                answer: "meiosis",
                position: 2,
                orientation: "down",
                startx: 10,
                starty: 2,
            },
            {
                clue: "Es la fase en la que los cromosomas se vuleven a condensar y los husos se forman de nuevo",
                answer: "profaseii",
                position: 6,
                orientation: "down",
                startx: 2,
                starty: 5,
            },
            {
                clue: "En esta fase el citoplasma se divide en igual número de porciones, logrando finalmente 4 celulas hijas con la mitad de los numeros de cromosomas con que inicio la meiosis.",
                answer: "telofaseii",
                position: 5,
                orientation: "down",
                startx: 4,
                starty: 2,
            }
        ];

        var puzzleData2 = [
            {
                clue: "Tiene lugar cuando una célula se divide en dos idénticas dotadas del mismo ADN ",
                answer: "mitosis",
                position: 1,
                orientation: "across",
                startx: 2,
                starty: 4,
            },
       
      
            {
                clue: "Se separan las cromátidas hermanas en dos cromosomas idénticos, los cuales migran a los polos opuestos ",
                answer: "anafase",
                position: 2,
                orientation: "across",
                startx: 5,
                starty: 6,
            },
             
            {
                clue: "Significa la división del citoplasma en la fase de telofase. ",
                answer: "citocinesis",
                position: 6,
                orientation: "across",
                startx: 4,
                starty: 12,
            },

       
            {
                clue: "En esta etapa las cromátidas hermanas se mueven a través del huso mitótico y se alinean en el centro de la célula (Es la segunda etapa de la mitosis). ",
                answer: "metafase",
                position: 1,
                orientation: "down",
                startx: 2,
                starty: 4,
            },
            {
                clue: "Es la etapa mas larga de la mitosis, en la cual las cromátidas se condensan para formar los cromosomas.  ",
                answer: "profase",
                position: 3,
                orientation: "down",
                startx: 5,
                starty: 2,
            },
            {
                clue: "En esta etapa se reconstituyen la membrana nuclear y el nucleolo y ocurre la división del citoplasma ",
                answer: "telofase",
                position: 4,
                orientation: "down",
                startx: 11,
                starty: 5,
            },
     
       
        ];

        var puzzleData3 = [
            {
                clue: "Reproducción asexual de plantas en el que se originan tallos delgados y alargados a lo largo de la superficie del suelo que posteriormente genera raíces. ",
                answer: "estolones",
                position: 1,
                orientation: "across",
                startx: 3,
                starty: 3,
            },
            {
                clue: "Método artificial en el que porciones o trozos de tallo que se introducen en la tierra para producir raíces que darán origen a una planta nueva. ",
                answer: "esquejes",
                position: 4,
                orientation: "across",
                startx: 2,
                starty: 9,
            },
            {
                clue: "Son tallos cortos y gruesos que guardan reservas y a partir de este puede crecer otro. ",
                answer: "bulbos",
                position: 2,
                orientation: "across",
                startx: 5,
                starty: 5,
            },
            {
                clue: "Son tallos de crecimiento indefinido que crece bajo la tierra o por encima de manera horizontal.",
                answer: "rizoma",
                position: 5,
                orientation: "across",
                startx: 7,
                starty: 11,
            },
            {
                clue: "Es un tallo subterráneo modificado y engrosado donde se acumulan los nutrientes de reserva para la planta. ",
                answer: "tuberculos",
                position: 3,
                orientation: "down",
                startx: 5,
                starty: 3,
            },
         
            {
                clue: "En el proceso de reproducción artificial en el que se parte del tejido de una planta se une sobre otra ya sentada para que en conjunto ambas crezcan como un solo organismo.",
                answer: "injerto",
                position: 6,
                orientation: "down",
                startx: 7,
                starty: 7,
            },
        ];

        var puzzleData4 = [
        
            {
                clue: "Captura y retiene el polen, lleva sustancias azucaradas y agua necesaria para la germinación del polen.",
                answer: "estigma",
                position: 2,
                orientation: "across",
                startx: 6,
                starty: 4,
            },
         
            {
                clue: "Es la unión de los gramos de polen y los óvulos en las plantas para formar las semillas ",
                answer: "fecundacion",
                position: 3,
                orientation: "across",
                startx: 1,
                starty: 6,
            },
            {
                clue: "Aparato reproductor femenino en las plantas. ",
                answer: "pistilo",
                position: 6,
                orientation: "across",
                startx: 2,
                starty: 13,
            },
            {
                clue: "Es el aparato reproductor masculino en algunas plantas y esta formado por un eje delgado y fino llamado filamento.",
                answer: "estambres",
                position: 1,
                orientation: "down",
                startx: 7,
                starty: 3,
            },
        
            {
                clue: "En este lugar se forman los granos de polen que contienen los anterozoides",
                answer: "sacopolinico",
                position: 4,
                orientation: "down",
                startx: 3,
                starty: 4,
            },
            {
                clue: "Es el transporte de los gramos de polen desde el estambre hasta el pistilo.",
                answer: "polinizacion",
                position: 5,
                orientation: "down",
                startx: 9,
                starty: 1,
            },
          
        ];

        let num = Math.floor((Math.random() * (4 - 1 + 1)) + 1);
        //let num = 1;
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
        }

        $("#puzzle-wrapper").crossword(preguntas);
    });
})(jQuery);
