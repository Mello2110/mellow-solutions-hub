import React from "react";
import { Coffee, Heart } from "lucide-react";
import { GithubIcon } from "@/components/BrandIcons";
import { MellowLogo } from "@/components/MellowLogo";

interface FooterProps {
  onOpenSponsor: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenSponsor }) => {
  return (
    <footer className="mt-24 border-t border-white/5 bg-[#08090d]/90 py-12 text-zinc-500 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
          {/* Logo & Vision */}
          <div className="flex flex-col items-center sm:items-start gap-2">
            <MellowLogo variant="full" />
            <p className="text-[11px] text-zinc-400 mt-1">
              Nachhaltige, funktionale Software &bull; 100% werbefrei
            </p>
          </div>

          {/* Center: Support Button */}
          <div className="flex items-center gap-3">
            <button
              onClick={onOpenSponsor}
              className="flex items-center gap-1.5 rounded-xl border border-brand-copper/40 bg-brand-copper/15 px-3 py-1.5 text-xs font-medium text-brand-copperLight transition-all hover:bg-brand-copper/25 hover:text-white shadow-glow-copper/10"
            >
              <Coffee className="h-3.5 w-3.5 text-brand-copper" />
              <span>Kaffee spendieren</span>
            </button>

            <a
              href="https://github.com/Mello2110"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 rounded-xl border border-white/10 bg-zinc-900/60 px-3 py-1.5 text-xs text-zinc-300 transition-colors hover:border-white/20 hover:text-white"
            >
              <GithubIcon className="h-3.5 w-3.5" />
              <span>@Mello2110</span>
            </a>
          </div>

          {/* Right: Technical Notes */}
          <div className="text-center text-xs sm:text-right">
            <p className="text-zinc-400">
              Next.js 15 &bull; TypeScript &bull; Tailwind CSS
            </p>
            <p className="mt-1 text-[11px] text-zinc-400">
              Pragmatic Engineering &bull; Mellow Solutions
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
