"use client";

import { createContext, useContext } from "react";
import { useTheme } from "@/hooks/useTheme";

const ThemeCtx = createContext<ReturnType<typeof useTheme> | null>(null);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const theme = useTheme();
  return <ThemeCtx.Provider value={theme}>{children}</ThemeCtx.Provider>;
}

export function useThemeCtx() {
  const ctx = useContext(ThemeCtx);
  if (!ctx) throw new Error("useThemeCtx must be inside ThemeProvider");
  return ctx;
}
