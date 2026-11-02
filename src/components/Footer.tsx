import React from "react";
import Image from "next/image";
import { Coffee } from "lucide-react";
import { GithubIcon } from "@/components/BrandIcons";

interface FooterProps {
  onOpenSponsor: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenSponsor }) => {
  return (
    <footer className="border-t border-white/5 bg-[#07080b] py-12 text-zinc-500 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
          {/* Logo & Vision with MellowSolutionsLogoDunkel */}
          <div className="flex items-center gap-3.5">
            <div className="relative h-9 w-9 shrink-0 overflow-hidden rounded-xl border border-white/10 bg-[#090b10]">
              <Image
                src="/assets/MellowSolutionsAppIcon.png"
                alt="Mellow Solutions"
                width={36}
                height={36}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-[12px] font-semibold tracking-[0.24em] text-zinc-200 uppercase">
                Mellow Solutions
              </span>
              <p className="text-[10px] text-zinc-500">
                Crafted with Love &bull; 100% Ad-Free &bull; Zero Tracking
              </p>
            </div>
          </div>

          {/* Center: Support Button */}
          <div className="flex items-center gap-3">
            <button
              onClick={onOpenSponsor}
              className="flex items-center gap-1.5 rounded-xl border border-[#C76C6A]/40 bg-[#C76C6A]/15 px-3 py-1.5 text-xs font-medium text-white transition-all hover:bg-[#C76C6A]/25 shadow-sm"
            >
              <Coffee className="h-3.5 w-3.5 text-[#C76C6A]" />
              <span>Buy Me a Coffee</span>
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
            <p className="mt-1 text-[11px] text-zinc-600">
              Pragmatic Engineering &bull; Mellow Solutions
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
