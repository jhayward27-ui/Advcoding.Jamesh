"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/dashboard", label: "Overview" },
  { href: "/dashboard/sprint", label: "Sprint" },
  { href: "/dashboard/lift", label: "Lift" },
  { href: "/dashboard/practice", label: "Practice" },
  { href: "/dashboard/sport", label: "Sport stats" },
];

function normalize(path: string) {
  if (path.length > 1 && path.endsWith("/")) return path.slice(0, -1);
  return path;
}

export function DashboardNav() {
  const pathname = normalize(usePathname());

  return (
    <nav className="mb-8 flex flex-wrap gap-2" aria-label="Dashboard sections">
      {links.map((link) => {
        const active = pathname === link.href;
        return (
          <Link
            key={link.href}
            href={link.href}
            className={
              active
                ? "rounded-full bg-[#9dffb0] px-3 py-1.5 text-sm font-semibold text-[#07110e]"
                : "rounded-full border border-white/15 px-3 py-1.5 text-sm text-white/75 transition hover:border-white/40 hover:text-white"
            }
            aria-current={active ? "page" : undefined}
          >
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}
