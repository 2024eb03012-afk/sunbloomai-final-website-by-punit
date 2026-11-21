import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.convex.cloud",
      },
      {
        protocol: "https",
        hostname: "luke.sunbloomai.com",
      },
    ],
  },
  async redirects() {
    return [
      { source: "/about-us", destination: "/company", permanent: true },
      { source: "/resources", destination: "/research", permanent: true },
    ];
  },
  async rewrites() {
    return [
      {
        source: "/app/:path*",
        destination: "https://linkedin-agent-zeta.vercel.app/app/:path*",
      },
      {
        source: "/app",
        destination: "https://linkedin-agent-zeta.vercel.app/app",
      },
    ];
  },
};

export default nextConfig;
