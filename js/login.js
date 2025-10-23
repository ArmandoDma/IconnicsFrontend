
import { manejarLogin } from './auth.js';

document.getElementById('loginForm').addEventListener('submit', function(e){
  e.preventDefault();

  const correo = document.getElementById('email').value.trim();
  const contrasena = document.getElementById('password').value.trim();

  manejarLogin(correo, contrasena);
});