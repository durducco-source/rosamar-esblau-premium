# Rosamar Es Blau · Web premium

Web inmersiva para el **Hotel Rosamar Es Blau Adults Only +21** (Lloret de Mar, Costa Brava).
Concepto visual basado en el Reel de referencia: **un recorrido cinematográfico continuo controlado por el scroll**
(de la entrada del hotel al interior, parada a parada, y de vuelta fuera sobre la piscina), tipografía sans muy fina
y espaciada, luz cálida de atardecer, paradas numeradas con frase corta y botones píldora. Desarrollo: **DURDUC**.

- Web publicada: https://durducco-source.github.io/rosamar-esblau-premium/
- Código: https://github.com/durducco-source/rosamar-esblau-premium

## Tecnologías

Next.js 16 (App Router, exportación estática) · React 19 · TypeScript · Tailwind CSS 4 · Motion (Framer Motion).

## Ejecutar en local

Requisitos: Node.js 20 o superior.

```bash
npm install
npm run dev        # http://localhost:3000
```

```bash
npm run build      # web estática en out/
npm run lint       # ESLint
npm run typecheck  # TypeScript
npm run deploy     # compila y publica en GitHub Pages (rama gh-pages)
```

## Estructura

```
src/
├── app/                 → layout (SEO, tipografías, JSON-LD), página y estilos (tema en :root)
├── components/
│   ├── Header.tsx       → cabecera, menú a pantalla completa animado y barra de reserva móvil
│   ├── Journey.tsx      → 01 Home: recorrido por el hotel ligado al scroll (zoom de cámara + fundidos + paradas)
│   ├── Sections.tsx     → 02 Experiencia, cinta en movimiento, 05 Ubicación, 06 Reservas, pie
│   ├── Facilities.tsx   → 03 Instalaciones (índice con vista previa) y habitaciones
│   ├── Gallery.tsx      → 04 Galería tipo revista con visor
│   └── motion.tsx       → primitivas de animación reutilizables (Reveal, SplitHeading, ImageReveal, ScrollWords)
├── content/site.ts      → TODO el contenido (textos, fotos, enlaces) ← editar aquí
└── lib/utils.tsx        → utilidades
public/media/            → fotografías oficiales
```

## Funcionalidades

- Portada como recorrido: 7 planos a pantalla completa que avanzan con zoom de cámara y se funden al hacer scroll; título "ES BLAU" enorme y espaciado, "Pasa dentro", paradas 01–04 con botón píldora y cierre "A 100 metros del mar".
- Menú minimalista a pantalla completa (secciones 01–06) con vista previa de foto al pasar el ratón; Escape para cerrar.
- Barra de navegación fina con enlaces (escritorio) y menú a pantalla completa (móvil).
- Manifiesto que se ilumina palabra a palabra con el scroll y titulares que suben desde una máscara.
- Imágenes que se descubren con cortina (clip-path) y parallax sutil; composición editorial asimétrica.
- Índice de instalaciones con vista previa fija (escritorio) y acordeón con foto (móvil).
- Galería tipo revista con visor a pantalla completa (flechas, teclado, Escape, foco accesible).
- Ubicación con mapa y botones a Google Maps; reservas con enlace a la web oficial, teléfono y canales oficiales.
- Barra de reserva fija en móvil, SEO (metadatos, Open Graph, schema.org Hotel), accesible y respetuosa con `prefers-reduced-motion`.

## Fuentes del contenido

- Web oficial **rosamarhotels.com**: textos, servicios, habitaciones, opiniones (9,3 · 1.342 encuestas) y fotografías.
- No se ha inventado información. El hotel no dispone de un vídeo de recorrido: el efecto de "vuelo" se recrea con sus fotografías oficiales.
