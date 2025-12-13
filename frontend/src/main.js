import './style.css'

document.addEventListener('DOMContentLoaded', () => {
  const btnLogin = document.getElementById('btn-login');
  const btnRegistro = document.getElementById('btn-registro');
  const modal = document.getElementsByClassName('modal');
  const modalLogin = document.getElementById('modal-login');
  const modalRegistro = document.getElementById('modal-registro');
  const closeButtons = document.querySelectorAll('.boton-cerrar');
  const btnEnviarLogin = document.getElementById('submit-login');
  const btnEnviarRegistro = document.getElementById('submit-registro');

  btnLogin.addEventListener('click', () => {
    modalLogin.style.display = 'flex';
    modalRegistro.style.display = 'none';
  });

  btnRegistro.addEventListener('click', () => {
    modalRegistro.style.display = 'flex';
    modalLogin.style.display = 'none';
  })

  closeButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      btn.closest('.modal').style.display = 'none';
    })
  })
})