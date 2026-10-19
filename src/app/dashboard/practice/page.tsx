import type { Metadata } from "next";
import { CategoryLog } from "@/components/category-log";

export const metadata: Metadata = {
  title: "Log a practice | RISE",
  description: "Save practice and skill-work minutes, then see that time add up on a chart.",
};

export default function PracticeLogPage() {
  return (
    <>
      <h1 className="font-[family-name:var(--font-display)] text-4xl font-semibold tracking-tight text-white sm:text-5xl">
        Log a practice
      </h1>
      <p className="mt-4 max-w-2xl leading-relaxed text-white/70">
        Write down how many minutes you practiced or did skill work. Those sessions stay on this
        page.
      </p>
      <div className="mt-8">
        <CategoryLog category="practice" />
      </div>
    </>
  );
}
