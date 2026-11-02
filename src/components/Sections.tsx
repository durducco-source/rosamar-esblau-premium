import { site } from "@/content/site";
import { rich } from "@/lib/utils";
import Icon from "./Icon";
import { ImageReveal, Reveal, ScrollWords, SectionLabel, SplitHeading } from "./motion";

/** Cinta de texto en movimiento entre secciones. */
export function Marquee({ dark = false }: { dark?: boolean }) {
  const row = site.marquee.map((t) => (
    <span key={t} className="flex items-center gap-10 pr-10">
      <span className="serif text-[clamp(40px,6vw,96px)] italic">{t}</span>
      <span className={`h-2 w-2 rotate-45 ${dark ? "bg-laton" : "bg-blau"}`} />
    </span>
  ));
  return (
    <div className={`overflow-hidden border-y py-6 ${dark ? "border-cal/10 bg-mar text-cal" : "border-line bg-cal text-ink"}`} aria-hidden="true">
      <div className="marquee flex w-max whitespace-nowrap">{row}{row}</div>
    </div>
  );
}

/** 02 · Experiencia — manifiesto que se ilumina con el scroll y composición editorial asimétrica. */
export function Experience() {
  const { statement, stats, stories } = site.experience;
  return (
    <section id="experiencia" className="py-[clamp(100px,14vw,200px)]">
      <div className="wrap">
        <SectionLabel n="02" label="Experiencia" />
        <ScrollWords text={statement} className="serif mt-10 max-w-[18ch] text-[clamp(36px,5.4vw,88px)] leading-[1.02] sm:max-w-[22ch]" />

        <dl className="mt-20 grid grid-cols-2 border-t border-line md:grid-cols-4">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.08} className="flex flex-col-reverse border-b border-line py-8 pr-4 md:border-b-0 md:border-r md:pl-6 md:first:pl-0 md:last:border-r-0">
              <dt className="kicker mt-3 text-ink/55">{s.label}</dt>
              <dd className="serif text-[clamp(44px,5vw,76px)] text-mar">{s.value}</dd>
            </Reveal>
          ))}
        </dl>
      </div>

      {/* Historias en composición tipo revista: cada una con un encuadre distinto */}
      <div className="wrap mt-[clamp(90px,12vw,180px)] flex flex-col gap-[clamp(90px,12vw,180px)]">
        {stories.map((s, i) => {
          const layouts = [
            { img: "md:col-span-7 aspect-[4/5] md:aspect-[6/5]", text: "md:col-span-4 md:col-start-9 md:self-end", from: "left" as const },
            { img: "md:col-span-6 md:col-start-6 aspect-[4/5] md:order-2", text: "md:col-span-4 md:col-start-1 md:order-1 md:self-center", from: "right" as const },
            { img: "md:col-span-5 md:col-start-2 aspect-[4/5]", text: "md:col-span-4 md:col-start-8 md:self-start md:pt-24", from: "bottom" as const },
          ][i % 3];
          return (
            <article key={s.kicker} className="grid gap-10 md:grid-cols-12 md:gap-6">
              <ImageReveal src={s.image.src} alt={s.image.alt} from={layouts.from} className={layouts.img} />
              <div className={layouts.text}>
                <Reveal className="kicker mb-6 flex items-center gap-3 text-blau">
                  <span>0{i + 1}</span><span className="h-px w-6 bg-blau/40" />{s.kicker}
                </Reveal>
                <SplitHeading text={s.title} as="h3" className="h2" />
                <Reveal delay={0.15}><p className="mt-6 max-w-md text-[15px] leading-relaxed text-ink/75">{s.text}</p></Reveal>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

/** 05 · Ubicación */
export function Location() {
  const l = site.location;
  return (
    <section id="ubicacion" className="bg-arena py-[clamp(100px,13vw,190px)]">
      <div className="wrap grid gap-14 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <SectionLabel n="05" label="Ubicación" />
          <SplitHeading text="A un paso *del mar.*" className="h2 mt-8" />
          <Reveal delay={0.1}><p className="mt-6 max-w-md text-[15px] leading-relaxed text-ink/75">{l.text}</p></Reveal>

          <Reveal delay={0.15} className="mt-10 flex items-start gap-4">
            <Icon name="pin" size={20} className="mt-1 shrink-0 text-blau" />
            <address className="not-italic leading-relaxed">{l.address.map((a) => <span key={a} className="block">{a}</span>)}</address>
          </Reveal>

          <dl className="mt-10 grid grid-cols-3 border-y border-line">
            {l.points.map((p, i) => (
              <Reveal key={p.label} delay={0.1 + i * 0.08} className="flex flex-col-reverse py-6 pr-3">
                <dt className="mt-2 text-xs leading-snug text-ink/60">{p.label}</dt>
                <dd className="serif text-[clamp(30px,3vw,46px)] text-mar">{p.value}</dd>
              </Reveal>
            ))}
          </dl>

          <Reveal delay={0.2} className="mt-10 flex flex-wrap gap-4">
            <a href={site.links.maps} target="_blank" rel="noopener" className="btn btn-mar">Ver en Google Maps <Icon name="arrowUpRight" /></a>
            <a href={site.links.directions} target="_blank" rel="noopener" className="btn btn-line">Cómo llegar</a>
          </Reveal>
        </div>

        <Reveal delay={0.1} className="relative min-h-[380px] overflow-hidden lg:col-span-7">
          <iframe
            title="Mapa: Hotel Rosamar Es Blau en Lloret de Mar"
            src={site.links.mapEmbed}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="absolute inset-0 h-full w-full border-0 [filter:grayscale(1)_contrast(1.05)_sepia(.12)]"
          />
        </Reveal>
      </div>
    </section>
  );
}

/** 06 · Reservas / Contacto */
export function Booking() {
  const b = site.booking;
  return (
    <section id="reservas" className="on-dark relative overflow-hidden bg-mar py-[clamp(110px,14vw,210px)] text-cal">
      <div className="wrap">
        <SectionLabel n="06" label="Reservas & contacto" dark />
        <SplitHeading text={b.title} className="display mt-10 max-w-[12ch]" />

        <div className="mt-16 grid gap-14 lg:grid-cols-12">
          <Reveal className="lg:col-span-6">
            <p className="max-w-lg text-[17px] leading-relaxed text-cal/85">{b.text}</p>
            <div className="mt-10 flex flex-wrap gap-4">
              <a href={site.links.book} target="_blank" rel="noopener" className="btn btn-laton">Ver disponibilidad <Icon name="arrow" /></a>
              <a href={site.links.phone} className="btn btn-line"><Icon name="phone" /> {site.links.phoneLabel}</a>
            </div>
            <p className="mt-8 max-w-lg text-sm text-cal/55">{b.note}</p>
          </Reveal>

          <div className="flex flex-col gap-10 lg:col-span-5 lg:col-start-8">
            {b.quotes.map((q, i) => (
              <Reveal key={q.author} delay={i * 0.12}>
                <figure className="border-l border-laton/60 pl-6">
                  <blockquote className="serif text-[clamp(24px,2.2vw,32px)] leading-snug">“{q.text}”</blockquote>
                  <figcaption className="kicker mt-4 text-cal/60">{q.author} · {q.score}/10</figcaption>
                </figure>
              </Reveal>
            ))}
            <Reveal delay={0.2}>
              <p className="kicker text-cal/50">9,3 · Fantástico · 1.342 encuestas · rosamarhotels.com</p>
            </Reveal>
          </div>
        </div>

        <Reveal className="mt-24 flex flex-col gap-6 border-t border-cal/15 pt-10 md:flex-row md:items-center md:justify-between">
          <span className="kicker text-cal/55">Canales oficiales</span>
          <ul className="flex flex-wrap gap-x-8 gap-y-3">
            {b.socials.map((s) => (
              <li key={s.label}>
                <a href={s.href} target="_blank" rel="noopener" className="ulink serif text-2xl">{s.label}</a>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="on-dark bg-[#072638] pb-24 pt-16 text-cal sm:pb-10">
      <div className="wrap">
        <p className="serif select-none text-[clamp(72px,19vw,300px)] italic leading-[0.8] text-cal/90">{rich("Es *Blau*")}</p>
        <div className="mt-12 grid gap-6 border-t border-cal/10 pt-8 text-sm text-cal/60 md:grid-cols-3">
          <p>© 2026 Hotel Rosamar Es Blau · Rosamar Hotels</p>
          <p>Fotografías y datos: material oficial de rosamarhotels.com</p>
          <p className="md:text-right">Diseño y desarrollo web por DURDUC</p>
        </div>
      </div>
    </footer>
  );
}
