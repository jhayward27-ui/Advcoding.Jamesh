"use client";

import Link from "next/link";
import { useState } from "react";
import { trainerGreeting, trainerReply, type TrainerContext } from "@/lib/trainer";

type ChatMessage = {
  id: number;
  from: "you" | "trainer";
  text: string;
  suggestions?: string[];
  href?: string;
  hrefLabel?: string;
};

const first: ChatMessage = {
  id: 1,
  from: "trainer",
  text: trainerGreeting.text,
  suggestions: trainerGreeting.suggestions,
};

export function TrainerChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([first]);
  const [context, setContext] = useState<TrainerContext>({});
  const [draft, setDraft] = useState("");

  function send(raw: string) {
    const text = raw.trim();
    if (!text) return;
    const reply = trainerReply(text, context);
    setContext(reply.context);
    setDraft("");
    setMessages((current) => {
      const nextId = current.length + 1;
      return [
        ...current.map((message) => ({ ...message, suggestions: undefined })),
        { id: nextId, from: "you", text },
        {
          id: nextId + 1,
          from: "trainer",
          text: reply.text,
          suggestions: reply.suggestions,
          href: reply.href,
          hrefLabel: reply.hrefLabel,
        },
      ];
    });
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#0c1613]">
      <div className="border-b border-white/10 px-4 py-3 text-sm text-white/60">
        Trainer
      </div>
      <div className="flex max-h-[32rem] flex-col gap-4 overflow-y-auto px-4 py-5 sm:px-5">
        {messages.map((message) => (
          <div
            key={message.id}
            className={message.from === "you" ? "ml-auto max-w-[85%]" : "mr-auto max-w-[90%]"}
          >
            <p
              className={
                message.from === "you"
                  ? "rounded-2xl bg-[#9dffb0] px-4 py-2.5 text-sm leading-relaxed text-[#07110e]"
                  : "text-sm leading-relaxed text-white/85"
              }
            >
              {message.text}
            </p>
            {message.href && message.hrefLabel ? (
              <Link
                href={message.href}
                className="mt-2 inline-block text-sm text-[#9dffb0] underline decoration-white/20 underline-offset-4 hover:text-white"
              >
                {message.hrefLabel}
              </Link>
            ) : null}
            {message.suggestions ? (
              <div className="mt-3 flex flex-wrap gap-2">
                {message.suggestions.map((suggestion) => (
                  <button
                    key={suggestion}
                    type="button"
                    onClick={() => send(suggestion)}
                    className="rounded-full border border-white/15 px-3 py-1.5 text-left text-sm text-white/80 transition hover:border-white/40 hover:text-white"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            ) : null}
          </div>
        ))}
      </div>
      <form
        className="flex gap-2 border-t border-white/10 p-3"
        onSubmit={(event) => {
          event.preventDefault();
          send(draft);
        }}
      >
        <label className="sr-only" htmlFor="trainer-message">
          Message the trainer
        </label>
        <input
          id="trainer-message"
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          placeholder="Ask about a sport or a skill"
          className="min-w-0 flex-1 rounded-full border border-white/15 bg-transparent px-4 py-2.5 text-sm text-white outline-none placeholder:text-white/35 focus:border-white/40"
        />
        <button
          type="submit"
          className="rounded-full bg-[#9dffb0] px-4 py-2.5 text-sm font-semibold text-[#07110e] transition hover:bg-white"
        >
          Send
        </button>
      </form>
    </div>
  );
}
