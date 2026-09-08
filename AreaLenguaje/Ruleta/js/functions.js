var color_lirico =""

var miRuleta = new Winwheel({
    numSegments: 10,
    outerRadius: 191,
    segments: [
      { fillStyle: "#ffeb3b", text: "Genero Lirico" },
      { fillStyle: "#304ffe", text: "Porqué, Porque, Por Qué" },
      { fillStyle: "#3949ab", text: "Componentes de la Oración" },
      { fillStyle: "#00bcd4", text: "Uso del punto" },
      { fillStyle: "#e91e63", text: "Las Variantes Linguisticas" },
      { fillStyle: "#ffeb3b", text: "El Género Dramático" },
      { fillStyle: "#304ffe", text: "La Novela" },
      { fillStyle: "#3949ab", text: "El Verbo" },
      { fillStyle: "#00bcd4", text: "El Signo Linguistico" },
      { fillStyle: "#e91e63", text: "Mesa Redonda" }
    ],
    animation: {
      type: "spinToStop",
      duration: 5,
      callbackFinished: "mensaje()",
      callbackAfter: "dibujarIndicador()"
    }
  });
  
  
  dibujarIndicador();
  
  function mensaje() {
    var SegmentoSeleccionado = miRuleta.getIndicatedSegment();

    document.getElementById("tituTema").innerHTML=SegmentoSeleccionado.text;
   

    setTimeout(() =>{
      document.getElementById("divPreguntas").style.display = "block";
      document.getElementById("divCalvas").style.display = "none";
      document.getElementById("btnGirar").style.display = "none";
      iniciarTrivia(SegmentoSeleccionado.text);
      miRuleta.stopAnimation(false);
      miRuleta.rotationAngle = 0;
      miRuleta.draw();
      dibujarIndicador();
    },2000)
   
    

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
    ctx.moveTo(170, 10);
    ctx.lineTo(230, 10);
    ctx.lineTo(200, 70);
    ctx.lineTo(170, 10);
    ctx.stroke();
    ctx.fill();
  }
  