export const getReportes = async () => {
    try {
        const response = await axios.get("https://iconnicsserver.zeabur.app/api/reportes");
        return response.data;
    } catch (error) {
        throw error.response?.data?.error || "Error al obtener reportes";
    }
};

export const getReporteById = async (id) => {
    try {
        const response = await axios.get(`https://iconnicsserver.zeabur.app/api/reportes/${id}`);
        return response.data;
    } catch (error) {
        throw error.response?.data?.error || "Error al obtener el reporte";
    }
};

export const createReporte = async (datos) => {
    try {
        const response = await axios.post("https://iconnicsserver.zeabur.app/api/reportes", datos);
        return response.data;
    } catch (error) {
        throw error.response?.data?.error || "Error al crear el reporte";
    }
};

export const updateReporte = async (id, datos) => {
    try {
        const response = await axios.put(`https://iconnicsserver.zeabur.app/api/reportes/${id}`, datos);
        return response.data;
    } catch (error) {
        throw error.response?.data?.error || "Error al actualizar el reporte";
    }
};

export const deleteReporte = async (id) => {
    try {
        const response = await axios.delete(`https://iconnicsserver.zeabur.app/api/reportes/${id}`);
        return response.data;
    } catch (error) {
        throw error.response?.data?.error || "Error al eliminar el reporte";
    }
};
