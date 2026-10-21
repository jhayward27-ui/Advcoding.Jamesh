import { formatValue, type StatEntry } from "@/lib/dashboard";

export function ProgressChart({
  points,
  lowerIsBetter,
  emptyLabel = "Log the same stat at least once and the line will show up here.",
}: {
  points: StatEntry[];
  lowerIsBetter: boolean;
  emptyLabel?: string;
}) {
  if (points.length === 0) {
    return (
      <p className="rounded-2xl border border-dashed border-white/15 px-4 py-10 text-center text-sm text-white/50">
        {emptyLabel}
      </p>
    );
  }

  const width = 640;
  const height = 220;
  const pad = { top: 16, right: 16, bottom: 28, left: 44 };
  const values = points.map((point) => point.value);
  const min = Math.min(...values);
  const max = Math.max(...values);
  const span = max - min || Math.max(Math.abs(max) * 0.2, 1);
  const yMin = min - span * 0.15;
  const yMax = max + span * 0.15;

  const xAt = (index: number) => {
    if (points.length === 1) return (pad.left + width - pad.right) / 2;
    return pad.left + (index / (points.length - 1)) * (width - pad.left - pad.right);
  };
  const yAt = (value: number) =>
    pad.top + (1 - (value - yMin) / (yMax - yMin)) * (height - pad.top - pad.bottom);

  const line = points
    .map((point, index) => `${index === 0 ? "M" : "L"} ${xAt(index).toFixed(1)} ${yAt(point.value).toFixed(1)}`)
    .join(" ");

  const ticks = [yMax, (yMax + yMin) / 2, yMin];

  return (
    <div>
      <svg viewBox={`0 0 ${width} ${height}`} className="h-56 w-full" role="img">
        <title>
          {lowerIsBetter ? "Progress chart, lower numbers are better" : "Progress chart, higher numbers are better"}
        </title>
        {ticks.map((tick) => (
          <g key={tick}>
            <line
              x1={pad.left}
              x2={width - pad.right}
              y1={yAt(tick)}
              y2={yAt(tick)}
              stroke="rgba(255,255,255,0.08)"
            />
            <text x={pad.left - 8} y={yAt(tick) + 4} textAnchor="end" fill="rgba(255,255,255,0.45)" fontSize="11">
              {Number.isInteger(tick) ? tick.toFixed(0) : tick.toFixed(1)}
            </text>
          </g>
        ))}
        <path d={line} fill="none" stroke="#9dffb0" strokeWidth="2.5" />
        {points.map((point, index) => (
          <circle key={point.id} cx={xAt(index)} cy={yAt(point.value)} r="4" fill="#07110e" stroke="#9dffb0" strokeWidth="2" />
        ))}
        {points.map((point, index) => (
          <text
            key={`${point.id}-label`}
            x={xAt(index)}
            y={height - 8}
            textAnchor="middle"
            fill="rgba(255,255,255,0.45)"
            fontSize="11"
          >
            {point.date.slice(5)}
          </text>
        ))}
      </svg>
      <p className="mt-2 text-sm text-white/50">
        Latest {formatValue(points[points.length - 1].value, points[points.length - 1].unit)}.{" "}
        {lowerIsBetter ? "Lower is better for this stat." : "Higher is better for this stat."}
      </p>
    </div>
  );
}
