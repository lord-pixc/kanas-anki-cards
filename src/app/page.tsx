"use client";

import Link from "next/link";
import { useProgress } from "@/hooks/useProgress";
import { allKana } from "@/data/kana-index";
import { masteryLevel, isDue } from "@/lib/sm2";
import { Badge } from "@/components/ui/Badge";

export default function Dashboard() {
  const { store } = useProgress();

  const stats = allKana.reduce(
    (acc, k) => {
      const card = store.cards[k.id];
      if (!card) { acc.newCount++; return acc; }
      const m = masteryLevel(card);
      if (m === "learning") acc.learning++;
      else if (m === "review") acc.review++;
      else if (m === "mastered") acc.mastered++;
      if (isDue(card)) acc.due++;
      return acc;
    },
    { newCount: 0, learning: 0, review: 0, mastered: 0, due: 0 }
  );

  const totalCards = allKana.length;
  const masteredPct = Math.round((stats.mastered / totalCards) * 100);

  const modes = [
    { href: "/study?mode=flashcard",        label: "Flashcard",       icon: "🃏", desc: "Voltea y evalúa con SRS" },
    { href: "/study?mode=multiple-choice",  label: "Opción múltiple", icon: "☑️", desc: "4 opciones de respuesta" },
    { href: "/study?mode=typing",           label: "Escritura",       icon: "⌨️", desc: "Escribe el romaji" },
    { href: "/study?mode=inverse",          label: "Inverso",         icon: "🔄", desc: "Romaji → Kana" },
  ];

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 flex flex-col gap-8">
      {/* Hero */}
      <section className="text-center py-4">
        <h1 className="text-4xl font-bold mb-2" style={{ color: "var(--text)" }}>
          <span style={{ color: "var(--color-primary-500)" }}>Hiragana</span>
          {" & "}
          <span style={{ color: "var(--color-accent-500)" }}>Katakana</span>
        </h1>
        <p className="text-lg" style={{ color: "var(--text-muted)" }}>
          Aprende los silabarios japoneses con repetición espaciada
        </p>
      </section>

      {/* Stats */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <StatCard value={stats.due} label="Para revisar" color="#0ea5e9" />
        <StatCard value={`${masteredPct}%`} label="Dominado" color="#22c55e" />
        <StatCard value={stats.learning} label="Aprendiendo" color="#f97316" />
        <StatCard value={store.totalReviews} label="Revisiones" color="#d946ef" />
      </section>

      {/* Mastery bar */}
      <section className="p-5 rounded-2xl" style={{ background: "var(--bg-card)", border: "1px solid var(--border)", boxShadow: "var(--shadow)" }}>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-semibold" style={{ color: "var(--text)" }}>Progreso total ({totalCards} kana)</h2>
          <div className="flex gap-2">
            <Badge color="gray">Nuevo: {stats.newCount}</Badge>
            <Badge color="orange">Aprendiendo: {stats.learning}</Badge>
            <Badge color="blue">Revisión: {stats.review}</Badge>
            <Badge color="green">Dominado: {stats.mastered}</Badge>
          </div>
        </div>
        <div className="h-3 rounded-full overflow-hidden flex" style={{ background: "var(--bg-muted)" }}>
          <div style={{ width: `${(stats.learning / totalCards) * 100}%`, background: "#f97316" }} />
          <div style={{ width: `${(stats.review / totalCards) * 100}%`, background: "#0ea5e9" }} />
          <div style={{ width: `${(stats.mastered / totalCards) * 100}%`, background: "#22c55e" }} />
        </div>
      </section>

      {/* Quick start */}
      <section>
        <h2 className="text-lg font-bold mb-4" style={{ color: "var(--text)" }}>Modos de práctica</h2>
        <div className="grid grid-cols-2 gap-3">
          {modes.map((m) => (
            <Link
              key={m.href}
              href={m.href}
              className="p-4 rounded-2xl flex items-start gap-3 transition-all hover:scale-[1.02] active:scale-[0.98]"
              style={{ background: "var(--bg-card)", border: "1px solid var(--border)", boxShadow: "var(--shadow)" }}
            >
              <span className="text-2xl">{m.icon}</span>
              <div>
                <div className="font-semibold text-sm" style={{ color: "var(--text)" }}>{m.label}</div>
                <div className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>{m.desc}</div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Navigation */}
      <section className="grid grid-cols-2 gap-3">
        <Link
          href="/cheatsheet"
          className="p-5 rounded-2xl flex flex-col gap-2 transition-all hover:scale-[1.02]"
          style={{ background: "linear-gradient(135deg, rgba(14,165,233,0.1), rgba(217,70,239,0.1))", border: "1px solid var(--border)" }}
        >
          <span className="text-2xl">📋</span>
          <div className="font-bold" style={{ color: "var(--text)" }}>Tabla completa</div>
          <div className="text-sm" style={{ color: "var(--text-muted)" }}>Cheatsheet de hiragana y katakana con animación de trazos</div>
        </Link>
        <Link
          href="/stats"
          className="p-5 rounded-2xl flex flex-col gap-2 transition-all hover:scale-[1.02]"
          style={{ background: "linear-gradient(135deg, rgba(249,115,22,0.1), rgba(34,197,94,0.1))", border: "1px solid var(--border)" }}
        >
          <span className="text-2xl">📊</span>
          <div className="font-bold" style={{ color: "var(--text)" }}>Estadísticas</div>
          <div className="text-sm" style={{ color: "var(--text-muted)" }}>Historial de práctica, precisión y caracteres difíciles</div>
        </Link>
      </section>
    </div>
  );
}

function StatCard({ value, label, color }: { value: string | number; label: string; color: string }) {
  return (
    <div
      className="p-4 rounded-2xl flex flex-col items-center gap-1 text-center"
      style={{ background: "var(--bg-card)", border: "1px solid var(--border)", boxShadow: "var(--shadow)" }}
    >
      <span className="text-2xl font-bold" style={{ color }}>{value}</span>
      <span className="text-xs" style={{ color: "var(--text-muted)" }}>{label}</span>
    </div>
  );
}
