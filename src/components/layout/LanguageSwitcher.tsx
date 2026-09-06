import { useEffect, useRef, useState } from "react";
import { locales, localeFlags, localeNames, type Locale } from "@/i18n/config";

interface LanguageSwitcherProps {
  currentLocale: Locale;
  /** "bar": barrita de banderitas en línea (navbar desktop). "list": lista
   * vertical de opciones (usada dentro del menú móvil). */
  variant?: "bar" | "list";
}

const COOKIE_NAME = "devworks_locale";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 365;

function targetPathFor(locale: Locale): string {
  const path = window.location.pathname;
  const stripped = path.replace(/^\/(en|pt)(?=\/|$)/, "") || "/";
  if (locale === "es") return stripped;
  return stripped === "/" ? `/${locale}` : `/${locale}${stripped}`;
}

function switchLocale(locale: Locale) {
  document.cookie = `${COOKIE_NAME}=${locale}; path=/; max-age=${COOKIE_MAX_AGE}; samesite=lax`;
  const newPath = targetPathFor(locale);
  window.location.href = `${newPath}${window.location.search}${window.location.hash}`;
}

export default function LanguageSwitcher({ currentLocale, variant = "bar" }: LanguageSwitcherProps) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (variant !== "bar") return;
    function onClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("click", onClickOutside);
    return () => document.removeEventListener("click", onClickOutside);
  }, [variant]);

  if (variant === "list") {
    return (
      <div className="flex items-center gap-2" role="group" aria-label="Idioma">
        {locales.map((locale) => (
          <button
            key={locale}
            type="button"
            onClick={() => switchLocale(locale)}
            aria-current={locale === currentLocale}
            className={`flex h-10 w-10 items-center justify-center rounded-md border text-lg transition-colors ${
              locale === currentLocale
                ? "border-accent bg-accent/10"
                : "border-border bg-surface hover:border-border-strong"
            }`}
            aria-label={localeNames[locale]}
          >
            <span aria-hidden="true">{localeFlags[locale]}</span>
          </button>
        ))}
      </div>
    );
  }

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-haspopup="true"
        aria-label={`${localeNames[currentLocale]} — cambiar idioma`}
        className="flex h-10 items-center gap-1.5 rounded-pill border border-border bg-surface px-3 text-sm transition-colors hover:border-border-strong hover:bg-surface-hover"
      >
        <span aria-hidden="true" className="text-base leading-none">
          {localeFlags[currentLocale]}
        </span>
        <span className="hidden font-medium text-foreground-muted lg:inline">{currentLocale.toUpperCase()}</span>
      </button>

      {open && (
        <div
          role="menu"
          className="glass absolute right-0 top-12 z-50 flex min-w-[9rem] flex-col overflow-hidden rounded-md border border-border py-1 shadow-soft"
        >
          {locales.map((locale) => (
            <button
              key={locale}
              type="button"
              role="menuitem"
              onClick={() => switchLocale(locale)}
              aria-current={locale === currentLocale}
              className={`flex items-center gap-2.5 px-3.5 py-2.5 text-left text-sm transition-colors hover:bg-surface-hover ${
                locale === currentLocale ? "text-foreground" : "text-foreground-muted"
              }`}
            >
              <span aria-hidden="true" className="text-base leading-none">
                {localeFlags[locale]}
              </span>
              {localeNames[locale]}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
