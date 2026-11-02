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
      className="relative flex min-h-[calc(100vh-4rem)] flex-col justify-between px-4 sm:px-6 lg:px-8 py-8 sm:py-12"
    >
      {/* Center Harmonized Content Block */}
      <div className="my-auto mx-auto max-w-3xl text-center flex flex-col items-center">
        {/* Clean 2D Typographic Lockup (Timeless & Minimalist) */}
        <div className="mb-6 sm:mb-8 flex justify-center">
          <MellowLogo variant="hero" size={480} />
        </div>

        {/* Cohesive Typography Block in Golden Ratio */}
        <div className="space-y-2.5 max-w-2xl px-2">
          {/* Main Headline */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight">
            {t.title}
          </h1>

          {/* Sub-headline: Solutions for Daily Struggles and Business Procedures */}
          <p className="text-base sm:text-lg font-medium text-[#C76C6A] tracking-normal">
            {t.subtitle}
          </p>

          {/* Clear, refined description */}
          <p className="text-xs sm:text-sm text-zinc-400 max-w-lg mx-auto leading-relaxed pt-0.5">
            {t.description}
          </p>
        </div>

        {/* Albert Einstein Quote Block */}
        <div className="mt-7 pt-5 border-t border-white/10 max-w-md mx-auto">
          <blockquote className="text-xs sm:text-sm italic text-zinc-300 font-serif leading-relaxed">
            {t.quote}
          </blockquote>
          <cite className="block mt-1.5 font-mono text-[10px] text-zinc-400 not-italic uppercase tracking-widest">
            &mdash; {t.quoteAuthor}
          </cite>
        </div>
      </div>

      {/* Unified Single Scroll-Down Button at the bottom of the segment */}
      <div className="mx-auto flex flex-col items-center pb-3 text-zinc-500">
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
