import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // This tells Vercel NOT to compress the heavy C++ AI binaries
  serverExternalPackages: ["onnxruntime-node", "@xenova/transformers"],
};

export default nextConfig;