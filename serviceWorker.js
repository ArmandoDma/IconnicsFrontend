const CACHE_NAME = "iconnics-cache-v1";
const APP_SHELL = [
  "./index.html",
  "./pages/login.html",
  "./pages/register.html",
  "./pages/views/benefits.html",
  "./pages/view/dashboard.html",
  "./pages/view/performance.html",
  "./pages/view/settings.html",
  "./pages/view/help.html",
  "./pages/view/benefits.html",
  "./pages/view/bodydata.html",
  "./pages/view/notifications.html",


  //JS y CSS
  "./js/index.js",
  "./js/3dmodel.js",
  "./js/api.js",
  "./js/auth.js",
  "./js/benefits.js",
  "./js/bodydata.js",
  "./js/dash.js",
  "./js/help.js",
  "./js/index.js",
  "./js/login.js",
  "./js/main.js",
  "./js/notify.js",
  "./js/performance.js",
  "./js/register.js",
  "./js/router.js",
  "./js/tips.js",
  "./css/styles.css",
  "./css/fonts.css",
  "./css/loader.css",
  "./css/login.css",
  "./css/main.css",
  "./css/radar.css",

  //Imágenes y favicon
  "./images/iconnics_logo.png",
  "./images/heart.jpg",
  "./images/rate_heart.jpg",
  "./images/blood.jpg",
  "./images/blood_globes.jpg",
  "./images/hydrate.avif",
  "./images/water.avif",
  "./images/stressed.jpg",
  "./images/stress_women.jpg",
  "./images/sleep_tracker.jpg",
  "./images/sleeping.avif",
  "./images/run_walk.jpg",
  "./images/bikes_run.jpg",

  // Multimedia
  "./videos/men_gym.mp4",
  "./audios/Note-iPhone.mp3",

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
