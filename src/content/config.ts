import { defineCollection, z } from "astro:content";

/**
 * Colección del blog. Cada post vive en src/content/blog/<locale>/<slug>.md,
 * con el MISMO slug de archivo en los 3 idiomas cuando existe traducción —
 * así el selector de idioma puede enlazar a la versión equivalente del post
 * (igual que ya se hace con los slugs de /proyectos/[slug]).
 *
 * El locale del post se toma de la carpeta contenedora (es/en/pt), no hace
 * falta repetirlo en el frontmatter.
 */
const blog = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    description: z.string(),
    publishDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    category: z.string(),
    /** Portada del post (SVG/imagen en /public/blog/). Es la misma para las
     * 3 versiones de idioma de un mismo post — es una ilustración, no
     * depende del texto. */
    coverImage: z.string().optional(),
    /** object-position CSS opcional para coverImage, para fotos/gráficos
     * anchos (p. ej. capturas reales) donde el recorte centrado por defecto
     * corta texto o contenido importante en la miniatura de la tarjeta. */
    coverImagePosition: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { blog };
