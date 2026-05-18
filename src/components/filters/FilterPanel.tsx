"use client";

import { clsx } from "clsx";
import type { FilterOptions, KanaType, Script } from "@/data/kana-index";

interface Props {
  filters: FilterOptions;
  availableRows: Array<{ id: string; label: string }>;
  onSetScript: (s: Script) => void;
  onToggleType: (t: KanaType) => void;
  onToggleRow: (r: string) => void;
  onSelectAllRows: () => void;
}

const scripts: Array<{ value: Script; label: string }> = [
  { value: "hiragana", label: "Hiragana" },
  { value: "katakana", label: "Katakana" },
  { value: "both",     label: "Ambos" },
];

const types: Array<{ value: KanaType; label: string; desc: string }> = [
  { value: "basic",       label: "Básico",      desc: "46 silabas fundamentales" },
  { value: "dakuten",     label: "Dakuten ゛",   desc: "Variantes sonoras (が, ざ…)" },
  { value: "handakuten",  label: "Handakuten ゜", desc: "Variantes con ゜ (ぱ…)" },
  { value: "youon",       label: "Compuestas",   desc: "きゃ, しゅ, ちょ…" },
];

export function FilterPanel({ filters, availableRows, onSetScript, onToggleType, onToggleRow, onSelectAllRows }: Props) {
  const rows = availableRows;
  const allRowsSelected = filters.rows.length === 0;

  return (
    <div className="flex flex-col gap-6 w-full">
      {/* Script */}
      <section>
        <h3 className="text-sm font-semibold mb-2" style={{ color: "var(--text-muted)" }}>Silabario</h3>
        <div className="flex gap-2">
          {scripts.map(({ value, label }) => (
            <button
              key={value}
              onClick={() => onSetScript(value)}
              className={clsx("flex-1 py-2 rounded-xl text-sm font-medium transition-all border")}
              style={
                filters.scripts === value
                  ? { background: "var(--color-primary-500)", color: "white", borderColor: "var(--color-primary-500)" }
                  : { background: "var(--bg-muted)", color: "var(--text-muted)", borderColor: "transparent" }
              }
            >
              {label}
            </button>
          ))}
        </div>
      </section>

      {/* Types */}
      <section>
        <h3 className="text-sm font-semibold mb-2" style={{ color: "var(--text-muted)" }}>Tipo de silabas</h3>
        <div className="grid grid-cols-2 gap-2">
          {types.map(({ value, label, desc }) => {
            const active = filters.types.includes(value);
            return (
              <button
                key={value}
                onClick={() => onToggleType(value)}
                className={clsx("p-3 rounded-xl text-left transition-all border")}
                style={
                  active
                    ? { background: "rgba(14,165,233,0.1)", borderColor: "var(--color-primary-500)", color: "var(--text)" }
                    : { background: "var(--bg-muted)", borderColor: "transparent", color: "var(--text-muted)" }
                }
              >
                <div className="font-medium text-sm">{label}</div>
                <div className="text-xs opacity-70 mt-0.5">{desc}</div>
              </button>
            );
          })}
        </div>
      </section>

      {/* Rows */}
      <section>
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-semibold" style={{ color: "var(--text-muted)" }}>Filas (romaji)</h3>
          <button
            onClick={onSelectAllRows}
            className="text-xs font-medium transition-opacity hover:opacity-70"
            style={{ color: "var(--color-primary-500)" }}
          >
            {allRowsSelected ? "Todas seleccionadas" : "Seleccionar todas"}
          </button>
        </div>
        <div className="flex flex-wrap gap-2">
          {rows.map(({ id, label }) => {
            const active = filters.rows.includes(id) || allRowsSelected;
            return (
              <button
                key={id}
                onClick={() => onToggleRow(id)}
                className={clsx("px-3 py-1.5 rounded-lg text-sm font-medium transition-all border")}
                style={
                  filters.rows.includes(id) || allRowsSelected
                    ? {
                        background: filters.rows.includes(id) ? "var(--color-primary-500)" : "var(--bg-muted)",
                        color: filters.rows.includes(id) ? "white" : "var(--text-muted)",
                        borderColor: allRowsSelected ? "var(--border)" : filters.rows.includes(id) ? "var(--color-primary-500)" : "transparent",
                      }
                    : { background: "var(--bg-muted)", color: "var(--text-subtle)", borderColor: "transparent" }
                }
              >
                {label}
              </button>
            );
          })}
        </div>
      </section>
    </div>
  );
}
