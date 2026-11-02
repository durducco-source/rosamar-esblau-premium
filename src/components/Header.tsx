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

  const light = !solid || open; // texto claro sobre el hero o el menú

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-[background-color,color,box-shadow] duration-700 ${
          open ? "text-cal" : solid ? "bg-cal/85 text-ink shadow-[0_1px_0_var(--line)] backdrop-blur-md" : "text-cal"
        }`}
      >
        <div className="wrap flex h-[72px] items-center justify-between">
          <a
            href="#inicio"
            onClick={(e) => { if (open) { e.preventDefault(); setOpen(false); goTo("#inicio"); } }}
            className="group flex flex-col leading-none"
            aria-label="Rosamar Es Blau, ir al inicio"
          >
            <span className={`kicker text-[9px] ${light ? "text-cal/70" : "text-ink/50"}`}>Rosamar</span>
            <span className="serif text-[26px] tracking-[0.02em]">Es Blau</span>
          </a>

          <div className="flex items-center gap-3 sm:gap-6">
            <a href={site.links.book} target="_blank" rel="noopener" className={`btn hidden sm:inline-flex ${light ? "btn-line" : "btn-mar"}`}>
              Reservar
            </a>
            <button
              ref={toggleRef}
              type="button"
              onClick={() => setOpen((o) => !o)}
              aria-expanded={open}
              aria-controls="menu"
              aria-label={open ? "Cerrar menú" : "Abrir menú"}
              className="group -mr-3 flex min-h-11 min-w-11 items-center justify-center gap-3 px-3"
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
            className="on-dark fixed inset-0 z-40 overflow-y-auto bg-mar text-cal"
            initial={{ clipPath: "inset(0% 0% 100% 0%)" }}
            animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
            exit={{ clipPath: "inset(0% 0% 100% 0%)" }}
            transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
          >
            <div className="wrap grid min-h-full gap-10 pb-10 pt-28 lg:grid-cols-[1.2fr_1fr] lg:items-center">
              <ul className="flex flex-col">
                {site.nav.map((item, i) => (
                  <li key={item.href} className="overflow-hidden border-b border-cal/10">
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
                      <span className="kicker w-6 text-laton">{item.n}</span>
                      <span className="serif text-[clamp(40px,7vw,92px)] transition-[transform,color] duration-500 group-hover:translate-x-3 group-hover:italic group-hover:text-laton">
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
                  className="grid gap-6 text-sm text-cal/75 sm:grid-cols-2"
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
        className={`fixed inset-x-0 bottom-0 z-30 grid grid-cols-[1fr_auto] border-t border-cal/10 bg-mar text-cal transition-transform duration-700 sm:hidden ${
          past && !open ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <a href={site.links.book} target="_blank" rel="noopener" className="kicker flex items-center justify-center gap-3 py-4">
          Reservar estancia <Icon name="arrow" />
        </a>
        <a href={site.links.phone} className="flex items-center border-l border-cal/15 px-5" aria-label={`Llamar al ${site.links.phoneLabel}`}>
          <Icon name="phone" size={18} />
        </a>
      </div>
    </>
  );
}
