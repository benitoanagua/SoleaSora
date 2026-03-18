import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import { SanityLive } from "@/sanity/lib/live";
import "./globals.css";

// Tipografía display — para titulares, nombres de productos
const cormorant = Cormorant_Garamond({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
});

// Tipografía UI — para body, navegación, botones
const dmSans = DM_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
});

export const metadata: Metadata = {
  title: {
    default: "Solea Sora — Skincare sensorial",
    template: "%s | Solea Sora",
  },
  description:
    "Skincare premium inspirado en la luz y el aire. Fórmulas sensoriales para una piel viva.",
  openGraph: {
    siteName: "Solea Sora",
    locale: "es_AR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={`${cormorant.variable} ${dmSans.variable}`}>
      <body className="bg-[#FAF8F5] text-[#1A1814] antialiased">
        {children}
        <SanityLive />
      </body>
    </html>
  );
}
