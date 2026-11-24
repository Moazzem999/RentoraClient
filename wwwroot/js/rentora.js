/* ==========================================================================
   Rentora Client - Core Landing Page Script
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
    // 1. Close mobile navigation collapse automatically after selecting a section link
    document.querySelectorAll("#mainNav .nav-link").forEach(link => {
        link.addEventListener("click", () => {
            const nav = document.querySelector("#mainNav");
            if (nav && nav.classList.contains("show") && typeof bootstrap !== "undefined") {
                bootstrap.Collapse.getOrCreateInstance(nav).hide();
            }
        });
    });

    // 2. Highlight active navigation link matching current visible section
    const sections = document.querySelectorAll("main section[id]");
    const navLinks = document.querySelectorAll(".navbar .nav-link");
    if (sections.length > 0 && navLinks.length > 0 && "IntersectionObserver" in window) {
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;
                navLinks.forEach(link => {
                    const href = link.getAttribute("href");
                    if (href === `#${entry.target.id}`) {
                        link.classList.add("active");
                    } else if (href && href.startsWith("#")) {
                        link.classList.remove("active");
                    }
                });
            });
        }, { rootMargin: "-35% 0px -55% 0px" });
        sections.forEach(section => observer.observe(section));
    }

    // 3. Support Question Modal Interactivity & Form Submission
    const supportForm = document.getElementById('supportInquiryForm');
    const supportSuccess = document.getElementById('supportSuccessState');
    const supportModalEl = document.getElementById('supportModal');

    if (supportForm && supportSuccess && supportModalEl) {
        supportForm.addEventListener('submit', (e) => {
            e.preventDefault();
            e.stopPropagation();

            if (!supportForm.checkValidity()) {
                supportForm.classList.add('was-validated');
                return;
            }

            const nameInput = document.getElementById('supportFullName');
            const emailInput = document.getElementById('supportEmail');
            const nameVal = nameInput && nameInput.value.trim() ? nameInput.value.trim() : 'Valued Landlord';
            const emailVal = emailInput && emailInput.value.trim() ? emailInput.value.trim() : 'your email';
            const randomTicket = '#RT-' + Math.floor(1000 + Math.random() * 9000);

            const ticketEl = document.getElementById('supportTicketId');
            const nameEl = document.getElementById('supportSuccessName');
            const emailEl = document.getElementById('supportSuccessEmail');

            if (ticketEl) ticketEl.textContent = randomTicket;
            if (nameEl) nameEl.textContent = nameVal;
            if (emailEl) emailEl.textContent = emailVal;

            supportForm.classList.add('d-none');
            supportSuccess.classList.remove('d-none');
        });

        supportModalEl.addEventListener('hidden.bs.modal', () => {
            supportForm.reset();
            supportForm.classList.remove('was-validated');
            supportForm.classList.remove('d-none');
            supportSuccess.classList.add('d-none');
        });

        // Auto-select topic if modal was triggered from specific button (e.g. Enterprise pricing)
        supportModalEl.addEventListener('show.bs.modal', (e) => {
            const triggerBtn = e.relatedTarget;
            if (triggerBtn) {
                const topic = triggerBtn.getAttribute('data-support-topic');
                const categorySelect = document.getElementById('supportCategory');
                if (topic && categorySelect) {
                    categorySelect.value = topic;
                }
            }
        });
    }
});
