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
});
