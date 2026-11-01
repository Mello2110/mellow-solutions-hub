import React from "react";

interface MellowLogoProps {
  variant?: "compact" | "full" | "hero" | "emblemOnly";
  className?: string;
  size?: number;
}

export const MellowLogo: React.FC<MellowLogoProps> = ({
  variant = "compact",
  className = "",
  size,
}) => {
  // Determine pixel sizes based on variant
  const iconSize = size || (variant === "hero" ? 110 : variant === "compact" ? 44 : 52);

  return (
    <div className={`flex items-center gap-4 ${className}`}>
      {/* Precision 3D Möbius / "M" & "S" Studio Emblem */}
      <div
        className="relative shrink-0 flex items-center justify-center transition-all duration-500 group"
        style={{ width: iconSize, height: iconSize }}
      >
        {/* Soft Ambient Radial Backlight */}
        <div
          className="pointer-events-none absolute inset-0 rounded-full blur-xl transition-opacity duration-500 group-hover:opacity-100"
          style={{
            background:
              "radial-gradient(circle, rgba(199,108,106,0.3) 0%, rgba(0,240,255,0.15) 60%, transparent 80%)",
            opacity: variant === "hero" ? 0.85 : 0.45,
          }}
        />

        <svg
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="relative z-10 h-full w-full drop-shadow-[0_4px_20px_rgba(0,0,0,0.6)]"
        >
          <defs>
            {/* Primary Copper Ribbon Gradient */}
            <linearGradient id="msCopperRibbon" x1="15" y1="20" x2="85" y2="80" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#C76C6A" />
              <stop offset="35%" stopColor="#e89896" />
              <stop offset="70%" stopColor="#96403e" />
              <stop offset="100%" stopColor="#572221" />
            </linearGradient>

            {/* Ice Cyan Photonic Highlight */}
            <linearGradient id="msCyanHighlight" x1="85" y1="15" x2="15" y2="85" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#00f0ff" />
              <stop offset="40%" stopColor="#70f3fc" />
              <stop offset="75%" stopColor="#0284c7" />
              <stop offset="100%" stopColor="#034466" />
            </linearGradient>

            {/* Central S-Inflection Gradient (Blends Copper into Cyan) */}
            <linearGradient id="msCenterS" x1="30" y1="25" x2="70" y2="75" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#00f0ff" />
              <stop offset="30%" stopColor="#e09391" />
              <stop offset="65%" stopColor="#C76C6A" />
              <stop offset="100%" stopColor="#00f0ff" />
            </linearGradient>

            {/* Inner Metallic Core Glow */}
            <radialGradient id="msCoreGlow" cx="50" cy="50" r="30" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.15" />
              <stop offset="60%" stopColor="#00f0ff" stopOpacity="0.05" />
              <stop offset="100%" stopColor="transparent" />
            </radialGradient>
          </defs>

          {/* Technical Outer Calibration Circles (Antigravity & CAD Engineering Aesthetic) */}
          <circle
            cx="50"
            cy="50"
            r="46"
            stroke="rgba(255, 255, 255, 0.08)"
            strokeWidth="0.8"
            strokeDasharray="2 4"
          />
          <circle
            cx="50"
            cy="50"
            r="42"
            stroke="rgba(199, 108, 106, 0.2)"
            strokeWidth="0.6"
          />
          <circle
            cx="50"
            cy="50"
            r="38"
            fill="url(#msCoreGlow)"
            stroke="rgba(0, 240, 255, 0.15)"
            strokeWidth="0.5"
            strokeDasharray="4 6"
          />

          {/* Precision Cardinal Coordinate Ticks */}
          <line x1="50" y1="4" x2="50" y2="8" stroke="#C76C6A" strokeWidth="1.2" strokeLinecap="round" />
          <line x1="50" y1="92" x2="50" y2="96" stroke="#00f0ff" strokeWidth="1.2" strokeLinecap="round" />
          <line x1="4" y1="50" x2="8" y2="50" stroke="rgba(255,255,255,0.3)" strokeWidth="1" strokeLinecap="round" />
          <line x1="92" y1="50" x2="96" y2="50" stroke="rgba(255,255,255,0.3)" strokeWidth="1" strokeLinecap="round" />

          {/* ========================================================
              THE M-S TOPOLOGICAL MÖBIUS STRUCTURE
              The twin crests form the "M", the continuous diagonal ribbon forms the "S"
             ======================================================== */}

          {/* Layer 1: Rear Ribbon Facet (Shadow & Depth) */}
          <path
            d="M26 34 C16 34 14 46 22 56 C30 66 42 70 50 64 C58 58 64 42 72 38 C80 34 88 40 88 50 C88 62 76 68 64 66"
            stroke="rgba(15, 18, 28, 0.85)"
            strokeWidth="7"
            strokeLinecap="round"
          />

          {/* Layer 2: The Left Lobe of the "M" (Ascending Copper Ribbon) */}
          <path
            d="M22 60 C14 52 14 38 24 30 C34 22 44 26 50 38 C56 50 66 74 76 70 C86 66 88 52 80 42 C72 32 60 36 50 48"
            stroke="url(#msCopperRibbon)"
            strokeWidth="4.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Layer 3: The Central "S" Flow Ribbon (Inflection Backbone) */}
          <path
            d="M74 34 C64 26 54 28 46 38 C38 48 34 62 48 70 C58 76 68 70 74 58 C78 50 78 40 70 34 C62 28 48 34 40 44 C32 54 34 66 44 72"
            stroke="url(#msCenterS)"
            strokeWidth="3.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Layer 4: The Right Lobe & Top Crest of "M" (Photonic Ice Cyan) */}
          <path
            d="M28 32 C34 24 44 22 50 32 C56 42 62 60 70 66 C78 72 86 64 86 52 C86 40 76 30 66 32 C56 34 48 46 42 56"
            stroke="url(#msCyanHighlight)"
            strokeWidth="2.2"
            strokeLinecap="round"
          />

          {/* Center Precision Singularity / Geometric Pivot */}
          <circle cx="50" cy="50" r="2.2" fill="#ffffff" />
          <circle cx="50" cy="50" r="4.5" stroke="#00f0ff" strokeWidth="0.8" opacity="0.75" />
          <circle cx="50" cy="50" r="1.2" fill="#08090d" />
        </svg>

        {/* Status Indicator Bead */}
        {variant !== "hero" && (
          <span className="absolute -bottom-0.5 -right-0.5 flex h-2.5 w-2.5 z-20">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500 border border-[#08090d]" />
          </span>
        )}
      </div>

      {/* Typography Block */}
      {variant !== "emblemOnly" && (
        <div className="flex flex-col text-left">
          <div className="flex items-center gap-2">
            <span
              className={`font-semibold uppercase text-white tracking-cinematic transition-colors ${
                variant === "hero" ? "text-xl sm:text-2xl" : "text-[12px] sm:text-[13px]"
              }`}
            >
              Mellow Solutions
            </span>
          </div>
          {(variant === "full" || variant === "hero") && (
            <span
              className={`font-mono text-zinc-400 uppercase tracking-widebrand ${
                variant === "hero" ? "text-xs mt-1 text-brand-copperLight" : "text-[10px]"
              }`}
            >
              Engineering Studio &bull; Precision Software
            </span>
          )}
        </div>
      )}
    </div>
  );
};
