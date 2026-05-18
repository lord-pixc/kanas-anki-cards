"use client";

import { useCallback, useEffect, useState } from "react";
import { DEFAULT_CARD, sm2, type CardState, type Rating } from "@/lib/sm2";

const STORAGE_KEY = "kana-progress-v1";
const HISTORY_KEY = "kana-history-v1";

export interface ProgressStore {
  cards: Record<string, CardState>;
  reviewDays: number[]; // daily timestamps of reviews
  totalReviews: number;
}

function load(): ProgressStore {
  if (typeof window === "undefined") return { cards: {}, reviewDays: [], totalReviews: 0 };
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : { cards: {}, reviewDays: [], totalReviews: 0 };
  } catch {
    return { cards: {}, reviewDays: [], totalReviews: 0 };
  }
}

function save(store: ProgressStore) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
}

export function useProgress() {
  const [store, setStore] = useState<ProgressStore>({ cards: {}, reviewDays: [], totalReviews: 0 });

  useEffect(() => {
    setStore(load());
  }, []);

  const getCard = useCallback((id: string): CardState => {
    return store.cards[id] ?? { ...DEFAULT_CARD };
  }, [store]);

  const rateCard = useCallback((id: string, rating: Rating) => {
    setStore((prev) => {
      const current = prev.cards[id] ?? { ...DEFAULT_CARD };
      const updated = sm2(current, rating);
      const now = Date.now();
      const next: ProgressStore = {
        cards: { ...prev.cards, [id]: updated },
        reviewDays: [...prev.reviewDays, now],
        totalReviews: prev.totalReviews + 1,
      };
      save(next);
      return next;
    });
  }, []);

  const resetProgress = useCallback(() => {
    const empty: ProgressStore = { cards: {}, reviewDays: [], totalReviews: 0 };
    save(empty);
    setStore(empty);
  }, []);

  return { store, getCard, rateCard, resetProgress };
}
