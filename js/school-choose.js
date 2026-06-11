document.addEventListener('DOMContentLoaded', () => {

    const track = document.getElementById('schoolChooseTrack');
    const dots = document.querySelectorAll('.school-choose__dot');

    if (!track || !dots.length) {
        return;
    }

    const updateDots = () => {

        if (window.innerWidth > 767) {
            return;
        }

        const card = track.querySelector('.school-choose-card');

        if (!card) {
            return;
        }

        const cardWidth = card.offsetWidth + 16;

        const activeIndex = Math.round(
            track.scrollLeft / cardWidth
        );

        dots.forEach((dot, index) => {
            dot.classList.toggle(
                'is-active',
                index === activeIndex
            );
        });
    };

    track.addEventListener('scroll', updateDots);

    dots.forEach((dot, index) => {

        dot.addEventListener('click', () => {

            const card = track.querySelector('.school-choose-card');

            if (!card) {
                return;
            }

            const cardWidth = card.offsetWidth + 16;

            track.scrollTo({
                left: cardWidth * index,
                behavior: 'smooth'
            });

        });

    });

});