import type { Metadata } from "next";
import Link from "next/link";
import { sports } from "@/lib/sports-data";

export const metadata: Metadata = {
  title: "About RISE Skill Lab",
  description:
    "A short overview of RISE Skill Lab, a site for training four skills in seven sports.",
};

export default function ProjectPage() {
  return (
    <main className="flex-1">
      <article className="mx-auto max-w-2xl px-5 pb-24 pt-32 sm:px-8 sm:pt-36">
        <p className="text-sm text-white/50">James Hayward</p>
        <h1 className="mt-2 font-[family-name:var(--font-display)] text-4xl font-semibold tracking-tight text-white">
          RISE Skill Lab
        </h1>
        <p className="mt-6 text-lg leading-relaxed text-white/80">
          This is a website for people who want to get better at a sport. You
          pick a sport, then one of four skills. The skill page tells you why
          it matters, how to work on it, what to do during the week, and shows
          a training video.
        </p>
        <p className="mt-4 leading-relaxed text-white/70">
          I kept it to four skills on purpose. A long list of drills is easy to
          ignore. Four skills is small enough that you know what to practice
          next.
        </p>

        <h2 className="mt-16 text-sm font-medium text-white/50">Sports</h2>
        <ul className="mt-4 divide-y divide-white/10 border-y border-white/10">
          {sports.map((sport) => (
            <li key={sport.slug} className="py-5">
              <div className="flex items-baseline justify-between gap-4">
                <Link
                  href={`/sports/${sport.slug}`}
                  className="text-lg text-white hover:underline"
                >
                  {sport.name}
                </Link>
                <span
                  className="hidden h-2 w-2 shrink-0 rounded-full sm:inline"
                  style={{ backgroundColor: sport.accent }}
                />
              </div>
              <p className="mt-2 text-sm leading-relaxed text-white/60">
                {sport.skills.map((skill, index) => (
                  <span key={skill.slug}>
                    {index > 0 ? ", " : null}
                    <Link
                      href={`/sports/${sport.slug}/${skill.slug}`}
                      className="hover:text-white"
                    >
                      {skill.name}
                    </Link>
                  </span>
                ))}
              </p>
            </li>
          ))}
        </ul>

        <h2 className="mt-16 text-sm font-medium text-white/50">
          What a skill page has
        </h2>
        <p className="mt-4 leading-relaxed text-white/75">
          The same layout every time: a short explanation, a few ways to
          improve, a weekly plan, and a video. Hockey skating is a good example
          if you want to see one.{" "}
          <Link href="/sports/hockey/skating" className="text-white underline">
            Open it
          </Link>
          .
        </p>

        <h2 className="mt-16 text-sm font-medium text-white/50">The site</h2>
        <p className="mt-4 leading-relaxed text-white/75">
          It is a Next.js site in{" "}
          <a
            href="https://github.com/jhayward27-ui/Advcoding.Jamesh"
            className="text-white underline"
          >
            this GitHub repo
          </a>
          . GitHub Pages publishes it, so the link works in a normal browser.
        </p>
        <p className="mt-8">
          <Link
            href="/"
            className="text-white underline decoration-white/30 underline-offset-4"
          >
            Go to the training site
          </Link>
        </p>
      </article>
    </main>
  );
}
