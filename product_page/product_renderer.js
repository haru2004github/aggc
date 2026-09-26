// Dynamic Product Catalog UI Renderer for AGGC Company Portfolio
// Renders brand product cards and direct enquiry forms with transitions.

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

        const header = document.createElement("header");
        header.className = "catalog-brand-heading";
        header.innerHTML = `<h1>${escapeHTML(brand.brandTitle)}</h1>`;
        container.appendChild(header);

        // Original product rows, without model-count badges
        const grid = document.createElement("div");
        grid.className = "catalog-grid";

        brand.products.forEach((product, index) => {
            const card = document.createElement("div");
            card.className = "catalog-card";

            const productTitle = escapeHTML(product.title);
            const productImage = safeAssetUrl(product.image);
            const gallery = (product.images || []).map(safeAssetUrl).filter(Boolean);

            card.innerHTML = `
                <div class="catalog-card-image">
                    ${productImage ? `<img src="${escapeHTML(productImage)}" alt="${productTitle}" loading="lazy" decoding="async" onerror="this.onerror=null; this.src='img/placeholder.png';">` : ""}
                </div>
                <div class="catalog-card-body">
                    ${gallery.length > 1 ? `<div class="catalog-image-options" role="group" aria-label="${productTitle} photos">${gallery.map((src, i) => `<button type="button" aria-label="Show ${productTitle} photo ${i + 1}" aria-pressed="${i === 0}" data-gallery-src="${escapeHTML(src)}"><img src="${escapeHTML(src)}" alt="" loading="lazy"></button>`).join('')}</div>` : ''}
                    <div class="catalog-card-topline">
                        <span class="catalog-card-index">${String(index + 1).padStart(2, '0')}</span>
                        <span class="catalog-card-rule"></span>
                        <span>Product line</span>
                    </div>
                    <h3>${productTitle}</h3>
                    ${product.models.length ? `<p class="catalog-model-preview">${(brand.showAllModels ? product.models : product.models.slice(0, 4)).map(escapeHTML).join(' / ')}</p>` : ""}
                    <div class="catalog-card-actions">
                        <button type="button" class="catalog-quote-button" aria-label="Request a quote for ${productTitle}">Request a Quote <i class="fa-solid fa-arrow-right" aria-hidden="true"></i></button>
                    </div>
                </div>
            `;

            card.querySelectorAll('[data-gallery-src]').forEach(button => {
                button.addEventListener('click', () => {
                    card.querySelector('.catalog-card-image img').src = button.dataset.gallerySrc;
                    card.querySelectorAll('[data-gallery-src]').forEach(item => item.setAttribute('aria-pressed', String(item === button)));
                });
            });
            card.querySelector('.catalog-quote-button').addEventListener('click', () => {
                if (product.models.length <= 1) openEnquiryFormModal(product, product.models[0] || product.title);
                else openModelListModal(product);
            });

            grid.appendChild(card);
        });

        container.appendChild(grid);
    }

    // --- MODAL VIEWS ---

    function openModelListModal(product) {
        modalContent.innerHTML = `
            <h3 class="font-heading text-xl sm:text-2xl font-bold text-brand-navy mb-6">${escapeHTML(product.title)}</h3>
            <div class="space-y-3 mb-6">
                ${product.models.map(model => `
                    <div class="flex flex-wrap items-center justify-between gap-3 bg-[#fdf9ee] rounded-xl border border-slate-200 p-4">
                        <span class="font-heading font-bold text-brand-navy">${escapeHTML(model)}</span>
                        <button type="button" class="enquire-btn rounded-lg px-4 py-3 text-xs font-bold" data-model="${escapeHTML(model)}">Request a Quote <i class="fa-solid fa-arrow-right" aria-hidden="true"></i></button>
                    </div>`).join('')}
            </div>
            <button type="button" id="modal-close-btn" class="rounded-lg bg-slate-100 p-3 font-bold text-brand-navy">Close</button>`;
        modalContent.querySelectorAll('.enquire-btn').forEach(button => {
            button.addEventListener('click', () => openEnquiryFormModal(product, button.dataset.model));
        });
        modalContent.querySelector('#modal-close-btn').addEventListener('click', closeModal);
        showModalAnim();
    }

    function openEnquiryFormModal(product, modelName) {
        const productFullName = modelName === product.title ? capitalizeTitle(product.title) : `${modelName} - ${capitalizeTitle(product.title)}`;
        const productFullNameSafe = escapeHTML(productFullName);
        modalContent.className = "bg-white rounded-[2rem] shadow-2xl border border-slate-100 max-w-lg w-full max-h-[85vh] flex flex-col p-6 sm:p-8 relative overflow-y-auto animate-modal-spring";

        modalContent.innerHTML = `
            <!-- Modal Title -->
            <div class="flex items-center justify-center gap-3 mb-8">
                <div class="w-0 h-0 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent border-l-[9px] border-l-brand-gold"></div>
                <h3 class="font-heading text-xl sm:text-2xl font-bold text-brand-navy tracking-wider uppercase text-center">ENQUIRY FORM</h3>
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
                        Send Enquiry
                    </button>
                </div>
            </form>
        `;

        // Back button listener
        modalContent.querySelector("#form-back-btn").addEventListener("click", () => product.models.length ? openModelListModal(product) : closeModal());

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
