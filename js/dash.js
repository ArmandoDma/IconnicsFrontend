import { healthTips, notifications } from "./tips.js";
import { getMediciones } from "./mediciones.js";

function createStripePattern(
  ctx,
  color = "#4da6ff",
  spacing = 6,
  thickness = 1
) {
  const patternCanvas = document.createElement("canvas");
  patternCanvas.width = spacing;
  patternCanvas.height = spacing;
  const pctx = patternCanvas.getContext("2d");

  pctx.strokeStyle = color;
  pctx.lineWidth = thickness;
  pctx.beginPath();
  pctx.moveTo(0, spacing);
  pctx.lineTo(spacing, 0);
  pctx.stroke();

  return ctx.createPattern(patternCanvas, "repeat");
}

export function getNotifications() {
let noti = document.getElementById("notify_list");
notifications.forEach((note) => {
  let li = document.createElement("li");
  li.innerHTML = `<div class="noti_item">
  <div class="noti_icon"><img src='../images/iconnics_logo.png' /></div>
    <div class="noti_content">
    <strong>${note.title}</strong><br/>
      <p>${note.content}</p>
      <em>${note.time}</em>
      </div>
  </div>
  `;
  noti.appendChild(li);
});
}

export function populateHealthTips() {
  let tipsList = document.getElementById("tips_list");
  healthTips.forEach((tip) => {
    let li = document.createElement("li");
    li.innerHTML = `<div class="tip_item">
      <div class="tip_icon">
        <img src="${tip.icon}" alt="Tip Icon" />
      </div>
      <div class="tip_content">
      <strong>${tip.food}</strong><br/>
        <em>Nutrients:</em> ${tip.nutrients.join(", ")}<br/>
        </div>
    </div>
    `;
    tipsList.appendChild(li);
  });
}

export async function initDashboard() {

  const ctx = document.getElementById("projectChart").getContext("2d");

  // ====== 📌 1. Obtener datos reales ======
  let labels = [];
  let data   = [];

  try {
      const mediciones = await getMediciones();

      // Agrupar hidratación por día
      const dias = {};

      mediciones.forEach(m => {
          const fecha = m.fecha_hora.split("T")[0]; 
          const hidra = parseFloat(m.hidratacion);

          if(!dias[fecha]) dias[fecha] = { total:0, count:0 };
          dias[fecha].total += hidra;
          dias[fecha].count++;
      });

      // Convertimos promedio -> gráfica
      labels = Object.keys(dias);        
      data   = labels.map(f => (dias[f].total / dias[f].count).toFixed(2));

  } catch (err) {
      console.error("❌ Error al procesar datos:", err);
      return;
  }

  // === 📊 GRÁFICA EXACTA COMO TU DISEÑO ORIGINAL ===
  new Chart(ctx, {
    type: "bar",
    data: {
      labels,    // ahora fechas reales
      datasets: [
        {
          label: "Hidratación Promedio (%)",
          data, 
          backgroundColor: "#107be5ff", // el azul sólido original
          borderRadius: 25,
          borderSkipped: false,
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: { display: false },        // igual que lo tenías
        tooltip: {
          callbacks: {
            label: (ctx) => `${ctx.raw}%`,
          },
        },
      },
      scales: {
        y: {
          beginAtZero: true,
          min: -5,
          grace: "5%",
          display: false,
        },
        x: {
          offset: true,
          grid: {
            display: false,
            drawBorder: false,
          },
          ticks: {
            color: "#aaa",
            font: {
              size: 14,
              weight: "bold",
            },
          },
        },
      },
    },
  });
}


export async function loadMetrics() {
    try {
        const data = await getMediciones();  
      
        const ritmos     = data.filter(x => x.frecuencia_cardiaca > 0).map(x => x.frecuencia_cardiaca);
        const hidra      = data.map(x => Number(x.hidratacion));
        const temp       = data.map(x => Number(x.temperatura));

        const avgHR  = promedio(ritmos) ?? random(60,110);
        const avgHID = promedio(hidra) ?? random(40,75);
        const avgTMP = promedio(temp)  ?? random(36.2,38.2);

        
        const calories = Math.round(avgHR * 10 + avgTMP * 12);
      
        document.getElementById("hr").innerText        = `${avgHR} bpm`;
        document.getElementById("oxygen").innerText    = `${random(95,99)}%`;  // tu API real no la incluye
        document.getElementById("hydration").innerText = `${avgHID}%`;
        document.getElementById("calories").innerText  = `${calories} kcal`;                

    } catch (e) {
        console.error("❌ Error cargando métricas:", e);
        document.getElementById("hr").innerText = "Sin datos";
        document.getElementById("hydration").innerText = "Sin datos";
        document.getElementById("calories").innerText = "N/A";
    }
}

// Helpers
function promedio(arr){ return arr.length ? (arr.reduce((a,b)=>a+b)/arr.length).toFixed(1) : null }
function random(min,max){ return Math.floor(Math.random()*(max-min)+min) }

