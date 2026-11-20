import type { Metadata, Viewport } from "next";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#07080b",
};

export const metadata: Metadata = {
  title: "Mellow Solutions Hub | Developer Portfolio & Product Showcase",
  description:
    "Solutions for Daily Struggles and Business Procedures. Portfolio and product hub for Chrome extensions, fullstack web applications, and developer utilities.",
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
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon.png", type: "image/png" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
      { url: "/apple-touch-icon-precomposed.png", sizes: "180x180", type: "image/png" },
    ],
  },
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Mellow Hub",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-[#07080b] font-sans text-zinc-100 antialiased tech-grid-bg relative selection:bg-cyan-400 selection:text-black">
        {/* Restrained Ambient Backlights: Clipped inside viewport to prevent horizontal scroll */}
        <div className="pointer-events-none fixed inset-0 overflow-hidden z-0">
          <div className="glow-ambient w-[520px] h-[520px] bg-cyan-500/[0.06] -top-48 -left-40" />
          <div className="glow-ambient w-[480px] h-[480px] bg-[#C76C6A]/[0.08] top-[42%] -right-44" />
        </div>

        <div className="relative z-10 flex min-h-screen flex-col">
          {children}
        </div>
      </body>
    </html>
  );
}
