"use client";

import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { site } from "@/content/site";
import { asset, EASE } from "@/lib/utils";
import Icon from "./Icon";

/** Desplaza hasta un ancla después de cerrar el menú (cuando el scroll ya está desbloqueado). */
function goTo(href: string) {
  window.setTimeout(() => {
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    history.replaceState(null, "", href);
  }, 80);
}

export default function Header() {
  const [open, setOpen] = useState(false);
  const [solid, setSolid] = useState(false);
  const [past, setPast] = useState(false);
  const [hover, setHover] = useState(0);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (v) => {
    setSolid(v > 40);
    setPast(v > window.innerHeight * 0.9);
  });

  // Menú abierto: bloquea el scroll, Escape para cerrar y devuelve el foco al botón
  useEffect(() => {
    if (!open) return;
    const root = document.documentElement;
    root.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    const toggle = toggleRef.current;
    return () => {
      root.style.overflow = "";
      window.removeEventListener("keydown", onKey);
      toggle?.focus();
    };
  }, [open]);


  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-[background-color,color,box-shadow] duration-700 ${
          open ? "text-fg" : solid ? "bg-bg/85 text-fg shadow-[0_1px_0_var(--line)] backdrop-blur-md" : "bg-deep/25 text-fg shadow-[0_1px_0_rgba(242,236,226,.08)] backdrop-blur-[3px]"
        }`}
      >
        <div className="wrap flex h-16 items-center justify-between gap-6">
          <a
            href="#inicio"
            onClick={(e) => { if (open) { e.preventDefault(); setOpen(false); goTo("#inicio"); } }}
            className="group flex flex-col leading-none"
            aria-label="Rosamar Es Blau, ir al inicio"
          >
            <span className="kicker text-[8px] text-fg/60">Rosamar</span>
            <span className="mt-1 text-[15px] font-normal uppercase tracking-[0.42em]">Es Blau</span>
          </a>

          <nav aria-label="Secciones" className="hidden lg:block">
            <ul className="flex items-center gap-8">
              {site.nav.slice(1).map((item) => (
                <li key={item.href}><a href={item.href} className="kicker ulink text-fg/80 transition-colors hover:text-fg">{item.label}</a></li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-3 sm:gap-6">
            <a href={site.links.book} target="_blank" rel="noopener" className="btn btn-line btn-sm hidden sm:inline-flex">
              Reservar
            </a>
            <button
              ref={toggleRef}
              type="button"
              onClick={() => setOpen((o) => !o)}
              aria-expanded={open}
              aria-controls="menu"
              aria-label={open ? "Cerrar menú" : "Abrir menú"}
              className="group -mr-3 flex min-h-11 lg:hidden min-w-11 items-center justify-center gap-3 px-3"
            >
              <span className="kicker hidden sm:inline" aria-hidden="true">{open ? "Cerrar" : "Menú"}</span>
              <span className="relative block h-3 w-8" aria-hidden="true">
                <span className={`absolute left-0 h-px w-full bg-current transition-transform duration-500 ${open ? "top-1.5 rotate-45" : "top-0 group-hover:scale-x-75"} origin-center`} />
                <span className={`absolute left-0 h-px w-full bg-current transition-transform duration-500 ${open ? "top-1.5 -rotate-45" : "top-3"}`} />
              </span>
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.nav
            id="menu"
            aria-label="Menú principal"
            className="on-dark fixed inset-0 z-40 overflow-y-auto bg-deep text-fg"
            initial={{ clipPath: "inset(0% 0% 100% 0%)" }}
            animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
            exit={{ clipPath: "inset(0% 0% 100% 0%)" }}
            transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
          >
            <div className="wrap grid min-h-full gap-10 pb-10 pt-28 lg:grid-cols-[1.2fr_1fr] lg:items-center">
              <ul className="flex flex-col">
                {site.nav.map((item, i) => (
                  <li key={item.href} className="overflow-hidden border-b border-fg/10">
                    <motion.a
                      href={item.href}
                      onClick={(e) => { e.preventDefault(); setOpen(false); goTo(item.href); }}
                      onMouseEnter={() => setHover(i)}
                      onFocus={() => setHover(i)}
                      className="group flex items-baseline gap-5 py-3 sm:py-4"
                      initial={{ y: "100%" }}
                      animate={{ y: 0 }}
                      transition={{ duration: 0.9, ease: EASE, delay: 0.35 + i * 0.06 }}
                    >
                      <span className="kicker w-6 text-accent">{item.n}</span>
                      <span className="serif text-[clamp(40px,7vw,92px)] transition-[transform,color] duration-500 group-hover:translate-x-3 group-hover:text-accent">
                        {item.label}
                      </span>
                    </motion.a>
                  </li>
                ))}
              </ul>

              <div className="flex flex-col gap-8">
                <div className="relative hidden aspect-[4/5] max-h-[56vh] overflow-hidden lg:block">
                  <AnimatePresence initial={false}>
                    <motion.img
                      key={hover}
                      src={asset(site.nav[hover].image)}
                      alt=""
                      className="absolute inset-0 h-full w-full object-cover"
                      initial={{ opacity: 0, scale: 1.12 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.9, ease: EASE }}
                    />
                  </AnimatePresence>
                </div>
                <motion.div
                  className="grid gap-6 text-sm text-fg/75 sm:grid-cols-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8, duration: 0.8 }}
                >
                  <p>{site.location.address.join(", ")}</p>
                  <div className="flex flex-col gap-2">
                    <a className="ulink self-start" href={site.links.phone}>{site.links.phoneLabel}</a>
                    <a className="ulink self-start" href={site.links.book} target="_blank" rel="noopener">Reservar en la web oficial</a>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>

      {/* Barra de reserva fija en móvil (aparece tras el hero) */}
      <div
        className={`fixed inset-x-0 bottom-0 z-30 grid grid-cols-[1fr_auto] border-t border-fg/10 bg-deep text-fg transition-transform duration-700 sm:hidden ${
          past && !open ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <a href={site.links.book} target="_blank" rel="noopener" className="kicker flex items-center justify-center gap-3 py-4">
          Reservar estancia <Icon name="arrow" />
        </a>
        <a href={site.links.phone} className="flex items-center border-l border-fg/15 px-5" aria-label={`Llamar al ${site.links.phoneLabel}`}>
          <Icon name="phone" size={18} />
        </a>
      </div>
    </>
  );
}
