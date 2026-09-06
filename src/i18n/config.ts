export const locales = ["es", "en", "pt"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "es";

export const localeNames: Record<Locale, string> = {
  es: "Español",
  en: "English",
  pt: "Português",
};

// Emoji de bandera para la barrita de idiomas. Se usa 🇧🇴 (Bolivia) para
// español porque Dev Works opera desde Bolivia.
export const localeFlags: Record<Locale, string> = {
  es: "🇧🇴",
  en: "🇺🇸",
  pt: "🇧🇷",
};

export const localeHtmlLang: Record<Locale, string> = {
  es: "es",
  en: "en",
  pt: "pt",
};
