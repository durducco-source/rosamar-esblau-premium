"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { site } from "@/content/site";
import { asset, EASE, small } from "@/lib/utils";
import Icon from "./Icon";
import { ImageReveal, Reveal, SectionLabel, SplitHeading } from "./motion";

/** 03 · Instalaciones — índice de espacios con vista previa al pasar el ratón + habitaciones. */
export default function Facilities() {
  const items = site.facilities;
  const [active, setActive] = useState(0);

  return (
    <section id="instalaciones" className="border-t border-line py-[clamp(100px,13vw,190px)]">
      <div className="wrap">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div>
            <SectionLabel n="03" label="Instalaciones" />
            <SplitHeading text="Espacios para *no hacer nada.*" className="h2 mt-8 max-w-[14ch]" />
          </div>
          <Reveal delay={0.1}>
            <p className="max-w-sm text-[15px] leading-relaxed text-fg/70">
              120 habitaciones en 5 plantas, Vitality Spa, piscina al aire libre, solárium y Gym Centre en un hotel de nueva construcción.
            </p>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-12 lg:grid-cols-12">
          <ol className="lg:col-span-6">
            {items.map((f, i) => (
              <li key={f.name} className="border-b border-line first:border-t">
                <button
                  type="button"
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  onClick={() => setActive(i)}
                  aria-expanded={active === i}
                  className="group grid w-full grid-cols-[40px_1fr_auto] items-baseline gap-2 py-6 text-left"
                >
                  <span className={`kicker transition-colors ${active === i ? "text-accent" : "text-fg/40"}`}>0{i + 1}</span>
                  <span className={`serif text-[clamp(30px,3.4vw,54px)] transition-[transform,color] duration-500 ${active === i ? "translate-x-2 italic text-fg" : "text-fg/80 group-hover:translate-x-2"}`}>
                    {f.name}
                  </span>
                  <Icon name="plus" size={18} className={`transition-transform duration-500 ${active === i ? "rotate-45 text-accent" : "text-fg/40"}`} />
                </button>
                <AnimatePresence initial={false}>
                  {active === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.6, ease: EASE }}
                      className="overflow-hidden"
                    >
                      <div className="pb-7 pl-[48px]">
                        <p className="max-w-md text-[15px] leading-relaxed text-fg/70">{f.text}</p>
                        <img src={asset(small(f.image.src))} alt={f.image.alt} loading="lazy" className="mt-5 aspect-[16/10] w-full object-cover lg:hidden" />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            ))}
          </ol>

          {/* Vista previa fija (escritorio) */}
          <div className="hidden lg:col-span-5 lg:col-start-8 lg:block">
            <div className="sticky top-28 aspect-[4/5] overflow-hidden bg-bg2">
              <AnimatePresence initial={false}>
                <motion.img
                  key={active}
                  src={asset(items[active].image.src)}
                  alt={items[active].image.alt}
                  className="absolute inset-0 h-full w-full object-cover"
                  initial={{ clipPath: "inset(100% 0% 0% 0%)", scale: 1.15 }}
                  animate={{ clipPath: "inset(0% 0% 0% 0%)", scale: 1 }}
                  exit={{ opacity: 0, transition: { duration: 0.6, delay: 0.3 } }}
                  transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
                />
              </AnimatePresence>
              <span className="kicker absolute bottom-5 left-5 z-10 bg-bg/80 px-3 py-2 text-fg">{items[active].name}</span>
            </div>
          </div>
        </div>

        {/* Habitaciones */}
        <div id="habitaciones" className="mt-[clamp(90px,12vw,170px)] scroll-mt-20">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <SplitHeading text="Descansar *en pareja.*" as="h3" className="h2" />
            <Reveal><p className="max-w-sm text-sm leading-relaxed text-fg/60">Precios y disponibilidad según fechas en la web oficial.</p></Reveal>
          </div>
          <div className="mt-12 grid gap-14 md:grid-cols-2 md:gap-8">
            {site.rooms.map((r, i) => (
              <article key={r.name} className={i === 1 ? "md:mt-32" : ""}>
                <a href={site.links.book} target="_blank" rel="noopener" className="group block" aria-label={`Ver disponibilidad: ${r.name}`}>
                  <div className="overflow-hidden">
                    <ImageReveal src={r.image.src} alt={r.image.alt} className="aspect-[5/4] transition-transform duration-[1.2s] ease-out group-hover:scale-[1.03]" />
                  </div>
                </a>
                <Reveal className="mt-7 flex items-baseline justify-between gap-4 border-b border-line pb-5">
                  <h4 className="serif text-[clamp(32px,3vw,46px)]">{r.name}</h4>
                  <span className="kicker text-accent">{r.size}</span>
                </Reveal>
                <Reveal delay={0.1}>
                  <ul className="mt-5 grid gap-2 text-[15px] text-fg/75 sm:grid-cols-2">
                    {r.details.map((d) => <li key={d} className="flex gap-3"><span className="mt-[9px] h-px w-3 shrink-0 bg-accent" />{d}</li>)}
                  </ul>
                  <a href={site.links.book} target="_blank" rel="noopener" className="ulink kicker mt-7 inline-flex items-center gap-2 text-fg">
                    Ver disponibilidad <Icon name="arrow" />
                  </a>
                </Reveal>
              </article>
            ))}
          </div>
          <Reveal><p className="mt-16 max-w-3xl text-sm leading-relaxed text-fg/60">{site.roomsAll}</p></Reveal>
        </div>
      </div>
    </section>
  );
}
