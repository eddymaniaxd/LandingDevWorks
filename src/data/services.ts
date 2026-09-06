export interface Service {
  /** Clave usada para buscar título/descripción/tags traducidos en
   * src/i18n/translations/*.ts (t.services.items[id]). */
  id: "web" | "ecommerce" | "software" | "apps" | "gis" | "automatizacion";
  slug: string;
  number: string;
  icon: string; // lucide icon name
}

export const services: Service[] = [
  { id: "web", slug: "desarrollo-web", number: "01", icon: "layout-template" },
  { id: "ecommerce", slug: "ecommerce", number: "02", icon: "shopping-cart" },
  { id: "software", slug: "software-empresarial", number: "03", icon: "layout-dashboard" },
  { id: "apps", slug: "aplicaciones", number: "04", icon: "smartphone" },
  { id: "gis", slug: "gis-mapas", number: "05", icon: "map" },
  { id: "automatizacion", slug: "automatizacion", number: "06", icon: "workflow" },
];
