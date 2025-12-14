import './style.css'
import { apiRequest } from './api.js';

const params = new URLSearchParams(window.location.search);
const idPartida = params.get('id');

const userRaw = sessionStorage.getItem('user');
if (!idPartida || !userRaw) {
    window.location.href = '/index.html';
}

const user = JSON.parse(userRaw);

const usernameJugador = document.getElementById('username-display');
const eleccionJugadorSpan = document.getElementById('eleccion-jugador');
const eleccionOponenteSpan = document.querySelector('.eleccion-oponente');
const botonesEleccion = document.querySelectorAll('.eleccion-btn');
const btnAbandonar = document.getElementById('btn-abandonar-juego');

const marcador = document.createElement('p');
marcador.id = 'marcador';
document.querySelector('.container-juego').prepend(marcador);

usernameJugador.textContent = user.nick;

let yaHeElegido = false;

botonesEleccion.forEach(btn => {
    btn.addEventListener('click', async () => {
        if (yaHeElegido) return;

        const eleccion = btn.dataset.choice;

        try {
            await apiRequest(`/partidas/${idPartida}/jugada`, {
                method: 'POST',
                body: JSON.stringify({ eleccion })
            });

            yaHeElegido = true;
            eleccionJugadorSpan.textContent = eleccion;
        } catch (error) {
            alert(error.message);
        }
    });
});

async function refrescarEstado() {
    try {
        const partida = await apiRequest(`/partidas/${idPartida}`);

        const soyCreador = partida.idCreador === user.id;

        const miEleccion = soyCreador
            ? partida.eleccionCreador
            : partida.eleccionRival;

        const eleccionRival = soyCreador
            ? partida.eleccionRival
            : partida.eleccionCreador;

        eleccionJugadorSpan.textContent = miEleccion ?? (yaHeElegido ? '✔' : '-');
        eleccionOponenteSpan.textContent = eleccionRival ? '✔' : '❓';

        const misVictorias = soyCreador
            ? partida.victoriasCreador
            : partida.victoriasRival;

        const victoriasRival = soyCreador
            ? partida.victoriasRival
            : partida.victoriasCreador;

        marcador.textContent = `Marcador: ${misVictorias} - ${victoriasRival}`;

        if (!partida.eleccionCreador && !partida.eleccionRival) {
            yaHeElegido = false;
            eleccionJugadorSpan.textContent = '-';
            eleccionOponenteSpan.textContent = '❓';
        }

        if (partida.estado === 'finalizada') {
            clearInterval(intervalo);

            if (partida.idGanador === user.id) {
                alert('🏆 ¡Has ganado la partida!');
            } else {
                alert('💀 Has perdido la partida');
            }

            window.location.href = '/HTML/perfil.html';
        }

    } catch (error) {
        console.error('Error al refrescar estado:', error);
    }
}

const intervalo = setInterval(refrescarEstado, 2000);

btnAbandonar.addEventListener('click', () => {
    if (!confirm('¿Seguro que quieres abandonar la partida?')) return;
    window.location.href = '/HTML/perfil.html';
});