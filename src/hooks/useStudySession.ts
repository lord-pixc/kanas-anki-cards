"use client";

import { useCallback, useMemo, useState } from "react";
import { shuffle } from "@/lib/kana-utils";
import { isDue } from "@/lib/sm2";
import { useProgress } from "./useProgress";
import type { KanaEntry } from "@/data/kana-index";

export type StudyMode = "flashcard" | "multiple-choice" | "typing" | "inverse";

interface SessionState {
  queue: KanaEntry[];
  currentIndex: number;
  correct: number;
  incorrect: number;
  isComplete: boolean;
}

export function useStudySession(deck: KanaEntry[], mode: StudyMode) {
  const { getCard, rateCard } = useProgress();

  const orderedDeck = useMemo(() => {
    const due = deck.filter((k) => isDue(getCard(k.id)));
    const notDue = deck.filter((k) => !isDue(getCard(k.id)));
    return [...shuffle(due), ...shuffle(notDue)];
  }, [deck]); // eslint-disable-line

  const [session, setSession] = useState<SessionState>({
    queue: orderedDeck,
    currentIndex: 0,
    correct: 0,
    incorrect: 0,
    isComplete: false,
  });

  const current = session.queue[session.currentIndex] ?? null;

  const advance = useCallback(
    (correct: boolean) => {
      setSession((s) => {
        const nextIndex = s.currentIndex + 1;
        return {
          ...s,
          currentIndex: nextIndex,
          correct: s.correct + (correct ? 1 : 0),
          incorrect: s.incorrect + (correct ? 0 : 1),
          isComplete: nextIndex >= s.queue.length,
        };
      });
    },
    []
  );

  const submitRating = useCallback(
    (id: string, rating: import("@/lib/sm2").Rating, correct: boolean) => {
      rateCard(id, rating);
      advance(correct);
    },
    [rateCard, advance]
  );

  const restart = useCallback(() => {
    setSession({
      queue: shuffle([...orderedDeck]),
      currentIndex: 0,
      correct: 0,
      incorrect: 0,
      isComplete: false,
    });
  }, [orderedDeck]);

  const accuracy =
    session.correct + session.incorrect > 0
      ? Math.round((session.correct / (session.correct + session.incorrect)) * 100)
      : 0;

  return {
    current,
    session,
    submitRating,
    advance,
    restart,
    accuracy,
    getCard,
  };
}
