let numeroAzar = Math.floor(Math.random()*100) + 1;
let numeroEntrada = document.getElementById('numeroEntrada');
let mensaje = document.getElementById('aviso-mensaje');
let intentos = 0;

const vidas = 10; 

const mensajesNumGrande = [
    "¡Uy! Te pasaste", 
    "Es más chico.",
    "Demasiado alto",
    "Bájale un poco.",
    "No tan arriba",
    "Proba más abajo.",
    "Te fuiste para arriba"
];

const mensajesPequeno = [
    "Te quedaste corto", 
    "Es más grande.",
    "Necesitas subir más.",
    "Un poco más arriba",
    "Baaaaajo."
];

const mensajesGanador = [
    "¡Lo adivinaste!",
    "¡Ese es el número!",
    "¡Ganaste!",
    "¡Bingo!"
];

function getRandomMsg(array) {
    return array[Math.floor(Math.random() * array.length)];
}

function checkResult() {
    let numeroIngresado = parseInt(numeroEntrada.value);
    intentos++;

    if(numeroIngresado < 0 || numeroIngresado > 100 || isNaN(numeroIngresado)) {
        mensaje.textContent = 'Por favor ingrese un numero valido.';
    } else if(numeroIngresado === numeroAzar) {
        mensaje.textContent = getRandomMsg(mensajesGanador) + ` Lo lograste en ${intentos} intentos!`;
        mensaje.style.color = 'green';
        numeroEntrada.disabled = true;
    } else {
        let diferencia = Math.abs(numeroAzar - numeroIngresado);
        let mensajeBase = numeroIngresado > numeroAzar ? getRandomMsg(mensajesNumGrande) : getRandomMsg(mensajesPequeno);

        if(diferencia <= 5) {
            mensajeBase += ' Estas muy cerca!';
        } else if(diferencia <= 10) {
            mensajeBase += ' Estas acercandote!';
        }

        mensaje.textContent = `${mensajeBase} Intento restantes: ${vidas - intentos}`;
        mensaje.style.color = 'red';

        if(intentos >= vidas) {
            mensaje.textContent = `Perdiste pibe, el numero era ${numeroAzar}`;
            numeroEntrada.disabled = true;
        }
    }
}

//Añadir que se pueda jugar apretando la tecla enter y no solo haciendo click
numeroEntrada.addEventListener('keyup', function(event) {
    if(event.key === 'Enter') {
        checkResult();
    }
});