/**
 * Reveal-on-scroll genérico y ligero (sin dependencias) para elementos con
 * `data-reveal`. Se usa en secciones donde una simple aparición con
 * IntersectionObserver es suficiente; GSAP/ScrollTrigger se reserva para
 * animaciones más complejas (Process timeline, Portfolio, Hero visual).
 */
export function initReveal(): void {
  const elements = document.querySelectorAll<HTMLElement>("[data-reveal]");
  if (elements.length === 0) return;

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (prefersReducedMotion) {
    elements.forEach((el) => el.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const delay = entry.target.getAttribute("data-reveal-delay") || "0";
          (entry.target as HTMLElement).style.transitionDelay = `${delay}ms`;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -8% 0px" }
  );

  elements.forEach((el) => observer.observe(el));
}
