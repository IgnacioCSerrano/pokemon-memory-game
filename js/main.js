const arrayPersonajes = [
    {
        nombre: "abra",
        rutaImagen: "img/abra.png"
    },
    {
        nombre: "bullbasaur",
        rutaImagen: "img/bullbasaur.png"
    },
    {
        nombre: "charmander",
        rutaImagen: "img/charmander.png"
    },
    {
        nombre: "dratini",
        rutaImagen: "img/dratini.png"
    },
    {
        nombre: "eevee",
        rutaImagen: "img/eevee.png"
    },
    {
        nombre: "jigglypuff",
        rutaImagen: "img/jigglypuff.png"
    },
    {
        nombre: "mankey",
        rutaImagen: "img/mankey.png"
    },
    {
        nombre: "meowth",
        rutaImagen: "img/meowth.png"
    },
    {
        nombre: "pidgey",
        rutaImagen: "img/pidgey.png"
    },
    {
        nombre: "pikachu-2",
        rutaImagen: "img/pikachu-2.png"
    },
    {
        nombre: "psyduck",
        rutaImagen: "img/psyduck.png"
    },
    {
        nombre: "squirtle",
        rutaImagen: "img/squirtle.png"
    } 
]

const game = document.getElementById("game");
const rejilla = document.createElement("section");
const cuentaAtras = document.getElementById("reloj");

const ganador = document.getElementById("ganador");
const perdedor = document.getElementById("perdedor");
const comienzo = document.getElementById("comienzo");
const reinicio = document.getElementById("reinicio");

var audioFondo = document.getElementById("battle");
var audioExito = document.getElementById("victory");
var audioDerrota = document.getElementById("defeat");
var audioPareja = document.getElementById("bounce");
var audioFallo = document.getElementById("fail")
var audioClick = document.getElementById("click");

var contador = 0;

var primerSeleccionado = ""; 
var segundoSeleccionado = "";
var selPrevio = null; 



// Creación de sección rejilla rejilla y elementos 'div' para cada personaje a partir de array

rejilla.setAttribute("class","rejilla"); 
game.appendChild(rejilla); 

const doblePersonajes = arrayPersonajes.concat(arrayPersonajes).sort(()=> 0.5 - Math.random());

doblePersonajes.forEach(personaje => { 
    const {nombre, rutaImagen} = personaje;
    tarjeta = document.createElement("div");
    tarjeta.classList.add("tarjeta"); 
    tarjeta.dataset.name = nombre; 

    anverso = document.createElement("div"); 
    anverso.classList.add("anverso"); 

    reverso = document.createElement("div"); 
    reverso.classList.add("reverso"); 
    reverso.style.backgroundImage = `url(${rutaImagen})`; 

    rejilla.appendChild(tarjeta); 
    tarjeta.appendChild(anverso); 
    tarjeta.appendChild(reverso); 
});



// Lógica para evento click de selección de cada personaje

rejilla.addEventListener("click", function(evento){
    var seleccionado = evento.target; 

    if (seleccionado.nodeName === "SECTION" || seleccionado.parentNode === selPrevio || seleccionado.parentNode.classList.contains("eliminado")) { 
        return; 
    }

    if (contador < 2) { 

        contador++;

        if (contador === 1) {
            primerSeleccionado = seleccionado.parentNode.dataset.name; 
            seleccionado.parentNode.classList.add("seleccionado"); 
        
        } else {
            segundoSeleccionado = seleccionado.parentNode.dataset.name; 
            seleccionado.parentNode.classList.add("seleccionado");
        }

        if (primerSeleccionado !== "" && segundoSeleccionado !== "") { 
            if(primerSeleccionado === segundoSeleccionado) { 
                setTimeout(eliminar, 1200); 
                setTimeout(resetSelec, 1200); 
                contEliminados(); 
            } else {
                setTimeout(resetSelec, 1200);
                audioFallo.currentTime = 0;
                audioFallo.play();
            }
        }

        selPrevio = seleccionado.parentNode; 
    }
    audioClick.currentTime = 0;
    audioClick.play();
});



// Función para asignar clase '.eliminado' cuando existan dos coincidencias

var eliminar = function () { 
    var eliminados = document.querySelectorAll(".seleccionado");

    eliminados.forEach(eliminado => {
        eliminado.classList.add("eliminado");
        
        var eliminados = document.querySelectorAll(".eliminado").length +2; 
        if (eliminados <= 23) {
            audioPareja.play();
        }
    });
}



// Función para resetear los seleccionados cuando no coincidan

var resetSelec = function () {
    primerSeleccionado = ""; 
    segundoSeleccionado = ""; 
    contador = 0; 

    var seleccionados = document.querySelectorAll(".seleccionado")
    seleccionados.forEach(seleccionado => {
        seleccionado.classList.remove("seleccionado");
    });
}



// Función para contar los eliminados y determinar cuándo acaba el juego con éxito

var contEliminados = function () {
    var eliminados = document.querySelectorAll(".eliminado").length +2; 
    if (eliminados === 24) {
        pause();
        game.classList.add("oculto");
        ganador.classList.add("open");
        reinicio.classList.add("pop");
        audioFondo.pause();
        audioFondo.currentTime = 0;
        audioExito.play();
    }
}



// Función de reloj cuenta atrás

var segundos = 120;

function reloj(){
    var s = parseInt(segundos % 60); 
    var ss = ("0" + s).slice(-2); 
    var m = parseInt(segundos / 60);
    var mm = ("0" + m).slice(-2);

    if (segundos > 0){
        t = setTimeout(function(){
            reloj(); 
        }, 1000);
    } else {
        over();
    }

    segundos--;

    cuentaAtras.innerHTML = mm + ":" + ss;
}



// Función comienzo

function start(){
    game.classList.remove("oculto");
    comienzo.classList.add("renacimiento");
    ganador.classList.remove("open");
    perdedor.classList.remove("pop");

    audioFondo.currentTime = 0; 
    audioExito.pause();
    audioExito.currentTime = 0;
    audioDerrota.pause();
    audioDerrota.currentTime = 0;
    audioFondo.play();

    segundos = 120;
    reloj();
}



// Función pausa

function pause(){
    clearTimeout(t);
}



// Función reseteo

function reset(){
    reinicio.classList.remove("pop");

    audioFondo.currentTime = 0; 
    audioExito.pause();
    audioExito.currentTime = 0;
    audioDerrota.pause();
    audioDerrota.currentTime = 0;
    audioFondo.play();

    while(rejilla.firstChild) {
        rejilla.removeChild(rejilla.firstChild);
    }

    reconstruccion();
    start();
}



// Función baraja

function reconstruccion (){
    rejilla.setAttribute("class","rejilla");
    game.appendChild(rejilla);
    const doblePersonajes = arrayPersonajes.concat(arrayPersonajes).sort(()=> 0.5 - Math.random());
    doblePersonajes.forEach(personaje => {
        const {nombre, rutaImagen} = personaje;
        tarjeta = document.createElement("div");
        tarjeta.classList.add("tarjeta");
        tarjeta.dataset.name = nombre; 
    
        anverso = document.createElement("div");
        anverso.classList.add("anverso"); 
    
        reverso = document.createElement("div"); 
        reverso.classList.add("reverso");
        reverso.style.backgroundImage = `url(${rutaImagen})`;
    
        rejilla.appendChild(tarjeta); 
        tarjeta.appendChild(anverso);
        tarjeta.appendChild(reverso);
    });
}



// Función game over

function over () {
    game.classList.add("oculto");
    perdedor.classList.add("pop");
    reinicio.classList.add("pop");

    audioFondo.pause();
    audioFondo.currentTime = 0;
    audioDerrota.play();
}
