import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";

export async function GET() {
  const session = await auth();

  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const interviews = await db.interview.findMany({
    where: { userId: session.user.id },
    orderBy: { completedAt: "desc" },
  });

  return NextResponse.json(interviews);
}

export async function POST(request: NextRequest) {
  const session = await auth();

  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { type, content } = await request.json();

  if (!type || !content) {
    return NextResponse.json(
      { error: "Type and content are required" },
      { status: 400 }
    );
  }

  const interview = await db.interview.create({
    data: {
      userId: session.user.id,
      type,
      content: JSON.stringify(content),
    },
  });

  return NextResponse.json(interview);
}
