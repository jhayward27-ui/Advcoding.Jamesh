"use client";

import Link from "next/link";
import { useCallback, useEffect, useState, type ReactNode } from "react";
import { sports } from "@/lib/sports-data";

const SITE = "https://jhayward27-ui.github.io/Advcoding.Jamesh/";

const slideCount = 8;

export function ShowcaseDeck() {
  const [index, setIndex] = useState(0);
  const last = slideCount - 1;

  const go = useCallback(
    (next: number) => {
      setIndex(Math.min(last, Math.max(0, next)));
    },
    [last],
  );

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      const target = event.target as HTMLElement | null;
      if (target?.closest("input, textarea")) return;
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
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go, index, last]);

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col bg-[#f4f0e6] text-[#241f1a]"
      style={{ fontFamily: '"Segoe UI", "Helvetica Neue", Arial, sans-serif' }}
    >
      <header className="flex items-baseline justify-between gap-4 border-b border-[#241f1a]/15 px-5 py-3 sm:px-10">
        <Link href="/" className="text-[1.05rem] text-[#241f1a] no-underline">
          <span style={{ fontFamily: 'Georgia, "Iowan Old Style", Palatino, serif' }}>RISE Skill Lab</span>
        </Link>
        <p className="text-sm text-[#241f1a]/70">James Hayward</p>
      </header>

      <div className="min-h-0 flex-1 overflow-y-auto px-5 py-6 sm:px-10 sm:py-8">
        <div key={index} className="mx-auto max-w-3xl">
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

      <footer className="flex items-center justify-between gap-3 border-t border-[#241f1a]/15 px-5 py-3 sm:px-10">
        <button
          type="button"
          onClick={() => go(index - 1)}
          disabled={index === 0}
          className="text-sm underline decoration-[#241f1a]/40 underline-offset-4 disabled:no-underline disabled:opacity-30"
        >
          Back
        </button>
        <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-sm">
          {Array.from({ length: slideCount }, (_, dot) => (
            <button
              key={dot}
              type="button"
              aria-label={`Slide ${dot + 1}`}
              aria-current={dot === index ? "true" : undefined}
              onClick={() => go(dot)}
              className={dot === index ? "font-semibold underline underline-offset-4" : "text-[#241f1a]/45"}
            >
              {dot + 1}
            </button>
          ))}
        </div>
        <button
          type="button"
          onClick={() => go(index + 1)}
          disabled={index === last}
          className="text-sm underline decoration-[#241f1a]/40 underline-offset-4 disabled:no-underline disabled:opacity-30"
        >
          Next
        </button>
      </footer>
    </div>
  );
}

function Title({ children }: { children: ReactNode }) {
  return (
    <h1
      className="text-4xl leading-tight text-[#241f1a] sm:text-5xl"
      style={{ fontFamily: 'Georgia, "Iowan Old Style", Palatino, serif' }}
    >
      {children}
    </h1>
  );
}

function Open() {
  return (
    <div>
      <Title>RISE Skill Lab</Title>
      <p className="mt-5 max-w-xl text-lg leading-relaxed">
        You pick a sport, then one of four skills. That page tells you what to work on and plays a video.
      </p>
      <p className="mt-3 max-w-xl text-lg leading-relaxed">
        If you want to keep your own numbers, the dashboard logs a sprint, a lift, a practice, or a game.
      </p>
    </div>
  );
}

function Cut() {
  const hockey = sports.find((sport) => sport.slug === "hockey");
  return (
    <div>
      <Title>Four skills, not a long drill list</Title>
      <p className="mt-5 max-w-xl text-lg leading-relaxed">
        A huge list is easy to skip. Four things is enough to know what to practice this week.
      </p>
      <p className="mt-4 text-lg leading-relaxed">
        {sports.map((sport) => sport.name).join(", ")}.
      </p>
      {hockey ? (
        <p className="mt-4 max-w-xl text-lg leading-relaxed">
          Hockey is {hockey.skills.map((skill) => skill.name).join(", ")}. The other sports are set up the same way, with skills that fit that sport.
        </p>
      ) : null}
    </div>
  );
}

function Demo() {
  return (
    <div>
      <Title>Open one skill</Title>
      <ol className="mt-5 list-decimal space-y-2 pl-5 text-lg leading-relaxed">
        <li>Someone names a sport they play.</li>
        <li>Open that sport, then one skill.</li>
        <li>The page has why it matters, how to get better, a weekly plan, and a video.</li>
      </ol>
      <p className="mt-5 text-lg">Baseball hitting is an easy page to open.</p>
      <p className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-lg">
        {sports.map((sport) => (
          <Link
            key={sport.slug}
            href={`/sports/${sport.slug}`}
            target="_blank"
            className="text-[#1d4e89] underline decoration-[#1d4e89]/40 underline-offset-4"
          >
            {sport.name}
          </Link>
        ))}
        <Link
          href="/sports/baseball/hitting"
          target="_blank"
          className="text-[#1d4e89] underline decoration-[#1d4e89]/40 underline-offset-4"
        >
          Baseball hitting
        </Link>
      </p>
      <p className="mt-3 text-sm text-[#241f1a]/70">The sport opens in a new tab, so these slides stay here.</p>
    </div>
  );
}

function Numbers() {
  const logs = [
    ["Sprint", "/dashboard/sprint", "A time. Lower is better."],
    ["Lift", "/dashboard/lift", "Empty slots, so you can type every exercise in the workout."],
    ["Practice", "/dashboard/practice", "More than one drill in the same session."],
    ["Game", "/dashboard/sport", "Sport, date, goals, assists, and points."],
  ] as const;

  return (
    <div>
      <Title>Log one number</Title>
      <ul className="mt-5 space-y-3 text-lg">
        {logs.map(([title, href, detail]) => (
          <li key={href}>
            <Link href={href} target="_blank" className="text-[#1d4e89] underline decoration-[#1d4e89]/40 underline-offset-4">
              {title}
            </Link>
            <span className="text-[#241f1a]"> — {detail}</span>
          </li>
        ))}
      </ul>
      <p className="mt-5 max-w-xl text-lg leading-relaxed">
        The personal best, the chart, and the streak update on this computer. They are not sent to a server.
      </p>
    </div>
  );
}

function Trainer() {
  return (
    <div>
      <Title>Ask the trainer</Title>
      <p className="mt-5 max-w-xl text-lg leading-relaxed">
        Type something like “Weekly plan for hockey skating.” It answers from the skating page:
      </p>
      <blockquote className="mt-4 border-l-2 border-[#241f1a] pl-4 text-lg leading-relaxed">
        2 edge-quality sessions. 1 transition and stopping session. 1 game-speed skating circuit after practice.
      </blockquote>
      <p className="mt-4 max-w-xl text-lg leading-relaxed">
        It is not ChatGPT. The reply is the guide already written on the site, and it links you to that page.
      </p>
      <p className="mt-4">
        <Link href="/#trainer" target="_blank" className="text-lg text-[#1d4e89] underline decoration-[#1d4e89]/40 underline-offset-4">
          Open the trainer
        </Link>
      </p>
    </div>
  );
}

function Specs() {
  const rows = [
    ["App", "Next.js 16, React 19, TypeScript"],
    ["Styling", "Tailwind CSS"],
    ["Pages", "7 sports and 28 skill guides, each with a YouTube video"],
    ["Build", "Static export. The site becomes a folder of HTML, CSS, and JS."],
    ["Hosting", "GitHub Actions puts that folder on GitHub Pages when main is pushed."],
    ["Dashboard", "Saved in this browser with localStorage. The key is rise-dashboard-v1."],
    ["Trainer", "Plain code in the project. Same words as the skill pages. No API key."],
  ];

  return (
    <div>
      <Title>What it runs on</Title>
      <dl className="mt-5">
        {rows.map(([term, detail]) => (
          <div key={term} className="grid gap-1 border-t border-[#241f1a]/15 py-2.5 sm:grid-cols-[8.5rem_1fr] sm:gap-6">
            <dt className="font-semibold">{term}</dt>
            <dd>{detail}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

function Teach() {
  return (
    <div>
      <Title>A site can just be files</Title>
      <ol className="mt-5 list-decimal space-y-3 pl-5 text-lg leading-relaxed">
        <li>The pages are React. All seven sports live in one data file.</li>
        <li>
          <span className="font-mono text-base">next build</span> with{" "}
          <span className="font-mono text-base">output: &quot;export&quot;</span> writes normal files into a folder called out.
        </li>
        <li>Pushing main runs GitHub Actions. GitHub Pages hosts that folder, so the link works when my laptop is closed.</li>
      </ol>
      <p className="mt-5 max-w-xl text-lg leading-relaxed">
        The stats do not need a database. localStorage is storage inside the browser. A sprint time stays on the laptop that logged it.
      </p>
    </div>
  );
}

function Close() {
  return (
    <div>
      <Title>The site</Title>
      <p className="mt-5 text-lg leading-relaxed">Pick a sport, open a skill, or log one number.</p>
      <p className="mt-4">
        <a href={SITE} className="break-all text-xl text-[#1d4e89] underline decoration-[#1d4e89]/40 underline-offset-4">
          {SITE}
        </a>
      </p>
      <p className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-lg">
        <a href={SITE} className="text-[#1d4e89] underline decoration-[#1d4e89]/40 underline-offset-4">
          Home
        </a>
        <a
          href={`${SITE}sports/baseball/hitting/`}
          className="text-[#1d4e89] underline decoration-[#1d4e89]/40 underline-offset-4"
        >
          Baseball hitting
        </a>
        <a
          href={`${SITE}dashboard/`}
          className="text-[#1d4e89] underline decoration-[#1d4e89]/40 underline-offset-4"
        >
          Dashboard
        </a>
      </p>
    </div>
  );
}
