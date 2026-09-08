export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ");
}

/** Simple, dependency-free email format check (frontend hint only — real validation is server-side). */
export function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

/** Detecta si una URL de media (imageUrl de un proyecto) apunta a un video
 * (p. ej. un .mp4 hotlinkeado desde Imgur) en vez de una imagen/GIF, para
 * poder renderizar <video> en lugar de <img>. */
export function isVideoUrl(url: string): boolean {
  return /\.(mp4|webm|mov)(\?.*)?$/i.test(url);
}

/** Estima minutos de lectura a partir del cuerpo Markdown crudo de un post
 * (cuenta palabras separadas por espacio, ~200 palabras/minuto). Es una
 * aproximación, no una medición exacta. */
export function estimateReadingMinutes(rawBody: string): number {
  const words = rawBody.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

/** Formatea una fecha en el idioma del sitio (es/en/pt), p. ej. "5 de
 * septiembre de 2026" / "September 5, 2026" / "5 de setembro de 2026". */
export function formatPostDate(date: Date, htmlLang: string): string {
  // timeZone: "UTC" es intencional — publishDate viene de un frontmatter tipo
  // fecha ("2026-09-08"), que Astro/Zod interpreta como medianoche UTC. Sin
  // fijar la zona, el servidor formatea en su propia hora local y, si está
  // detrás de UTC (como Bolivia, UTC-4), el resultado muestra el día
  // anterior.
  return new Intl.DateTimeFormat(htmlLang, { year: "numeric", month: "long", day: "numeric", timeZone: "UTC" }).format(
    date,
  );
}
