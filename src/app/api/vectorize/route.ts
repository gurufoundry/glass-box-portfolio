import { pipeline, env } from "@xenova/transformers";
import { NextResponse } from "next/server";

// 1. Tell the AI to skip the local hard drive and use the cloud CDN
env.allowLocalModels = false;

// 2. STOP the AI from trying to count server CPUs (which crashes on the Edge)
env.backends.onnx.wasm.numThreads = 1;

// 3. Set the Edge runtime
export const runtime = "edge";

// GLOBAL VARIABLE: 
// We store the model outside the function so it stays in memory.
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
      extractor = await pipeline('feature-extraction', 'Xenova/all-MiniLM-L6-v2');
    }

    const output = await extractor(text, { pooling: 'mean', normalize: true });
    const vector = Array.from(output.data);

    return NextResponse.json({ vector });

  } catch (error) {
    console.error("Local AI API Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}