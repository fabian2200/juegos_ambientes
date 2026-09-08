$(document).ready(function () {
    let audio = new Audio('../../sounds/fondo.mp3');
    audio.play();
    audio.volume = 0.2;
	generarTablero();
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
                    maquina2("bienvenida", 'Hola, soy Genio. <br> Mantente atento a la pantalla, según aparecen las bolas con números márcalos en el cartón, completa una linea en vertical o todo el cartón para ganar. <br> ¡Tú Puedes!', 50, 1);
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
                GenerateCurrentNumber();
				setInterval(GenerateCurrentNumber, 6000);
            }, 2000)
        }, 2000);
    }
}

var array_v = [];
function generarTablero(){
	for (var i = 0; i < 25; i++) {
		canvas = document.getElementById("miCanvas" + i);
		contexto = canvas.getContext("2d");
	
		if (screen.width <= 1366){
			var y = 87;
			var radio = 60;
			var x = 87;
		}else{
			var y = 65;
			var radio = 50;
			var x = 65;
		}

		contexto.fillStyle = "#ff751e";
		contexto.strokeStyle = "#000";
		contexto.lineWidth = 1;
	
		contexto.beginPath();
		contexto.arc(x, y, radio, 0, radians(360));
		contexto.fill();
		contexto.closePath();
	
		var numero_generado = generateFraccion();
		var decimal = numero_generado[0] / numero_generado[1];
	
		while (array_v.includes(decimal)) {
			numero_generado = generateFraccion();
			decimal = numero_generado[0] / numero_generado[1];
		}
	
		array_v.push(decimal);
	
		let numerador = numero_generado[0];
		let denominador = numero_generado[1];
	
		canvas.setAttribute("data-num", numerador);
		canvas.setAttribute("data-den", denominador);
	
		for (j = 0; j < denominador; j++) {
			if (j < numerador) {
				contexto.fillStyle = "rgb(255,117,28)";
			} else {
				contexto.fillStyle = "rgb(255,255,255)";
			}
			contexto.beginPath();
			contexto.moveTo(x, y);
			var fraccion = 360 / denominador;
			var grados = fraccion * j;
			contexto.arc(x, y, radio, radians(grados), radians(grados + fraccion));
			contexto.fill();
			contexto.stroke();
			contexto.closePath();
		}
	
	}
}


function generateFraccion() {
	let numerador = 0;
	let denominador = 0;

	numerador = Math.floor(Math.random() * 9) + 1;

	while (numerador > denominador) {
		denominador = Math.floor(Math.random() * 9) + 1;
	}

	return [numerador, denominador];
}

function radians(grados) {
	return (grados * Math.PI) / 180;
}

function rand_range(min, max) {
	return Math.floor(Math.random() * max + min);
}


function getRandom(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}


// generates the current numbers. makes an array to make sure they dont repeat
var colores = ["#FF0000", "#FFA500", "#FFFF00", "#00FF00", "#00FFFF", "#0000FF", "#8B00FF", "#FF00FF", "#FF69B4", "#FF1493", "#CE00FF", "#FF00A0", "#00FF00", "#FF9B00"];

var cont = 1;
var balotas = [];

function GenerateCurrentNumber() {

	var color = colores[getRandom(0, colores.length - 1)];

	document.getElementById("div_num").style.backgroundColor = color;

	var num = getRandom(1, 9)
	var den = getRandom(1, 9);

	while (num > den || balotas.filter(balota => balota.num == num && balota.den == den).length >= 1) {
		num = getRandom(1, 9)
		den = getRandom(1, 9)
	}

	balotas.push({
		num: num,
		den: den
	});

	document.getElementById("numerador_gen").innerText = num;
	document.getElementById("denominador_gen").innerText = den;
	setTimeout(() => {
		var elemento = document.getElementById("balotas");
		var elemento2 = document.getElementById("div_num");
		var div = "<div class='esfera' style='width: 70px; height: 70px; border-radius: 50%; background-color: " + color + "; margin: 5px;'>" + elemento2.innerHTML + "</div>";

		if (cont > 5) {
			balotas = balotas.slice(1, balotas.length);
		}

		if (cont >= 5) {
			const lastChild = elemento.lastChild;
			elemento.removeChild(lastChild);
		}

		elemento.insertAdjacentHTML("afterbegin", div);

		cont++;
	}, 5900)
}

function marker(x) {

	var datos_i = x.firstChild;

	var n = datos_i.getAttribute("data-num");
	var d = datos_i.getAttribute("data-den");

	let bandera = false;

	for (let index = 0; index < balotas.length; index++) {
		const element = balotas[index];
		if(n == element.num && d == element.den){
			bandera = true;
			break;
		}
	}

	if (bandera) {
		x.style.backgroundColor = "#ffbb00";
		x.classList.add("ok");
		verify_bingo();
	}
}

var con_a = true;
var con_b = true;
var con_c = true;
var con_d = true;
var con_e = true;

function verify_bingo(){
	var ok = document.getElementsByClassName("ok");

	var numero_a = 0;
	var numero_b = 0;
	var numero_c = 0;
	var numero_d = 0;
	var numero_e = 0;

	


	for (let index = 0; index < ok.length; index++) {
		const element = ok[index];
		if(element.classList.contains('a')){
			numero_a++;
		}

		if(element.classList.contains('b')){
			numero_b++;
		}

		if(element.classList.contains('c')){
			numero_c++;
		}

		if(element.classList.contains('d')){
			numero_d++;
		}

		if(element.classList.contains('e')){
			numero_e++;
		}
	}

	let bandera = false;
	if(numero_a == 5 && con_a){
		con_a = false;
		bandera = true;
	}

	if(numero_b == 5 && con_b){
		con_b = false;
		bandera = true;
	}

	if(numero_c == 5 && con_c){
		con_c = false;
		bandera = true;
	}

	if(numero_d == 5 && con_d){
		con_d = false;
		bandera = true;
	}

	if(numero_e == 5 && con_e){
		con_e = false;
		bandera = true;
	}

	if(bandera){
		Swal.fire({
			title: '¡BINGO!',
			text: "¿Desea seguir jugando?",
			icon: 'info',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Si, continuar',
			cancelButtonText: 'No, salir'
		  }).then((result) => {
			if (result.isConfirmed) {
				Swal.close();
			} else if (result.dismiss === Swal.DismissReason.cancel) {
				$('#principal').fadeToggle(500);
				setTimeout(() => {
					$('#final').fadeToggle(1000);
				}, 500)
	
				document.getElementById("final").style.backgroundImage = "url(../../images/victoria.gif)";
	
				document.getElementById("texto_final").innerText = "¡BINGO!, Felicitaciones, has completado la misión....";
	
				var audio = new Audio('../../sounds/victory.mp3');
				audio.play();
			}
		  })
	}
	
	if(ok.length == 25){
		$('#principal').fadeToggle(500);
		setTimeout(() => {
			$('#final').fadeToggle(1000);
		}, 500)

		document.getElementById("final").style.backgroundImage = "url(../../images/victoria.gif)";

		document.getElementById("texto_final").innerText = "¡BINGO!, Felicitaciones, has completado la misión....";

		var audio = new Audio('../../sounds/victory.mp3');
		audio.play();
	}
	
}