"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FutureSelfForm } from "@/components/interviews/future-self-form";
import { FutureSelfContent } from "@/types/interviews";
import Link from "next/link";

export default function FutureSelfPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (data: FutureSelfContent) => {
    setIsSubmitting(true);
    setError("");

    try {
      const response = await fetch("/api/interviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "FUTURE_SELF_INTERVIEW",
          content: data,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to save interview");
      }

      router.push("/dashboard/interviews");
      router.refresh();
    } catch (error: any) {
      setError(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-3xl font-bold text-slate-900">
            Future Self Interview
          </h1>
          <Link
            href="/dashboard/interviews"
            className="text-sm text-slate-600 hover:text-slate-900"
          >
            ← Back
          </Link>
        </div>
        <p className="text-slate-600">
          Interview your future self - create a vivid vision of who you want to
          become
        </p>
      </div>

      {error && (
        <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      <FutureSelfForm onSubmit={handleSubmit} isSubmitting={isSubmitting} />
    </div>
  );
}
