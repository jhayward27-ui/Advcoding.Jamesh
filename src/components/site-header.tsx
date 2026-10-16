import Link from "next/link";

const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function SiteHeader() {
  return (
    <header className="absolute inset-x-0 top-0 z-30">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-5 sm:px-8">
        <Link href="/" className="group flex items-baseline gap-2">
          <span className="font-[family-name:var(--font-display)] text-2xl font-bold tracking-tight text-white sm:text-3xl">
            RISE
          </span>
          <span className="hidden text-xs uppercase tracking-[0.22em] text-white/55 sm:inline">
            Skill Lab
          </span>
        </Link>
        <nav className="flex flex-wrap items-center justify-end gap-x-4 gap-y-2 text-sm text-white/75">
          <a href={`${base}/#sports`} className="transition hover:text-white">
            Sports
          </a>
          <a href={`${base}/#method`} className="transition hover:text-white">
            Method
          </a>
          <a href={`${base}/#trainer`} className="transition hover:text-white">
            Trainer
          </a>
          <Link href="/dashboard" className="transition hover:text-white">
            Dashboard
          </Link>
          <Link href="/project" className="transition hover:text-white">
            Project
          </Link>
        </nav>
      </div>
    </header>
  );
}
