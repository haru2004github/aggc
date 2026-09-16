/* Follow the device motion preference; no website-specific switch or override. */
(function () {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const apply = () => {
        document.documentElement.dataset.motion = preference.matches ? 'reduced' : 'full';
    };
    window.aggcMotion = preference;
    preference.addEventListener('change', apply);
    apply();
})();
