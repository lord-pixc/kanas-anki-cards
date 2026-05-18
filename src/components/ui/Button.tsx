import { clsx } from "clsx";
import type { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
}

export function Button({ variant = "primary", size = "md", className, children, ...props }: ButtonProps) {
  return (
    <button
      {...props}
      className={clsx(
        "inline-flex items-center justify-center gap-2 font-medium rounded-xl transition-all active:scale-95 disabled:opacity-50 disabled:pointer-events-none",
        size === "sm" && "px-3 py-1.5 text-sm",
        size === "md" && "px-5 py-2.5 text-sm",
        size === "lg" && "px-6 py-3 text-base",
        variant === "primary" && "text-white shadow-sm",
        variant === "secondary" && "border",
        variant === "ghost" && "",
        variant === "danger" && "text-white shadow-sm",
        className
      )}
      style={{
        ...(variant === "primary" ? { background: "var(--color-primary-500)" } : {}),
        ...(variant === "secondary" ? { background: "var(--bg-muted)", color: "var(--text)", border: "1px solid var(--border)" } : {}),
        ...(variant === "ghost" ? { color: "var(--text-muted)" } : {}),
        ...(variant === "danger" ? { background: "#ef4444" } : {}),
      }}
    >
      {children}
    </button>
  );
}
