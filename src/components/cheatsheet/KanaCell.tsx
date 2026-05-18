"use client";

import { clsx } from "clsx";
import type { KanaEntry } from "@/data/kana-index";

interface Props {
  entry: KanaEntry | null;
  onClick?: (entry: KanaEntry) => void;
  highlight?: boolean;
}

// Ocupa toda la celda del grid (aspect-square). El tamaño de fuente es fluido
// con clamp() para escalar bien en móvil, tablet y escritorio.
export function KanaCell({ entry, onClick, highlight }: Props) {
  if (!entry) {
    return (
      <div
        className="w-full aspect-square rounded-xl"
        style={{ background: "var(--bg-muted)", opacity: 0.25 }}
      />
    );
  }

  return (
    <button
      onClick={() => onClick?.(entry)}
      className={clsx(
        "w-full aspect-square rounded-xl flex flex-col items-center justify-center gap-0.5 border transition-transform hover:scale-105 active:scale-95"
      )}
      style={{
        background: highlight ? "rgba(14,165,233,0.12)" : "var(--bg-card)",
        borderColor: highlight ? "var(--color-primary-500)" : "var(--border)",
        boxShadow: "var(--shadow)",
      }}
      title={`${entry.kana} — ${entry.romaji}`}
    >
      <span
        className="font-bold leading-none"
        style={{
          color: "var(--text)",
          fontFamily: "Noto Sans JP, sans-serif",
          fontSize: "clamp(1.1rem, 5vw, 2rem)",
        }}
      >
        {entry.kana}
      </span>
      <span
        className="font-medium leading-none"
        style={{ color: "var(--text-muted)", fontSize: "clamp(0.55rem, 2vw, 0.75rem)" }}
      >
        {entry.romaji}
      </span>
    </button>
  );
}
