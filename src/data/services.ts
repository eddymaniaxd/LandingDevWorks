export interface Service {
  /** Clave usada para buscar título/descripción/tags traducidos en
   * src/i18n/translations/*.ts (t.services.items[id]). */
  id: "web" | "software" | "agentes-ia" | "automatizacion" | "ecommerce" | "apps" | "gis";
  slug: string;
  number: string;
  icon: string; // lucide icon name
}

export const services: Service[] = [
  { id: "web", slug: "desarrollo-web", number: "01", icon: "layout-template" },
  { id: "software", slug: "software-empresarial", number: "02", icon: "layout-dashboard" },
  { id: "agentes-ia", slug: "agentes-ia", number: "03", icon: "bot" },
  { id: "automatizacion", slug: "automatizacion", number: "04", icon: "workflow" },
  { id: "ecommerce", slug: "ecommerce", number: "05", icon: "shopping-cart" },
  { id: "apps", slug: "aplicaciones", number: "06", icon: "smartphone" },
  { id: "gis", slug: "gis-mapas", number: "07", icon: "map" },
];
