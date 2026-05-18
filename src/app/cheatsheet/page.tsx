"use client";

import { useState } from "react";
import { clsx } from "clsx";
import { KanaTable } from "@/components/cheatsheet/KanaTable";
import { hiragana, katakana } from "@/data/kana-index";
import type { KanaType } from "@/data/kana-index";

type Tab = "hiragana" | "katakana" | "both";
type Section = KanaType;

export default function CheatsheetPage() {
  const [tab, setTab] = useState<Tab>("hiragana");
  const [section, setSection] = useState<Section>("basic");

  const tabs: Array<{ value: Tab; label: string }> = [
    { value: "hiragana", label: "Hiragana (ひらがな)" },
    { value: "katakana", label: "Katakana (カタカナ)" },
    { value: "both",     label: "Comparación" },
  ];

  const sections: Array<{ value: Section; label: string }> = [
    { value: "basic",      label: "Básico" },
    { value: "dakuten",    label: "Dakuten ゛" },
    { value: "handakuten", label: "Handakuten ゜" },
    { value: "youon",      label: "Compuestas" },
  ];

  const hiSection = hiragana.filter((k) => k.type === section);
  const kaSection = katakana.filter((k) => k.type === section);

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 flex flex-col gap-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold" style={{ color: "var(--text)" }}>Tabla de silabarios</h1>
          <p className="text-sm mt-1" style={{ color: "var(--text-muted)" }}>
            Haz clic en cualquier kana para ver su animación de trazos
          </p>
        </div>
        <button
          onClick={() => window.print()}
          className="no-print flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-colors border"
          style={{ background: "var(--bg-muted)", color: "var(--text-muted)", borderColor: "var(--border)" }}
        >
          🖨️ Imprimir
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 p-1 rounded-xl" style={{ background: "var(--bg-muted)" }}>
        {tabs.map(({ value, label }) => (
          <button
            key={value}
            onClick={() => setTab(value)}
            className="flex-1 py-2 px-2 sm:px-3 rounded-lg text-xs sm:text-sm font-medium transition-all whitespace-nowrap"
            style={
              tab === value
                ? { background: "var(--bg-card)", color: "var(--text)", boxShadow: "var(--shadow)" }
                : { color: "var(--text-muted)" }
            }
          >
            {label}
          </button>
        ))}
      </div>

      {/* Sections */}
      <div className="flex gap-2 flex-wrap">
        {sections.map(({ value, label }) => (
          <button
            key={value}
            onClick={() => setSection(value)}
            className="px-4 py-1.5 rounded-lg text-sm font-medium transition-all border"
            style={
              section === value
                ? { background: "var(--color-primary-500)", color: "white", borderColor: "var(--color-primary-500)" }
                : { background: "var(--bg-muted)", color: "var(--text-muted)", borderColor: "transparent" }
            }
          >
            {label}
          </button>
        ))}
      </div>

      {/* Tables */}
      <div
        className="p-3 sm:p-6 rounded-2xl"
        style={{ background: "var(--bg-card)", border: "1px solid var(--border)", boxShadow: "var(--shadow)" }}
      >
        {tab === "both" ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-6">
            <KanaTable
              entries={hiSection}
              title="Hiragana (ひらがな)"
              section={section}
            />
            <KanaTable
              entries={kaSection}
              title="Katakana (カタカナ)"
              section={section}
            />
          </div>
        ) : tab === "hiragana" ? (
          <KanaTable entries={hiSection} title="Hiragana" section={section} />
        ) : (
          <KanaTable entries={kaSection} title="Katakana" section={section} />
        )}
      </div>

      {/* Legend */}
      <div
        className="p-4 rounded-xl text-sm"
        style={{ background: "var(--bg-muted)", color: "var(--text-muted)" }}
      >
        💡 <strong>Tip:</strong> Haz clic en cualquier carácter para ver la animación de trazos con controles de velocidad.
        Usa el botón de imprimir para exportar la tabla como PDF.
      </div>
    </div>
  );
}
