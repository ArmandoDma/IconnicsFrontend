export function helpJS() {
  const questions = document.querySelectorAll(".faq-question");

  questions.forEach((q) => {
    q.addEventListener("click", () => {
      const answer = q.nextElementSibling;
      answer.style.display =
        answer.style.display === "block" ? "none" : "block";
    });
  });

  const input = document.getElementById("faqSearch");

  input.addEventListener("input", () => {
    const filter = input.value.toLowerCase();
    const faqs = document.querySelectorAll(".faq-item");

    faqs.forEach((faq) => {
      const text = faq.innerText.toLowerCase();

      if (text.includes(filter)) {
        faq.style.display = "block";
      } else {
        faq.style.display = "none";
      }
    });
  });
}
