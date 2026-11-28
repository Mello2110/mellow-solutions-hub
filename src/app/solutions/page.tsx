import type { Metadata } from "next";
import { SolutionsClient } from "@/components/SolutionsClient";
import { DEFAULT_OG_IMAGE, SITE_NAME } from "@/lib/site";

export const metadata: Metadata = {
  title: "Client Solutions & Case Studies",
  description:
    "Selected commissions and custom software solutions by Mellow Solutions — structured transparently from client goal and technical constraints to the shipped implementation.",
  alternates: {
    canonical: "/solutions",
  },
  openGraph: {
    title: `Client Solutions & Case Studies | ${SITE_NAME}`,
    description:
      "Selected commissions and custom software solutions by Mellow Solutions.",
    url: "/solutions",
    images: [{ url: DEFAULT_OG_IMAGE, width: 1200, height: 630, alt: SITE_NAME }],
  },
  twitter: {
    card: "summary_large_image",
    title: `Client Solutions & Case Studies | ${SITE_NAME}`,
    description:
      "Selected commissions and custom software solutions by Mellow Solutions.",
    images: [DEFAULT_OG_IMAGE],
  },
};

export default function SolutionsPage() {
  return <SolutionsClient />;
}
