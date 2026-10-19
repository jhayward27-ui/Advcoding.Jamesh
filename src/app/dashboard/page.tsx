import type { Metadata } from "next";
import Link from "next/link";
import { PerformanceDashboard } from "@/components/performance-dashboard";

export const metadata: Metadata = {
  title: "Athlete Performance Dashboard | RISE",
  description:
    "Open a separate page to log a sprint, a lift, a practice, or a stat from your sport. See personal bests, progress charts, weekly goals, and your workout streak.",
};

const logPages = [
  {
    href: "/dashboard/sprint",
    title: "Log a sprint",
    detail: "10-yard, 40-yard, and flying 20 times. A lower number is a better sprint.",
  },
  {
    href: "/dashboard/lift",
    title: "Log a lift",
    detail: "Bench, squat, deadlift, and pull-ups, with the weight or the reps.",
  },
  {
    href: "/dashboard/practice",
    title: "Log a practice",
    detail: "Minutes from a practice or from skill work on your own.",
  },
  {
    href: "/dashboard/sport",
    title: "Stats from your sport",
    detail: "Pick hockey, baseball, soccer, or any other sport and log a number from that game.",
  },
];

export default function DashboardPage() {
  return (
    <>
      <p className="text-sm text-white/50">Your numbers stay in this browser</p>
      <h1 className="mt-2 font-[family-name:var(--font-display)] text-4xl font-semibold tracking-tight text-white sm:text-5xl">
        Performance dashboard
      </h1>
      <p className="mt-4 max-w-2xl leading-relaxed text-white/70">
        Each kind of stat has its own page. Log it there, then come back here for the chart, your
        bests, weekly goals, and the streak.
      </p>
      <div className="mt-8 grid gap-3 sm:grid-cols-2">
        {logPages.map((page) => (
          <Link
            key={page.href}
            href={page.href}
            className="rounded-2xl border border-white/10 p-5 transition hover:border-[#9dffb0]/50 hover:bg-white/[0.03]"
          >
            <h2 className="text-lg font-semibold text-white">{page.title}</h2>
            <p className="mt-2 text-sm leading-relaxed text-white/60">{page.detail}</p>
          </Link>
        ))}
      </div>
      <div className="mt-10">
        <PerformanceDashboard />
      </div>
    </>
  );
}
