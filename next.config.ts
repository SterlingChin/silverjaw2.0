import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/games/:path*",
        headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }],
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: "/games/:slug",
        destination: "/games/:slug/index.html",
      },
    ];
  },
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
