"use client";

import { AnimatePresence, motion, useScroll, useTransform } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { site } from "@/content/site";
import { asset } from "@/lib/utils";
import Icon from "./Icon";

const SLIDE_MS = 6500;

/** 01 · Home — portada a pantalla completa con fotos en fundido, zoom lento y titular por letras. */
export default function Hero() {
  const { slides } = site.hero;
  const [index, setIndex] = useState(0);
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  useEffect(() => {
    const t = window.setTimeout(() => setIndex((i) => (i + 1) % slides.length), SLIDE_MS);
    return () => window.clearTimeout(t);
  }, [index, slides.length]);

  return (
    <section id="inicio" ref={ref} className="on-dark relative h-[100svh] min-h-[600px] overflow-hidden bg-mar text-cal" aria-label="Rosamar Es Blau">
      {/* Cortina de entrada */}
      <div className="curtain pointer-events-none fixed inset-0 z-[60] flex items-center justify-center bg-mar" aria-hidden="true">
        <span className="curtain-mark serif text-4xl italic text-cal/80">Es Blau</span>
      </div>

      <motion.div className="absolute inset-0" style={{ y: imageY }}>
        <AnimatePresence initial={false}>
          <motion.img
            key={index}
            src={asset(slides[index].src)}
            alt={slides[index].alt}
            fetchPriority={index === 0 ? "high" : "auto"}
            className="absolute inset-0 h-full w-full object-cover"
            initial={{ opacity: 0, scale: 1.18 }}
            animate={{ opacity: 1, scale: 1.04, transition: { opacity: { duration: 1.6 }, scale: { duration: 9, ease: "linear" } } }}
            exit={{ opacity: 0, transition: { duration: 1.6 } }}
          />
        </AnimatePresence>
        {/* Precarga de la siguiente foto */}
        <link rel="preload" as="image" href={asset(slides[(index + 1) % slides.length].src)} />
      </motion.div>
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(6,28,43,.55)_0%,rgba(6,28,43,.05)_35%,rgba(6,28,43,.15)_60%,rgba(6,28,43,.8)_100%)]" aria-hidden="true" />

      <motion.div style={{ y: contentY, opacity: fade }} className="wrap relative flex h-full flex-col justify-end pb-28 sm:pb-32">
        <p className="kicker fade-up mb-6 text-cal/80" style={{ animationDelay: "1.4s" }}>{site.hero.kicker}</p>
        <h1 className="display">
          <span className="sr-only">Rosamar Es Blau</span>
          <span aria-hidden="true" className="block">
            <span className="block overflow-hidden pb-[0.06em] text-[0.42em] tracking-[0.04em]">
              {"Rosamar".split("").map((c, i) => (
                <span key={i} className="char" style={{ animationDelay: `${1.2 + i * 0.035}s` }}>{c}</span>
              ))}
            </span>
            <span className="block overflow-hidden pb-[0.1em] text-[2.45em] italic leading-[0.85] sm:text-[2.2em]">
              {"Es Blau".split("").map((c, i) => (
                <span key={i} className="char" style={{ animationDelay: `${1.35 + i * 0.06}s` }}>{c === " " ? " " : c}</span>
              ))}
            </span>
          </span>
        </h1>
        <div className="fade-up mt-8 flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between" style={{ animationDelay: "1.9s" }}>
          <p className="max-w-sm text-[15px] leading-relaxed text-cal/85">{site.hero.lead}</p>
          <div className="flex flex-wrap items-center gap-4">
            <a href={site.links.book} target="_blank" rel="noopener" className="btn btn-laton">
              Reservar estancia <Icon name="arrow" />
            </a>
            <a href="#experiencia" className="btn btn-line">Descubrir</a>
          </div>
        </div>
      </motion.div>

      {/* Indicadores de diapositiva */}
      <div className="wrap fade-up absolute inset-x-0 bottom-0 flex items-end justify-between gap-6 pb-7" style={{ animationDelay: "2.2s" }}>
        <div className="flex flex-1 gap-3 sm:max-w-xl">
          {slides.map((s, i) => (
            <button
              key={s.src}
              type="button"
              onClick={() => setIndex(i)}
              className="group flex flex-1 flex-col gap-2 text-left"
              aria-label={`Ver foto: ${s.caption}`}
              aria-current={i === index}
            >
              <span className="relative block h-px w-full overflow-hidden bg-cal/25">
                {i === index && <span key={index} className="progress absolute inset-0 bg-cal" />}
                {i < index && <span className="absolute inset-0 bg-cal/70" />}
              </span>
              <span className={`kicker hidden text-[9px] transition-colors md:block ${i === index ? "text-cal" : "text-cal/45 group-hover:text-cal/80"}`}>
                0{i + 1} · {s.caption}
              </span>
            </button>
          ))}
        </div>
        <span className="kicker hidden items-center gap-3 text-[9px] text-cal/70 sm:flex">
          Scroll <span className="relative block h-10 w-px overflow-hidden bg-cal/20"><span className="scroll-cue absolute inset-0 bg-cal" /></span>
        </span>
      </div>
    </section>
  );
}
