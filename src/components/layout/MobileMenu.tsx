import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Menu, X } from "lucide-react";
import { trackEvent } from "@/lib/analytics";
import { useTranslations } from "@/i18n/utils";
import { defaultLocale, type Locale } from "@/i18n/config";
import LanguageSwitcher from "@components/layout/LanguageSwitcher";

interface NavItem {
  label: string;
  href: string;
}

interface MobileMenuProps {
  navItems: NavItem[];
  contactHref: string;
  lang?: Locale;
}

export default function MobileMenu({ navItems, contactHref, lang = defaultLocale }: MobileMenuProps) {
  const t = useTranslations(lang);
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  // El overlay se monta vía portal directo en <body>. Si viviera dentro del
  // <header>, el `backdrop-filter` que el navbar gana al hacer scroll crea un
  // nuevo "containing block" y rompe el `position: fixed` del menú (queda
  // anclado al header en vez de a toda la pantalla, dejando ver el contenido
  // de atrás). El portal evita ese problema por completo.
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const overlay = (
    <div
      id="mobile-menu"
      role="dialog"
      aria-modal="true"
      aria-label={t.mobileMenu.dialogLabel}
      className="fixed inset-0 z-[100] flex h-[100dvh] w-screen flex-col overflow-y-auto bg-background animate-fade-in"
    >
      <div className="container-page flex h-16 shrink-0 items-center justify-between">
        <span className="font-display text-sm font-bold tracking-[0.18em] text-foreground">
          DEV<span className="text-accent">WORKS</span>
        </span>
        <button
          type="button"
          onClick={() => setOpen(false)}
          aria-label={t.mobileMenu.closeLabel}
          className="flex h-10 w-10 items-center justify-center rounded-md text-foreground transition-colors hover:bg-surface"
        >
          <X size={22} strokeWidth={1.75} aria-hidden="true" />
        </button>
      </div>

      <nav className="container-page flex flex-1 flex-col justify-center gap-2 py-8" aria-label="Navegación móvil">
        {navItems.map((item, index) => (
          <a
            key={item.href}
            href={item.href}
            onClick={() => setOpen(false)}
            style={{ animationDelay: `${index * 40}ms` }}
            className="animate-fade-up border-b border-border py-5 font-display text-3xl font-semibold text-foreground"
          >
            {item.label}
          </a>
        ))}

        <div className="mt-8 flex items-center justify-between gap-4">
          <a
            href={contactHref}
            onClick={() => {
              trackEvent("nav_cta_click");
              setOpen(false);
            }}
            className="inline-flex flex-1 items-center justify-center gap-2 rounded-pill bg-accent px-6 py-4 text-center font-medium text-white"
          >
            {t.mobileMenu.cta} →
          </a>
        </div>

        <div className="mt-6 flex justify-center">
          <LanguageSwitcher currentLocale={lang} variant="list" />
        </div>
      </nav>
    </div>
  );

  return (
    <div className="md:hidden">
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-expanded={open}
        aria-controls="mobile-menu"
        aria-label={t.mobileMenu.openLabel}
        className="flex h-10 w-10 items-center justify-center rounded-md text-foreground transition-colors hover:bg-surface"
      >
        <Menu size={22} strokeWidth={1.75} aria-hidden="true" />
      </button>

      {open && mounted && createPortal(overlay, document.body)}
    </div>
  );
}
