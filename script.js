document.addEventListener("DOMContentLoaded", () => {
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

  // Stagger reveal animations within grids/lists
  document.querySelectorAll(".impact-grid, .skills-grid, .achievement-list").forEach(group => {
    [...group.children].forEach((el, i) => {
      el.style.transitionDelay = `${Math.min(i * 80, 320)}ms`;
    });
  });

  // Subtle custom cursor on desktop
  const dot = document.querySelector(".cursor-dot");
  const ring = document.querySelector(".cursor-ring");
  if (window.matchMedia("(pointer:fine)").matches && dot && ring) {
    window.addEventListener("mousemove", e => {
      dot.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
      ring.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
    });
    document.querySelectorAll("a, .project, .impact-card, .skill-group").forEach(el => {
      el.addEventListener("mouseenter", () => {
        ring.style.width = "52px"; ring.style.height = "52px";
        ring.style.margin = "-26px 0 0 -26px";
      });
      el.addEventListener("mouseleave", () => {
        ring.style.width = "34px"; ring.style.height = "34px";
        ring.style.margin = "-17px 0 0 -17px";
      });
    });
  }

  // Highlight active nav section
  const navLinks = [...document.querySelectorAll(".nav a")];
  const sections = navLinks.map(a => document.querySelector(a.getAttribute("href"))).filter(Boolean);
  const sectionObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`));
      }
    });
  }, { rootMargin: "-40% 0px -50% 0px" });
  sections.forEach(section => sectionObserver.observe(section));
});
