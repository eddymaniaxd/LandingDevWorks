import { useEffect, useRef, useState } from "react";
import { MapPin, TrendingUp, CheckCircle2 } from "lucide-react";
import { useTranslations } from "@/i18n/utils";
import { defaultLocale, type Locale } from "@/i18n/config";

/**
 * Composición visual del Hero: da la sensación de "hay tecnología funcionando
 * detrás de Dev Works" combinando un mockup de dashboard, un mini-mapa GIS y
 * una tarjeta de código, conectados por una red de nodos decorativa.
 *
 * Todos los datos mostrados son ilustrativos (mockup de interfaz), no
 * métricas reales de Dev Works ni de ningún cliente.
 */
interface HeroVisualProps {
  lang?: Locale;
}

export default function HeroVisual({ lang = defaultLocale }: HeroVisualProps) {
  const t = useTranslations(lang);
  const containerRef = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const handler = () => setReducedMotion(mq.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    if (reducedMotion) return;
    let frame: number;
    function handlePointerMove(e: PointerEvent) {
      const el = containerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const relX = (e.clientX - rect.left - rect.width / 2) / rect.width;
      const relY = (e.clientY - rect.top - rect.height / 2) / rect.height;
      frame = requestAnimationFrame(() => {
        setOffset({ x: relX * 10, y: relY * 10 });
      });
    }
    window.addEventListener("pointermove", handlePointerMove);
    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      cancelAnimationFrame(frame);
    };
  }, [reducedMotion]);

  return (
    <div
      ref={containerRef}
      className="relative mx-auto aspect-[4/5] w-full max-w-md select-none sm:max-w-lg lg:max-w-none"
      aria-hidden="true"
    >
      {/* Red de nodos decorativa */}
      <svg
        className="absolute inset-0 h-full w-full opacity-40"
        viewBox="0 0 400 500"
        fill="none"
        style={{
          transform: `translate(${offset.x * -0.5}px, ${offset.y * -0.5}px)`,
          transition: "transform 0.3s ease-out",
        }}
      >
        <g stroke="var(--color-border-strong)" strokeWidth="1">
          <line x1="40" y1="60" x2="180" y2="140" />
          <line x1="180" y1="140" x2="340" y2="90" />
          <line x1="180" y1="140" x2="120" y2="280" />
          <line x1="120" y1="280" x2="300" y2="340" />
          <line x1="300" y1="340" x2="360" y2="440" />
          <line x1="120" y1="280" x2="60" y2="420" />
        </g>
        <g fill="var(--color-accent-2)">
          <circle cx="40" cy="60" r="3" />
          <circle cx="340" cy="90" r="3" />
          <circle cx="300" cy="340" r="3" />
          <circle cx="60" cy="420" r="3" />
        </g>
        <g fill="var(--color-accent)">
          <circle cx="180" cy="140" r="4" />
          <circle cx="120" cy="280" r="4" />
          <circle cx="360" cy="440" r="4" />
        </g>
      </svg>

      {/* Card: dashboard / gráfico */}
      <div
        className="glass animate-float-slow absolute left-0 top-6 w-[52%] rounded-lg p-4 shadow-soft sm:top-10"
        style={{
          transform: `translate(${offset.x}px, ${offset.y}px)`,
          transition: "transform 0.3s ease-out",
        }}
      >
        <div className="mb-3 flex items-center justify-between">
          <span className="text-xs font-medium text-foreground-muted">{t.heroVisual.activity}</span>
          <TrendingUp size={14} className="text-accent-2" strokeWidth={1.75} />
        </div>
        <div className="flex h-16 items-end gap-1.5">
          {[40, 65, 45, 80, 60, 95, 70].map((h, i) => (
            <div
              key={i}
              className="flex-1 rounded-sm bg-gradient-to-t from-accent/70 to-accent-2/70"
              style={{ height: `${h}%` }}
            />
          ))}
        </div>
      </div>

      {/* Card: código */}
      <div
        className="glass animate-float-slower absolute right-0 top-16 w-[48%] rounded-lg p-4 font-mono text-[11px] leading-relaxed shadow-soft sm:top-20"
        style={{
          transform: `translate(${offset.x * -1}px, ${offset.y * -1}px)`,
          transition: "transform 0.3s ease-out",
        }}
      >
        <div className="mb-2 flex gap-1.5">
          <span className="h-2 w-2 rounded-full bg-white/20" />
          <span className="h-2 w-2 rounded-full bg-white/20" />
          <span className="h-2 w-2 rounded-full bg-white/20" />
        </div>
        <p className="text-accent-2">const</p>
        <p className="pl-2 text-foreground-muted">
          solution = <span className="text-accent">build</span>(problem)
        </p>
        <p className="text-foreground-muted">{t.heroVisual.readyForProduction}</p>
      </div>

      {/* Card: mapa / GIS */}
      <div
        className="glass animate-float-slow absolute bottom-4 left-2 w-[68%] rounded-lg p-4 shadow-soft sm:bottom-8"
        style={{
          transform: `translate(${offset.x * 0.6}px, ${offset.y * 0.6}px)`,
          transition: "transform 0.3s ease-out",
        }}
      >
        <div className="mb-2 flex items-center gap-1.5 text-xs font-medium text-foreground-muted">
          <MapPin size={14} className="text-accent" strokeWidth={1.75} />
          {t.heroVisual.mapLots}
        </div>
        <div className="relative h-16 overflow-hidden rounded-md bg-white/5">
          <div className="bg-grid absolute inset-0 opacity-60" />
          {[
            [20, 30],
            [55, 20],
            [75, 55],
            [35, 65],
            [60, 70],
          ].map(([x, y], i) => (
            <span
              key={i}
              className="absolute h-1.5 w-1.5 rounded-full bg-accent-2"
              style={{ left: `${x}%`, top: `${y}%` }}
            />
          ))}
        </div>
      </div>

      {/* Card: check / entrega */}
      <div
        className="glass animate-pulse-slow absolute bottom-0 right-2 flex items-center gap-2 rounded-pill px-3 py-2 shadow-soft sm:right-6"
        style={{
          transform: `translate(${offset.x * -0.7}px, ${offset.y * -0.7}px)`,
          transition: "transform 0.3s ease-out",
        }}
      >
        <CheckCircle2 size={14} className="text-accent-2" strokeWidth={1.75} />
        <span className="text-xs font-medium text-foreground-muted">{t.heroVisual.deployActive}</span>
      </div>
    </div>
  );
}
