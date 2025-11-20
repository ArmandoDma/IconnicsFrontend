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
