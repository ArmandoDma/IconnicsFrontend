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
