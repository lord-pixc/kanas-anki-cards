"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "./ThemeToggle";
import { clsx } from "clsx";

const links = [
  { href: "/",           label: "Inicio" },
  { href: "/study",      label: "Estudiar" },
  { href: "/cheatsheet", label: "Tabla" },
  { href: "/stats",      label: "Stats" },
];

export function Navbar() {
  const path = usePathname();
  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 h-16 flex items-center px-4 md:px-8 gap-6"
      style={{
        background: "var(--bg-card)",
        borderBottom: "1px solid var(--border)",
        boxShadow: "var(--shadow)",
      }}
    >
      <Link
        href="/"
        className="font-bold text-lg tracking-tight shrink-0"
        style={{ color: "var(--text)" }}
      >
        <span style={{ color: "var(--color-primary-500)" }}>か</span>
        <span style={{ color: "var(--color-accent-500)" }}>ア</span>
        <span className="ml-1 text-sm font-medium" style={{ color: "var(--text-muted)" }}>
          Cards
        </span>
      </Link>

      <div className="flex items-center gap-1 flex-1">
        {links.map((l) => {
          const active = l.href === "/" ? path === "/" : path.startsWith(l.href);
          return (
            <Link
              key={l.href}
              href={l.href}
              className={clsx(
                "px-3 py-1.5 rounded-lg text-sm font-medium transition-colors",
                active
                  ? "text-white"
                  : "hover:opacity-80"
              )}
              style={
                active
                  ? { background: "var(--color-primary-500)", color: "white" }
                  : { color: "var(--text-muted)" }
              }
            >
              {l.label}
            </Link>
          );
        })}
      </div>

      <ThemeToggle />
    </nav>
  );
}
