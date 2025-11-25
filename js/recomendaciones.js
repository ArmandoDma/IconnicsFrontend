export const getRecomendaciones = async () => {
    try {
        const response = await axios.get("https://iconnicsserver.zeabur.app/api/recomendaciones");
        return response.data;
    } catch (error) {
        throw error.response?.data?.error || "Error al obtener recomendaciones";
    }
};

export const getRecomendacionById = async (id) => {
    try {
        const response = await axios.get(`https://iconnicsserver.zeabur.app/api/recomendaciones/${id}`);
        return response.data;
    } catch (error) {
        throw error.response?.data?.error || "Error al obtener la recomendacion";
    }
};

export const createRecomendacion = async (datos) => {
    try {
        const response = await axios.post("https://iconnicsserver.zeabur.app/api/recomendaciones", datos);
        return response.data;
    } catch (error) {
        throw error.response?.data?.error || "Error al crear la recomendacion";
    }
};

export const updateRecomendacion = async (id, datos) => {
    try {
        const response = await axios.put(`https://iconnicsserver.zeabur.app/api/recomendaciones/${id}`, datos);
        return response.data;
    } catch (error) {
        throw error.response?.data?.error || "Error al actualizar la recomendacion";
    }
};

export const deleteRecomendacion = async (id) => {
    try {
        const response = await axios.delete(`https://iconnicsserver.zeabur.app/api/recomendaciones/${id}`);
        return response.data;
    } catch (error) {
        throw error.response?.data?.error || "Error al eliminar la recomendacion";
    }
};
