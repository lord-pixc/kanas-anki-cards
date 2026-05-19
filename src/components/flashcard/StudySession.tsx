"use client";

import { useState, useEffect } from "react";
import { useStudySession, type StudyMode } from "@/hooks/useStudySession";
import type { KanaEntry } from "@/data/kana-index";
import { FlashCard } from "./FlashCard";
import { RatingBar } from "./RatingBar";
import { MultipleChoice } from "../quiz/MultipleChoice";
import { TypingPractice } from "../quiz/TypingPractice";
import { InverseCard } from "../quiz/InverseCard";
import { StrokeAnimation } from "../stroke/StrokeAnimation";
import { Modal } from "../ui/Modal";
import { Button } from "../ui/Button";

interface Props {
  deck: KanaEntry[];
  mode: StudyMode;
  allKana: KanaEntry[];
  onExit: () => void;
}

export function StudySession({ deck, mode, allKana, onExit }: Props) {
  const { current, session, submitRating, advance, restart, accuracy, getCard } = useStudySession(deck, mode);
  const [flipped, setFlipped] = useState(false);
  const [strokeEntry, setStrokeEntry] = useState<KanaEntry | null>(null);

  useEffect(() => {
    setFlipped(false);
  }, [session.currentIndex]);

  // Keyboard shortcuts for rating
  useEffect(() => {
    if (mode !== "flashcard" || !flipped) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "1") submitRating(current!.id, 0, false);
      else if (e.key === "2") submitRating(current!.id, 1, true);
      else if (e.key === "3") submitRating(current!.id, 2, true);
      else if (e.key === "4") submitRating(current!.id, 3, true);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [mode, flipped, current, submitRating]);

  if (session.isComplete) {
    return (
      <div className="flex flex-col items-center gap-6 py-12 text-center">
        <div className="text-6xl">🎉</div>
        <h2 className="text-2xl font-bold" style={{ color: "var(--text)" }}>Sesión completada</h2>
        <div className="grid grid-cols-3 gap-4 w-full max-w-xs">
          <Stat label="Total" value={session.correct + session.incorrect} />
          <Stat label="Correctas" value={session.correct} />
          <Stat label="Precisión" value={`${accuracy}%`} />
        </div>
        <div className="flex gap-3">
          <Button onClick={restart}>Repetir</Button>
          <Button variant="secondary" onClick={onExit}>Salir</Button>
        </div>
      </div>
    );
  }

  if (!current) return null;

  const cardState = getCard(current.id);
  const progress = ((session.currentIndex) / session.queue.length) * 100;

  return (
    <div className="flex flex-col items-center gap-6 w-full max-w-sm mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between w-full">
        <Button variant="ghost" size="sm" onClick={onExit}>
          ← Salir
        </Button>
        <span className="text-sm font-medium" style={{ color: "var(--text-muted)" }}>
          {session.currentIndex + 1} / {session.queue.length}
        </span>
        <span className="text-sm font-medium" style={{ color: "#22c55e" }}>
          {accuracy}%
        </span>
      </div>

      {/* Progress bar */}
      <div className="w-full h-1.5 rounded-full overflow-hidden" style={{ background: "var(--bg-muted)" }}>
        <div
          className="h-full rounded-full transition-all duration-300"
          style={{ width: `${progress}%`, background: "var(--color-primary-500)" }}
        />
      </div>

      {/* Content */}
      {mode === "flashcard" && (
        <>
          <FlashCard
            key={session.currentIndex}
            entry={current}
            cardState={cardState}
            onFlip={() => setFlipped(true)}
            onStrokeClick={() => setStrokeEntry(current)}
          />
          <RatingBar
            visible={flipped}
            onRate={(r) => {
              submitRating(current.id, r, r >= 2);
            }}
          />
          {!flipped && (
            <Button onClick={() => setFlipped(true)} variant="secondary">
              Mostrar respuesta
            </Button>
          )}
        </>
      )}

      {mode === "multiple-choice" && (
        <MultipleChoice
          key={current.id}
          entry={current}
          pool={allKana}
          onAnswer={(correct) => {
            submitRating(current.id, correct ? 2 : 0, correct);
          }}
          onStrokeClick={() => setStrokeEntry(current)}
        />
      )}

      {mode === "typing" && (
        <TypingPractice
          entry={current}
          onAnswer={(correct) => {
            submitRating(current.id, correct ? 2 : 0, correct);
          }}
          onStrokeClick={() => setStrokeEntry(current)}
        />
      )}

      {mode === "inverse" && (
        <InverseCard
          key={current.id}
          entry={current}
          pool={allKana}
          onAnswer={(correct) => {
            submitRating(current.id, correct ? 2 : 0, correct);
          }}
        />
      )}

      {/* Stroke modal */}
      <Modal open={!!strokeEntry} onClose={() => setStrokeEntry(null)} title={`Trazos: ${strokeEntry?.kana ?? ""}`} size="sm">
        {strokeEntry && <StrokeAnimation entry={strokeEntry} autoPlay />}
      </Modal>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="flex flex-col items-center gap-1 p-3 rounded-xl" style={{ background: "var(--bg-muted)" }}>
      <span className="text-2xl font-bold" style={{ color: "var(--text)" }}>{value}</span>
      <span className="text-xs" style={{ color: "var(--text-muted)" }}>{label}</span>
    </div>
  );
}
