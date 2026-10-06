/**
 * Configuración central del sitio.
 * Los datos reales de contacto de Dev Works deben vivir en variables de
 * entorno (.env) — ver .env.example. Nunca se hardcodea un número o email
 * falso: si la variable no está definida, se usa un placeholder visible.
 */

import { localizedPath } from "@/i18n/utils";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/translations/es";

const WHATSAPP_NUMBER = import.meta.env.PUBLIC_WHATSAPP_NUMBER || "";
// Mensaje prellenado de WhatsApp para la versión en español. En inglés y
// portugués se usa el texto traducido de t.whatsappFloat.prefill (ver
// getWhatsAppHref), así un cliente de EE.UU. o Brasil no recibe un mensaje
// en español listo para enviar.
const WHATSAPP_MESSAGE =
  import.meta.env.PUBLIC_WHATSAPP_MESSAGE ||
  "Hola Dev Works, quiero conversar sobre un proyecto";

export const site = {
  name: "Dev Works",
  tagline: "Convertimos ideas en soluciones digitales que hacen crecer tu negocio.",
  url: "https://devworks.lat",
  contactEmail: import.meta.env.PUBLIC_CONTACT_EMAIL || "hola@devworks.com",
  linkedinUrl: import.meta.env.PUBLIC_LINKEDIN_URL || "https://www.linkedin.com/company/dev-works/?viewAsMember=true",
  /** Link para agendar una llamada (Calendly, Cal.com, etc.). Opcional: si
   * no está definido, los botones de "agendar" no se muestran y los CTA
   * llevan al formulario de contacto. */
  bookingUrl: import.meta.env.PUBLIC_BOOKING_URL || "",
  /** URL de "embed" de un video de presentación (Loom, YouTube, Vimeo).
   * Opcional: si no está definido, la sección de video de /team no se muestra. */
  introVideoUrl: import.meta.env.PUBLIC_INTRO_VIDEO_URL || "",
  whatsapp: {
    number: WHATSAPP_NUMBER,
    href: WHATSAPP_NUMBER
      ? `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`
      : "#contacto",
    isConfigured: Boolean(WHATSAPP_NUMBER),
  },
} as const;

/** Link de WhatsApp con el mensaje prellenado en el idioma de la página. En
 * español respeta PUBLIC_WHATSAPP_MESSAGE; en inglés/portugués usa el texto
 * traducido del diccionario. */
export function getWhatsAppHref(lang: Locale, t: Dictionary): string {
  if (!WHATSAPP_NUMBER) return "#contacto";
  const message = lang === "es" ? WHATSAPP_MESSAGE : t.whatsappFloat.prefill;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

/** Ítems de navegación con hrefs prefijados por idioma (ver localizedPath). */
export function getNavItems(lang: Locale, t: Dictionary) {
  return [
    { label: t.nav.servicios, href: `${localizedPath("/", lang)}#servicios` },
    { label: t.nav.proyectos, href: `${localizedPath("/", lang)}#proyectos` },
    { label: t.nav.blog, href: localizedPath("/blog", lang) },
    { label: t.nav.nosotros, href: `${localizedPath("/", lang)}#nosotros` },
    { label: t.nav.contacto, href: localizedPath("/contacto", lang) },
  ];
}
