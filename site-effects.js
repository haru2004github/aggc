(function () {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    function clamp(value, min, max) {
        return Math.min(Math.max(value, min), max);
    }

    function shouldAnimateImage(img) {
        const src = (img.getAttribute('src') || '').toLowerCase();
        const alt = (img.getAttribute('alt') || '').toLowerCase();

        if (img.closest('nav, footer, #mobileMenu, #imageModal, #lightbox, [id*="modal"], [class*="modal"]')) return false;
        if (img.closest('.brand-feature-media')) return false;
        if (src.includes('logo') || src.includes('location-qr') || alt.includes('logo') || alt.includes('qr')) return false;
        if (img.width < 96 && img.height < 96) return false;

        return true;
    }

    function collectImages() {
        if (reduceMotion) return [];

        return Array.from(document.images).filter((img) => {
            if (!shouldAnimateImage(img)) return false;
            img.classList.add('scroll-zoom-image');
            return true;
        });
    }

    let zoomImages = [];
    let ticking = false;

    function updateImageZoom() {
        ticking = false;
        const viewportHeight = window.innerHeight || document.documentElement.clientHeight;

        zoomImages.forEach((img) => {
            if (!img.isConnected) return;

            const rect = img.getBoundingClientRect();
            if (rect.bottom < -200 || rect.top > viewportHeight + 200) return;

            const progress = clamp((viewportHeight - rect.top) / (viewportHeight + rect.height), 0, 1);
            const scale = 1 + progress * 0.085;
            img.style.setProperty('--scroll-zoom', scale.toFixed(3));
        });
    }

    function requestZoomUpdate() {
        if (ticking || reduceMotion) return;
        ticking = true;
        window.requestAnimationFrame(updateImageZoom);
    }

    function setupScrollZoomImages() {
        zoomImages = collectImages();
        updateImageZoom();

        window.addEventListener('scroll', requestZoomUpdate, { passive: true });
        window.addEventListener('resize', requestZoomUpdate);

        const observer = new MutationObserver(() => {
            zoomImages = collectImages();
            requestZoomUpdate();
        });
        observer.observe(document.body, { childList: true, subtree: true });
    }

    function setupHomeHeader() {
        const navbar = document.getElementById('navbar');
        const homeHero = document.getElementById('home');
        if (!navbar || !homeHero) return;

        document.body.classList.add('home-immersive-header');

        const updateHeader = () => {
            navbar.classList.toggle('header-over-hero', window.scrollY < 24);
        };

        updateHeader();
        window.addEventListener('scroll', updateHeader, { passive: true });
    }

    function setupBrandCopyAnimations() {
        const copyBlocks = Array.from(document.querySelectorAll('.brand-feature-copy'));
        const mediaBlocks = Array.from(document.querySelectorAll('.brand-feature-media'));
        if (!copyBlocks.length && !mediaBlocks.length) return;

        if (reduceMotion || !('IntersectionObserver' in window)) {
            copyBlocks.forEach((block) => block.classList.add('brand-copy-visible'));
            mediaBlocks.forEach((block) => block.classList.add('brand-media-visible'));
            return;
        }

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;
                if (entry.target.classList.contains('brand-feature-copy')) {
                    entry.target.classList.add('brand-copy-visible');
                }
                if (entry.target.classList.contains('brand-feature-media')) {
                    entry.target.classList.add('brand-media-visible');
                }
                observer.unobserve(entry.target);
            });
        }, {
            threshold: 0.28,
            rootMargin: '0px 0px -8% 0px'
        });

        copyBlocks.forEach((block) => observer.observe(block));
        mediaBlocks.forEach((block) => observer.observe(block));
    }

    document.addEventListener('DOMContentLoaded', () => {
        setupHomeHeader();
        setupScrollZoomImages();
        setupBrandCopyAnimations();
    });
})();
