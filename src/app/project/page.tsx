import type { Metadata } from "next";
import Link from "next/link";
import { sports } from "@/lib/sports-data";

export const metadata: Metadata = {
  title: "About RISE Skill Lab",
  description:
    "A single-page overview of RISE Skill Lab: a sports training website with four skills, guides, and videos for seven sports.",
};

const steps = [
  {
    title: "Pick a sport",
    detail:
      "The home page opens with seven sports: hockey, baseball, soccer, football, lacrosse, golf, and basketball.",
  },
  {
    title: "Open one skill",
    detail:
      "Each sport has four major skills. Clicking a skill leaves the overview and opens that skill’s own page.",
  },
  {
    title: "Train from the page",
    detail:
      "The skill page explains why it matters, lists how to improve, gives a weekly plan, and plays a training video.",
  },
];

export default function ProjectPage() {
  return (
    <main className="flex-1">
      <section className="relative overflow-hidden border-b border-white/10">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-40"
          style={{
            backgroundImage:
              "url(https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=2000&q=80)",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#07110e]/75 via-[#07110e]/85 to-[#07110e]" />
        <div className="relative mx-auto max-w-3xl px-5 pb-20 pt-32 sm:px-8 sm:pt-40">
          <p className="text-xs uppercase tracking-[0.22em] text-[#9dffb0]">
            Project overview
          </p>
          <h1 className="mt-4 font-[family-name:var(--font-display)] text-5xl font-extrabold tracking-tight text-white sm:text-7xl">
            RISE Skill Lab
          </h1>
          <p className="mt-6 text-xl leading-relaxed text-white/85 sm:text-2xl">
            A website that helps athletes get better by focusing each sport on
            four skills, with a guide and a training video for every skill.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#how-it-works"
              className="inline-flex rounded-full bg-[#9dffb0] px-5 py-2.5 text-sm font-semibold text-[#07110e] transition hover:bg-white"
            >
              Read the page
            </a>
            <Link
              href="/"
              className="inline-flex rounded-full border border-white/25 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Open the training site
            </Link>
          </div>
        </div>
      </section>

      <nav className="sticky top-0 z-20 border-b border-white/10 bg-[#07110e]/90 backdrop-blur">
        <div className="mx-auto flex max-w-3xl gap-4 overflow-x-auto px-5 py-3 text-sm text-white/70 sm:px-8">
          <a href="#purpose" className="shrink-0 hover:text-white">
            Purpose
          </a>
          <a href="#how-it-works" className="shrink-0 hover:text-white">
            How it works
          </a>
          <a href="#sports" className="shrink-0 hover:text-white">
            Sports
          </a>
          <a href="#skill-page" className="shrink-0 hover:text-white">
            A skill page
          </a>
          <a href="#publish" className="shrink-0 hover:text-white">
            Where it lives
          </a>
        </div>
      </nav>

      <article className="mx-auto max-w-3xl space-y-20 px-5 py-16 sm:px-8 sm:py-24">
        <section id="purpose" className="scroll-mt-24">
          <p className="text-xs uppercase tracking-[0.22em] text-white/45">
            Purpose
          </p>
          <h2 className="mt-3 font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Athletes know they want to improve. They do not always know what to train next.
          </h2>
          <div className="mt-6 space-y-4 text-lg leading-relaxed text-white/75">
            <p>
              RISE Skill Lab is a training guide for seven sports. Instead of a
              long list of random drills, every sport is organized into four
              major skills. Those four skills are the whole practice plan.
            </p>
            <p>
              The site is meant for players who want to grow their knowledge of
              a sport, whether that means skill work on the field or athletic
              work that shows up in the game.
            </p>
          </div>
        </section>

        <section id="how-it-works" className="scroll-mt-24">
          <p className="text-xs uppercase tracking-[0.22em] text-white/45">
            How it works
          </p>
          <h2 className="mt-3 font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Three steps from the home page to a practice plan.
          </h2>
          <ol className="mt-8 space-y-4">
            {steps.map((step, index) => (
              <li
                key={step.title}
                className="rounded-2xl border border-white/10 bg-white/[0.03] p-5"
              >
                <p className="text-sm font-semibold text-[#9dffb0]">
                  Step {index + 1}
                </p>
                <h3 className="mt-1 text-xl font-semibold text-white">
                  {step.title}
                </h3>
                <p className="mt-2 leading-relaxed text-white/70">{step.detail}</p>
              </li>
            ))}
          </ol>
        </section>

        <section id="sports" className="scroll-mt-24">
          <p className="text-xs uppercase tracking-[0.22em] text-white/45">
            What is on the site
          </p>
          <h2 className="mt-3 font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Seven sports. Four skills each.
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-white/75">
            These are the skills a visitor can open. Each name links to that
            skill’s training page on the live site.
          </p>
          <div className="mt-8 space-y-6">
            {sports.map((sport) => (
              <section
                key={sport.slug}
                className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 sm:p-6"
              >
                <div className="flex flex-wrap items-end justify-between gap-3">
                  <div>
                    <h3 className="font-[family-name:var(--font-display)] text-2xl font-semibold text-white">
                      {sport.name}
                    </h3>
                    <p className="mt-1 text-sm text-white/60">{sport.tagline}</p>
                  </div>
                  <Link
                    href={`/sports/${sport.slug}`}
                    className="text-sm font-semibold"
                    style={{ color: sport.accent }}
                  >
                    Open {sport.name}
                  </Link>
                </div>
                <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                  {sport.skills.map((skill, index) => (
                    <li key={skill.slug}>
                      <Link
                        href={`/sports/${sport.slug}/${skill.slug}`}
                        className="block rounded-xl border border-white/10 px-4 py-3 transition hover:border-white/30 hover:bg-white/[0.04]"
                      >
                        <span
                          className="text-xs font-semibold uppercase tracking-[0.16em]"
                          style={{ color: sport.accent }}
                        >
                          Skill {index + 1}
                        </span>
                        <span className="mt-1 block font-medium text-white">
                          {skill.name}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
        </section>

        <section id="skill-page" className="scroll-mt-24">
          <p className="text-xs uppercase tracking-[0.22em] text-white/45">
            A skill page
          </p>
          <h2 className="mt-3 font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Every skill page teaches the same four things.
          </h2>
          <ul className="mt-6 space-y-3 text-lg leading-relaxed text-white/75">
            <li>Why the skill matters in a real game.</li>
            <li>Numbered steps for how to improve it.</li>
            <li>A short weekly plan so practice has a schedule.</li>
            <li>A training video embedded on the page.</li>
          </ul>
          <p className="mt-6 leading-relaxed text-white/75">
            Example: hockey skating covers edge work, why edges create
            separation, a weekly skating plan, and a video of edge drills.
          </p>
          <Link
            href="/sports/hockey/skating"
            className="mt-6 inline-flex text-sm font-semibold text-[#9dffb0] hover:text-white"
          >
            See the hockey skating page
          </Link>
        </section>

        <section id="publish" className="scroll-mt-24">
          <p className="text-xs uppercase tracking-[0.22em] text-white/45">
            Where it lives
          </p>
          <h2 className="mt-3 font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            The site is published from this GitHub repository.
          </h2>
          <div className="mt-6 space-y-4 text-lg leading-relaxed text-white/75">
            <p>
              The app is a Next.js site. Pushing the main branch builds a
              static copy and publishes it with GitHub Pages, so anyone with
              the link can open it without installing anything.
            </p>
            <p>
              The source code is in{" "}
              <a
                href="https://github.com/jhayward27-ui/Advcoding.Jamesh"
                className="text-[#9dffb0] underline decoration-white/20 underline-offset-4 hover:text-white"
              >
                jhayward27-ui/Advcoding.Jamesh
              </a>
              .
            </p>
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/"
              className="inline-flex rounded-full bg-[#9dffb0] px-5 py-2.5 text-sm font-semibold text-[#07110e] transition hover:bg-white"
            >
              Open the training site
            </Link>
            <a
              href="https://github.com/jhayward27-ui/Advcoding.Jamesh"
              className="inline-flex rounded-full border border-white/25 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              View the repository
            </a>
          </div>
        </section>
      </article>
    </main>
  );
}
