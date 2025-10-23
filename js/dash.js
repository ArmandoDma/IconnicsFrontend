const dashboard = document.getElementById('dashboard');
const rolSelector = document.getElementById('rolSelector');

const data = {
  deportista: [
    { titulo: '🔥 Calorías quemadas', valor: '520 kcal' },
    { titulo: '📍 Distancia recorrida', valor: '7.2 km' },
    { titulo: '🔁 Sesiones esta semana', valor: '4' }
  ],
  coach: [
    { titulo: '🏃‍♂️ Atletas activos', valor: '12' },
    { titulo: '📅 Sesiones programadas', valor: '8' },
    { titulo: '📨 Mensajes nuevos', valor: '3' }
  ],
  admin: [
    { titulo: '👥 Usuarios registrados', valor: '154' },
    { titulo: '📊 Reportes generados', valor: '27' },
    { titulo: '⚠️ Solicitudes pendientes', valor: '5' }
  ]
};

function renderDashboard(rol) {
  dashboard.innerHTML = '';
  data[rol].forEach(item => {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `<h2>${item.titulo}</h2><p>${item.valor}</p>`;
    dashboard.appendChild(card);
  });
}

rolSelector.addEventListener('change', e => {
  renderDashboard(e.target.value);
});

renderDashboard(rolSelector.value);