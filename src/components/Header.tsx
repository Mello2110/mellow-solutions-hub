"use client";

import React from "react";
import { Terminal, Search, Sparkles, ExternalLink } from "lucide-react";
import { GithubIcon } from "@/components/BrandIcons";

interface HeaderProps {
  onOpenCommandPalette: () => void;
  projectCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenCommandPalette,
  projectCount,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-white/[0.07] bg-[#08090d]/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand Logo & Live Status indicator */}
        <div className="flex items-center gap-3">
          <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500/20 via-zinc-900 to-zinc-950 p-[1px] shadow-glow-cyan/20">
            <div className="flex h-full w-full items-center justify-center rounded-[11px] bg-[#0c0d14]">
              <Terminal className="h-5 w-5 text-cyan-400" />
            </div>
            <span className="absolute -bottom-0.5 -right-0.5 flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500"></span>
            </span>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="font-semibold tracking-tight text-white sm:text-base">
                Mellow <span className="text-cyan-400">Solutions</span> Hub
              </span>
              <span className="hidden rounded-full border border-cyan-500/30 bg-cyan-500/10 px-2 py-0.5 text-[10px] font-medium tracking-wide text-cyan-300 sm:inline-block">
                PORTFOLIO
              </span>
            </div>
            <p className="text-[11px] text-zinc-400">
              {projectCount} Produkte & Utilities aktiv
            </p>
          </div>
        </div>

        {/* Center: Command Palette Trigger Button (Logitech/Antigravity style) */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenCommandPalette}
            className="group flex items-center gap-2 rounded-xl border border-white/10 bg-zinc-900/60 px-3 py-1.5 text-xs text-zinc-400 shadow-sm transition-all hover:border-cyan-500/40 hover:bg-zinc-800/80 hover:text-white"
          >
            <Search className="h-3.5 w-3.5 text-zinc-400 group-hover:text-cyan-400" />
            <span className="hidden sm:inline">Suche & Filter...</span>
            <kbd className="hidden rounded border border-white/10 bg-zinc-800/90 px-1.5 py-0.5 text-[10px] font-mono text-zinc-300 group-hover:border-cyan-500/30 sm:inline-block">
              Ctrl K
            </kbd>
          </button>

          {/* Quick Action Link / CV / Contact */}
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 rounded-xl border border-white/10 bg-zinc-900/60 px-3 py-1.5 text-xs font-medium text-zinc-300 transition-all hover:border-white/20 hover:bg-zinc-800 hover:text-white"
          >
            <GithubIcon className="h-4 w-4" />
            <span className="hidden md:inline">GitHub</span>
          </a>
        </div>
      </div>
    </header>
  );
};
