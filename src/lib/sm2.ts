export type Rating = 0 | 1 | 2 | 3; // Again=0, Hard=1, Good=2, Easy=3

export interface CardState {
  easeFactor: number;
  interval: number;
  repetitions: number;
  nextReview: number;
  lastRating?: Rating;
}

export const DEFAULT_CARD: CardState = {
  easeFactor: 2.5,
  interval: 0,
  repetitions: 0,
  nextReview: Date.now(),
};

export function sm2(card: CardState, rating: Rating): CardState {
  const ef = Math.max(1.3, card.easeFactor + 0.1 - (3 - rating) * (0.08 + (3 - rating) * 0.02));

  if (rating === 0) {
    return { ...card, easeFactor: ef, interval: 1, repetitions: 0, nextReview: dayOffset(1), lastRating: rating };
  }

  let interval: number;
  const reps = card.repetitions + 1;

  if (reps === 1) {
    interval = 1;
  } else if (reps === 2) {
    interval = 6;
  } else {
    interval = Math.round(card.interval * ef);
  }

  if (rating === 1) interval = Math.max(1, Math.round(interval * 0.6));
  if (rating === 3) interval = Math.round(interval * 1.3);

  return {
    easeFactor: ef,
    interval,
    repetitions: reps,
    nextReview: dayOffset(interval),
    lastRating: rating,
  };
}

function dayOffset(days: number): number {
  return Date.now() + days * 86_400_000;
}

export function isDue(card: CardState): boolean {
  return card.nextReview <= Date.now();
}

export function dueIn(card: CardState): string {
  const ms = card.nextReview - Date.now();
  if (ms <= 0) return "ahora";
  const mins = Math.round(ms / 60_000);
  if (mins < 60) return `${mins}m`;
  const hrs = Math.round(ms / 3_600_000);
  if (hrs < 24) return `${hrs}h`;
  return `${Math.round(ms / 86_400_000)}d`;
}

export function masteryLevel(card: CardState): "new" | "learning" | "review" | "mastered" {
  if (card.repetitions === 0) return "new";
  if (card.repetitions < 3) return "learning";
  if (card.interval < 21) return "review";
  return "mastered";
}
