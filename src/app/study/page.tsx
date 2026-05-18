"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { FilterPanel } from "@/components/filters/FilterPanel";
import { StudySession } from "@/components/flashcard/StudySession";
import { Button } from "@/components/ui/Button";
import { useFilters } from "@/hooks/useFilters";
import { filterKana, allKana, getAvailableRows } from "@/data/kana-index";
import type { StudyMode } from "@/hooks/useStudySession";
import { Badge } from "@/components/ui/Badge";

function StudyPageInner() {
  const searchParams = useSearchParams();
  const initialMode = (searchParams.get("mode") as StudyMode) ?? "flashcard";

  const { filters, setScript, toggleType, toggleRow, selectAllRows } = useFilters();
  const [mode, setMode] = useState<StudyMode>(initialMode);
  const [started, setStarted] = useState(false);

  const availableRows = getAvailableRows({ scripts: filters.scripts, types: filters.types });

  const deck = filterKana(filters);

  const modeOptions: Array<{ value: StudyMode; label: string; icon: string }> = [
    { value: "flashcard",       label: "Flashcard",       icon: "🃏" },
    { value: "multiple-choice", label: "Opción múltiple", icon: "☑️" },
    { value: "typing",          label: "Escritura",       icon: "⌨️" },
    { value: "inverse",         label: "Inverso",         icon: "🔄" },
  ];

  if (started && deck.length > 0) {
    return (
      <div className="max-w-xl mx-auto px-4 py-8">
        <StudySession
          deck={deck}
          mode={mode}
          allKana={allKana}
          onExit={() => setStarted(false)}
        />
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto px-4 py-8 flex flex-col gap-8">
      <div>
        <h1 className="text-2xl font-bold mb-1" style={{ color: "var(--text)" }}>Configurar sesión</h1>
        <p className="text-sm" style={{ color: "var(--text-muted)" }}>
          Elige qué kana practicar y en qué modo
        </p>
      </div>

      {/* Mode selector */}
      <section>
        <h2 className="text-sm font-semibold mb-3" style={{ color: "var(--text-muted)" }}>Modo de estudio</h2>
        <div className="grid grid-cols-2 gap-2">
          {modeOptions.map(({ value, label, icon }) => (
            <button
              key={value}
              onClick={() => setMode(value)}
              className="p-3 rounded-xl flex items-center gap-2 text-sm font-medium transition-all border"
              style={
                mode === value
                  ? { background: "var(--color-primary-500)", color: "white", borderColor: "var(--color-primary-500)" }
                  : { background: "var(--bg-muted)", color: "var(--text-muted)", borderColor: "transparent" }
              }
            >
              <span>{icon}</span>
              <span>{label}</span>
            </button>
          ))}
        </div>
      </section>

      {/* Filters */}
      <section
        className="p-5 rounded-2xl"
        style={{ background: "var(--bg-card)", border: "1px solid var(--border)", boxShadow: "var(--shadow)" }}
      >
        <FilterPanel
          filters={filters}
          availableRows={availableRows}
          onSetScript={setScript}
          onToggleType={toggleType}
          onToggleRow={toggleRow}
          onSelectAllRows={selectAllRows}
        />
      </section>

      {/* Start */}
      <div className="flex items-center justify-between">
        <div className="text-sm" style={{ color: "var(--text-muted)" }}>
          {deck.length > 0 ? (
            <span><strong style={{ color: "var(--text)" }}>{deck.length}</strong> kana seleccionados</span>
          ) : (
            <span className="text-red-400">Selecciona al menos un tipo de silaba</span>
          )}
        </div>
        <Button
          onClick={() => setStarted(true)}
          disabled={deck.length === 0}
          size="lg"
        >
          Empezar →
        </Button>
      </div>
    </div>
  );
}

export default function StudyPage() {
  return (
    <Suspense>
      <StudyPageInner />
    </Suspense>
  );
}
