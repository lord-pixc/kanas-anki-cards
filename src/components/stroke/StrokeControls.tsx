"use client";

import { clsx } from "clsx";

type Speed = "slow" | "normal" | "fast";

interface Props {
  playing: boolean;
  speed: Speed;
  showNumbers: boolean;
  atEnd: boolean;
  onPlay: () => void;
  onPause: () => void;
  onStep: () => void;
  onReset: () => void;
  onSpeedChange: (s: Speed) => void;
  onToggleNumbers: () => void;
}

export function StrokeControls({ playing, speed, showNumbers, atEnd, onPlay, onPause, onStep, onReset, onSpeedChange, onToggleNumbers }: Props) {
  return (
    <div className="flex flex-col items-center gap-3 w-full">
      {/* Main controls */}
      <div className="flex items-center gap-2">
        {/* Reset */}
        <button
          onClick={onReset}
          aria-label="Reiniciar"
          className="w-9 h-9 flex items-center justify-center rounded-xl transition-colors hover:opacity-80"
          style={{ background: "var(--bg-muted)", color: "var(--text-muted)" }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
            <path d="M3 3v5h5" />
          </svg>
        </button>

        {/* Play/Pause */}
        <button
          onClick={playing ? onPause : onPlay}
          aria-label={playing ? "Pausar" : atEnd ? "Reiniciar y reproducir" : "Reproducir"}
          className="w-12 h-12 flex items-center justify-center rounded-xl text-white transition-all active:scale-95"
          style={{ background: "var(--color-primary-500)" }}
        >
          {playing ? (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <rect x="6" y="4" width="4" height="16" rx="1" />
              <rect x="14" y="4" width="4" height="16" rx="1" />
            </svg>
          ) : (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <polygon points="5,3 19,12 5,21" />
            </svg>
          )}
        </button>

        {/* Step */}
        <button
          onClick={onStep}
          aria-label="Siguiente trazo"
          className="w-9 h-9 flex items-center justify-center rounded-xl transition-colors hover:opacity-80"
          style={{ background: "var(--bg-muted)", color: "var(--text-muted)" }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polygon points="5,4 15,12 5,20" />
            <line x1="19" y1="4" x2="19" y2="20" />
          </svg>
        </button>
      </div>

      {/* Speed + Numbers */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1 rounded-lg p-1" style={{ background: "var(--bg-muted)" }}>
          {(["slow", "normal", "fast"] as Speed[]).map((s) => (
            <button
              key={s}
              onClick={() => onSpeedChange(s)}
              className={clsx("px-2.5 py-1 text-xs font-medium rounded-md transition-colors")}
              style={
                speed === s
                  ? { background: "var(--color-primary-500)", color: "white" }
                  : { color: "var(--text-muted)" }
              }
            >
              {s === "slow" ? "Lento" : s === "normal" ? "Normal" : "Rápido"}
            </button>
          ))}
        </div>

        <button
          onClick={onToggleNumbers}
          className={clsx("px-2.5 py-1.5 text-xs font-medium rounded-lg transition-colors border")}
          style={
            showNumbers
              ? { background: "var(--color-primary-500)", color: "white", borderColor: "var(--color-primary-500)" }
              : { color: "var(--text-muted)", borderColor: "var(--border)", background: "var(--bg-muted)" }
          }
        >
          #
        </button>
      </div>
    </div>
  );
}
