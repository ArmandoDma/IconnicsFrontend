
import { loginUsuario } from './api.js';

export const manejarLogin = async (correo, contrasena) => {
  if (!correo || !contrasena) {
    alert('Por favor completa correo y contraseña.');
    return;
  }

  if (contrasena.length < 6) {
    alert('La contraseña debe tener al menos 6 caracteres.');
    return;
  }

  const re = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
  if (!re.test(correo)) {
    alert('Introduce un correo válido.');
    return;
  }

  try {
    const { token, mensaje } = await loginUsuario(correo, contrasena);
    localStorage.setItem('token', token);
    alert(JSON.stringify(token));
    window.location.href = '../pages/home.html'
  } catch (error) {
    alert(error);
  }
};