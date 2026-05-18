"use client";

import { useState } from "react";
import type { KanaEntry } from "@/data/kana-index";
import { ROW_ROMAJI } from "@/data/kana-index";
import { KanaCell } from "./KanaCell";
import { StrokeAnimation } from "../stroke/StrokeAnimation";
import { Modal } from "../ui/Modal";

interface Props {
  entries: KanaEntry[];
  title: string;
  section?: "basic" | "dakuten" | "handakuten" | "youon";
}

const COLS_AIUEO = ["a", "i", "u", "e", "o"];
const COLS_YA = ["ya", "yu", "yo"];

// Filas por sección (corrige que dakuten/handakuten no aparecían).
const ROWS_BY_SECTION: Record<string, string[]> = {
  basic:      ["a", "ka", "sa", "ta", "na", "ha", "ma", "ya", "ra", "wa", "n"],
  dakuten:    ["ga", "za", "da", "ba"],
  handakuten: ["pa"],
  youon:      ["ka", "sa", "ta", "na", "ha", "ma", "ra", "ga", "za", "ba", "pa"],
};

export function KanaTable({ entries, title, section = "basic" }: Props) {
  const [selected, setSelected] = useState<KanaEntry | null>(null);

  const byRowCol = new Map<string, KanaEntry>();
  entries.forEach((e) => byRowCol.set(`${e.row}:${e.col}`, e));

  const isYouon = section === "youon";
  const cols = isYouon ? COLS_YA : COLS_AIUEO;
  const rows = (ROWS_BY_SECTION[section] ?? ROWS_BY_SECTION.basic).filter((row) =>
    cols.some((col) => byRowCol.has(`${row}:${col}`))
  );

  // grid: 1ª columna = etiqueta de fila, resto = una por sílaba
  const gridCols = `clamp(2rem, 8%, 3rem) repeat(${cols.length}, minmax(0, 1fr))`;

  return (
    <div className="w-full">
      <h3 className="text-base font-semibold mb-3" style={{ color: "var(--text)" }}>
        {title}
      </h3>

      <div className="grid gap-1.5 sm:gap-2" style={{ gridTemplateColumns: gridCols }}>
        {/* Header */}
        <div />
        {cols.map((c) => (
          <div
            key={c}
            className="flex items-end justify-center pb-1 text-[10px] sm:text-xs font-semibold uppercase"
            style={{ color: "var(--text-subtle)" }}
          >
            {c}
          </div>
        ))}

        {/* Rows */}
        {rows.map((row) => (
          <RowFragment
            key={row}
            row={row}
            cols={cols}
            byRowCol={byRowCol}
            selectedId={selected?.id}
            onSelect={setSelected}
          />
        ))}
      </div>

      <Modal
        open={!!selected}
        onClose={() => setSelected(null)}
        title={selected ? `${selected.kana} — ${selected.romaji}` : ""}
        size="sm"
      >
        {selected && <StrokeAnimation entry={selected} autoPlay />}
      </Modal>
    </div>
  );
}

function RowFragment({
  row,
  cols,
  byRowCol,
  selectedId,
  onSelect,
}: {
  row: string;
  cols: string[];
  byRowCol: Map<string, KanaEntry>;
  selectedId?: string;
  onSelect: (e: KanaEntry) => void;
}) {
  return (
    <>
      <div
        className="flex items-center justify-end pr-1 text-[10px] sm:text-xs font-semibold uppercase"
        style={{ color: "var(--text-subtle)" }}
      >
        {(ROW_ROMAJI[row] ?? row)}
      </div>
      {cols.map((col) => {
        const entry = byRowCol.get(`${row}:${col}`) ?? null;
        return (
          <KanaCell
            key={col}
            entry={entry}
            onClick={onSelect}
            highlight={!!entry && selectedId === entry.id}
          />
        );
      })}
    </>
  );
}
