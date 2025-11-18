export function benefitsCarousel(){
    let slides = document.querySelectorAll(".benefit-slide");
    let current = 0;

    function showSlide(index) {
        slides.forEach(s => s.classList.remove("active"));
        slides[index].classList.add("active");
    }

    document.querySelector(".next").onclick = () => {
        current = (current + 1) % slides.length;
        showSlide(current);
    };

    document.querySelector(".prev").onclick = () => {
        current = (current - 1 + slides.length) % slides.length;
        showSlide(current);
    };

    setInterval(() => {
        current = (current + 1) % slides.length;
        showSlide(current);
    }, 4000);
}