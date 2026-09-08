let conse = 0;
let score = 0;
let timer;
let PregMostrada = [];
let partesR=16;
let imgSistema="";
let nombreSistema="";

let sistemas = [
  {
    nombre: "Aparato Reproductor Masculino",
    img: "img/aparato_masculino.png",
    partes: 16,
  },
  {
    nombre: "Aparato Reproductor Femenino",
    img: "img/aparato_femenino.png",
    partes: 16,
  },
  {
    nombre: "Sistema Circulatorio",
    img: "img/sistema_circulatorio.png",
    partes: 25,
  },
  {
    nombre: "Aparato Digestivo",
    img: "img/sistema_digestivo.png",
    partes: 16,
  },
  {
    nombre: "Sistema Endocrino",
    img: "img/sistema_endocrino.png",
    partes: 25,
  },
  {
    nombre: "Sistema muscular",
    img: "img/sistema_muscular.png",
    partes: 25,
  },
  {
    nombre: "Sistema Nervioso",
    img: "img/sistema_nervioso.png",
    partes: 25,
  },
  {
    nombre: "Sistema Óseo",
    img: "img/sistema_ose.png",
    partes: 25,
  },
  {
    nombre: "Sistema Respiratorio",
    img: "img/sistema_respiratorio.png",
    partes: 16,
  },
  {
    nombre: "Sistema Urinario",
    img: "img/sistema_urinario.png",
    partes: 16,
  },
];


// Función para iniciar el juego
function startGame() {
  // Configuración inicial
  inicioTiempo();
  score = 0;
  
  rompecabezas._barajar();
}



$(document).ready(function () {
  setTimeout(() => {
    $("#principal").fadeToggle(1000);
    $("#fondo_blanco").fadeToggle(3000);
    setTimeout(() => {
      const divAnimado = document.querySelector(".overlay");
      divAnimado.style.animationName = "moverDerecha";
      divAnimado.style.animationDirection = "normal";
      divAnimado.style.display = "block";
      setTimeout(() => {
        const divAnimado2 = document.querySelector(".nube");
        divAnimado2.style.animationName = "moverArriba";
        divAnimado2.style.animationDirection = "normal";
        divAnimado2.style.display = "block";
        setTimeout(() => {
          divAnimado.style.backgroundImage = "url(../../images/ciencia/normal2.gif)";
          maquina2(
            "bienvenida",
            "Hola, soy Genio. <br> En este juego se iran presentando imagenes relacionadas al sisetma reproductor de una forma desordenadas y tendras que ordenarla Pulsando en un cuadro y luego en otro para intercambiar sus posiciones!!",
            50,
            1
          );
        }, 3000);
      }, 2000);
    });
  }, 200);
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
          document.querySelector("#btnomitir").style.display = "none";
          setTimeout(() => {
            cerrar_anuncio();
          }, 3000);
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
    const divAnimado2 = document.querySelector(".nube");
    divAnimado2.style.animationName = "moverabajo";
    const divAnimado = document.querySelector(".overlay");
    divAnimado.style.backgroundImage = "url(../../images/ciencia/normal1.gif)";
    $("#fondo_blanco").fadeToggle(3000);
    setTimeout(function () {
      divAnimado.style.animationName = "moverIzquierda";
      divAnimado.style.animationDirection = "normal";
      setTimeout(() => {
        $("#principal").fadeToggle(1000);
        startGame();
      }, 2000);
    }, 2000);
  }
}

function inicioTiempo() {
  // Obtenemos el elemento del contador
  var contador = document.getElementById("contador");

  // Convertimos 3 minutos a milisegundos
  var tiempoLimite = 3 * 60 * 1000;

  // Obtenemos la hora actual
  var horaActual = new Date().getTime();

  // Establecemos la hora límite
  var horaLimite = horaActual + tiempoLimite;

  // Actualizamos el contador cada segundo
  var intervalo = setInterval(function () {
    // Obtenemos la hora actual
    var horaActual = new Date().getTime();

    // Calculamos la distancia entre la hora límite y la hora actual
    var distancia = horaLimite - horaActual;

    // Calculamos los minutos y segundos restantes
    var minutos = Math.floor((distancia % (1000 * 60 * 60)) / (1000 * 60));
    var segundos = Math.floor((distancia % (1000 * 60)) / 1000);

    // Mostramos el contador en formato mm:ss
    contador.innerHTML =
      "Tiempo restante: " +
      (minutos < 10 ? "0" : "") +
      minutos +
      ":" +
      (segundos < 10 ? "0" : "") +
      segundos;

    // Si el tiempo ha expirado, detenemos el intervalo y mostramos un mensaje
    if (distancia < 0) {
      clearInterval(intervalo);
      contador.innerHTML = "00:00";
      resultadoFinal(2);
    }
  }, 1000);
}

function resultadoFinal(opc) {
  $("#principal").fadeToggle(1000);
  $("#final").fadeToggle(1000);

  let npreg = conse;
  let prom = npreg / 2;

  if (opc==2) {
    var audio = new Audio("../../sounds/game_over.mp3");
    audio.play();
    document.getElementById("final").style.backgroundImage =
      "url(../../images/ciencia/derrota.gif)";
      document.getElementById("texto_final").innerText =
      "Lo siento no lograste Armar El "+nombreSistema;
  } else {
    document.getElementById("final").style.backgroundImage =
      "url(../../images/ciencia/victoria.gif)";
    var audio = new Audio("../../sounds/victory.mp3");
    audio.play();
    document.getElementById("texto_final").innerText =
    "Felicitaciones Lograste Armar El "+nombreSistema;
  }

}



var select = false;
var c = "inc";
var pos_s = "";
var id_s = "";

var rompecabezas = {
  _arr_pos_r : new Array(),
  _arr_pos_a : new Array(),
  
  _mostrar: function(){
  	rompecabezas._arr_pos_r.length = 0;
		var piezas = partesR;
		var tb = document.createElement('table');
		tb.border = 1;
		tb.align = 'center';
		tb.cellPadding = 0;
		tb.cellSpacing = 0;
		var dp = document.createElement('div');
		dp.id = 'posiciones';
		dp.className = 'posic';
		var ar = Math.sqrt(piezas);
		var c = 0;
		var tam_img = 500;
		var pos_img = tam_img / ar;
		for(var fil=1;fil<=ar;fil++){
			var tr = document.createElement('tr');
			for(var cel=1;cel<=ar;cel++){
				c++;
				var td = document.createElement('td');
				td.className = 'pieza';
				td.id = 'pos_'+c;
        td.style.backgroundImage = "url('"+imgSistema+"')";
				td.style.width = pos_img+'px';
				td.style.height = pos_img+'px';
				var dbp = document.createElement('div');
				dbp.id = 'val_bp_'+c;
				var p = Math.round(((pos_img*cel)-pos_img) * -1)+'px '+Math.round(((fil * pos_img)-pos_img) * -1)+'px';
				td.style.backgroundPosition = p;
				rompecabezas._arr_pos_r.push(p);
				dbp.innerHTML = p;
				dp.appendChild(dbp);
				td.onclick = function(){
					rompecabezas._cambiaBGP(this.id);
					rompecabezas._compruebaFin();
				}
				tr.appendChild(td);
			}
			tb.appendChild(tr);
		}
		if(!rompecabezas._get("div_content")){
			var cont = document.getElementById('div_content');
			
			cont.appendChild(tb);
			cont.appendChild(dp);
			document.body.appendChild(cont);
		}else{
			rompecabezas._get("div_content").innerHTML = '';
			rompecabezas._get("div_content").appendChild(tb);
			rompecabezas._get("div_content").appendChild(dp);
			rompecabezas._get("posiciones").removeClass('posic');
			rompecabezas._get("posiciones").innerHTML = '';
			rompecabezas._get("posiciones").className = 'posic';

		}
	},
	
	_barajar: function(){
		var num_alt = null;
		var arr = new Array();
		var resp = "no";
		var i = -1;
		var repite = "no";
		var pie = parseInt(partesR);
		var pie1 = pie + 1;
		while(arr.length < pie){
			repite = "no";
			num_alt = Math.floor(Math.random()*pie1);
			if(num_alt != 0){
				if(arr.length == 0){
					i++;
					arr[i] = num_alt;
				}else{
					for(j=0;j<=arr.length-1;j++){
						if(arr[j] == num_alt){
							repite = "si";
						}
					}
					if(repite != "si"){
						i++;
						arr[i] = num_alt;
					}
				}
			}
		}
	
		var id = 0;	
		for(k=0; k<=arr.length-1;k++){
			id = k-(-1);
			rompecabezas._get("pos_"+id).style.backgroundPosition = rompecabezas._get("val_bp_"+arr[k]).innerHTML;
		}
	},
	
	_cambiaBGP: function(id){
		if(select == false){
			pos_s = rompecabezas._get(id).style.backgroundPosition;
			id_s = id;
			select = true;
      rompecabezas._get(id_s).style.boxShadow = '1px 1px 14px #FFF,-1px -1px 14px #FFF, 1px -1px 14px #FFF,-1px 1px 14px #FFF';
		}else{
			var pos_n =  rompecabezas._get(id).style.backgroundPosition;
			var id_n = id;
			c = "com";
			select = false;
		}
	 
		if(c == "com"){ rompecabezas._get(id_n).style.backgroundPosition = pos_s; rompecabezas._get(id_s).style.backgroundPosition = pos_n;
			c = "inc";
      rompecabezas._get(id_s).style.boxShadow = '';
		}
	},
	
	_compruebaFin: function(){
		var pie = parseInt(partesR);
		var fin = false;
		rompecabezas._arr_pos_a.length = 0;
		for(var i=1;i<=pie;i++){
			rompecabezas._arr_pos_a.push(rompecabezas._get("pos_"+i).style.backgroundPosition);
		}
		for(var j=0;j<rompecabezas._arr_pos_r.length;j++){
			if(rompecabezas._arr_pos_r[j] != rompecabezas._arr_pos_a[j]){
				fin = false;
				break;
			}else{
				fin = true;
			}
		}
		
		if(fin){
      setTimeout(()=>{resultadoFinal(1),3000})
      
		}
	},
	
	_get: function(id){
		return document.getElementById(id);
	}
};


window.onload = function(){

  let indice = Math.floor(Math.random() * sistemas.length);
  nombreSistema = sistemas[indice].nombre;
  imgSistema = sistemas[indice].img;
  partesR = sistemas[indice].partes;
  document.getElementById("tipo").innerHTML="Armar El "+ nombreSistema;
	rompecabezas._mostrar();
}

