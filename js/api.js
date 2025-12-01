export const loginUsuario = async (correo, contrasena) => {
  try {
    const response = await axios.post(
      "https://iconnicsserver.zeabur.app/api/usuarios/login",
      {
        correo,
        contrasena,
      }
    );

    return response.data;
  } catch (error) {
    throw error.response?.data?.error || "Error al conectar con el servidor";
  }
};

export const registerUsuario = async (datos) => {
  try {
    const response = await axios.post("https://iconnicsserver.zeabur.app/api/usuarios",
      datos
    );

    return response.data;
  } catch (error) {
    throw error.response?.data?.error || "error al conectar con el servidor";
  }
};

export async function getUserById(id) {
  try {
    const response = await axios.get(`https://iconnicsserver.zeabur.app/api/usuarios/${id}`);    
    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.message || "Error al obtener usuario");
    } else {
      throw new Error("Error de red o servidor");
    }
  }
}