"use client";

// Indicador fijo del recorrido (como el contador del vídeo de referencia): capítulo actual y progreso total.
import { motion, useScroll } from "motion/react";
import { useEffect, useState } from "react";
import { site } from "@/content/site";

export default function Hud() {
  const { scrollYProgress } = useScroll();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const sections = site.chapters.map((c) => document.getElementById(c.id)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setCurrent(site.chapters.findIndex((c) => c.id === e.target.id));
        }
      },
      { rootMargin: "-50% 0px -50% 0px" },
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  const c = site.chapters[Math.max(0, current)];
  return (
    <div className="pointer-events-none fixed bottom-7 right-[var(--gutter)] z-30 hidden items-center gap-4 sm:flex" aria-hidden="true">
      <span className="kicker tabular-nums text-fg/80">{c.n} · {c.label}</span>
      <span className="relative block h-px w-32 bg-fg/25">
        <motion.span className="absolute inset-0 origin-left bg-fg" style={{ scaleX: scrollYProgress }} />
      </span>
    </div>
  );
}
