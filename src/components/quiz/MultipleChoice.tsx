"use client";

import { useMemo, useState } from "react";
import { clsx } from "clsx";
import type { KanaEntry } from "@/data/kana-index";
import { getRandomDistractors, filterKana } from "@/data/kana-index";
import { shuffle } from "@/lib/kana-utils";

interface Props {
  entry: KanaEntry;
  pool: KanaEntry[];
  onAnswer: (correct: boolean) => void;
  onStrokeClick: () => void;
}

export function MultipleChoice({ entry, pool, onAnswer, onStrokeClick }: Props) {
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
      {/* Question */}
      <div
        className="w-64 h-64 flex items-center justify-center rounded-3xl"
        style={{ background: "var(--bg-card)", boxShadow: "var(--shadow-card)", border: "1px solid var(--border)" }}
      >
        <div className="text-8xl font-bold" style={{ color: "var(--text)", fontFamily: "Noto Sans JP, sans-serif" }}>
          {entry.kana}
        </div>
      </div>

      {/* Options */}
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
                "py-4 px-3 rounded-2xl text-lg font-bold transition-all active:scale-95 border-2",
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
              }}
            >
              {opt.romaji}
            </button>
          );
        })}
      </div>

      <button
        onClick={onStrokeClick}
        className="text-sm flex items-center gap-1 transition-opacity hover:opacity-70"
        style={{ color: "var(--text-muted)" }}
      >
        ✏️ Ver trazos
      </button>
    </div>
  );
}
