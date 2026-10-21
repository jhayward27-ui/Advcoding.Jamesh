"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { StatEntry, WeeklyGoal } from "@/lib/dashboard";

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

type DashboardStore = {
  saved: Saved;
  ready: boolean;
  addEntry: (entry: Omit<StatEntry, "id">) => void;
  addEntries: (entries: Omit<StatEntry, "id" | "sessionId">[]) => void;
  removeEntry: (id: string) => void;
  removeSession: (sessionId: string) => void;
  addGoal: (title: string, target: number) => void;
  removeGoal: (id: string) => void;
};

const DashboardContext = createContext<DashboardStore | null>(null);

export function DashboardProvider({ children }: { children: ReactNode }) {
  const [saved, setSaved] = useState<Saved>(emptySaved);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setSaved(loadSaved());
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    localStorage.setItem(storageKey, JSON.stringify(saved));
  }, [saved, ready]);

  const store: DashboardStore = {
    saved,
    ready,
    addEntry(entry) {
      const next: StatEntry = { ...entry, id: crypto.randomUUID() };
      setSaved((current) => ({ ...current, entries: [next, ...current.entries] }));
    },
    addEntries(entries) {
      const sessionId = crypto.randomUUID();
      const next = entries.map((entry) => ({ ...entry, id: crypto.randomUUID(), sessionId }));
      setSaved((current) => ({ ...current, entries: [...next, ...current.entries] }));
    },
    removeEntry(id) {
      setSaved((current) => ({
        ...current,
        entries: current.entries.filter((entry) => entry.id !== id),
      }));
    },
    removeSession(sessionId) {
      setSaved((current) => ({
        ...current,
        entries: current.entries.filter((entry) => entry.sessionId !== sessionId),
      }));
    },
    addGoal(title, target) {
      const goal: WeeklyGoal = { id: crypto.randomUUID(), title, target };
      setSaved((current) => ({ ...current, goals: [...current.goals, goal] }));
    },
    removeGoal(id) {
      setSaved((current) => ({
        ...current,
        goals: current.goals.filter((goal) => goal.id !== id),
      }));
    },
  };

  return <DashboardContext.Provider value={store}>{children}</DashboardContext.Provider>;
}

export function useDashboardStore() {
  const store = useContext(DashboardContext);
  if (!store) throw new Error("useDashboardStore must be used inside DashboardProvider");
  return store;
}
