import type { Metadata } from "next";
import { CategoryLog } from "@/components/category-log";

export const metadata: Metadata = {
  title: "Log a lift | RISE",
  description: "Save bench, squat, deadlift, and pull-up numbers, then see your best lift on a chart.",
};

export default function LiftLogPage() {
  return (
    <>
      <h1 className="font-[family-name:var(--font-display)] text-4xl font-semibold tracking-tight text-white sm:text-5xl">
        Log a lift
      </h1>
      <p className="mt-4 max-w-2xl leading-relaxed text-white/70">
        Enter the weight or the reps. This page only keeps lifts, separate from sprints and practice.
      </p>
      <div className="mt-8">
        <CategoryLog category="strength" />
      </div>
    </>
  );
}
