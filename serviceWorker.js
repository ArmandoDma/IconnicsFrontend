const CACHE_NAME = "iconnics-cache-v1";
const APP_SHELL = [
  "./index.html",
  "login.html",
  "register.html",

  // JS y CSS
  "../js/index.js",
  "../css/styles.css",

  // Imágenes y favicon
  "../images/iconnics_logo.png",
  "../images/heart.jpg",
  "../images/rate_heart.jpg",
  "../images/blood.jpg",
  "../images/blood_globes.jpg",
  "../images/hydrate.avif",
  "../images/water.avif",
  "../images/stressed.jpg",
  "../images/stress_women.jpg",
  "../images/sleep_tracker.jpg",
  "../images/sleeping.avif",
  "../images/run_walk.jpg",
  "../images/bikes_run.jpg",

  // Multimedia
  "../videos/men_gym.mp4",
  "../audios/Note-iPhone.mp3",

  // Íconos externos (CDN)
  "https://cdn.boxicons.com/fonts/basic/boxicons.min.css",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_SHELL))
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(keys.map((key) => key !== CACHE_NAME && caches.delete(key)))
      )
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches
      .match(event.request)
      .then((response) => response || fetch(event.request))
  );
});
