import type { Metadata, Viewport } from "next";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "Mellow Solutions Hub | Developer Portfolio & Product Showcase",
  description:
    "Zentrales Hub und technisches Portfolio für Chrome Extensions, Fullstack Webanwendungen, HTML Tools und Automatisierungen.",
  keywords: [
    "Chrome Extensions",
    "Web Development",
    "Portfolio",
    "Fullstack Developer",
    "TypeScript",
    "Next.js",
    "Manifest V3",
  ],
  authors: [{ name: "Mellow Solutions" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de" className="dark">
      <body className="min-h-screen bg-[#08090d] text-zinc-100 antialiased tech-grid-bg relative selection:bg-brand-cyan selection:text-black">
        {/* Subtle Ambient Backlights in Google Antigravity & Logitech style */}
        <div className="glow-ambient w-[600px] h-[600px] bg-cyan-500 -top-40 -left-40" />
        <div className="glow-ambient w-[500px] h-[500px] bg-purple-600 top-[35%] -right-32 opacity-10" />
        <div className="glow-ambient w-[550px] h-[550px] bg-emerald-500 bottom-0 left-1/4 opacity-10" />

        <div className="relative z-10 flex min-h-screen flex-col">
          {children}
        </div>
      </body>
    </html>
  );
}
