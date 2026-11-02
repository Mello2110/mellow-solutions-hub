import React from "react";
import Image from "next/image";

interface MellowLogoProps {
  variant?: "compact" | "full" | "hero" | "appIcon" | "dark";
  className?: string;
  size?: number;
}

export const MellowLogo: React.FC<MellowLogoProps> = ({
  variant = "compact",
  className = "",
  size,
}) => {
  // Hero Variant: MellowSolutionsHero (transparent 3D monogram)
  if (variant === "hero") {
    const width = size || 310;
    const height = Math.round(width * (165 / 324));

    return (
      <div className={`relative flex flex-col items-center justify-center ${className}`}>
        {/* Soft Ambient Radial Backlight in Warm Copper & Titanium */}
        <div
          className="pointer-events-none absolute -inset-10 rounded-full blur-3xl opacity-35"
          style={{
            background:
              "radial-gradient(circle, rgba(199,108,106,0.4) 0%, rgba(255,255,255,0.08) 45%, transparent 75%)",
          }}
        />

        {/* Authentic MellowSolutionsHero Monogram */}
        <div className="relative z-10 transition-transform duration-500 hover:scale-[1.02]">
          <Image
            src="/assets/MellowSolutionsHeroTight.png"
            alt="Mellow Solutions Hero Monogram"
            width={width}
            height={height}
            priority
            className="drop-shadow-[0_16px_36px_rgba(0,0,0,0.85)] object-contain"
          />
        </div>
      </div>
    );
  }

  // Dark Logo Variant: MellowSolutionsLogoDunkel
  if (variant === "dark") {
    const iconSize = size || 56;
    return (
      <div
        className={`relative shrink-0 overflow-hidden rounded-2xl border border-white/10 shadow-lg ${className}`}
        style={{ width: iconSize, height: iconSize }}
      >
        <Image
          src="/assets/MellowSolutionsLogoDunkel.jpg"
          alt="Mellow Solutions Dark Logo"
          width={iconSize}
          height={iconSize}
          className="h-full w-full object-cover"
        />
      </div>
    );
  }

  // App Icon / Header Variant: MellowSolutionsLogoHell
  const iconSize = size || 38;

  return (
    <div className={`flex items-center gap-3.5 ${className}`}>
      {/* App Logo from MellowSolutionsLogoHell with Live Indicator */}
      <div
        className="relative shrink-0 overflow-hidden rounded-xl border border-white/15 bg-[#090b10] shadow-sm transition-colors hover:border-white/30"
        style={{ width: iconSize, height: iconSize }}
      >
        <Image
          src="/assets/MellowSolutionsAppIcon.png"
          alt="Mellow Solutions App Logo"
          width={iconSize}
          height={iconSize}
          priority
          className="h-full w-full object-cover"
        />
        <span className="absolute -bottom-0.5 -right-0.5 flex h-2 w-2 z-20">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500 border border-[#08090d]" />
        </span>
      </div>

      {/* Typography: Exact M E L L O W   S O L U T I O N S Letter-Spacing */}
      <div className="flex flex-col text-left">
        <span className="text-[12px] sm:text-[13px] font-semibold tracking-[0.24em] text-zinc-100 uppercase">
          Mellow Solutions
        </span>
      </div>
    </div>
  );
};
