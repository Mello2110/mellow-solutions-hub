import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: "#08090d",
        surface: {
          50: "#161822",
          100: "#12131b",
          200: "#0e0f16",
          300: "#0a0b10",
        },
        border: "rgba(255, 255, 255, 0.08)",
        brand: {
          cyan: "#00f0ff",
          cyanGlow: "rgba(0, 240, 255, 0.25)",
          emerald: "#10b981",
          purple: "#a855f7",
          amber: "#f59e0b",
          copper: "#C76C6A",
          copperLight: "#db8583",
          copperDark: "#a35452",
          copperGlow: "rgba(199, 108, 106, 0.25)",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "Inter", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      letterSpacing: {
        cinematic: "0.28em",
        widebrand: "0.20em",
      },
      boxShadow: {
        "glow-cyan": "0 0 35px -5px rgba(0, 240, 255, 0.25)",
        "glow-copper": "0 0 35px -5px rgba(199, 108, 106, 0.25)",
        "glow-emerald": "0 0 35px -5px rgba(16, 185, 129, 0.25)",
        "card-subtle": "0 8px 32px 0 rgba(0, 0, 0, 0.45)",
      },
      animation: {
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
    },
  },
  plugins: [],
};

export default config;
