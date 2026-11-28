import type { Metadata, Viewport } from "next";
import "./globals.css";
import { BRAND_NAME, DEFAULT_OG_IMAGE, SITE_NAME, SITE_URL } from "@/lib/site";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#07080b",
};

const defaultTitle = `${SITE_NAME} | Developer Portfolio & Product Showcase`;
const defaultDescription =
  "Solutions for Daily Struggles and Business Procedures. Official portfolio and product hub by Mellow Solutions for Chrome extensions, fullstack web applications, and developer utilities.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: defaultTitle,
    template: `%s | ${SITE_NAME}`,
  },
  description: defaultDescription,
  keywords: [
    "Mellow Solutions",
    "Mellow Solutions Hub",
    "Mellow Hub",
    "Mello2110",
    "Chrome Extensions",
    "Web Development",
    "Developer Portfolio",
    "Client Solutions",
    "Fullstack Developer",
    "TypeScript",
    "Next.js",
    "Manifest V3",
  ],
  authors: [{ name: BRAND_NAME, url: "https://github.com/Mello2110" }],
  creator: BRAND_NAME,
  publisher: BRAND_NAME,
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    alternateLocale: ["de_DE"],
    url: SITE_URL,
    siteName: SITE_NAME,
    title: defaultTitle,
    description: defaultDescription,
    images: [
      {
        url: DEFAULT_OG_IMAGE,
        width: 1200,
        height: 630,
        alt: SITE_NAME,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: defaultTitle,
    description: defaultDescription,
    images: [DEFAULT_OG_IMAGE],
  },
  ...(process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
    ? {
        verification: {
          google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
        },
      }
    : {}),
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

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: SITE_NAME,
      alternateName: [BRAND_NAME, "Mellow Hub"],
      description: defaultDescription,
      inLanguage: ["en", "de"],
      publisher: {
        "@id": `${SITE_URL}/#organization`,
      },
    },
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: BRAND_NAME,
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/icon-512.png`,
      },
      sameAs: [
        "https://github.com/Mello2110",
        "https://github.com/Mello2110/mellow-solutions-hub",
      ],
    },
  ],
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
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
