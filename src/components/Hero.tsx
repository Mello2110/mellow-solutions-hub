"use client";

import React from "react";
import { ChevronDown, Sparkles } from "lucide-react";
import { MellowLogo } from "@/components/MellowLogo";

interface HeroProps {
  onScrollToSpotlight: () => void;
  totalProjects: number;
}

export const Hero: React.FC<HeroProps> = ({
  onScrollToSpotlight,
  totalProjects,
}) => {
  return (
    <section id="hero" className="relative flex min-h-[calc(100vh-4rem)] flex-col justify-between px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
      {/* Center Hero Content */}
      <div className="my-auto mx-auto max-w-4xl text-center">
        {/* Studio Logo */}
        <div className="flex justify-center mb-8">
          <MellowLogo variant="hero" />
        </div>

        {/* Studio Tag & Live Status Pill with subtle glow */}
        <div className="inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-[#0d0f18]/90 px-4 py-1.5 text-xs text-zinc-300 backdrop-blur-md mb-6 shadow-sm">
          <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="font-mono text-[11px] uppercase tracking-wider text-zinc-300">
            Mellow Solutions Studio
          </span>
          <span className="text-zinc-600">&bull;</span>
          <span className="font-mono text-[11px] text-[#C76C6A] font-medium">
            {totalProjects} Werkzeuge &amp; Extensions
          </span>
        </div>

        {/* Headline with tasteful accent */}
        <h1 className="text-3xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl max-w-4xl">
          Pragmatische Software, Extensions &amp;{" "}
          <span className="bg-gradient-to-r from-white via-zinc-100 to-[#C76C6A] bg-clip-text text-transparent">
            Precision Tools.
          </span>
        </h1>

        <p className="mt-5 mx-auto max-w-2xl text-sm leading-relaxed text-zinc-400 sm:text-base sm:leading-8">
          Nachhaltige Lösungen für alltägliche und komplexe Workflow-Herausforderungen.
          100% werbefrei, ohne unnötige Abhängigkeiten und mit Fokus auf
          effiziente, praxiserprobte Software-Architektur.
        </p>

        {/* Direct Action Trigger */}
        <div className="mt-9 flex justify-center">
          <button
            onClick={onScrollToSpotlight}
            className="group flex items-center gap-2 rounded-xl border border-[#C76C6A]/40 bg-[#C76C6A]/15 px-5 py-2.5 text-xs font-semibold text-white shadow-glow-copper/20 transition-all hover:border-[#C76C6A] hover:bg-[#C76C6A]/25 hover:scale-[1.02]"
          >
            <span>Zum Flaggschiff &amp; Spotlight</span>
            <ChevronDown className="h-4 w-4 text-[#C76C6A] transition-transform group-hover:translate-y-0.5" />
          </button>
        </div>
      </div>

      {/* Subtle Scroll-Down Hint at the bottom */}
      <div className="mx-auto flex flex-col items-center pb-4 text-zinc-500">
        <button
          onClick={onScrollToSpotlight}
          className="flex flex-col items-center gap-1 text-[11px] font-mono tracking-wider uppercase text-zinc-400 hover:text-white transition-colors"
        >
          <span>Flaggschiff erkunden</span>
          <ChevronDown className="h-4 w-4 animate-bounce text-[#C76C6A]" />
        </button>
      </div>
    </section>
  );
};
