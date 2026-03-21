import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      ...(process.env.R2_PUBLIC_HOSTNAME
        ? [
            {
              protocol: "https" as const,
              hostname: process.env.R2_PUBLIC_HOSTNAME,
              pathname: "/**",
            },
          ]
        : []),
      {
        protocol: "https" as const,
        hostname: "img.youtube.com",
        pathname: "/vi/**",
      },
    ],
  },
  // No ignoreBuildErrors. No ignoreDuringBuilds. Ever.
};

export default nextConfig;

