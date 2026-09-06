import { es } from "./translations/es";
import { en } from "./translations/en";
import { pt } from "./translations/pt";
import { defaultLocale, locales, type Locale } from "./config";

export const dictionaries = { es, en, pt } as const;

/** Devuelve el diccionario de traducciones para un idioma. Si el idioma no
 * es válido (o no viene definido), cae de vuelta al idioma por defecto. */
export function useTranslations(lang?: string | null) {
  const locale = isLocale(lang) ? lang : defaultLocale;
  return dictionaries[locale];
}

export function isLocale(value?: string | null): value is Locale {
  return !!value && (locales as readonly string[]).includes(value);
}

/** Antepone el prefijo de idioma a una ruta interna, excepto para el idioma
 * por defecto (es), que vive sin prefijo en la raíz (ver astro.config.mjs,
 * i18n.routing.prefixDefaultLocale: false). */
export function localizedPath(path: string, lang: Locale): string {
  if (lang === defaultLocale) return path;
  if (path === "/") return `/${lang}`;
  return `/${lang}${path}`;
}
