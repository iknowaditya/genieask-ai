import { NextResponse } from "next/server";
import Groq from "groq-sdk";

// ✅ Initialize SDK with your API key
const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();

    if (!prompt) {
      throw new Error("Prompt is required");
    }

    if (!process.env.GROQ_API_KEY) {
      throw new Error("GROQ_API_KEY is not configured");
    }

    console.log("Sending prompt to Groq:", prompt);

    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile", // ✅ New model name
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
      max_tokens: 1000,
    });

    const message = completion.choices[0]?.message?.content;

    if (!message) {
      throw new Error("No response from Groq model");
    }

    return NextResponse.json({ content: message });
  } catch (error) {
    console.error("Error in generate route:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Failed to generate response";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
