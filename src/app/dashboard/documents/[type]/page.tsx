import { auth } from "@/lib/auth";

import { db } from "@/lib/db";
import { notFound } from "next/navigation";
import { DocumentType } from "@prisma/client";
import { DocumentEditor } from "@/components/editor/document-editor";
import { getDocumentLabel, getDocumentDescription } from "@/lib/documents";

interface PageProps {
  params: Promise<{
    type: string;
  }>;
}

export default async function DocumentPage({ params }: PageProps) {
  const session = await auth();
  const { type } = await params;

  if (!session?.user) {
    return null;
  }

  // Convert URL param to DocumentType enum
  const documentType = type.toUpperCase() as DocumentType;

  // Validate document type
  if (!Object.values(DocumentType).includes(documentType)) {
    notFound();
  }

  // Get or create document
  let document = await db.document.findUnique({
    where: {
      userId_type: {
        userId: session.user.id,
        type: documentType,
      },
    },
  });

  // If document doesn't exist, create it (for frameworks)
  if (!document) {
    document = await db.document.create({
      data: {
        userId: session.user.id,
        type: documentType,
        content: `# ${getDocumentLabel(documentType)}\n\n${getDocumentDescription(
          documentType
        )}\n\n---\n\n*Start writing here...*`,
      },
    });
  }

  return (
    <div className="max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">
          {getDocumentLabel(documentType)}
        </h1>
        <p className="text-slate-600 mt-2">
          {getDocumentDescription(documentType)}
        </p>
      </div>

      <DocumentEditor documentId={document.id} initialContent={document.content} />
    </div>
  );
}
