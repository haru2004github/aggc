(function () {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    function clamp(value, min, max) {
        return Math.min(Math.max(value, min), max);
    }

    function safeText(value) {
        return String(value ?? '').trim();
    }

    function safeAssetUrl(value) {
        const raw = safeText(value);
        if (!raw) return '';

        try {
            const url = new URL(raw, window.location.href);
            const isSafeProtocol = url.protocol === 'http:' || url.protocol === 'https:' || url.protocol === 'data:';
            const isSafeImageData = url.protocol !== 'data:' || /^data:image\/(?:png|jpe?g|gif|webp|svg\+xml);/i.test(raw);
            return isSafeProtocol && isSafeImageData ? raw : '';
        } catch {
            return '';
        }
    }

    function safeHref(value) {
        const raw = safeText(value) || '#';

        try {
            const url = new URL(raw, window.location.href);
            return ['http:', 'https:', 'mailto:', 'tel:', 'viber:'].includes(url.protocol) ? raw : '#';
        } catch {
            return '#';
        }
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

    function setupScrollReveal() {
        const selector = '.scroll-reveal, .scroll-reveal-left, .scroll-reveal-right';
        const revealItems = () => Array.from(document.querySelectorAll(selector));

        if (reduceMotion || !('IntersectionObserver' in window)) {
            revealItems().forEach((item) => item.classList.add('scroll-reveal-visible'));
            return;
        }

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;
                entry.target.classList.add('scroll-reveal-visible');
                observer.unobserve(entry.target);
            });
        }, {
            threshold: 0.18,
            rootMargin: '0px 0px -8% 0px'
        });

        const observeNewItems = () => {
            revealItems().forEach((item) => {
                if (item.dataset.scrollRevealBound === 'true') return;
                item.dataset.scrollRevealBound = 'true';
                observer.observe(item);
            });
        };

        observeNewItems();

        const mutationObserver = new MutationObserver(observeNewItems);
        mutationObserver.observe(document.body, { childList: true, subtree: true });
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
        if (headerTitle) headerTitle.textContent = 'Trusted Brands & Products';
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
            row.href = safeHref(card.getAttribute('href'));
            row.className = `brand-feature-row ${index % 2 ? 'brand-feature-row-reverse' : ''} group`;

            const copy = document.createElement('div');
            copy.className = 'brand-feature-copy';

            const logoSrc = safeAssetUrl(logo?.getAttribute('src'));
            if (logoSrc) {
                const logoImg = document.createElement('img');
                logoImg.src = logoSrc;
                logoImg.alt = safeText(logo?.getAttribute('alt')) || title;
                logoImg.className = 'brand-feature-logo';
                copy.appendChild(logoImg);
            } else {
                const textLogo = document.createElement('div');
                textLogo.className = 'brand-feature-logo product-text-logo';
                textLogo.textContent = title;
                copy.appendChild(textLogo);
            }

            const heading = document.createElement('h3');
            heading.textContent = title;
            copy.appendChild(heading);

            const paragraph = document.createElement('p');
            paragraph.textContent = desc;
            copy.appendChild(paragraph);

            const cta = document.createElement('span');
            cta.textContent = 'Explore Brand ';
            const ctaIcon = document.createElement('i');
            ctaIcon.className = 'fa-solid fa-arrow-right';
            cta.appendChild(ctaIcon);
            copy.appendChild(cta);

            const media = document.createElement('div');
            media.className = 'brand-feature-media';
            const productSrc = safeAssetUrl(product?.getAttribute('src'));
            if (productSrc) {
                const productImg = document.createElement('img');
                productImg.src = productSrc;
                productImg.alt = safeText(product?.getAttribute('alt')) || title;
                productImg.className = 'brand-feature-product';
                media.appendChild(productImg);
            }

            row.append(copy, media);
            list.appendChild(row);
        });

        oldGrid.replaceWith(list);
        setupBrandCopyAnimations();
    }

    function hardenExternalLinks() {
        document.querySelectorAll('a[target="_blank"]').forEach((link) => {
            const rel = new Set((link.getAttribute('rel') || '').split(/\s+/).filter(Boolean));
            rel.add('noopener');
            rel.add('noreferrer');
            link.setAttribute('rel', Array.from(rel).join(' '));
        });
    }

    document.addEventListener('DOMContentLoaded', () => {
        hardenExternalLinks();
        setupHomeHeader();
        setupProductsPageShowcase();
        setupScrollZoomImages();
        setupBrandCopyAnimations();
        setupScrollReveal();
    });
})();
