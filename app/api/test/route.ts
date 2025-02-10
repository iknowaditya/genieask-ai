import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = await fetch("https://api.groq.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "mixtral-8x7b-32768",
        messages: [{ role: "user", content: "Say hello!" }],
      }),
    });

    if (!response.ok) {
      throw new Error(
        `Groq API error: ${response.status} ${response.statusText}`
      );
    }

    const data = await response.json();
    return NextResponse.json({
      success: true,
      message: data.choices[0].message,
      apiKeyPresent: !!process.env.GROQ_API_KEY,
    });
  } catch (error) {
    console.error("Test endpoint error:", error);
    return NextResponse.json(
      {
        success: false,
        error: (error as Error).message,
        apiKeyPresent: !!process.env.GROQ_API_KEY,
      },
      { status: 500 }
    );
  }
}
