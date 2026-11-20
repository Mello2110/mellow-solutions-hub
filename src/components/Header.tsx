"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, Globe, Briefcase, LayoutGrid } from "lucide-react";
import { GithubIcon } from "@/components/BrandIcons";
import { MellowLogo } from "@/components/MellowLogo";
import { Language, DICTIONARY } from "@/data/i18n";

interface HeaderProps {
  onOpenCommandPalette?: () => void;
  projectCount: number;
  language: Language;
  onToggleLanguage: () => void;
  onScrollToTop?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenCommandPalette,
  projectCount,
  language,
  onToggleLanguage,
  onScrollToTop,
}) => {
  const t = DICTIONARY[language].nav;
  const pathname = usePathname();
  const isSolutionsPage = pathname?.startsWith("/solutions");

  return (
    <header className="fixed top-0 inset-x-0 z-40 w-full border-b border-white/[0.07] bg-[#07080b]/90 pt-[env(safe-area-inset-top)] backdrop-blur-xl">
      <div className="mx-auto flex h-14 sm:h-16 max-w-7xl items-center justify-between gap-2 pl-[max(0.75rem,env(safe-area-inset-left))] pr-[max(0.75rem,env(safe-area-inset-right))] sm:px-6 lg:px-8">
        {/* Brand Logo & Primary Route Navigation */}
        <div className="flex min-w-0 items-center gap-2 sm:gap-4">
          {onScrollToTop && pathname === "/" ? (
            <button
              onClick={onScrollToTop}
              aria-label="Mellow Solutions — Scroll to top"
              className="group flex min-w-0 items-center rounded-lg text-left transition-opacity hover:opacity-90 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/70"
              title="Scroll to Top / Start"
            >
              <MellowLogo variant="compact" />
            </button>
          ) : (
            <Link
              href="/"
              aria-label="Mellow Solutions — Home"
              className="group flex min-w-0 items-center rounded-lg text-left transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/70"
            >
              <MellowLogo variant="compact" />
            </Link>
          )}

          <span className="hidden rounded-full border border-[#C76C6A]/30 bg-[#C76C6A]/10 px-2.5 py-0.5 text-[10px] font-mono tabular-nums text-zinc-300 lg:inline-block">
            {t.productsCount(projectCount)}
          </span>

          {/* Route Switcher: Hub vs. Client Solutions */}
          <nav aria-label="Primary" className="hidden md:flex items-center gap-1 border-l border-white/10 pl-3">
            <Link
              href="/"
              className={`rounded-lg px-2.5 py-1.5 text-xs font-medium transition-colors ${
                !isSolutionsPage
                  ? "bg-white/10 text-white"
                  : "text-zinc-400 hover:bg-white/5 hover:text-zinc-200"
              }`}
            >
              {t.hub}
            </Link>
            <Link
              href="/solutions"
              className={`rounded-lg px-2.5 py-1.5 text-xs font-medium transition-colors ${
                isSolutionsPage
                  ? "bg-[#C76C6A]/20 text-white border border-[#C76C6A]/40"
                  : "text-zinc-400 hover:bg-white/5 hover:text-zinc-200"
              }`}
            >
              {t.solutions}
            </Link>
          </nav>
        </div>

        {/* Navigation & Action Area */}
        <div className="flex shrink-0 items-center gap-1.5 sm:gap-2.5">
          {/* Compact Mobile Link to Client Solutions */}
          <Link
            href={isSolutionsPage ? "/" : "/solutions"}
            aria-label={isSolutionsPage ? t.hub : t.solutions}
            className={`md:hidden flex h-9 shrink-0 items-center gap-1.5 rounded-xl border px-2 text-xs font-medium transition-colors ${
              isSolutionsPage
                ? "border-white/10 bg-zinc-900/60 text-zinc-200"
                : "border-[#C76C6A]/40 bg-[#C76C6A]/15 text-zinc-100"
            }`}
          >
            {isSolutionsPage ? (
              <LayoutGrid className="h-3.5 w-3.5 text-cyan-400" />
            ) : (
              <Briefcase className="h-3.5 w-3.5 text-[#C76C6A]" />
            )}
            <span className="text-[11px]">
              {isSolutionsPage ? t.hub : language === "de" ? "Klienten" : "Clients"}
            </span>
          </Link>

          {/* Command Palette Trigger */}
          {onOpenCommandPalette && (
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
          )}

          {/* GitHub Account Link */}
          <a
            href="https://github.com/Mello2110"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub Profile @Mello2110"
            className="hidden sm:flex h-9 sm:h-auto items-center gap-1.5 rounded-xl border border-white/10 bg-zinc-900/60 px-2.5 sm:px-3 py-1.5 text-xs font-medium text-zinc-300 transition-all hover:border-white/20 hover:bg-zinc-800 hover:text-white"
            title="GitHub Profile @Mello2110"
          >
            <GithubIcon className="h-4 w-4" />
            <span className="hidden lg:inline">{t.github}</span>
          </a>

          {/* Language Switcher [EN | DE] */}
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
