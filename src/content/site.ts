// Todo el contenido de la web vive aquí (textos mínimos: la web la cuentan las fotografías).
// Datos verificados en la web oficial rosamarhotels.com. No se ha inventado información.

const URL = "https://durducco-source.github.io/rosamar-esblau-premium/";
const PHONE = "+34972346523";

export type Img = { src: string; alt: string };
const img = (name: string, alt: string): Img => ({ src: `/media/${name}.jpg`, alt });

export const site = {
  lang: "es",
  name: "Rosamar Es Blau",
  links: {
    book: "https://www.rosamarhotels.com/es/reservar-hoteles-lloret-de-mar-costa-brava",
    phone: `tel:${PHONE}`,
    phoneLabel: "+34 972 34 65 23",
    official: "https://www.rosamarhotels.com/es/hotel-rosamar-es-blau-adults-only",
    maps: "https://www.google.com/maps/search/?api=1&query=Hotel+Rosamar+Es+Blau+Lloret+de+Mar",
    directions: "https://www.google.com/maps/dir/?api=1&destination=41.7017458,2.8557253",
  },
  address: "Passeig de les Acàcies, 5 · 17310 Lloret de Mar",
  seo: {
    url: URL,
    title: "Rosamar Es Blau · Hotel solo adultos +21 en Lloret de Mar · Costa Brava",
    description:
      "Hotel Rosamar Es Blau Adults Only +21, 4* Superior en Lloret de Mar, a 100 m de la playa. Vitality Spa, piscina exterior, solárium y cocina mediterránea. 9,3/10 en opiniones de huéspedes.",
    image: `${URL}media/og-esblau.jpg`,
    keywords: ["hotel solo adultos Lloret de Mar", "hotel adults only Costa Brava", "hotel con spa Lloret de Mar", "hotel boutique Costa Brava", "Rosamar Es Blau"],
  },
  jsonLd: {
    "@context": "https://schema.org",
    "@type": "Hotel",
    name: "Hotel Rosamar Es Blau Adults Only +21",
    url: URL,
    telephone: PHONE,
    starRating: { "@type": "Rating", ratingValue: "4" },
    numberOfRooms: 120,
    address: { "@type": "PostalAddress", streetAddress: "Passeig de les Acàcies, 5", addressLocality: "Lloret de Mar", postalCode: "17310", addressRegion: "Girona", addressCountry: "ES" },
    geo: { "@type": "GeoCoordinates", latitude: 41.7017458, longitude: 2.8557253 },
    aggregateRating: { "@type": "AggregateRating", ratingValue: "9.3", bestRating: "10", ratingCount: 1342 },
    sameAs: ["https://www.rosamarhotels.com/es/hotel-rosamar-es-blau-adults-only", "https://www.instagram.com/rosamarhotels/"],
  },

  // Capítulos del recorrido (menú, indicador de progreso y anclas)
  chapters: [
    { id: "llegada", n: "00", label: "Llegada", image: "/media/terraza-entrada-sm.jpg" },
    { id: "agua", n: "01", label: "Agua", image: "/media/piscina-vista-aerea-sm.jpg" },
    { id: "calma", n: "02", label: "Calma", image: "/media/spa-piscina-sm.jpg" },
    { id: "descanso", n: "03", label: "Descanso", image: "/media/habitacion-doble-sm.jpg" },
    { id: "mesa", n: "04", label: "Mesa", image: "/media/restaurante-sm.jpg" },
    { id: "luz", n: "05", label: "Luz", image: "/media/solarium-sm.jpg" },
    { id: "fragmentos", n: "06", label: "Fragmentos", image: "/media/hall-sm.jpg" },
    { id: "reservar", n: "07", label: "Reservar", image: "/media/piscina-exterior-sm.jpg" },
  ],

  arrival: {
    facade: img("terraza-entrada", "Entrada del Hotel Rosamar Es Blau"),
    hall: img("hall", "Vestíbulo del hotel"),
    kicker: "Rosamar Hotels · Lloret de Mar",
    sub: "Adults only +21 · 4* Superior",
    enter: "Pasa dentro",
  },
  water: {
    aerial: img("piscina-vista-aerea", "Vista aérea de la piscina exterior"),
    pool: img("piscina-exterior", "Piscina exterior"),
    loungers: img("piscina-tumbonas", "Tumbonas junto a la piscina"),
    title: "Piscina al aire libre",
    sub: "A 100 metros de la playa de Lloret de Mar.",
  },
  calm: {
    door: img("spa-piscina", "Piscina del Vitality Spa"),
    track: [
      img("spa-hidromasaje", "Piscina de hidromasaje"),
      img("spa-tumbonas-termicas", "Tumbonas térmicas"),
      img("spa-cabina-masajes", "Cabina de masajes"),
      img("spa-piscina-climatizada", "Piscina climatizada interior"),
    ],
    title: "Vitality Spa",
    sub: "Solo adultos. Una hora gratis reservando en la web oficial.",
  },
  rest: {
    room: img("habitacion-doble", "Habitación doble con cama kingsize"),
    suite: img("habitacion-doble-2", "Habitación del hotel"),
    title: "Suites con 40 m² de terraza",
    sub: "Cama King size · terraza chill-out · coffee corner",
  },
  table: {
    back: img("restaurante", "Restaurante del hotel"),
    cards: [img("buffet", "Buffet con producto fresco"), img("bar", "Bar del hotel")],
    title: "Cocina mediterránea",
    sub: "Producto de proximidad, show cooking y oferta sin gluten certificada.",
  },
  light: {
    sky: img("solarium", "Solárium en la azotea"),
    terrace: img("terraza-bar", "Terraza del bar"),
    title: "Solárium en la azotea",
    title2: "Música en directo en la terraza",
  },
  fragments: [
    img("hall", "Vestíbulo"),
    img("spa-tumbonas-termicas", "Zona de relax del spa"),
    img("gimnasio", "Gym Centre, de 7 h a 23 h"),
    img("terraza-entrada", "Terraza de la entrada"),
    img("spa-cabina-masajes", "Tratamientos y masajes"),
    img("guarda-bicicletas", "Guarda-bicicletas con acceso 24 h"),
    img("piscina-tumbonas", "Piscina exterior"),
    img("bar", "Bar"),
  ],
  finale: {
    image: img("piscina-exterior", "Piscina exterior del hotel"),
    title: "A 100 metros *del mar.*",
    note: "Solo adultos (+21) · Reserva en la web oficial y disfruta del Vitality Spa gratis una hora.",
  },
  socials: [
    { label: "Instagram", href: "https://www.instagram.com/rosamarhotels/" },
    { label: "Facebook", href: "https://www.facebook.com/rosamarhotels.lloretdemar" },
    { label: "YouTube", href: "https://www.youtube.com/user/RosamarHotels" },
    { label: "Web oficial", href: "https://www.rosamarhotels.com/es/hotel-rosamar-es-blau-adults-only" },
  ],
};
