"use client";

import { useEffect, useRef, useState } from "react";
import type { Skill } from "@/lib/sports-data";
import { VideoEmbed } from "@/components/video-embed";

export function SkillSections({
  skills,
  accent,
  sportSlug,
}: {
  skills: Skill[];
  accent: string;
  sportSlug: string;
}) {
  return (
    <div className="space-y-16">
      {skills.map((skill, index) => (
        <SkillBlock
          key={skill.slug}
          skill={skill}
          accent={accent}
          index={index}
          anchorId={`${sportSlug}-${skill.slug}`}
        />
      ))}
    </div>
  );
}

function SkillBlock({
  skill,
  accent,
  index,
  anchorId,
}: {
  skill: Skill;
  accent: string;
  index: number;
  anchorId: string;
}) {
  const ref = useRef<HTMLElement>(null);
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
      { threshold: 0.12 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id={anchorId}
      ref={ref}
      className={`scroll-mt-24 transition duration-700 ease-out ${
        visible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
      }`}
    >
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.22em] text-white/45">
            Skill {String(index + 1).padStart(2, "0")}
          </p>
          <h2 className="mt-2 font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            {skill.name}
          </h2>
        </div>
        <span
          className="rounded-full px-3 py-1 text-xs font-medium uppercase tracking-[0.16em] text-[#07110e]"
          style={{ backgroundColor: accent }}
        >
          Train this
        </span>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
        <div className="space-y-6">
          <p className="text-lg leading-relaxed text-white/80">{skill.summary}</p>
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-white/50">
              Why it matters
            </h3>
            <p className="mt-3 leading-relaxed text-white/75">{skill.whyItMatters}</p>
          </div>
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-white/50">
              How to improve
            </h3>
            <ol className="mt-3 space-y-3">
              {skill.howToImprove.map((step, stepIndex) => (
                <li key={step} className="flex gap-3 text-white/80">
                  <span
                    className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-semibold text-[#07110e]"
                    style={{ backgroundColor: accent }}
                  >
                    {stepIndex + 1}
                  </span>
                  <span className="leading-relaxed">{step}</span>
                </li>
              ))}
            </ol>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
            <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-white/50">
              Weekly plan
            </h3>
            <ul className="mt-3 space-y-2">
              {skill.weeklyPlan.map((item) => (
                <li key={item} className="flex gap-2 text-sm text-white/75">
                  <span style={{ color: accent }}>▸</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <VideoEmbed
          youtubeId={skill.video.youtubeId}
          title={skill.video.title}
        />
      </div>
    </section>
  );
}
