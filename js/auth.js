import { loginUsuario, registerUsuario } from "./api.js";

export const manejarLogin = async (correo, contrasena) => {
  if (!correo || !contrasena) {
    alert("Por favor completa correo y contraseña.");
    return;
  }

  if (contrasena.length < 6) {
    alert("La contraseña debe tener al menos 6 caracteres.");
    return;
  }

  const re = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
  if (!re.test(correo)) {
    alert("Introduce un correo válido.");
    return;
  }

  try {
    const { token, mensaje } = await loginUsuario(correo, contrasena);
    localStorage.setItem("token", token);
    alert(JSON.stringify(token));
    window.location.href = "../pages/main.html#";
  } catch (error) {
    alert(error);
  }
};

export const manejarRegister = async (
  nombre,
  edad,
  rol,
  peso,
  altura,
  deporte,
  correo,
  contrasena
) => {
  const errorBox = document.getElementById("errorbox");
  errorBox.style.display = "none";
  errorBox.textContent = "";

  const showError = (msg) => {
    errorBox.textContent = msg;
    errorBox.style.display = "block";
  };

  const nombreRegex = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]{2,}$/;
  const edadRegex = /^\d{1,3}$/;
  const pesoRegex = /^\d{1,3}(\.\d{1,2})?$/;
  const alturaRegex = /^\d{1}(\.\d{1,2})?m$/;
  const deporteRegex = /^[A-Za-z\s]{2,}$/;
  const emailRegex = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
  const rolesValidos = ["Coach", "Deportist"];

  if (!nombreRegex.test(nombre))
    return showError(
      "Nombre inválido. Solo letras y espacios, mínimo 2 caracteres."
    );
  if (!edadRegex.test(edad))
    return showError("Edad inválida. Solo números, máximo 3 dígitos.");
  if (!rolesValidos.includes(rol))
    return showError("Rol inválido. Selecciona uno válido.");
  if (!pesoRegex.test(peso))
    return showError("Peso inválido. Usa formato numérico (ej. 70 o 70.5).");
  if (!alturaRegex.test(altura))
    return showError("Altura inválida. Usa formato tipo 1.75m.");
  if (!deporteRegex.test(deporte))
    return showError("Deporte inválido. Solo letras y espacios.");
  if (!emailRegex.test(correo)) return showError("Correo inválido.");
  if (!passwordRegex.test(contrasena))
    return showError(
      "Contraseña inválida. Mínimo 6 caracteres, con letra y número."
    );

  try {
    const datos = {
      nombre,
      edad,
      rol,
      peso,
      altura,
      deporte,
      correo,
      contrasena,
    };

    const res = await registerUsuario(datos);
    window.location.href = "../pages/login.html";
    console.log(res)
  } catch (error) {
    showError(error.message || "Error de conexión con el servidor");
    setTimeout(() => {
      window.location.reload();
    }, 2000)
  }
};
