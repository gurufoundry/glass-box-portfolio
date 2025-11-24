import { NextResponse } from "next/server";
import { pipeline } from "@xenova/transformers";

// GLOBAL VARIABLE: 
// We store the model outside the function so it stays in memory.
// If we didn't do this, the server would have to reload the 20MB model 
// every single time someone searches (which would be slow).
let extractor: any = null;

export async function POST(req: Request) {
  try {
    // 1. Parse the incoming request
    const body = await req.json();
    const { text } = body;

    if (!text) {
      return NextResponse.json({ error: "No text provided" }, { status: 400 });
    }

    // 2. Initialize the AI Model (Only happens on the first search)
    if (!extractor) {
      console.log("⏳ Initializing AI model on server...");
      extractor = await pipeline('feature-extraction', 'Xenova/all-MiniLM-L6-v2');
    }

    // 3. Turn the text into numbers (Vectorize)
    const output = await extractor(text, { pooling: 'mean', normalize: true });
    
    // Convert Tensor object to a simple JavaScript array
    const vector = Array.from(output.data);

    // 4. Return the vector to the frontend
    return NextResponse.json({ vector });

  } catch (error) {
    console.error("Local AI API Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}