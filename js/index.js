const audioNoti = document.getElementById("noti_motion");
const island = document.getElementById("island");

let hasTriggered = false;

window.addEventListener("scroll", () => {
  if (!hasTriggered && window.scrollY > 0) {
    hasTriggered = true;

    setTimeout(() => {
      island.classList.add("active");
      if (island.classList.contains("active")) {
        island.style.animation = "expand .3s ease-in forwards";

        audioNoti
          .play()
          .then(() => {
            console.log("Audio started after scroll + delay");
          })
          .catch((err) => {
            console.log("Audio blocked:", err);
          });
      }
    }, 1000);
  }
});

let measure = document.querySelectorAll(".measure");
let measures = document.querySelectorAll(".measures");

measure.forEach((li, index) => {
  li.addEventListener("click", () => {
    measure.forEach((el) => el.classList.remove("active"));
    measures.forEach((el) => el.classList.remove("active"));
    li.classList.add("active");
    if (measures[index]) {
      measures[index].classList.add("active");
    }
  });
});

let noti = document.getElementById("allownoti");
let clickCount = 0;
const maxClicks = 1;

noti.addEventListener("click", () => {
  if (clickCount >= maxClicks) {
    console.log("Notification limit reached.");
    noti.disabled = true;
    noti.innerText = "Notifications Set";
    return;
  }

  Notification.requestPermission()
    .then((permission) => {
      if (permission === "granted") {
        new Notification("Notifications Enabled", {
          body: "You will now receive real-time alerts.",
          icon: "../images/iconnics_logo.png",
        });
      }
    })
    .catch((err) => {
      console.log("Notification permission error:", err);
    });

  clickCount++;
});

const btn = document.querySelector(".m_menu_btn");
const menu = document.getElementById("mobileMenu");

let overlay = document.createElement("div");
overlay.classList.add("menu_overlay");
document.body.appendChild(overlay);

btn.addEventListener("click", () => {
  menu.classList.toggle("active");
  overlay.classList.toggle("active");
});

overlay.addEventListener("click", () => {
  menu.classList.remove("active");
  overlay.classList.remove("active");
});

if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("/serviceWorker.js")
    .then((reg) => console.log("SW registrado:", reg.scope))
    .catch((err) => console.error("Error registrando SW:", err));
}
