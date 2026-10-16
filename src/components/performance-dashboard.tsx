"use client";

import { useEffect, useMemo, useState } from "react";
import { sports } from "@/lib/sports-data";
import {
  categoryLabels,
  formatValue,
  goalProgress,
  metricKey,
  metricTitle,
  personalBests,
  seriesFor,
  sessionsThisWeek,
  statPresets,
  todayKey,
  workoutStreak,
  type StatCategory,
  type StatEntry,
  type WeeklyGoal,
} from "@/lib/dashboard";
import { ProgressChart } from "@/components/progress-chart";

const storageKey = "rise-dashboard-v1";

type Saved = {
  entries: StatEntry[];
  goals: WeeklyGoal[];
};

const emptySaved: Saved = { entries: [], goals: [] };

function loadSaved(): Saved {
  try {
    const raw = localStorage.getItem(storageKey);
    if (!raw) return emptySaved;
    const parsed = JSON.parse(raw) as Saved;
    return {
      entries: Array.isArray(parsed.entries) ? parsed.entries : [],
      goals: Array.isArray(parsed.goals) ? parsed.goals : [],
    };
  } catch {
    return emptySaved;
  }
}

export function PerformanceDashboard() {
  const [saved, setSaved] = useState<Saved>(emptySaved);
  const [ready, setReady] = useState(false);
  const [category, setCategory] = useState<StatCategory>("sprint");
  const [sport, setSport] = useState(sports[0].name);
  const [label, setLabel] = useState(statPresets.sprint[0].label);
  const [unit, setUnit] = useState(statPresets.sprint[0].unit);
  const [lowerIsBetter, setLowerIsBetter] = useState(true);
  const [value, setValue] = useState("");
  const [date, setDate] = useState(todayKey());
  const [goalTitle, setGoalTitle] = useState("Training days");
  const [goalTarget, setGoalTarget] = useState("4");
  const [chartKey, setChartKey] = useState("");
  const [formError, setFormError] = useState("");

  useEffect(() => {
    const next = loadSaved();
    setSaved(next);
    const first = next.entries[0];
    if (first) setChartKey(metricKey(first));
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    localStorage.setItem(storageKey, JSON.stringify(saved));
  }, [saved, ready]);

  const bests = useMemo(() => personalBests(saved.entries), [saved.entries]);
  const streak = workoutStreak(saved.entries);
  const weekCount = sessionsThisWeek(saved.entries);
  const activeChartKey = bests.some((item) => item.key === chartKey) ? chartKey : (bests[0]?.key ?? "");
  const chartPoints = activeChartKey ? seriesFor(saved.entries, activeChartKey) : [];
  const chartEntry = chartPoints[0];

  function applyPreset(nextCategory: StatCategory, presetIndex = 0) {
    const preset = statPresets[nextCategory][presetIndex] ?? statPresets[nextCategory][0];
    setCategory(nextCategory);
    setLabel(preset.label);
    setUnit(preset.unit);
    setLowerIsBetter(preset.lowerIsBetter);
  }

  function addEntry() {
    const parsed = Number(value);
    if (!label.trim() || !Number.isFinite(parsed) || parsed <= 0) {
      setFormError("Enter a name and a number greater than 0.");
      return;
    }
    const entry: StatEntry = {
      id: crypto.randomUUID(),
      date,
      category,
      sport,
      label: label.trim(),
      value: parsed,
      unit: unit.trim(),
      lowerIsBetter,
    };
    setFormError("");
    setValue("");
    setSaved((current) => ({ ...current, entries: [entry, ...current.entries] }));
    setChartKey(metricKey(entry));
  }

  function removeEntry(id: string) {
    setSaved((current) => ({
      ...current,
      entries: current.entries.filter((entry) => entry.id !== id),
    }));
  }

  function addGoal() {
    const target = Number(goalTarget);
    if (!goalTitle.trim() || !Number.isFinite(target) || target <= 0) return;
    const goal: WeeklyGoal = {
      id: crypto.randomUUID(),
      title: goalTitle.trim(),
      target: Math.round(target),
    };
    setSaved((current) => ({ ...current, goals: [...current.goals, goal] }));
    setGoalTitle("");
  }

  function removeGoal(id: string) {
    setSaved((current) => ({
      ...current,
      goals: current.goals.filter((goal) => goal.id !== id),
    }));
  }

  return (
    <div className="space-y-8">
      <div className="grid gap-3 sm:grid-cols-3">
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
          <p className="text-sm text-white/50">Workout streak</p>
          <p className="mt-1 text-3xl font-semibold text-white">
            {streak} <span className="text-base font-normal text-white/50">{streak === 1 ? "day" : "days"}</span>
          </p>
          <p className="mt-1 text-sm text-white/45">
            {streak > 0 ? "A day counts once you log anything." : "Log a session today to start the streak."}
          </p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
          <p className="text-sm text-white/50">Logged this week</p>
          <p className="mt-1 text-3xl font-semibold text-white">{weekCount}</p>
          <p className="mt-1 text-sm text-white/45">Monday through Sunday.</p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
          <p className="text-sm text-white/50">Personal bests</p>
          <p className="mt-1 text-3xl font-semibold text-white">{bests.length}</p>
          <p className="mt-1 text-sm text-white/45">One best for each stat you track.</p>
        </div>
      </div>

      <section className="rounded-2xl border border-white/10 p-4 sm:p-5">
        <h2 className="text-lg font-semibold text-white">Log a stat</h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <label className="text-sm text-white/60">
            Date
            <input
              type="date"
              value={date}
              onChange={(event) => setDate(event.target.value)}
              className="mt-1 w-full rounded-xl border border-white/15 bg-transparent px-3 py-2 text-white"
            />
          </label>
          <label className="text-sm text-white/60">
            Type
            <select
              value={category}
              onChange={(event) => applyPreset(event.target.value as StatCategory)}
              className="mt-1 w-full rounded-xl border border-white/15 bg-[#0c1613] px-3 py-2 text-white"
            >
              {(Object.keys(categoryLabels) as StatCategory[]).map((item) => (
                <option key={item} value={item}>
                  {categoryLabels[item]}
                </option>
              ))}
            </select>
          </label>
          <label className="text-sm text-white/60">
            Sport
            <select
              value={sport}
              onChange={(event) => setSport(event.target.value)}
              className="mt-1 w-full rounded-xl border border-white/15 bg-[#0c1613] px-3 py-2 text-white"
            >
              <option>General</option>
              {sports.map((item) => (
                <option key={item.slug}>{item.name}</option>
              ))}
            </select>
          </label>
          <label className="text-sm text-white/60">
            Stat
            <input
              list="stat-presets"
              value={label}
              onChange={(event) => {
                const next = event.target.value;
                setLabel(next);
                const preset = statPresets[category].find((item) => item.label === next);
                if (preset) {
                  setUnit(preset.unit);
                  setLowerIsBetter(preset.lowerIsBetter);
                }
              }}
              className="mt-1 w-full rounded-xl border border-white/15 bg-transparent px-3 py-2 text-white"
            />
            <datalist id="stat-presets">
              {statPresets[category].map((preset) => (
                <option key={preset.label} value={preset.label} />
              ))}
            </datalist>
          </label>
          <label className="text-sm text-white/60">
            Number
            <input
              inputMode="decimal"
              value={value}
              onChange={(event) => setValue(event.target.value)}
              placeholder="4.62"
              className="mt-1 w-full rounded-xl border border-white/15 bg-transparent px-3 py-2 text-white placeholder:text-white/30"
            />
          </label>
          <label className="text-sm text-white/60">
            Unit
            <input
              value={unit}
              onChange={(event) => setUnit(event.target.value)}
              placeholder="sec, lb, min"
              className="mt-1 w-full rounded-xl border border-white/15 bg-transparent px-3 py-2 text-white placeholder:text-white/30"
            />
          </label>
        </div>
        <label className="mt-3 flex items-center gap-2 text-sm text-white/70">
          <input
            type="checkbox"
            checked={lowerIsBetter}
            onChange={(event) => setLowerIsBetter(event.target.checked)}
          />
          Lower number is better (sprints and times)
        </label>
        {formError ? <p className="mt-3 text-sm text-red-300">{formError}</p> : null}
        <button
          type="button"
          onClick={addEntry}
          className="mt-4 rounded-full bg-[#9dffb0] px-4 py-2.5 text-sm font-semibold text-[#07110e] hover:bg-white"
        >
          Save stat
        </button>
      </section>

      <section className="rounded-2xl border border-white/10 p-4 sm:p-5">
        <h2 className="text-lg font-semibold text-white">Weekly goals</h2>
        <p className="mt-1 text-sm text-white/50">
          Goals count how many stats you log this week. The streak still tracks days in a row.
        </p>
        <div className="mt-4 flex flex-col gap-2 sm:flex-row">
          <input
            value={goalTitle}
            onChange={(event) => setGoalTitle(event.target.value)}
            placeholder="Training days"
            className="min-w-0 flex-1 rounded-xl border border-white/15 bg-transparent px-3 py-2 text-sm text-white placeholder:text-white/30"
          />
          <input
            inputMode="numeric"
            value={goalTarget}
            onChange={(event) => setGoalTarget(event.target.value)}
            placeholder="4"
            className="w-full rounded-xl border border-white/15 bg-transparent px-3 py-2 text-sm text-white placeholder:text-white/30 sm:w-24"
          />
          <button
            type="button"
            onClick={addGoal}
            className="rounded-full border border-white/20 px-4 py-2 text-sm text-white hover:bg-white/10"
          >
            Add goal
          </button>
        </div>
        {saved.goals.length === 0 ? (
          <p className="mt-4 text-sm text-white/45">No goals yet. Add one, like 4 logs this week.</p>
        ) : (
          <ul className="mt-4 space-y-3">
            {saved.goals.map((goal) => {
              const progress = goalProgress(goal, saved.entries);
              const width = Math.min(100, Math.round((progress.done / progress.target) * 100));
              return (
                <li key={goal.id}>
                  <div className="flex items-baseline justify-between gap-3 text-sm">
                    <span className="text-white">{goal.title}</span>
                    <span className="text-white/50">
                      {progress.done}/{progress.target}
                      {progress.met ? " · done" : ""}
                    </span>
                  </div>
                  <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/10">
                    <div className="h-full bg-[#9dffb0]" style={{ width: `${width}%` }} />
                  </div>
                  <button
                    type="button"
                    onClick={() => removeGoal(goal.id)}
                    className="mt-1 text-xs text-white/40 hover:text-white"
                  >
                    Remove
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </section>

      <section className="rounded-2xl border border-white/10 p-4 sm:p-5">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <h2 className="text-lg font-semibold text-white">Progress</h2>
          {bests.length > 0 ? (
            <label className="text-sm text-white/60">
              Stat
              <select
                value={activeChartKey}
                onChange={(event) => setChartKey(event.target.value)}
                className="ml-2 rounded-xl border border-white/15 bg-[#0c1613] px-3 py-2 text-white"
              >
                {bests.map((item) => (
                  <option key={item.key} value={item.key}>
                    {metricTitle(item.best)}
                  </option>
                ))}
              </select>
            </label>
          ) : null}
        </div>
        <div className="mt-4">
          <ProgressChart points={chartPoints} lowerIsBetter={chartEntry?.lowerIsBetter ?? false} />
        </div>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-white">Personal bests</h2>
        {bests.length === 0 ? (
          <p className="mt-3 text-sm text-white/50">Your bests show up after the first saved stat.</p>
        ) : (
          <ul className="mt-3 grid gap-3 sm:grid-cols-2">
            {bests.map((item) => (
              <li key={item.key} className="rounded-2xl border border-white/10 p-4">
                <p className="text-sm text-white/50">{metricTitle(item.best)}</p>
                <p className="mt-1 text-2xl font-semibold text-white">
                  {formatValue(item.best.value, item.best.unit)}
                </p>
                <p className="mt-1 text-sm text-white/45">
                  Best on {item.best.date}
                  {item.count > 1
                    ? ` · ${item.change > 0 ? "+" : ""}${formatValue(item.change, item.best.unit)} since ${item.first.date}`
                    : ""}
                </p>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section>
        <h2 className="text-lg font-semibold text-white">Recent logs</h2>
        {saved.entries.length === 0 ? (
          <p className="mt-3 text-sm text-white/50">Nothing logged yet.</p>
        ) : (
          <ul className="mt-3 divide-y divide-white/10 border-y border-white/10">
            {saved.entries
              .slice()
              .sort((a, b) => b.date.localeCompare(a.date))
              .map((entry) => (
                <li key={entry.id} className="flex items-center justify-between gap-3 py-3 text-sm">
                  <div>
                    <p className="text-white">
                      {entry.label} · {formatValue(entry.value, entry.unit)}
                    </p>
                    <p className="text-white/45">
                      {entry.date} · {entry.sport} · {categoryLabels[entry.category]}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeEntry(entry.id)}
                    className="text-white/40 hover:text-white"
                  >
                    Delete
                  </button>
                </li>
              ))}
          </ul>
        )}
      </section>
    </div>
  );
}
