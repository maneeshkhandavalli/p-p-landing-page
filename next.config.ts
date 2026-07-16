import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '5.imimg.com' },
      { protocol: 'https', hostname: '3.imimg.com' },
    ],
  },
};

export default nextConfig;
