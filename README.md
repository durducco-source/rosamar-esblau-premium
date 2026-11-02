# Rosamar Es Blau · Un día en Es Blau

Web inmersiva para el **Hotel Rosamar Es Blau Adults Only +21** (Lloret de Mar, Costa Brava).
Toda la web es **un único recorrido cinematográfico ligado al scroll**, inspirado en el Reel de referencia:
las fotografías son las protagonistas y el texto se reduce a una palabra por capítulo, una frase y los datos útiles.
Dirección creativa, diseño y desarrollo: **DURDUC**.

- Web publicada: https://durducco-source.github.io/rosamar-esblau-premium/
- Código: https://github.com/durducco-source/rosamar-esblau-premium

## El recorrido (8 escenas, cada una con su movimiento de cámara)

| Escena | Movimiento |
|---|---|
| Llegada | Avance hacia la fachada; "ES BLAU" se abre y se desenfoca; fundido al vestíbulo, "Pasa dentro" |
| 01 Agua | Picado de dron sobre la piscina (zoom + giro), barrido lateral y retroceso |
| 02 Calma | El spa se abre como una puerta corredera; travelling horizontal por sus espacios |
| 03 Descanso | La cámara empieza pegada a la cama y retrocede; deriva lateral |
| 04 Mesa | Capas de profundidad: fondo lento y fotos que suben a distinta velocidad |
| 05 Luz | Panorámica vertical hacia el cielo del solárium; avance hacia la terraza |
| 06 Fragmentos | Tira de película horizontal, fotos ampliables a pantalla completa |
| Reservar | La cámara se aleja; reserva, cómo llegar y llamar |

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
├── app/                → layout (SEO, tipografía, JSON-LD), página y estilos (tema y etalonaje en globals.css)
├── components/
│   ├── cinema.tsx      → primitivas: Scene (plató fijo), Still (foto con cámara), ChapterWord, Caption, useRange
│   ├── Scenes.tsx      → escenas Llegada, Agua, Calma, Descanso, Mesa, Luz, Reservar y pie
│   ├── FilmStrip.tsx   → 06 Fragmentos (tira horizontal + visor)
│   ├── Header.tsx      → barra fina, menú a pantalla completa y barra de reserva móvil
│   └── Hud.tsx         → indicador del capítulo y progreso
├── content/site.ts     → TODO el contenido (textos, fotos, enlaces) ← editar aquí
└── lib/utils.tsx       → utilidades (incluye fullRange para las animaciones de scroll)
public/media/           → fotografías oficiales
```

## Notas técnicas

- Las animaciones de scroll usan `useScroll`/`useTransform` de Motion, aceleradas por el navegador (ScrollTimeline).
  Todos los rangos se completan de 0 a 1 con `fullRange`; si no, el navegador rellena los extremos y los textos "reaparecen".
- La primera foto de cada escena se descarga pronto con prioridad baja para que nunca aparezca un fotograma en negro.
- Responsive con unidades `svh`/`vw`; barra de reserva fija en móvil; accesible (menú y visor con teclado, foco y Escape).

## Fuentes del contenido

- Web oficial **rosamarhotels.com**: textos, servicios, habitaciones, opiniones y fotografías. No se ha inventado información.
- El hotel no dispone de un vídeo de recorrido: el efecto de cámara se recrea con sus fotografías oficiales.
