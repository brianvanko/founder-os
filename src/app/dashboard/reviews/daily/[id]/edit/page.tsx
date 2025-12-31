"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { DailyReviewForm } from "@/components/reviews/daily-review-form";
import { DailyReviewContent } from "@/types/reviews";
import Link from "next/link";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function EditDailyReviewPage({ params }: PageProps) {
  const router = useRouter();
  const [reviewId, setReviewId] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [reviewData, setReviewData] = useState<DailyReviewContent | null>(null);
  const [reviewDate, setReviewDate] = useState<string>("");

  useEffect(() => {
    params.then((p) => {
      setReviewId(p.id);
      fetchReview(p.id);
    });
  }, []);

  const fetchReview = async (id: string) => {
    try {
      const response = await fetch(`/api/reviews/${id}`);
      if (!response.ok) throw new Error("Failed to fetch review");

      const review = await response.json();
      setReviewData(review.content);
      setReviewDate(
        new Date(review.date).toLocaleDateString("en-US", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        })
      );
    } catch (error) {
      setError("Failed to load review");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (data: DailyReviewContent) => {
    setIsSubmitting(true);
    setError("");

    try {
      const response = await fetch(`/api/reviews/${reviewId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: data }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to update review");
      }

      router.push(`/dashboard/reviews/daily/${reviewId}`);
      router.refresh();
    } catch (error: any) {
      setError(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="max-w-3xl">
        <div className="text-center py-12">
          <p className="text-slate-600">Loading review...</p>
        </div>
      </div>
    );
  }

  if (!reviewData) {
    return (
      <div className="max-w-3xl">
        <div className="text-center py-12">
          <p className="text-red-600">Failed to load review</p>
          <Link
            href="/dashboard/reviews/daily"
            className="text-slate-600 hover:text-slate-900 mt-4 inline-block"
          >
            ← Back to reviews
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-3xl font-bold text-slate-900">
            Edit Daily Check-in
          </h1>
          <Link
            href={`/dashboard/reviews/daily/${reviewId}`}
            className="text-sm text-slate-600 hover:text-slate-900"
          >
            ← Cancel
          </Link>
        </div>
        <p className="text-slate-600">{reviewDate}</p>
      </div>

      {error && (
        <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      <DailyReviewForm
        initialData={reviewData}
        onSubmit={handleSubmit}
        isSubmitting={isSubmitting}
      />
    </div>
  );
}
