"use client";

import { useEffect, useRef, useState } from "react";
import { getPathStart } from "@/lib/kana-utils";
import { StrokeControls } from "./StrokeControls";
import type { KanaEntry } from "@/data/kana-index";

interface Props {
  entry: KanaEntry;
  autoPlay?: boolean;
}

const SPEEDS = { slow: 1800, normal: 900, fast: 400 };
type Speed = keyof typeof SPEEDS;

export function StrokeAnimation({ entry, autoPlay = false }: Props) {
  const [currentStroke, setCurrentStroke] = useState(-1);
  const [playing, setPlaying] = useState(autoPlay);
  const [showNumbers, setShowNumbers] = useState(true);
  const [speed, setSpeed] = useState<Speed>("normal");
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const strokes = entry.strokes;

  const hasStrokes = strokes.length > 0;

  function clearTimer() {
    if (timerRef.current) clearTimeout(timerRef.current);
  }

  function reset() {
    clearTimer();
    setCurrentStroke(-1);
    setPlaying(false);
  }

  function playFrom(index: number) {
    setCurrentStroke(index);
    setPlaying(true);
  }

  useEffect(() => {
    if (!playing || !hasStrokes) return;
    clearTimer();
    if (currentStroke < strokes.length - 1) {
      timerRef.current = setTimeout(() => {
        setCurrentStroke((s) => s + 1);
      }, SPEEDS[speed]);
    } else {
      timerRef.current = setTimeout(() => setPlaying(false), SPEEDS[speed]);
    }
    return clearTimer;
  }, [playing, currentStroke, speed, strokes.length, hasStrokes]);

  useEffect(() => {
    reset();
    if (autoPlay) setTimeout(() => playFrom(0), 300);
  }, [entry.id]); // eslint-disable-line

  function stepNext() {
    clearTimer();
    setPlaying(false);
    setCurrentStroke((s) => Math.min(s + 1, strokes.length - 1));
  }

  function handlePlay() {
    if (currentStroke >= strokes.length - 1) {
      setCurrentStroke(-1);
      setTimeout(() => playFrom(0), 50);
    } else {
      playFrom(currentStroke === -1 ? 0 : currentStroke);
    }
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <div
        className="relative rounded-2xl overflow-hidden"
        style={{ width: 220, height: 220, background: "var(--bg-muted)", border: "1px solid var(--border)" }}
      >
        {!hasStrokes && (
          <div className="absolute inset-0 flex items-center justify-center" style={{ color: "var(--text-subtle)" }}>
            <div className="text-center text-sm">
              <div className="text-4xl mb-2" style={{ color: "var(--text)" }}>{entry.kana}</div>
              <div>Sin datos de trazo</div>
            </div>
          </div>
        )}

        {hasStrokes && (
          <svg
            viewBox="0 0 109 109"
            width="220"
            height="220"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <marker id="arrow" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
                <path d="M0,0 L0,6 L6,3 z" fill="#f97316" />
              </marker>
            </defs>

            {/* Grid lines (light) */}
            <line x1="54.5" y1="4" x2="54.5" y2="105" stroke="currentColor" strokeOpacity="0.08" strokeWidth="1" />
            <line x1="4" y1="54.5" x2="105" y2="54.5" stroke="currentColor" strokeOpacity="0.08" strokeWidth="1" />

            {/* Completed strokes (gray) */}
            {strokes.slice(0, Math.max(0, currentStroke)).map((d, i) => (
              <path
                key={`done-${i}`}
                d={d}
                fill="none"
                stroke="var(--text)"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
                opacity="0.3"
              />
            ))}

            {/* Current stroke (animated) */}
            {currentStroke >= 0 && currentStroke < strokes.length && (
              <AnimatedStroke
                key={`${entry.id}-${currentStroke}`}
                d={strokes[currentStroke]}
                speed={SPEEDS[speed]}
                showArrow
              />
            )}

            {/* Stroke numbers */}
            {showNumbers &&
              strokes.slice(0, currentStroke + 1).map((d, i) => {
                const { x, y } = getPathStart(d);
                return (
                  <g key={`num-${i}`}>
                    <circle cx={x} cy={y} r="7" fill="var(--color-primary-500)" opacity="0.9" />
                    <text x={x} y={y + 4} textAnchor="middle" fontSize="8" fill="white" fontWeight="700">
                      {i + 1}
                    </text>
                  </g>
                );
              })}
          </svg>
        )}
      </div>

      <div className="text-center">
        <span className="text-xs font-medium" style={{ color: "var(--text-subtle)" }}>
          {hasStrokes
            ? `Trazo ${Math.max(0, currentStroke + 1)} / ${strokes.length}`
            : "—"}
        </span>
      </div>

      {hasStrokes && (
        <StrokeControls
          playing={playing}
          speed={speed}
          showNumbers={showNumbers}
          onPlay={handlePlay}
          onPause={() => { clearTimer(); setPlaying(false); }}
          onStep={stepNext}
          onReset={reset}
          onSpeedChange={setSpeed}
          onToggleNumbers={() => setShowNumbers((v) => !v)}
          atEnd={currentStroke >= strokes.length - 1}
        />
      )}
    </div>
  );
}

function AnimatedStroke({ d, speed, showArrow }: { d: string; speed: number; showArrow: boolean }) {
  const pathRef = useRef<SVGPathElement>(null);
  const [len, setLen] = useState(500);
  const [arrow, setArrow] = useState<{ x: number; y: number; angle: number }>(() => {
    const s = getPathStart(d);
    return { x: s.x, y: s.y, angle: 0 };
  });

  useEffect(() => {
    const el = pathRef.current;
    if (!el) return;
    const l = el.getTotalLength() || 500;
    setLen(l);
    // Dirección real del trazo: KanjiVG usa comandos relativos, así que se
    // calcula con la geometría del path en vez de parsear la cadena.
    const p0 = el.getPointAtLength(0);
    const p1 = el.getPointAtLength(Math.min(9, l * 0.18));
    setArrow({
      x: p0.x,
      y: p0.y,
      angle: (Math.atan2(p1.y - p0.y, p1.x - p0.x) * 180) / Math.PI,
    });
  }, [d]);

  const start = { x: arrow.x, y: arrow.y };
  const angle = arrow.angle;

  return (
    <>
      <path
        ref={pathRef}
        d={d}
        fill="none"
        stroke="var(--color-primary-500)"
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray={len}
        strokeDashoffset={len}
        style={{
          animation: `draw-stroke ${speed}ms ease forwards`,
          "--stroke-length": len,
        } as React.CSSProperties}
      />
      {showArrow && (
        <g transform={`translate(${start.x},${start.y}) rotate(${angle})`}>
          <polygon
            points="-5,-4 5,0 -5,4"
            fill="#f97316"
            opacity="0.9"
          />
        </g>
      )}
    </>
  );
}
