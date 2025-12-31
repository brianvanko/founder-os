import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import {
  createSupabaseAdmin,
  UPLOADS_BUCKET,
  MAX_FILE_SIZE,
  ALLOWED_FILE_TYPES,
  getUserStoragePath,
} from "@/lib/supabase";

export async function POST(request: NextRequest) {
  const session = await auth();

  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;
    const category = formData.get("category") as string | null;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    // Validate file size
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: "File size exceeds 10MB limit" },
        { status: 400 }
      );
    }

    // Validate file type
    if (!ALLOWED_FILE_TYPES.includes(file.type)) {
      return NextResponse.json(
        {
          error:
            "Invalid file type. Allowed types: PDF, DOCX, TXT, MD",
        },
        { status: 400 }
      );
    }

    // Create storage path
    const timestamp = Date.now();
    const fileName = `${timestamp}-${file.name}`;
    const storagePath = `${getUserStoragePath(
      session.user.id,
      category || undefined
    )}/${fileName}`;

    // Upload to Supabase Storage
    const supabaseAdmin = createSupabaseAdmin();
    const fileBuffer = await file.arrayBuffer();
    const { error: uploadError } = await supabaseAdmin.storage
      .from(UPLOADS_BUCKET)
      .upload(storagePath, fileBuffer, {
        contentType: file.type,
        upsert: false,
      });

    if (uploadError) {
      console.error("Supabase upload error:", uploadError);
      return NextResponse.json(
        { error: "Failed to upload file" },
        { status: 500 }
      );
    }

    // Save metadata to database
    const upload = await db.upload.create({
      data: {
        userId: session.user.id,
        fileName: file.name,
        fileSize: file.size,
        fileType: file.type,
        storagePath,
        category: category || null,
      },
    });

    return NextResponse.json(upload);
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { error: "Failed to upload file" },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  const session = await auth();

  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const searchParams = request.nextUrl.searchParams;
    const category = searchParams.get("category");

    const uploads = await db.upload.findMany({
      where: {
        userId: session.user.id,
        ...(category && { category }),
      },
      orderBy: { uploadedAt: "desc" },
    });

    return NextResponse.json(uploads);
  } catch (error) {
    console.error("Fetch uploads error:", error);
    return NextResponse.json(
      { error: "Failed to fetch uploads" },
      { status: 500 }
    );
  }
}
