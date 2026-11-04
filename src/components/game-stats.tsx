"use client";

import { useMemo, useState } from "react";
import { sports } from "@/lib/sports-data";
import {
  formatValue,
  metricKey,
  metricTitle,
  personalBests,
  seriesFor,
  todayKey,
} from "@/lib/dashboard";
import { ProgressChart } from "@/components/progress-chart";
import { useDashboardStore } from "@/components/dashboard-store";

const fieldClass =
  "mt-1 w-full rounded-xl border border-white/15 bg-transparent px-3 py-2 text-white placeholder:text-white/30";
const selectClass = "mt-1 w-full rounded-xl border border-white/15 bg-[#0c1613] px-3 py-2 text-white";

function readCount(raw: string) {
  if (!raw.trim()) return null;
  const parsed = Number(raw);
  if (!Number.isFinite(parsed) || parsed < 0) return Number.NaN;
  return parsed;
}

export function GameStats() {
  const { saved, addEntries, removeEntry, removeSession } = useDashboardStore();
  const [sport, setSport] = useState(sports[0].name);
  const [date, setDate] = useState(todayKey());
  const [goals, setGoals] = useState("");
  const [assists, setAssists] = useState("");
  const [points, setPoints] = useState("");
  const [formError, setFormError] = useState("");
  const [chartKey, setChartKey] = useState("");

  const visible = useMemo(
    () => saved.entries.filter((entry) => entry.category === "sport" && entry.sport === sport),
    [saved.entries, sport],
  );
  const bests = useMemo(() => personalBests(visible), [visible]);
  const activeChartKey = bests.some((item) => item.key === chartKey) ? chartKey : (bests[0]?.key ?? "");
  const chartPoints = activeChartKey ? seriesFor(visible, activeChartKey) : [];
  const chartEntry = chartPoints[0];
  const games = useMemo(() => {
    const grouped = new Map<string, typeof visible>();
    for (const entry of visible) {
      const key = entry.sessionId ?? entry.id;
      const group = grouped.get(key) ?? [];
      group.push(entry);
      grouped.set(key, group);
    }
    return [...grouped.entries()]
      .map(([id, stats]) => ({ id, stats }))
      .sort((a, b) => b.stats[0].date.localeCompare(a.stats[0].date));
  }, [visible]);

  function saveGame() {
    const goalCount = readCount(goals);
    const assistCount = readCount(assists);
    const pointCount = readCount(points);
    if ([goalCount, assistCount, pointCount].some((count) => Number.isNaN(count))) {
      setFormError("Use a number that is 0 or higher.");
      return;
    }
    if (goalCount === null && assistCount === null && pointCount === null) {
      setFormError("Enter goals, assists, or points from the game.");
      return;
    }
    const totals = new Map<string, number>();
    if (goalCount !== null) totals.set("Goals", goalCount);
    if (assistCount !== null) totals.set("Assists", assistCount);
    const scoredPoints = pointCount ?? (goalCount !== null || assistCount !== null ? (goalCount ?? 0) + (assistCount ?? 0) : null);
    if (scoredPoints !== null) totals.set("Points", scoredPoints);
    const entries = [...totals.entries()].map(([label, value]) => ({
      date,
      category: "sport" as const,
      sport,
      label,
      value,
      unit: "",
      lowerIsBetter: false,
    }));
    addEntries(entries);
    const last = entries[entries.length - 1];
    setChartKey(metricKey(last));
    setGoals("");
    setAssists("");
    setPoints("");
    setFormError("");
  }

  return (
    <div className="space-y-8">
      <section className="rounded-2xl border border-white/10 p-4 sm:p-5">
        <h2 className="text-lg font-semibold text-white">Game stats</h2>
        <p className="mt-1 text-sm text-white/50">
          Pick the sport, then enter what you did in that game. If you leave points empty, it becomes goals plus assists.
        </p>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <label className="text-sm text-white/60">
            Sport
            <select value={sport} onChange={(event) => setSport(event.target.value)} className={selectClass}>
              {sports.map((item) => (
                <option key={item.slug}>{item.name}</option>
              ))}
            </select>
          </label>
          <label className="text-sm text-white/60">
            Date
            <input type="date" value={date} onChange={(event) => setDate(event.target.value)} className={fieldClass} />
          </label>
          <label className="text-sm text-white/60">
            Goals
            <input
              inputMode="numeric"
              value={goals}
              onChange={(event) => setGoals(event.target.value)}
              placeholder="0"
              className={fieldClass}
            />
          </label>
          <label className="text-sm text-white/60">
            Assists
            <input
              inputMode="numeric"
              value={assists}
              onChange={(event) => setAssists(event.target.value)}
              placeholder="0"
              className={fieldClass}
            />
          </label>
          <label className="text-sm text-white/60 sm:col-span-2">
            Points
            <input
              inputMode="numeric"
              value={points}
              onChange={(event) => setPoints(event.target.value)}
              placeholder="Goals + assists"
              className={fieldClass}
            />
          </label>
        </div>
        <p className="mt-3 text-sm text-white/45">Showing {sport} games on this page.</p>
        {formError ? <p className="mt-3 text-sm text-red-300">{formError}</p> : null}
        <button
          type="button"
          onClick={saveGame}
          className="mt-4 rounded-full bg-[#9dffb0] px-4 py-2.5 text-sm font-semibold text-[#07110e] hover:bg-white"
        >
          Save game
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
          <ProgressChart
            points={chartPoints}
            lowerIsBetter={chartEntry?.lowerIsBetter ?? false}
            emptyLabel="Log the same stat from another game and the line will show up here."
          />
        </div>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-white">Best game numbers</h2>
        {bests.length === 0 ? (
          <p className="mt-3 text-sm text-white/50">Goals, assists, and points show up here after the first game.</p>
        ) : (
          <ul className="mt-3 grid gap-3 sm:grid-cols-3">
            {bests.map((item) => (
              <li key={item.key} className="rounded-2xl border border-white/10 p-4">
                <p className="text-sm text-white/50">{item.best.label}</p>
                <p className="mt-1 text-2xl font-semibold text-white">{formatValue(item.best.value, "")}</p>
                <p className="mt-1 text-sm text-white/45">Best on {item.best.date}</p>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section>
        <h2 className="text-lg font-semibold text-white">Recent games</h2>
        {games.length === 0 ? (
          <p className="mt-3 text-sm text-white/50">No {sport} games logged yet.</p>
        ) : (
          <ul className="mt-3 divide-y divide-white/10 border-y border-white/10">
            {games.map((game) => (
              <li key={game.id} className="flex items-start justify-between gap-3 py-3 text-sm">
                <div>
                  <p className="text-white">
                    {game.stats.map((stat) => `${stat.label} ${formatValue(stat.value, "")}`).join(" · ")}
                  </p>
                  <p className="text-white/45">
                    {game.stats[0].date} · {game.stats[0].sport}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => (game.stats[0].sessionId ? removeSession(game.id) : removeEntry(game.id))}
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
