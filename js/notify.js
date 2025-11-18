export function notifies() {
  const buttons = document.querySelectorAll(".cat-btn");
  const cards = document.querySelectorAll(".notif-card");

  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      buttons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      const category = btn.getAttribute("data-category");

      cards.forEach((card) => {
        if (category === "all" || card.getAttribute("data-type") === category) {
          card.style.display = "flex";
        } else {
          card.style.display = "none";
        }
      });
    });
  });
}
