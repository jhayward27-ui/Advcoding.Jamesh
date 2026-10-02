import type { Metadata } from "next";
import Link from "next/link";
import { sports } from "@/lib/sports-data";

export const metadata: Metadata = {
  title: "About RISE Skill Lab",
  description:
    "James Hayward's class walkthrough of RISE Skill Lab, with screenshots of the home page, sport pages, and skill pages.",
};

const shots = "/class";

function shot(file: string) {
  const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  return `${base}${shots}/${file}`;
}

function Figure({
  file,
  alt,
  caption,
}: {
  file: string;
  alt: string;
  caption: string;
}) {
  return (
    <figure className="my-6">
      <img
        src={shot(file)}
        alt={alt}
        className="w-full rounded-md border border-white/10"
      />
      <figcaption className="mt-2 text-sm text-white/45">{caption}</figcaption>
    </figure>
  );
}

export default function ProjectPage() {
  return (
    <main className="flex-1">
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Noto+Sans:wght@500&display=swap&text=%CA%80%C9%AA%EA%9C%B1%E1%B4%87"
      />
      <article className="mx-auto max-w-4xl px-5 pb-24 pt-28 sm:px-8 sm:pt-32">
        <h1
          className="text-4xl leading-tight text-white sm:text-6xl"
          style={{ fontFamily: '"Noto Sans", sans-serif', fontWeight: 500 }}
        >
          ʀɪꜱᴇ
        </h1>
        <p className="mt-4 text-sm text-white/50">
          James Hayward · walkthrough for class
        </p>

        <p className="mt-8 text-lg leading-relaxed text-white/85">
          I built a site called RISE Skill Lab. You pick a sport, then one of
          four skills, and that page tells you how to work on it and plays a
          video. Below is what the pages actually look like, so you can follow
          it without clicking around first.
        </p>
        <p className="mt-4 leading-relaxed text-white/70">
          I stuck to four skills per sport because a huge drill list is easy to
          skip. Four things is enough to know what to practice this week.
        </p>

        <h2 className="mt-14 text-2xl font-semibold text-white">
          Opening screen
        </h2>
        <p className="mt-3 leading-relaxed text-white/75">
          This is the first thing you see. The big word is RISE. Under it I
          say the site is about getting better through four skills, and I list
          the sports: hockey, baseball, soccer, football, lacrosse, golf, and
          basketball. The green button, Choose your sport, jumps down the
          page. How RISE works is a short note on why the site is set up this
          way.
        </p>
        <Figure
          file="home.jpg"
          alt="Home page with the RISE title, a short description, and buttons for choosing a sport or reading how the site works"
          caption="Home page, top of the screen."
        />

        <h2 className="mt-14 text-2xl font-semibold text-white">
          Picking a sport
        </h2>
        <p className="mt-3 leading-relaxed text-white/75">
          Scroll a little and the seven sports are tiles with photos. Each one
          says 4 skills. Click the tile and you leave the home page.
        </p>
        <Figure
          file="sports.jpg"
          alt="Grid of seven sport tiles: hockey, baseball, soccer, football, lacrosse, golf, and basketball"
          caption="The sport picker."
        />
        <p className="text-sm leading-relaxed text-white/60">
          {sports.map((sport, index) => (
            <span key={sport.slug}>
              {index > 0 ? " · " : null}
              <Link href={`/sports/${sport.slug}`} className="text-white/80 underline decoration-white/20 underline-offset-2 hover:text-white">
                {sport.name}
              </Link>
            </span>
          ))}
        </p>

        <h2 className="mt-14 text-2xl font-semibold text-white">
          Inside a sport
        </h2>
        <p className="mt-3 leading-relaxed text-white/75">
          Hockey is the example I would show first. This screen is only the
          menu. Four boxes: Skating, Strength and Athleticism, Puck Skills, and
          IQ. The video is on the next page, after you pick one. I did it that
          way so you choose a skill instead of scrolling past every video at
          once.
        </p>
        <Figure
          file="hockey.jpg"
          alt="Hockey page with four skill cards: Skating, Strength and Athleticism, Puck Skills, and IQ"
          caption="Hockey, after you click the tile."
        />
        <p className="mt-3 leading-relaxed text-white/75">
          Basketball uses the same layout. The four skills there are Ball
          Skills, Athleticism, IQ, and Off Ball Movement. The link color
          changes with the sport so you can tell where you are. Hockey links
          are blue. Basketball links are orange.
        </p>
        <Figure
          file="basketball.jpg"
          alt="Basketball page with four skill cards: Ball Skills, Athleticism, IQ, and Off Ball Movement"
          caption="Basketball, same kind of page, different skills."
        />

        <h2 className="mt-14 text-2xl font-semibold text-white">
          What you get when you click a skill
        </h2>
        <p className="mt-3 leading-relaxed text-white/75">
          This is hockey skating. On the left I wrote how to improve, numbered
          1 to 4, and a weekly plan under that. On the right is the training
          video, Edge Work Drills. Every skill page is built like this: words
          on one side, video on the other. On a phone the video drops under the
          writing.
        </p>
        <Figure
          file="skating.jpg"
          alt="Skating skill page with four practice steps, a weekly plan, and a YouTube video of edge work drills"
          caption="Skating. Steps and weekly plan on the left, video on the right."
        />
        <p className="mt-3 leading-relaxed text-white/75">
          Golf swing mechanics is here so you can see it works for an
          individual sport too. Same pieces: setup tips, a weekly plan, and a
          video on how to swing. Under the video there is a link to the next
          golf skill, Ball Striking, so you can keep going without going back
          to the menu.
        </p>
        <Figure
          file="golf.jpg"
          alt="Golf swing mechanics page with practice steps, a weekly plan, and a video about swinging a golf club"
          caption="Golf swing mechanics. Same page shape as skating."
        />

        <h2 className="mt-14 text-2xl font-semibold text-white">
          Where to open it
        </h2>
        <p className="mt-3 leading-relaxed text-white/75">
          The live site is the link below. The code sits in my GitHub repo,
          and GitHub Pages is what puts these pages on the internet so you can
          open them in a browser.
        </p>
        <p className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-white">
          <Link href="/" className="underline decoration-white/30 underline-offset-4">
            Open the training site
          </Link>
          <a
            href="https://github.com/jhayward27-ui/Advcoding.Jamesh"
            className="underline decoration-white/30 underline-offset-4"
          >
            GitHub repo
          </a>
        </p>
      </article>
    </main>
  );
}
