const palabras = [
    { palabra: "Mora", pista: "Fruta" },
    { palabra: "Lápiz", pista: "Útil escolar" },
    { palabra: "Tito Calderon", pista: "Cantante" },
    { palabra: "Guitarra", pista: "Instrumento musical" },
    { palabra: "Montaña", pista: "Formación geográfica" },
    { palabra: "Cielo", pista: "Lo que ves arriba" },
    { palabra: "Tijeras", pista: "Herramienta de corte" },
    { palabra: "Nube", pista: "Flota en el cielo" },
    { palabra: "Libro", pista: "Contiene historias" }
];

const container = document.querySelector(".container-cards");
const btnEmpezar = document.getElementById("empezar");
const inputJugadores = document.getElementById("jugadores");

let cartas = [];
let currentIndex = 0;

btnEmpezar.addEventListener("click", () => {
    const numJugadores = parseInt(inputJugadores.value);

    if (isNaN(numJugadores) || numJugadores < 2 || numJugadores > 10) {
        alert("Por favor, ingresa un número de jugadores entre 2 y 10.");
        return;
    }

    // Limpiar
    container.innerHTML = "";
    cartas = [];
    currentIndex = 0;

    // Elegir UNA palabra secreta para todos los jugadores normales
    const idxPalabraSecreta = Math.floor(Math.random() * palabras.length);
    const palabraSecreta = palabras[idxPalabraSecreta];

    // Elegir quién es el impostor (índice aleatorio)
    const impostorIndex = Math.floor(Math.random() * numJugadores);

    // Crear cartas
    for (let i = 0; i < numJugadores; i++) {
        if (i === impostorIndex) {
            // El impostor NO conoce la palabra
            cartas.push({
                tipo: "impostor",
                texto: "Impostor",
                pista: palabraSecreta.pista
            });
        } else {
            // Jugador normal: ve la palabra secreta
            cartas.push({
                tipo: "normal",
                texto: "Normal",
                pista: palabraSecreta.palabra
            });
        }
    }

    // Mostrar primera carta
    mostrarCarta();
});

function mostrarCarta() {
    container.innerHTML = "";

    const cartaActual = cartas[currentIndex];

    const card = document.createElement("div");
    card.classList.add("card");

    card.innerHTML = `
        <div class="first-content">
            <span>${cartaActual.texto}</span>
        </div>
        <div class="second-content">
            <span>${cartaActual.pista}</span>
        </div>
        <div class="player-info">
            Jugador ${currentIndex + 1} de ${cartas.length}
        </div>
    `;

    container.appendChild(card);

    // Botón de acción
    let btn = document.getElementById("btn-accion");
    if (!btn) {
        btn = document.createElement("button");
        btn.id = "btn-accion";
        btn.style.marginTop = "20px";
        btn.style.padding = "10px 20px";
        btn.style.fontSize = "16px";
        container.appendChild(btn);
    }

    if (currentIndex < cartas.length - 1) {
        btn.textContent = "Siguiente";
        btn.onclick = () => {
            currentIndex++;
            mostrarCarta();
        };
    } else {
        btn.textContent = "Reiniciar Juego";
        btn.onclick = () => {
            container.innerHTML = "";
            inputJugadores.value = "";
            inputJugadores.focus();
        };
    }
}