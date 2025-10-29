import { manejarRegister } from "./auth.js";

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("registerForm");
  if (!form) {
    console.warn('No se encontró el formulario con id="registerForm"');
    return;
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const user = document.getElementById("username").value.trim();
    const ape = document.getElementById("ape").value.trim();
    const nombre = `${user} ${ape}`;
    const edad = document.getElementById("age").value.trim();
    const rol = document.getElementById("rl").value;
    const peso = document.getElementById("wt").value.trim();
    const altura = document.getElementById("ht").value.trim();
    const deporte = document.getElementById("dprt")?.value?.trim() || "";
    const correo = document.getElementById("eml").value.trim();
    const contrasena = document.getElementById("pss").value.trim();

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
  axios
    .get("../deportes.json")
    .then((res) => {
      const sports = res.data.deportes_medibles;
      sports.forEach((e) => {
        const { nombre } = e;

        const dprt = document.getElementById("dprt");
        let child = document.createElement("option");
        child.setAttribute("value", nombre);
        child.innerHTML = child.getAttribute("value");
        dprt.appendChild(child);
      });
    })
    .catch((error) => {
      console.error("json con axios no executed", error);
    });
});
