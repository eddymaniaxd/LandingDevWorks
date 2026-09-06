import { defineMiddleware } from "astro:middleware";
import geoip from "geoip-lite";
import type { Locale } from "@/i18n/config";

/**
 * Detección de idioma por IP (geolocalización real, sin servicios de
 * terceros de pago): usamos `geoip-lite`, una base de datos local (MaxMind
 * GeoLite2 empaquetada dentro del propio paquete npm) para resolver el país
 * a partir de la IP del visitante — no hay llamada de red externa por
 * request, así que no agrega latencia ni depende de que un tercero esté
 * disponible.
 *
 * La IP real del visitante llega en el header `X-Forwarded-For`, que Nginx
 * agrega al hacer de proxy inverso frente a este servidor Node (ver el
 * bloque `proxy_set_header X-Forwarded-For` en la config de Nginx del VPS).
 * Sin ese proxy delante, `context.clientAddress` sería la única fuente
 * disponible (por eso se deja como respaldo).
 *
 * Nota histórica: la versión anterior de este archivo leía el header
 * `x-vercel-ip-country`, que Vercel agregaba automáticamente — eso dejó de
 * funcionar al mudar el sitio de Vercel a este VPS propio, de ahí el cambio
 * a geoip-lite.
 */

const COOKIE_NAME = "devworks_locale";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 365; // 1 año

// Países donde el portugués es idioma principal.
const PT_COUNTRIES = new Set(["BR", "PT", "AO", "MZ", "CV", "GW", "ST", "TL"]);

// Países de habla inglesa (o donde el inglés es el idioma de negocio
// dominante) fuera de Latinoamérica/España.
const EN_COUNTRIES = new Set([
  "US", "GB", "CA", "AU", "NZ", "IE", "ZA", "IN", "PH", "SG", "NG", "KE",
  "GH", "PK", "JM", "TT", "MY", "HK",
]);

/** IP pública del visitante, sea que llegue detrás del proxy de Nginx
 * (X-Forwarded-For / X-Real-IP) o directo al proceso Node. */
function getClientIp(request: Request, clientAddress?: string): string | null {
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) {
    // Formato: "ip-del-cliente, proxy1, proxy2" — el primero es el real.
    const first = forwardedFor.split(",")[0]?.trim();
    if (first) return first;
  }
  const realIp = request.headers.get("x-real-ip");
  if (realIp) return realIp;
  return clientAddress ?? null;
}

function detectLocaleFromIp(ip: string | null): Locale {
  if (!ip) return "es";
  const geo = geoip.lookup(ip);
  const country = geo?.country;
  if (!country) return "es";
  if (PT_COUNTRIES.has(country)) return "pt";
  if (EN_COUNTRIES.has(country)) return "en";
  return "es";
}

// Únicas rutas donde corre la detección por IP: son las que un visitante
// nuevo puede escribir directamente en la barra de direcciones (la home y la
// página de contacto), y las únicas marcadas `export const prerender = false`
// para que este middleware realmente se ejecute (ver astro.config.mjs). El
// resto del sitio (incluidos /proyectos/*) queda pre-renderizado y estático.
const GEO_REDIRECT_PATHS = new Set(["/", "/contacto"]);

export const onRequest = defineMiddleware(async (context, next) => {
  const { request, cookies, url, redirect } = context;
  const { pathname } = url;

  if (!GEO_REDIRECT_PATHS.has(pathname)) {
    return next();
  }

  const cookieLocale = cookies.get(COOKIE_NAME)?.value;
  let targetLocale: Locale;

  if (cookieLocale === "es" || cookieLocale === "en" || cookieLocale === "pt") {
    targetLocale = cookieLocale;
  } else {
    let clientAddress: string | undefined;
    try {
      clientAddress = context.clientAddress;
    } catch {
      clientAddress = undefined;
    }
    const ip = getClientIp(request, clientAddress);
    targetLocale = detectLocaleFromIp(ip);
    cookies.set(COOKIE_NAME, targetLocale, {
      path: "/",
      maxAge: COOKIE_MAX_AGE,
      sameSite: "lax",
    });
  }

  if (targetLocale !== "es") {
    const suffix = pathname === "/" ? "" : pathname;
    return redirect(`/${targetLocale}${suffix}`, 302);
  }

  return next();
});
