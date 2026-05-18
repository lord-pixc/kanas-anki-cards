# Kana Cards — Hiragana & Katakana

Web app para estudiar los silabarios japoneses con flashcards estilo Anki,
repetición espaciada (SRS) y animación de trazos.

## Características

- **4 modos de práctica**: flashcard clásico, opción múltiple, escritura (typing) y reconocimiento inverso (romaji → kana).
- **SRS real (algoritmo SM-2)** con progreso persistido en `localStorage`.
- **Animación de trazos** con datos oficiales de [KanjiVG](https://kanjivg.tagaini.net):
  orden de trazos, flechas de dirección, numeración y control de velocidad.
- **Filtros granulares**: hiragana/katakana/ambos, básico, dakuten ゛, handakuten ゜
  y compuestas (youon). Selección de filas en romaji.
- **Cheatsheet completa** de los 5 grupos, responsive (móvil/tablet/escritorio),
  con animación de trazos al hacer clic e impresión a PDF.
- **Modo claro/oscuro** con detección automática de preferencia del sistema.
- **Estadísticas**: heatmap de actividad, distribución de dominio y top de caracteres difíciles.

## Desarrollo

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # build de producción
npm run lint     # linting
```

## Datos de trazos

Los paths de trazos se generan desde el dataset oficial de KanjiVG:

```bash
npm run gen:strokes   # regenera src/data/stroke-data.ts
```

Los youon (きゃ, しゅ…) se componen del carácter base + el kana pequeño.

## Stack

Next.js 15 · React 19 · TypeScript · Tailwind CSS v4 · Framer Motion

## Créditos y licencia

Los datos de trazos provienen de **KanjiVG** © Ulrich Apel, distribuidos bajo
licencia [Creative Commons BY-SA 3.0](https://creativecommons.org/licenses/by-sa/3.0/).
La atribución se mantiene en la cabecera de `src/data/stroke-data.ts`.
