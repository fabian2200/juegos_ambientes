// A javascript-enhanced crossword puzzle [c] Jesse Weisbeck, MIT/GPL
(function ($) {
    $(function () {
        // provide crossword entries in an array of objects like the following example
        // Position refers to the numerical order of an entry. Each position can have
        // two entries: an across entry and a down entry

        var crucigrama1 = [
            {
                clue: "¿Qué fenómeno demográfico se produjo como resultado de la Revolución Industrial? ",
                answer: "exodo",
                position: 1,
                orientation: "across",
                startx: 2,
                starty: 4,
            },
              {
                clue: "¿País donde se originó la Revolución Industrial?",
                answer: "inglaterra",
                position: 3,
                orientation: "across",
                startx: 3,
                starty: 6,
            },
            {
                clue: "¿Qué consecuencias tuvo la Revolución Industrial en la estructura económica y social? ",
                answer: "cambios",
                position: 5,
                orientation: "across",
                startx: 8,
                starty: 8,
            },
            {
                clue: "¿Alguna de las causas políticas de la Revolución Industrial?",
                answer: "estabilidad",
                position: 7,
                orientation: "across",
                startx: 4,
                starty: 10,
            },
            {
                clue: "¿En qué siglo tuvo lugar la Revolución Industrial?",
                answer: "xviii",
                position: 2,
                orientation: "down",
                startx: 3,
                starty: 4,
            },
            {
                clue: "¿Alguna característica de la Revolución Industrial?",
                answer: "mecanizacion",
                position: 4,
                orientation: "down",
                startx: 9,
                starty: 5,
            },
            {
                clue: "¿Qué elemento facilito el avance industrial?",
                answer: "carbon",
                position: 6,
                orientation: "down",
                startx: 7,
                starty: 9,
            }
        ];

        var puzzleData2 = [
            {
                clue: "¿Principio aprobado en el Congreso de Viena durante la Restauración?",
                answer: "Equilibrio",
                position: 1,
                orientation: "across",
                startx: 3,
                starty: 5,
            },
       
      
            {
                clue: "¿Cuál fue el congreso más importante durante la Restauración?",
                answer: "viena",
                position: 6,
                orientation: "across",
                startx: 6,
                starty: 7,
            },
             
            {
                clue: "¿Clase social básica durante la Restauración?",
                answer: "alta",
                position: 4,
                orientation: "across",
                startx: 3,
                starty: 11,
            },

       
            {
                clue: "Cómo se denomina el período que va desde la primera derrota de Napoleón Bonaparte hasta las revoluciones europeas de 1830?",
                answer: "restauracion",
                position: 2,
                orientation: "down",
                startx: 3,
                starty: 4,
            },
            {
                clue: "¿Cuál fue el órgano de dirección mancomunado de la Cuádruple Alianza durante la Restauración?",
                answer: "directorio",
                position: 7,
                orientation: "down",
                startx: 8,
                starty: 4,
            },
            {
                clue: "¿Sociedad secreta más importante durante la Restauración en Italia?",
                answer: "carbonarios",
                position: 3,
                orientation: "down",
                startx: 9,
                starty: 2,
            },
     
            {
                clue: "¿Qué tipo de sociedad surgió de la Revolución francesa y se mantuvo durante la Restauración?",
                answer: "clases",
                position: 5,
                orientation: "down",
                startx: 6,
                starty: 9,
            },
     
       
        ];

        var puzzleData3 = [
            {
                clue: "¿Qué grupo social encabezó las revoluciones liberales?",
                answer: "burguesia",
                position: 3,
                orientation: "across",
                startx: 2,
                starty: 5,
            },
            {
                clue: "¿Qué poder político deseaba obtener la burguesía?",
                answer: "parlamento",
                position: 1,
                orientation: "across",
                startx: 4,
                starty: 3,
            },
            {
                clue: "¿Cuál es la ideología basada en los derechos políticos e ideológicos centrados en la idea de libertad?",
                answer: "liberalismo",
                position: 4,
                orientation: "across",
                startx: 3,
                starty: 14,
            },
         
            {
                clue: "¿Qué quería conseguir la burguesía en relación con el Antiguo Régimen?",
                answer: "igualdad",
                position: 6,
                orientation: "down",
                startx: 9,
                starty: 5,
            },
         
            {
                clue: "¿Cuál fue el origen del liberalismo?",
                answer: "parlamentarismo",
                position: 1,
                orientation: "down",
                startx: 4,
                starty: 3,
            },
            {
                clue: "¿Qué tipo de sufragio se estableció en las revoluciones liberales?",
                answer: "universal",
                position: 5,
                orientation: "down",
                startx: 6,
                starty: 10,
            },
            {
                clue: "¿Qué ilustrado francés defendió la libertad individual?",
                answer: "voltaire",
                position: 7,
                orientation: "down",
                startx: 13,
                starty: 2,
            },
        ];

        var puzzleData4 = [
        
            {
                clue: "¿Cuál es el tipo de sociedad más frecuente en las economías de mercado?",
                answer: "capitalista",
                position: 3,
                orientation: "across",
                startx: 3,
                starty: 5,
            },
         
            {
                clue: "¿Cuál es el tipo de sociedad mercantil en la que la responsabilidad de cada socio está delimitada por el capital aportado?",
                answer: "limitada",
                position: 6,
                orientation: "across",
                startx: 8,
                starty: 8,
            },
            {
                clue: "¿Cuál es el tipo de sociedad mercantil en la que la responsabilidad de los socios se limita al capital aportado?",
                answer: "anonima",
                position: 5,
                orientation: "across",
                startx: 5,
                starty: 16,
            },
            {
                clue: "¿Qué tipo de inversión se espera obtener en una sociedad capitalista?",
                answer: "rendimiento",
                position: 1,
                orientation: "across",
                startx: 2,
                starty: 3,
            },
            {
                clue: "¿Qué es una organización empresarial con ánimo de lucro que nace de la unión de dos o más socios?",
                answer: "sociedad",
                position: 7,
                orientation: "down",
                startx: 11,
                starty: 5,
            },
        
            {
                clue: "¿En qué tipo de sociedad la responsabilidad de los socios es ilimitada?",
                answer: "personalista",
                position: 4,
                orientation: "down",
                startx: 5,
                starty: 5,
            },
            {
                clue: "¿Qué tipo de empresa ofrece bienes o servicios con ánimo de lucro?",
                answer: "mercantil",
                position: 2,
                orientation: "down",
                startx: 3,
                starty: 2,
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
