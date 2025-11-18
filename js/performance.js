export function chartWeek (){
    
  // Datos base (puedes cambiar todo)
  const weeklyData = {
    labels: ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"],
    datasets: [{
      label: "Calorías Quemadas",
      data: [520, 680, 450, 700, 810, 900, 610],
      borderWidth: 3,
      borderColor: "#0057ff",
      backgroundColor: "rgba(0, 87, 255, 0.15)",
      fill: true,
      tension: 0.35,
      pointRadius: 4,
      pointBackgroundColor: "#ff7a00",
      pointBorderColor: "#ffffff",
      pointBorderWidth: 2
    }]
  };

  const ctx = document.getElementById("weeklyChart").getContext("2d");

  const weeklyChart = new Chart(ctx, {
    type: "line",
    data: weeklyData,

    options: {
      responsive: true,
      maintainAspectRatio: false,

      plugins: {
        legend: {
          display: false
        }
      },

      scales: {
        y: {
          beginAtZero: false,
          ticks: {
            color: "#222"
          },
          grid: {
            color: "#dcdcdc"
          }
        },
        x: {
          ticks: {
            color: "#222"
          },
          grid: {
            display: false
          }
        }
      }
    }
  });


}