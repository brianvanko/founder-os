"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { WeeklyReviewForm } from "@/components/reviews/weekly-review-form";
import { WeeklyReviewContent } from "@/types/reviews";
import Link from "next/link";

export default function NewWeeklyReviewPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (data: WeeklyReviewContent) => {
    setIsSubmitting(true);
    setError("");

    try {
      const response = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "WEEKLY",
          date: new Date().toISOString(),
          content: data,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to create review");
      }

      const review = await response.json();
      router.push(`/dashboard/reviews/weekly/${review.id}`);
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
            Weekly Review
          </h1>
          <Link
            href="/dashboard/reviews/weekly"
            className="text-sm text-slate-600 hover:text-slate-900"
          >
            ← Back
          </Link>
        </div>
        <p className="text-slate-600">
          Reflect on the past week and plan for the next
        </p>
      </div>

      {error && (
        <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      <WeeklyReviewForm onSubmit={handleSubmit} isSubmitting={isSubmitting} />
    </div>
  );
}
