import type { Metadata } from "next";
import { PerformanceDashboard } from "@/components/performance-dashboard";

export const metadata: Metadata = {
  title: "Athlete Performance Dashboard | RISE",
  description:
    "Log sprint times, strength numbers, and practice sessions. See personal bests, progress charts, weekly goals, and your workout streak.",
};

export default function DashboardPage() {
  return (
    <main className="flex-1">
      <div className="mx-auto max-w-5xl px-5 pb-20 pt-28 sm:px-8 sm:pt-32">
        <p className="text-sm text-white/50">Your numbers stay in this browser</p>
        <h1 className="mt-2 font-[family-name:var(--font-display)] text-4xl font-semibold tracking-tight text-white sm:text-5xl">
          Performance dashboard
        </h1>
        <p className="mt-4 max-w-2xl leading-relaxed text-white/70">
          Log a sprint, a lift, a practice, or a stat from your sport. The chart
          and personal bests update from what you enter. Weekly goals count the
          logs you save this week, and the streak counts days in a row.
        </p>
        <div className="mt-8">
          <PerformanceDashboard />
        </div>
      </div>
    </main>
  );
}
