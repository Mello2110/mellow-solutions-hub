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
      <body className="min-h-screen bg-[#07080b] text-zinc-100 antialiased tech-grid-bg relative selection:bg-cyan-400 selection:text-black">
        {/* Tasteful Ambient Backlights: Copper + Cyan + Violet */}
        <div className="glow-ambient w-[600px] h-[600px] bg-cyan-500/10 -top-40 -left-40" />
        <div className="glow-ambient w-[550px] h-[550px] bg-[#C76C6A]/12 top-[40%] -right-40" />
        <div className="glow-ambient w-[500px] h-[500px] bg-indigo-600/10 bottom-20 left-10" />

        <div className="relative z-10 flex min-h-screen flex-col">
          {children}
        </div>
      </body>
    </html>
  );
}
