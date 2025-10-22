// js/api.js
export const loginUsuario = async (correo, contraseña) => {
  try {
    const response = await axios.post('http://localhost:3000/api/auth/login', {
      correo,
      contraseña
    });

    return response.data; // retorna nuestro token de auth
  } catch (error) {
    throw error.response?.data?.error || 'Error al conectar con el servidor';
  }
};