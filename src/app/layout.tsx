import type { Metadata, Viewport } from "next";
import { Fraunces, Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "900"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://sfbestof.com"),
  title: "best of SF (tarlon's version)",
  description:
    "A curated map of my favorite places in San Francisco — bars, private dining, cappuccinos, places to cry, and more.",
  openGraph: {
    title: "best of SF (tarlon's version)",
    description: "A curated map of my favorite places in San Francisco.",
    type: "website",
    url: "https://sfbestof.com",
    siteName: "best of SF",
  },
  twitter: {
    card: "summary_large_image",
    title: "best of SF (tarlon's version)",
    description: "A curated map of my favorite places in San Francisco.",
    creator: "@TarlonKhoubyari",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#FFF6E9",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${fraunces.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
