import type { Metadata } from "next";
import { LiftWorkout } from "@/components/lift-workout";

export const metadata: Metadata = {
  title: "Log a lift | RISE",
  description: "Build a workout plan with empty exercise slots, then save every exercise in that lift.",
};

export default function LiftLogPage() {
  return (
    <>
      <h1 className="font-[family-name:var(--font-display)] text-4xl font-semibold tracking-tight text-white sm:text-5xl">
        Log a lift
      </h1>
      <p className="mt-4 max-w-2xl leading-relaxed text-white/70">
        The workout plan starts with empty slots. Type any exercise into each one, add more slots if you need them, and save the whole lift at once.
      </p>
      <div className="mt-8">
        <LiftWorkout />
      </div>
    </>
  );
}
