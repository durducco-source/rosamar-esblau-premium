// Todo el contenido de la web vive aquí.
// Datos verificados en la web oficial rosamarhotels.com (textos, servicios, fotografías y opiniones).
// No se ha inventado información: lo que no está publicado allí no aparece en la web.

const URL = "https://durducco-source.github.io/rosamar-esblau-premium/";
const BOOK = "https://www.rosamarhotels.com/es/reservar-hoteles-lloret-de-mar-costa-brava";
const PHONE = "+34972346523";

export type Img = { src: string; alt: string };

export const site = {
  lang: "es",
  name: "Rosamar Es Blau",
  links: {
    book: BOOK,
    phone: `tel:${PHONE}`,
    phoneLabel: "+34 972 34 65 23",
    official: "https://www.rosamarhotels.com/es/hotel-rosamar-es-blau-adults-only",
    maps: "https://www.google.com/maps/search/?api=1&query=Hotel+Rosamar+Es+Blau+Lloret+de+Mar",
    directions: "https://www.google.com/maps/dir/?api=1&destination=41.7017458,2.8557253",
    mapEmbed: "https://www.google.com/maps?q=41.7017458,2.8557253&z=16&output=embed",
  },
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

  nav: [
    { n: "01", label: "Inicio", href: "#inicio", image: "/media/piscina-vista-aerea-sm.jpg" },
    { n: "02", label: "Experiencia", href: "#experiencia", image: "/media/spa-piscina-sm.jpg" },
    { n: "03", label: "Instalaciones", href: "#instalaciones", image: "/media/solarium-sm.jpg" },
    { n: "04", label: "Galería", href: "#galeria", image: "/media/terraza-bar-sm.jpg" },
    { n: "05", label: "Ubicación", href: "#ubicacion", image: "/media/terraza-entrada-sm.jpg" },
    { n: "06", label: "Reservas", href: "#reservas", image: "/media/habitacion-doble-sm.jpg" },
  ],

  hero: {
    kicker: "Adults Only +21 · Lloret de Mar",
    lead: "Un hotel con encanto solo para adultos, a 100 metros de la playa, en la Costa Brava.",
    slides: [
      { src: "/media/piscina-vista-aerea.jpg", alt: "Vista aérea de la piscina exterior del hotel", caption: "Piscina exterior" },
      { src: "/media/spa-piscina.jpg", alt: "Piscina climatizada del Vitality Spa", caption: "Vitality Spa" },
      { src: "/media/terraza-bar.jpg", alt: "Terraza exterior del bar", caption: "Terraza" },
      { src: "/media/habitacion-doble.jpg", alt: "Habitación doble con cama kingsize", caption: "Habitaciones" },
    ],
  },

  marquee: ["Mediterráneo", "Adults only +21", "Vitality Spa", "100 m de la playa", "Costa Brava", "4* Superior"],

  experience: {
    statement:
      "Calma, mar y pequeños lujos. Un refugio en una zona residencial y tranquila de Lloret de Mar, lejos del ocio nocturno y a cinco minutos a pie del centro, pensado para vivir la Costa Brava en pareja.",
    stats: [
      { value: "+21", label: "Solo adultos" },
      { value: "100 m", label: "De la playa" },
      { value: "4*S", label: "Superior" },
      { value: "9,3", label: "1.342 opiniones" },
    ],
    stories: [
      {
        kicker: "Vitality Spa",
        title: "Un spa *solo para adultos.*",
        text: "Piscina climatizada interior, sauna, hammam, piscina de hidromasaje, tumbonas térmicas y duchas de sensaciones. Gratis durante una hora (de 10 h a 19 h) si reservas en la web oficial.",
        image: { src: "/media/spa-hidromasaje.jpg", alt: "Piscina de hidromasaje del Vitality Spa" },
      },
      {
        kicker: "Gastronomía",
        title: "Sabores del *Mediterráneo.*",
        text: "Restaurante buffet con producto fresco y de proximidad, show cooking diario, rincón vegetariano y oferta sin gluten certificada por la Associació de Celíacs de Catalunya.",
        image: { src: "/media/restaurante.jpg", alt: "Restaurante del hotel" },
      },
      {
        kicker: "Deporte",
        title: "Pedalear, caminar, *nadar.*",
        text: "Guarda-bicicletas con llave y acceso 24 h, mini-taller, información de rutas y Gym Centre de 7 h a 23 h para tus vacaciones activas.",
        image: { src: "/media/guarda-bicicletas.jpg", alt: "Guarda-bicicletas del hotel" },
      },
    ],
  },

  facilities: [
    { name: "Vitality Spa", text: "Piscina climatizada, sauna, hammam e hidromasaje. Tratamientos y masajes desde 55 €.", image: { src: "/media/spa-piscina-climatizada.jpg", alt: "Piscina climatizada interior del spa" } },
    { name: "Piscina exterior", text: "Piscina al aire libre con tumbonas y Pool Snack Bar.", image: { src: "/media/piscina-tumbonas.jpg", alt: "Piscina exterior con tumbonas" } },
    { name: "Solárium", text: "Tumbonas en la azotea con vistas sobre Lloret de Mar.", image: { src: "/media/solarium.jpg", alt: "Solárium en la azotea" } },
    { name: "Restaurante", text: "Buffet mediterráneo e internacional, corners temáticos y show cooking.", image: { src: "/media/buffet.jpg", alt: "Buffet del restaurante" } },
    { name: "Bar & terraza", text: "Música en directo en la terraza, noche de mojitos y de gin-tonics premium.", image: { src: "/media/bar.jpg", alt: "Bar del hotel" } },
    { name: "Gym Centre", text: "Abierto de 7 h a 23 h.", image: { src: "/media/gimnasio.jpg", alt: "Gym Centre" } },
    { name: "Bike friendly", text: "Guarda-bicicletas con llave, acceso 24 h y mini-taller.", image: { src: "/media/taller-bicicletas.jpg", alt: "Taller de bicicletas" } },
  ],

  rooms: [
    {
      name: "Doble estándar",
      size: "20–21 m²",
      image: { src: "/media/habitacion-doble.jpg", alt: "Habitación doble estándar" },
      details: ["Cama kingsize de 1,60 m", "Terraza amueblada", "Opción 3 adultos con sofá cama de 1,35 m", "Opción uso individual"],
    },
    {
      name: "Suite",
      size: "25 m² + 40 m² de terraza",
      image: { src: "/media/habitacion-doble-2.jpg", alt: "Habitación del hotel" },
      details: ["Cama King size 1,80 × 2 m", "Terraza chill-out con tumbonas y sofá", "Albornoz y zapatillas", "Coffee corner Dolce Gusto y set de té"],
    },
  ],
  roomsAll: "En todas: aire acondicionado, calefacción, TV satélite, wifi, caja fuerte gratuita, agua de cortesía y enchufes USB. Recepción 24 horas.",

  gallery: [
    { src: "/media/piscina-exterior.jpg", alt: "Piscina exterior" },
    { src: "/media/spa-tumbonas-termicas.jpg", alt: "Tumbonas térmicas del spa" },
    { src: "/media/hall.jpg", alt: "Vestíbulo del hotel" },
    { src: "/media/terraza-entrada.jpg", alt: "Terraza de la entrada" },
    { src: "/media/spa-cabina-masajes.jpg", alt: "Cabina de masajes" },
    { src: "/media/solarium.jpg", alt: "Solárium" },
    { src: "/media/habitacion-doble-2.jpg", alt: "Habitación" },
    { src: "/media/spa-piscina.jpg", alt: "Piscina del Vitality Spa" },
    { src: "/media/terraza-bar.jpg", alt: "Terraza del bar" },
    { src: "/media/restaurante.jpg", alt: "Restaurante" },
  ] as Img[],

  location: {
    address: ["Passeig de les Acàcies, 5", "17310 Lloret de Mar (Girona)"],
    points: [
      { value: "100 m", label: "a la playa" },
      { value: "5 min", label: "a pie del centro" },
      { value: "20 m", label: "del Hotel Rosamar & Spa" },
    ],
    text: "En una zona residencial y tranquila de Lloret de Mar, junto al paseo marítimo y lejos del ocio nocturno.",
  },

  booking: {
    title: "Tu escapada *empieza aquí.*",
    text: "Reserva en la web oficial y disfruta de una hora gratis en el Vitality Spa (de 10 h a 19 h). Con otros portales, el acceso cuesta 15 € por persona.",
    note: "Hotel solo para adultos: entrada reservada a mayores de 21 años. No se admiten despedidas de soltero/a.",
    quotes: [
      { text: "La limpieza y la atención de todo el personal, además del buffet tan variado y con tanta calidad en los productos.", author: "Elisenda", score: "9,9" },
      { text: "Excelente hotel al lado del paseo marítimo.", author: "Jose", score: "10" },
    ],
    socials: [
      { label: "Instagram", href: "https://www.instagram.com/rosamarhotels/" },
      { label: "Facebook", href: "https://www.facebook.com/rosamarhotels.lloretdemar" },
      { label: "YouTube", href: "https://www.youtube.com/user/RosamarHotels" },
      { label: "Web oficial", href: "https://www.rosamarhotels.com/es/hotel-rosamar-es-blau-adults-only" },
    ],
  },
};
