import Link from "next/link";
import { SportGrid } from "@/components/sport-grid";
import { sports } from "@/lib/sports-data";

export default function Home() {
  return (
    <main className="flex-1">
      <section className="relative min-h-[100svh] overflow-hidden">
        <div
          className="animate-hero-zoom absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url(https://images.unsplash.com/photo-1461896836934-ffe607ba6851?auto=format&fit=crop&w=2000&q=80)",
          }}
        />
        <div className="absolute inset-0 bg-[#07110e]/55" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#07110e] via-[#07110e]/45 to-[#07110e]/30" />
        <div className="relative mx-auto flex min-h-[100svh] max-w-6xl flex-col justify-end px-5 pb-16 pt-28 sm:px-8 sm:pb-24">
          <p className="animate-rise font-[family-name:var(--font-display)] text-5xl font-extrabold tracking-tight text-white sm:text-7xl md:text-8xl">
            RISE
          </p>
          <h1 className="animate-rise-delay mt-4 max-w-2xl text-2xl font-medium leading-snug text-white sm:text-3xl md:text-4xl">
            Get better at your sport through four skills that actually move the needle.
          </h1>
          <p className="animate-rise-delay-2 mt-4 max-w-xl text-base leading-relaxed text-white/75 sm:text-lg">
            Guides, weekly plans, and training videos for hockey, baseball, soccer,
            football, lacrosse, golf, and basketball.
          </p>
          <div className="animate-rise-delay-2 mt-8 flex flex-wrap gap-3">
            <a
              href="#sports"
              className="inline-flex items-center rounded-full bg-[#9dffb0] px-6 py-3 text-sm font-semibold text-[#07110e] transition hover:bg-white"
            >
              Choose your sport
            </a>
            <a
              href="#method"
              className="inline-flex items-center rounded-full border border-white/25 px-6 py-3 text-sm font-semibold text-white transition hover:border-white hover:bg-white/10"
            >
              How RISE works
            </a>
          </div>
        </div>
      </section>

      <section id="sports" className="mx-auto max-w-6xl scroll-mt-20 px-5 py-20 sm:px-8">
        <div className="mb-10 max-w-2xl">
          <p className="text-xs uppercase tracking-[0.22em] text-[#9dffb0]/80">
            Seven sports
          </p>
          <h2 className="mt-3 font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Pick a sport. Train its four pillars.
          </h2>
          <p className="mt-3 text-white/70">
            Each sport page breaks down the skills, why they matter, how to improve,
            a weekly plan, and a training video.
          </p>
        </div>
        <SportGrid sports={sports} />
      </section>

      <section id="method" className="border-t border-white/10 bg-black/20">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-20 sm:px-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="text-xs uppercase tracking-[0.22em] text-[#9dffb0]/80">
              The method
            </p>
            <h2 className="mt-3 font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              Four skills. Clear reps. Better games.
            </h2>
          </div>
          <div className="space-y-6 text-white/75">
            <p className="leading-relaxed">
              Athletes get stuck chasing random drills. RISE focuses each sport on four
              major skills so you always know what to train next — technique, athleticism,
              craft with the ball or stick, and decision-making IQ.
            </p>
            <p className="leading-relaxed">
              Open a sport, pick a skill, watch the video, follow the improvement steps,
              and run the weekly plan. Come back when you are ready for the next pillar.
            </p>
            <Link
              href="/sports/hockey"
              className="inline-flex text-sm font-semibold text-[#9dffb0] transition hover:text-white"
            >
              Start with hockey →
            </Link>
          </div>
        </div>
      </section>

      <footer className="border-t border-white/10 px-5 py-8 text-center text-sm text-white/45 sm:px-8">
        RISE Skill Lab — train with intent.
      </footer>
    </main>
  );
}
