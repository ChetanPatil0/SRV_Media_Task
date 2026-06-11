(function () {

    'use strict';

    const track =
        document.querySelector(
            '.exhibition-slider__track'
        );

    const cards =
        document.querySelectorAll(
            '.exhibition-card'
        );

    const prevBtn =
        document.querySelector(
            '.exhibition-slider__btn--prev'
        );

    const nextBtn =
        document.querySelector(
            '.exhibition-slider__btn--next'
        );

    const slider =
        document.querySelector(
            '.exhibition-slider'
        );

    const status =
        document.getElementById(
            'slider-status'
        );

    if (
        !track ||
        !cards.length ||
        !prevBtn ||
        !nextBtn ||
        !slider
    ) {
        return;
    }

    const prefersReducedMotion =
        window.matchMedia(
            '(prefers-reduced-motion: reduce)'
        ).matches;

    let currentIndex = 0;

    let autoSlideTimer = null;

    const AUTO_DELAY = 3000;

    const TRANSITION = 450;

    let isAnimating = false;

    function cardsPerView() {

        if (window.innerWidth < 768) {
            return 1;
        }

        if (window.innerWidth < 1024) {
            return 2;
        }

        return 4;

    }

    function maxIndex() {

        return Math.max(
            0,
            cards.length - cardsPerView()
        );

    }

    function updateSlider() {

        const gap = 24;

        const cardWidth =
            cards[0].offsetWidth + gap;

        track.style.transform =
            `translateX(-${currentIndex * cardWidth}px)`;

        if (status) {

            status.textContent =
                `Slide ${currentIndex + 1}`;

        }

    }

    function goTo(index) {

        if (isAnimating) {
            return;
        }

        isAnimating = true;

        const max =
            maxIndex();

        if (index > max) {
            index = 0;
        }

        if (index < 0) {
            index = max;
        }

        currentIndex = index;

        updateSlider();

        setTimeout(() => {

            isAnimating = false;

        }, TRANSITION);

    }

    function startAuto() {

        if (prefersReducedMotion) {
            return;
        }

        stopAuto();

        autoSlideTimer =
            setInterval(() => {

                goTo(
                    currentIndex + 1
                );

            }, AUTO_DELAY);

    }

    function stopAuto() {

        if (autoSlideTimer) {

            clearInterval(
                autoSlideTimer
            );

            autoSlideTimer = null;

        }

    }

    nextBtn.addEventListener(
        'click',
        () => {

            goTo(
                currentIndex + 1
            );

            startAuto();

        }
    );

    prevBtn.addEventListener(
        'click',
        () => {

            goTo(
                currentIndex - 1
            );

            startAuto();

        }
    );

    slider.addEventListener(
        'mouseenter',
        stopAuto
    );

    slider.addEventListener(
        'mouseleave',
        startAuto
    );

    slider.addEventListener(
        'focusin',
        stopAuto
    );

    slider.addEventListener(
        'focusout',
        startAuto
    );

    slider.addEventListener(
        'touchstart',
        stopAuto,
        { passive: true }
    );

    slider.addEventListener(
        'touchend',
        startAuto,
        { passive: true }
    );

    slider.addEventListener(
        'keydown',
        (e) => {

            if (
                e.key ===
                'ArrowRight'
            ) {

                e.preventDefault();

                goTo(
                    currentIndex + 1
                );

                startAuto();

            }

            if (
                e.key ===
                'ArrowLeft'
            ) {

                e.preventDefault();

                goTo(
                    currentIndex - 1
                );

                startAuto();

            }

        }
    );

    let resizeTimer;

    window.addEventListener(
        'resize',
        () => {

            clearTimeout(
                resizeTimer
            );

            resizeTimer =
                setTimeout(
                    () => {

                        if (
                            currentIndex >
                            maxIndex()
                        ) {

                            currentIndex =
                                maxIndex();

                        }

                        updateSlider();

                    },
                    120
                );

        }
    );

    updateSlider();

    startAuto();

})();