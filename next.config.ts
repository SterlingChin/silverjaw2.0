import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/ai-readiness-checker",
        destination: "/clara",
        permanent: true,
      },
      {
        source: "/:path*",
        has: [
          {
            type: "host",
            value: "www.sterlingchin.com",
          },
        ],
        destination: "https://sterlingchin.com/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
