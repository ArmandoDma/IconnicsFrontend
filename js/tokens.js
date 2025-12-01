export const getTokens = async () => {
    try {
        const response = await axios.get("https://iconnicsserver.zeabur.app/api/tokens");
        return response.data;
    } catch (error) {
        throw error.response?.data?.error || "Error al obtener tokens";
    }
};

export const getTokenById = async (id) => {
    try {
        const response = await axios.get(`https://iconnicsserver.zeabur.app/api/tokens/${id}`);
        return response.data;
    } catch (error) {
        throw error.response?.data?.error || "Error al obtener el token";
    }
};

export async function getLastValidTokenByUser(userId) {
  try {
    const res = await axios.get("https://iconnicsserver.zeabur.app/api/tokens");
    const tokens = res.data;

    // Filtrar por usuario
    const userTokens = tokens.filter((t) => t.id_usuario === userId);

    // Ordenar por fecha de expiración
    const sorted = userTokens.sort(
      (a, b) =>
        new Date(b.fecha_expiracion).getTime() -
        new Date(a.fecha_expiracion).getTime()
    );

    if (sorted.length === 0) return null;

    const lastToken = sorted[0];

    // Validar activo y expiración
    const isValid =
      lastToken.activo === 1 &&
      new Date(lastToken.fecha_expiracion) > new Date();
    
    return isValid ? lastToken : null;
  } catch (err) {
    throw new Error(err.response?.data?.msg || "Error fetching tokens");
  }
}

export const createToken = async (datos) => {
    try {
        const response = await axios.post("https://iconnicsserver.zeabur.app/api/tokens", datos);
        return response.data;
    } catch (error) {
        throw error.response?.data?.error || "Error al crear el token";
    }
};

export const logoutToken = async (id_usuario) => {
    try {
        const response = await axios.put(`https://iconnicsserver.zeabur.app/api/tokens/logout/${id_usuario}`);
        return response.data;
    } catch (error) {
        throw error.response?.data?.error || "Error al cerrar sesión";
    }
};

export const updateToken = async (id, datos) => {
    try {
        const response = await axios.put(`https://iconnicsserver.zeabur.app/api/tokens/${id}`, datos);
        return response.data;
    } catch (error) {
        throw error.response?.data?.error || "Error al actualizar el token";
    }
};

export const deleteToken = async (id) => {
    try {
        const response = await axios.delete(`https://iconnicsserver.zeabur.app/api/tokens/${id}`);
        return response.data;
    } catch (error) {
        throw error.response?.data?.error || "Error al eliminar el token";
    }
};
