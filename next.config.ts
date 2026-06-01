import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "bgqcxvnqmfixbrrofgff.supabase.co" },
    ],
  },
  devIndicators: {
    position: "bottom-right",
  },
  turbopack: {
    root: __dirname,
  },
};

export default nextConfig;
