import Link from "next/link";
import { notFound } from "next/navigation";
import { VideoEmbed } from "@/components/video-embed";
import { getSkill, sports } from "@/lib/sports-data";

export function generateStaticParams() {
  return sports.flatMap((sport) =>
    sport.skills.map((skill) => ({
      sport: sport.slug,
      skill: skill.slug,
    })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ sport: string; skill: string }>;
}) {
  const { sport: sportSlug, skill: skillSlug } = await params;
  const result = getSkill(sportSlug, skillSlug);
  if (!result) return { title: "Skill not found" };
  return {
    title: `${result.skill.name} — ${result.sport.name} | RISE`,
    description: result.skill.summary,
  };
}

export default async function SkillPage({
  params,
}: {
  params: Promise<{ sport: string; skill: string }>;
}) {
  const { sport: sportSlug, skill: skillSlug } = await params;
  const result = getSkill(sportSlug, skillSlug);
  if (!result) notFound();

  const { sport, skill } = result;
  const skillIndex = sport.skills.findIndex((item) => item.slug === skill.slug);
  const prev = skillIndex > 0 ? sport.skills[skillIndex - 1] : null;
  const next =
    skillIndex < sport.skills.length - 1 ? sport.skills[skillIndex + 1] : null;

  return (
    <main className="flex-1">
      <section className="relative overflow-hidden border-b border-white/10">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-35"
          style={{ backgroundImage: `url(${sport.image})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#07110e]/70 via-[#07110e]/85 to-[#07110e]" />
        <div className="relative mx-auto max-w-6xl px-5 pb-12 pt-28 sm:px-8">
          <Link
            href={`/sports/${sport.slug}`}
            className="text-sm text-white/65 transition hover:text-white"
          >
            ← {sport.name} skills
          </Link>
          <p
            className="mt-6 text-xs uppercase tracking-[0.22em]"
            style={{ color: sport.accent }}
          >
            {sport.name} · Skill {String(skillIndex + 1).padStart(2, "0")} of 4
          </p>
          <h1 className="mt-3 font-[family-name:var(--font-display)] text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl">
            {skill.name}
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-white/80">
            {skill.summary}
          </p>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-10 px-5 py-12 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
        <div className="space-y-8">
          <div>
            <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-white/50">
              Why it matters
            </h2>
            <p className="mt-3 text-base leading-relaxed text-white/80">
              {skill.whyItMatters}
            </p>
          </div>

          <div>
            <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-white/50">
              How to improve
            </h2>
            <ol className="mt-4 space-y-4">
              {skill.howToImprove.map((step, index) => (
                <li key={step} className="flex gap-3 text-white/85">
                  <span
                    className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-sm font-semibold text-[#07110e]"
                    style={{ backgroundColor: sport.accent }}
                  >
                    {index + 1}
                  </span>
                  <span className="leading-relaxed">{step}</span>
                </li>
              ))}
            </ol>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
            <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-white/50">
              Weekly plan
            </h2>
            <ul className="mt-4 space-y-3">
              {skill.weeklyPlan.map((item) => (
                <li key={item} className="flex gap-2 text-white/80">
                  <span style={{ color: sport.accent }}>▸</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="lg:sticky lg:top-24">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-white/50">
            Training video
          </p>
          <VideoEmbed
            youtubeId={skill.video.youtubeId}
            title={skill.video.title}
          />
          <p className="mt-4 text-sm leading-relaxed text-white/60">
            Watch the video, then run the steps and weekly plan above. Come back
            when you are ready for the next {sport.name.toLowerCase()} skill.
          </p>
        </div>
      </section>

      <section className="border-t border-white/10">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-5 py-10 sm:flex-row sm:items-center sm:justify-between sm:px-8">
          {prev ? (
            <Link
              href={`/sports/${sport.slug}/${prev.slug}`}
              className="text-sm text-white/70 transition hover:text-white"
            >
              ← {prev.name}
            </Link>
          ) : (
            <span />
          )}
          {next ? (
            <Link
              href={`/sports/${sport.slug}/${next.slug}`}
              className="text-sm font-semibold transition hover:text-white"
              style={{ color: sport.accent }}
            >
              Next: {next.name} →
            </Link>
          ) : (
            <Link
              href={`/sports/${sport.slug}`}
              className="text-sm font-semibold transition hover:text-white"
              style={{ color: sport.accent }}
            >
              Back to {sport.name} →
            </Link>
          )}
        </div>
      </section>

      <section className="border-t border-white/10 bg-black/20">
        <div className="mx-auto max-w-6xl px-5 py-10 sm:px-8">
          <p className="mb-4 text-sm text-white/55">Other {sport.name} skills</p>
          <div className="flex flex-wrap gap-2">
            {sport.skills.map((item) => (
              <Link
                key={item.slug}
                href={`/sports/${sport.slug}/${item.slug}`}
                className={`rounded-full border px-4 py-2 text-sm transition ${
                  item.slug === skill.slug
                    ? "border-transparent text-[#07110e]"
                    : "border-white/15 text-white/75 hover:border-white/40 hover:text-white"
                }`}
                style={
                  item.slug === skill.slug
                    ? { backgroundColor: sport.accent }
                    : undefined
                }
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
