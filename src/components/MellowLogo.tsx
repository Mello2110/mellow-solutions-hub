import React from "react";

interface MellowLogoProps {
  variant?: "compact" | "full" | "hero";
  className?: string;
  size?: number;
}

export const MellowLogo: React.FC<MellowLogoProps> = ({
  variant = "compact",
  className = "",
  size,
}) => {
  const iconSize = size || (variant === "hero" ? 56 : variant === "compact" ? 36 : 40);

  return (
    <div className={`flex items-center gap-3.5 ${className}`}>
      {/* Adult, Minimalist, Architectural "M S" Monogram */}
      <div
        className="relative shrink-0 flex items-center justify-center rounded-xl border border-white/10 bg-[#0d0e14] transition-colors hover:border-white/20"
        style={{ width: iconSize, height: iconSize }}
      >
        <svg
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="h-3/5 w-3/5"
        >
          {/* Architectural Minimalist "M" */}
          <path
            d="M8 27V13L15 22L22 13V27"
            stroke="#f4f4f6"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Architectural Minimalist "S" in understated Warm Copper #C76C6A */}
          <path
            d="M32 15C32 13.5 30.5 13 28.5 13C26.5 13 25 14 25 16C25 19 32 19.5 32 23.5C32 26 30 27 28 27C25.5 27 24.5 25.5 24.5 24"
            stroke="#C76C6A"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Single Precision Micro-Dot */}
          <circle cx="32" cy="27" r="1.2" fill="#00f0ff" />
        </svg>

        {/* Status dot in compact header mode */}
        {variant === "compact" && (
          <span className="absolute -bottom-0.5 -right-0.5 flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
          </span>
        )}
      </div>

      {/* Typography: Swiss/Modernist Inter, No Playfulness */}
      <div className="flex flex-col text-left">
        <span
          className={`font-semibold tracking-[0.22em] text-zinc-100 uppercase ${
            variant === "hero" ? "text-sm sm:text-base" : "text-xs tracking-[0.20em]"
          }`}
        >
          Mellow Solutions
        </span>
        {variant === "hero" && (
          <span className="font-mono text-[10px] tracking-[0.16em] text-zinc-400 uppercase mt-0.5">
            Engineering &bull; Software Lab
          </span>
        )}
      </div>
    </div>
  );
};
