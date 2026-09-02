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
        const featureImage = brand.products[0]?.image || "";

        // Brand Title Header
        const header = document.createElement("div");
        header.className = "catalog-hero catalog-reveal";
        header.innerHTML = `
            <div class="catalog-hero-copy">
                <span class="catalog-kicker">Product Catalog</span>
                <h2>${brand.brandTitle}</h2>
                <p>Explore AGGC's selected product lines, model options, and dependable industrial solutions for Myanmar's infrastructure needs.</p>
                <div class="catalog-stats">
                    <span>${brand.products.length} product lines</span>
                    <span>${totalModels} model options</span>
                </div>
            </div>
            <div class="catalog-hero-visual">
                <div class="catalog-logo-plate">
                    <img src="${brand.brandLogo}" alt="${brand.brandTitle} Logo" onerror="this.style.display='none'; this.parentElement.textContent='${brand.brandTitle}';">
                </div>
                <img src="${featureImage}" alt="${brand.brandTitle} Product" class="catalog-hero-product" onerror="this.style.display='none';">
            </div>
        `;
        container.appendChild(header);

        // Products Grid
        const grid = document.createElement("div");
        grid.className = "catalog-grid";

        brand.products.forEach((product, index) => {
            const card = document.createElement("div");
            card.className = "catalog-card catalog-reveal";
            card.style.animationDelay = `${index * 80}ms`;

            card.innerHTML = `
                <div class="catalog-card-image">
                    <img src="${product.image}" alt="${product.title}" onerror="this.onerror=null; this.src='img/placeholder.png';">
                    <div class="catalog-card-count">
                        ${product.models.length.toString().padStart(2, '0')} models
                    </div>
                </div>
                <div class="catalog-card-body">
                    <span class="catalog-card-index">${String(index + 1).padStart(2, '0')}</span>
                    <h3>${product.title}</h3>
                    <p>${product.models.slice(0, 4).join(' / ')}</p>
                    <button type="button">View Models <i class="fa-solid fa-arrow-right"></i></button>
                </div>
            `;

            // Click Event
            card.addEventListener("click", () => {
                openModelListModal(product);
            });

            grid.appendChild(card);
        });

        container.appendChild(grid);
        setupCatalogReveal(container);
    }

    // --- MODAL VIEWS ---

    // View 2: Model Listing Modal
    function openModelListModal(product) {
        modalContent.className = "bg-white rounded-[2rem] shadow-2xl border border-slate-100 max-w-lg w-full max-h-[85vh] flex flex-col p-6 sm:p-8 relative overflow-y-auto animate-modal-spring";
        
        modalContent.innerHTML = `
            <!-- Modal Title -->
            <div class="flex items-center justify-center gap-3 mb-6">
                <div class="w-0 h-0 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent border-l-[9px] border-l-brand-gold"></div>
                <h3 class="font-heading text-xl sm:text-2xl font-bold text-brand-navy tracking-wider uppercase text-center">${product.title}</h3>
                <div class="w-0 h-0 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent border-r-[9px] border-r-brand-gold"></div>
            </div>

            <!-- Models List -->
            <div class="space-y-3.5 mb-8 flex-1 overflow-y-auto max-h-[50vh] pr-1.5 scrollbar-thin">
                ${product.models.map((model, idx) => `
                    <div class="bg-[#fdf9ee] border border-slate-100 rounded-xl px-5 py-4 flex items-center justify-between shadow-sm hover:shadow-md hover:border-brand-gold/20 border transition-all duration-300 animate-fade-in-up" style="animation-delay: ${idx * 60}ms">
                        <span class="font-heading font-bold text-brand-navy text-[15px] tracking-wide">${model}</span>
                        <button class="enquire-btn btn-shine bg-[#22292f] hover:bg-brand-gold text-[#e1ae31] hover:text-white px-5 py-2.5 rounded-lg font-heading font-extrabold text-[11px] tracking-wider uppercase shadow transition-all duration-300" data-model="${model}">
                            ENQUIRE NOW
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
                        <input type="text" name="product_name" value="${productFullName}" readonly
                            class="w-full bg-[#fdf9ee]/40 border border-[#e2d8bd] text-brand-navy rounded-lg px-4 py-2.5 text-sm font-semibold focus:outline-none cursor-not-allowed">
                    </div>
                </div>

                <!-- Name Input -->
                <div class="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:items-center">
                    <label class="text-slate-600 font-heading text-xs sm:text-[13px] font-semibold">Name (*)</label>
                    <div class="sm:col-span-2">
                        <input type="text" name="user_name" required
                            class="w-full bg-white border border-slate-300 hover:border-slate-400 focus-gold-ring rounded-lg px-4 py-2.5 text-sm font-medium focus:outline-none transition-all duration-300">
                    </div>
                </div>

                <!-- Email Input -->
                <div class="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:items-center">
                    <label class="text-slate-600 font-heading text-xs sm:text-[13px] font-semibold">Email (*)</label>
                    <div class="sm:col-span-2">
                        <input type="email" name="user_email" required
                            class="w-full bg-white border border-slate-300 hover:border-slate-400 focus-gold-ring rounded-lg px-4 py-2.5 text-sm font-medium focus:outline-none transition-all duration-300">
                    </div>
                </div>

                <!-- Phone Input -->
                <div class="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:items-center">
                    <label class="text-slate-600 font-heading text-xs sm:text-[13px] font-semibold">Phone No</label>
                    <div class="sm:col-span-2">
                        <input type="tel" name="user_phone"
                            class="w-full bg-white border border-slate-300 hover:border-slate-400 focus-gold-ring rounded-lg px-4 py-2.5 text-sm font-medium focus:outline-none transition-all duration-300">
                    </div>
                </div>

                <!-- Message Input -->
                <div class="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    <label class="text-slate-600 font-heading text-xs sm:text-[13px] font-semibold pt-2">Message (*)</label>
                    <div class="sm:col-span-2">
                        <textarea name="user_message" required rows="3"
                            class="w-full bg-white border border-slate-300 hover:border-slate-400 focus-gold-ring rounded-lg px-4 py-2.5 text-sm font-medium focus:outline-none transition-all duration-300 resize-none"></textarea>
                    </div>
                </div>

                <!-- Action Buttons -->
                <div class="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
                    <button type="button" id="form-back-btn" class="w-full sm:w-auto bg-slate-100 hover:bg-slate-200 text-slate-700 font-heading font-bold uppercase text-[11px] tracking-wider py-3.5 px-6 rounded-lg transition-colors border border-slate-200">
                        BACK
                    </button>
                    <button type="submit" class="btn-shine w-full sm:w-auto bg-brand-gold hover:bg-brand-navy text-white font-heading font-extrabold uppercase text-[11px] tracking-widest py-3.5 px-8 rounded-lg transition-all duration-300 shadow-md">
                        ENQUIRE NOW
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
                // Fallback to local success feedback so client experience is smooth
                showSuccessMessage(formData);
            });
        } else {
            // Local fallback simulation if script URL is not set yet
            setTimeout(() => {
                showSuccessMessage(formData);
            }, 800);
        }
    }

    function showSuccessMessage(formData) {
        // UI Feedback - Show success transition
        modalContent.innerHTML = `
            <div class="flex flex-col items-center justify-center py-8 text-center animate-modal-spring">
                <div class="w-16 h-16 rounded-full bg-emerald-100 border border-emerald-200 flex items-center justify-center mb-5 animate-bounce">
                    <i class="fa-solid fa-check text-2xl text-emerald-600"></i>
                </div>
                <h3 class="font-heading text-xl sm:text-2xl font-bold text-brand-navy mb-3">Enquiry Submitted!</h3>
                <p class="text-slate-500 text-sm font-light leading-relaxed max-w-sm mb-6">
                    Thank you, <strong class="text-slate-800">${formData.name}</strong>. We have received your request for <strong class="text-brand-navy">${formData.product}</strong>. Our team will get back to you shortly.
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
        modalOverlay.classList.add("modal-active");
        document.body.style.overflow = "hidden"; // Prevent background scroll
    }

    function closeModal() {
        modalOverlay.classList.remove("modal-active");
        document.body.style.overflow = ""; // Restore scroll
    }

    function capitalizeTitle(str) {
        return str
            .toLowerCase()
            .split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    }

    function setupCatalogReveal(container) {
        const revealItems = Array.from(container.querySelectorAll(".catalog-reveal"));
        if (!revealItems.length) return;

        if (!("IntersectionObserver" in window) || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
            revealItems.forEach((item) => item.classList.add("catalog-visible"));
            return;
        }

        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;
                entry.target.classList.add("catalog-visible");
                observer.unobserve(entry.target);
            });
        }, {
            threshold: 0.18,
            rootMargin: "0px 0px -6% 0px"
        });

        revealItems.forEach((item) => revealObserver.observe(item));
    }
});
