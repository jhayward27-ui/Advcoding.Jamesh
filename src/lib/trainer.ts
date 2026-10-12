import { getSport, sports, type Skill, type Sport } from "@/lib/sports-data";

export type TrainerContext = {
  sportSlug?: string;
  skillSlug?: string;
};

export type TrainerReply = {
  text: string;
  suggestions: string[];
  context: TrainerContext;
  href?: string;
  hrefLabel?: string;
};

const aliases: Record<string, string> = {
  lax: "lacrosse",
  "american football": "football",
  "ice hockey": "hockey",
  bball: "basketball",
  hoops: "basketball",
};

function clean(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9\s]/g, " ").replace(/\s+/g, " ").trim();
}

function findSport(text: string): Sport | undefined {
  const normalized = clean(text);
  const aliased = aliases[normalized];
  if (aliased) return sports.find((sport) => sport.slug === aliased);

  return sports.find((sport) => {
    const name = clean(sport.name);
    return normalized === name || normalized.includes(name) || normalized.includes(sport.slug);
  });
}

function skillHits(text: string, sport?: Sport) {
  const normalized = clean(text);
  const pool = sport
    ? sport.skills.map((skill) => ({ sport, skill }))
    : sports.flatMap((item) => item.skills.map((skill) => ({ sport: item, skill })));

  return pool.filter(({ skill }) => {
    const name = clean(skill.name);
    if (name.length <= 2) return normalized === name || normalized.split(" ").includes(name);
    if (normalized.includes(name)) return true;
    const words = name.split(" ").filter((word) => word.length > 3);
    return words.some((word) => normalized.includes(word));
  });
}

function skillMenu(sport: Sport) {
  return sport.skills.map((skill) => skill.name);
}

function followUps(sport: Sport, skill: Skill) {
  return ["How do I get better?", "Weekly plan", "Where's the video?", `Another ${sport.name} skill`];
}

export function trainerReply(message: string, context: TrainerContext = {}): TrainerReply {
  const text = clean(message);
  const currentSport = context.sportSlug ? getSport(context.sportSlug) : undefined;
  const mentionedSport = findSport(message) ?? currentSport;
  const hits = skillHits(message, mentionedSport);
  if (!mentionedSport && hits.length > 1) {
    const names = [...new Set(hits.map((hit) => hit.sport.name))];
    return {
      text: `A few sports have that. Which one are you talking about: ${names.join(", ")}?`,
      suggestions: names,
      context: {},
    };
  }
  const mentioned = hits[0];
  const sport = mentioned?.sport ?? mentionedSport;
  const skill =
    mentioned?.skill ??
    (sport && context.skillSlug
      ? sport.skills.find((item) => item.slug === context.skillSlug)
      : undefined);

  const nextContext: TrainerContext = {
    sportSlug: sport?.slug,
    skillSlug: skill?.slug,
  };

  if (!sport) {
    return {
      text: "What sport are you working on? I can walk you through hockey, baseball, soccer, football, lacrosse, golf, or basketball.",
      suggestions: sports.map((item) => item.name),
      context: {},
    };
  }

  const wantsPlan = /plan|week|schedule/.test(text);
  const wantsVideo = /video|watch|youtube|film/.test(text);
  const wantsWhy = /why|matter/.test(text);
  const wantsHow = /how|better|improve|practice|train|drill|help/.test(text);
  const wantsAnother = /another|different skill|switch skill|other skill/.test(text);

  if (!skill || wantsAnother) {
    return {
      text: `${sport.name} has four skills: ${sport.skills.map((item) => item.name).join(", ")}. Which one do you want to work on?`,
      suggestions: skillMenu(sport),
      context: { sportSlug: sport.slug },
    };
  }

  const page = `/sports/${sport.slug}/${skill.slug}`;

  if (wantsPlan) {
    return {
      text: `For ${sport.name} ${skill.name}, a normal week looks like this: ${skill.weeklyPlan.join(" ")} Which part of that week is hardest to fit in?`,
      suggestions: ["How do I get better?", "Where's the video?", `Another ${sport.name} skill`],
      context: nextContext,
      href: page,
      hrefLabel: `Open the ${skill.name} page`,
    };
  }

  if (wantsVideo) {
    return {
      text: `The video for this is "${skill.video.title}". Watch it, then come back and tell me which part you want to try first.`,
      suggestions: ["How do I get better?", "Weekly plan", `Another ${sport.name} skill`],
      context: nextContext,
      href: page,
      hrefLabel: `Watch it on the ${skill.name} page`,
    };
  }

  if (wantsWhy) {
    return {
      text: `${skill.whyItMatters} Want the practice steps, or the weekly plan?`,
      suggestions: ["How do I get better?", "Weekly plan", "Where's the video?"],
      context: nextContext,
      href: page,
      hrefLabel: `Open the ${skill.name} page`,
    };
  }

  if (wantsHow || text === clean(skill.name) || text === clean(sport.name)) {
    const steps = skill.howToImprove.slice(0, 3).map((step, index) => `${index + 1}. ${step}`).join(" ");
    return {
      text: `${skill.summary} ${steps} Want the weekly plan next, or the video?`,
      suggestions: ["Weekly plan", "Where's the video?", "Why does this matter?"],
      context: nextContext,
      href: page,
      hrefLabel: `Open the ${skill.name} page`,
    };
  }

  return {
    text: `We're on ${sport.name}, ${skill.name}. I can give you the practice steps, the weekly plan, or the video. What do you want?`,
    suggestions: followUps(sport, skill).slice(0, 3),
    context: nextContext,
    href: page,
    hrefLabel: `Open the ${skill.name} page`,
  };
}

export const trainerGreeting: TrainerReply = {
  text: "What sport are you trying to get better at? Ask me anything about one of the four skills, or pick a sport and I'll ask you which piece to work on.",
  suggestions: sports.map((sport) => sport.name),
  context: {},
};
