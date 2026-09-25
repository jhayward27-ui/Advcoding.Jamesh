import Link from "next/link";
import type { Sport } from "@/lib/sports-data";

export function SportGrid({ sports }: { sports: Sport[] }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {sports.map((sport, index) => (
        <SportTile key={sport.slug} sport={sport} index={index} />
      ))}
    </div>
  );
}

function SportTile({ sport, index }: { sport: Sport; index: number }) {
  return (
    <Link
      href={`/sports/${sport.slug}`}
      className="group relative block min-h-56 overflow-hidden rounded-2xl border border-white/10 bg-[#0d1a16] transition hover:-translate-y-1 hover:border-white/25"
    >
      <div
        className="absolute inset-0 bg-cover bg-center transition duration-700 group-hover:scale-105"
        style={{ backgroundImage: `url(${sport.image})` }}
        aria-hidden
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#07110e] via-[#07110e]/75 to-[#07110e]/25" />
      <div
        className="absolute inset-0 ring-1 ring-inset ring-white/10 transition group-hover:ring-2"
        style={{ ["--tw-ring-color" as string]: sport.accent }}
      />
      <div className="relative flex min-h-56 flex-col justify-end p-5">
        <span
          className="mb-2 h-1 w-10 rounded-full"
          style={{ backgroundColor: sport.accent }}
        />
        <h3 className="font-[family-name:var(--font-display)] text-2xl font-semibold tracking-tight text-white">
          {sport.name}
        </h3>
        <p className="mt-1 line-clamp-2 text-sm text-white/70">{sport.tagline}</p>
        <span className="mt-4 text-xs uppercase tracking-[0.18em] text-white/55 transition group-hover:text-white">
          4 skills →
        </span>
      </div>
    </Link>
  );
}
