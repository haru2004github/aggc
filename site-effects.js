(function () {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const effectsScriptUrl = document.currentScript?.src || window.location.href;
    const siteRootUrl = new URL('.', effectsScriptUrl);

    function siteUrl(path) {
        return new URL(path, siteRootUrl).href;
    }

    function setupUnifiedFooter() {
        const currentFooter = document.querySelector('footer');
        const footer = document.createElement('footer');
        footer.id = 'site-footer';
        footer.className = 'bg-gradient-to-br from-[#12356c] via-[#0d2858] to-[#071633] border-t border-white/10 pt-16 pb-8 mt-auto relative overflow-hidden';
        footer.setAttribute('data-unified-footer', 'true');
        footer.innerHTML = `
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-8 lg:gap-6 mb-12">
                    <div class="col-span-2 flex flex-col space-y-4">
                        <div class="bg-white/95 p-2 rounded-xl w-fit shadow-lg">
                            <img src="${siteUrl('img/logo.png')}" class="w-40 max-h-14 object-contain" alt="AGGC Logo">
                        </div>
                        <p class="text-slate-300 text-[13px] font-light leading-relaxed max-w-xs">
                            Aung Gyi Group of Companies. A leading diversified business group operating across global industrial sectors. Let's Build Together!
                        </p>
                    </div>

                    <div>
                        <h4 class="font-heading font-extrabold text-[13px] text-white uppercase tracking-wider mb-4">Home</h4>
                        <ul class="space-y-2.5 text-[12px]">
                            <li><a href="${siteUrl('index.html#about')}" class="text-slate-300 hover:text-brand-gold font-medium transition-colors">Welcome</a></li>
                            <li><a href="${siteUrl('index.html#sectors')}" class="text-slate-300 hover:text-brand-gold font-medium transition-colors">Sectors</a></li>
                            <li><a href="${siteUrl('products.html')}" class="text-slate-300 hover:text-brand-gold font-medium transition-colors">Brands</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 class="font-heading font-extrabold text-[13px] text-white uppercase tracking-wider mb-4">About</h4>
                        <ul class="space-y-2.5 text-[12px]">
                            <li><a href="${siteUrl('about.html#profile')}" class="text-slate-300 hover:text-brand-gold font-medium transition-colors">Profile</a></li>
                            <li><a href="${siteUrl('about.html#vision')}" class="text-slate-300 hover:text-brand-gold font-medium transition-colors">Vision</a></li>
                            <li><a href="${siteUrl('about.html#missions')}" class="text-slate-300 hover:text-brand-gold font-medium transition-colors">Missions</a></li>
                            <li><a href="${siteUrl('about.html#motto')}" class="text-slate-300 hover:text-brand-gold font-medium transition-colors">Motto</a></li>
                            <li><a href="${siteUrl('about.html#certificates')}" class="text-slate-300 hover:text-brand-gold font-medium transition-colors">Certificates</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 class="font-heading font-extrabold text-[13px] text-white uppercase tracking-wider mb-4">What We Do</h4>
                        <ul class="space-y-2.5 text-[12px]">
                            <li><a href="${siteUrl('whatwedo.html#electric-energy')}" class="text-slate-300 hover:text-brand-gold font-medium transition-colors">Electric &amp; Energy</a></li>
                            <li><a href="${siteUrl('whatwedo.html#machinery-automobile')}" class="text-slate-300 hover:text-brand-gold font-medium transition-colors">Machinery &amp; Automobile</a></li>
                            <li><a href="${siteUrl('whatwedo.html#aggc-industries')}" class="text-slate-300 hover:text-brand-gold font-medium transition-colors">AGGC Industries</a></li>
                            <li><a href="${siteUrl('whatwedo.html#epc-finance')}" class="text-slate-300 hover:text-brand-gold font-medium transition-colors">EPC + Finance</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 class="font-heading font-extrabold text-[13px] text-white uppercase tracking-wider mb-4">Media</h4>
                        <ul class="space-y-2.5 text-[12px]">
                            <li><a href="${siteUrl('activites.html')}" class="text-slate-300 hover:text-brand-gold font-medium transition-colors">Gallery</a></li>
                            <li><a href="${siteUrl('news.html')}" class="text-slate-300 hover:text-brand-gold font-medium transition-colors">Announcements</a></li>
                            <li><a href="${siteUrl('news.html')}" class="text-slate-300 hover:text-brand-gold font-medium transition-colors">Latest News</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 class="font-heading font-extrabold text-[13px] text-white uppercase tracking-wider mb-4">Careers</h4>
                        <ul class="space-y-2.5 text-[12px]">
                            <li><a href="${siteUrl('careers.html')}" class="text-slate-300 hover:text-brand-gold font-medium transition-colors">Open Roles</a></li>
                            <li><a href="${siteUrl('careers.html')}" class="text-slate-300 hover:text-brand-gold font-medium transition-colors">Join Us</a></li>
                        </ul>
                    </div>

                    <div class="flex flex-col items-center sm:items-start space-y-4">
                        <a href="https://maps.google.com/?q=Aung+Gyi+Group+of+Companies+Yangon" target="_blank" aria-label="Open AGGC location in Google Maps" class="w-[100px] h-[100px] bg-white/10 border border-white/15 rounded-xl p-2 flex items-center justify-center shadow-sm hover:border-brand-gold/70 transition-colors">
                            <img src="${siteUrl('img/location-qr.png')}" alt="AGGC location QR code" class="w-full h-full object-cover rounded-lg">
                        </a>
                        <span class="text-[11px] font-heading font-black text-white uppercase tracking-wider">Location</span>
                        <div class="flex items-center space-x-2.5">
                            <a href="https://facebook.com/AungGyiGroup" target="_blank" aria-label="AGGC on Facebook" class="w-7 h-7 rounded-full bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center text-[11px] transition-colors"><i class="fa-brands fa-facebook-f"></i></a>
                            <a href="viber://chat?number=%2B959777555666" aria-label="Chat with AGGC on Viber" class="w-7 h-7 rounded-full bg-gradient-to-br from-[#12356c] via-[#0d2858] to-[#071633] hover:bg-brand-gold hover:text-brand-navy text-white flex items-center justify-center text-[11px] transition-colors"><i class="fa-brands fa-viber"></i></a>
                            <a href="mailto:info@aungyigroup.com" aria-label="Email AGGC" class="w-7 h-7 rounded-full bg-[#e1ae31] hover:bg-[#c99620] text-[#071633] flex items-center justify-center text-[11px] transition-colors"><i class="fa-solid fa-envelope"></i></a>
                        </div>
                    </div>
                </div>

                <div class="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center text-[11px] text-slate-300 font-medium">
                    <p>&copy; 2026 Aung Gyi Group of Companies. All rights reserved.</p>
                </div>
            </div>
        `;

        if (currentFooter) {
            currentFooter.replaceWith(footer);
        } else {
            document.body.appendChild(footer);
        }

        if (window.location.hash === '#site-footer') {
            window.setTimeout(() => footer.scrollIntoView({ block: 'start' }), 150);
        }
    }

    function clamp(value, min, max) {
        return Math.min(Math.max(value, min), max);
    }

    function shouldAnimateImage(img) {
        const src = (img.getAttribute('src') || '').toLowerCase();
        const alt = (img.getAttribute('alt') || '').toLowerCase();

        if (img.closest('nav, footer, #mobileMenu, #imageModal, #lightbox, [id*="modal"], [class*="modal"]')) return false;
        if (img.closest('.brand-feature-media, .bento-card, .catalog-card-image, .catalog-hero-visual, .strategic-pillars-section .grid > a')) return false;
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

    function setupBrandShowcaseAnimations() {
        const section = document.querySelector('#brands.brand-showcase-section');
        if (!section) return;

        const rows = Array.from(section.querySelectorAll('.brand-feature-row'));
        const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
        if (!rows.length || motionPreference.matches || !('IntersectionObserver' in window)) return;

        const reveal = (row) => {
            row.classList.add('is-revealed');
            observer.unobserve(row);
        };

        // Observe stable row bounds, not the children moving in from either side.
        // A low threshold also reveals tall, stacked cards on short phone screens.
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) reveal(entry.target);
            });
        }, { threshold: 0.12, rootMargin: '0px 0px -5% 0px' });

        rows.forEach((row) => {
            row.classList.add('brand-reveal-ready');
            observer.observe(row);
        });

        // Keyboard navigation must never land on an invisible link.
        section.addEventListener('focusin', (event) => {
            const row = event.target.closest('.brand-feature-row');
            if (row) {
                row.classList.remove('brand-reveal-ready');
                reveal(row);
            }
        });

        // Respect a preference change while the page is already open.
        motionPreference.addEventListener('change', (event) => {
            if (!event.matches) return;
            observer.disconnect();
            rows.forEach((row) => {
                row.classList.remove('brand-reveal-ready');
                row.classList.add('is-revealed');
            });
        });
    }

    function setupScrollReveal() {
        const selector = '.scroll-reveal, .scroll-reveal-left, .scroll-reveal-right';
        const revealItems = () => Array.from(document.querySelectorAll(selector)).filter((item) => !item.closest('.whatwedo-flow'));

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

    function setupCardReveals() {
        const selector = [
            '.whatwedo-flow .strategic-pillars-section .text-center',
            '.whatwedo-flow .strategic-pillars-section .grid > a',
            '.whatwedo-flow .bento-card',
            '.whatwedo-flow .sector-header',
            '.whatwedo-flow .modern-data-card',
            '.whatwedo-flow > section:last-child .scroll-reveal',
            '[data-card-reveal]'
        ].join(', ');
        const cards = Array.from(document.querySelectorAll(selector));
        const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
        if (!cards.length || preference.matches || !('IntersectionObserver' in window)) return;

        const show = (card) => {
            card.classList.add('card-reveal-visible');
            observer.unobserve(card);
        };
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) show(entry.target);
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -24px 0px' });

        cards.forEach((card, index) => {
            const side = card.closest('.scroll-reveal-right') ? 1 : card.closest('.scroll-reveal-left') ? -1 : index % 2 ? 1 : -1;
            card.style.setProperty('--card-enter-side', side);
            card.style.setProperty('--card-enter-delay', `${(index % 3) * 65}ms`);
            card.classList.add('card-reveal-ready');
            observer.observe(card);
        });

        document.addEventListener('focusin', (event) => {
            const card = event.target.closest('.card-reveal-ready');
            if (!card) return;
            card.classList.remove('card-reveal-ready');
            show(card);
        });

        preference.addEventListener('change', (event) => {
            if (!event.matches) return;
            observer.disconnect();
            cards.forEach((card) => {
                card.classList.remove('card-reveal-ready');
                card.classList.add('card-reveal-visible');
            });
        });
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
        setupUnifiedFooter();
        hardenExternalLinks();
        setupHomeHeader();
        setupScrollZoomImages();
        setupBrandShowcaseAnimations();
        setupScrollReveal();
        setupCardReveals();
    });
})();
