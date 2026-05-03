import { pipeline, env } from "@xenova/transformers";
import { NextResponse } from "next/server";

// 1. Skip the local hard drive and use the cloud
env.allowLocalModels = false;

// 2. Stop the AI from trying to count server CPUs
env.backends.onnx.wasm.numThreads = 1;

// 3. Tell the Edge network EXACTLY where to download the WASM engine
env.backends.onnx.wasm.wasmPaths = "https://cdn.jsdelivr.net/npm/onnxruntime-web/dist/";

// 4. Set the Edge runtime
export const runtime = "edge";

// GLOBAL VARIABLE: 
// Store the model in memory so it doesn't reload on every search.
let extractor: any = null;

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { text } = body;

    if (!text) {
      return NextResponse.json({ error: "No text provided" }, { status: 400 });
    }

    if (!extractor) {
      console.log("⏳ Initializing AI model on server...");
      extractor = await pipeline("feature-extraction", "Xenova/all-MiniLM-L6-v2");
    }

    const output = await extractor(text, { pooling: "mean", normalize: true });
    const vector = Array.from(output.data);

    return NextResponse.json({ vector });

  } catch (error) {
    console.error("Local AI API Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}