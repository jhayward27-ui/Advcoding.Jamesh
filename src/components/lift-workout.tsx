"use client";

import { useMemo, useState } from "react";
import { sports } from "@/lib/sports-data";
import {
  formatValue,
  metricKey,
  metricTitle,
  personalBests,
  seriesFor,
  statPresets,
  todayKey,
} from "@/lib/dashboard";
import { ProgressChart } from "@/components/progress-chart";
import { useDashboardStore } from "@/components/dashboard-store";

const fieldClass =
  "w-full rounded-xl border border-white/15 bg-transparent px-3 py-2 text-sm text-white placeholder:text-white/30";
const selectClass = "mt-1 w-full rounded-xl border border-white/15 bg-[#0c1613] px-3 py-2 text-white";

const suggestions = [
  ...statPresets.strength.map((item) => item.label),
  "Overhead press",
  "Barbell row",
  "Lunges",
  "Hip thrust",
];

type Slot = {
  id: string;
  label: string;
  value: string;
  unit: string;
};

function emptySlots(count: number): Slot[] {
  return Array.from({ length: count }, (_, index) => ({
    id: `slot-${index + 1}`,
    label: "",
    value: "",
    unit: "lb",
  }));
}

export function LiftWorkout() {
  const { saved, addEntries, removeEntry, removeSession } = useDashboardStore();
  const [sport, setSport] = useState(sports[0].name);
  const [date, setDate] = useState(todayKey());
  const [slots, setSlots] = useState<Slot[]>(() => emptySlots(4));
  const [formError, setFormError] = useState("");
  const [chartKey, setChartKey] = useState("");
  const [nextSlot, setNextSlot] = useState(5);

  const visible = useMemo(
    () => saved.entries.filter((entry) => entry.category === "strength"),
    [saved.entries],
  );
  const bests = useMemo(() => personalBests(visible), [visible]);
  const activeChartKey = bests.some((item) => item.key === chartKey) ? chartKey : (bests[0]?.key ?? "");
  const chartPoints = activeChartKey ? seriesFor(visible, activeChartKey) : [];
  const chartEntry = chartPoints[0];
  const groups = useMemo(() => {
    const grouped = new Map<string, typeof visible>();
    for (const entry of visible) {
      const key = entry.sessionId ?? entry.id;
      const group = grouped.get(key) ?? [];
      group.push(entry);
      grouped.set(key, group);
    }
    return [...grouped.entries()]
      .map(([id, exercises]) => ({ id, exercises }))
      .sort((a, b) => b.exercises[0].date.localeCompare(a.exercises[0].date));
  }, [visible]);

  function updateSlot(id: string, patch: Partial<Slot>) {
    setSlots((current) => current.map((slot) => (slot.id === id ? { ...slot, ...patch } : slot)));
  }

  function addSlot() {
    setSlots((current) => [...current, { id: `slot-${nextSlot}`, label: "", value: "", unit: "lb" }]);
    setNextSlot((current) => current + 1);
  }

  function saveWorkout() {
    const started = slots.filter((slot) => slot.label.trim() || slot.value.trim());
    if (started.length === 0) {
      setFormError("Type at least one exercise and a number.");
      return;
    }
    const incomplete = started.some((slot) => {
      const parsed = Number(slot.value);
      return !slot.label.trim() || !Number.isFinite(parsed) || parsed <= 0;
    });
    if (incomplete) {
      setFormError("Every exercise you start needs a name and a number greater than 0.");
      return;
    }
    const exercises = started.map((slot) => {
      const unit = slot.unit.trim();
      return {
        date,
        category: "strength" as const,
        sport,
        label: slot.label.trim(),
        value: Number(slot.value),
        unit,
        lowerIsBetter: unit === "sec",
      };
    });
    addEntries(exercises);
    const last = exercises[exercises.length - 1];
    setChartKey(metricKey(last));
    setSlots(emptySlots(4));
    setNextSlot(5);
    setFormError("");
  }

  return (
    <div className="space-y-8">
      <section className="rounded-2xl border border-white/10 p-4 sm:p-5">
        <h2 className="text-lg font-semibold text-white">Workout plan</h2>
        <p className="mt-1 text-sm text-white/50">
          Type any exercise into an empty slot. Add more slots if the list is short. Blank slots are skipped when you save.
        </p>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <label className="text-sm text-white/60">
            Date
            <input
              type="date"
              value={date}
              onChange={(event) => setDate(event.target.value)}
              className={`${fieldClass} mt-1`}
            />
          </label>
          <label className="text-sm text-white/60">
            Sport
            <select value={sport} onChange={(event) => setSport(event.target.value)} className={selectClass}>
              <option>General</option>
              {sports.map((item) => (
                <option key={item.slug}>{item.name}</option>
              ))}
            </select>
          </label>
        </div>
        <ol className="mt-5 space-y-3">
          {slots.map((slot, index) => (
            <li key={slot.id} className="grid gap-2 sm:grid-cols-[2rem_1fr_6.5rem_5rem] sm:items-center">
              <span className="text-sm text-white/40">{index + 1}</span>
              <input
                value={slot.label}
                onChange={(event) => updateSlot(slot.id, { label: event.target.value })}
                placeholder="Type an exercise"
                list="lift-exercises"
                aria-label={`Exercise ${index + 1}`}
                className={fieldClass}
              />
              <input
                value={slot.value}
                onChange={(event) => updateSlot(slot.id, { value: event.target.value })}
                inputMode="decimal"
                placeholder="Number"
                aria-label={`Number for exercise ${index + 1}`}
                className={fieldClass}
              />
              <input
                value={slot.unit}
                onChange={(event) => updateSlot(slot.id, { unit: event.target.value })}
                placeholder="lb"
                aria-label={`Unit for exercise ${index + 1}`}
                className={fieldClass}
              />
            </li>
          ))}
        </ol>
        <datalist id="lift-exercises">
          {suggestions.map((name) => (
            <option key={name} value={name} />
          ))}
        </datalist>
        {formError ? <p className="mt-3 text-sm text-red-300">{formError}</p> : null}
        <div className="mt-4 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={addSlot}
            className="rounded-full border border-white/20 px-4 py-2.5 text-sm text-white hover:bg-white/10"
          >
            Add an empty slot
          </button>
          <button
            type="button"
            onClick={saveWorkout}
            className="rounded-full bg-[#9dffb0] px-4 py-2.5 text-sm font-semibold text-[#07110e] hover:bg-white"
          >
            Save workout
          </button>
        </div>
      </section>

      <section className="rounded-2xl border border-white/10 p-4 sm:p-5">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <h2 className="text-lg font-semibold text-white">Progress</h2>
          {bests.length > 0 ? (
            <label className="text-sm text-white/60">
              Exercise
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
          <ProgressChart
            points={chartPoints}
            lowerIsBetter={chartEntry?.lowerIsBetter ?? false}
            emptyLabel="Log the same exercise at least once and the line will show up here."
          />
        </div>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-white">Personal bests</h2>
        {bests.length === 0 ? (
          <p className="mt-3 text-sm text-white/50">Your best shows up after the first saved number.</p>
        ) : (
          <ul className="mt-3 grid gap-3 sm:grid-cols-2">
            {bests.map((item) => (
              <li key={item.key} className="rounded-2xl border border-white/10 p-4">
                <p className="text-sm text-white/50">{metricTitle(item.best)}</p>
                <p className="mt-1 text-2xl font-semibold text-white">{formatValue(item.best.value, item.best.unit)}</p>
                <p className="mt-1 text-sm text-white/45">Best on {item.best.date}</p>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section>
        <h2 className="text-lg font-semibold text-white">Recent workouts</h2>
        {groups.length === 0 ? (
          <p className="mt-3 text-sm text-white/50">No lifts logged yet.</p>
        ) : (
          <ul className="mt-3 divide-y divide-white/10 border-y border-white/10">
            {groups.map((group) => (
              <li key={group.id} className="flex items-start justify-between gap-3 py-3 text-sm">
                <div>
                  {group.exercises.map((exercise) => (
                    <p key={exercise.id} className="text-white">
                      {exercise.label} · {formatValue(exercise.value, exercise.unit)}
                    </p>
                  ))}
                  <p className="text-white/45">
                    {group.exercises[0].date} · {group.exercises[0].sport}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => (group.exercises[0].sessionId ? removeSession(group.id) : removeEntry(group.id))}
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
