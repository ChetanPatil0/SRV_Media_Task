

(function () {
    'use strict';

    class MarqueeManager {

        constructor() {

            this.marquees = [];

            this.prefersReducedMotion =
                window.matchMedia(
                    '(prefers-reduced-motion: reduce)'
                ).matches;

            this.init();

            this.bindMediaQueryListener();

        }

        init() {

            const marqueeElements =
                document.querySelectorAll(
                    '.marquee__track'
                );

            marqueeElements.forEach((track) => {

                this.marquees.push({

                    element: track,

                    container:
                        track.closest('.marquee')

                });

            });

            this.setupAccessibility();

            this.setupInteractions();

        }

        setupAccessibility() {

            this.marquees.forEach((marquee) => {

                const container =
                    marquee.container;

                if (
                    !container.hasAttribute(
                        'role'
                    )
                ) {

                    container.setAttribute(
                        'role',
                        'region'
                    );

                }

                if (
                    !container.hasAttribute(
                        'aria-label'
                    )
                ) {

                    container.setAttribute(
                        'aria-label',
                        'Participating Schools'
                    );

                }

            });

        }

        setupInteractions() {

            this.marquees.forEach((marquee) => {

                const container =
                    marquee.container;

                const track =
                    marquee.element;

                container.addEventListener(
                    'mouseenter',
                    () => this.pauseAnimation(track)
                );

                container.addEventListener(
                    'mouseleave',
                    () => this.resumeAnimation(track)
                );

                container.addEventListener(
                    'focusin',
                    () => this.pauseAnimation(track)
                );

                container.addEventListener(
                    'focusout',
                    () => this.resumeAnimation(track)
                );

                this.setupTouchInteractions(
                    container,
                    marquee
                );

            });

        }

        pauseAnimation(element) {

            element.style.animationPlayState =
                'paused';

            element.setAttribute(
                'data-paused',
                'true'
            );

        }

        resumeAnimation(element) {

            if (
                !this.prefersReducedMotion
            ) {

                element.style.animationPlayState =
                    'running';

                element.removeAttribute(
                    'data-paused'
                );

            }

        }

        setupTouchInteractions(
            container,
            marquee
        ) {

            container.addEventListener(
                'touchstart',
                () => {

                    this.pauseAnimation(
                        marquee.element
                    );

                },
                { passive: true }
            );

            container.addEventListener(
                'touchend',
                () => {

                    this.resumeAnimation(
                        marquee.element
                    );

                },
                { passive: true }
            );

        }

        bindMediaQueryListener() {

            const mql =
                window.matchMedia(
                    '(prefers-reduced-motion: reduce)'
                );

            mql.addEventListener(
                'change',
                (e) => {

                    this.prefersReducedMotion =
                        e.matches;

                    this.marquees.forEach(
                        (marquee) => {

                            if (
                                this.prefersReducedMotion
                            ) {

                                this.pauseAnimation(
                                    marquee.element
                                );

                            } else {

                                this.resumeAnimation(
                                    marquee.element
                                );

                            }

                        }
                    );

                }
            );

        }

    }

    if (
        document.readyState ===
        'loading'
    ) {

        document.addEventListener(
            'DOMContentLoaded',
            () => {

                new MarqueeManager();

            }
        );

    } else {

        new MarqueeManager();

    }

})();