import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    // In dev we bypass Next/Image optimization so localhost/private IPs work for storage previews.
    unoptimized: !isProd,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "github.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "3000",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "127.0.0.1",
        port: "3000",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "moc-drive.moc.gov.kh",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
