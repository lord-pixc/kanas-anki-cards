"use client";

import { useState } from "react";
import type { FilterOptions, KanaType, Script } from "@/data/kana-index";

const DEFAULT_FILTERS: FilterOptions = {
  scripts: "hiragana",
  types: ["basic"],
  rows: [],
};

export function useFilters() {
  const [filters, setFilters] = useState<FilterOptions>(DEFAULT_FILTERS);

  function setScript(scripts: Script) {
    setFilters((f) => ({ ...f, scripts }));
  }

  function toggleType(type: KanaType) {
    setFilters((f) => ({
      ...f,
      types: f.types.includes(type)
        ? f.types.filter((t) => t !== type)
        : [...f.types, type],
    }));
  }

  function toggleRow(row: string) {
    setFilters((f) => ({
      ...f,
      rows: f.rows.includes(row) ? f.rows.filter((r) => r !== row) : [...f.rows, row],
    }));
  }

  function selectAllRows() {
    setFilters((f) => ({ ...f, rows: [] }));
  }

  function reset() {
    setFilters(DEFAULT_FILTERS);
  }

  return { filters, setScript, toggleType, toggleRow, selectAllRows, reset };
}
