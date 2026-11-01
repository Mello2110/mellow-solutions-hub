"use client";

import React from "react";
import { Search, Coffee } from "lucide-react";
import { GithubIcon } from "@/components/BrandIcons";
import { MellowLogo } from "@/components/MellowLogo";

interface HeaderProps {
  onOpenCommandPalette: () => void;
  onOpenSponsor: () => void;
  projectCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenCommandPalette,
  onOpenSponsor,
  projectCount,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-white/[0.07] bg-[#08090d]/85 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand Logo & Tag */}
        <div className="flex items-center gap-3">
          <MellowLogo variant="compact" />
          <span className="hidden rounded-full border border-brand-copper/30 bg-brand-copper/10 px-2 py-0.5 text-[10px] font-mono text-brand-copperLight md:inline-block">
            {projectCount} PRODUKTE
          </span>
        </div>

        {/* Navigation & Action Area */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Command Palette Trigger */}
          <button
            onClick={onOpenCommandPalette}
            className="group flex items-center gap-2 rounded-xl border border-white/10 bg-zinc-900/60 px-3 py-1.5 text-xs text-zinc-400 shadow-sm transition-all hover:border-cyan-500/40 hover:bg-zinc-800/80 hover:text-white"
          >
            <Search className="h-3.5 w-3.5 text-zinc-400 group-hover:text-cyan-400" />
            <span className="hidden sm:inline">Suche...</span>
            <kbd className="hidden rounded border border-white/10 bg-zinc-800/90 px-1.5 py-0.5 text-[10px] font-mono text-zinc-300 group-hover:border-cyan-500/30 sm:inline-block">
              Ctrl K
            </kbd>
          </button>

          {/* Buy Me a Coffee / Support Pill in warm Terracotta-Copper #C76C6A */}
          <button
            onClick={onOpenSponsor}
            className="flex items-center gap-1.5 rounded-xl border border-brand-copper/40 bg-brand-copper/15 px-3 py-1.5 text-xs font-medium text-brand-copperLight shadow-glow-copper/10 transition-all hover:border-brand-copper hover:bg-brand-copper/25 hover:text-white"
            title="Mellow Solutions auf Buy Me a Coffee unterstützen"
          >
            <Coffee className="h-3.5 w-3.5 text-brand-copper" />
            <span className="hidden md:inline">Support</span>
          </button>

          {/* Real GitHub Account Link */}
          <a
            href="https://github.com/Mello2110"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 rounded-xl border border-white/10 bg-zinc-900/60 px-3 py-1.5 text-xs font-medium text-zinc-300 transition-all hover:border-white/20 hover:bg-zinc-800 hover:text-white"
            title="GitHub Profil Mello2110"
          >
            <GithubIcon className="h-4 w-4" />
            <span className="hidden lg:inline">GitHub</span>
          </a>
        </div>
      </div>
    </header>
  );
};
