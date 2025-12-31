import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { getOpenAIClient, AI_MODEL } from "@/lib/openai";

export async function POST(request: NextRequest) {
  const session = await auth();

  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { type, timeframe } = body;

    // Fetch relevant data based on type
    let dataToAnalyze = "";

    if (type === "reviews") {
      // Get recent reviews (last 90 days or specified timeframe)
      const daysBack = timeframe || 90;
      const startDate = new Date();
      startDate.setDate(startDate.getDate() - daysBack);

      const reviews = await db.review.findMany({
        where: {
          userId: session.user.id,
          date: {
            gte: startDate,
          },
        },
        orderBy: { date: "desc" },
        take: 50, // Limit to avoid token limits
      });

      // Format reviews for analysis
      dataToAnalyze = reviews
        .map((r) => {
          const content = JSON.parse(r.content);
          return `[${r.type} - ${r.date.toISOString().split("T")[0]}]\n${JSON.stringify(content, null, 2)}`;
        })
        .join("\n\n---\n\n");
    } else if (type === "goals") {
      const goals = await db.goal.findMany({
        where: {
          userId: session.user.id,
        },
        orderBy: { updatedAt: "desc" },
      });

      dataToAnalyze = goals
        .map((g) => {
          const content = JSON.parse(g.content);
          return `[${g.timeframe} - ${g.title}]\nStatus: ${g.status}\nProgress: ${g.progress}/10\n${JSON.stringify(content, null, 2)}`;
        })
        .join("\n\n---\n\n");
    } else if (type === "comprehensive") {
      // Analyze everything for deep insights
      const [reviews, goals, interviews] = await Promise.all([
        db.review.findMany({
          where: { userId: session.user.id },
          orderBy: { date: "desc" },
          take: 30,
        }),
        db.goal.findMany({
          where: { userId: session.user.id },
          orderBy: { updatedAt: "desc" },
        }),
        db.interview.findMany({
          where: { userId: session.user.id },
          orderBy: { completedAt: "desc" },
          take: 5,
        }),
      ]);

      const reviewsText = reviews
        .map((r) => `[${r.type}]\n${r.content}`)
        .join("\n\n");
      const goalsText = goals
        .map((g) => `[${g.timeframe}] ${g.title}: ${g.content}`)
        .join("\n\n");
      const interviewsText = interviews
        .map((i) => `[${i.type}]\n${i.content}`)
        .join("\n\n");

      dataToAnalyze = `REVIEWS:\n${reviewsText}\n\nGOALS:\n${goalsText}\n\nINTERVIEWS:\n${interviewsText}`;
    }

    if (!dataToAnalyze) {
      return NextResponse.json(
        { error: "No data available for analysis" },
        { status: 400 }
      );
    }

    // Generate insights using OpenAI
    let openai;
    try {
      openai = getOpenAIClient();
    } catch (error) {
      return NextResponse.json(
        {
          error: "OpenAI is not configured. Add OPENAI_API_KEY to your .env file to enable AI insights.",
          devMode: true
        },
        { status: 503 }
      );
    }

    const completion = await openai.chat.completions.create({
      model: AI_MODEL,
      messages: [
        {
          role: "system",
          content: `You are an executive coach analyzing a founder's personal operating system. Your role is to:
1. Identify recurring patterns in their work, energy, and decision-making
2. Extract meaningful insights that help them improve
3. Highlight contradictions between stated goals and actual behavior
4. Suggest what should be captured in their "memory.md" (operating manual)

Be specific, direct, and actionable. Reference concrete examples from their data.
Format your response in markdown with clear sections.`,
        },
        {
          role: "user",
          content: `Analyze the following data and provide insights:\n\n${dataToAnalyze}`,
        },
      ],
      temperature: 0.7,
      max_tokens: 1500,
    });

    const insights = completion.choices[0]?.message?.content || "";

    return NextResponse.json({ insights });
  } catch (error) {
    console.error("Insights generation error:", error);
    return NextResponse.json(
      { error: "Failed to generate insights" },
      { status: 500 }
    );
  }
}
