document.addEventListener("DOMContentLoaded", () => {
  // Close the mobile navigation after selecting a section.
  document.querySelectorAll("#mainNav .nav-link").forEach(link => {
    link.addEventListener("click", () => {
      const nav = document.querySelector("#mainNav");
      if (nav.classList.contains("show")) bootstrap.Collapse.getOrCreateInstance(nav).hide();
    });
  });

  // Highlight the navigation item for the section currently in view.
  const sections = document.querySelectorAll("main section[id]");
  const navLinks = document.querySelectorAll(".navbar .nav-link");
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      navLinks.forEach(link => link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`));
    });
  }, { rootMargin: "-35% 0px -55% 0px" });
  sections.forEach(section => observer.observe(section));

  // Demo CTA is intentionally a placeholder until a product video is supplied.
  document.querySelectorAll('a[href="#login"]').forEach(link => {
    link.addEventListener("click", event => {
      event.preventDefault();
      alert("Connect your Rentora login page or authentication flow here.");
    });
  });

  // Theme Toggle Handler
  const toggleBtns = document.querySelectorAll('#themeToggleBtn, .btn-theme-toggle');
  toggleBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const currentTheme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('rentora_theme', newTheme);
    });
  });

  // Support Question Modal Interactivity & Form Submission
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
