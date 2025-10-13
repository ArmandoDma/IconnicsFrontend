const audioNoti = document.getElementById('noti_motion');
const island = document.getElementById('island');

let hasTriggered = false;

window.addEventListener('scroll', () => {
    if (!hasTriggered && window.scrollY > 0) {
        hasTriggered = true;

        setTimeout(() => {
            island.classList.add('active');
            if (island.classList.contains('active')) {
                island.style.animation = 'expand .3s ease-in forwards';

                audioNoti.play().then(() => {
                    console.log("Audio started after scroll + delay");
                }).catch(err => {
                    console.log("Audio blocked:", err);
                });
            }
        }, 1000);
    }
});

let measure = document.querySelectorAll('.measure');
let measures = document.querySelectorAll('.measures');

measure.forEach((li, index) => {
    li.addEventListener('click', () => {
        measure.forEach(el => el.classList.remove('active'));
        measures.forEach(el => el.classList.remove('active'));
        li.classList.add('active');
        if (measures[index]) {
            measures[index].classList.add('active');
        }
    });
})

