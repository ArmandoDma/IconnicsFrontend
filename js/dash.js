import { healthTips, notifications } from "./tips.js";

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

export function initDashboard() {
  const ctx = document.getElementById("projectChart").getContext("2d");
  const stripePattern = createStripePattern(ctx, "#4da6ff", 6, 1);
  const data = [28, 32, 34, 45, 65, 70, 90];
  const projectedDays = [false, false, false, false, true, true, true];
  const backgroundColor = projectedDays.map((isProjected) =>
    isProjected ? stripePattern : "#107be5ff"
  );

  new Chart(ctx, {
    type: "bar",
    data: {
      labels: ["S", "M", "T", "W", "T", "F", "S"],
      datasets: [
        {
          label: "Actividad (%)",
          data: data,
          backgroundColor: backgroundColor,
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
