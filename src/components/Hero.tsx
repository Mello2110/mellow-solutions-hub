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
    <section id="hero" className="relative flex min-h-[calc(100vh-4rem)] flex-col justify-between px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
      {/* Center Hero Content */}
      <div className="my-auto mx-auto max-w-4xl text-center">
        {/* Studio Logo */}
        <div className="flex justify-center mb-8">
          <MellowLogo variant="hero" />
        </div>

        {/* Motto Pill */}
        <div className="inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-[#0d0f18]/90 px-4 py-1.5 text-xs text-zinc-300 backdrop-blur-md mb-6 shadow-sm">
          <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="font-mono text-[11px] uppercase tracking-wider text-zinc-300">
            {t.studioTag}
          </span>
          <span className="text-zinc-600">&bull;</span>
          <span className="font-mono text-[11px] text-[#C76C6A] font-medium">
            {t.activeProjects(totalProjects)}
          </span>
        </div>

        {/* Main Title */}
        <h1 className="text-3xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl max-w-4xl">
          {t.titleStart}
          <span className="bg-gradient-to-r from-white via-zinc-100 to-[#C76C6A] bg-clip-text text-transparent">
            {t.titleHighlight}
          </span>
        </h1>

        {/* Albert Einstein Quote */}
        <div className="mt-7 mx-auto max-w-2xl">
          <blockquote className="text-sm sm:text-base italic text-zinc-300 font-serif leading-relaxed">
            {t.quote}
          </blockquote>
          <cite className="block mt-2 font-mono text-xs text-zinc-500 not-italic uppercase tracking-wider">
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
