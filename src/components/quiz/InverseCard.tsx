"use client";

import { useMemo, useState } from "react";
import { clsx } from "clsx";
import type { KanaEntry } from "@/data/kana-index";
import { getRandomDistractors } from "@/data/kana-index";
import { shuffle } from "@/lib/kana-utils";

interface Props {
  entry: KanaEntry;
  pool: KanaEntry[];
  onAnswer: (correct: boolean) => void;
}

export function InverseCard({ entry, pool, onAnswer }: Props) {
  const [selected, setSelected] = useState<string | null>(null);

  const options = useMemo(() => {
    const distractors = getRandomDistractors(entry, pool, 3);
    return shuffle([entry, ...distractors]);
  }, [entry.id]); // eslint-disable-line

  function choose(opt: KanaEntry) {
    if (selected) return;
    setSelected(opt.id);
    const correct = opt.id === entry.id;
    setTimeout(() => onAnswer(correct), 800);
  }

  const answered = !!selected;

  return (
    <div className="flex flex-col items-center gap-6 w-full">
      {/* Question (romaji) */}
      <div
        className="w-64 h-48 flex flex-col items-center justify-center rounded-3xl gap-2"
        style={{ background: "var(--bg-card)", boxShadow: "var(--shadow-card)", border: "1px solid var(--border)" }}
      >
        <p className="text-sm" style={{ color: "var(--text-muted)" }}>¿Cuál es el kana de…?</p>
        <div className="text-5xl font-bold" style={{ color: "var(--color-primary-500)" }}>
          {entry.romaji}
        </div>
        {entry.romajiAlts.length > 0 && (
          <p className="text-xs" style={{ color: "var(--text-subtle)" }}>
            ({entry.romajiAlts.join(" / ")})
          </p>
        )}
      </div>

      {/* Options (kana characters) */}
      <div className="grid grid-cols-2 gap-3 w-full max-w-sm">
        {options.map((opt) => {
          const isSelected = selected === opt.id;
          const isCorrect = opt.id === entry.id;
          const show = answered;

          return (
            <button
              key={opt.id}
              onClick={() => choose(opt)}
              disabled={!!selected}
              className={clsx(
                "py-6 px-3 rounded-2xl text-4xl font-bold transition-all active:scale-95 border-2",
                !show && "hover:opacity-80",
              )}
              style={{
                background: show
                  ? isCorrect
                    ? "rgba(34,197,94,0.15)"
                    : isSelected
                    ? "rgba(239,68,68,0.15)"
                    : "var(--bg-muted)"
                  : "var(--bg-muted)",
                borderColor: show
                  ? isCorrect
                    ? "#22c55e"
                    : isSelected
                    ? "#ef4444"
                    : "transparent"
                  : "transparent",
                color: "var(--text)",
                fontFamily: "Noto Sans JP, sans-serif",
              }}
            >
              {opt.kana}
            </button>
          );
        })}
      </div>
    </div>
  );
}
