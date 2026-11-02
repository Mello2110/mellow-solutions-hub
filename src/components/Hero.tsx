"use client";

import React from "react";
import { ChevronDown } from "lucide-react";
import { MellowLogo } from "@/components/MellowLogo";
import { Language, DICTIONARY } from "@/data/i18n";

interface HeroProps {
  onScrollToSpotlight: () => void;
  totalProjects: number;
  language: Language;
}

export const Hero: React.FC<HeroProps> = ({
  onScrollToSpotlight,
  totalProjects,
  language,
}) => {
  const t = DICTIONARY[language].hero;

  return (
    <section
      id="hero"
      className="relative flex min-h-[calc(100vh-4rem)] flex-col justify-between px-4 sm:px-6 lg:px-8 py-10 sm:py-14"
    >
      {/* Center Unified Content Block */}
      <div className="my-auto mx-auto max-w-3xl text-center flex flex-col items-center">
        {/* The New 3D Hero Monogram */}
        <div className="mb-7">
          <MellowLogo variant="hero" size={270} />
        </div>

        {/* Cohesive Typography Block */}
        <div className="space-y-3 max-w-2xl">
          {/* Main Headline */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white">
            {t.title}
          </h1>

          {/* Sub-headline: Solutions for Daily Struggles and Business Procedures */}
          <p className="text-base sm:text-xl font-medium text-[#C76C6A] tracking-normal">
            {t.subtitle}
          </p>

          {/* Clear, understated description */}
          <p className="text-xs sm:text-sm text-zinc-400 max-w-xl mx-auto leading-relaxed pt-1">
            {t.description}
          </p>
        </div>

        {/* Albert Einstein Quote Block */}
        <div className="mt-8 pt-6 border-t border-white/5 max-w-lg mx-auto">
          <blockquote className="text-sm sm:text-base italic text-zinc-300 font-serif leading-relaxed">
            {t.quote}
          </blockquote>
          <cite className="block mt-2 font-mono text-[11px] text-zinc-400 not-italic uppercase tracking-widest">
            &mdash; {t.quoteAuthor}
          </cite>
        </div>
      </div>

      {/* Unified Single Scroll-Down Button at the bottom of the segment */}
      <div className="mx-auto flex flex-col items-center pb-4 text-zinc-500">
        <button
          onClick={onScrollToSpotlight}
          className="group flex items-center gap-2 rounded-xl border border-white/10 bg-zinc-900/60 px-5 py-2.5 text-xs font-medium text-zinc-300 shadow-sm transition-all hover:border-white/25 hover:bg-zinc-800 hover:text-white"
        >
          <span>{t.scrollPrompt}</span>
          <ChevronDown className="h-4 w-4 text-[#C76C6A] transition-transform group-hover:translate-y-0.5" />
        </button>
      </div>
    </section>
  );
};
