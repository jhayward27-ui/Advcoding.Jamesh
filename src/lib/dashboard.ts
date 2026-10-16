export type StatCategory = "sprint" | "strength" | "practice" | "sport";

export type StatEntry = {
  id: string;
  date: string;
  category: StatCategory;
  sport: string;
  label: string;
  value: number;
  unit: string;
  lowerIsBetter: boolean;
};

export type WeeklyGoal = {
  id: string;
  title: string;
  target: number;
};

export const categoryLabels: Record<StatCategory, string> = {
  sprint: "Sprint",
  strength: "Strength",
  practice: "Practice",
  sport: "Sport stat",
};

export const statPresets: Record<
  StatCategory,
  { label: string; unit: string; lowerIsBetter: boolean }[]
> = {
  sprint: [
    { label: "10-yard dash", unit: "sec", lowerIsBetter: true },
    { label: "40-yard dash", unit: "sec", lowerIsBetter: true },
    { label: "Flying 20", unit: "sec", lowerIsBetter: true },
  ],
  strength: [
    { label: "Bench press", unit: "lb", lowerIsBetter: false },
    { label: "Squat", unit: "lb", lowerIsBetter: false },
    { label: "Deadlift", unit: "lb", lowerIsBetter: false },
    { label: "Pull-ups", unit: "reps", lowerIsBetter: false },
  ],
  practice: [
    { label: "Practice", unit: "min", lowerIsBetter: false },
    { label: "Skill work", unit: "min", lowerIsBetter: false },
  ],
  sport: [{ label: "Custom stat", unit: "", lowerIsBetter: false }],
};

export function todayKey(date = new Date()) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function parseKey(key: string) {
  const [year, month, day] = key.split("-").map(Number);
  return new Date(year, month - 1, day);
}

export function addDays(key: string, days: number) {
  const date = parseKey(key);
  date.setDate(date.getDate() + days);
  return todayKey(date);
}

export function startOfWeek(key: string) {
  const date = parseKey(key);
  const day = date.getDay();
  const mondayOffset = day === 0 ? -6 : 1 - day;
  return addDays(key, mondayOffset);
}

export function metricKey(entry: Pick<StatEntry, "sport" | "label" | "unit" | "lowerIsBetter">) {
  return `${entry.sport}|${entry.label}|${entry.unit}|${entry.lowerIsBetter ? "low" : "high"}`;
}

export function metricTitle(entry: Pick<StatEntry, "sport" | "label" | "unit">) {
  const unit = entry.unit ? ` (${entry.unit})` : "";
  return `${entry.label}${unit} · ${entry.sport}`;
}

export function formatValue(value: number, unit: string) {
  const rounded = Number.isInteger(value) ? String(value) : value.toFixed(2).replace(/0+$/, "").replace(/\.$/, "");
  return unit ? `${rounded} ${unit}` : rounded;
}

export function personalBests(entries: StatEntry[]) {
  const groups = new Map<string, StatEntry[]>();
  for (const entry of entries) {
    const key = metricKey(entry);
    const group = groups.get(key) ?? [];
    group.push(entry);
    groups.set(key, group);
  }

  return [...groups.entries()].map(([key, group]) => {
    const best = group.reduce((current, entry) => {
      if (entry.lowerIsBetter) return entry.value < current.value ? entry : current;
      return entry.value > current.value ? entry : current;
    });
    const sorted = [...group].sort((a, b) => a.date.localeCompare(b.date));
    const first = sorted[0];
    const latest = sorted[sorted.length - 1];
    const change = latest.value - first.value;
    return { key, best, latest, first, change, count: group.length, lowerIsBetter: best.lowerIsBetter };
  });
}

export function seriesFor(entries: StatEntry[], key: string) {
  return entries
    .filter((entry) => metricKey(entry) === key)
    .sort((a, b) => a.date.localeCompare(b.date) || a.id.localeCompare(b.id));
}

export function workoutStreak(entries: StatEntry[], today = todayKey()) {
  const days = new Set(entries.map((entry) => entry.date));
  let cursor = days.has(today) ? today : addDays(today, -1);
  if (!days.has(cursor)) return 0;
  let streak = 0;
  while (days.has(cursor)) {
    streak += 1;
    cursor = addDays(cursor, -1);
  }
  return streak;
}

export function sessionsThisWeek(entries: StatEntry[], today = todayKey()) {
  const start = startOfWeek(today);
  const end = addDays(start, 6);
  return entries.filter((entry) => entry.date >= start && entry.date <= end).length;
}

export function goalProgress(goal: WeeklyGoal, entries: StatEntry[], today = todayKey()) {
  const done = sessionsThisWeek(entries, today);
  return { done, target: goal.target, met: done >= goal.target };
}
