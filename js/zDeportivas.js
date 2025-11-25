export const getZonasDeportivas = async () => {
    try {
        const response = await axios.get("https://iconnicsserver.zeabur.app/api/zonasDeportivas");
        return response.data;
    } catch (error) {
        throw error.response?.data?.error || "Error al obtener zonas deportivas";
    }
};

export const getZonasDeportivaById = async (id) => {
    try {
        const response = await axios.get(`https://iconnicsserver.zeabur.app/api/zonasDeportivas/${id}`);
        return response.data;
    } catch (error) {
        throw error.response?.data?.error || "Error al obtener la zona deportiva";
    }
};

export const createZonasDeportiva = async (datos) => {
    try {
        const response = await axios.post("https://iconnicsserver.zeabur.app/api/zonasDeportivas", datos);
        return response.data;
    } catch (error) {
        throw error.response?.data?.error || "Error al crear la zona deportiva";
    }
};

export const updateZonasDeportiva = async (id, datos) => {
    try {
        const response = await axios.put(`https://iconnicsserver.zeabur.app/api/zonasDeportivas/${id}`, datos);
        return response.data;
    } catch (error) {
        throw error.response?.data?.error || "Error al actualizar la zona deportiva";
    }
};

export const deleteZonasDeportiva = async (id) => {
    try {
        const response = await axios.delete(`https://iconnicsserver.zeabur.app/api/zonasDeportivas/${id}`);
        return response.data;
    } catch (error) {
        throw error.response?.data?.error || "Error al eliminar la zona deportiva";
    }
};
