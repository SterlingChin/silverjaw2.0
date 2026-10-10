import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/tater/:path*",
        headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }],
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: "/tater/:slug",
        destination: "/tater/:slug/index.html",
      },
    ];
  },
  async redirects() {
    return [
      { source: "/games/:path*", destination: "/tater/:path*", permanent: true },
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
