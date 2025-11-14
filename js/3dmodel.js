import * as THREE from "https://esm.sh/three";
import { OrbitControls } from "https://esm.sh/three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "https://esm.sh/three/examples/jsm/loaders/GLTFLoader.js";

let scene, camera, renderer, controls;
const puntosInteractivos = [
  {
    id: 1,
    position: new THREE.Vector3(
      0.10916415449509931,
      0.38533473121998285,
      0.07106836880200276
    ),
    info: "Zona cardíaca",
  },
  {
    id: 2,
    position: new THREE.Vector3(0.077, 0.223, 0.143),
    info: "Zona pulmonar",
  },
  {
    id: 3,
    position: new THREE.Vector3(-0.0009231665287703361, 0.8806252717250624, 0.1043349201158524),
    info: "Zona cerebral",
  },
];

export function iniciarEscena(canvasId = "anatomyCanvas") {
  scene = new THREE.Scene();
  scene.background = null;

  camera = new THREE.PerspectiveCamera(
    30,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.set(0, 1.5, 3);

  renderer = new THREE.WebGLRenderer({
    canvas: document.getElementById(canvasId),
    antialias: true,
    alpha: true,
  });

  const container = document.getElementById(canvasId).parentElement;
  const { clientWidth, clientHeight } = container;
  renderer.setSize(clientWidth, clientHeight);
  camera.aspect = clientWidth / clientHeight;
  camera.updateProjectionMatrix();

  const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444, 1.5);
  scene.add(hemiLight);

  const dirLight = new THREE.DirectionalLight(0xffffff, 1);
  dirLight.position.set(5, 10, 7.5);
  scene.add(dirLight);

  controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.05;
  controls.target.set(0, 0, 0);
  controls.update();

  const canvas = renderer.domElement;
  canvas.style.cursor = "grab";

  controls.addEventListener("start", () => {
    canvas.style.cursor = "grabbing";
  });

  controls.addEventListener("end", () => {
    canvas.style.cursor = "grab";
  });

  window.addEventListener("resize", ajustarVentana);
  animate();
  const raycaster = new THREE.Raycaster();
  const mouse = new THREE.Vector2();

  window.addEventListener("click", (event) => {
    const canvasBounds = renderer.domElement.getBoundingClientRect();

    mouse.x =
      ((event.clientX - canvasBounds.left) / canvasBounds.width) * 2 - 1;
    mouse.y =
      -((event.clientY - canvasBounds.top) / canvasBounds.height) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(scene.children, true);

    if (intersects.length > 0) {
      const objeto = intersects[0].object;
      const puntoImpacto = intersects[0].point;

      const vector2D = puntoImpacto.clone().project(camera);
      const x =
        (vector2D.x * 0.5 + 0.5) * canvasBounds.width + canvasBounds.left;
      const y =
        (-vector2D.y * 0.5 + 0.5) * canvasBounds.height + canvasBounds.top;

      console.log("🧭 Posición del clic:", puntoImpacto);
      console.log("🧩 Tocaste:", objeto.name);

      if (objeto.name.startsWith("punto-")) {
        mostrarPopup(objeto.userData.info, x, y);
      }
    }
  });
}

export function cargarModeloAnatomico(path, onLoad) {
  if (typeof path !== "string") {
    console.error("Ruta inválida para modelo:", path);
    return;
  }

  const loader = new GLTFLoader();
  loader.load(
    path,
    (gltf) => {
      gltf.scene.scale.set(100, 100, 100);
      gltf.scene.position.set(0, 0, 0);

      gltf.scene.traverse((child) => {
        if (child.isMesh) {
          child.name = child.name || "Parte desconocida";
        }
      });

      const escala = 5;

      puntosInteractivos.forEach((punto) => {
        const geometry = new THREE.SphereGeometry(0.01 * escala, 16, 16);
        const material = new THREE.MeshBasicMaterial({
          color: 0x000000,
          transparent: true,
          opacity: 0.5,
        });
        const esfera = new THREE.Mesh(geometry, material);
        esfera.position.copy(punto.position);
        esfera.name = `punto-${punto.id}`;
        esfera.userData.info = punto.info;

        const etiqueta = crearEtiquetaNumero(punto.id);
        etiqueta.position.copy(
          punto.position.clone().add(new THREE.Vector3(0, 0.02, 0))
        );
        scene.add(etiqueta);
        scene.add(esfera);
      });

      scene.add(gltf.scene);

      const box = new THREE.Box3().setFromObject(gltf.scene);
      const center = box.getCenter(new THREE.Vector3());
      const size = box.getSize(new THREE.Vector3()).length();

      camera.position.copy(center);
      camera.position.z += size * 2;
      camera.lookAt(center);

      controls.target.copy(center);
      controls.update();

      if (onLoad) onLoad(gltf.scene);
    },
    undefined,
    (error) => {
      console.error("Error al cargar el modelo:", error);
    }
  );
}

function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}

function ajustarVentana() {
  const container = renderer.domElement.parentElement;
  const { clientWidth, clientHeight } = container;
  camera.aspect = clientWidth / clientHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(clientWidth, clientHeight);
}
function mostrarPopup(texto, x, y) {
  const popup = document.createElement("div");
  popup.className = "popup";
  popup.textContent = texto;
  popup.style.position = "absolute";
  popup.style.left = `${x}px`;
  popup.style.top = `${y}px`;
  popup.style.padding = "10px";
  popup.style.background = "#222";
  popup.style.color = "#fff";
  popup.style.borderRadius = "5px";
  popup.style.zIndex = "9999";
  popup.style.pointerEvents = "none";
  popup.style.transform = "translate(-50%, -100%)";
  document.body.appendChild(popup);

  setTimeout(() => popup.remove(), 3000);
}

function crearEtiquetaNumero(numero) {
  const canvas = document.createElement("canvas");
  canvas.width = 64;
  canvas.height = 64;
  const ctx = canvas.getContext("2d");
  ctx.fillStyle = "#fff";
  ctx.font = "bold 32px sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(numero, 32, 32);

  const texture = new THREE.CanvasTexture(canvas);
  const material = new THREE.SpriteMaterial({ map: texture });
  const sprite = new THREE.Sprite(material);
  sprite.scale.set(0.05, 0.05, 1);
  return sprite;
}
