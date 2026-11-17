"use client";

import React from "react";
import { Search, Coffee, Globe } from "lucide-react";
import { GithubIcon } from "@/components/BrandIcons";
import { MellowLogo } from "@/components/MellowLogo";
import { Language, DICTIONARY } from "@/data/i18n";

interface HeaderProps {
  onOpenCommandPalette: () => void;
  onOpenSponsor: () => void;
  projectCount: number;
  language: Language;
  onToggleLanguage: () => void;
  onScrollToTop?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenCommandPalette,
  onOpenSponsor,
  projectCount,
  language,
  onToggleLanguage,
  onScrollToTop,
}) => {
  const t = DICTIONARY[language].nav;

  return (
    <header className="fixed top-0 inset-x-0 z-40 w-full border-b border-white/[0.07] bg-[#07080b]/90 pt-[env(safe-area-inset-top)] backdrop-blur-xl">
      <div className="mx-auto flex h-14 sm:h-16 max-w-7xl items-center justify-between gap-2 pl-[max(0.75rem,env(safe-area-inset-left))] pr-[max(0.75rem,env(safe-area-inset-right))] sm:px-6 lg:px-8">
        {/* Brand Logo & Title (Clickable to scroll to top) */}
        <div className="flex min-w-0 items-center gap-3">
          <button
            onClick={onScrollToTop}
            className="group flex min-w-0 items-center text-left transition-opacity hover:opacity-90 active:scale-[0.98] focus:outline-none"
            title="Scroll to Top / Start"
          >
            <MellowLogo variant="compact" />
          </button>
          <span className="hidden rounded-full border border-[#C76C6A]/30 bg-[#C76C6A]/10 px-2.5 py-0.5 text-[10px] font-mono text-zinc-300 md:inline-block">
            {t.productsCount(projectCount)}
          </span>
        </div>

        {/* Navigation & Action Area */}
        <div className="flex shrink-0 items-center gap-1.5 sm:gap-3">
          {/* Command Palette Trigger */}
          <button
            onClick={onOpenCommandPalette}
            aria-label={t.searchPlaceholder}
            className="group flex h-9 sm:h-auto items-center gap-2 rounded-xl border border-white/10 bg-zinc-900/60 px-2.5 sm:px-3 py-1.5 text-xs text-zinc-400 shadow-sm transition-all hover:border-cyan-500/40 hover:bg-zinc-800/80 hover:text-white"
          >
            <Search className="h-3.5 w-3.5 text-zinc-400 group-hover:text-cyan-400" />
            <span className="hidden sm:inline">{t.searchPlaceholder}</span>
            <kbd className="hidden rounded border border-white/10 bg-zinc-800/90 px-1.5 py-0.5 text-[10px] font-mono text-zinc-300 group-hover:border-cyan-500/30 sm:inline-block">
              {t.ctrlK}
            </kbd>
          </button>

          {/* Buy Me a Coffee / Support Pill */}
          <button
            onClick={onOpenSponsor}
            aria-label={t.support}
            className="flex h-9 sm:h-auto items-center gap-1.5 rounded-xl border border-[#C76C6A]/40 bg-[#C76C6A]/15 px-2.5 sm:px-3 py-1.5 text-xs font-medium text-white shadow-glow-copper/10 transition-all hover:border-[#C76C6A] hover:bg-[#C76C6A]/25"
            title="Support Mellow Solutions on Buy Me a Coffee"
          >
            <Coffee className="h-3.5 w-3.5 text-[#C76C6A]" />
            <span className="hidden md:inline">{t.support}</span>
          </button>

          {/* GitHub Account Link */}
          <a
            href="https://github.com/Mello2110"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub Profile @Mello2110"
            className="flex h-9 sm:h-auto items-center gap-1.5 rounded-xl border border-white/10 bg-zinc-900/60 px-2.5 sm:px-3 py-1.5 text-xs font-medium text-zinc-300 transition-all hover:border-white/20 hover:bg-zinc-800 hover:text-white"
            title="GitHub Profile @Mello2110"
          >
            <GithubIcon className="h-4 w-4" />
            <span className="hidden lg:inline">{t.github}</span>
          </a>

          {/* Language Switcher [EN | DE] - Placed on the very far right */}
          <button
            onClick={onToggleLanguage}
            aria-label="Switch Language (English / Deutsch)"
            className="flex h-9 sm:h-auto items-center gap-1 sm:gap-1.5 rounded-xl border border-white/10 bg-zinc-900/60 px-2 sm:px-2.5 py-1.5 text-xs font-mono font-medium text-zinc-300 transition-colors hover:border-white/20 hover:text-white"
            title="Switch Language (English / Deutsch)"
          >
            <Globe className="h-3.5 w-3.5 text-zinc-400" />
            <span className="uppercase">{language}</span>
          </button>
        </div>
      </div>
    </header>
  );
};
