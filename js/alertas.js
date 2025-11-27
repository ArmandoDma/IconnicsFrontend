export async function getAlertas() {
    try {
        const res = await fetch("https://iconnicsserver.zeabur.app/api/alertas");  // URL que estés usando ⚠
        
        if (!res.ok) {
            console.error("❗ Error HTTP:", res.status, res.statusText);
            throw new Error("La API respondió con un error");
        }

        const data = await res.json();
        console.log("📥 Alertas recibidas:", data); // <-- Debug directo
        return data;

    } catch (error) {
        console.error("❌ Error dentro de getAlertas():", error);
        throw error; // <-- Importante para que renderAlertas pueda detectar el fallo
    }
}

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
