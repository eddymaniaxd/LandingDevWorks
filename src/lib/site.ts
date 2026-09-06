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
const WHATSAPP_MESSAGE =
  import.meta.env.PUBLIC_WHATSAPP_MESSAGE ||
  "Hola Dev Works, quiero conversar sobre un proyecto";

export const site = {
  name: "Dev Works",
  tagline: "Convertimos ideas en soluciones digitales que hacen crecer tu negocio.",
  url: "https://devworks.lat",
  contactEmail: import.meta.env.PUBLIC_CONTACT_EMAIL || "hola@devworks.com",
  linkedinUrl: import.meta.env.PUBLIC_LINKEDIN_URL || "https://www.linkedin.com/company/dev-works/?viewAsMember=true",
  whatsapp: {
    number: WHATSAPP_NUMBER,
    href: WHATSAPP_NUMBER
      ? `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`
      : "#contacto",
    isConfigured: Boolean(WHATSAPP_NUMBER),
  },
} as const;

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
