"use client";

import { useState } from "react";
import { useProgress } from "@/hooks/useProgress";
import { allKana, kanaById } from "@/data/kana-index";
import { masteryLevel, isDue, dueIn } from "@/lib/sm2";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Modal } from "@/components/ui/Modal";

export default function StatsPage() {
  const { store, resetProgress } = useProgress();
  const [confirmReset, setConfirmReset] = useState(false);

  const dueCount = allKana.filter((k) => {
    const c = store.cards[k.id];
    return c && isDue(c);
  }).length;

  const cardStats = allKana.map((k) => {
    const card = store.cards[k.id];
    return { entry: k, card, mastery: card ? masteryLevel(card) : "new" as const };
  });

  const masteryCount = {
    new:      cardStats.filter((c) => c.mastery === "new").length,
    learning: cardStats.filter((c) => c.mastery === "learning").length,
    review:   cardStats.filter((c) => c.mastery === "review").length,
    mastered: cardStats.filter((c) => c.mastery === "mastered").length,
  };

  // Top 10 hardest (lowest ease factor among reviewed)
  const hardest = Object.entries(store.cards)
    .map(([id, card]) => ({ entry: kanaById.get(id), card }))
    .filter((c) => c.entry && c.card.repetitions > 0)
    .sort((a, b) => a.card.easeFactor - b.card.easeFactor)
    .slice(0, 10);

  // Activity heatmap: last 30 days
  const activityDays: Record<string, number> = {};
  store.reviewDays.forEach((ts) => {
    const day = new Date(ts).toLocaleDateString("en-CA");
    activityDays[day] = (activityDays[day] ?? 0) + 1;
  });

  const last30 = Array.from({ length: 30 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (29 - i));
    const key = d.toLocaleDateString("en-CA");
    return { key, label: d.getDate(), count: activityDays[key] ?? 0 };
  });

  const maxCount = Math.max(...last30.map((d) => d.count), 1);

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 flex flex-col gap-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold" style={{ color: "var(--text)" }}>Estadísticas</h1>
          <p className="text-sm mt-1" style={{ color: "var(--text-muted)" }}>Tu progreso de aprendizaje</p>
        </div>
        <Button variant="danger" size="sm" onClick={() => setConfirmReset(true)}>
          Reset
        </Button>
      </div>

      {/* Summary stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <BigStat value={store.totalReviews} label="Total revisiones" color="#0ea5e9" />
        <BigStat value={dueCount} label="Para revisar" color="#f97316" />
        <BigStat value={masteryCount.mastered} label="Dominados" color="#22c55e" />
        <BigStat value={`${Math.round((masteryCount.mastered / allKana.length) * 100)}%`} label="Completado" color="#d946ef" />
      </div>

      {/* Mastery breakdown */}
      <section className="p-5 rounded-2xl" style={{ background: "var(--bg-card)", border: "1px solid var(--border)", boxShadow: "var(--shadow)" }}>
        <h2 className="text-base font-semibold mb-4" style={{ color: "var(--text)" }}>Distribución de dominio</h2>
        <div className="space-y-3">
          {[
            { key: "new",      label: "Nuevos",      count: masteryCount.new,      color: "#64748b" },
            { key: "learning", label: "Aprendiendo", count: masteryCount.learning, color: "#f97316" },
            { key: "review",   label: "En revisión", count: masteryCount.review,   color: "#0ea5e9" },
            { key: "mastered", label: "Dominados",   count: masteryCount.mastered, color: "#22c55e" },
          ].map(({ key, label, count, color }) => (
            <div key={key}>
              <div className="flex justify-between text-sm mb-1">
                <span style={{ color: "var(--text-muted)" }}>{label}</span>
                <span className="font-semibold" style={{ color: "var(--text)" }}>{count}</span>
              </div>
              <div className="h-2 rounded-full overflow-hidden" style={{ background: "var(--bg-muted)" }}>
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{ width: `${(count / allKana.length) * 100}%`, background: color }}
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Activity heatmap */}
      <section className="p-5 rounded-2xl" style={{ background: "var(--bg-card)", border: "1px solid var(--border)", boxShadow: "var(--shadow)" }}>
        <h2 className="text-base font-semibold mb-4" style={{ color: "var(--text)" }}>Actividad — últimos 30 días</h2>
        <div className="flex gap-1.5 flex-wrap">
          {last30.map((day) => {
            const intensity = day.count === 0 ? 0 : Math.ceil((day.count / maxCount) * 4);
            const alphas = [0, 0.2, 0.4, 0.65, 0.9];
            return (
              <div
                key={day.key}
                className="flex flex-col items-center gap-0.5"
                title={`${day.key}: ${day.count} revisiones`}
              >
                <div
                  className="w-7 h-7 rounded-md"
                  style={{
                    background: day.count === 0
                      ? "var(--bg-muted)"
                      : `rgba(14,165,233,${alphas[intensity]})`,
                  }}
                />
                <span className="text-[9px]" style={{ color: "var(--text-subtle)" }}>{day.label}</span>
              </div>
            );
          })}
        </div>
      </section>

      {/* Hardest cards */}
      {hardest.length > 0 && (
        <section className="p-5 rounded-2xl" style={{ background: "var(--bg-card)", border: "1px solid var(--border)", boxShadow: "var(--shadow)" }}>
          <h2 className="text-base font-semibold mb-4" style={{ color: "var(--text)" }}>Top 10 más difíciles</h2>
          <div className="flex flex-col gap-2">
            {hardest.map(({ entry, card }) => entry && (
              <div
                key={entry.id}
                className="flex items-center justify-between py-2 px-3 rounded-xl"
                style={{ background: "var(--bg-muted)" }}
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl font-bold" style={{ fontFamily: "Noto Sans JP, sans-serif", color: "var(--text)" }}>
                    {entry.kana}
                  </span>
                  <div>
                    <span className="text-sm font-medium" style={{ color: "var(--text)" }}>{entry.romaji}</span>
                    <div className="flex gap-1 mt-0.5">
                      <Badge color="gray">{entry.type}</Badge>
                    </div>
                  </div>
                </div>
                <div className="text-right text-xs" style={{ color: "var(--text-muted)" }}>
                  <div>EF: {card.easeFactor.toFixed(2)}</div>
                  <div>Próx: {dueIn(card)}</div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Reset modal */}
      <Modal open={confirmReset} onClose={() => setConfirmReset(false)} title="¿Resetear progreso?" size="sm">
        <div className="flex flex-col gap-4">
          <p style={{ color: "var(--text-muted)" }}>
            Esto borrará todo tu progreso SRS, historial de revisiones y estadísticas. Esta acción no se puede deshacer.
          </p>
          <div className="flex gap-3">
            <Button variant="danger" className="flex-1" onClick={() => { resetProgress(); setConfirmReset(false); }}>
              Sí, resetear todo
            </Button>
            <Button variant="secondary" className="flex-1" onClick={() => setConfirmReset(false)}>
              Cancelar
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

function BigStat({ value, label, color }: { value: string | number; label: string; color: string }) {
  return (
    <div
      className="p-4 rounded-2xl flex flex-col items-center gap-1 text-center"
      style={{ background: "var(--bg-card)", border: "1px solid var(--border)", boxShadow: "var(--shadow)" }}
    >
      <span className="text-3xl font-bold" style={{ color }}>{value}</span>
      <span className="text-xs" style={{ color: "var(--text-muted)" }}>{label}</span>
    </div>
  );
}
