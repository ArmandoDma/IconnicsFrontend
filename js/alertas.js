export const getAlertas = async () => {
    try {
        const response = await axios.get("https://iconnicsserver.zeabur.app/api/alertas");
        return response.data;
    } catch (error) {
        throw error.response?.data?.error || "Error al obtener alertas";
    }
};

export const getAlertaById = async (id) => {
    try {
        const response = await axios.get(`https://iconnicsserver.zeabur.app/api/alertas/${id}`);
        return response.data;
    } catch (error) {
        throw error.response?.data?.error || "Error al obtener la alerta";
    }
};

export const createAlerta = async (datos) => {
    try {
        const response = await axios.post("https://iconnicsserver.zeabur.app/api/alertas", datos);
        return response.data;
    } catch (error) {
        throw error.response?.data?.error || "Error al crear la alerta";
    }
};

export const updateAlerta = async (id, datos) => {
    try {
        const response = await axios.put(`https://iconnicsserver.zeabur.app/api/alertas/${id}`, datos);
        return response.data;
    } catch (error) {
        throw error.response?.data?.error || "Error al actualizar la alerta";
    }
};

export const deleteAlerta = async (id) => {
    try {
        const response = await axios.delete(`https://iconnicsserver.zeabur.app/api/alertas/${id}`);
        return response.data;
    } catch (error) {
        throw error.response?.data?.error || "Error al eliminar la alerta";
    }
};
