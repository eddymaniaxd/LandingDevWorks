# Dev Works — Landing Page

Landing page premium para **Dev Works**, construida con Astro, TypeScript, Tailwind CSS, React Islands y GSAP. HTML-first: la mayor parte del sitio es HTML estático, React solo se usa donde hay interactividad real (menú móvil, formulario de contacto, visual del hero).

## Antes de publicar

Este proyecto está listo para funcionar, pero usa **placeholders honestos** donde aún no hay información real de Dev Works (no se inventaron clientes, métricas, resultados ni un número de WhatsApp). Antes de salir a producción:

1. Copia `.env.example` a `.env` y completa los datos reales:
   - `PUBLIC_WHATSAPP_NUMBER` — sin este valor, el botón de WhatsApp **no se muestra** (no se inventa un número falso).
   - `PUBLIC_CONTACT_EMAIL`, `PUBLIC_LINKEDIN_URL`, `PUBLIC_GA_MEASUREMENT_ID`.
   - `CONTACT_FORM_WEBHOOK_URL` — a dónde se reenvían los mensajes del formulario (Slack, email transaccional, CRM, etc.). Si se deja vacío, los leads solo quedan en el log del servidor.
2. Reemplaza los proyectos de `src/data/projects.ts` por casos reales cuando estén disponibles para publicar, y agrega sus capturas en `/public/projects/`.
3. Reemplaza `public/og-image.png`, `public/icon-*.png` y `public/favicon.ico` por la identidad visual real de Dev Works (estos son placeholders generados proceduralmente, ver `scripts/generate-brand-assets.py`).
4. Actualiza `site` en `astro.config.mjs` con el dominio real, y `src/lib/site.ts` si cambian los textos base.

## Stack

- **Astro 4** (`output: 'hybrid'`) — todo el sitio se pre-renderiza a HTML estático; solo `/api/contact` corre como función serverless.
- **Tailwind CSS v4** (config CSS-first, sin `tailwind.config.js` — los tokens del design system viven en `src/styles/global.css`).
- **React** (vía `@astrojs/react`) solo para islands interactivos: `MobileMenu`, `HeroVisual`, `ContactForm`.
- **GSAP + ScrollTrigger** para la línea de progreso del proceso y el reveal del portafolio. El resto de animaciones son CSS + un `IntersectionObserver` liviano (`src/lib/reveal-client.ts`).
- **lucide-static** para iconos estáticos inline (0 JS) en componentes `.astro`; `lucide-react` en los islands.
- **@astrojs/vercel** (adapter serverless) + **@astrojs/sitemap**.

## Comandos

```bash
npm install
npm run dev        # http://localhost:4321
npm run build      # type-check (astro check) + build de producción
npm run build:fast # build sin type-check, más rápido para iterar
npm run preview    # sirve el build de producción localmente
```

## Estructura

```
src/
├── components/       # Componentes por sección (layout, hero, services, gis, projects, ...)
├── data/              # Contenido data-driven: services.ts, projects.ts, technologies.ts, process.ts
├── layouts/Layout.astro
├── lib/               # site.ts (config central), analytics.ts, utils.ts, reveal-client.ts, gsap-client.ts
├── pages/
│   ├── index.astro
│   ├── contacto.astro
│   ├── api/contact.ts       # endpoint del formulario (serverless)
│   └── proyectos/[slug].astro  # case study dinámico a partir de projects.ts
└── styles/global.css  # design tokens (@theme) + estilos base
```

### Agregar un servicio o proyecto nuevo

Edita `src/data/services.ts` o `src/data/projects.ts` — son arrays tipados en TypeScript, no hay que tocar HTML. Cada proyecto nuevo genera automáticamente su página en `/proyectos/[slug]`.

### Design tokens

Todos los colores, radios, sombras, tipografía y animaciones están centralizados en `src/styles/global.css` dentro del bloque `@theme`. Tailwind v4 genera las utilidades automáticamente a partir de esos tokens (`--color-accent` → `bg-accent`, `text-accent`, `border-accent`; `--radius-pill` → `rounded-pill`; etc.). Para ajustar la marca (por ejemplo, el color de acento), basta con cambiar las variables ahí — no hay valores de color sueltos en los componentes.

## SEO

- Metadata (title, description, canonical, Open Graph, Twitter) centralizada en `src/components/shared/SEO.astro`.
- Schema.org: `Organization` y `Service` en todas las páginas, `BreadcrumbList` en cada case study.
- `sitemap-index.xml` generado automáticamente por `@astrojs/sitemap` en cada build.
- `robots.txt` en `/public`.

## Analytics

`src/lib/analytics.ts` expone `trackEvent()`, usado en los CTAs para disparar los eventos pedidos: `hero_cta_click`, `hero_secondary_cta_click`, `service_click`, `project_view`, `whatsapp_click`, `contact_form_start`, `contact_form_submit`, `nav_cta_click`. El script de GA4 solo se carga si `PUBLIC_GA_MEASUREMENT_ID` está definido.

## Formulario de contacto

- Frontend: `src/components/contact/ContactForm.tsx` (estados `idle/loading/success/error`, validación en cliente).
- Backend: `src/pages/api/contact.ts` — valida y sanitiza en servidor, honeypot anti-bot, chequeo de envío demasiado rápido, y rate limiting en memoria por IP (recomendado migrar a un store compartido como Upstash Redis si el tráfico crece).

## Accesibilidad y performance

- Un único `<h1>` por página, jerarquía `h2`/`h3` consistente, `focus-visible` en toda la UI, labels en el formulario.
- Respeta `prefers-reduced-motion` (las animaciones CSS y el reveal por scroll se desactivan).
- Fuentes autoalojadas (`@fontsource-variable`), sin peticiones a Google Fonts.
- Todo lo que no necesita interactividad es HTML estático; los islands de React se cargan con `client:idle` / `client:load` según qué tan crítico es para el usuario.

## Pendiente antes de "terminado" (QA)

- [ ] Reemplazar assets de marca placeholder por los reales.
- [ ] Completar `.env` con datos reales de contacto.
- [ ] Cargar proyectos reales con capturas cuando estén disponibles para publicar.
- [ ] Lighthouse (Performance/SEO/Accessibility/Best Practices) en un dominio desplegado.
- [ ] QA visual en Chrome/Firefox/Safari/Edge y en los breakpoints 320–4K.
