"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { DailyReviewForm } from "@/components/reviews/daily-review-form";
import { DailyReviewContent } from "@/types/reviews";
import Link from "next/link";

export default function NewDailyReviewPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (data: DailyReviewContent) => {
    setIsSubmitting(true);
    setError("");

    try {
      const response = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "DAILY",
          date: new Date().toISOString(),
          content: data,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to save review");
      }

      router.push("/dashboard/reviews/daily");
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
            Daily Check-in
          </h1>
          <Link
            href="/dashboard/reviews/daily"
            className="text-sm text-slate-600 hover:text-slate-900"
          >
            ← Back to reviews
          </Link>
        </div>
        <p className="text-slate-600">
          {new Date().toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
        <p className="text-sm text-slate-500 mt-2">
          Takes about 5 minutes. Answer honestly — this is private.
        </p>
      </div>

      {error && (
        <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      <DailyReviewForm onSubmit={handleSubmit} isSubmitting={isSubmitting} />
    </div>
  );
}
