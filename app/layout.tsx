import type { Metadata } from "next";
import { Fraunces, Inter, Geist_Mono } from "next/font/google";
import "./globals.css";
import { site } from "@/lib/content";
import SmoothScroll from "@/components/layout/SmoothScroll";
import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import Cursor from "@/components/layout/Cursor";
import ScrollProgress from "@/components/layout/ScrollProgress";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
  axes: ["opsz", "SOFT"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.domain),
  title: {
    default: "PilatesHub · Pilates studio in HSR Layout, Bengaluru",
    template: "%s · PilatesHub",
  },
  description:
    "PilatesHub is a premium Pilates studio in HSR Layout, Bengaluru. Private, couples, group and specialized sessions on classical equipment. Move with intention.",
  keywords: [
    "Pilates",
    "Pilates studio",
    "Pilates Bengaluru",
    "Pilates HSR Layout",
    "Reformer Pilates",
    "Pilates classes Bangalore",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: site.domain,
    siteName: "PilatesHub",
    title: "PilatesHub · Pilates studio in HSR Layout, Bengaluru",
    description:
      "Premium Pilates in Bengaluru. Private, couples, group and specialized sessions on classical equipment.",
  },
  twitter: {
    card: "summary_large_image",
    title: "PilatesHub · Pilates studio in Bengaluru",
    description: "Premium Pilates in HSR Layout, Bengaluru. Move with intention.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${inter.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full">
        <ScrollProgress />
        <Cursor />
        <Nav />
        <SmoothScroll>
          <main id="main">{children}</main>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
