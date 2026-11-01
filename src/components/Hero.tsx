"use client";

import React from "react";
import { ChevronDown } from "lucide-react";
import { MellowLogo } from "@/components/MellowLogo";

interface HeroProps {
  onScrollToExplore: () => void;
  totalProjects: number;
}

export const Hero: React.FC<HeroProps> = ({
  onScrollToExplore,
  totalProjects,
}) => {
  return (
    <section className="relative flex min-h-[calc(100vh-4rem)] flex-col justify-between px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
      {/* Center Hero Content */}
      <div className="my-auto mx-auto max-w-4xl text-center">
        {/* Centered Clean Monogram */}
        <div className="flex justify-center mb-8">
          <MellowLogo variant="hero" />
        </div>

        {/* Muted Sub-Badge */}
        <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.02] px-3.5 py-1 text-xs text-zinc-400 mb-6">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
          <span className="font-mono text-[11px] uppercase tracking-wider">
            Portfolio &bull; {totalProjects} Aktive Projekte
          </span>
        </div>

        {/* Headline: Clean, Mature, No Rainbow Gradients */}
        <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
          Pragmatische Software &amp;{" "}
          <span className="text-[#C76C6A]">
            Precision Tools.
          </span>
        </h1>

        <p className="mt-5 mx-auto max-w-2xl text-sm leading-relaxed text-zinc-400 sm:text-base sm:leading-8">
          Funktionale Chrome-Extensions, reaktive Webapplikationen und leichtgewichtige
          Utilities. Entwickelt mit Fokus auf saubere Architektur, messbaren Nutzen und
          vollständige Werbefreiheit.
        </p>

        {/* Direct Action Trigger */}
        <div className="mt-8 flex justify-center">
          <button
            onClick={onScrollToExplore}
            className="group flex items-center gap-2 rounded-xl border border-white/10 bg-zinc-900/60 px-5 py-2.5 text-xs font-medium text-zinc-300 transition-all hover:border-white/25 hover:bg-zinc-800 hover:text-white"
          >
            <span>Projekt-Katalog erkunden</span>
            <ChevronDown className="h-4 w-4 text-zinc-400 transition-transform group-hover:translate-y-0.5" />
          </button>
        </div>
      </div>

      {/* Subtle Scroll-Down Hint at the bottom */}
      <div className="mx-auto flex flex-col items-center pb-2 text-zinc-600">
        <button
          onClick={onScrollToExplore}
          className="flex flex-col items-center gap-1.5 text-[11px] font-mono tracking-wider uppercase text-zinc-500 hover:text-zinc-300 transition-colors"
        >
          <span>Scrollen</span>
          <ChevronDown className="h-4 w-4 animate-bounce text-zinc-500" />
        </button>
      </div>
    </section>
  );
};
