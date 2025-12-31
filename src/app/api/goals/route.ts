import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { Timeframe } from "@prisma/client";

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { timeframe, title, category, content, status, progress } =
      await request.json();

    // Validate timeframe
    if (!Object.values(Timeframe).includes(timeframe)) {
      return NextResponse.json(
        { error: "Invalid timeframe" },
        { status: 400 }
      );
    }

    // Create goal
    const goal = await db.goal.create({
      data: {
        userId: session.user.id,
        timeframe,
        title,
        category,
        content: JSON.stringify(content),
        status: status || null,
        progress: progress || null,
      },
    });

    return NextResponse.json(
      {
        ...goal,
        content: JSON.parse(goal.content),
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Goal creation error:", error);
    return NextResponse.json(
      { error: "Failed to create goal" },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const timeframe = searchParams.get("timeframe");

    const where: any = { userId: session.user.id };
    if (timeframe && Object.values(Timeframe).includes(timeframe as Timeframe)) {
      where.timeframe = timeframe as Timeframe;
    }

    const goals = await db.goal.findMany({
      where,
      orderBy: { createdAt: "desc" },
    });

    // Parse content JSON
    const goalsWithParsedContent = goals.map((goal) => ({
      ...goal,
      content: JSON.parse(goal.content),
    }));

    return NextResponse.json(goalsWithParsedContent);
  } catch (error) {
    console.error("Goals fetch error:", error);
    return NextResponse.json(
      { error: "Failed to fetch goals" },
      { status: 500 }
    );
  }
}
