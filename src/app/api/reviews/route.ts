import { auth } from "@/lib/auth";

import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { ReviewType } from "@prisma/client";

export async function POST(request: Request) {
  const session = await auth();

  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { type, date, content } = await request.json();

    // Validate review type
    if (!Object.values(ReviewType).includes(type)) {
      return NextResponse.json({ error: "Invalid review type" }, { status: 400 });
    }

    // Parse date
    const reviewDate = new Date(date);

    // Check if review already exists for this date and type
    const existing = await db.review.findUnique({
      where: {
        userId_type_date: {
          userId: session.user.id,
          type,
          date: reviewDate,
        },
      },
    });

    if (existing) {
      return NextResponse.json(
        { error: "Review already exists for this date" },
        { status: 409 }
      );
    }

    // Create review
    const review = await db.review.create({
      data: {
        userId: session.user.id,
        type,
        date: reviewDate,
        content: JSON.stringify(content),
      },
    });

    return NextResponse.json(review, { status: 201 });
  } catch (error) {
    console.error("Review creation error:", error);
    return NextResponse.json(
      { error: "Failed to create review" },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  const session = await auth();

  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get("type");
    const limit = searchParams.get("limit");

    const where: any = { userId: session.user.id };
    if (type && Object.values(ReviewType).includes(type as ReviewType)) {
      where.type = type as ReviewType;
    }

    const reviews = await db.review.findMany({
      where,
      orderBy: { date: "desc" },
      take: limit ? parseInt(limit) : undefined,
    });

    // Parse content JSON
    const reviewsWithParsedContent = reviews.map((review) => ({
      ...review,
      content: JSON.parse(review.content),
    }));

    return NextResponse.json(reviewsWithParsedContent);
  } catch (error) {
    console.error("Review fetch error:", error);
    return NextResponse.json(
      { error: "Failed to fetch reviews" },
      { status: 500 }
    );
  }
}
