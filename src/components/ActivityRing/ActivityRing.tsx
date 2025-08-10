import React, { useMemo, useRef, useState } from "react";
import styles from "./ActivityRing.module.css";

export type RingItem = {
  id: string;
  label: string;
  minutes: number;
  color?: string;
};

type Props = {
  items: RingItem[];
  goalMinutes?: number; // default 420 (7h)
  size?: number;        // px
  stroke?: number;      // px
  title?: string;
};

export default function ActivityRing({
  items,
  goalMinutes = 420,
  size = 260,
  stroke = 18,
  title = "Today's Activities",
}: Props) {
  const ref = useRef<HTMLDivElement>(null);

  // clamp to goal so the ring never overflows visually
  const total = Math.min(
    goalMinutes,
    items.reduce((acc, it) => acc + Math.max(0, it.minutes), 0)
  );

  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;

  // Build segments with dash/offset for SVG <circle>
  const segments = useMemo(() => {
    const segs: Array<{
      id: string;
      label: string;
      minutes: number;
      color: string;
      dash: number;
      offset: number;
      percent: number;
    }> = [];
    let acc = 0;
    for (const it of items) {
      const mins = Math.max(0, it.minutes);
      if (mins === 0) continue;
      const portion = Math.min(mins, Math.max(0, goalMinutes - acc)); // avoid overflow
      if (portion <= 0) break;

      const pct = portion / goalMinutes;
      const dash = pct * circumference;
      const offset = circumference - (acc / goalMinutes) * circumference - dash;
      const color = it.color ?? colorFromString(it.label);
      segs.push({
        id: it.id,
        label: it.label,
        minutes: portion,
        color,
        dash,
        offset,
        percent: pct * 100,
      });
      acc += portion;
      if (acc >= goalMinutes) break;
    }
    return segs;
  }, [items, goalMinutes, circumference]);

  // Hover state
  const [hover, setHover] = useState<null | {
    id: string;
    label: string;
    minutes: number;
    percent: number;
    x: number;
    y: number;
    color: string;
  }>(null);

  const onMove = (e: React.MouseEvent, seg: any) => {
    const host = ref.current;
    if (!host) return;
    const rect = host.getBoundingClientRect();
    setHover({
      id: seg.id,
      label: seg.label,
      minutes: seg.minutes,
      percent: seg.percent,
      color: seg.color,
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const onLeave = () => setHover(null);

  const progressPct = Math.round((total / goalMinutes) * 100);

  return (
    <div className={styles.wrap} style={{ width: size }} ref={ref}>
      <div className={styles.header}>
        <h3 className={styles.title}>{title}</h3>
        <span className={styles.goal}>
          Goal: {goalMinutes} min ({(goalMinutes / 60).toFixed(0)}h)
        </span>
      </div>

      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className={styles.svg}
      >
        <g transform={`rotate(-90 ${size / 2} ${size / 2})`}>
          {/* Track */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="var(--border)"
            strokeWidth={stroke}
            opacity={0.6}
          />
          {/* Segments */}
          {segments.map((seg) => (
            <circle
              key={seg.id}
              cx={size / 2}
              cy={size / 2}
              r={radius}
              fill="none"
              stroke={seg.color}
              strokeWidth={stroke}
              strokeLinecap="round"
              strokeDasharray={`${seg.dash} ${circumference - seg.dash}`}
              strokeDashoffset={seg.offset}
              className={styles.segment}
              onMouseMove={(e) => onMove(e, seg)}
              onMouseLeave={onLeave}
            />
          ))}
        </g>

        {/* Center summary */}
        <g className={styles.center} pointerEvents="none">
          <text x="50%" y="48%" textAnchor="middle" className={styles.big}>
            {Math.floor(total / 60)}h {total % 60}m
          </text>
          <text x="50%" y="60%" textAnchor="middle" className={styles.sub}>
            {progressPct}% of day goal
          </text>
        </g>
      </svg>

      {/* Legend */}
      <ul className={styles.legend}>
        {segments.map((s) => (
          <li key={s.id}>
            <span className={styles.dot} style={{ background: s.color }} />
            <span className={styles.legLabel}>{s.label}</span>
            <span className={styles.legRight}>
              {s.minutes}m · {s.percent.toFixed(0)}%
            </span>
          </li>
        ))}
      </ul>

      {/* Tooltip */}
      {hover && (
        <div
          className={styles.tip}
          style={{ left: hover.x + 10, top: hover.y + 8, borderColor: hover.color }}
        >
          <div className={styles.tipTitle}>{hover.label}</div>
          <div className={styles.tipMeta}>
            {hover.minutes} min • {hover.percent.toFixed(0)}%
          </div>
        </div>
      )}
    </div>
  );
}

function colorFromString(s: string) {
  let hash = 0;
  for (let i = 0; i < s.length; i++) hash = (hash << 5) - hash + s.charCodeAt(i);
  const hue = Math.abs(hash) % 360;
  return `hsl(${hue} 70% 50%)`;
}
