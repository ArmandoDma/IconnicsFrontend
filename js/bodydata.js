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