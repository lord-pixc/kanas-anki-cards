"use client";

import { useEffect, useRef, useState } from "react";
import { clsx } from "clsx";
import type { KanaEntry } from "@/data/kana-index";
import { checkAnswer } from "@/lib/kana-utils";

interface Props {
  entry: KanaEntry;
  onAnswer: (correct: boolean) => void;
  onStrokeClick: () => void;
}

export function TypingPractice({ entry, onAnswer, onStrokeClick }: Props) {
  const [input, setInput] = useState("");
  const [result, setResult] = useState<"correct" | "incorrect" | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setInput("");
    setResult(null);
    inputRef.current?.focus();
  }, [entry.id]);

  function submit() {
    if (result) return;
    const correct = checkAnswer(input, entry);
    setResult(correct ? "correct" : "incorrect");
    setTimeout(() => onAnswer(correct), 900);
  }

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

      {/* Input */}
      <div className="flex flex-col items-center gap-3 w-full max-w-xs">
        <input
          ref={inputRef}
          value={input}
          onChange={(e) => !result && setInput(e.target.value)}
          onKeyDown={(e) => { if (e.key === "Enter") submit(); }}
          placeholder="Escribe el romaji…"
          autoComplete="off"
          autoCapitalize="none"
          spellCheck={false}
          className={clsx(
            "w-full px-4 py-3 rounded-xl text-center text-xl font-bold outline-none border-2 transition-colors",
          )}
          style={{
            background: "var(--bg-muted)",
            color: result === "correct" ? "#22c55e" : result === "incorrect" ? "#ef4444" : "var(--text)",
            borderColor: result === "correct" ? "#22c55e" : result === "incorrect" ? "#ef4444" : "var(--border-focus)",
          }}
        />

        {result === "incorrect" && (
          <p className="text-sm font-medium" style={{ color: "#22c55e" }}>
            Correcto: <strong>{entry.romaji}</strong>
            {entry.romajiAlts.length > 0 && ` (o ${entry.romajiAlts.join(", ")})`}
          </p>
        )}

        <button
          onClick={submit}
          disabled={!input || !!result}
          className="w-full py-2.5 rounded-xl font-medium text-white transition-all active:scale-95 disabled:opacity-40"
          style={{ background: "var(--color-primary-500)" }}
        >
          Comprobar
        </button>

        <button
          onClick={onStrokeClick}
          className="text-sm flex items-center gap-1 transition-opacity hover:opacity-70"
          style={{ color: "var(--text-muted)" }}
        >
          ✏️ Ver trazos
        </button>
      </div>
    </div>
  );
}
