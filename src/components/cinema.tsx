"use client";

// Primitivas del recorrido cinematográfico: escena fija ligada al scroll, foto con "cámara",
// palabra de capítulo y pie de foto. Todas las animaciones dependen del progreso de la escena (0 → 1).
import { motion, useScroll, useTransform, type MotionStyle, type MotionValue } from "motion/react";
import { useRef, type ReactNode, type RefObject } from "react";
import type { Img } from "@/content/site";
import { asset, fullRange, small } from "@/lib/utils";
import Icon from "./Icon";

export type P = MotionValue<number>;

/** Progreso de scroll de una escena: 0 cuando entra arriba, 1 cuando termina. */
export function useScene() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  return { ref, p: scrollYProgress };
}

/** useTransform con el rango completado de 0 a 1 (necesario con ScrollTimeline acelerado). */
export function useRange<T>(p: P, input: number[], output: T[]): MotionValue<T> {
  const [i, o] = fullRange(input, output);
  return useTransform(p, i, o) as MotionValue<T>;
}

/** Escena: sección alta con un "plató" fijo a pantalla completa. */
export function Scene({ id, label, vh, sceneRef, children }: { id: string; label: string; vh: number; sceneRef: RefObject<HTMLElement | null>; children: ReactNode }) {
  return (
    <section id={id} ref={sceneRef} data-chapter={id} aria-label={label} className="relative bg-deep" style={{ height: `${vh}svh` }}>
      <div className="sticky top-0 h-[100svh] overflow-hidden">{children}</div>
    </section>
  );
}

/** Foto a pantalla completa movida por la "cámara" (escala, desplazamiento, giro, recorte…). */
export function Still({ image, style, className = "", eager = false, preload = false }: { image: Img; style?: MotionStyle; className?: string; eager?: boolean; preload?: boolean }) {
  return (
    <motion.img
      src={asset(image.src)}
      srcSet={`${asset(small(image.src))} 900w, ${asset(image.src)} 1920w`}
      sizes="100vw"
      alt={image.alt}
      // preload: primera foto de cada escena, descargada pronto pero con prioridad baja para que no aparezca en negro
      loading={eager || preload ? "eager" : "lazy"}
      fetchPriority={eager ? "high" : preload ? "low" : "auto"}
      decoding="async"
      style={style}
      className={`grade absolute inset-0 h-full w-full object-cover will-change-transform ${className}`}
    />
  );
}

/** Velo cinematográfico: viñeta y degradados para leer el texto sin tapar la foto. */
export function Veil({ strength }: { strength?: MotionValue<number> }) {
  return (
    <>
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_90%_at_50%_45%,transparent_45%,rgba(10,9,8,.6)_100%)]" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[55%] bg-gradient-to-t from-deep/85 via-deep/25 to-transparent" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-36 bg-gradient-to-b from-deep/55 to-transparent" aria-hidden="true" />
      {strength && <motion.div style={{ opacity: strength }} className="pointer-events-none absolute inset-0 bg-deep" aria-hidden="true" />}
    </>
  );
}

/** Palabra de capítulo enorme y espaciada que se abre y se desenfoca al pasar. */
export function ChapterWord({ p, n, word, range }: { p: P; n: string; word: string; range: [number, number, number, number] }) {
  const opacity = useRange(p, range, [0, 1, 1, 0]);
  const spacing = useRange(p, range, ["0.7em", "0.3em", "0.36em", "0.8em"]);
  const blur = useRange(p, range, ["blur(12px)", "blur(0px)", "blur(0px)", "blur(10px)"]);
  return (
    <motion.div style={{ opacity }} className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center text-center" aria-hidden="true">
      <span className="kicker mb-5 text-fg/75">{n}</span>
      <motion.span style={{ letterSpacing: spacing, paddingLeft: spacing, filter: blur }} className="whitespace-nowrap text-[clamp(44px,11vw,190px)] font-[200] uppercase leading-none">
        {word}
      </motion.span>
    </motion.div>
  );
}

/** Pie de foto: número, frase corta y, opcionalmente, una línea y un botón píldora. */
export function Caption({
  p,
  range,
  n,
  title,
  sub,
  cta,
  align = "left",
  position = "bottom",
}: {
  p: P;
  range: [number, number, number, number];
  n?: string;
  title: string;
  sub?: string;
  cta?: { label: string; href: string; external?: boolean };
  align?: "left" | "right";
  position?: "bottom" | "top";
}) {
  const opacity = useRange(p, range, [0, 1, 1, 0]);
  const y = useRange(p, range, [36, 0, 0, -36]);
  const pointerEvents = useTransform(opacity, (o) => (o > 0.6 ? "auto" : "none"));
  return (
    <motion.div
      style={{ opacity, y, pointerEvents }}
      className={`wrap absolute inset-x-0 flex flex-col ${position === "top" ? "top-0 pt-24" : "bottom-0 pb-[clamp(96px,15vh,150px)]"} ${align === "right" ? "items-end text-right" : "items-start"}`}
    >
      {n && <span className="text-[clamp(26px,2.8vw,42px)] font-[200] text-accent">{n}</span>}
      <h3 className="mt-2 max-w-[16ch] text-[clamp(30px,3.6vw,56px)] font-[200] leading-[1.06]">{title}</h3>
      {sub && <p className="mt-4 max-w-sm text-[15px] leading-relaxed text-fg/75">{sub}</p>}
      {cta && (
        <a href={cta.href} {...(cta.external ? { target: "_blank", rel: "noopener" } : {})} className="btn btn-accent btn-sm mt-6">
          {cta.label} <Icon name="arrow" size={14} />
        </a>
      )}
    </motion.div>
  );
}
