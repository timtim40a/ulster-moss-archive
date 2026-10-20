import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Images uploaded through the Sanity Studio.
    remotePatterns: [{ protocol: "https", hostname: "cdn.sanity.io" }],
  },
};

export default nextConfig;
