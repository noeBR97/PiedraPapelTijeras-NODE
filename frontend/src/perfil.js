import './style.css'

document.addEventListener('DOMContentLoaded', () => {
    const btnCrearPartida = document.getElementById('btn-crear-partida');
    const modalCrearPartida = document.getElementById('modal-crear-partida');
    const btnCerrar = document.getElementById('cerrar-modal-crear-partida');
    const btnEnviarCrearPartida = document.getElementById('submit-crear-partida');

    btnCrearPartida.addEventListener('click', () => {
        modalCrearPartida.style.display = 'flex';
    })

    btnCerrar.addEventListener('click', () => {
        modalCrearPartida.style.display = 'none';
    })
})