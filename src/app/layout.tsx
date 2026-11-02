import type { Metadata, Viewport } from "next";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
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
    <html lang="de" className="dark">
      <body className="min-h-screen bg-[#07080b] text-zinc-100 antialiased tech-grid-bg relative selection:bg-cyan-400 selection:text-black">
        {/* Tasteful Ambient Backlights: Strictly clipped inside viewport to prevent any horizontal scroll on mobile */}
        <div className="pointer-events-none fixed inset-0 overflow-hidden z-0">
          <div className="glow-ambient w-[600px] h-[600px] bg-cyan-500/10 -top-40 -left-40" />
          <div className="glow-ambient w-[550px] h-[550px] bg-[#C76C6A]/12 top-[40%] -right-40" />
          <div className="glow-ambient w-[500px] h-[500px] bg-indigo-600/10 bottom-20 left-10" />
        </div>

        <div className="relative z-10 flex min-h-screen flex-col">
          {children}
        </div>
      </body>
    </html>
  );
}
