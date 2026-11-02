"use client";

import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { site } from "@/content/site";
import { asset, EASE, small } from "@/lib/utils";
import Icon from "./Icon";
import { Reveal, SectionLabel, SplitHeading } from "./motion";

// Retícula tipo revista: cada foto ocupa un módulo distinto (12 columnas en escritorio).
const SPANS = [
  "col-span-2 md:col-span-7 md:row-span-2 aspect-[4/3] md:aspect-auto",
  "md:col-span-5 aspect-[4/5] md:aspect-auto",
  "md:col-span-5 aspect-[4/5] md:aspect-auto",
  "col-span-2 md:col-span-4 aspect-[16/10] md:aspect-auto",
  "md:col-span-3 md:row-span-2 aspect-[3/4] md:aspect-auto",
  "md:col-span-5 md:row-span-2 aspect-[3/4] md:aspect-auto",
  "col-span-2 md:col-span-4 aspect-[16/10] md:aspect-auto",
  "md:col-span-6 aspect-[4/5] md:aspect-auto",
  "md:col-span-6 aspect-[4/5] md:aspect-auto",
  "col-span-2 md:col-span-12 aspect-[16/9] md:aspect-auto md:row-span-2",
];

/** 04 · Galería — mosaico editorial con apariciones escalonadas y visor a pantalla completa. */
export default function Gallery() {
  const items = site.gallery;
  const [open, setOpen] = useState<number | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const lastTrigger = useRef<HTMLElement | null>(null);

  const go = useCallback((d: number) => setOpen((o) => (o === null ? o : (o + d + items.length) % items.length)), [items.length]);
  const close = useCallback(() => setOpen(null), []);

  useEffect(() => {
    if (open === null) return;
    const root = document.documentElement;
    root.style.overflow = "hidden";
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      root.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open, go, close]);

  // Al cerrar, el foco vuelve a la foto que abrió el visor
  useEffect(() => {
    if (open === null) lastTrigger.current?.focus();
  }, [open]);

  return (
    <section id="galeria" className="bg-cal pb-[clamp(100px,13vw,190px)] pt-[clamp(60px,8vw,120px)]">
      <div className="wrap">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <SectionLabel n="04" label="Galería" />
            <SplitHeading text="Un paseo *por el hotel.*" className="h2 mt-8" />
          </div>
          <Reveal><p className="kicker text-ink/50">{items.length} fotografías · pulsa para ampliar</p></Reveal>
        </div>

        <ul className="mt-14 grid grid-cols-2 gap-3 md:auto-rows-[clamp(160px,15vw,230px)] md:grid-cols-12 md:gap-4">
          {items.map((img, i) => (
            <motion.li
              key={img.src}
              className={`relative overflow-hidden bg-arena ${SPANS[i % SPANS.length]}`}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "0px 0px -8% 0px" }}
              transition={{ duration: 1.1, ease: EASE, delay: (i % 3) * 0.08 }}
            >
              <button
                type="button"
                onClick={(e) => { lastTrigger.current = e.currentTarget; setOpen(i); }}
                className="group absolute inset-0 h-full w-full cursor-zoom-in"
                aria-label={`Ampliar foto: ${img.alt}`}
              >
                <img
                  src={asset(i === 0 || i === items.length - 1 ? img.src : small(img.src))}
                  alt={img.alt}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover transition-transform duration-[1.4s] ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-[1.06]"
                />
                <span className="absolute inset-0 bg-mar/0 transition-colors duration-700 group-hover:bg-mar/25" />
                <span className="kicker absolute bottom-4 left-4 translate-y-3 text-[10px] text-cal opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                  {img.alt}
                </span>
              </button>
            </motion.li>
          ))}
        </ul>
      </div>

      <AnimatePresence>
        {open !== null && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={`Galería: ${items[open].alt}`}
            className="fixed inset-0 z-[70] flex flex-col bg-[#061c2b]/95 text-cal backdrop-blur"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            onClick={close}
          >
            <div className="wrap flex h-[72px] shrink-0 items-center justify-between">
              <span className="kicker text-cal/70">{String(open + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}</span>
              <button ref={closeRef} type="button" onClick={close} className="kicker flex items-center gap-3 py-2">
                Cerrar <Icon name="close" size={20} />
              </button>
            </div>
            <div className="relative flex min-h-0 flex-1 items-center justify-center px-4 sm:px-20" onClick={(e) => e.stopPropagation()}>
              <AnimatePresence mode="wait" initial={false}>
                <motion.img
                  key={open}
                  src={asset(items[open].src)}
                  alt={items[open].alt}
                  className="max-h-full max-w-full object-contain"
                  initial={{ opacity: 0, scale: 0.97, clipPath: "inset(0% 0% 0% 100%)" }}
                  animate={{ opacity: 1, scale: 1, clipPath: "inset(0% 0% 0% 0%)" }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.7, ease: EASE }}
                />
              </AnimatePresence>
              <button type="button" onClick={() => go(-1)} className="absolute left-2 top-1/2 -translate-y-1/2 p-3 transition-colors hover:text-laton sm:left-6" aria-label="Foto anterior">
                <Icon name="prev" size={30} />
              </button>
              <button type="button" onClick={() => go(1)} className="absolute right-2 top-1/2 -translate-y-1/2 p-3 transition-colors hover:text-laton sm:right-6" aria-label="Foto siguiente">
                <Icon name="next" size={30} />
              </button>
            </div>
            <p className="wrap py-6 text-center text-sm text-cal/70">{items[open].alt}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
