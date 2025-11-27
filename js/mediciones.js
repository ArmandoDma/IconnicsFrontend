export const getMediciones = async () => {
    try {
        const response = await axios.get("https://iconnicsserver.zeabur.app/api/mediciones");    
        return response.data;
    } catch (e) {
        throw "Error al obtener mediciones";
    }
};


export const getMedicionById = async (id) => {
    try {
        const response = await axios.get(`https://iconnicsserver.zeabur.app/api/mediciones/${id}`);
        return response.data;
    } catch (error) {
        throw error.response?.data?.error || "Error al obtener la medicion";
    }
};

export const createMedicion = async (datos) => {
    try {
        const response = await axios.post("https://iconnicsserver.zeabur.app/api/mediciones", datos);
        return response.data;
    } catch (error) {
        throw error.response?.data?.error || "Error al crear la medicion";
    }
};

export const updateMedicion = async (id, datos) => {
    try {
        const response = await axios.put(`https://iconnicsserver.zeabur.app/api/mediciones/${id}`, datos);
        return response.data;
    } catch (error) {
        throw error.response?.data?.error || "Error al actualizar la medicion";
    }
};

export const deleteMedicion = async (id) => {
    try {
        const response = await axios.delete(`https://iconnicsserver.zeabur.app/api/mediciones/${id}`);
        return response.data;
    } catch (error) {
        throw error.response?.data?.error || "Error al eliminar la medicion";
    }
};
