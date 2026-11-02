"use client";

// 06 Fragmentos — tira de película horizontal ligada al scroll: fotos a distintas alturas y tamaños,
// cada una con su propio parallax. Al pulsar se abren a pantalla completa.
import { AnimatePresence, motion, useTransform } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { site } from "@/content/site";
import { asset, EASE, small } from "@/lib/utils";
import { Scene, useRange, useScene } from "./cinema";
import Icon from "./Icon";

// Formato y altura de cada fotograma (ritmo irregular, como un montaje)
const SHAPES = [
  "h-[58svh] w-[70vw] md:w-[38vw] translate-y-[4svh]",
  "h-[40svh] w-[62vw] md:w-[26vw] -translate-y-[16svh]",
  "h-[50svh] w-[74vw] md:w-[34vw] translate-y-[12svh]",
  "h-[64svh] w-[66vw] md:w-[30vw] -translate-y-[2svh]",
  "h-[42svh] w-[70vw] md:w-[32vw] translate-y-[16svh]",
  "h-[56svh] w-[64vw] md:w-[28vw] -translate-y-[10svh]",
  "h-[46svh] w-[76vw] md:w-[36vw] translate-y-[8svh]",
  "h-[60svh] w-[66vw] md:w-[30vw] -translate-y-[6svh]",
];

export default function FilmStrip() {
  const { ref, p } = useScene();
  const items = site.fragments;
  const c = site.chapters.find((x) => x.id === "fragmentos")!;
  const trackRef = useRef<HTMLUListElement>(null);
  const dims = useRef({ track: 0, vw: 0 });
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => { dims.current = { track: el.scrollWidth, vw: window.innerWidth }; });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  const x = useTransform(p, (v) => {
    const { track, vw } = dims.current;
    return vw * 0.15 - v * (track - vw * 0.7);
  });
  const innerX = useRange(p, [0, 1], ["8%", "-8%"]);
  const titleOpacity = useRange(p, [0, 0.08, 0.9, 1], [0, 1, 1, 0]);

  // Visor
  const [open, setOpen] = useState<number | null>(null);
  const lastTrigger = useRef<HTMLButtonElement | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const close = useCallback(() => setOpen(null), []);
  const go = useCallback((d: number) => setOpen((o) => (o === null ? o : (o + d + items.length) % items.length)), [items.length]);
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
    const trigger = lastTrigger.current;
    return () => {
      root.style.overflow = "";
      window.removeEventListener("keydown", onKey);
      trigger?.focus();
    };
  }, [open, close, go]);

  return (
    <>
      <Scene id="fragmentos" label="Fragmentos del hotel" vh={340} sceneRef={ref}>
        <motion.div style={{ opacity: titleOpacity }} className="wrap pointer-events-none absolute inset-x-0 top-24 flex items-baseline gap-4">
          <span className="text-[clamp(22px,2.2vw,32px)] font-[200] text-accent">{c.n}</span>
          <h2 className="text-[clamp(22px,2.2vw,32px)] font-[200] uppercase tracking-[0.3em]">{c.label}</h2>
        </motion.div>
        <motion.ul ref={trackRef} style={{ x }} className="absolute top-1/2 flex -translate-y-1/2 items-center gap-[5vw] will-change-transform md:gap-[3vw]">
          {items.map((im, i) => (
            <li key={im.src + i} className={`relative shrink-0 ${SHAPES[i % SHAPES.length]}`}>
              <button
                type="button"
                onClick={(e) => { lastTrigger.current = e.currentTarget; setOpen(i); }}
                className="group relative block h-full w-full cursor-zoom-in overflow-hidden"
                aria-label={`Ampliar: ${im.alt}`}
              >
                <motion.img
                  src={asset(small(im.src))}
                  alt={im.alt}
                  loading="lazy"
                  decoding="async"
                  style={{ x: innerX, scale: 1.22 }}
                  className="grade h-full w-full object-cover transition-[filter] duration-700 group-hover:brightness-110"
                />
              </button>
              <span className="kicker mt-3 block text-[9px] text-fg/55">{String(i + 1).padStart(2, "0")} · {im.alt}</span>
            </li>
          ))}
        </motion.ul>
      </Scene>

      <AnimatePresence>
        {open !== null && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={items[open].alt}
            className="fixed inset-0 z-[70] flex flex-col bg-deep/95 backdrop-blur"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45 }}
            onClick={close}
          >
            <div className="wrap flex h-16 shrink-0 items-center justify-between">
              <span className="kicker text-fg/70">{String(open + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}</span>
              <button ref={closeRef} type="button" onClick={close} className="kicker flex min-h-11 items-center gap-3">
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
                  initial={{ opacity: 0, scale: 1.04 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.6, ease: EASE }}
                />
              </AnimatePresence>
              <button type="button" onClick={() => go(-1)} className="absolute left-1 top-1/2 -translate-y-1/2 p-3 hover:text-accent sm:left-6" aria-label="Foto anterior"><Icon name="prev" size={30} /></button>
              <button type="button" onClick={() => go(1)} className="absolute right-1 top-1/2 -translate-y-1/2 p-3 hover:text-accent sm:right-6" aria-label="Foto siguiente"><Icon name="next" size={30} /></button>
            </div>
            <p className="wrap py-6 text-center text-sm text-fg/70">{items[open].alt}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
