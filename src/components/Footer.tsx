import React from "react";
import { Terminal, Shield, Heart } from "lucide-react";

export const Footer: React.FC = () => {
  return (
    <footer className="mt-20 border-t border-white/5 bg-[#08090d]/90 py-12 text-zinc-500 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-zinc-900 border border-white/10 text-cyan-400">
              <Terminal className="h-4 w-4" />
            </div>
            <span className="text-xs font-semibold text-zinc-300">
              Mellow Solutions Hub
            </span>
            <span className="text-zinc-600">|</span>
            <span className="text-[11px] text-zinc-500">
              Portfolio & Engineering Showcase
            </span>
          </div>

          <div className="text-center text-xs sm:text-right">
            <p className="text-zinc-400">
              Next.js 15 App Router &bull; TypeScript &bull; Tailwind CSS &bull; Zod Data Layer
            </p>
            <p className="mt-1 text-[11px] text-zinc-600">
              Design inspiriert von Google Antigravity & Logitech G/MX
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
