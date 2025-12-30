import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/TrackNestClient",
  images: {
    unoptimized: true,
  },
  experimental: {
    // @ts-expect-error
    reactCompiler: true,
  },
};

export default nextConfig;
