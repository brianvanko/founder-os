import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();

  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;

  const interview = await db.interview.findUnique({
    where: { id },
  });

  if (!interview || interview.userId !== session.user.id) {
    return NextResponse.json({ error: "Interview not found" }, { status: 404 });
  }

  return NextResponse.json({
    ...interview,
    content: JSON.parse(interview.content),
  });
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();

  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const { content } = await request.json();

  const interview = await db.interview.findUnique({
    where: { id },
  });

  if (!interview || interview.userId !== session.user.id) {
    return NextResponse.json({ error: "Interview not found" }, { status: 404 });
  }

  const updatedInterview = await db.interview.update({
    where: { id },
    data: {
      content: JSON.stringify(content),
      updatedAt: new Date(),
    },
  });

  return NextResponse.json(updatedInterview);
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();

  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;

  const interview = await db.interview.findUnique({
    where: { id },
  });

  if (!interview || interview.userId !== session.user.id) {
    return NextResponse.json({ error: "Interview not found" }, { status: 404 });
  }

  await db.interview.delete({
    where: { id },
  });

  return NextResponse.json({ success: true });
}
