import Link from "next/link";
import { notFound } from "next/navigation";
import { getSport, sports } from "@/lib/sports-data";

export function generateStaticParams() {
  return sports.map((sport) => ({ sport: sport.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ sport: string }>;
}) {
  const { sport: sportSlug } = await params;
  const sport = getSport(sportSlug);
  if (!sport) return { title: "Sport not found" };
  return {
    title: `${sport.name} Skills | RISE Skill Lab`,
    description: sport.description,
  };
}

export default async function SportPage({
  params,
}: {
  params: Promise<{ sport: string }>;
}) {
  const { sport: sportSlug } = await params;
  const sport = getSport(sportSlug);
  if (!sport) notFound();

  return (
    <main className="flex-1">
      <section className="relative min-h-[70svh] overflow-hidden">
        <div
          className="animate-hero-zoom absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${sport.image})` }}
        />
        <div className="absolute inset-0 bg-[#07110e]/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#07110e] via-[#07110e]/55 to-transparent" />
        <div className="relative mx-auto flex min-h-[70svh] max-w-6xl flex-col justify-end px-5 pb-14 pt-28 sm:px-8">
          <Link
            href="/#sports"
            className="animate-rise mb-6 w-fit text-sm text-white/65 transition hover:text-white"
          >
            ← All sports
          </Link>
          <p
            className="animate-rise text-xs uppercase tracking-[0.22em]"
            style={{ color: sport.accent }}
          >
            {sport.name}
          </p>
          <h1 className="animate-rise-delay mt-3 font-[family-name:var(--font-display)] text-5xl font-extrabold tracking-tight text-white sm:text-6xl md:text-7xl">
            RISE
          </h1>
          <p className="animate-rise-delay mt-2 max-w-2xl text-xl text-white/90 sm:text-2xl">
            {sport.tagline}
          </p>
          <p className="animate-rise-delay-2 mt-4 max-w-2xl text-base leading-relaxed text-white/70">
            {sport.description}
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
        <div className="mb-8 max-w-2xl">
          <p className="text-xs uppercase tracking-[0.22em] text-white/45">
            Four skills
          </p>
          <h2 className="mt-2 font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Click a skill to open its guide and video
          </h2>
          <p className="mt-3 text-white/65">
            Each skill page has why it matters, how to improve, a weekly plan, and
            a training video.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {sport.skills.map((skill, index) => (
            <Link
              key={skill.slug}
              href={`/sports/${sport.slug}/${skill.slug}`}
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition hover:border-white/25 hover:bg-white/[0.06]"
            >
              <div className="flex items-start justify-between gap-4">
                <span
                  className="text-xs font-semibold uppercase tracking-[0.18em]"
                  style={{ color: sport.accent }}
                >
                  Skill {String(index + 1).padStart(2, "0")}
                </span>
                <span className="text-sm text-white/40 transition group-hover:text-white">
                  Open →
                </span>
              </div>
              <h3 className="mt-4 font-[family-name:var(--font-display)] text-2xl font-semibold tracking-tight text-white">
                {skill.name}
              </h3>
              <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-white/65">
                {skill.summary}
              </p>
              <span
                className="mt-5 inline-flex text-sm font-semibold transition group-hover:translate-x-0.5"
                style={{ color: sport.accent }}
              >
                Watch video & guide
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="border-t border-white/10 bg-black/20">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-5 py-12 sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <p className="text-white/70">Ready for another sport?</p>
          <div className="flex flex-wrap gap-2">
            {sports
              .filter((item) => item.slug !== sport.slug)
              .map((item) => (
                <Link
                  key={item.slug}
                  href={`/sports/${item.slug}`}
                  className="rounded-full border border-white/15 px-4 py-2 text-sm text-white/75 transition hover:border-white/40 hover:text-white"
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
