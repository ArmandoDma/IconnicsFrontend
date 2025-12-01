import { getUserById } from "./api.js";

export async function getSettingsInfo() {
    let userSession = JSON.parse(localStorage.getItem("userSession"));
    const { id_usuario } = userSession;
    const { nombre, correo } = await getUserById(id_usuario);
    const accountName = document.getElementById("accountName");
    const accountEmail = document.getElementById("accountEmail")

    accountName.innerHTML = `${nombre}`;
    accountEmail.innerHTML = `${correo}`;

}