export const getSensores = async () => {
    try {
        const response = await axios.get("https://iconnicsserver.zeabur.app/api/sensores");
        return response.data;
    } catch (error) {
        throw error.response?.data?.error || "Error al obtener sensores";
    }
};

export const getSensorById = async (id) => {
    try {
        const response = await axios.get(`https://iconnicsserver.zeabur.app/api/sensores/${id}`);
        return response.data;
    } catch (error) {
        throw error.response?.data?.error || "Error al obtener el sensor";
    }
};

export const createSensor = async (datos) => {
    try {
        const response = await axios.post("https://iconnicsserver.zeabur.app/api/sensores", datos);
        return response.data;
    } catch (error) {
        throw error.response?.data?.error || "Error al crear el sensor";
    }
};

export const updateSensor = async (id, datos) => {
    try {
        const response = await axios.put(`https://iconnicsserver.zeabur.app/api/sensores/${id}`, datos);
        return response.data;
    } catch (error) {
        throw error.response?.data?.error || "Error al actualizar el sensor";
    }
};

export const deleteSensor = async (id) => {
    try {
        const response = await axios.delete(`https://iconnicsserver.zeabur.app/api/sensores/${id}`);
        return response.data;
    } catch (error) {
        throw error.response?.data?.error || "Error al eliminar el sensor";
    }
};
