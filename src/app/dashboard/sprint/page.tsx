import type { Metadata } from "next";
import { CategoryLog } from "@/components/category-log";

export const metadata: Metadata = {
  title: "Log a sprint | RISE",
  description: "Save 10-yard, 40-yard, and flying 20 times, then see your best sprint on a chart.",
};

export default function SprintLogPage() {
  return (
    <>
      <h1 className="font-[family-name:var(--font-display)] text-4xl font-semibold tracking-tight text-white sm:text-5xl">
        Log a sprint
      </h1>
      <p className="mt-4 max-w-2xl leading-relaxed text-white/70">
        Pick the dash and enter the time in seconds. A lower time is the better sprint. This page
        only keeps sprint logs.
      </p>
      <div className="mt-8">
        <CategoryLog category="sprint" />
      </div>
    </>
  );
}
