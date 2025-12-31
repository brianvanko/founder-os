import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

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
    const { content } = await request.json();

    // Verify document belongs to user
    const document = await db.document.findUnique({
      where: { id },
    });

    if (!document || document.userId !== session.user.id) {
      return NextResponse.json({ error: "Document not found" }, { status: 404 });
    }

    // Update document
    const updatedDocument = await db.document.update({
      where: { id },
      data: { content },
    });

    return NextResponse.json(updatedDocument);
  } catch (error) {
    console.error("Document update error:", error);
    return NextResponse.json(
      { error: "Failed to update document" },
      { status: 500 }
    );
  }
}

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

    const document = await db.document.findUnique({
      where: { id },
    });

    if (!document || document.userId !== session.user.id) {
      return NextResponse.json({ error: "Document not found" }, { status: 404 });
    }

    return NextResponse.json(document);
  } catch (error) {
    console.error("Document fetch error:", error);
    return NextResponse.json(
      { error: "Failed to fetch document" },
      { status: 500 }
    );
  }
}
