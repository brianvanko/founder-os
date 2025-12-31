import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";

export async function GET(request: NextRequest) {
  const session = await auth();

  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get("q");

  if (!query || query.trim().length === 0) {
    return NextResponse.json({ results: [] });
  }

  const searchTerm = query.trim().toLowerCase();

  // Search reviews
  const reviews = await db.review.findMany({
    where: {
      userId: session.user.id,
      content: {
        contains: searchTerm,
        mode: "insensitive",
      },
    },
    take: 20,
    orderBy: { date: "desc" },
  });

  // Search goals
  const goals = await db.goal.findMany({
    where: {
      userId: session.user.id,
      OR: [
        {
          title: {
            contains: searchTerm,
            mode: "insensitive",
          },
        },
        {
          content: {
            contains: searchTerm,
            mode: "insensitive",
          },
        },
      ],
    },
    take: 20,
    orderBy: { createdAt: "desc" },
  });

  // Search interviews
  const interviews = await db.interview.findMany({
    where: {
      userId: session.user.id,
      content: {
        contains: searchTerm,
        mode: "insensitive",
      },
    },
    take: 10,
    orderBy: { completedAt: "desc" },
  });

  // Search documents
  const documents = await db.document.findMany({
    where: {
      userId: session.user.id,
      content: {
        contains: searchTerm,
        mode: "insensitive",
      },
    },
    orderBy: { updatedAt: "desc" },
  });

  // Format results
  const results = [
    ...reviews.map((r) => ({
      id: r.id,
      type: "review" as const,
      reviewType: r.type,
      date: r.date,
      content: JSON.parse(r.content),
    })),
    ...goals.map((g) => ({
      id: g.id,
      type: "goal" as const,
      title: g.title,
      timeframe: g.timeframe,
      createdAt: g.createdAt,
    })),
    ...interviews.map((i) => ({
      id: i.id,
      type: "interview" as const,
      interviewType: i.type,
      completedAt: i.completedAt,
    })),
    ...documents.map((d) => ({
      id: d.id,
      type: "document" as const,
      documentType: d.type,
      updatedAt: d.updatedAt,
    })),
  ];

  return NextResponse.json({ results });
}
