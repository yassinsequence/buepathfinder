import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
      },
    ],
  },
  turbopack: {},
};

// PWA configuration will be added later with proper TypeScript support
// For now, exporting base config to ensure build succeeds
export default nextConfig;
