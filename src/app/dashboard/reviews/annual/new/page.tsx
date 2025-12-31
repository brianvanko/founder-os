"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AnnualReviewForm } from "@/components/reviews/annual-review-form";
import { AnnualReviewContent } from "@/types/reviews";
import Link from "next/link";

export default function NewAnnualReviewPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (data: AnnualReviewContent) => {
    setIsSubmitting(true);
    setError("");

    try {
      const response = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "ANNUAL",
          date: new Date().toISOString(),
          content: data,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to create review");
      }

      const review = await response.json();
      router.push(`/dashboard/reviews/annual/${review.id}`);
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
            Annual Review
          </h1>
          <Link
            href="/dashboard/reviews/annual"
            className="text-sm text-slate-600 hover:text-slate-900"
          >
            ← Back
          </Link>
        </div>
        <p className="text-slate-600">
          Reflect on the year and set your direction
        </p>
      </div>

      {error && (
        <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      <AnnualReviewForm onSubmit={handleSubmit} isSubmitting={isSubmitting} />
    </div>
  );
}
