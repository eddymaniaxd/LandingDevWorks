export interface Project {
  /** Clave usada para buscar nombre/descripción/categoría traducidos en
   * src/i18n/translations/*.ts (t.projects.items[id]). */
  id: "alphitech" | "vicmyers" | "bantokens" | "photofloh" | "sistema-administrativo" | "sistema-inventario";
  slug: string;
  technologies: string[];
  /** URL de la captura, GIF o video (.mp4) real del proyecto (puede ser local
   * en /public/projects/ o externa, p. ej. Imgur). Si es un video, se
   * renderiza con <video> en vez de <img> — ver isVideoUrl() en lib/utils. */
  imageUrl?: string;
  /** Sitio en vivo del proyecto, si es público. Si no existe (p. ej. un sistema interno), se omite. */
  liveUrl?: string;
  imagePending: boolean;
}

export const projects: Project[] = [
  {
    id: "alphitech",
    slug: "alphitech-catalogo-tecnico",
    technologies: [],
    imageUrl: "https://i.imgur.com/mREODuT.jpg",
    liveUrl: "https://www.alphitech.com/products/",
    imagePending: false,
  },
  {
    id: "vicmyers",
    slug: "vicmyers-catalogo-b2b",
    technologies: [],
    imageUrl: "https://i.imgur.com/NkiaU57.jpg",
    liveUrl: "https://www.vicmyers.com/prod2",
    imagePending: false,
  },
  {
    id: "bantokens",
    slug: "bantokens-fintech",
    technologies: [],
    imageUrl: "https://i.imgur.com/7kyBe5h.gif",
    liveUrl: "https://bantokens.com/",
    imagePending: false,
  },
  {
    id: "photofloh",
    slug: "photofloh-resenas",
    technologies: [],
    imageUrl: "https://i.imgur.com/hYaOTIJ.gif",
    liveUrl: "https://photofloh.de/feedback/",
    imagePending: false,
  },
  {
    id: "sistema-administrativo",
    slug: "sistema-administrativo",
    technologies: [],
    imageUrl: "https://i.imgur.com/EvccMjU.gif",
    imagePending: false,
  },
  {
    id: "sistema-inventario",
    slug: "sistema-inventario",
    technologies: [],
    // Local: grabación de pantalla real del sistema, recortada (se le quitó
    // la barra de pestañas/URL del navegador, que exponía la IP del
    // servidor y una pestaña "Credenciales.xlsx") y optimizada para web.
    imageUrl: "/projects/sistema-inventario.gif",
    imagePending: false,
  },
];
