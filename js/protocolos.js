export const getProtocolos = async () => {
    try {
        const response = await axios.get("https://iconnicsserver.zeabur.app/api/protocolos");
        return response.data;
    } catch (error) {
        throw error.response?.data?.error || "Error al obtener protocolos";
    }
};

export const getProtocoloById = async (id) => {
    try {
        const response = await axios.get(`https://iconnicsserver.zeabur.app/api/protocolos/${id}`);
        return response.data;
    } catch (error) {
        throw error.response?.data?.error || "Error al obtener el protocolo";
    }
};

export const createProtocolo = async (datos) => {
    try {
        const response = await axios.post("https://iconnicsserver.zeabur.app/api/protocolos", datos);
        return response.data;
    } catch (error) {
        throw error.response?.data?.error || "Error al crear el protocolo";
    }
};

export const updateProtocolo = async (id, datos) => {
    try {
        const response = await axios.put(`https://iconnicsserver.zeabur.app/api/protocolos/${id}`, datos);
        return response.data;
    } catch (error) {
        throw error.response?.data?.error || "Error al actualizar el protocolo";
    }
};

export const deleteProtocolo = async (id) => {
    try {
        const response = await axios.delete(`https://iconnicsserver.zeabur.app/api/protocolos/${id}`);
        return response.data;
    } catch (error) {
        throw error.response?.data?.error || "Error al eliminar el protocolo";
    }
};
