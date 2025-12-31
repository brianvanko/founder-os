import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await context.params;

    const review = await db.review.findUnique({
      where: { id },
    });

    if (!review || review.userId !== session.user.id) {
      return NextResponse.json({ error: "Review not found" }, { status: 404 });
    }

    return NextResponse.json({
      ...review,
      content: JSON.parse(review.content),
    });
  } catch (error) {
    console.error("Review fetch error:", error);
    return NextResponse.json(
      { error: "Failed to fetch review" },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await context.params;
    const { content } = await request.json();

    // Verify review belongs to user
    const review = await db.review.findUnique({
      where: { id },
    });

    if (!review || review.userId !== session.user.id) {
      return NextResponse.json({ error: "Review not found" }, { status: 404 });
    }

    // Update review
    const updatedReview = await db.review.update({
      where: { id },
      data: { content: JSON.stringify(content) },
    });

    return NextResponse.json({
      ...updatedReview,
      content: JSON.parse(updatedReview.content),
    });
  } catch (error) {
    console.error("Review update error:", error);
    return NextResponse.json(
      { error: "Failed to update review" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await context.params;

    // Verify review belongs to user
    const review = await db.review.findUnique({
      where: { id },
    });

    if (!review || review.userId !== session.user.id) {
      return NextResponse.json({ error: "Review not found" }, { status: 404 });
    }

    // Delete review
    await db.review.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Review delete error:", error);
    return NextResponse.json(
      { error: "Failed to delete review" },
      { status: 500 }
    );
  }
}
