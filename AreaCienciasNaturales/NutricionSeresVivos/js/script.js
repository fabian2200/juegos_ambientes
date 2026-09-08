let correctas = 0;
let cont = 0;
let avatar = "";
let array_divs = [];
let x = 1;

let definiciones = [];
let defmostradas = [];
let par;
let cantParte;

var parteAve = [
  {
    "parte": "Buche",
    "imagen": "img/Aves/buche.png",
    "definicion": "Estructura dilatada del esófago que almacena temporalmente el alimento antes de su digestión."
  },
  {
    "parte": "Ciego",
    "imagen": "img/Aves/ciego.png",
    "definicion": "Porción del intestino donde ocurre la fermentación bacteriana y la absorción de agua en algunas especies de aves."
  },
  {
    "parte": "Cloaca",
    "imagen": "img/Aves/cloaca.png",
    "definicion": "Órgano donde se unen los sistemas digestivo, excretor y reproductor, y a través del cual se eliminan los desechos y se depositan los huevos."
  },
  {
    "parte": "Conducto-Biliar",
    "imagen": "img/Aves/conducto-biliar.png",
    "definicion": "Conducto que transporta la bilis desde el hígado hasta el intestino para ayudar en la digestión de las grasas."
  },
  {
    "parte": "Duodeno",
    "imagen": "img/Aves/duodena.png",
    "definicion": "La primera porción del intestino delgado donde ocurre la digestión final de los alimentos y la absorción de nutrientes."
  },
  {
    "parte": "Siringe",
    "imagen": "img/Aves/siringe.png",
    "definicion": "Órgano vocal especializado en las aves que les permite producir sonidos y vocalizaciones."
  },
  {
    "parte": "Esófago",
    "imagen": "img/Aves/esofago.png",
    "definicion": "Conducto muscular que transporta el alimento desde el pico hasta el estómago."
  },
  {
    "parte": "Faringe",
    "imagen": "img/Aves/faringe.png",
    "definicion": "Parte de la garganta que conecta la boca con el esófago y la tráquea."
  },
  {
    "parte": "Glotis",
    "imagen": "img/Aves/glotis.png",
    "definicion": "Abertura en la parte superior de la tráquea que controla el paso del aire hacia los pulmones durante la respiración."
  },
  {
    "parte": "Hígado",
    "imagen": "img/Aves/higado.png",
    "definicion": "Órgano principal del sistema digestivo que produce la bilis y desempeña funciones metabólicas y desintoxicantes."
  },
  {
    "parte": "Intestino",
    "imagen": "img/Aves/intestino.png",
    "definicion": "Órgano largo y tubular donde ocurre la digestión final y la absorción de nutrientes."
  },
  {
    "parte": "Laringe",
    "imagen": "img/Aves/laringe.png",
    "definicion": "Órgano vocal que se encuentra en la parte superior de la tráquea y juega un papel en la producción de sonidos."
  },
  {
    "parte": "Lengua",
    "imagen": "img/Aves/lengua.png",
    "definicion": "Órgano muscular en el interior del pico que ayuda a manipular y tragar los alimentos."
  },
  {
    "parte": "Molleja",
    "imagen": "img/Aves/molleja.png",
    "definicion": "Segunda parte del estómago de las aves que ayuda en la trituración y digestión mecánica de los alimentos."
  },
  {
    "parte": "Páncreas",
    "imagen": "img/Aves/pancreas.png",
    "definicion": "Órgano que secreta enzimas digestivas y hormonas importantes para la digestión y el metabolismo."
  },
  {
    "parte": "Proventrículo",
    "imagen": "img/Aves/proventriculo.png",
    "definicion": "La primera parte del estómago de las aves donde ocurre la secreción de ácido clorhídrico y enzimas digestivas."
  },
  {
    "parte": "Pulmones",
    "imagen": "img/Aves/pulmones.png",
    "definicion": "Órganos responsables de la respiración en las aves, donde tiene lugar el intercambio de gases."
  },
  {
    "parte": "Tráquea",
    "imagen": "img/Aves/traquea.png",
    "definicion": "Tubo flexible que conecta la glotis con los pulmones y permite el paso del aire durante la respiración."
  }
]

var parteMamifero =[
  {
    "parte": "Boca",
    "imagen": "img/Mamiferos/Boca.png",
    "definicion": "Cavidad en la parte frontal de la cabeza donde se encuentran los dientes y la lengua, y donde comienza el proceso de digestión."
  },
  {
    "parte": "Cuajar",
    "imagen": "img/Mamiferos/Cuajar.png",
    "definicion": "Estómago especializado presente en algunos mamíferos rumiantes, como las vacas, que ayuda en la digestión de alimentos fibrosos."
  },
  {
    "parte": "Esófago",
    "imagen": "img/Mamiferos/Esofago.png",
    "definicion": "Tubo muscular que conecta la boca con el estómago y se encarga de transportar el alimento ingerido hacia el sistema digestivo."
  },
  {
    "parte": "Intestino",
    "imagen": "img/Mamiferos/Intestino.png",
    "definicion": "Órgano largo y tubular donde se completa la digestión de los alimentos y se absorben los nutrientes en el torrente sanguíneo."
  },
  {
    "parte": "Libro",
    "imagen": "img/Mamiferos/Libro.png",
    "definicion": "Primera porción del intestino delgado en mamíferos que recibe los jugos digestivos del páncreas y la bilis del hígado para continuar la digestión."
  },
  {
    "parte": "Retículo",
    "imagen": "img/Mamiferos/Reticulo.png",
    "definicion": "Compartimiento del sistema digestivo presente en rumiantes que ayuda en la fermentación de los alimentos y la formación del bolo alimenticio."
  },
  {
    "parte": "Rumen",
    "imagen": "img/Mamiferos/Rumen.png",
    "definicion": "Compartimiento del sistema digestivo presente en rumiantes donde ocurre la fermentación microbiana de los alimentos consumidos."
  }
]

var parteHumana = [
  {
    "parte": "Ano",
    "imagen": "img/Humana/Ano.png",
    "definicion": "Orificio de salida del sistema digestivo que se encuentra al final del intestino grueso y se utiliza para eliminar los desechos sólidos del cuerpo."
  },
  {
    "parte": "Cavidad oral",
    "imagen": "img/Humana/Cavidad-oral.png",
    "definicion": "Espacio que incluye los labios, la lengua, los dientes y las encías, donde se inicia el proceso de digestión con la masticación y la mezcla de alimentos con la saliva."
  },
  {
    "parte": "Esófago",
    "imagen": "img/Humana/Esofago.png",
    "definicion": "Tubo muscular que conecta la cavidad oral con el estómago y se encarga de transportar el alimento ingerido hacia el sistema digestivo."
  },
  {
    "parte": "Estómago",
    "imagen": "img/Humana/Estomago.png",
    "definicion": "Órgano en forma de bolsa donde ocurre la digestión de los alimentos mediante la acción del ácido y las enzimas gástricas, y donde se inicia la descomposición de las proteínas."
  },
  {
    "parte": "Glándulas salivares",
    "imagen": "img/Humana/Glandulas-salivales.png",
    "definicion": "Glándulas ubicadas en la cavidad oral que producen y liberan saliva, que contiene enzimas digestivas para iniciar la descomposición de los alimentos."
  },
  {
    "parte": "Hígado",
    "imagen": "img/Humana/Higado.png",
    "definicion": "Órgano grande situado en la parte superior derecha del abdomen que produce la bilis, descompone los nutrientes y desintoxica sustancias nocivas en el cuerpo."
  },
  {
    "parte": "Intestino delgado",
    "imagen": "img/Humana/Intestino-delgado.png",
    "definicion": "Porción larga y estrecha del sistema digestivo donde tiene lugar la mayor parte de la digestión y la absorción de los nutrientes en el torrente sanguíneo."
  },
  {
    "parte": "Intestino grueso",
    "imagen": "img/Humana/Intestino-grueso.png",
    "definicion": "Porción final del sistema digestivo donde se absorbe agua y se forman las heces antes de ser eliminadas a través del ano."
  },
  {
    "parte": "Páncreas",
    "imagen": "img/Humana/Pancrear.png",
    "definicion": "Órgano que produce enzimas digestivas y hormonas como la insulina, que ayudan en la digestión de los alimentos y la regulación de los niveles de azúcar en la sangre."
  },
  {
    "parte": "Recto",
    "imagen": "img/Humana/Recto.png",
    "definicion": "Última porción del intestino grueso que conecta el colon con el ano y almacena temporalmente las heces antes de su eliminación."
  },
  {
    "parte": "Vesícula biliar",
    "imagen": "img/Humana/vesicula-biliar.png",
    "definicion": "Órgano pequeño que almacena y concentra la bilis producida por el hígado, y la libera al intestino delgado para ayudar en la digestión de las grasas."
  }
]

var partePeces = [
  {
    "parte": "Boca",
    "imagen": "img/Peces/boca.png",
    "definicion": "Abertura en la cabeza de los peces que se utiliza para la ingesta de alimentos."
  },
  {
    "parte": "Arcos branquiales",
    "imagen": "img/Peces/arcos-branquiales.png",
    "definicion": "Estructuras en los peces que contienen las branquias y permiten la respiración acuática al extraer oxígeno del agua."
  },
  {
    "parte": "Corazón",
    "imagen": "img/Peces/corazon.png",
    "definicion": "Órgano que bombea la sangre a través del sistema circulatorio de los peces, proporcionando oxígeno y nutrientes a los tejidos del cuerpo."
  },
  {
    "parte": "Hígado",
    "imagen": "img/Peces/higado.png",
    "definicion": "Órgano importante en los peces que realiza funciones de almacenamiento, producción de enzimas digestivas y desintoxicación."
  },
  {
    "parte": "Intestino",
    "imagen": "img/Peces/intestino.png",
    "definicion": "Órgano donde tiene lugar la digestión final y la absorción de nutrientes en los peces."
  },
  {
    "parte": "Estómago",
    "imagen": "img/Peces/estomago.png",
    "definicion": "Órgano en el sistema digestivo de los peces que se encarga de la descomposición de los alimentos y la producción de enzimas digestivas."
  },
  {
    "parte": "Ano",
    "imagen": "img/Peces/ano.png",
    "definicion": "Abertura ubicada en la parte posterior del cuerpo de los peces a través de la cual se eliminan los desechos sólidos."
  }
]


function elegir() {
  let nutri = Math.floor((Math.random() * (4 - 1 + 1)) + 1);
  //let nutri = 4;
  seleccionar(nutri);
}

function seleccionar(nutri) {

  switch (nutri) {
    case 1:
      categoria = "Mueve cada parte del Ave según la definición mostrada.";
      textTitulo = "Hola, soy Genio. <br> En este juego debes arrastrar las partes del Ave según la definición mostrada al lugar que corresponda.";
      definiciones = parteAve;
      cantParte = definiciones.length;
      break;
    case 2:
        categoria = "Mueve cada parte del Mamífero según la definición mostrada.";
        textTitulo = "Hola, soy Genio. <br> En este juego debes arrastrar las partes del Mamífero según la definición mostrada al lugar que corresponda.";
        definiciones = parteMamifero;
        cantParte = definiciones.length;
      break;
    case 3:
        categoria = "Mueve cada parte del Humano según la definición mostrada.";
        textTitulo = "Hola, soy Genio. <br> En este juego debes arrastrar las partes del Humano según la definición mostrada al lugar que corresponda.";
        definiciones = parteHumana;
        cantParte = definiciones.length;
        break;
        case 4:
            categoria = "Mueve cada parte del Pez según la definición mostrada.";
            textTitulo = "Hola, soy Genio. <br> En este juego debes arrastrar las partes del Pez según la definición mostrada al lugar que corresponda.";
            definiciones = partePeces;
            cantParte = definiciones.length;

        break;

  }

  mostPreg();
  document.getElementById("categoria").innerText = categoria;

  setTimeout(function () {
    swal.close();
    if (nutri == 1) {
      CargarJuegoNutriAves(textTitulo);
    } else if (nutri == 2) {
        CargarJuegoNutriMamifero(textTitulo);
    } else if (nutri == 3) {
        CargarJuegonutriHumana(textTitulo);
    } else {
      CargarJuegonutriPeces(textTitulo);
    }
  }, 500);
}

function obtenerIndiceAleatorio() {
  let indice = Math.floor(Math.random() * definiciones.length);
  while (defmostradas.includes(indice)) {
    indice = Math.floor(Math.random() * definiciones.length);
  }
  defmostradas.push(indice);

  return indice;
}

function mostPreg() {
  let index = obtenerIndiceAleatorio();

  let def = definiciones[index].definicion;
  par = definiciones[index].parte;
  
  document.getElementById("pregunta").innerText = def;
}

///NUTRICION AVES

function CargarJuegoNutriAves() {
  cargarPresentacion(textTitulo);
  document.getElementById("opcionAves").style.display = "block";

  correctas = 0;
  cont = 0;
  avatar = "";
  array_divs = [];
  x = 1;

  var top = 40;
  var top2 = 40;

  var aux = definiciones;
  aux = randomValueGenerator(aux);
  i = 0;

  definiciones.forEach(element => {
    if(i <= 8){
      array_divs.push(
        "<img id='NombAve"+i+"' style='position: absolute; left: 20px; top: "+top+"px;' data-id='"+element.parte+"' draggable='true' width='60' class='nombreAve'  src='"+element.imagen+"' />"
      ); 
      top += 50;
    }else{
      array_divs.push(
        "<img id='NombAve"+i+"' style='position: absolute; left: 150px; top: "+top2+"px;' data-id='"+element.parte+"' draggable='true' width='60' class='nombreAve'  src='"+element.imagen+"' />"
      );  
      top2 += 50;
    }
    i++;  
  });

  div = "";
  for (let index = 0; index < array_divs.length; index++) {
      const element = array_divs[index];
      div += element;
  }

  document.getElementById("nombrCiclosAve").innerHTML = div;

  setTimeout(()=>{
    startGame("puntoAve", "nombreAve");
  })
}

///NUTRICION MAMIFERO
function CargarJuegoNutriMamifero() {
  
  cargarPresentacion(textTitulo);
  document.getElementById("opcionMamifero").style.display = "block";

  correctas = 0;
  cont = 0;
  avatar = "";
  array_divs = [];
  x = 1;

  var top = 40;
  var top2 = 40;

  var aux = definiciones;
  aux = randomValueGenerator(aux);
  i = 0;


  definiciones.forEach(element => {
    if(i <= 8){
      array_divs.push(
        "<img id='NombMami"+i+"' style='position: absolute; left: 20px; top: "+top+"px;' data-id='"+element.parte+"' draggable='true' width='60' class='nombreMami'  src='"+element.imagen+"' />"
      ); 
      top += 50;
    }else{
      array_divs.push(
        "<img id='NombMami"+i+"' style='position: absolute; left: 150px; top: "+top2+"px;' data-id='"+element.parte+"' draggable='true' width='60' class='nombreMami'  src='"+element.imagen+"' />"
      );  
      top2 += 50;
    }
    i++;  
  });

  div = "";
  for (let index = 0; index < array_divs.length; index++) {
      const element = array_divs[index];
      div += element;
  }

  document.getElementById("nombrCiclosMamifero").innerHTML = div;

  setTimeout(()=>{
    startGame("puntoMami", "nombreMami");
  })

}
  

///NUTRICION HUMANA
function CargarJuegonutriHumana() {
  
  cargarPresentacion(textTitulo);

  document.getElementById("opcionHumana").style.display = "block";

  correctas = 0;
  cont = 0;
  avatar = "";
  array_divs = [];
  x = 1;

  var top = 40;
  var top2 = 40;

  var aux = definiciones;
  aux = randomValueGenerator(aux);
  i = 0;

  definiciones.forEach(element => {
    if(i <= 8){
      array_divs.push(
        "<img id='NombHumana"+i+"' style='position: absolute; left: 20px; top: "+top+"px;' data-id='"+element.parte+"' draggable='true' width='60' class='nombreHumana'  src='"+element.imagen+"' />"
      ); 
      top += 50;
    }else{
      array_divs.push(
        "<img id='NombHumana"+i+"' style='position: absolute; left: 150px; top: "+top2+"px;' data-id='"+element.parte+"' draggable='true' width='60' class='nombreHumana'  src='"+element.imagen+"' />"
      );  
      top2 += 50;
    }
    i++;  
  });
  
  div = "";
  for (let index = 0; index < array_divs.length; index++) {
      const element = array_divs[index];
      div += element;
  }

  document.getElementById("nombrCiclosHumana").innerHTML = div;

  setTimeout(()=>{
    startGame("puntoHumana", "nombreHumana");
  })

}

///NUTRICION PECES

function CargarJuegonutriPeces() {
  
  cargarPresentacion(textTitulo);

  document.getElementById("opcionPeces").style.display = "block";

  correctas = 0;
  cont = 0;
  avatar = "";
  array_divs = [];
  x = 1;

  var top = 40;
  var top2 = 40;

  var aux = definiciones;
  aux = randomValueGenerator(aux);
  i = 0;

  definiciones.forEach(element => {
    if(i <= 8){
      array_divs.push(
        "<img id='NomPeces"+i+"' style='position: absolute; left: 20px; top: "+top+"px;' data-id='"+element.parte+"' draggable='true' width='60' class='nombrePeces'  src='"+element.imagen+"' />"
      ); 
      top += 50;
    }else{
      array_divs.push(
        "<img id='NomPeces"+i+"' style='position: absolute; left: 150px; top: "+top2+"px;' data-id='"+element.parte+"' draggable='true' width='60' class='nombrePeces'  src='"+element.imagen+"' />"
      );  
      top2 += 50;
    }
    i++;  
  });

  div = "";
  for (let index = 0; index < array_divs.length; index++) {
      const element = array_divs[index];
      div += element;
  }

  document.getElementById("nombrCiclosPeces").innerHTML = div;

  setTimeout(()=>{
    startGame("puntoPeces", "nombrePeces");
  })
}

const randomValueGenerator = (vector) => {
  return vector.sort(function (a, b) {
    return Math.random() - 0.5;
  });
};



elegir();

function cargarPresentacion(textTitulo) {
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
          maquina2("bienvenida", textTitulo, 100, 1);
        }, 3000);
      }, 2000);
    });
  }, 200);
}

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
        $("#img-mascota").show();
      }, 2000);
    }, 2000);
  }
}


//  para pantallas moviles

function startGame(claseSeleccionada, claseSeleccionada2){
  currentElement = "";

  dropPoints = document.querySelectorAll("."+claseSeleccionada);
  
  var miDivs = document.getElementsByClassName(claseSeleccionada2);

  for (let index = 0; index < miDivs.length; index++) {
      var miDiv = miDivs[index];

      miDiv.addEventListener('touchstart', mover_tactil);
      miDiv.addEventListener('touchmove', mover_tactil2);
      miDiv.addEventListener("touchend", drop);
  }

  dropPoints.forEach((element) => {
      element.addEventListener("dragover", dragOver);
      element.addEventListener("drop", drop);
  });
};


//For touchscreen movement
var initialXx = 0;
var initialYy = 0;
var currentElement;
var top_o = 0;
var left_o = 0;
var id_sel = "";

function mover_tactil(event) {
  event.preventDefault();
  // Obtener la posición inicial del dedo
  initialXx = event.touches[0].clientX - event.target.offsetLeft;
  initialYy = event.touches[0].clientY - event.target.offsetTop;
  currentElement = event.target;

  if(id_sel != event.target.id){
      id_sel = currentElement.id;
      var offsets = document.getElementById(id_sel);
      top_o = offsets.style.top;
      left_o = offsets.style.left;
  }
}

function mover_tactil2(event) {
  event.preventDefault();
  // Obtener la posición actual del dedo
  var currentX = event.touches[0].clientX - initialXx;
  var currentY = event.touches[0].clientY - initialYy;

  // Actualizar la posición de la div

  event.target.style.width = "65px";
  event.target.style.height = "16px";

  event.target.style.left = currentX + 'px';
  event.target.style.top = currentY + 'px';

  initialX = event.touches[0].clientX;
  initialY = event.touches[0].clientY;
}


//Events fired on the drop target
function dragOver(e) {
  e.preventDefault();
}

//Detect touch device
const isTouchDevice = () => {
  try {
      //We try to create Touch Event (It would fail for desktops and throw error)
      document.createEvent("TouchEvent");
      deviceType = "touch";
      return true;
  } catch (e) {
      deviceType = "mouse";
      return false;
  }
};


let moveElement = false;
const drop = (e) => {
  e.preventDefault();
  //For touch screen
  if (isTouchDevice()) {
      moveElement = false;
      //Select country name div using the custom attribute
      const pos = currentElement.getBoundingClientRect();
      const currentDrop = document.elementsFromPoint(pos.left, pos.top);
  
      let id1 = currentElement.getAttribute("data-id");
      let id2 = currentDrop[0].getAttribute("data-id");

      if (id1 == id2) {
          currentDrop[0].classList.add("dropped");
          //hide actual image
          currentDrop[0].innerHTML = ``;
          //Insert new img element
          currentDrop[0].insertAdjacentHTML(
              "afterbegin",
              `<img class='img_drag' style='height: 20px; width: 70px;' src="${currentElement.getAttribute("src")}">`
          );
          correctas++;
          currentElement.style.display = "none";
          cont++;
      }else{
          var off = document.getElementById(id_sel);
          off.style.position = "absolute",
          off.style.top = top_o;
          off.style.left = left_o;
          off.style.width = "100px";
          off.style.height = "30px";

      }
  } 

  if (cont == cantParte) {

      $("#principal").fadeToggle(1000);
      $("#final").fadeToggle(1000);

      let prom=(correctas / parseInt(cantParte)) * 100
      
      if (prom < 60) {
          var audio = new Audio("../../sounds/game_over.mp3");
          audio.play();
          document.getElementById("final").style.backgroundImage = "url(../../images/derrota.gif)";
      } else {
          document.getElementById("final").style.backgroundImage = "url(../../images/victoria.gif)";
          var audio = new Audio("../../sounds/victory.mp3");
          audio.play();
      }
      document.getElementById("texto_final").innerText = "Has obtenido " + correctas + " puntos de " + cantParte + " posibles";

  }
};