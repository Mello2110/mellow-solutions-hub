import React from "react";

interface MellowLogoProps {
  variant?: "compact" | "full";
  className?: string;
}

export const MellowLogo: React.FC<MellowLogoProps> = ({
  variant = "compact",
  className = "",
}) => {
  return (
    <div className={`flex items-center gap-3.5 ${className}`}>
      {/* Möbius / Smooth Manifold Vector Icon */}
      <div className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-[#0c0d14] p-1.5 shadow-card-subtle transition-all duration-300 hover:border-brand-copper/50 hover:shadow-glow-copper">
        <svg
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="h-full w-full"
        >
          <defs>
            <linearGradient id="mellowGradient" x1="4" y1="12" x2="44" y2="36" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#C76C6A" />
              <stop offset="50%" stopColor="#e89896" />
              <stop offset="100%" stopColor="#00f0ff" />
            </linearGradient>
            <filter id="subtleGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="1.5" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Precision Smooth Möbius Loop */}
          <path
            d="M15 16C9 16 6 20 6 24C6 28 9 32 15 32C23 32 25 16 33 16C39 16 42 20 42 24C42 28 39 32 33 32C25 32 23 16 15 16Z"
            stroke="url(#mellowGradient)"
            strokeWidth="3.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            filter="url(#subtleGlow)"
          />

          {/* Geometric Inner Node */}
          <circle cx="24" cy="24" r="1.5" fill="#00f0ff" opacity="0.8" />
        </svg>

        {/* Live operational indicator dot */}
        <span className="absolute -bottom-0.5 -right-0.5 flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
        </span>
      </div>

      {/* Typography with Cinematic Tracking */}
      <div className="flex flex-col">
        <span className="text-[12px] font-semibold tracking-cinematic text-white uppercase sm:text-[13px]">
          Mellow Solutions
        </span>
        {variant === "full" && (
          <span className="text-[10px] tracking-widebrand text-zinc-400 uppercase">
            Product Studio & Developer Hub
          </span>
        )}
      </div>
    </div>
  );
};
