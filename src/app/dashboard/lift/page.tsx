import type { Metadata } from "next";
import { CategoryLog } from "@/components/category-log";

export const metadata: Metadata = {
  title: "Log a lift | RISE",
  description: "Add several exercises to one lift, then see each exercise on its own chart.",
};

export default function LiftLogPage() {
  return (
    <>
      <h1 className="font-[family-name:var(--font-display)] text-4xl font-semibold tracking-tight text-white sm:text-5xl">
        Log a lift
      </h1>
      <p className="mt-4 max-w-2xl leading-relaxed text-white/70">
        Add bench, squat, or any other exercise, then add another before you save. One lift can hold several exercises.
      </p>
      <div className="mt-8">
        <CategoryLog category="strength" />
      </div>
    </>
  );
}
