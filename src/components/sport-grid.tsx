"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
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
  const ref = useRef<HTMLAnchorElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <Link
      ref={ref}
      href={`/sports/${sport.slug}`}
      className={`group relative block min-h-56 overflow-hidden rounded-2xl transition duration-500 ease-out ${
        visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
      }`}
      style={{ transitionDelay: `${index * 60}ms` }}
    >
      <div
        className="absolute inset-0 bg-cover bg-center transition duration-700 group-hover:scale-105"
        style={{ backgroundImage: `url(${sport.image})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#07110e] via-[#07110e]/70 to-transparent" />
      <div className="absolute inset-0 ring-1 ring-inset ring-white/10 transition group-hover:ring-[color:var(--sport-accent)]/50" style={{ ["--sport-accent" as string]: sport.accent }} />
      <div className="relative flex h-full flex-col justify-end p-5">
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
