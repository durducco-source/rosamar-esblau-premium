# Rosamar Es Blau · Web premium

Web inmersiva para el **Hotel Rosamar Es Blau Adults Only +21** (Lloret de Mar, Costa Brava).
Concepto visual **"Blau — Mediterráneo editorial"**: cal y arena, azul mar profundo y latón, tipografía serif
editorial, composiciones asimétricas tipo revista y animaciones de nivel agencia. Desarrollo: **DURDUC**.

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
│   ├── Hero.tsx         → 01 Home: cortina de entrada, fotos en fundido con zoom lento, titular por letras
│   ├── Sections.tsx     → 02 Experiencia, cinta en movimiento, 05 Ubicación, 06 Reservas, pie
│   ├── Facilities.tsx   → 03 Instalaciones (índice con vista previa) y habitaciones
│   ├── Gallery.tsx      → 04 Galería tipo revista con visor
│   └── motion.tsx       → primitivas de animación reutilizables (Reveal, SplitHeading, ImageReveal, ScrollWords)
├── content/site.ts      → TODO el contenido (textos, fotos, enlaces) ← editar aquí
└── lib/utils.tsx        → utilidades
public/media/            → fotografías oficiales
```

## Funcionalidades

- Cortina de entrada, hero a pantalla completa con fotos en fundido, zoom lento, parallax y titular que aparece letra a letra.
- Menú minimalista a pantalla completa (secciones 01–06) con vista previa de foto al pasar el ratón; Escape para cerrar.
- Manifiesto que se ilumina palabra a palabra con el scroll y titulares que suben desde una máscara.
- Imágenes que se descubren con cortina (clip-path) y parallax sutil; composición editorial asimétrica.
- Índice de instalaciones con vista previa fija (escritorio) y acordeón con foto (móvil).
- Galería tipo revista con visor a pantalla completa (flechas, teclado, Escape, foco accesible).
- Ubicación con mapa y botones a Google Maps; reservas con enlace a la web oficial, teléfono y canales oficiales.
- Barra de reserva fija en móvil, SEO (metadatos, Open Graph, schema.org Hotel), accesible y respetuosa con `prefers-reduced-motion`.

## Fuentes del contenido

- Web oficial **rosamarhotels.com**: textos, servicios, habitaciones, opiniones (9,3 · 1.342 encuestas) y fotografías.
- No se ha inventado información. La referencia visual (Reel de Instagram) no se pudo analizar: el concepto es propio y se ajustará cuando se disponga del vídeo o capturas.
