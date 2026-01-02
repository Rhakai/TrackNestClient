import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/TrackNestClient",
  images: {
    unoptimized: true,
  },
  reactCompiler: true,
};

export default nextConfig;
