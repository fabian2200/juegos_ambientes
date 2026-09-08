$(document).ready(function () {
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
                    maquina2("bienvenida", 'Hola, soy Genio. <br> Usa la fórmula y completa la pirámide, completando los numeros faltantes. <br> ¡Tú Puedes!', 50, 1);
                }, 3000)
            }, 2000)
        })
    }, 200)
});

function reloj(){
    var timeleft = 180;
    var downloadTimer = setInterval(function(){
      var minutes = Math.floor(timeleft / 60);
      var seconds = timeleft - minutes * 60;
      if(seconds < 10) {
        seconds = "0" + seconds;
      }
      document.getElementById("timer").innerHTML = minutes + ":" + seconds;
      timeleft -= 1;
      if(timeleft <= 0){
        clearInterval(downloadTimer);
        document.getElementById("timer").innerHTML = "0:00";
        setTimeout(function(){
            $('#principal').fadeToggle(500);
            setTimeout(() => {
                $('#final').fadeToggle(1000);
            }, 500)
            document.getElementById("final").style.backgroundImage = "url(../../images/derrota.gif)";
            document.getElementById("texto_final").innerText = "Lo siento, se te ha acabado el tiempo";
            var audio = new Audio('../../sounds/game_over.mp3');
            audio.play();
            
        }, 1000);
      }
    }, 1000);
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
                generarPiramide();
                reloj();
            }, 2000)
        }, 2000);
    }
}

let nivel1 = [];
let nivel2 = [];
let nivel3 = [];
let nivel4 = [];
let nivel5 = [];
let nivel6 = [];

function generarPiramide() {
    let tipo = Math.floor(Math.random() * (2 - 1 + 1) + 1);
    document.getElementById("imagen_pista").style.display = "block"
    if (tipo == 1) {
        for (let index = 0; index < 6; index++) {
            var element = Math.floor(Math.random() * (30 - 1 + 1) + 1);
            nivel6.push(element);
        }

        for (let index = 0; index < nivel6.length - 1; index++) {
            var element = nivel6[index] + nivel6[index + 1];
            nivel5.push(element);
        }

        for (let index = 0; index < nivel5.length - 1; index++) {
            var element = nivel5[index] + nivel5[index + 1];
            nivel4.push(element);
        }

        for (let index = 0; index < nivel4.length - 1; index++) {
            var element = nivel4[index] + nivel4[index + 1];
            nivel3.push(element);
        }

        for (let index = 0; index < nivel3.length - 1; index++) {
            var element = nivel3[index] + nivel3[index + 1];
            nivel2.push(element);
        }

        for (let index = 0; index < nivel2.length - 1; index++) {
            var element = nivel2[index] + nivel2[index + 1];
            nivel1.push(element);
        }

        document.getElementById("imagen_pista").setAttribute("src", "suma.png")
    } else {
        for (let index = 0; index < 6; index++) {
            var element = Math.floor(Math.random() * (2 - 1 + 1) + 1);
            nivel6.push(element);
        }

        for (let index = 0; index < nivel6.length - 1; index++) {
            var element = nivel6[index] * nivel6[index + 1];
            nivel5.push(element);
        }

        for (let index = 0; index < nivel5.length - 1; index++) {
            var element = nivel5[index] * nivel5[index + 1];
            nivel4.push(element);
        }

        for (let index = 0; index < nivel4.length - 1; index++) {
            var element = nivel4[index] * nivel4[index + 1];
            nivel3.push(element);
        }

        for (let index = 0; index < nivel3.length - 1; index++) {
            var element = nivel3[index] * nivel3[index + 1];
            nivel2.push(element);
        }

        for (let index = 0; index < nivel2.length - 1; index++) {
            var element = nivel2[index] * nivel2[index + 1];
            nivel1.push(element);
        }

        document.getElementById("imagen_pista").setAttribute("src", "multi.png")
    }



    let div_6 = "";
    let num_6 = Math.floor(Math.random() * (4 - 1 + 1) + 1);
    for (let index = 0; index < nivel6.length; index++) {
        if(num_6 <= 2){
            if (num_6 != index && index != 5) {
                div_6 += "<div onclick='seleccionar(this)' data-id='" + nivel6[index] + "' class='cajon2'></div>";
            } else {
                div_6 += "<div data-id='" + nivel6[index] + "' class='cajon3'>" + nivel6[index] + "</div>";
            }
        }else{
            if (num_6 != index && index != 0) {
                div_6 += "<div onclick='seleccionar(this)' data-id='" + nivel6[index] + "' class='cajon2'></div>";
            } else {
                div_6 += "<div data-id='" + nivel6[index] + "' class='cajon3'>" + nivel6[index] + "</div>";
            }
        }
    }

    document.getElementById("nivel6").innerHTML = div_6;

    let div_5 = "";
    let num_5 = 0;
    if (num_6 <= 2) {
        num_5 = num_6;
    } else {
        num_5 = num_6 - 1;
    }

    for (let index = 0; index < nivel5.length; index++) {
        if (num_5 != index) {
            div_5 += "<div onclick='seleccionar(this)' data-id='" + nivel5[index] + "' class='cajon2'></div>";
        } else {
            div_5 += "<div data-id='" + nivel5[index] + "' class='cajon3'>" + nivel5[index] + "</div>";
        }

    }

    document.getElementById("nivel5").innerHTML = div_5;

    let div_4 = "";
    let num_4 = 0;
    if (num_6 <= 2) {
        num_4 = num_6;
    } else {
        num_4 = num_6 - 2;
    }

    for (let index = 0; index < nivel4.length; index++) {
        if (num_4 != index) {
            div_4 += "<div onclick='seleccionar(this)' data-id='" + nivel4[index] + "' class='cajon2'></div>"
        } else {
            div_4 += "<div data-id='" + nivel4[index] + "' class='cajon3'>" + nivel4[index] + "</div>"
        }
    }

    document.getElementById("nivel4").innerHTML = div_4;

    let div_3 = "";
    let num_3 = 0;

    if(num_6 > 2){
        num_3 = Math.floor(Math.random() * (2 - 1 + 1) + 1);
    }else{
        num_3 = Math.floor(Math.random() * (1 - 0 + 1) + 0);
    }

    for (let index = 0; index < nivel3.length; index++) {
        if (num_3 != index) {
            div_3 += "<div onclick='seleccionar(this)' data-id='" + nivel3[index] + "' class='cajon2'></div>"
        } else {
            div_3 += "<div data-id='" + nivel3[index] + "' class='cajon3'>" + nivel3[index] + "</div>"
        }
    }

    document.getElementById("nivel3").innerHTML = div_3;

    let div_2 = "";
    let num_2 = 0;
    

    if(num_6 > 2){
        num_2 = 1
    }else{
        num_2 = 0
    }
    

    for (let index = 0; index < nivel2.length; index++) { 
        if (num_2 != index) {
            div_2 += "<div onclick='seleccionar(this)' data-id='" + nivel2[index] + "' class='cajon2'></div>" 
        } else {
            div_2 += "<div data-id='" + nivel2[index] + "' class='cajon3'>" + nivel2[index] + "</div>" 
        }
        
    }

    document.getElementById("nivel2").innerHTML = div_2;

    let div_1 = "";

    for (let index = 0; index < nivel1.length; index++) {
        div_1 += "<div onclick='seleccionar(this)' data-id='" + nivel1[index] + "' class='cajon2'></div>"
    }

    document.getElementById("nivel1").innerHTML = div_1;

};

let elemento_editar = "";
function seleccionar(elemento) {
    elemento_editar = elemento;
    let cajones = document.getElementsByClassName("cajon2");
    for (let index = 0; index < cajones.length; index++) {
        let elemento = cajones[index];
        elemento.classList.remove("seleccionado");
    }

    elemento.classList.add("seleccionado");
}

function escribir(valor) {
    elemento_editar.innerHTML += valor;
}

let correctas = 0;
function verificar(){
    var cajones = document.getElementsByClassName("cajon2");
    let bandera = false;
    for (let index = 0; index < cajones.length; index++) {
        const element = cajones[index];
        if(element.innerHTML == ""){
           bandera = true
        }
    }

    if(!bandera){
        for (let index = 0; index < cajones.length; index++) {
            const element = cajones[index];
            if(element.innerHTML == element.getAttribute("data-id")){
                element.style.backgroundColor = "green";
                element.style.color = "white";
                correctas++;
            }else{
                element.style.backgroundColor = "red";
                element.style.color = "white";
            }
        }
    
        setTimeout(()=>{
            $('#principal').fadeToggle(500);
            setTimeout(() => {
                $('#final').fadeToggle(1000);
            }, 500)
          
            if (correctas == 15) {
                document.getElementById("final").style.backgroundImage = "url(../../images/victoria.gif)";
                document.getElementById("texto_final").innerText = "Has contestado correctamente todos los numeros.";
                var audio = new Audio('../../sounds/victory.mp3');
                audio.play();
            } else {
                document.getElementById("final").style.backgroundImage = "url(../../images/derrota.gif)";
                document.getElementById("texto_final").innerText = "Te has equivocado en "+(15-correctas)+" números, sigue intentando.";
                var audio = new Audio('../../sounds/game_over.mp3');
                audio.play();
            }
        }, 2000)
    }else{
        Swal.fire({
            position: 'center',
            icon: 'info',
            title: 'Debes llenar todos los cajones.',
            showConfirmButton: false,
            timer: 1500
        })
    }
}

function borrar(){
    let escritura = elemento_editar.innerHTML;
    escritura = escritura.split("");

    let nueva_escritura = "";

    for (let index = 0; index < escritura.length -1 ; index++) {
        nueva_escritura += escritura[index];
    }

    elemento_editar.innerHTML = "";
    elemento_editar.innerHTML = nueva_escritura;
}