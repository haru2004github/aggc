// Dynamic Product Catalog UI Renderer for AGGC Company Portfolio
// Handles rendering products, models modals, and enquiry forms with transitions.

document.addEventListener("DOMContentLoaded", () => {
    // 1. Validate Brand Context
    if (typeof CURRENT_BRAND === 'undefined' || !PRODUCTS_DATABASE[CURRENT_BRAND]) {
        console.error("Brand configuration missing or invalid. Please set CURRENT_BRAND.");
        return;
    }

    const brandData = PRODUCTS_DATABASE[CURRENT_BRAND];
    const catalogContainer = document.getElementById("product-catalog-container");
    if (!catalogContainer) {
        console.error("Target container #product-catalog-container not found in HTML.");
        return;
    }

    function escapeHTML(value) {
        return String(value ?? "")
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#39;");
    }

    function safeAssetUrl(value) {
        const raw = String(value ?? "").trim();
        if (!raw) return "";

        try {
            const url = new URL(raw, window.location.href);
            const isSafeProtocol = url.protocol === "http:" || url.protocol === "https:" || (window.location.protocol === "file:" && url.protocol === "file:") || url.protocol === "data:";
            const isSafeImageData = url.protocol !== "data:" || /^data:image\/(?:png|jpe?g|gif|webp|svg\+xml);/i.test(raw);
            return isSafeProtocol && isSafeImageData ? raw : "";
        } catch {
            return "";
        }
    }

    // 2. Render Main Layout (Header and Products Grid)
    renderCatalog(brandData, catalogContainer);

    // 3. Setup Modal Overlay (Dynamically added to body to ensure top-layer display)
    const modalOverlay = document.createElement("div");
    modalOverlay.id = "catalog-modal-overlay";
    modalOverlay.className = "fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[9999] flex items-center justify-center p-4 opacity-0 pointer-events-none transition-all duration-500 ease-out";
    modalOverlay.innerHTML = `
        <div id="catalog-modal-content" class="bg-white rounded-[2rem] shadow-2xl border border-slate-100 max-w-lg w-full max-h-[85vh] flex flex-col p-6 sm:p-8 transform scale-95 opacity-0 transition-all duration-500 ease-out relative overflow-y-auto">
            <!-- Dynamic Content Injected Here -->
        </div>
    `;
    document.body.appendChild(modalOverlay);

    const modalContent = document.getElementById("catalog-modal-content");
    modalContent.setAttribute('role', 'dialog');
    modalContent.setAttribute('aria-modal', 'true');
    modalContent.setAttribute('aria-label', 'Product enquiry');
    modalOverlay.inert = true;
    let modalTrigger = null;
    let previousOverflow = '';
    modalOverlay.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') { event.preventDefault(); closeModal(); return; }
        if (event.key !== 'Tab') return;
        const controls = Array.from(modalContent.querySelectorAll('button:not([disabled]), input:not([disabled]), textarea, select, a[href]'));
        const first = controls[0], last = controls[controls.length - 1];
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
    });

    // Close Modal when clicking background
    modalOverlay.addEventListener("click", (e) => {
        if (e.target === modalOverlay) {
            closeModal();
        }
    });

    // --- RENDER FUNCTIONS ---

    function renderCatalog(brand, container) {
        // Clear previous content
        container.innerHTML = "";

        container.closest("main")?.classList.add("product-detail-surface");

        const totalModels = brand.products.reduce((sum, product) => sum + product.models.length, 0);
        const featureImage = safeAssetUrl(brand.products[0]?.image);
        const brandTitle = escapeHTML(brand.brandTitle);
        const brandLogo = safeAssetUrl(brand.brandLogo);

        // Editorial brand hero
        const header = document.createElement("div");
        header.className = "catalog-hero";

        header.innerHTML = `
            <div class="catalog-hero-copy">
                <span class="catalog-kicker"><span>AGGC Authorized Portfolio</span></span>
                <h2><span>${brandTitle}</span><em>Machinery &amp; Equipment</em></h2>
                <p>Purpose-built equipment for demanding jobs. Explore the complete ${brandTitle} range represented by AGGC in Myanmar.</p>
                <div class="catalog-stats">
                    <span><strong>${String(brand.products.length).padStart(2, '0')}</strong> Product lines</span>
                    <span><strong>${String(totalModels).padStart(2, '0')}</strong> Model options</span>
                </div>
                <div class="catalog-actions">
                    <button type="button" class="aggc-button aggc-button-primary" id="brand-quote-button">Request a Quote <i class="fa-solid fa-arrow-right" aria-hidden="true"></i></button>
                    <a class="aggc-button aggc-button-secondary" href="#catalog-products">Browse equipment</a>
                </div>
                <p class="catalog-enquiry-note">Choose a model and tell us what your project needs.</p>
            </div>
            <div class="catalog-hero-visual">
                <span class="catalog-visual-label">Engineered performance</span>
                <div class="catalog-logo-plate">
                    ${brandLogo ? `<img src="${escapeHTML(brandLogo)}" alt="${brandTitle} Logo" onerror="this.style.display='none';">` : `<span>${brandTitle}</span>`}
                </div>
                ${featureImage ? `<img src="${escapeHTML(featureImage)}" alt="${brandTitle} Product" class="catalog-hero-product" decoding="async" fetchpriority="high" onerror="this.style.display='none';">` : ""}
                <span class="catalog-visual-index">01 / ${String(brand.products.length).padStart(2, '0')}</span>
            </div>
        `;
        container.appendChild(header);
        header.querySelector('#brand-quote-button').addEventListener('click', openQuotePicker);

        const sectionHead = document.createElement("div");
        sectionHead.id = "catalog-products";
        sectionHead.className = "catalog-section-head";

        sectionHead.innerHTML = `
            <div>
                <span class="catalog-kicker"><span>Equipment range</span></span>
                <h3>Choose your machine</h3>
            </div>
            <p>Select a product line to review available models and send a direct enquiry to our team.</p>
        `;
        container.appendChild(sectionHead);

        // Alternating editorial product rows
        const grid = document.createElement("div");
        grid.className = "catalog-grid";

        brand.products.forEach((product, index) => {
            const card = document.createElement("div");
            card.className = "catalog-card";

            const productTitle = escapeHTML(product.title);
            const productImage = safeAssetUrl(product.image);
            const modelPreview = product.models.slice(0, 4).map(escapeHTML).join(" / ");

            card.innerHTML = `
                <div class="catalog-card-image">
                    ${productImage ? `<img src="${escapeHTML(productImage)}" alt="${productTitle}" loading="lazy" decoding="async" onerror="this.onerror=null; this.src='img/placeholder.png';">` : ""}
                    <div class="catalog-card-count">
                        ${product.models.length.toString().padStart(2, '0')} <span>models</span>
                    </div>
                </div>
                <div class="catalog-card-body">
                    <div class="catalog-card-topline">
                        <span class="catalog-card-index">${String(index + 1).padStart(2, '0')}</span>
                        <span class="catalog-card-rule"></span>
                        <span>Product line</span>
                    </div>
                    <h3>${productTitle}</h3>
                    <p class="catalog-model-preview">${modelPreview}</p>
                    <div class="catalog-card-actions">
                        <button type="button" class="catalog-models-button" aria-label="View ${productTitle} models"><span>View models</span><i class="fa-solid fa-arrow-right" aria-hidden="true"></i></button>
                        <button type="button" class="catalog-quote-button" aria-label="Request a quote for ${productTitle}">Request a Quote</button>
                    </div>
                </div>
            `;

            card.querySelector('.catalog-models-button').addEventListener('click', () => openModelListModal(product));
            card.querySelector('.catalog-quote-button').addEventListener('click', () => {
                if (product.models.length === 1) openEnquiryFormModal(product, product.models[0]);
                else openModelListModal(product);
            });

            grid.appendChild(card);
        });

        container.appendChild(grid);
    }

    // --- MODAL VIEWS ---

    function openQuotePicker() {
        modalContent.innerHTML = `
            <h3 class="text-2xl font-bold text-brand-navy mb-3">Request a Quote</h3>
            <p class="text-sm text-slate-500 mb-6">Choose the equipment you are interested in.</p>
            <label for="quote-product" class="text-sm font-semibold text-brand-navy">Product line</label>
            <select id="quote-product" class="w-full border rounded-lg p-3 mt-2 mb-6">
                ${brandData.products.map((product, index) => `<option value="${index}">${escapeHTML(product.title)}</option>`).join('')}
            </select>
            <div class="flex flex-wrap gap-3">
                <button type="button" id="quote-continue" class="aggc-button aggc-button-primary">Choose model <i class="fa-solid fa-arrow-right" aria-hidden="true"></i></button>
                <button type="button" id="modal-close-btn" class="aggc-button">Cancel</button>
            </div>`;
        modalContent.querySelector('#quote-continue').addEventListener('click', () => {
            const product = brandData.products[Number(modalContent.querySelector('#quote-product').value)];
            if (product.models.length === 1) openEnquiryFormModal(product, product.models[0]);
            else openModelListModal(product);
        });
        modalContent.querySelector('#modal-close-btn').addEventListener('click', closeModal);
        showModalAnim();
    }

    // View 2: Model Listing Modal
    function openModelListModal(product) {
        modalContent.className = "bg-white rounded-[2rem] shadow-2xl border border-slate-100 max-w-lg w-full max-h-[85vh] flex flex-col p-6 sm:p-8 relative overflow-y-auto animate-modal-spring";
        const productTitle = escapeHTML(product.title);
        
        modalContent.innerHTML = `
            <!-- Modal Title -->
            <div class="flex items-center justify-center gap-3 mb-6">
                <div class="w-0 h-0 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent border-l-[9px] border-l-brand-gold"></div>
                <h3 class="font-heading text-xl sm:text-2xl font-bold text-brand-navy tracking-wider uppercase text-center">${productTitle}</h3>
                <div class="w-0 h-0 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent border-r-[9px] border-r-brand-gold"></div>
            </div>

            <!-- Models List -->
            <div class="space-y-3.5 mb-8 flex-1 overflow-y-auto max-h-[50vh] pr-1.5 scrollbar-thin">
                ${product.models.map((model, idx) => `
                    <div class="bg-[#fdf9ee] border border-slate-100 rounded-xl px-5 py-4 flex items-center justify-between shadow-sm hover:shadow-md hover:border-brand-gold/20 border transition-all duration-300 animate-fade-in-up" style="animation-delay: ${Math.min(idx, 4) * 60}ms">
                        <span class="font-heading font-bold text-brand-navy text-[15px] tracking-wide">${escapeHTML(model)}</span>
                        <button class="enquire-btn btn-shine bg-[#22292f] hover:bg-brand-gold text-[#e1ae31] hover:text-white px-5 py-2.5 rounded-lg font-heading font-extrabold text-[11px] tracking-wider uppercase shadow transition-all duration-300" data-model="${escapeHTML(model)}">
                            Request a Quote
                        </button>
                    </div>
                `).join('')}
            </div>

            <!-- Close Button -->
            <div class="flex justify-center mt-2">
                <button id="modal-close-btn" class="w-10 h-10 rounded-full bg-slate-100 hover:bg-slate-200 border border-slate-200 flex items-center justify-center text-slate-500 hover:text-slate-800 hover:rotate-90 transition-all duration-300 shadow-sm" title="Close">
                    <i class="fa-solid fa-xmark text-lg"></i>
                </button>
            </div>
        `;

        // Add Listeners to Enquire Buttons
        modalContent.querySelectorAll(".enquire-btn").forEach(btn => {
            btn.addEventListener("click", (e) => {
                const model = e.currentTarget.getAttribute("data-model");
                openEnquiryFormModal(product, model);
            });
        });

        // Close button listener
        modalContent.querySelector("#modal-close-btn").addEventListener("click", closeModal);

        // Show Modal
        showModalAnim();
    }

    // View 3: Enquiry Form Modal
    function openEnquiryFormModal(product, modelName) {
        const productFullName = `${modelName} - ${capitalizeTitle(product.title)}`;
        const productFullNameSafe = escapeHTML(productFullName);
        modalContent.className = "bg-white rounded-[2rem] shadow-2xl border border-slate-100 max-w-lg w-full max-h-[85vh] flex flex-col p-6 sm:p-8 relative overflow-y-auto animate-modal-spring";

        modalContent.innerHTML = `
            <!-- Modal Title -->
            <div class="flex items-center justify-center gap-3 mb-8">
                <div class="w-0 h-0 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent border-l-[9px] border-l-brand-gold"></div>
                <h3 class="font-heading text-xl sm:text-2xl font-bold text-brand-navy tracking-wider uppercase text-center">ENQUIRE FORM</h3>
                <div class="w-0 h-0 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent border-r-[9px] border-r-brand-gold"></div>
            </div>

            <!-- Form -->
            <form id="enquiry-form" class="space-y-5 text-left flex-1">
                <!-- Product Name (Prefilled / Readonly Styled) -->
                <div class="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:items-center">
                    <label class="text-slate-600 font-heading text-xs sm:text-[13px] font-semibold">Product Name</label>
                    <div class="sm:col-span-2">
                        <input type="text" name="product_name" aria-label="Product Name" value="${productFullNameSafe}" readonly
                            class="w-full bg-[#fdf9ee]/40 border border-[#e2d8bd] text-brand-navy rounded-lg px-4 py-2.5 text-sm font-semibold focus:outline-none cursor-not-allowed">
                    </div>
                </div>

                <!-- Name Input -->
                <div class="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:items-center">
                    <label class="text-slate-600 font-heading text-xs sm:text-[13px] font-semibold">Name (*)</label>
                    <div class="sm:col-span-2">
                        <input type="text" name="user_name" aria-label="Name" autocomplete="name" required
                            class="w-full bg-white border border-slate-300 hover:border-slate-400 focus-gold-ring rounded-lg px-4 py-2.5 text-sm font-medium focus:outline-none transition-all duration-300">
                    </div>
                </div>

                <!-- Email Input -->
                <div class="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:items-center">
                    <label class="text-slate-600 font-heading text-xs sm:text-[13px] font-semibold">Email (*)</label>
                    <div class="sm:col-span-2">
                        <input type="email" name="user_email" aria-label="Email" autocomplete="email" required
                            class="w-full bg-white border border-slate-300 hover:border-slate-400 focus-gold-ring rounded-lg px-4 py-2.5 text-sm font-medium focus:outline-none transition-all duration-300">
                    </div>
                </div>

                <!-- Phone Input -->
                <div class="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:items-center">
                    <label class="text-slate-600 font-heading text-xs sm:text-[13px] font-semibold">Phone No</label>
                    <div class="sm:col-span-2">
                        <input type="tel" name="user_phone" aria-label="Phone" autocomplete="tel"
                            class="w-full bg-white border border-slate-300 hover:border-slate-400 focus-gold-ring rounded-lg px-4 py-2.5 text-sm font-medium focus:outline-none transition-all duration-300">
                    </div>
                </div>

                <!-- Message Input -->
                <div class="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    <label class="text-slate-600 font-heading text-xs sm:text-[13px] font-semibold pt-2">Message (*)</label>
                    <div class="sm:col-span-2">
                        <textarea name="user_message" aria-label="Message" required rows="3"
                            class="w-full bg-white border border-slate-300 hover:border-slate-400 focus-gold-ring rounded-lg px-4 py-2.5 text-sm font-medium focus:outline-none transition-all duration-300 resize-none"></textarea>
                    </div>
                </div>

                <!-- Action Buttons -->
                <div class="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
                    <button type="button" id="form-back-btn" class="w-full sm:w-auto bg-slate-100 hover:bg-slate-200 text-slate-700 font-heading font-bold uppercase text-[11px] tracking-wider py-3.5 px-6 rounded-lg transition-colors border border-slate-200">
                        BACK
                    </button>
                    <button type="submit" class="btn-shine w-full sm:w-auto bg-brand-gold hover:bg-brand-navy text-white font-heading font-extrabold uppercase text-[11px] tracking-widest py-3.5 px-8 rounded-lg transition-all duration-300 shadow-md">
                        Request a Quote
                    </button>
                </div>
            </form>
        `;

        // Back button listener
        modalContent.querySelector("#form-back-btn").addEventListener("click", () => {
            openModelListModal(product);
        });

        // Form Submit Handler
        const form = modalContent.querySelector("#enquiry-form");
        form.addEventListener("submit", (e) => {
            e.preventDefault();
            handleFormSubmit(form, productFullName);
        });
        showModalAnim();
    }

    // Google Apps Script Web App URL to save enquiry details to Google Sheet.
    // Replace this string with your deployed Web App URL after following the setup instructions.
    const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwmrZeYPYpyUXqlv-cByo9xSaoqviBO6cAIxQsKKawA5LmdbYhadLZAYKH08Bl4P7GlUA/exec";

    function handleFormSubmit(form, productName) {
        // Collect form data
        const formData = {
            product: productName,
            name: form.user_name.value.trim(),
            email: form.user_email.value.trim(),
            phone: form.user_phone.value.trim(),
            message: form.user_message.value.trim()
        };

        // Submit Button Loading state
        const submitBtn = form.querySelector("button[type='submit']");
        const backBtn = form.querySelector("#form-back-btn");
        
        submitBtn.disabled = true;
        if (backBtn) backBtn.disabled = true;
        submitBtn.innerHTML = `<i class="fa-solid fa-circle-notch fa-spin mr-2"></i> SUBMITTING...`;

        if (GOOGLE_SCRIPT_URL) {
            // POST request with URLSearchParameters (mode: 'no-cors' is optimal for Google Script redirect bypass)
            fetch(GOOGLE_SCRIPT_URL, {
                method: "POST",
                mode: "no-cors", 
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                body: new URLSearchParams(formData).toString()
            })
            .then(() => {
                showSuccessMessage(formData);
            })
            .catch(err => {
                console.error("Submission error:", err);
                showSubmissionError(form);
            });
        } else {
            showSubmissionError(form);
        }
    }

    function showSubmissionError(form) {
        form.querySelector('.catalog-form-error')?.remove();
        const notice = document.createElement('p');
        notice.className = 'catalog-form-error';
        notice.setAttribute('role', 'alert');
        notice.textContent = 'Your request could not be sent. Please try again, or contact info@aungyigroup.com.';
        form.prepend(notice);
        const submit = form.querySelector('button[type="submit"]');
        submit.disabled = false;
        submit.textContent = 'Try again';
        form.querySelector('#form-back-btn').disabled = false;
    }

    function showSuccessMessage(formData) {
        const userName = escapeHTML(formData.name);
        const productName = escapeHTML(formData.product);
        // UI Feedback - Show success transition
        modalContent.innerHTML = `
            <div class="flex flex-col items-center justify-center py-8 text-center animate-modal-spring">
                <div class="w-16 h-16 rounded-full bg-emerald-100 border border-emerald-200 flex items-center justify-center mb-5 animate-bounce">
                    <i class="fa-solid fa-check text-2xl text-emerald-600"></i>
                </div>
                <h3 class="font-heading text-xl sm:text-2xl font-bold text-brand-navy mb-3">Request sent for processing</h3>
                <p class="text-slate-500 text-sm font-light leading-relaxed max-w-sm mb-6">
                    Thank you, <strong class="text-slate-800">${userName}</strong>. Your enquiry for <strong class="text-brand-navy">${productName}</strong> has been sent for processing. Delivery is not yet confirmed. For urgent assistance, please contact info@aungyigroup.com.
                </p>
                <button id="success-close-btn" class="bg-brand-navy hover:bg-brand-gold text-white font-heading font-bold uppercase text-[11px] tracking-wider py-3 px-8 rounded-lg transition-colors shadow">
                    CLOSE
                </button>
            </div>
        `;

        modalContent.querySelector("#success-close-btn").addEventListener("click", closeModal);
    }

    // --- ANIMATION HELPER FUNCTIONS ---

    function showModalAnim() {
        if (!modalOverlay.classList.contains('modal-active')) {
            modalTrigger = document.activeElement;
            previousOverflow = document.body.style.overflow;
        }
        modalOverlay.inert = false;
        modalOverlay.classList.add("modal-active");
        // Reusing the dialog node must still replay its entrance for each view.
        if (!window.aggcMotion.matches) {
            modalContent.getAnimations().forEach((animation) => {
                if (animation instanceof CSSAnimation) { animation.currentTime = 0; animation.play(); }
            });
        }
        document.body.style.overflow = "hidden";
        modalContent.querySelector('input:not([readonly]), select, button')?.focus();
    }

    function closeModal() {
        modalOverlay.classList.remove("modal-active");
        document.body.style.overflow = previousOverflow;
        modalOverlay.inert = true;
        modalTrigger?.focus();
    }

    function capitalizeTitle(str) {
        return str
            .toLowerCase()
            .split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    }

});
