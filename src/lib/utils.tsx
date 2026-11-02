import { Fragment } from "react";

const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

/** Ruta a un archivo de /public teniendo en cuenta el basePath de GitHub Pages. */
export const asset = (path: string) => `${base}${path}`;

/** Convierte "texto *destacado*" en texto con <em> (cursiva en color de acento). */
export function rich(text: string) {
  return text.split(/(\*[^*]+\*)/g).map((part, i) =>
    part.startsWith("*") ? <em key={i}>{part.slice(1, -1)}</em> : <Fragment key={i}>{part}</Fragment>,
  );
}

/** Versión ligera de una foto (miniatura generada como nombre-sm.jpg). */
export const small = (src: string) => src.replace(/\.jpg$/, "-sm.jpg");

export const EASE = [0.22, 1, 0.36, 1] as const;
