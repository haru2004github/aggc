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

    function setupProductsPageShowcase() {
        const brandsSection = document.querySelector('body:not(.home-immersive-header) #brands');
        const oldGrid = brandsSection?.querySelector('.grid .product-card-hover')?.parentElement;
        if (!brandsSection || !oldGrid || brandsSection.querySelector('.brand-feature-list')) return;

        const oldCards = Array.from(oldGrid.querySelectorAll('a.product-card-hover'));
        const productDescriptions = [
            'Earthmoving, road construction, concrete, and heavy equipment platforms.',
            'Commercial vehicles, logistics mobility, and automotive fleet solutions.',
            'Generator sets, ATS panels, water pumps, lighting towers, and control systems.',
            'Air conditioning, elevators, escalators, sanitary ware, and building products.',
            'Engine oil, hydraulic oil, gear oil, and industrial energy products.',
            'High-performance equipment, durable engineering, and specialized solutions.'
        ];

        const headerTitle = brandsSection.querySelector('h2');
        const headerKicker = brandsSection.querySelector('h4');
        const headerText = brandsSection.querySelector('p');
        if (headerKicker) headerKicker.textContent = 'Industrial Portfolio';
        if (headerTitle) headerTitle.innerHTML = 'Trusted Brands &amp; Products';
        if (headerText) headerText.textContent = 'A global-grade product portfolio for machinery, commercial vehicles, power systems, building solutions, energy products, and specialized engineering equipment.';

        const list = document.createElement('div');
        list.className = 'brand-feature-list product-page-brand-list space-y-8 sm:space-y-10';

        oldCards.forEach((card, index) => {
            const logo = card.querySelector('img[alt*="Logo"], img[src*="logo"]');
            const product = Array.from(card.querySelectorAll('img')).find((img) => img !== logo);
            const featureItems = Array.from(card.querySelectorAll('li')).map((item) => item.textContent.trim()).filter(Boolean);
            const title = logo?.alt?.replace(/\s*Logo\s*/i, '').trim() || card.querySelector('h3')?.textContent.trim() || featureItems[0] || 'AGGC Product';
            const desc = productDescriptions[index] || featureItems.slice(0, 3).join(', ') || 'Trusted industrial product solutions from AGGC.';

            const row = document.createElement('a');
            row.href = card.getAttribute('href') || '#';
            row.className = `brand-feature-row ${index % 2 ? 'brand-feature-row-reverse' : ''} group`;
            row.innerHTML = `
                <div class="brand-feature-copy">
                    ${logo ? `<img src="${logo.getAttribute('src')}" alt="${logo.getAttribute('alt') || title}" class="brand-feature-logo">` : `<div class="brand-feature-logo product-text-logo">${title}</div>`}
                    <h3>${title}</h3>
                    <p>${desc}</p>
                    <span>Explore Brand <i class="fa-solid fa-arrow-right"></i></span>
                </div>
                <div class="brand-feature-media">
                    ${product ? `<img src="${product.getAttribute('src')}" alt="${product.getAttribute('alt') || title}" class="brand-feature-product">` : ''}
                </div>
            `;
            list.appendChild(row);
        });

        oldGrid.replaceWith(list);
        setupBrandCopyAnimations();
    }

    document.addEventListener('DOMContentLoaded', () => {
        setupHomeHeader();
        setupProductsPageShowcase();
        setupScrollZoomImages();
        setupBrandCopyAnimations();
    });
})();
