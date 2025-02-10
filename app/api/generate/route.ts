import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();

    if (!process.env.GROQ_API_KEY) {
      throw new Error("GROQ_API_KEY is not configured");
    }

    console.log("Sending prompt to Groq:", prompt);

    const response = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        // Updated URL
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          model: "mixtral-8x7b-32768",
          messages: [{ role: "user", content: prompt }],
          temperature: 0.7,
          max_tokens: 1000,
        }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Groq API error:", errorData);
      throw new Error(`Groq API error: ${response.statusText}`);
    }

    const data = await response.json();
    console.log("Groq API response:", data);

    if (!data.choices?.[0]?.message) {
      throw new Error("Invalid response format from Groq API");
    }

    return NextResponse.json(data.choices[0].message);
  } catch (error) {
    console.error("Error in generate route:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Failed to generate response";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
