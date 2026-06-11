(function () {

    const prefersReducedMotion =
        window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) return;

    const columns = [
        document.getElementById('col-1'),
        document.getElementById('col-2'),
        document.getElementById('col-3')
    ];

    if (!columns[0]) return;

    const SPEEDS = [78, 62, 92];
    const SCROLL_DISTANCE = 310;

    columns.forEach(col => {
        const originals = Array.from(col.children);

        originals.forEach(img => {
            const clone = img.cloneNode(true);
            clone.setAttribute('aria-hidden', 'true');
            col.appendChild(clone);
        });
    });

    let offsets = [0, 0, 0];
    let lastTime = null;

    function animate(timestamp) {

        if (!lastTime) {
            lastTime = timestamp;
        }

        const delta = (timestamp - lastTime) / 1000;
        lastTime = timestamp;

        columns.forEach((col, i) => {

            offsets[i] += SPEEDS[i] * delta;

            if (offsets[i] >= SCROLL_DISTANCE) {
                offsets[i] -= SCROLL_DISTANCE;
            }

            col.style.transform =
                `translateY(-${offsets[i]}px)`;

        });

        requestAnimationFrame(animate);
    }

    requestAnimationFrame(animate);

})();


(function () {

    const prefersReducedMotion =
        window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) return;

    const slider =
        document.querySelector('.hero__mobile-track');

    if (!slider) return;

    let autoSlide = setInterval(moveSlider, 2500);

    function moveSlider() {

        const maxScroll =
            slider.scrollWidth - slider.clientWidth;

        if (slider.scrollLeft >= maxScroll - 5) {

            slider.scrollTo({
                left: 0,
                behavior: 'smooth'
            });

        } else {

            slider.scrollBy({
                left: 140,
                behavior: 'smooth'
            });

        }
    }

    slider.addEventListener('touchstart', () => {
        clearInterval(autoSlide);
    });

    slider.addEventListener('touchend', () => {
        autoSlide = setInterval(moveSlider, 2500);
    });

})();