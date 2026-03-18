import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
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
