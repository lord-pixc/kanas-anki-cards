"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import type { KanaEntry } from "@/data/kana-index";
import { Badge } from "../ui/Badge";
import { masteryLevel } from "@/lib/sm2";
import type { CardState } from "@/lib/sm2";

interface Props {
  entry: KanaEntry;
  cardState: CardState;
  onFlip?: () => void;
  onStrokeClick: () => void;
}

const typeColor = {
  basic: "blue" as const,
  dakuten: "purple" as const,
  handakuten: "orange" as const,
  youon: "green" as const,
};

const typeLabel = {
  basic: "Básico",
  dakuten: "Dakuten",
  handakuten: "Handakuten",
  youon: "Compuesto",
};

export function FlashCard({ entry, cardState, onFlip, onStrokeClick }: Props) {
  const [flipped, setFlipped] = useState(false);

  function handleFlip() {
    setFlipped((v) => !v);
    if (!flipped) onFlip?.();
  }

  const mastery = masteryLevel(cardState);
  const masteryColors = { new: "gray", learning: "orange", review: "blue", mastered: "green" } as const;

  return (
    <div className="flex flex-col items-center gap-4">
      {/* Card */}
      <div
        className="cursor-pointer preserve-3d"
        style={{ width: 280, height: 320, perspective: 1200 }}
        onClick={handleFlip}
        role="button"
        tabIndex={0}
        aria-label={flipped ? "Flip back" : "Flip card"}
        onKeyDown={(e) => { if (e.key === " " || e.key === "Enter") handleFlip(); }}
      >
        <motion.div
          className="relative w-full h-full preserve-3d"
          animate={{ rotateY: flipped ? 180 : 0 }}
          transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
          style={{ transformStyle: "preserve-3d" }}
        >
          {/* Front */}
          <div
            className="absolute inset-0 backface-hidden rounded-3xl flex flex-col items-center justify-center gap-3 p-6"
            style={{
              background: "var(--bg-card)",
              boxShadow: "var(--shadow-card)",
              border: "1px solid var(--border)",
              backfaceVisibility: "hidden",
            }}
          >
            <div className="flex gap-2">
              <Badge color={typeColor[entry.type]}>{typeLabel[entry.type]}</Badge>
              <Badge color={masteryColors[mastery]}>
                {mastery === "new" ? "Nuevo" : mastery === "learning" ? "Aprendiendo" : mastery === "review" ? "Revisión" : "Dominado"}
              </Badge>
            </div>
            <div
              className="text-8xl font-bold select-none leading-none"
              style={{ color: "var(--text)", fontFamily: "Noto Sans JP, sans-serif" }}
            >
              {entry.kana}
            </div>
            <p className="text-sm" style={{ color: "var(--text-subtle)" }}>
              Toca para ver la respuesta
            </p>
          </div>

          {/* Back */}
          <div
            className="absolute inset-0 backface-hidden rounded-3xl flex flex-col items-center justify-center gap-4 p-6"
            style={{
              background: "var(--bg-card)",
              boxShadow: "var(--shadow-card)",
              border: "1px solid var(--border)",
              backfaceVisibility: "hidden",
              transform: "rotateY(180deg)",
            }}
          >
            <div
              className="text-5xl font-bold"
              style={{ color: "var(--text)", fontFamily: "Noto Sans JP, sans-serif" }}
            >
              {entry.kana}
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold" style={{ color: "var(--color-primary-500)" }}>
                {entry.romaji}
              </div>
              {entry.romajiAlts.length > 0 && (
                <div className="text-sm mt-1" style={{ color: "var(--text-muted)" }}>
                  También: {entry.romajiAlts.join(", ")}
                </div>
              )}
            </div>
            <button
              onClick={(e) => { e.stopPropagation(); onStrokeClick(); }}
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-colors"
              style={{ background: "var(--bg-muted)", color: "var(--text-muted)" }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 19l7-7 3 3-7 7-3-3z" />
                <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" />
                <path d="M2 2l7.586 7.586" />
                <circle cx="11" cy="11" r="2" />
              </svg>
              Ver trazos
            </button>
          </div>
        </motion.div>
      </div>

      {/* Hint */}
      {!flipped && (
        <p className="text-xs" style={{ color: "var(--text-subtle)" }}>
          Espacio o Enter para voltear
        </p>
      )}
    </div>
  );
}
