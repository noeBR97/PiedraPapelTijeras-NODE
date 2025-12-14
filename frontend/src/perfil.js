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

            modalCrearPartida.style.display = 'none';

            console.log('Partida creada.');

            //TODO redireccion pantalla juego

            alert('Partida creada correctamente');

        } catch (error) {
            alert(error.message);
        }
    })
})