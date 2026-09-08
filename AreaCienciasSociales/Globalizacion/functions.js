var color_lirico =""

var miRuleta = new Winwheel({
    numSegments: 3,
    outerRadius: 40,
    
    segments: [
      { fillStyle: "#e91e63", text: "1" },
      { fillStyle: "#304ffe", text: "2" },
      { fillStyle: "#00bcd4", text: "3" }
    ],
    animation: {
      type: "spinToStop",
      duration: 5,
      callbackFinished: "mensaje()",
      callbackAfter: "dibujarIndicador()"
    }
  });
  
  
  dibujarIndicador();
  const player = document.getElementById('player');
  function mensaje() {
    var SegmentoSeleccionado = miRuleta.getIndicatedSegment();

    document.getElementById("tituTema").innerHTML="Preguntas";
   

    setTimeout(() =>{
    //  document.getElementById("divPreguntas").style.display = "block";
      //document.getElementById("divCalvas").style.display = "none";
      //document.getElementById("btnGirar").style.display = "none";
     
    
      miRuleta.stopAnimation(false);
      miRuleta.rotationAngle = 0;
      miRuleta.draw();
      dibujarIndicador();
    },3000);

    if(xpos==13 && SegmentoSeleccionado.text>1){
      miRuleta.startAnimation()
    }else{
      moverPlayer(SegmentoSeleccionado.text); 
    }
    
    

  }

let xpos = 0;
let Posfinal=0;
let flags=true;
var targetDiv;
var oriPlayer;
function moverPlayer(pos){
  if(flags){
    Posfinal = Posfinal + parseInt(pos);
  }
  xpos++;
  oriPlayer ="player-caminadoLeft";

  player.classList.add(oriPlayer);

 
  targetDiv = document.getElementById('puntoIsla'+xpos);

  const offsetX = targetDiv.offsetLeft - player.offsetLeft;
  const offsetY = targetDiv.offsetTop - player.offsetTop;
  player.style.transform =  `translate(${offsetX-10}px, ${offsetY-40}px)`;

  if(xpos<Posfinal){
    setTimeout(function(){
      flags=false;
      moverPlayer(pos);     
    },3000);
 
  }

  setTimeout(function(){
        targetDiv.style.backgroundImage = "url(img/posActual.png)";
  },2000);


  if(Posfinal==xpos){
    setTimeout(function(){
      const modal = document.querySelector("#modal");
      modal.classList.add("md--active");
      player.classList.remove(oriPlayer);
      let idPreSelect = obtenerIndiceAleatorio();
      iniciarTrivia(idPreSelect);
    },3000);
  }
  
  flags=true; 
 
}


function verfResp(){
  if(Respuesta=="ok"){
    targetDiv.style.backgroundImage = "url(img/ok.png)";
  }else{
    targetDiv.style.backgroundImage = "url(img/fail.png)";
  }

  if(xpos==14){
    resultadoFinal();
  }


}

  
  function dibujarIndicador() {
    var ctx = miRuleta.ctx;
  
    // Crear gradiente
    var gradiente = ctx.createLinearGradient(170, 10, 230, 10);
    gradiente.addColorStop(0, "#FFC065");
    gradiente.addColorStop(1, "#FFA055");
  
    ctx.strokeStyle = "#fff";
    ctx.fillStyle = gradiente; // Usar gradiente como fillStyle
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(80, 60);
    ctx.lineTo(115, 60);
    ctx.lineTo(100, 80);
    ctx.lineTo(80, 60);
    ctx.stroke();
    ctx.fill();
  }
  