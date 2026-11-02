import React from "react";
import Image from "next/image";

interface MellowLogoProps {
  variant?: "compact" | "full" | "hero" | "appIcon" | "lockup";
  className?: string;
  size?: number;
}

export const MellowLogo: React.FC<MellowLogoProps> = ({
  variant = "compact",
  className = "",
  size,
}) => {
  if (variant === "hero") {
    const width = size || 260;
    const height = Math.round(width * (185 / 290));

    return (
      <div className={`relative flex flex-col items-center justify-center ${className}`}>
        {/* Soft Ambient Radial Backlight in Copper & Cyan */}
        <div
          className="pointer-events-none absolute -inset-8 rounded-full blur-3xl opacity-40"
          style={{
            background:
              "radial-gradient(circle, rgba(199,108,106,0.35) 0%, rgba(0,240,255,0.15) 50%, transparent 75%)",
          }}
        />

        {/* 3D Chamfered Hero Monogram from Concept Sheet */}
        <div className="relative z-10 transition-transform duration-500 hover:scale-[1.03]">
          <Image
            src="/assets/mellow-hero-3d-clean.png"
            alt="Mellow Solutions Hero Monogram"
            width={width}
            height={height}
            priority
            className="drop-shadow-[0_12px_32px_rgba(0,0,0,0.8)] object-contain"
          />
        </div>
      </div>
    );
  }

  if (variant === "appIcon") {
    const iconSize = size || 56;
    return (
      <div
        className={`relative shrink-0 overflow-hidden rounded-2xl border border-white/10 shadow-lg ${className}`}
        style={{ width: iconSize, height: iconSize }}
      >
        <Image
          src="/assets/mellow-squircle-icon.png"
          alt="Mellow Solutions App Icon"
          width={iconSize}
          height={iconSize}
          className="h-full w-full object-cover"
        />
      </div>
    );
  }

  // Header / Compact Variant
  const iconSize = size || 38;

  return (
    <div className={`flex items-center gap-3.5 ${className}`}>
      {/* App Icon Monogram with Live Status Dot */}
      <div
        className="relative shrink-0 overflow-hidden rounded-xl border border-white/10 bg-[#0c0d14] shadow-sm transition-colors hover:border-white/25"
        style={{ width: iconSize, height: iconSize }}
      >
        <Image
          src="/assets/mellow-squircle-icon.png"
          alt="Mellow Solutions Icon"
          width={iconSize}
          height={iconSize}
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
