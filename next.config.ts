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
    // Dev on this machine lacks native SWC/sharp; WASM image optimization is
    // extremely slow (30s+). Skip optimization in dev only — production optimizes.
    unoptimized: process.env.NODE_ENV === "development",
  },
};

export default nextConfig;
