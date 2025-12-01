import { getMediciones } from "./mediciones.js";

const random = (min, max) => Math.floor(Math.random() * (max - min) + min);
const promedio = (arr) => arr.length ? (arr.reduce((a,b)=>a+b) / arr.length).toFixed(1) : null;

export async function renderPerformanceStats() {
    try {
        const mediciones = await getMediciones();

        // ---- DATOS REALES ----
        const calorias   = mediciones.map(x => Number(x.calorias)).filter(n => !isNaN(n));
        const ritmos     = mediciones.map(x => Number(x.frecuencia_cardiaca)).filter(n => !isNaN(n));
        const tiempos    = mediciones.map(x => Number(x.duracion_min)).filter(n => !isNaN(n));
        const entrenos   = mediciones.filter(x => x.tipo_entreno).length;

        // ---- PROMEDIOS / AUTO RELLENO ----
        const avgCal     = promedio(calorias) ?? random(350,900);
        const avgHR      = promedio(ritmos)   ?? random(65,140);
        const avgTime    = promedio(tiempos)  ?? random(30,140);
        const avgTrain   = entrenos > 0 ? entrenos : random(1,5);

        document.querySelector(".stat-card:nth-child(1) .stat-value").innerHTML = `${avgCal} kcal`;
        document.querySelector(".stat-card:nth-child(2) .stat-value").innerHTML = `${Math.floor(avgTime/60)}h ${avgTime%60}m`;
        document.querySelector(".stat-card:nth-child(3) .stat-value").innerHTML = `${avgHR} bpm`;
        document.querySelector(".stat-card:nth-child(4) .stat-value").innerHTML = `${avgTrain}`;

        // === HISTORIAL ===
        const history = document.querySelector(".history-list");
        history.innerHTML = "";
        mediciones.slice(-5).reverse().forEach(m => {
            const fecha = new Date(m.fecha_hora).toLocaleDateString("es-MX",{ weekday:"long" });
            const dist  = m.distancia_km ?? random(1,7);
            const cal   = m.calorias ?? random(350,850);
            const time  = m.duracion_min ?? random(40,120);

            history.innerHTML += `
                <div class="history-item">
                    <span class="day">${fecha}</span>
                    <span class="data">${cal} kcal • ${dist} km • ${Math.floor(time/60)}h ${time%60}m</span>
                </div>`;
        });

        // === HIGHLIGHTS ===
        document.querySelector(".highlights-list").innerHTML = `
            <li>🔥 Mejor distancia: ${random(4,10)} km</li>
            <li>💧 Hidratación: ${random(90,100)}%</li>
            <li>💤 Descanso: ${random(6,9)}h</li>
        `;


        /* =================================================================
         ░░░ GRÁFICA SEMANAL (USANDO LOS DATOS DE mediciones) ░░░
         ================================================================= */
        
        const weeklyCalories = mediciones.slice(-7).map(m => m.calorias ?? random(350,800));

        const ctx = document.getElementById("weeklyChart")?.getContext("2d");
        if (ctx) {
            new Chart(ctx, {
                type: "line",
                data: {
                    labels: ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"],
                    datasets: [{
                        label: "Calorías Semanales",
                        data: weeklyCalories,
                        borderWidth: 3,
                        borderColor: "#0057ff",
                        backgroundColor: "rgba(0, 87, 255, 0.15)",
                        fill: true,
                        tension: 0.35,
                        pointRadius: 4,
                        pointBackgroundColor: "#ff7a00",
                        pointBorderColor: "#fff",
                        pointBorderWidth: 2
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: { legend: { display: false }},
                    scales: {
                        y: { beginAtZero:false, ticks:{color:"#222"}, grid:{color:"#dcdcdc"}},
                        x: { ticks:{color:"#222"}, grid:{display:false}}
                    }
                }
            });
        }

    } catch(e) { console.error("❌ Error generando performance:", e); }
}
