export function stepsChart (){
  const stepsCompleted = 7200;
  const stepsGoal = 10000;
  const stepsRemaining = stepsGoal - stepsCompleted;

  const ctx = document.getElementById('stepsChart').getContext('2d');

  const stepsCharts = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: ['Pasos realizados', 'Pasos restantes'],
      datasets: [{
        data: [stepsCompleted, stepsRemaining],
        backgroundColor: ['#107be5', '#e0e0e0'],
        borderWidth: 0
      }]
    },
    options: {
      responsive: true,
      cutout: '75%',
      plugins: {
        title: {
          display: false,
          text: 'Progreso de pasos hoy',
          font: {
            size: 18
          }
        },
        legend: {
          display: false
        }
      }
    },
    plugins: [{
      id: 'centerText',
      beforeDraw: (chart) => {
        const { width } = chart;
        const { height } = chart;
        const ctx = chart.ctx;
        ctx.restore();
        const fontSize = (height / 200).toFixed(2);
        ctx.font = `${fontSize}em sans-serif`;
        ctx.textBaseline = 'middle';
        ctx.fillStyle = '#e5101b';
        const text = `${stepsCompleted.toLocaleString()} steps`;
        const textX = Math.round((width - ctx.measureText(text).width) / 2);
        const textY = height / 2;
        ctx.fillText(text, textX, textY);
        ctx.save();
      }
    }]
  });
};

export function renderOrganCardsByZone(zoneId) {
  const organZones = {
    1: {
      icon: "../../images/heart.png",
      title: "Corazón",
      metrics: [
        { label: "Frecuencia cardíaca", value: "78 bpm" },
        { label: "HRV", value: "52 ms" },
        { label: "Presión arterial", value: "120/80 mmHg" },
        { label: "Ritmo", value: "Normal" }
      ]
    },
    2: {
      icon: "../../images/lungs.png",
      title: "Pulmones",
      metrics: [
        { label: "Frecuencia respiratoria", value: "16 rpm" },
        { label: "Oxigenación", value: "97%" }
      ]
    },
    3: {
      icon: "../../images/brain.png",
      title: "Cerebro",
      metrics: [
        { label: "Calidad del sueño", value: "Alta" },
        { label: "Fatiga mental", value: "Baja" }
      ]
    },
    4: {
      icon: "../../images/hydration.png",
      title: "Hidratación",
      metrics: [
        { label: "Agua corporal", value: "58%" },
        { label: "Color de orina", value: "Claro" }
      ]
    }
  };

  const data = organZones[zoneId];
  if (!data) return;

  const container = document.getElementById("card_graphic");
  if (!container) return;
  container.innerHTML = "";

  const card = document.createElement("div");
  card.className = "card_graphic_container";

  const iconDiv = document.createElement("div");
  iconDiv.className = "icon";
  const img = document.createElement("img");
  img.src = data.icon;
  img.alt = `${data.title} icon`;
  img.id = "image_organ";
  iconDiv.appendChild(img);

  const infoDiv = document.createElement("div");
  infoDiv.className = "info_body_organ";

  const title = document.createElement("h3");
  title.textContent = data.title;
  infoDiv.appendChild(title);

  const ul = document.createElement("ul");
  data.metrics.forEach(metric => {
    const li = document.createElement("li");
    li.innerHTML = `${metric.label}: <strong>${metric.value}</strong>`;
    ul.appendChild(li);
  });

  infoDiv.appendChild(ul);
  card.appendChild(iconDiv);
  card.appendChild(infoDiv);
  container.appendChild(card);
}