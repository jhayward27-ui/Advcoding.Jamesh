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
  type StatCategory,
} from "@/lib/dashboard";
import { ProgressChart } from "@/components/progress-chart";
import { useDashboardStore } from "@/components/dashboard-store";

const fieldClass =
  "mt-1 w-full rounded-xl border border-white/15 bg-transparent px-3 py-2 text-white placeholder:text-white/30";
const selectClass = "mt-1 w-full rounded-xl border border-white/15 bg-[#0c1613] px-3 py-2 text-white";

const saveLabels: Record<StatCategory, string> = {
  sprint: "Save sprint",
  strength: "Save lift",
  practice: "Save practice",
  sport: "Save stat",
};

const placeholders: Record<StatCategory, string> = {
  sprint: "4.62",
  strength: "185",
  practice: "60",
  sport: "8",
};

function presetsFor(category: StatCategory, sportName: string) {
  if (category !== "sport") return statPresets[category];
  const match = sports.find((item) => item.name === sportName);
  const fromSkills =
    match?.skills.map((skill) => ({
      label: skill.name,
      unit: "",
      lowerIsBetter: false,
    })) ?? [];
  return [...fromSkills, ...statPresets.sport];
}

export function CategoryLog({ category }: { category: StatCategory }) {
  const { saved, addEntry, removeEntry } = useDashboardStore();
  const initialPresets = presetsFor(category, sports[0].name);
  const [sport, setSport] = useState(sports[0].name);
  const [label, setLabel] = useState(initialPresets[0].label);
  const [unit, setUnit] = useState(initialPresets[0].unit);
  const [lowerIsBetter, setLowerIsBetter] = useState(initialPresets[0].lowerIsBetter);
  const [value, setValue] = useState("");
  const [date, setDate] = useState(todayKey());
  const [chartKey, setChartKey] = useState("");
  const [formError, setFormError] = useState("");

  const presets = presetsFor(category, sport);
  const visible = useMemo(
    () =>
      saved.entries.filter((entry) => {
        if (entry.category !== category) return false;
        if (category === "sport" && entry.sport !== sport) return false;
        return true;
      }),
    [saved.entries, category, sport],
  );
  const bests = useMemo(() => personalBests(visible), [visible]);
  const activeChartKey = bests.some((item) => item.key === chartKey) ? chartKey : (bests[0]?.key ?? "");
  const chartPoints = activeChartKey ? seriesFor(visible, activeChartKey) : [];
  const chartEntry = chartPoints[0];

  function choosePreset(preset: { label: string; unit: string; lowerIsBetter: boolean }) {
    setLabel(preset.label);
    setUnit(preset.unit);
    setLowerIsBetter(preset.lowerIsBetter);
  }

  function changeSport(nextSport: string) {
    const nextPresets = presetsFor(category, nextSport);
    const currentIsPreset = presets.some((preset) => preset.label === label);
    setSport(nextSport);
    if (category === "sport" && currentIsPreset) choosePreset(nextPresets[0]);
  }

  function save() {
    const parsed = Number(value);
    if (!label.trim() || !Number.isFinite(parsed) || parsed <= 0) {
      setFormError("Enter a name and a number greater than 0.");
      return;
    }
    const entry = {
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
    addEntry(entry);
    setChartKey(metricKey(entry));
  }

  const emptyLog =
    category === "sport"
      ? `No ${sport} stats logged yet.`
      : category === "sprint"
        ? "No sprints logged yet."
        : category === "strength"
          ? "No lifts logged yet."
          : "No practices logged yet.";

  return (
    <div className="space-y-8">
      <section className="rounded-2xl border border-white/10 p-4 sm:p-5">
        <h2 className="text-lg font-semibold text-white">Add an entry</h2>
        <div className="mt-4 flex flex-wrap gap-2">
          {presets.map((preset) => {
            const selected = label === preset.label;
            return (
              <button
                key={preset.label}
                type="button"
                onClick={() => choosePreset(preset)}
                className={
                  selected
                    ? "rounded-full bg-white/15 px-3 py-1.5 text-sm text-white"
                    : "rounded-full border border-white/15 px-3 py-1.5 text-sm text-white/70 transition hover:text-white"
                }
              >
                {preset.label}
              </button>
            );
          })}
        </div>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <label className="text-sm text-white/60">
            Date
            <input type="date" value={date} onChange={(event) => setDate(event.target.value)} className={fieldClass} />
          </label>
          <label className="text-sm text-white/60">
            Sport
            <select value={sport} onChange={(event) => changeSport(event.target.value)} className={selectClass}>
              {category === "sport" ? null : <option>General</option>}
              {sports.map((item) => (
                <option key={item.slug}>{item.name}</option>
              ))}
            </select>
          </label>
          <label className="text-sm text-white/60">
            Stat
            <input
              list={`stat-presets-${category}`}
              value={label}
              onChange={(event) => {
                const next = event.target.value;
                setLabel(next);
                const preset = presets.find((item) => item.label === next);
                if (preset) choosePreset(preset);
              }}
              className={fieldClass}
            />
            <datalist id={`stat-presets-${category}`}>
              {presets.map((preset) => (
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
              placeholder={placeholders[category]}
              className={fieldClass}
            />
          </label>
          <label className="text-sm text-white/60">
            Unit
            <input
              value={unit}
              onChange={(event) => setUnit(event.target.value)}
              placeholder="sec, lb, min"
              className={fieldClass}
            />
          </label>
        </div>
        <label className="mt-3 flex items-center gap-2 text-sm text-white/70">
          <input
            type="checkbox"
            checked={lowerIsBetter}
            onChange={(event) => setLowerIsBetter(event.target.checked)}
          />
          Lower number is better
        </label>
        {category === "sport" ? (
          <p className="mt-3 text-sm text-white/45">Showing {sport} stats on this page.</p>
        ) : null}
        {formError ? <p className="mt-3 text-sm text-red-300">{formError}</p> : null}
        <button
          type="button"
          onClick={save}
          className="mt-4 rounded-full bg-[#9dffb0] px-4 py-2.5 text-sm font-semibold text-[#07110e] hover:bg-white"
        >
          {saveLabels[category]}
        </button>
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
          <p className="mt-3 text-sm text-white/50">Your best shows up after the first saved number.</p>
        ) : (
          <ul className="mt-3 grid gap-3 sm:grid-cols-2">
            {bests.map((item) => (
              <li key={item.key} className="rounded-2xl border border-white/10 p-4">
                <p className="text-sm text-white/50">{metricTitle(item.best)}</p>
                <p className="mt-1 text-2xl font-semibold text-white">{formatValue(item.best.value, item.best.unit)}</p>
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
        {visible.length === 0 ? (
          <p className="mt-3 text-sm text-white/50">{emptyLog}</p>
        ) : (
          <ul className="mt-3 divide-y divide-white/10 border-y border-white/10">
            {visible
              .slice()
              .sort((a, b) => b.date.localeCompare(a.date))
              .map((entry) => (
                <li key={entry.id} className="flex items-center justify-between gap-3 py-3 text-sm">
                  <div>
                    <p className="text-white">
                      {entry.label} · {formatValue(entry.value, entry.unit)}
                    </p>
                    <p className="text-white/45">
                      {entry.date} · {entry.sport}
                    </p>
                  </div>
                  <button type="button" onClick={() => removeEntry(entry.id)} className="text-white/40 hover:text-white">
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
