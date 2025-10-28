import { manejarRegister } from "./auth.js";

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("registerForm");
  if (!form) {
    console.warn('No se encontró el formulario con id="registerForm"');
    return;
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const nombre = document.getElementById("username").value.trim();
    const edad = document.getElementById("age").value.trim();
    const rol = document.getElementById("rl").value;
    const peso = document.getElementById("wt").value.trim();
    const altura = document.getElementById("ht").value.trim();
    const deporte = document.getElementById("dprt")?.value?.trim() || "";
    const correo = document.getElementById("eml").value.trim();
    const contrasena = document.getElementById("pss").value;

    manejarRegister(
      nombre,
      edad,
      rol,
      peso,
      altura,
      deporte,
      correo,
      contrasena
    );
  });
});
