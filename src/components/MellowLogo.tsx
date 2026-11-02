import React from "react";
import Image from "next/image";

interface MellowLogoProps {
  variant?: "compact" | "full" | "hero" | "lockup" | "mark" | "appIcon" | "metallic";
  className?: string;
  size?: number;
}

export const MellowLogo: React.FC<MellowLogoProps> = ({
  variant = "hero",
  className = "",
  size,
}) => {
  // 1. Hero 2D Typographic Lockup (Full horizontal mark + "MELLOW SOLUTIONS")
  if (variant === "hero" || variant === "lockup") {
    const width = size || 480;
    const height = Math.round(width * (130 / 818)); // Aspect ratio of lockup ~ 6.29 : 1

    return (
      <div className={`relative flex flex-col items-center justify-center ${className}`}>
        {/* Soft Ambient Radial Backlight in Warm Copper & Soft White */}
        <div
          className="pointer-events-none absolute -inset-8 rounded-full blur-3xl opacity-25"
          style={{
            background:
              "radial-gradient(circle, rgba(199,108,106,0.25) 0%, rgba(255,255,255,0.05) 50%, transparent 75%)",
          }}
        />

        {/* Clean, High-Resolution 2D Typographic Lockup */}
        <div className="relative z-10 w-full max-w-[320px] sm:max-w-[440px] md:max-w-[500px] transition-transform duration-300 hover:scale-[1.015]">
          <Image
            src="/assets/mellow-lockup-2d-white.png"
            alt="Mellow Solutions Typographic Lockup"
            width={width}
            height={height}
            priority
            className="w-full h-auto drop-shadow-[0_2px_16px_rgba(255,255,255,0.06)] object-contain"
          />
        </div>
      </div>
    );
  }

  // 2. Standalone 2D MS Mark (Infinity Ribbon)
  if (variant === "mark") {
    const width = size || 180;
    const height = Math.round(width * (123 / 245));

    return (
      <div className={`relative flex items-center justify-center ${className}`}>
        <Image
          src="/assets/mellow-mark-2d-white.png"
          alt="Mellow Solutions MS Mark"
          width={width}
          height={height}
          priority
          className="drop-shadow-[0_4px_20px_rgba(255,255,255,0.08)] object-contain"
        />
      </div>
    );
  }

  // 3. Fallback / Legacy Metallic Hero
  if (variant === "metallic") {
    const width = size || 310;
    const height = Math.round(width * (165 / 324));

    return (
      <div className={`relative flex flex-col items-center justify-center ${className}`}>
        <div
          className="pointer-events-none absolute -inset-10 rounded-full blur-3xl opacity-35"
          style={{
            background:
              "radial-gradient(circle, rgba(199,108,106,0.4) 0%, rgba(255,255,255,0.08) 45%, transparent 75%)",
          }}
        />
        <div className="relative z-10 transition-transform duration-500 hover:scale-[1.02]">
          <Image
            src="/assets/MellowSolutionsHeroTight.png"
            alt="Mellow Solutions Metallic Monogram"
            width={width}
            height={height}
            priority
            className="drop-shadow-[0_16px_36px_rgba(0,0,0,0.85)] object-contain"
          />
        </div>
      </div>
    );
  }

  // 4. Header / Compact App Logo: MellowSolutionsLogoWeißOBG (Pure white on transparent, no dot)
  const logoHeight = size || 26;
  const logoWidth = Math.round(logoHeight * (317 / 161));

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* Authentic MellowSolutionsLogoWeißOBG Mark */}
      <div className="relative shrink-0 flex items-center justify-center">
        <Image
          src="/assets/MellowSolutionsLogoWeißOBG_tight.png"
          alt="Mellow Solutions Logo"
          width={logoWidth}
          height={logoHeight}
          priority
          className="h-[24px] sm:h-[26px] w-auto object-contain transition-transform group-hover:scale-105"
        />
      </div>

      {/* Header Typography: Clean & Spaced */}
      <div className="flex flex-col text-left">
        <span className="text-[12px] sm:text-[13px] font-semibold tracking-[0.24em] text-zinc-100 uppercase transition-colors group-hover:text-white select-none">
          Mellow Solutions
        </span>
      </div>
    </div>
  );
};
