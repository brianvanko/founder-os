import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { createSupabaseAdmin, UPLOADS_BUCKET } from "@/lib/supabase";

interface RouteContext {
  params: Promise<{ id: string }>;
}

export async function GET(request: NextRequest, context: RouteContext) {
  const session = await auth();

  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await context.params;

    // Get upload metadata
    const upload = await db.upload.findUnique({
      where: { id },
    });

    if (!upload || upload.userId !== session.user.id) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    // Generate signed URL (1 hour expiry)
    const supabaseAdmin = createSupabaseAdmin();
    const { data, error } = await supabaseAdmin.storage
      .from(UPLOADS_BUCKET)
      .createSignedUrl(upload.storagePath, 3600);

    if (error) {
      console.error("Signed URL error:", error);
      return NextResponse.json(
        { error: "Failed to generate download URL" },
        { status: 500 }
      );
    }

    return NextResponse.json({ url: data.signedUrl });
  } catch (error) {
    console.error("Get upload error:", error);
    return NextResponse.json(
      { error: "Failed to get upload" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest, context: RouteContext) {
  const session = await auth();

  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await context.params;

    // Get upload metadata
    const upload = await db.upload.findUnique({
      where: { id },
    });

    if (!upload || upload.userId !== session.user.id) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    // Delete from Supabase Storage
    const supabaseAdmin = createSupabaseAdmin();
    const { error: deleteError } = await supabaseAdmin.storage
      .from(UPLOADS_BUCKET)
      .remove([upload.storagePath]);

    if (deleteError) {
      console.error("Supabase delete error:", deleteError);
      // Continue with database deletion even if storage delete fails
    }

    // Delete from database
    await db.upload.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Delete upload error:", error);
    return NextResponse.json(
      { error: "Failed to delete upload" },
      { status: 500 }
    );
  }
}
