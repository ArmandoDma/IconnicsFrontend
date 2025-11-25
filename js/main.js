window.addEventListener("load", () => {
  window.location.pathname.includes("main.html");
  window.location.assign("#main");
});

let uinfo = document.getElementById("uinfo");
uinfo.innerHTML = "User <br/> Email";

let lnks = document.querySelectorAll(".lnk");
lnks.forEach((ln) => {
  ln.addEventListener("click", () => {
    document.querySelector(".lnk.active").classList.remove("active");
    ln.classList.add("active");
  });
});

/*notification button */
let toggleBtn = document.getElementById("noti_btn");
toggleBtn.addEventListener("click", () => {
  window.location.assign("#notifications")
});

/*logout btn*/
let logoutBtn = document.getElementById("logout");
let ovrly = document.getElementById("ovrly");
let number = document.getElementById("number");

logoutBtn.addEventListener("click", () => {
  ovrly.style.display = "flex";
  let count = 3;
  number.textContent = count;
  let interval = setInterval(() => {
    count--;
    number.textContent = count;
    if (count === 0) {
      number.textContent = "Logging out...";
      number.style.fontSize = "1rem";
      clearInterval(interval);
      window.location.href = "../pages/login.html";
    }
  }, 1000);
});

const menuBtn = document.querySelector(".menu-btn");
const sideMenu = document.getElementById("sideMenu");
const overlay = document.getElementById("overlay");

menuBtn.addEventListener("click", () => {
  sideMenu.classList.toggle("open");
  overlay.classList.toggle("active");
});

overlay.addEventListener("click", () => {
  sideMenu.classList.remove("open");
  overlay.classList.remove("active");
});
