"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { sports } from "@/lib/sports-data";

const SITE = "https://jhayward27-ui.github.io/Advcoding.Jamesh/";

const slides = [
  {
    cue: "Say your name, then one sentence: athletes need a plan, not another random video.",
    until: 35,
  },
  {
    cue: "Point at the seven sports. Say you capped each one at four skills so a week of practice fits on one page.",
    until: 75,
  },
  {
    cue: "Ask one volunteer for their sport. Open it, open one skill, read a weekly-plan line, press play, and stop. If nobody volunteers, use baseball hitting.",
    until: 195,
  },
  {
    cue: "Ask for a sprint time or a score from a game. Open the matching log and type their number. Mention it stays in this browser.",
    until: 255,
  },
  {
    cue: "Type a real question, like how to get better at hockey skating. Show that the answer is the guide already on that page.",
    until: 300,
  },
  {
    cue: "Don't read every row. Name Next.js, the static build, and GitHub Pages. Mention the trainer is code in the repo, not a paid API.",
    until: 350,
  },
  {
    cue: "This is the part to teach. Walk the three steps: code, a folder of files, GitHub Pages. Then the localStorage line.",
    until: 410,
  },
  {
    cue: "Leave the link up. Tell them to pick a sport tonight and log one number.",
    until: 420,
  },
] as const;

function clock(seconds: number) {
  const safe = Math.max(0, seconds);
  const minutes = Math.floor(safe / 60);
  const rest = safe % 60;
  return `${minutes}:${String(rest).padStart(2, "0")}`;
}

export function ShowcaseDeck() {
  const [index, setIndex] = useState(0);
  const [notes, setNotes] = useState(false);
  const [startedAt, setStartedAt] = useState<number | null>(null);
  const [now, setNow] = useState(() => Date.now());

  const last = slides.length - 1;

  const go = useCallback(
    (next: number) => {
      setIndex(Math.min(last, Math.max(0, next)));
      setStartedAt((current) => current ?? Date.now());
    },
    [last],
  );

  useEffect(() => {
    const id = window.setInterval(() => setNow(Date.now()), 250);
    return () => window.clearInterval(id);
  }, []);

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      const target = event.target as HTMLElement | null;
      const typing = target?.closest("input, textarea");
      if (typing) return;
      if (event.key === "ArrowRight" || event.key === "PageDown") {
        event.preventDefault();
        go(index + 1);
      } else if (event.key === "ArrowLeft" || event.key === "PageUp") {
        event.preventDefault();
        go(index - 1);
      } else if (event.key === "Home") {
        event.preventDefault();
        go(0);
      } else if (event.key === "End") {
        event.preventDefault();
        go(last);
      } else if (event.key === " " && !target?.closest("a, button")) {
        event.preventDefault();
        go(index + 1);
      } else if (event.key === "n" || event.key === "N") {
        setNotes((open) => !open);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go, index, last]);

  const elapsed = startedAt ? Math.floor((now - startedAt) / 1000) : 0;
  const late = startedAt !== null && elapsed > slides[index].until;
  const over = elapsed > 7 * 60;

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-[#07110e] text-white">
      <div className="h-1 bg-white/10">
        <div
          className="h-full bg-[#9dffb0] transition-all duration-300"
          style={{ width: `${((index + 1) / slides.length) * 100}%` }}
        />
      </div>

      <header className="flex items-center justify-between gap-3 px-4 py-3 sm:px-8">
        <Link
          href="/"
          className="font-[family-name:var(--font-display)] text-lg font-bold tracking-tight text-white"
        >
          RISE
        </Link>
        <p className="text-xs uppercase tracking-[0.18em] text-white/45">
          {index + 1} / {slides.length}
          <span className="mx-2 text-white/20">·</span>
          aim for 6:30
        </p>
        <p
          className={`tabular-nums text-sm font-semibold ${over ? "text-red-300" : late ? "text-amber-200" : "text-[#9dffb0]"}`}
          aria-live="polite"
        >
          {startedAt ? clock(elapsed) : "0:00"}
        </p>
      </header>

      <div className="min-h-0 flex-1 overflow-y-auto px-4 pb-4 sm:px-8">
        <div key={index} className="animate-rise mx-auto flex min-h-full max-w-5xl flex-col justify-center py-2 sm:py-4">
          {index === 0 ? <Open /> : null}
          {index === 1 ? <Cut /> : null}
          {index === 2 ? <Demo /> : null}
          {index === 3 ? <Numbers /> : null}
          {index === 4 ? <Trainer /> : null}
          {index === 5 ? <Specs /> : null}
          {index === 6 ? <Teach /> : null}
          {index === 7 ? <Close /> : null}
        </div>
      </div>

      {notes ? (
        <p className="border-t border-white/10 px-4 py-3 text-sm leading-relaxed text-white/75 sm:px-8">
          <span className="mr-2 text-xs uppercase tracking-[0.16em] text-[#9dffb0]">Say</span>
          {slides[index].cue}
          <span className="mt-1 block text-xs text-white/40">
            Be off this slide by {clock(slides[index].until)}. Press N to hide notes before you project.
          </span>
        </p>
      ) : null}

      <footer className="flex items-center justify-between gap-3 border-t border-white/10 px-4 py-3 sm:px-8">
        <button
          type="button"
          onClick={() => go(index - 1)}
          disabled={index === 0}
          className="rounded-full border border-white/15 px-4 py-2 text-sm text-white disabled:opacity-30"
        >
          Back
        </button>
        <div className="flex items-center gap-2">
          {slides.map((slide, dot) => (
            <button
              key={slide.until}
              type="button"
              aria-label={`Slide ${dot + 1}`}
              onClick={() => go(dot)}
              className={`h-2.5 rounded-full transition-all ${dot === index ? "w-6 bg-[#9dffb0]" : "w-2.5 bg-white/25"}`}
            />
          ))}
          <button
            type="button"
            onClick={() => setNotes((open) => !open)}
            className="ml-2 text-xs uppercase tracking-[0.16em] text-white/50 hover:text-white"
            aria-pressed={notes}
          >
            {notes ? "Hide notes" : "Notes"}
          </button>
        </div>
        <button
          type="button"
          onClick={() => go(index + 1)}
          disabled={index === last}
          className="rounded-full bg-[#9dffb0] px-4 py-2 text-sm font-semibold text-[#07110e] disabled:opacity-30"
        >
          Next
        </button>
      </footer>
    </div>
  );
}

function Open() {
  return (
    <div>
      <p className="text-xs uppercase tracking-[0.22em] text-[#9dffb0]">
        James Hayward · tech showcase
      </p>
      <h1 className="mt-4 font-[family-name:var(--font-display)] text-6xl font-extrabold tracking-tight sm:text-8xl">
        RISE
      </h1>
      <p className="mt-4 max-w-2xl text-2xl leading-snug text-white/85 sm:text-3xl">
        Skill Lab tells you what to practice, then lets you log whether you did it.
      </p>
      <p className="mt-6 max-w-xl text-white/55">
        About six and a half minutes. Arrows move the slides. Notes stay off the projector until you press N.
      </p>
    </div>
  );
}

function Cut() {
  return (
    <div>
      <p className="text-xs uppercase tracking-[0.22em] text-white/45">The cut I made</p>
      <h2 className="mt-3 max-w-3xl font-[family-name:var(--font-display)] text-4xl font-semibold tracking-tight sm:text-6xl">
        Four skills. Not a pile of drills.
      </h2>
      <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/70">
        Seven sports. Each one gets the craft, the body, the tool you play with, and the decisions. That is the whole site.
      </p>
      <ul className="mt-8 flex flex-wrap gap-2">
        {sports.map((sport) => (
          <li
            key={sport.slug}
            className="rounded-full border border-white/10 px-3 py-1.5 text-sm"
            style={{ color: sport.accent }}
          >
            {sport.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

function Demo() {
  return (
    <div>
      <p className="text-xs uppercase tracking-[0.22em] text-[#9dffb0]">Live demo · about 2 minutes</p>
      <h2 className="mt-3 font-[family-name:var(--font-display)] text-4xl font-semibold tracking-tight sm:text-5xl">
        One volunteer. One skill. Then stop.
      </h2>
      <ol className="mt-6 grid gap-3 text-white/80 sm:grid-cols-3">
        {[
          "They name a sport they actually play.",
          "Open a skill. Read one line of the weekly plan.",
          "Press play on the video. Don't tour the whole site.",
        ].map((step, stepIndex) => (
          <li key={step} className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
            <span className="text-xs uppercase tracking-[0.16em] text-white/40">0{stepIndex + 1}</span>
            <p className="mt-2 leading-relaxed">{step}</p>
          </li>
        ))}
      </ol>
      <div className="mt-6 flex flex-wrap gap-2">
        {sports.map((sport) => (
          <Link
            key={sport.slug}
            href={`/sports/${sport.slug}`}
            target="_blank"
            className="rounded-full border px-3 py-1.5 text-sm text-white transition hover:bg-white/10"
            style={{ borderColor: sport.accent }}
          >
            {sport.name}
          </Link>
        ))}
        <Link
          href="/sports/baseball/hitting"
          target="_blank"
          className="rounded-full bg-[#ef4444] px-3 py-1.5 text-sm font-semibold text-white"
        >
          Backup: baseball hitting
        </Link>
      </div>
      <p className="mt-3 text-sm text-white/45">Each sport opens in a new tab. This slideshow stays put.</p>
    </div>
  );
}

function Numbers() {
  const logs = [
    ["Sprint", "/dashboard/sprint", "A time. Lower is better."],
    ["Lift", "/dashboard/lift", "Empty slots. Type every exercise in the workout."],
    ["Practice", "/dashboard/practice", "More than one drill in the same session."],
    ["Game", "/dashboard/sport", "Sport, date, goals, assists, points."],
  ] as const;

  return (
    <div>
      <p className="text-xs uppercase tracking-[0.22em] text-white/45">Still live</p>
      <h2 className="mt-3 max-w-3xl font-[family-name:var(--font-display)] text-4xl font-semibold tracking-tight sm:text-5xl">
        Ask for one number and log it.
      </h2>
      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        {logs.map(([title, href, detail]) => (
          <Link
            key={href}
            href={href}
            target="_blank"
            className="rounded-2xl border border-white/10 p-4 transition hover:border-white/30"
          >
            <p className="font-[family-name:var(--font-display)] text-2xl">{title}</p>
            <p className="mt-1 text-sm text-white/60">{detail}</p>
          </Link>
        ))}
      </div>
      <p className="mt-4 text-white/55">Personal bests, the chart, and the streak update on this computer only.</p>
    </div>
  );
}

function Trainer() {
  return (
    <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
      <div>
        <p className="text-xs uppercase tracking-[0.22em] text-white/45">The trainer</p>
        <h2 className="mt-3 font-[family-name:var(--font-display)] text-4xl font-semibold tracking-tight sm:text-5xl">
          Ask it the way you'd ask a teammate.
        </h2>
        <p className="mt-4 max-w-xl text-lg leading-relaxed text-white/70">
          It does not call an outside chatbot. It matches your sentence to a sport and a skill, then answers with the guide already written on that page.
        </p>
        <Link
          href="/#trainer"
          target="_blank"
          className="mt-6 inline-flex rounded-full bg-[#9dffb0] px-4 py-2 text-sm font-semibold text-[#07110e]"
        >
          Open the trainer
        </Link>
      </div>
      <div className="space-y-3 rounded-3xl border border-white/10 bg-black/30 p-5">
        <p className="text-sm text-white/50">You</p>
        <p className="text-lg">Weekly plan for hockey skating</p>
        <p className="pt-2 text-sm text-[#9dffb0]">RISE</p>
        <p className="leading-relaxed text-white/80">
          2 edge-quality sessions. 1 transition and stopping session. 1 game-speed skating circuit after practice.
        </p>
      </div>
    </div>
  );
}

function Specs() {
  const rows = [
    ["App", "Next.js 16, React 19, TypeScript"],
    ["Look", "Tailwind CSS 4"],
    ["Pages", "7 sports, 28 skill guides, each with a YouTube video"],
    ["Build", "Static export. A folder of HTML, CSS, and JS"],
    ["Host", "GitHub Actions publishes that folder to GitHub Pages on every push to main"],
    ["Memory", "Dashboard uses localStorage on this browser. Key: rise-dashboard-v1"],
    ["Trainer", "Rules in the repo. Same text as the skill pages. No API key"],
  ];

  return (
    <div>
      <p className="text-xs uppercase tracking-[0.22em] text-white/45">Tech specs</p>
      <h2 className="mt-3 font-[family-name:var(--font-display)] text-4xl font-semibold tracking-tight sm:text-5xl">
        What is actually running
      </h2>
      <dl className="mt-6 divide-y divide-white/10 border-y border-white/10">
        {rows.map(([term, detail]) => (
          <div key={term} className="grid gap-1 py-2 sm:grid-cols-[9rem_1fr] sm:gap-6 sm:py-3">
            <dt className="text-sm uppercase tracking-[0.14em] text-[#9dffb0]">{term}</dt>
            <dd className="text-white/80">{detail}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

function Teach() {
  const steps = [
    ["1", "Write the pages", "React components and one data file for the sports."],
    ["2", "Build a folder", "next build with output: export writes plain files into out/."],
    ["3", "Push main", "GitHub Actions uploads that folder. Pages serves the link."],
  ];

  return (
    <div>
      <p className="text-xs uppercase tracking-[0.22em] text-[#9dffb0]">Something you can use</p>
      <h2 className="mt-3 max-w-3xl font-[family-name:var(--font-display)] text-4xl font-semibold tracking-tight sm:text-5xl">
        A class site can be a folder of files.
      </h2>
      <ol className="mt-5 grid gap-2 sm:gap-3 md:grid-cols-3">
        {steps.map(([number, title, detail]) => (
          <li key={number} className="rounded-2xl border border-white/10 p-3 sm:p-4">
            <span className="font-[family-name:var(--font-display)] text-3xl text-[#9dffb0]">{number}</span>
            <p className="mt-3 text-lg font-semibold">{title}</p>
            <p className="mt-1 text-sm leading-relaxed text-white/65">{detail}</p>
          </li>
        ))}
      </ol>
      <p className="mt-5 max-w-3xl text-white/70">
        If the page only needs to remember you, skip the database. localStorage is a notebook inside the browser. RISE keeps sprint times there, so they never leave the laptop that logged them.
      </p>
    </div>
  );
}

function Close() {
  return (
    <div>
      <p className="text-xs uppercase tracking-[0.22em] text-white/45">The link works right now</p>
      <h2 className="mt-3 font-[family-name:var(--font-display)] text-4xl font-semibold tracking-tight sm:text-6xl">
        Pick a sport. Log one number.
      </h2>
      <a
        href={SITE}
        className="mt-6 block break-all text-xl text-[#9dffb0] underline decoration-[#9dffb0]/40 underline-offset-4 sm:text-2xl"
      >
        {SITE}
      </a>
      <div className="mt-6 flex flex-wrap gap-3">
        <a href={SITE} className="rounded-full bg-[#9dffb0] px-4 py-2 text-sm font-semibold text-[#07110e]">
          Open RISE
        </a>
        <a
          href={`${SITE}sports/baseball/hitting/`}
          className="rounded-full border border-white/20 px-4 py-2 text-sm text-white"
        >
          Baseball hitting
        </a>
      </div>
    </div>
  );
}
