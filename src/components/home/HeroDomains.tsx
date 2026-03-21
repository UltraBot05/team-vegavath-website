"use client";

import { useState } from "react";

const DOMAINS = [
  { id: "automotive", title: "Automotives", description: "Where ideas turn into machines. We design, build, and fabricate vehicles — from simulations to hands-on assembly." },
  { id: "robotics", title: "Robotics", description: "Designing intelligence in motion. We build robots combining mechanics, electronics, and software." },
  { id: "coding", title: "Coding", description: "The backbone of everything we build. From embedded systems and automotive software to full-stack websites — we code it all." },
  { id: "design", title: "Design", description: "Human-centric product design, CAD modelling, and rapid prototyping for real-world applications." },
  { id: "media", title: "Media", description: "Telling our story to the world. Content creation, documentation, and showcasing everything Vegavath builds." },
  { id: "marketing", title: "Marketing", description: "Powering innovation through partnerships. Budgeting, sponsor relations, and industry collaborations." },
  { id: "operations", title: "Operations", description: "The engine that keeps the club running — permissions, events, members, and internal workflows." },
];

export default function HeroDomains() {
  const [active, setActive] = useState<string | null>(null);
  const activeDomain = DOMAINS.find((d) => d.id === active);

  return (
    <>
      <div className="mt-12 flex flex-wrap justify-center gap-4">
        {DOMAINS.map((domain) => (
          <button
            key={domain.id}
            onClick={() => setActive(active === domain.id ? null : domain.id)}
            className="rounded-full border border-[#EF5D08] bg-[#EF5D08] px-5 py-2 text-sm font-semibold text-white transition-all hover:scale-105 hover:bg-[#d44f06] hover:shadow-[0_0_20px_rgba(239,93,8,0.3)]"
          >
            {domain.title}
          </button>
        ))}
      </div>

      {activeDomain && (
        <div className="relative mx-auto mt-6 w-full max-w-md rounded-xl border border-[#2a2a2a] bg-[#1a1a1a] p-6 text-center shadow-xl">
          <button
            onClick={() => setActive(null)}
            className="absolute right-4 top-4 text-[#9a9a9a] hover:text-white"
          >
            ✕
          </button>
          <h3 className="text-lg font-black uppercase tracking-wide text-[#EBEBEB]">
            {activeDomain.title}
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-[#9a9a9a]">
            {activeDomain.description}
          </p>
        </div>
      )}
    </>
  );
}
