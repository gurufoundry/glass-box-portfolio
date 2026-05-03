import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // This tells Vercel NOT to bundle the heavy C++ AI binaries
  serverExternalPackages: ["onnxruntime-node"],
};

export default nextConfig;