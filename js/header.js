(function () {
    const header = document.getElementById('site-header');
    if (!header) return;

    const scrollThreshold = 30;

    function onScroll() {
        if (window.scrollY > scrollThreshold) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
})();