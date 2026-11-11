import type { Metadata } from "next";
import { ShowcaseDeck } from "@/components/showcase-deck";

export const metadata: Metadata = {
  title: "RISE tech showcase",
  description:
    "James Hayward's six-minute class talk on RISE Skill Lab: a live demo, the tech stack, and how the site is published.",
};

export default function ShowcasePage() {
  return <ShowcaseDeck />;
}
