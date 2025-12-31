import { auth } from "@/lib/auth";

import { db } from "@/lib/db";
import Link from "next/link";
import {
  CORE_DOCUMENTS,
  FRAMEWORK_DOCUMENTS,
  getDocumentLabel,
  getDocumentDescription,
} from "@/lib/documents";
import { formatDate } from "@/lib/utils";

export default async function DocumentsPage() {
  const session = await auth();

  if (!session?.user) {
    return null;
  }

  const documents = await db.document.findMany({
    where: { userId: session.user.id },
    orderBy: { updatedAt: "desc" },
  });

  const documentMap = new Map(documents.map((doc) => [doc.type, doc]));

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Documents</h1>
        <p className="text-slate-600 mt-2">
          Your core operating documents and frameworks
        </p>
      </div>

      {/* Core Documents */}
      <div>
        <h2 className="text-xl font-semibold text-slate-900 mb-4">
          Core Documents
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {CORE_DOCUMENTS.map((type) => {
            const doc = documentMap.get(type);
            return (
              <Link
                key={type}
                href={`/dashboard/documents/${type.toLowerCase()}`}
                className="bg-white p-6 rounded-lg border border-slate-200 hover:border-slate-300 transition-colors"
              >
                <h3 className="font-semibold text-slate-900 mb-2">
                  {getDocumentLabel(type)}
                </h3>
                <p className="text-sm text-slate-600 mb-4">
                  {getDocumentDescription(type)}
                </p>
                {doc && (
                  <p className="text-xs text-slate-500">
                    Last updated: {formatDate(doc.updatedAt)}
                  </p>
                )}
              </Link>
            );
          })}
        </div>
      </div>

      {/* Frameworks */}
      <div>
        <h2 className="text-xl font-semibold text-slate-900 mb-4">
          Frameworks
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {FRAMEWORK_DOCUMENTS.map((type) => {
            const doc = documentMap.get(type);
            return (
              <Link
                key={type}
                href={`/dashboard/documents/${type.toLowerCase()}`}
                className="bg-white p-6 rounded-lg border border-slate-200 hover:border-slate-300 transition-colors"
              >
                <h3 className="font-semibold text-slate-900 mb-2">
                  {getDocumentLabel(type)}
                </h3>
                <p className="text-sm text-slate-600 mb-4">
                  {getDocumentDescription(type)}
                </p>
                {doc && (
                  <p className="text-xs text-slate-500">
                    Last updated: {formatDate(doc.updatedAt)}
                  </p>
                )}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
