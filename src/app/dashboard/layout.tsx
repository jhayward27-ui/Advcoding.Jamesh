import type { ReactNode } from "react";
import { DashboardNav } from "@/components/dashboard-nav";
import { DashboardProvider } from "@/components/dashboard-store";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <DashboardProvider>
      <main className="flex-1">
        <div className="mx-auto max-w-5xl px-5 pb-20 pt-28 sm:px-8 sm:pt-32">
          <DashboardNav />
          {children}
        </div>
      </main>
    </DashboardProvider>
  );
}
