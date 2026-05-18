"use client";

import type { Rating } from "@/lib/sm2";

interface Props {
  onRate: (r: Rating) => void;
  visible: boolean;
}

const ratings: Array<{ label: string; sublabel: string; rating: Rating; color: string; key: string }> = [
  { label: "Otra vez",  sublabel: "<1d",    rating: 0, color: "#ef4444", key: "1" },
  { label: "Difícil",   sublabel: "~2d",   rating: 1, color: "#f97316", key: "2" },
  { label: "Bien",      sublabel: "~4d",   rating: 2, color: "#0ea5e9", key: "3" },
  { label: "Fácil",     sublabel: "~1sem", rating: 3, color: "#22c55e", key: "4" },
];

export function RatingBar({ onRate, visible }: Props) {
  if (!visible) return null;
  return (
    <div className="flex gap-2 w-full max-w-sm">
      {ratings.map(({ label, sublabel, rating, color, key }) => (
        <button
          key={rating}
          onClick={() => onRate(rating)}
          className="flex-1 flex flex-col items-center py-2.5 px-1 rounded-xl text-white font-medium text-sm transition-all active:scale-95 hover:opacity-90"
          style={{ background: color }}
        >
          <span>{label}</span>
          <span className="text-xs opacity-75">{sublabel}</span>
          <span className="text-[10px] opacity-60 mt-0.5">[{key}]</span>
        </button>
      ))}
    </div>
  );
}
