"use client";

// Primitivas de animación reutilizables (Motion / Framer Motion).
import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
import { useRef, type ReactNode } from "react";
import { asset, EASE } from "@/lib/utils";

const VIEW = { once: true, margin: "0px 0px -12% 0px" } as const;

/** Aparición suave hacia arriba al entrar en pantalla. */
export function Reveal({ children, delay = 0, className = "" }: { children: ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VIEW}
      transition={{ duration: 1.1, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  );
}

/** Titular cuyas palabras suben una a una desde una máscara. */
export function SplitHeading({ text, as = "h2", className = "" }: { text: string; as?: "h2" | "h3" | "p"; className?: string }) {
  const Tag = motion[as];
  const words = text.split(/(\*[^*]+\*)/g).flatMap((part) => {
    const em = part.startsWith("*");
    return part.replace(/\*/g, "").split(" ").filter(Boolean).map((w) => ({ w, em }));
  });
  return (
    <Tag className={className} initial="hidden" whileInView="show" viewport={VIEW} transition={{ staggerChildren: 0.06 }}>
      {words.map(({ w, em }, i) => (
        <span key={i} className="inline-block overflow-hidden pb-[0.08em] align-top">
          <motion.span
            className="inline-block"
            variants={{ hidden: { y: "110%" }, show: { y: 0, transition: { duration: 1, ease: EASE } } }}
          >
            {em ? <em>{w}</em> : w}
          </motion.span>
          {i < words.length - 1 && " "}
        </span>
      ))}
    </Tag>
  );
}

/** Imagen que se descubre con una cortina (clip-path), con zoom de salida y parallax sutil. */
export function ImageReveal({
  src,
  alt,
  className = "",
  parallax = 8,
  from = "bottom",
  eager = false,
}: {
  src: string;
  alt: string;
  className?: string;
  parallax?: number;
  from?: "bottom" | "left" | "right";
  eager?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [`-${parallax}%`, `${parallax}%`]);
  const hidden = { bottom: "inset(100% 0% 0% 0%)", left: "inset(0% 100% 0% 0%)", right: "inset(0% 0% 0% 100%)" }[from];
  return (
    <motion.div
      ref={ref}
      className={`relative overflow-hidden bg-arena ${className}`}
      initial={{ clipPath: hidden }}
      whileInView={{ clipPath: "inset(0% 0% 0% 0%)" }}
      viewport={VIEW}
      transition={{ duration: 1.5, ease: [0.76, 0, 0.24, 1] }}
    >
      <motion.img
        src={asset(src)}
        alt={alt}
        loading={eager ? "eager" : "lazy"}
        decoding="async"
        style={{ y }}
        initial={{ scale: 1.3 }}
        whileInView={{ scale: 1.16 }}
        viewport={VIEW}
        transition={{ duration: 2.2, ease: EASE }}
        className="absolute inset-0 h-full w-full object-cover"
      />
    </motion.div>
  );
}

/** Párrafo que se ilumina palabra a palabra según avanza el scroll. */
export function ScrollWords({ text, className = "" }: { text: string; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 85%", "end 45%"] });
  const words = text.split(" ");
  return (
    <p ref={ref} className={className}>
      {words.map((w, i) => (
        <Word key={i} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]}>
          {w}
        </Word>
      ))}
    </p>
  );
}

function Word({ children, progress, range }: { children: string; progress: MotionValue<number>; range: [number, number] }) {
  const opacity = useTransform(progress, range, [0.14, 1]);
  return (
    <>
      <motion.span style={{ opacity }}>{children}</motion.span>{" "}
    </>
  );
}

/** Etiqueta numerada de sección: "02 — Experiencia". */
export function SectionLabel({ n, label, dark = false }: { n: string; label: string; dark?: boolean }) {
  return (
    <Reveal className={`kicker flex items-center gap-4 ${dark ? "text-cal/70" : "text-ink/60"}`}>
      <span className={dark ? "text-laton" : "text-blau"}>{n}</span>
      <span className={`h-px w-10 ${dark ? "bg-cal/30" : "bg-ink/25"}`} />
      <span>{label}</span>
    </Reveal>
  );
}
