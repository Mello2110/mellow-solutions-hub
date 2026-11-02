import React from "react";
import Image from "next/image";
import { Coffee, Sparkles } from "lucide-react";
import { GithubIcon } from "@/components/BrandIcons";
import { Language, DICTIONARY } from "@/data/i18n";

interface FooterProps {
  onOpenSponsor: () => void;
  language: Language;
}

export const Footer: React.FC<FooterProps> = ({ onOpenSponsor, language }) => {
  const t = DICTIONARY[language].footer;

  return (
    <footer className="border-t border-white/5 bg-[#07080b] py-14 text-zinc-500 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Transparent About & Portfolio Notice / Disclaimer Card */}
        <div className="mb-12 rounded-2xl border border-white/[0.07] bg-[#090b12]/80 p-6 sm:p-8 backdrop-blur-sm">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
            <div className="md:col-span-4">
              <div className="flex items-center gap-2 font-mono text-[10px] tracking-widest text-[#C76C6A] uppercase font-semibold">
                <Sparkles className="h-3 w-3 text-[#C76C6A]" />
                <span>{t.disclaimerBadge}</span>
              </div>
              <h4 className="mt-2 text-base font-semibold text-zinc-100 tracking-tight">
                {t.disclaimerTitle}
              </h4>
            </div>
            <div className="md:col-span-8 space-y-2.5 text-xs text-zinc-400 leading-relaxed">
              <p>{t.disclaimerP1}</p>
              <p className="text-zinc-500 border-t border-white/5 pt-2.5">
                {t.disclaimerP2}
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Logo, Socials, Technical Credits */}
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
          {/* Logo & Vision with MellowSolutionsLogoWeißOBG_tight */}
          <div className="flex items-center gap-3.5">
            <div className="relative shrink-0 flex items-center justify-center">
              <Image
                src="/assets/MellowSolutionsLogoWeißOBG_tight.png"
                alt="Mellow Solutions"
                width={48}
                height={24}
                className="h-6 w-auto object-contain opacity-85 transition-opacity hover:opacity-100"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-[12px] font-semibold tracking-[0.24em] text-zinc-200 uppercase">
                Mellow Solutions
              </span>
              <p
                className="text-[10px] text-zinc-500"
                dangerouslySetInnerHTML={{ __html: t.tagline }}
              />
            </div>
          </div>

          {/* Center: Support Button & GitHub */}
          <div className="flex items-center gap-3">
            <button
              onClick={onOpenSponsor}
              className="flex items-center gap-1.5 rounded-xl border border-[#C76C6A]/40 bg-[#C76C6A]/15 px-3 py-1.5 text-xs font-medium text-white transition-all hover:bg-[#C76C6A]/25 shadow-sm"
            >
              <Coffee className="h-3.5 w-3.5 text-[#C76C6A]" />
              <span>{t.supportBtn}</span>
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
              Pragmatic Engineering &bull; Mellow Solutions Hub
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
