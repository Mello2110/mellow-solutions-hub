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
      <div className="my-auto mx-auto max-w-4xl text-center flex flex-col items-center px-4">
        {/* Clean 2D Typographic Lockup (Timeless & Minimalist) */}
        <div className="mb-7 sm:mb-9 flex justify-center">
          <MellowLogo variant="hero" size={440} />
        </div>

        {/* Unified Statement & Description Block */}
        <div className="space-y-3 max-w-3xl mx-auto">
          {/* Core Focus Proposition: Single line on sm+ screens */}
          <h1 className="text-base sm:text-lg md:text-xl lg:text-[23px] font-semibold tracking-tight text-white whitespace-normal sm:whitespace-nowrap leading-snug">
            {t.subtitle}
          </h1>

          {/* Integrated Purpose & Scope Paragraph */}
          <p className="text-xs sm:text-sm lg:text-[14px] text-zinc-400 max-w-xl mx-auto leading-relaxed">
            <span className="text-[#C76C6A] font-medium">{t.title} &mdash; </span>
            {t.description}
          </p>
        </div>

        {/* Albert Einstein Guiding Philosophy Block */}
        <div className="mt-8 sm:mt-9 pt-6 border-t border-white/[0.08] max-w-sm mx-auto">
          <blockquote className="text-xs sm:text-sm italic text-zinc-300 font-serif leading-relaxed">
            {t.quote}
          </blockquote>
          <cite className="block mt-2 font-mono text-[10px] text-[#C76C6A] not-italic uppercase tracking-widest">
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
