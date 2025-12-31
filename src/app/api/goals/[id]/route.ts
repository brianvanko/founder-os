import { auth } from "@/lib/auth";

import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  const session = await auth();

  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await context.params;

    const goal = await db.goal.findUnique({
      where: { id },
    });

    if (!goal || goal.userId !== session.user.id) {
      return NextResponse.json({ error: "Goal not found" }, { status: 404 });
    }

    return NextResponse.json({
      ...goal,
      content: JSON.parse(goal.content),
    });
  } catch (error) {
    console.error("Goal fetch error:", error);
    return NextResponse.json(
      { error: "Failed to fetch goal" },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  const session = await auth();

  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await context.params;
    const { title, category, content, status, progress } = await request.json();

    // Verify goal belongs to user
    const goal = await db.goal.findUnique({
      where: { id },
    });

    if (!goal || goal.userId !== session.user.id) {
      return NextResponse.json({ error: "Goal not found" }, { status: 404 });
    }

    // Update goal
    const updatedGoal = await db.goal.update({
      where: { id },
      data: {
        title: title !== undefined ? title : goal.title,
        category: category !== undefined ? category : goal.category,
        content: content !== undefined ? JSON.stringify(content) : goal.content,
        status: status !== undefined ? status : goal.status,
        progress: progress !== undefined ? progress : goal.progress,
      },
    });

    return NextResponse.json({
      ...updatedGoal,
      content: JSON.parse(updatedGoal.content),
    });
  } catch (error) {
    console.error("Goal update error:", error);
    return NextResponse.json(
      { error: "Failed to update goal" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  const session = await auth();

  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await context.params;

    // Verify goal belongs to user
    const goal = await db.goal.findUnique({
      where: { id },
    });

    if (!goal || goal.userId !== session.user.id) {
      return NextResponse.json({ error: "Goal not found" }, { status: 404 });
    }

    // Delete goal
    await db.goal.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Goal delete error:", error);
    return NextResponse.json(
      { error: "Failed to delete goal" },
      { status: 500 }
    );
  }
}
