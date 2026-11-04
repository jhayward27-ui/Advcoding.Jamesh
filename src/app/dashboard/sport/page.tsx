import type { Metadata } from "next";
import { GameStats } from "@/components/game-stats";

export const metadata: Metadata = {
  title: "Sport stats | RISE",
  description: "Pick a sport and log goals, assists, and points from a game.",
};

export default function SportStatPage() {
  return (
    <>
      <h1 className="font-[family-name:var(--font-display)] text-4xl font-semibold tracking-tight text-white sm:text-5xl">
        Stats from your sport
      </h1>
      <p className="mt-4 max-w-2xl leading-relaxed text-white/70">
        Choose the sport, pick the date of the game, and write down your goals, assists, and points.
        Switching sports shows only the games from that sport.
      </p>
      <div className="mt-8">
        <GameStats />
      </div>
    </>
  );
}
