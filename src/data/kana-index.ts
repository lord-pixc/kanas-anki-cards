import { hiragana as rawHiragana, hiraganaRows } from "./hiragana";
import { katakana as rawKatakana, katakanaRows } from "./katakana";
import { allStrokes } from "./stroke-data";
import type { KanaEntry, KanaType } from "./hiragana";

export type { KanaEntry, KanaType };
export type Script = "hiragana" | "katakana" | "both";

export interface FilterOptions {
  scripts: Script;
  types: KanaType[];
  rows: string[];
}

// Rellena los trazos desde KanjiVG (allStrokes) cuando la entrada no los trae
// embebidos (caso de los youon, definidos por composición base + pequeño).
function enrich(k: KanaEntry): KanaEntry {
  if (k.strokes && k.strokes.length) return k;
  return { ...k, strokes: allStrokes[k.kana] ?? [] };
}

export const hiragana: KanaEntry[] = rawHiragana.map(enrich);
export const katakana: KanaEntry[] = rawKatakana.map(enrich);
export const allKana: KanaEntry[] = [...hiragana, ...katakana];

export const kanaById = new Map<string, KanaEntry>(allKana.map((k) => [k.id, k]));
export const kanaByChar = new Map<string, KanaEntry>(allKana.map((k) => [k.kana, k]));

// Etiquetas de fila en romaji (incluye dakuten/handakuten/youon)
export const ROW_ROMAJI: Record<string, string> = {
  a: "a", ka: "ka", sa: "sa", ta: "ta", na: "na",
  ha: "ha", ma: "ma", ya: "ya", ra: "ra", wa: "wa", n: "n",
  ga: "ga", za: "za", da: "da", ba: "ba", pa: "pa",
};

const ROW_ORDER = ["a","ka","sa","ta","na","ha","ma","ya","ra","wa","n","ga","za","da","ba","pa"];

export function filterKana(opts: FilterOptions): KanaEntry[] {
  const pool: KanaEntry[] = [];
  if (opts.scripts === "hiragana" || opts.scripts === "both") pool.push(...hiragana);
  if (opts.scripts === "katakana" || opts.scripts === "both") pool.push(...katakana);

  return pool.filter((k) => {
    if (!opts.types.includes(k.type)) return false;
    if (opts.rows.length > 0 && !opts.rows.includes(k.row)) return false;
    return true;
  });
}

// Filas disponibles (en romaji) según script + tipos elegidos, ignorando el
// filtro de filas para poder construir la lista de opciones.
export function getAvailableRows(opts: Pick<FilterOptions, "scripts" | "types">): Array<{ id: string; label: string }> {
  const rows = new Set<string>();
  filterKana({ ...opts, rows: [] }).forEach((k) => rows.add(k.row));
  return ROW_ORDER.filter((r) => rows.has(r)).map((r) => ({
    id: r,
    label: (ROW_ROMAJI[r] ?? r).toUpperCase(),
  }));
}

export function getRandomDistractors(current: KanaEntry, pool: KanaEntry[], count = 3): KanaEntry[] {
  const candidates = pool.filter((k) => k.id !== current.id && k.type === current.type);
  const shuffled = candidates.sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

export { hiraganaRows, katakanaRows };

export const tableLayout = {
  cols: ["a", "i", "u", "e", "o"],
  rows: ["a", "ka", "sa", "ta", "na", "ha", "ma", "ya", "ra", "wa", "n"],
};
