// js/api.js
export const loginUsuario = async (correo, contrasena) => {
  try {
    const response = await axios.post('http://localhost:3000/api/usuarios/login', {
      correo,
      contrasena
    });

    return response.data; 
  } catch (error) {
    throw error.response?.data?.error || 'Error al conectar con el servidor';
  }
};