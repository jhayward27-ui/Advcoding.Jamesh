import type { Metadata } from "next";
import { ShowcaseDeck } from "@/components/showcase-deck";

export const metadata: Metadata = {
  title: "RISE Skill Lab slides",
  description:
    "James Hayward's class slides for RISE Skill Lab: the sports, a live walkthrough, the stack, and how the site is hosted.",
};

export default function ShowcasePage() {
  return <ShowcaseDeck />;
}
