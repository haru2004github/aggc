(function () {
    const motionPreference = window.aggcMotion;
    const motionControllers = new Set();
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
                            AGGC. A leading diversified business group operating across global industrial sectors. Let's Build Together!
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

                <div class="pt-8 border-t border-white/10 flex flex-col justify-center text-center items-center text-[11px] text-slate-300 font-medium">
                    <p>&copy; 2026 AGGC. All rights reserved.</p>
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

    function hasElementChanges(records) {
        return records.some((record) => [...record.addedNodes, ...record.removedNodes]
            .some((node) => node.nodeType === Node.ELEMENT_NODE));
    }

    function clamp(value, min, max) {
        return Math.min(Math.max(value, min), max);
    }

    function shouldAnimateImage(img) {
        const src = (img.getAttribute('src') || '').toLowerCase();
        const alt = (img.getAttribute('alt') || '').toLowerCase();

        if (img.classList.contains('carousel-img') || img.id === 'detail-hero-img') return false;
        if (img.closest('nav, footer, #mobileMenu, #imageModal, #lightbox, [id*="modal"], [class*="modal"]')) return false;
        if (img.closest('.career-opening, .unified-synergy-banner, .activity-photo-grid, .brand-feature-media, .bento-card, .catalog-card-image, .catalog-hero-visual, .strategic-pillars-section .grid > a')) return false;
        if (src.includes('logo') || src.includes('location-qr') || alt.includes('logo') || alt.includes('qr')) return false;
        if (img.width < 96 && img.height < 96) return false;

        return true;
    }

    function collectImages() {
        if (motionPreference.matches) return [];

        return Array.from(document.images).filter((img) => {
            if (!shouldAnimateImage(img)) return false;
            img.classList.add('scroll-zoom-image');
            return true;
        });
    }

    let zoomImages = [];
    let ticking = false;
    let zoomFrame = null;

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
        if (ticking || motionPreference.matches) return;
        ticking = true;
        zoomFrame = window.requestAnimationFrame(updateImageZoom);
    }

    function setupScrollZoomImages() {
        zoomImages = collectImages();
        updateImageZoom();

        window.addEventListener('scroll', requestZoomUpdate, { passive: true });
        window.addEventListener('resize', requestZoomUpdate);
        document.addEventListener('load', (event) => {
            if (event.target instanceof HTMLImageElement) {
                zoomImages = collectImages();
                requestZoomUpdate();
            }
        }, true);
        motionPreference.addEventListener('change', () => {
            cancelAnimationFrame(zoomFrame);
            ticking = false;
            document.querySelectorAll('.scroll-zoom-image').forEach((img) => {
                img.classList.remove('scroll-zoom-image');
                img.style.removeProperty('--scroll-zoom');
            });
            zoomImages = collectImages();
            requestZoomUpdate();
        });

        const observer = new MutationObserver((records) => {
            if (!hasElementChanges(records)) return;
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

    // Replay text, brand and card entrances on every scroll re-entry and page visit.
    function createVisitReveal(selector, classes, options, prepare, onReveal) {
        const targets = new Set();
        const show = (target) => {
            target.classList.add(...classes);
            if (onReveal) onReveal(target);
        };
        const hide = (target) => {
            target.classList.remove(...classes);
            target.querySelectorAll('.counter').forEach((counter) => {
                cancelAnimationFrame(counter.counterFrame);
                counter.classList.remove('animated-done');
                counter.textContent = '0';
            });
        };
        const observer = 'IntersectionObserver' in window ? new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting || motionPreference.matches) show(entry.target);
                else if (!entry.target.contains(document.activeElement)) hide(entry.target);
            });
        }, options) : null;
        const discover = () => {
            targets.forEach((target) => {
                if (!target.isConnected) { observer?.unobserve(target); targets.delete(target); }
            });
            document.querySelectorAll(selector).forEach((target) => {
                if (targets.has(target)) return;
                targets.add(target);
                if (prepare) prepare(target, targets.size - 1);
                if (motionPreference.matches || !observer) show(target);
                else {
                    void target.offsetWidth;
                    observer.observe(target);
                }
            });
        };
        const controller = {
            reset() {
                discover();
                targets.forEach((target) => {
                    observer?.unobserve(target);
                    hide(target);
                });
            },
            resume() {
                targets.forEach((target) => {
                    if (motionPreference.matches || !observer || target.contains(document.activeElement)) show(target);
                    else observer.observe(target);
                });
            },
            finish() { targets.forEach(show); }
        };
        motionControllers.add(controller);
        discover();
        const mutations = new MutationObserver((records) => { if (hasElementChanges(records)) discover(); });
        mutations.observe(document.body, { childList: true, subtree: true });
        document.addEventListener('focusin', (event) => {
            // Reveal all enclosing layers before a keyboard-focused control is used.
            targets.forEach((target) => { if (target.contains(event.target)) show(target); });
        });
    }

    function setupAboutIntroHover() {
        const intro = document.getElementById('about-intro');
        if (!intro) return;
        let frame = null;
        intro.addEventListener('pointermove', (event) => {
            if (motionPreference.matches || event.pointerType === 'touch') return;
            cancelAnimationFrame(frame);
            const rect = intro.getBoundingClientRect();
            const x = ((event.clientX - rect.left) / rect.width) * 100;
            const y = ((event.clientY - rect.top) / rect.height) * 100;
            frame = requestAnimationFrame(() => {
                intro.style.setProperty('--intro-pointer-x', `${x}%`);
                intro.style.setProperty('--intro-pointer-y', `${y}%`);
            });
        });
        const reset = () => {
            cancelAnimationFrame(frame);
            intro.style.removeProperty('--intro-pointer-x');
            intro.style.removeProperty('--intro-pointer-y');
        };
        intro.addEventListener('pointerleave', reset);
        motionPreference.addEventListener('change', reset);
        window.addEventListener('pagehide', reset);
    }

    function setupPageMotion() {
        const entrances = 'section h1, main h1, main h2, main h3, section h2, section h3, main article, .catalog-card, .news-editorial-card, .career-opening, .home-sector-card, .core-value-card, .activity-album, main .grid > .group';
        const existing = '.scroll-reveal, .scroll-reveal-left, .scroll-reveal-right, .reveal-scale-up, .brand-feature-row, .card-reveal-ready, [data-scroll-motion]';
        const decorate = () => {
            document.querySelectorAll(entrances).forEach((item) => {
                if (item.closest('nav, footer, #home, [role="dialog"], #imageModal, .whatwedo-flow')) return;
                if (item.closest(existing)) return;
                item.setAttribute('data-scroll-motion', '');
            });
            document.querySelectorAll('a[href], button, [role="button"], .catalog-card, .news-editorial-card, .career-opening, .core-value-card').forEach((item) => {
                if (item.closest('#heroCarouselIndicators') || item.matches('[disabled]')) return;
                item.setAttribute('data-motion-hover', '');
            });
        };
        decorate();
        new MutationObserver((records) => { if (hasElementChanges(records)) decorate(); })
            .observe(document.body, { childList: true, subtree: true });
        createVisitReveal('[data-scroll-motion]', ['motion-visible'],
            { threshold: 0, rootMargin: '0px 0px -32px 0px' },
            (item) => item.classList.add('motion-ready'));
    }

    function setupBrandShowcaseAnimations() {
        createVisitReveal('#brands.brand-showcase-section .brand-feature-row', ['is-revealed'],
            { threshold: 0, rootMargin: '0px 0px -5% 0px' },
            (row) => row.classList.add('brand-reveal-ready'));
    }

    function setupScrollReveal() {
        createVisitReveal(':is(.scroll-reveal, .scroll-reveal-left, .scroll-reveal-right, .reveal-scale-up):not(.whatwedo-flow *)',
            ['scroll-reveal-visible', 'revealed'], { threshold: 0, rootMargin: '0px 0px -8% 0px' }, null,
            (item) => {
                if (typeof window.triggerCounter === 'function') {
                    item.querySelectorAll('.counter').forEach(window.triggerCounter);
                }
            });
    }

    function setupCardReveals() {
        const selector = [
            '.whatwedo-flow .strategic-pillars-section .text-center',
            '.whatwedo-flow .strategic-pillars-section .grid > a',
            '.whatwedo-flow .bento-card', '.whatwedo-flow .sector-header',
            '.whatwedo-flow .modern-data-card',
            '.whatwedo-flow > section:last-child .scroll-reveal', '[data-card-reveal]'
        ].join(', ');
        createVisitReveal(selector, ['card-reveal-visible'], { threshold: 0, rootMargin: '0px 0px -24px 0px' },
            (card, index) => {
                const side = card.closest('.scroll-reveal-right') ? 1 : card.closest('.scroll-reveal-left') ? -1 : index % 2 ? 1 : -1;
                card.style.setProperty('--card-enter-side', side);
                card.style.setProperty('--card-enter-delay', `${(index % 3) * 65}ms`);
                card.classList.add('card-reveal-ready');
            });
    }

    motionPreference.addEventListener('change', () => {
        motionControllers.forEach((controller) => {
            if (motionPreference.matches) controller.finish();
            else controller.resume();
        });
    });

    function hardenExternalLinks() {
        document.querySelectorAll('a[target="_blank"]').forEach((link) => {
            const rel = new Set((link.getAttribute('rel') || '').split(/\s+/).filter(Boolean));
            rel.add('noopener');
            rel.add('noreferrer');
            link.setAttribute('rel', Array.from(rel).join(' '));
        });
    }

    window.addEventListener('pageshow', (event) => {
        ticking = false;
        requestZoomUpdate();
        if (!event.persisted) return;
        // Suppress parent AND child transitions while restoring initial styles.
        document.documentElement.classList.add('motion-resetting');
        motionControllers.forEach((controller) => controller.reset());
        if (!motionPreference.matches && typeof document.getAnimations === 'function') {
            document.getAnimations().forEach((animation) => {
                if (typeof CSSAnimation !== 'undefined' && animation instanceof CSSAnimation) {
                    const wasPaused = animation.playState === 'paused';
                    animation.currentTime = 0;
                    if (!wasPaused) animation.play();
                }
            });
        }
        void document.body.offsetHeight;
        document.documentElement.classList.remove('motion-resetting');
        motionControllers.forEach((controller) => controller.resume());
        window.dispatchEvent(new Event('scroll'));
    });
    window.addEventListener('pagehide', () => {
        cancelAnimationFrame(zoomFrame);
        ticking = false;
    });

    document.addEventListener('DOMContentLoaded', () => {
        setupUnifiedFooter();
        hardenExternalLinks();
        setupHomeHeader();
        setupScrollZoomImages();
        setupBrandShowcaseAnimations();
        setupScrollReveal();
        setupCardReveals();
        setupPageMotion();
        setupAboutIntroHover();
    });
})();
