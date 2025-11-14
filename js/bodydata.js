export function initBody(){
    const ctx = document.getElementById("bodyChart").getContext("2d");

new Chart(ctx, {
  type: "bar",
  data: {
    labels: [
      "Masa muscular",
      "Grasa corporal",
      "Agua corporal",
      "Densidad ósea",
      "Metabolismo basal"
    ],
    datasets: [{
      label: "Composición corporal",
      data: [42, 18, 60, 100, 1600],
      backgroundColor: [
        "#4CAF50",
        "#F44336",
        "#2196F3",
        "#FF9800",
        "#9C27B0"
      ],
      borderRadius: 6
    }]
  },
  options: {
    responsive: true,
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (ctx) => `${ctx.label}: ${ctx.raw}${ctx.label === "Metabolismo basal" ? " kcal/día" : "%"}`,
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: (value) => value + (value > 200 ? " kcal" : "%")
        }
      }
    }
  }
});
}

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
}