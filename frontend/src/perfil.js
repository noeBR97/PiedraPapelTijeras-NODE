import './style.css'
import { apiRequest } from './api.js';

document.addEventListener('DOMContentLoaded', () => {
    const btnCrearPartida = document.getElementById('btn-crear-partida');
    const modalCrearPartida = document.getElementById('modal-crear-partida');
    const btnCerrar = document.getElementById('cerrar-modal-crear-partida');
    const formCrearPartida = document.getElementById('crear-partida-form');
    const selectTipo = document.getElementById('tipo-partida');
    const listaPartidas = document.getElementById('partidas-ul');
    const usernameSpan = document.getElementById('username-display');
    const userRaw = sessionStorage.getItem('user');
    const modalEsperarJugador = document.getElementById('modal-esperar-jugador');
    const btnAbandonar = document.getElementById('btn-abandonar');

    if (!userRaw) {
        window.location.href = '/index.html';
        return;
    }

    const user = JSON.parse(userRaw);
    usernameSpan.textContent = user.nick;

    async function cargarPartidas() {
        try {
            const partidas = await apiRequest('/partidas');
            console.log('Partidas recibidas:', partidas);

            listaPartidas.innerHTML = '';

            if (partidas.length === 0) {
            listaPartidas.innerHTML = '<li>No hay partidas disponibles</li>';
            return;
            }

            partidas.forEach(partida => {
            const li = document.createElement('li');

            li.innerHTML = `
                <span>Partida #${partida.id}</span>
                <button data-id="${partida.id}">Unirse</button>
            `;

            const btnUnirse = li.querySelector('button');
            btnUnirse.addEventListener('click', () => unirseAPartida(partida.id));

            listaPartidas.appendChild(li);
            });

        } catch (error) {
            alert(error.message);
        }
    }

    cargarPartidas();

    btnCrearPartida.addEventListener('click', () => {
        modalCrearPartida.style.display = 'flex';
    })

    btnCerrar.addEventListener('click', () => {
        modalCrearPartida.style.display = 'none';
    })

    btnAbandonar.addEventListener('click', async () => {
        try {
            const idPartida = sessionStorage.getItem('partidaEnEspera');
            if (!idPartida) {
                alert('No estás en una partida en espera.');
                return;
            }

            await apiRequest(`/partidas/${idPartida}/cancelar`, {
                method: 'POST'
            });

            sessionStorage.removeItem('partidaEnEspera');
            
            modalEsperarJugador.style.display = 'none';

            alert('Partida cancelada.');
            cargarPartidas();
        } catch (error) {
            alert(error.message);
        }
    })

    formCrearPartida.addEventListener('submit', async (e) => {
        e.preventDefault();

        const tipo = selectTipo.value;

        if (!tipo) {
            alert('Selecciona el tipo de partida');
            return;
        }

        try {
            const res = await apiRequest('/partidas', {
                method: 'POST',
                body: JSON.stringify({ tipo })
            });

            sessionStorage.setItem('partidaEnEspera', res.partida.id);

            modalCrearPartida.style.display = 'none';

            console.log('Partida creada.');

            if (tipo === 'humano') {
                modalEsperarJugador.style.display = 'flex';
            } else {
                //TODO redireccion pantalla juego
            }

            alert('Partida creada correctamente');

        } catch (error) {
            alert(error.message);
        }
    })

    async function unirseAPartida(idPartida) {
        try {
            const res = await apiRequest(`/partidas/${idPartida}/unirse`, {
                method: 'POST'
            });
            window.location.href = `/HTML/juego.html?id=${res.partida.id}`;
        } catch (error) {
            alert(error.message);
        }
    }

    async function comprobarSiEmpiezaPartida() {
        console.log('⏱️ polling activo');
        const idPartida = sessionStorage.getItem('partidaEnEspera');
        if (!idPartida) return;
        try {
            const partida = await apiRequest(`/partidas/${idPartida}`);
            console.log('📦 partida recibida:', partida);
            if (partida.estado === 'en_progreso') {
                sessionStorage.removeItem('partidaEnEspera');
                window.location.href = `/HTML/juego.html?id=${partida.id}`;
            }
        } catch (error) {
            console.error('Error al comprobar el estado de la partida:', error);
        }
    }
    setInterval(comprobarSiEmpiezaPartida, 3000);
})