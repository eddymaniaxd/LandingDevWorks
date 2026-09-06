/**
 * Capa fina sobre Google Analytics 4 (gtag.js).
 * El script de gtag se carga en Layout.astro solo si PUBLIC_GA_MEASUREMENT_ID
 * está definido, y respeta que no se debe cargar analítica pesada de más.
 */

export type AnalyticsEvent =
  | "hero_cta_click"
  | "hero_secondary_cta_click"
  | "projects_click"
  | "service_click"
  | "whatsapp_click"
  | "contact_form_start"
  | "contact_form_submit"
  | "project_view"
  | "nav_cta_click";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

export function trackEvent(event: AnalyticsEvent, params: Record<string, unknown> = {}): void {
  if (typeof window === "undefined") return;

  if (window.gtag) {
    window.gtag("event", event, params);
  }

  // Siempre disponible para debugging o para conectar otra herramienta después.
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event, ...params });
}
