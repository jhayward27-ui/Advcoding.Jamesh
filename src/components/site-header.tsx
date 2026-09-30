import Link from "next/link";

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
        <nav className="flex items-center gap-5 text-sm text-white/75">
          <Link href="/#sports" className="transition hover:text-white">
            Sports
          </Link>
          <Link href="/#method" className="transition hover:text-white">
            Method
          </Link>
          <Link href="/project" className="transition hover:text-white">
            Project
          </Link>
        </nav>
      </div>
    </header>
  );
}
