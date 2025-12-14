import './style.css'
import { apiRequest } from './api.js';

document.addEventListener('DOMContentLoaded', () => {
  const btnLogin = document.getElementById('btn-login');
  const btnRegistro = document.getElementById('btn-registro');
  const modal = document.getElementsByClassName('modal');
  const modalLogin = document.getElementById('modal-login');
  const modalRegistro = document.getElementById('modal-registro');
  const closeButtons = document.querySelectorAll('.boton-cerrar');
  const formularioLogin = document.getElementById('login-form');
  const formularioRegistro = document.getElementById('registro-form');

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

  formularioLogin.addEventListener('submit', async (e) => {
    e.preventDefault();

    const data = {
      email: document.getElementById('login-email').value,
      pass: document.getElementById('login-password').value
    };

    try {
      const res = await apiRequest('/auth/login', {
        method: 'POST',
        body: JSON.stringify(data)
      });

      sessionStorage.setItem('token', res.token);

      sessionStorage.setItem('user', JSON.stringify(res.usuario));

      window.location.href = '/perfil.html';
    } catch (err) {
      alert(err.message);
    }
  });

  formularioRegistro.addEventListener('submit', async (e) => {
    e.preventDefault();

    const data = {
      nombre: document.getElementById('registro-nombre').value,
      apellido1: document.getElementById('registro-apellido1').value,
      apellido2: document.getElementById('registro-apellido2').value,
      email: document.getElementById('registro-email').value,
      nick: document.getElementById('registro-username').value,
      pass: document.getElementById('registro-password').value
    };

    try {
      const res = await apiRequest('/auth/registro', {
        method: 'POST',
        body: JSON.stringify(data)
      });

      alert(res.msg);
    } catch (err) {
      alert(err.message);
    }
  });
})