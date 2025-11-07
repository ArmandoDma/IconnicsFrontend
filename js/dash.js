export function initDashboard() {
  const ctx = document.getElementById("projectChart").getContext("2d");

  new Chart(ctx, {
    type: "bar",
    data: {
      labels: ["S", "M", "T", "W", "T", "F", "S"],
      datasets: [
        {
          label: "Actividad (%)",
          data: [28, 32, 34, 45, 65, 70, 90], // últimos 3 días proyectados
          backgroundColor: [28, 32, 34, 45, 0, 0, 0].map((val) =>
            val === 0 ? "#e5e5e5ff" : "#107be5ff"
          ),
          borderColor: "#107be5ff",
          borderWidth: 1,
          borderRadius: 25,
          borderSkipped: false,
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: { display: false },
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
            color: "#d6d6d6",
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
