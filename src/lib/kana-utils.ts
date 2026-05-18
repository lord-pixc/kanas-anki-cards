import type { KanaEntry } from "@/data/kana-index";

export function normalizeRomaji(input: string): string {
  return input.trim().toLowerCase();
}

export function checkAnswer(input: string, entry: KanaEntry): boolean {
  const normalized = normalizeRomaji(input);
  return normalized === entry.romaji || entry.romajiAlts.includes(normalized);
}

export function shuffle<T>(arr: T[]): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export function pick<T>(arr: T[], n: number): T[] {
  return shuffle(arr).slice(0, n);
}

// Punto inicial. Acepta separadores coma o espacio: "M31,33" y "M 31 33".
export function getPathStart(d: string): { x: number; y: number } {
  const match = d.match(/M\s*(-?[\d.]+)[\s,]+(-?[\d.]+)/);
  if (!match) return { x: 0, y: 0 };
  return { x: Number(match[1]), y: Number(match[2]) };
}

export function formatDate(ts: number): string {
  return new Date(ts).toLocaleDateString("es-ES", { day: "numeric", month: "short" });
}
