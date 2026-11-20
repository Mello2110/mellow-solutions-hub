"use client";

import React, { useState, useEffect, useRef } from "react";
import { Lock, User, X, Loader2, ShieldCheck } from "lucide-react";
import { Language } from "@/data/i18n";

interface AdminLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  language: Language;
}

export const AdminLoginModal: React.FC<AdminLoginModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
  language,
}) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const usernameInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setUsername("");
      setPassword("");
      setError(null);
      setTimeout(() => usernameInputRef.current?.focus(), 40);
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const isDe = language === "de";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim() || !password.trim() || isSubmitting) return;

    setIsSubmitting(true);
    setError(null);

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = (await res.json().catch(() => ({}))) as {
        authenticated?: boolean;
        error?: string;
      };

      if (!res.ok || !data.authenticated) {
        setError(
          data.error ||
            (isDe
              ? "Ungültiger Name oder Passwort."
              : "Invalid username or password.")
        );
        return;
      }

      onSuccess();
      onClose();
    } catch {
      setError(
        isDe
          ? "Verbindungsfehler beim Login."
          : "Connection error during login."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-md"
        onClick={onClose}
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-label="Admin Access"
        className="relative z-10 w-full max-w-sm overflow-hidden rounded-2xl border border-white/10 bg-[#0c0e15] p-6 shadow-2xl"
      >
        <div className="flex items-center justify-between border-b border-white/5 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#C76C6A]/30 bg-[#C76C6A]/15 text-[#C76C6A]">
              <ShieldCheck className="h-4 w-4" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-white">
                {isDe ? "Admin-Zugang" : "Admin Access"}
              </h3>
              <p className="text-[11px] text-zinc-400">
                {isDe
                  ? "Flagship-Steuerung freischalten"
                  : "Unlock live Flagship controls"}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="rounded-lg border border-white/10 bg-zinc-900/80 p-1.5 text-zinc-400 transition-colors hover:text-white"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-5 space-y-4">
          <div>
            <label
              htmlFor="admin-username-input"
              className="block font-mono text-[10px] uppercase tracking-wider text-zinc-400 mb-1.5"
            >
              {isDe ? "Name" : "Username"}
            </label>
            <div className="relative">
              <User className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
              <input
                ref={usernameInputRef}
                id="admin-username-input"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Name"
                autoComplete="username"
                className="w-full rounded-xl border border-white/10 bg-[#07080b] py-2.5 pl-9 pr-3 text-sm text-white placeholder-zinc-600 transition-colors focus:border-[#C76C6A]/60 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="admin-password-input"
              className="block font-mono text-[10px] uppercase tracking-wider text-zinc-400 mb-1.5"
            >
              {isDe ? "Passwort" : "Password"}
            </label>
            <div className="relative">
              <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
              <input
                id="admin-password-input"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                autoComplete="current-password"
                className="w-full rounded-xl border border-white/10 bg-[#07080b] py-2.5 pl-9 pr-3 text-sm text-white placeholder-zinc-600 transition-colors focus:border-[#C76C6A]/60 focus:outline-none"
              />
            </div>
          </div>

          {error && (
            <p className="rounded-lg border border-rose-500/30 bg-rose-950/30 px-3 py-2 text-xs text-rose-300">
              {error}
            </p>
          )}

          <div className="flex items-center justify-end gap-2 pt-1">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-white/10 bg-zinc-900/60 px-3.5 py-2 text-xs font-medium text-zinc-300 transition-colors hover:text-white"
            >
              {isDe ? "Abbrechen" : "Cancel"}
            </button>
            <button
              type="submit"
              disabled={!username.trim() || !password.trim() || isSubmitting}
              className="flex items-center gap-1.5 rounded-xl border border-[#C76C6A]/50 bg-[#C76C6A]/20 px-4 py-2 text-xs font-medium text-white transition-all hover:bg-[#C76C6A]/35 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
              <span>{isDe ? "Entsperren" : "Unlock"}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
