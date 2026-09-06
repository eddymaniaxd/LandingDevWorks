import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import node from '@astrojs/node';

// https://astro.build/config
// output: 'hybrid' -> todo se pre-renderiza a HTML estático por defecto;
// solo las rutas que declaran `export const prerender = false` (la API de
// contacto y las páginas raíz "/" y "/contacto", que necesitan detectar el
// idioma por IP en cada visita) corren en el servidor Node. Esto mantiene el
// principio "HTML first" para el resto del sitio.
//
// Adaptador: self-hosted en un VPS (Nginx como proxy inverso + TLS, PM2
// corriendo este proceso Node en modo "standalone"). Antes usaba
// @astrojs/vercel, pero al mudarse a un VPS propio ya no hay infraestructura
// de Vercel disponible — ver el cambio correspondiente en src/middleware.ts
// (la detección de idioma por IP ahora usa geoip-lite + el header
// X-Forwarded-For que pone Nginx, en vez del header x-vercel-ip-country).
export default defineConfig({
  site: 'https://devworks.lat',
  output: 'hybrid',
  adapter: node({
    mode: 'standalone',
  }),
  integrations: [react(), sitemap()],
  i18n: {
    locales: ['es', 'en', 'pt'],
    defaultLocale: 'es',
    routing: {
      prefixDefaultLocale: false,
    },
  },
  vite: {
    plugins: [tailwindcss()],
  },
  image: {
    domains: [],
  },
});
