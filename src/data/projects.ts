export interface Project {
  /** Clave usada para buscar nombre/descripción/categoría traducidos en
   * src/i18n/translations/*.ts (t.projects.items[id]). */
  id:
    | "sistema-mapas-comerciales"
    | "alphitech"
    | "vicmyers"
    | "bantokens"
    | "photofloh"
    | "sistema-administrativo"
    | "sistema-inventario";
  slug: string;
  technologies: string[];
  /** URL de la captura, GIF o video (.mp4) real del proyecto (puede ser local
   * en /public/projects/ o externa, p. ej. Imgur). Si es un video, se
   * renderiza con <video> en vez de <img> — ver isVideoUrl() en lib/utils. */
  imageUrl?: string;
  /** object-position CSS opcional para imageUrl en la tarjeta (ProjectCard),
   * cuyo recorte es más angosto (aspect-video) que la imagen de detalle. Útil
   * para gráficos anchos donde el recorte centrado por defecto corta texto
   * importante (p. ej. un logo o título a la izquierda de la imagen). */
  imagePosition?: string;
  /** Segunda captura/video opcional, para proyectos con más de un caso real
   * que mostrar (p. ej. un producto reutilizado en distintos clientes). Se
   * muestra debajo de imageUrl en la página de detalle del proyecto. */
  secondaryImageUrl?: string;
  /** Sitio en vivo del proyecto, si es público. Si no existe (p. ej. un sistema interno), se omite. */
  liveUrl?: string;
  imagePending: boolean;
}

export const projects: Project[] = [
  {
    id: "sistema-mapas-comerciales",
    slug: "sistema-mapas-comerciales",
    technologies: ["React", "Next.js", "Leaflet", "Node.js"],
    // Local: grabación de pantalla real de un cliente (Urbanización Ciara)
    // como imagen principal — recortada para quitar el menú de la app de
    // captura (ShareX) que aparecía al inicio del video, y comprimida a mp4
    // (de ~22 MB en gif a ~2 MB) para no afectar el rendimiento de la
    // página. El gráfico de marca queda como segundo modelo.
    imageUrl: "/projects/sistema-mapas-comerciales.mp4",
    secondaryImageUrl: "/projects/sistema-mapas-comerciales-cover.webp",
    imagePending: false,
  },
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
    // Imagen original (Imgur): uno de los referentes históricos de Dev
    // Works, se mantiene como imagen principal. Este proyecto es, además,
    // otro caso real del mismo producto "Sistema de Mapas Comerciales"
    // (otro cliente distinto de Urbanización Ciara), así que se suma la
    // misma grabación real como segundo modelo.
    imageUrl: "https://i.imgur.com/EvccMjU.gif",
    secondaryImageUrl: "/projects/sistema-mapas-comerciales.mp4",
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
