import type { Metadata } from "next";
import { CategoryLog } from "@/components/category-log";

export const metadata: Metadata = {
  title: "Log a practice | RISE",
  description: "Add several drills to one practice, then follow each drill on its own chart.",
};

export default function PracticeLogPage() {
  return (
    <>
      <h1 className="font-[family-name:var(--font-display)] text-4xl font-semibold tracking-tight text-white sm:text-5xl">
        Log a practice
      </h1>
      <p className="mt-4 max-w-2xl leading-relaxed text-white/70">
        Pick a sport to see its drills. Add more than one drill, with the minutes or the reps, then
        save the practice.
      </p>
      <div className="mt-8">
        <CategoryLog category="practice" />
      </div>
    </>
  );
}
