"use client";

// 01 · Home — recorrido continuo controlado por el scroll (inspirado en la referencia):
// la "cámara" avanza desde la entrada del hotel, entra, recorre sus espacios numerados
// y termina de nuevo fuera, sobre la piscina. Cada foto avanza con zoom y se funde con la siguiente.
import { motion, useMotionValueEvent, useScroll, useTransform, type MotionValue } from "motion/react";
import { useRef, useState, type ReactNode } from "react";
import { site } from "@/content/site";
import { asset, fullRange, rich, small } from "@/lib/utils";
import Icon from "./Icon";

const { intro, enter, stops, outro } = site.journey;
const IMAGES = [intro.image, enter.image, ...stops.map((s) => s.image), outro.image];
const N = IMAGES.length;
const SEG = 1 / N;

export default function Journey() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const [index, setIndex] = useState(0);
  useMotionValueEvent(p, "change", (v) => setIndex(Math.min(N - 1, Math.floor(v * N))));
  const cue = useTransform(p, ...fullRange([0, SEG * 0.4], [1, 0]));

  return (
    <section id="inicio" ref={ref} className="relative bg-deep" style={{ height: `${N * 100}svh` }} aria-label="Recorrido por el Hotel Rosamar Es Blau">
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        {IMAGES.map((img, i) => (
          <Frame key={img.src} i={i} p={p} src={img.src} alt={img.alt} />
        ))}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_90%_at_50%_45%,transparent_40%,rgba(10,9,8,.55)_100%)]" aria-hidden="true" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[55%] bg-gradient-to-t from-deep/85 via-deep/30 to-transparent" aria-hidden="true" />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-deep/60 to-transparent" aria-hidden="true" />

        {/* 0 · Título de marca enorme y espaciado */}
        <Overlay i={0} p={p} className="items-center justify-center text-center">
          <p className="kicker fade-up mb-6 text-fg/80" style={{ animationDelay: ".6s" }}>{intro.kicker}</p>
          <h1 className="brand-xl track-in text-[clamp(54px,13.5vw,230px)]">
            <span className="sr-only">Rosamar </span>Es Blau
          </h1>
          <p className="kicker fade-up mt-7 text-fg/70" style={{ animationDelay: "1.1s" }}>{intro.sub}</p>
        </Overlay>

        {/* 1 · "Pasa dentro" */}
        <Overlay i={1} p={p} className="items-center justify-center text-center">
          <p className="text-[clamp(48px,8vw,140px)] font-[200] leading-[0.95] tracking-[-0.02em]">
            {enter.title.split(" ").map((w) => <span key={w} className="block">{w}</span>)}
          </p>
        </Overlay>

        {/* 2..n · Paradas numeradas */}
        {stops.map((s, k) => (
          <Overlay key={s.n} i={k + 2} p={p} className="items-start justify-end pb-[clamp(96px,14vh,150px)]">
            <span className="text-[clamp(30px,3.2vw,48px)] font-[200] text-accent">{s.n}</span>
            <p className="mt-3 max-w-[17ch] text-[clamp(28px,3.4vw,52px)] font-[200] leading-[1.08]">{s.text}</p>
            <a href={s.cta.href} className="btn btn-accent btn-sm mt-7">{s.cta.label} <Icon name="arrow" size={14} /></a>
          </Overlay>
        ))}

        {/* Última · de vuelta fuera, sobre el mar */}
        <Overlay i={N - 1} p={p} last className="items-start justify-end pb-[clamp(96px,14vh,150px)]">
          <h2 className="display max-w-[12ch]">{rich(outro.title)}</h2>
          <p className="mt-5 max-w-md text-[16px] leading-relaxed text-fg/80">{outro.text}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href={site.links.book} target="_blank" rel="noopener" className="btn btn-accent">Reservar estancia <Icon name="arrow" size={14} /></a>
            <a href="#ubicacion" className="btn btn-line">Cómo llegar</a>
          </div>
        </Overlay>

        {/* Indicador del recorrido */}
        <div className="wrap pointer-events-none absolute inset-x-0 bottom-0 flex items-center justify-end gap-4 pb-7">
          <span className="kicker tabular-nums text-fg/75">{String(index + 1).padStart(2, "0")} / {String(N).padStart(2, "0")}</span>
          <span className="relative block h-px w-24 bg-fg/25 sm:w-40">
            <motion.span className="absolute inset-0 origin-left bg-fg" style={{ scaleX: p }} />
          </span>
        </div>
        <motion.div style={{ opacity: cue }} className="kicker pointer-events-none absolute bottom-7 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-3 text-[9px] text-fg/70 sm:flex">
          Desliza para entrar
          <span className="relative block h-10 w-px overflow-hidden bg-fg/20"><span className="scroll-cue absolute inset-0 bg-fg" /></span>
        </motion.div>
      </div>
    </section>
  );
}

/** Foto a pantalla completa: aparece fundiéndose y avanza con un zoom de cámara. La última hace el gesto inverso (salir). */
function Frame({ i, p, src, alt }: { i: number; p: MotionValue<number>; src: string; alt: string }) {
  const start = i * SEG;
  const opacity = useTransform(p, ...fullRange(i === 0 ? [0, 1] : [start - SEG * 0.5, start], i === 0 ? [1, 1] : [0, 1]));
  const last = i === N - 1;
  const scale = useTransform(p, ...fullRange([Math.max(0, start - SEG * 0.5), Math.min(1, start + SEG)], last ? [1.35, 1.02] : [1.02, 1.34]));
  return (
    <motion.img
      src={asset(src)}
      srcSet={`${asset(small(src))} 900w, ${asset(src)} 1920w`}
      sizes="100vw"
      alt={alt}
      loading={i < 2 ? "eager" : "lazy"}
      fetchPriority={i === 0 ? "high" : "auto"}
      decoding="async"
      style={{ opacity, scale }}
      className="absolute inset-0 h-full w-full object-cover will-change-transform [filter:saturate(1.08)_sepia(.16)_brightness(.84)]"
    />
  );
}

/** Texto de cada parada: entra y sale en su tramo del recorrido; sólo es clicable mientras se ve. */
function Overlay({ i, p, last = false, className, children }: { i: number; p: MotionValue<number>; last?: boolean; className: string; children: ReactNode }) {
  const start = i * SEG;
  const input = i === 0 ? [0, SEG * 0.55, SEG * 0.85] : last ? [start - SEG * 0.1, start + SEG * 0.25] : [start - SEG * 0.05, start + SEG * 0.2, start + SEG * 0.7, start + SEG * 0.92];
  const out = i === 0 ? [1, 1, 0] : last ? [0, 1] : [0, 1, 1, 0];
  const opacity = useTransform(p, ...fullRange(input, out));
  const y = useTransform(p, ...fullRange(input, i === 0 ? [0, 0, -40] : last ? [40, 0] : [40, 0, 0, -40]));
  const pointerEvents = useTransform(opacity, (o) => (o > 0.6 ? "auto" : "none"));
  return (
    <motion.div style={{ opacity, y, pointerEvents }} className={`wrap absolute inset-0 flex flex-col ${className}`}>
      {children}
    </motion.div>
  );
}
