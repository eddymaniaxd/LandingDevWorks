import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

let registered = false;

/** Registra ScrollTrigger una sola vez, incluso si varias secciones lo importan. */
export function getGsap() {
  if (!registered) {
    gsap.registerPlugin(ScrollTrigger);
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.defaults({ duration: 0.01 });
    }
    registered = true;
  }
  return { gsap, ScrollTrigger };
}
