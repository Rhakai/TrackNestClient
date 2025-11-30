import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === 'production';
const repoName = 'TrackNestClient';

/** @type {import('next').NextConfig} */
const nextConfig: NextConfig = {
  output: 'export',
  images: { unoptimized: true, },
  basePath: isProd ? `/${repoName}` : '',
  assetPrefix: isProd ? `/${repoName}/` : '',
};

module.exports = nextConfig;

export default nextConfig;
