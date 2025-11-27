import { getAlertas } from "./alertas.js";

export async function renderAlertas() {
    const list = document.querySelector(".notifications-list");

    if (!list) {
        console.error("❌ No se encontró el contenedor .notifications-list en el DOM");
        return;
    }

    try {
        const data = await getAlertas();
        
        console.log("📩 DATA RECIBIDA:", data);

        if (!Array.isArray(data)) {
            console.error("❌ La API no regresó un array. Respuesta:", data);
            list.innerHTML = `<p style="color:red;text-align:center;">Formato inválido en datos recibidos</p>`;
            return;
        }

        list.innerHTML = ""; // limpiamos

        data.forEach(a => {
            let card = document.createElement("div");
            card.classList.add("notif-card");
            card.setAttribute("data-type", a.nivel_riesgo?.toLowerCase() ?? "desconocido");

            card.innerHTML = `
                <i class="bx bx-bell notif-icon"></i>
                <div class="notif-content">
                    <h3>${a.tipo_alerta || "Sin título"}</h3>
                    <p>${a.mensaje || "Sin mensaje"}</p>
                    <span class="notif-time">${a.fecha_hora ? new Date(a.fecha_hora).toLocaleString() : "Fecha no disponible"}</span>
                </div>
            `;

            list.appendChild(card);
        });

        console.log("✔ Alertas renderizadas correctamente");
        activarFiltros(); 
        
    } catch (error) {
        console.error("❌ Error al obtener alertas:", error);
        list.innerHTML = `<p style="color:red;text-align:center;">Error al cargar alertas</p>`;
    }
}

function activarFiltros() {
    const botones = document.querySelectorAll(".cat-btn");
    const cards = document.querySelectorAll(".notif-card");

    botones.forEach(btn => {
        btn.onclick = () => {
            botones.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");

            let categoria = btn.dataset.category;

            cards.forEach(c => {
                c.style.display = categoria === "all" || c.dataset.type === categoria
                    ? "flex" : "none";
            });
        };
    });
}
