import { clsx } from "clsx";

type Color = "blue" | "purple" | "green" | "red" | "orange" | "gray";

interface BadgeProps {
  children: React.ReactNode;
  color?: Color;
  className?: string;
}

const colorMap: Record<Color, { bg: string; text: string }> = {
  blue:   { bg: "rgba(14,165,233,0.15)",  text: "#0ea5e9" },
  purple: { bg: "rgba(217,70,239,0.15)",  text: "#d946ef" },
  green:  { bg: "rgba(34,197,94,0.15)",   text: "#22c55e" },
  red:    { bg: "rgba(239,68,68,0.15)",   text: "#ef4444" },
  orange: { bg: "rgba(249,115,22,0.15)",  text: "#f97316" },
  gray:   { bg: "rgba(100,116,139,0.15)", text: "#64748b" },
};

export function Badge({ children, color = "blue", className }: BadgeProps) {
  const { bg, text } = colorMap[color];
  return (
    <span
      className={clsx("inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium", className)}
      style={{ background: bg, color: text }}
    >
      {children}
    </span>
  );
}
