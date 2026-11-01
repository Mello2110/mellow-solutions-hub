"use client";

import React, { useState } from "react";
import { X, Coffee, Heart, Check, ExternalLink, Sparkles } from "lucide-react";

interface SponsorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SponsorModal: React.FC<SponsorModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [copied, setCopied] = useState(false);
  const coffeeUrl = "https://buymeacoffee.com/mellowsolutions";

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(coffeeUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative z-10 w-full max-w-lg overflow-hidden rounded-2xl border border-white/10 bg-[#0c0e15] p-6 shadow-2xl shadow-brand-copperGlow">
        {/* Header Ambient Glow */}
        <div className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full bg-brand-copper/20 blur-3xl" />

        {/* Header Bar */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-brand-copper/30 bg-brand-copper/15 text-brand-copper shadow-glow-copper/20">
              <Coffee className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">
                Mellow Solutions unterstützen
              </h3>
              <p className="text-xs text-zinc-400">
                Transparente & unabhängige Softwareentwicklung
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="rounded-xl border border-white/10 bg-zinc-900/60 p-2 text-zinc-400 hover:border-white/20 hover:text-white"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Body Text */}
        <div className="mt-5 space-y-3.5 text-xs leading-relaxed text-zinc-300">
          <p>
            Alle hier vorgestellten Chrome-Extensions, Webapps und HTML-Tools sind{" "}
            <span className="font-semibold text-white">
              vollkommen werbefrei, ohne Tracking
            </span>{" "}
            und auf Langlebigkeit ausgelegt.
          </p>
          <div className="rounded-xl border border-white/5 bg-zinc-950/60 p-3.5 text-zinc-400">
            <div className="font-mono text-[11px] text-brand-copperLight font-semibold uppercase tracking-wider mb-1">
              Wofür werden Spenden genutzt?
            </div>
            <ul className="list-disc pl-4 space-y-1 text-[11px]">
              <li>Entwickler- & API-Gebühren des Chrome Web Stores</li>
              <li>Hosting- und Domain-Infrastruktur</li>
              <li>Weiterentwicklung und zügige Bugfixes neuer Versionen</li>
            </ul>
          </div>
        </div>

        {/* Primary CTA Button: Buy Me a Coffee */}
        <div className="mt-6 flex flex-col gap-2.5">
          <a
            href={coffeeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center justify-center gap-2 rounded-xl border border-brand-copper/50 bg-gradient-to-r from-brand-copper to-[#b85b59] px-4 py-3 text-xs font-semibold text-white shadow-glow-copper/30 transition-all hover:scale-[1.01] hover:brightness-110"
          >
            <Coffee className="h-4 w-4" />
            <span>Kaffee via Buy Me a Coffee spendieren</span>
            <ExternalLink className="h-3.5 w-3.5 opacity-70 group-hover:opacity-100" />
          </a>

          <button
            onClick={handleCopy}
            className="flex items-center justify-center gap-1.5 rounded-xl border border-white/10 bg-zinc-900/60 py-2.5 text-xs text-zinc-400 transition-colors hover:border-white/20 hover:text-white"
          >
            {copied ? (
              <>
                <Check className="h-3.5 w-3.5 text-emerald-400" />
                <span className="text-emerald-400">Link in die Zwischenablage kopiert!</span>
              </>
            ) : (
              <span>Direkten Spenden-Link kopieren</span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
