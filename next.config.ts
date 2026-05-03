import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // This explicitly blocks the broken C++ engine so it falls back to pure JS
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      "onnxruntime-node$": false,
    };
    return config;
  },
};

export default nextConfig;