import type { Metadata } from "next";
import { Figtree, Syne } from "next/font/google";
import { SiteHeader } from "@/components/site-header";
import "./globals.css";

const display = Syne({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
});

const body = Figtree({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "RISE Skill Lab | Get Better at Your Sport",
  description:
    "Train the four major skills for hockey, baseball, soccer, football, lacrosse, golf, and basketball — with guides, weekly plans, and training videos.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${body.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-[family-name:var(--font-body)]">
        <SiteHeader />
        {children}
      </body>
    </html>
  );
}
