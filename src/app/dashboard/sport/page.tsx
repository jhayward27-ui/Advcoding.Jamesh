import type { Metadata } from "next";
import { CategoryLog } from "@/components/category-log";

export const metadata: Metadata = {
  title: "Sport stats | RISE",
  description: "Pick a sport and log a stat from that game, then follow it on its own chart.",
};

export default function SportStatPage() {
  return (
    <>
      <h1 className="font-[family-name:var(--font-display)] text-4xl font-semibold tracking-tight text-white sm:text-5xl">
        Stats from your sport
      </h1>
      <p className="mt-4 max-w-2xl leading-relaxed text-white/70">
        Choose the sport first. The buttons match that sport&apos;s four skills, or type your own
        stat, like shots, goals, or a drill score. Switching sports shows only that sport.
      </p>
      <div className="mt-8">
        <CategoryLog category="sport" />
      </div>
    </>
  );
}
