
import { loginUsuario } from './api.js';

export const manejarLogin = async (email, password) => {
  if (!email || !password) {
    alert('Por favor completa correo y contraseña.');
    return;
  }

  if (password.length < 6) {
    alert('La contraseña debe tener al menos 6 caracteres.');
    return;
  }

  const re = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
  if (!re.test(email)) {
    alert('Introduce un correo válido.');
    return;
  }

  try {
    const { token, mensaje } = await loginUsuario(email, password);
    localStorage.setItem('token', token);
    alert(mensaje);
    window.location.href = '../pages/home.html'
  } catch (error) {
    alert(error);
  }
};