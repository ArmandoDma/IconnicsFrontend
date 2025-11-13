import { cargarModeloAnatomico, iniciarEscena } from "./3dmodel.js";
import { initBody } from "./bodydata.js";
import { getNotifications, initDashboard, populateHealthTips } from "./dash.js";

const routes = {
  "#dashboard": "../pages/views/dashboard.html",
  "#performance": "../pages/views/performance.html",
  "#tips": "../pages/views/benefits.html",
  "#bodydata": "../pages/views/bodydata.html",
  "#settings": "../pages/views/settings.html",
  "#help": "../pages/views/help.html",
  "#notifications": "../pages/views/notifications.html",
};

let lastValidHash = "#dashboard";

async function loadContent() {
  const hash = window.location.hash || "#dashboard";
  const token = localStorage.getItem("token");
  const protectedRoutes = [
    "#main",
    "#dashboard",
    "#performance",
    "#tips",
    "#bodydata",
    "#settings",
    "#help",
    "#notifications",
  ];

  if (!token && protectedRoutes.includes(hash)) {
    document.getElementById("main-content").innerHTML = `
    <div class="caps">
      <div class="caps-inner">
        <h2>Access Denied</h2>
        <p>You must log in to view this page.</p>
      </div>
    </div>
  `;
    window.location.href = "../pages/login.html";
    return;
  }

  switch (hash) {
    case "#logout":
      localStorage.removeItem("token");
      window.location.hash = lastValidHash;
      return;

    case "#dashboard":
    case "#performance":
    case "#tips":
    case "#bodydata":
      lastValidHash = hash;
      break;
    case "#settings":
    case "#notifications":
    case "#help":
      lastValidHash = hash;
      break;

    default:
      window.location.hash = "#dashboard";
      return;
  }

  const file = routes[hash] || routes["#dashboard"];

  try {
    const res = await fetch(file);
    const html = await res.text();
    document.getElementById("main-content").innerHTML = html;

    if (hash === "#bodydata") {
      iniciarEscena("anatomyCanvas");
      cargarModeloAnatomico("../renders/scene.gltf");
      initBody();
    }

    if (hash === "#dashboard") {
      initDashboard();
      populateHealthTips();
      getNotifications();
    }
  } catch (err) {
    document.getElementById("main-content").innerHTML =
      "<p>Error loading content.</p>";
  }
}

window.addEventListener("hashchange", loadContent);
window.addEventListener("DOMContentLoaded", loadContent);
