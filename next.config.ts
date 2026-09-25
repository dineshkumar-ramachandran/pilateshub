import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "static.wixstatic.com",
        pathname: "/**",
      },
    ],
    formats: ["image/avif", "image/webp"],
    // Next 16 only allows quality 75 by default; 90 is used for large studio photos.
    qualities: [75, 90],
    // Cap the widest breakpoint at 1920 — our source photos are 2000w
    // after resizing, so requests for 2048/3840 make Vercel bail on
    // optimization and return the source with `content-disposition:
    // attachment`, which browsers refuse to render inline. Skipping
    // those tiers prevents that dead-end.
    deviceSizes: [640, 750, 828, 1080, 1200, 1440, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    // Dev on this machine lacks native SWC/sharp; WASM image optimization is
    // extremely slow (30s+). Skip optimization in dev only — production optimizes.
    unoptimized: process.env.NODE_ENV === "development",
  },
};

export default nextConfig;
