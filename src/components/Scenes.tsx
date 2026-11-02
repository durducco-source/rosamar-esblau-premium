"use client";

// Las escenas del recorrido. Cada una usa un movimiento de cámara distinto:
// avance, picado de dron, barrido, puerta corredera, travelling, retroceso, capas de profundidad y panorámica vertical.
import { motion, useTransform } from "motion/react";
import { useEffect, useRef } from "react";
import { site } from "@/content/site";
import { asset, rich, small } from "@/lib/utils";
import { Caption, ChapterWord, Scene, Still, Veil, useRange, useScene } from "./cinema";
import Icon from "./Icon";

const ch = (id: string) => site.chapters.find((c) => c.id === id)!;

/** Llegada — avance hacia la fachada, el nombre se abre y se cruza al vestíbulo. */
export function Arrival() {
  const { ref, p } = useScene();
  const a = site.arrival;
  const facadeScale = useRange(p, [0, 0.6], [1.02, 1.4]);
  const hallOpacity = useRange(p, [0.4, 0.56], [0, 1]);
  const hallScale = useRange(p, [0.4, 1], [1.1, 1.45]);
  const titleOpacity = useRange(p, [0, 0.2, 0.34], [1, 1, 0]);
  const titleSpacing = useRange(p, [0, 0.34], ["0.28em", "0.75em"]);
  const titleBlur = useRange(p, [0.12, 0.34], ["blur(0px)", "blur(14px)"]);
  const enterOpacity = useRange(p, [0.56, 0.66, 0.86, 0.97], [0, 1, 1, 0]);
  const enterScale = useRange(p, [0.56, 0.97], [0.9, 1.18]);
  const cue = useRange(p, [0, 0.08], [1, 0]);

  return (
    <Scene id="llegada" label="Llegada al hotel" vh={320} sceneRef={ref}>
      <Still image={a.facade} eager style={{ scale: facadeScale }} />
      <Still image={a.hall} eager style={{ opacity: hallOpacity, scale: hallScale }} />
      <Veil />
      <div className="pointer-events-none absolute inset-0 bg-deep/20" aria-hidden="true" />

      <motion.div style={{ opacity: titleOpacity }} className="absolute inset-0 flex flex-col items-center justify-center text-center">
        <p className="kicker fade-up mb-6 text-fg/85" style={{ animationDelay: ".7s" }}>{a.kicker}</p>
        <motion.h1
          style={{ letterSpacing: titleSpacing, paddingLeft: titleSpacing, filter: titleBlur }}
          className="track-in whitespace-nowrap text-[clamp(52px,13vw,224px)] font-[200] uppercase leading-none"
        >
          <span className="sr-only">Rosamar </span>Es Blau
        </motion.h1>
        <p className="kicker fade-up mt-7 text-fg/75" style={{ animationDelay: "1.2s" }}>{a.sub}</p>
      </motion.div>

      <motion.p style={{ opacity: enterOpacity, scale: enterScale }} className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center text-center text-[clamp(48px,8vw,140px)] font-[200] leading-[0.95]">
        {a.enter.split(" ").map((w) => <span key={w}>{w}</span>)}
      </motion.p>

      <motion.div style={{ opacity: cue }} className="kicker pointer-events-none absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-3 text-[9px] text-fg/75">
        Desliza para entrar
        <span className="relative block h-10 w-px overflow-hidden bg-fg/20"><span className="scroll-cue absolute inset-0 bg-fg" /></span>
      </motion.div>
    </Scene>
  );
}

/** 01 Agua — picado de dron sobre la piscina, barrido a ras de agua y retroceso. */
export function Water() {
  const { ref, p } = useScene();
  const w = site.water;
  const aerialScale = useRange(p, [0, 0.44], [1.02, 1.8]);
  const aerialRotate = useRange(p, [0, 0.44], [0, 8]);
  const aerialOpacity = useRange(p, [0.36, 0.46], [1, 0]);
  const poolOpacity = useRange(p, [0.36, 0.46], [0, 1]);
  const poolX = useRange(p, [0.36, 0.82], ["-7%", "7%"]);
  const loungersOpacity = useRange(p, [0.76, 0.86], [0, 1]);
  const loungersScale = useRange(p, [0.76, 1], [1.32, 1.04]);
  const c = ch("agua");

  return (
    <Scene id="agua" label="Agua: la piscina" vh={420} sceneRef={ref}>
      <Still image={w.pool} preload style={{ opacity: poolOpacity, x: poolX, scale: 1.2 }} />
      <Still image={w.aerial} preload style={{ opacity: aerialOpacity, scale: aerialScale, rotate: aerialRotate }} />
      <Still image={w.loungers} style={{ opacity: loungersOpacity, scale: loungersScale }} />
      <Veil />
      <ChapterWord p={p} n={c.n} word={c.label} range={[0.03, 0.11, 0.24, 0.33]} />
      <Caption p={p} range={[0.48, 0.54, 0.72, 0.78]} n={c.n} title={w.title} sub={w.sub} />
    </Scene>
  );
}

/** 02 Calma — el spa se abre como una puerta corredera y un travelling recorre sus espacios. */
export function Calm() {
  const { ref, p } = useScene();
  const s = site.calm;
  const clip = useRange(p, [0.02, 0.3], ["inset(0% 47% 0% 47%)", "inset(0% 0% 0% 0%)"]);
  const doorScale = useRange(p, [0.02, 0.36], [1.5, 1.08]);
  const dim = useRange(p, [0.32, 0.42], [0, 0.72]);
  const innerX = useRange(p, [0.34, 1], ["7%", "-7%"]);
  const c = ch("calma");

  // Travelling horizontal: la tira entra por la derecha y cruza toda la pantalla
  const trackRef = useRef<HTMLDivElement>(null);
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
    const t = Math.min(1, Math.max(0, (v - 0.34) / 0.66));
    return vw - t * (track + vw * 0.35);
  });
  const trackOpacity = useRange(p, [0.32, 0.38], [0, 1]);

  return (
    <Scene id="calma" label="Calma: el Vitality Spa" vh={460} sceneRef={ref}>
      <motion.div style={{ clipPath: clip }} className="absolute inset-0">
        <Still image={s.door} preload style={{ scale: doorScale }} />
      </motion.div>
      <motion.div style={{ opacity: dim }} className="pointer-events-none absolute inset-0 bg-deep" aria-hidden="true" />
      <ChapterWord p={p} n={c.n} word={c.label} range={[0, 0.06, 0.18, 0.27]} />

      <motion.div ref={trackRef} style={{ x, opacity: trackOpacity }} className="absolute top-[60%] flex -translate-y-1/2 items-center gap-[4vw] will-change-transform">
        {s.track.map((im, i) => (
          <figure key={im.src} className={`relative shrink-0 overflow-hidden ${i % 2 ? "h-[42svh] w-[72vw] md:w-[40vw]" : "h-[54svh] w-[66vw] md:w-[32vw]"} ${i % 2 ? "-translate-y-[6svh]" : "translate-y-[5svh]"}`}>
            <motion.img
              src={asset(small(im.src))}
              srcSet={`${asset(small(im.src))} 900w, ${asset(im.src)} 1920w`}
              sizes="(min-width: 768px) 42vw, 72vw"
              alt={im.alt}
              loading="lazy"
              decoding="async"
              style={{ x: innerX, scale: 1.2 }}
              className="grade h-full w-full object-cover"
            />
            <figcaption className="kicker absolute bottom-3 left-3 text-[9px] text-fg/85">{im.alt}</figcaption>
          </figure>
        ))}
      </motion.div>
      <Caption p={p} range={[0.4, 0.46, 0.93, 0.99]} n={c.n} title={s.title} sub={s.sub} position="top" />
    </Scene>
  );
}

/** 03 Descanso — la cámara empieza pegada a la cama y retrocede; deriva lateral a la suite. */
export function Rest() {
  const { ref, p } = useScene();
  const r = site.rest;
  const roomScale = useRange(p, [0, 0.56], [2.1, 1.02]);
  const suiteOpacity = useRange(p, [0.52, 0.62], [0, 1]);
  const suiteX = useRange(p, [0.52, 1], ["4%", "-4%"]);
  const c = ch("descanso");
  return (
    <Scene id="descanso" label="Descanso: las habitaciones" vh={320} sceneRef={ref}>
      <Still image={r.room} preload style={{ scale: roomScale, transformOrigin: "52% 64%" }} />
      <Still image={r.suite} style={{ opacity: suiteOpacity, x: suiteX, scale: 1.12 }} />
      <Veil />
      <ChapterWord p={p} n={c.n} word={c.label} range={[0.03, 0.1, 0.24, 0.33]} />
      <Caption p={p} range={[0.64, 0.7, 0.92, 0.98]} n={c.n} title={r.title} sub={r.sub} cta={{ label: "Ver disponibilidad", href: site.links.book, external: true }} />
    </Scene>
  );
}

/** 04 Mesa — profundidad: el restaurante al fondo y fotos que suben a distinta velocidad. */
export function Table() {
  const { ref, p } = useScene();
  const t = site.table;
  const backScale = useRange(p, [0, 1], [1.05, 1.32]);
  const backY = useRange(p, [0, 1], ["0%", "-5%"]);
  // Las fotos entran por abajo y cruzan la pantalla: la cercana más rápido que la lejana (profundidad)
  const nearY = useRange(p, [0.18, 0.95], ["0svh", "-175svh"]);
  const farY = useRange(p, [0.08, 1], ["0svh", "-150svh"]);
  const c = ch("mesa");
  return (
    <Scene id="mesa" label="Mesa: la gastronomía" vh={360} sceneRef={ref}>
      <Still image={t.back} preload style={{ scale: backScale, y: backY }} />
      <Veil />
      <div className="pointer-events-none absolute inset-0 bg-deep/25" aria-hidden="true" />
      <motion.figure style={{ y: farY }} className="absolute right-[34%] top-full w-[44vw] overflow-hidden shadow-2xl md:right-[30%] md:w-[24vw]">
        <img src={asset(small(t.cards[0].src))} alt={t.cards[0].alt} loading="lazy" className="grade aspect-[4/5] w-full object-cover" />
      </motion.figure>
      <motion.figure style={{ y: nearY }} className="absolute right-[5%] top-full w-[52vw] overflow-hidden shadow-2xl md:right-[8%] md:w-[30vw]">
        <img src={asset(small(t.cards[1].src))} alt={t.cards[1].alt} loading="lazy" className="grade aspect-[3/4] w-full object-cover" />
      </motion.figure>
      <ChapterWord p={p} n={c.n} word={c.label} range={[0.02, 0.1, 0.22, 0.3]} />
      <Caption p={p} range={[0.36, 0.42, 0.88, 0.95]} n={c.n} title={t.title} sub={t.sub} />
    </Scene>
  );
}

/** 05 Luz — panorámica vertical hacia el cielo del solárium y avance hacia la terraza. */
export function Light() {
  const { ref, p } = useScene();
  const l = site.light;
  const tilt = useRange(p, [0, 0.58], ["-26%", "0%"]);
  const terraceOpacity = useRange(p, [0.5, 0.6], [0, 1]);
  const terraceScale = useRange(p, [0.5, 1], [1.02, 1.28]);
  const c = ch("luz");
  return (
    <Scene id="luz" label="Luz: solárium y terraza" vh={340} sceneRef={ref}>
      <motion.img
        src={asset(l.sky.src)}
        srcSet={`${asset(small(l.sky.src))} 900w, ${asset(l.sky.src)} 1920w`}
        sizes="100vw"
        alt={l.sky.alt}
        loading="eager"
        fetchPriority="low"
        style={{ y: tilt }}
        className="grade absolute inset-x-0 top-0 h-[135%] w-full object-cover will-change-transform"
      />
      <Still image={l.terrace} style={{ opacity: terraceOpacity, scale: terraceScale }} />
      <Veil />
      <ChapterWord p={p} n={c.n} word={c.label} range={[0.03, 0.1, 0.22, 0.3]} />
      <Caption p={p} range={[0.3, 0.36, 0.44, 0.5]} n={c.n} title={l.title} />
      <Caption p={p} range={[0.64, 0.7, 0.92, 0.98]} title={l.title2} align="right" />
    </Scene>
  );
}

/** Despedida — la cámara se aleja de la piscina y aparecen la reserva y el contacto. */
export function Finale() {
  const { ref, p } = useScene();
  const f = site.finale;
  const scale = useRange(p, [0, 0.75], [1.5, 1.02]);
  const y = useRange(p, [0, 0.75], ["6%", "0%"]);
  const dim = useRange(p, [0.1, 0.6], [0, 0.45]);
  const textOpacity = useRange(p, [0.15, 0.35], [0, 1]);
  const textY = useRange(p, [0.15, 0.35], [40, 0]);
  const ctaOpacity = useRange(p, [0.35, 0.5], [0, 1]);
  const pointerEvents = useTransform(ctaOpacity, (o) => (o > 0.6 ? "auto" : "none"));

  return (
    <Scene id="reservar" label="Reservar" vh={240} sceneRef={ref}>
      <Still image={f.image} preload style={{ scale, y }} />
      <Veil strength={dim} />
      <div className="wrap absolute inset-0 flex flex-col items-center justify-center text-center">
        <motion.h2 style={{ opacity: textOpacity, y: textY }} className="display max-w-[12ch]">{rich(f.title)}</motion.h2>
        <motion.div style={{ opacity: ctaOpacity, pointerEvents }} className="mt-10 flex flex-col items-center gap-6">
          <div className="flex flex-wrap justify-center gap-3">
            <a href={site.links.book} target="_blank" rel="noopener" className="btn btn-accent">Reservar estancia <Icon name="arrow" size={14} /></a>
            <a href={site.links.directions} target="_blank" rel="noopener" className="btn btn-line">Cómo llegar <Icon name="arrowUpRight" size={14} /></a>
            <a href={site.links.phone} className="btn btn-line"><Icon name="phone" size={14} /> Llamar</a>
          </div>
          <p className="max-w-md text-sm leading-relaxed text-fg/75">{f.note}</p>
        </motion.div>
      </div>
    </Scene>
  );
}

export function Footer() {
  return (
    <footer className="bg-deep pb-24 pt-20 sm:pb-12">
      <div className="wrap">
        <p className="brand-xl select-none text-center text-[clamp(44px,12vw,200px)] text-fg/90">Es Blau</p>
        <div className="mt-16 grid gap-8 border-t border-line pt-10 text-sm text-fg/70 md:grid-cols-4">
          <div>
            <p className="kicker mb-3 text-fg/45">Dirección</p>
            <a href={site.links.maps} target="_blank" rel="noopener" className="ulink">{site.address}</a>
          </div>
          <div>
            <p className="kicker mb-3 text-fg/45">Contacto</p>
            <a href={site.links.phone} className="ulink">{site.links.phoneLabel}</a>
          </div>
          <div>
            <p className="kicker mb-3 text-fg/45">Canales oficiales</p>
            <ul className="flex flex-wrap gap-x-5 gap-y-2">
              {site.socials.map((s) => <li key={s.label}><a href={s.href} target="_blank" rel="noopener" className="ulink">{s.label}</a></li>)}
            </ul>
          </div>
          <div className="md:text-right">
            <p className="kicker mb-3 text-fg/45">Créditos</p>
            <p>Fotografías y datos: rosamarhotels.com</p>
            <p>Diseño y desarrollo: DURDUC</p>
          </div>
        </div>
        <p className="mt-10 text-xs text-fg/40">© 2026 Hotel Rosamar Es Blau · Rosamar Hotels</p>
      </div>
    </footer>
  );
}
