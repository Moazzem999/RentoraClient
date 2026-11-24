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
});
