"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { QuarterlyReviewForm } from "@/components/reviews/quarterly-review-form";
import { QuarterlyReviewContent } from "@/types/reviews";
import Link from "next/link";
import { useToast } from "@/components/ui/toast";

export default function EditQuarterlyReviewPage() {
  const router = useRouter();
  const params = useParams();
  const { showToast } = useToast();
  const [review, setReview] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchReview = async () => {
      try {
        const response = await fetch(`/api/reviews/${params.id}`);
        if (!response.ok) throw new Error("Failed to fetch review");
        const data = await response.json();
        setReview(data);
      } catch (error: any) {
        showToast(error.message, "error");
      } finally {
        setIsLoading(false);
      }
    };

    fetchReview();
  }, [params.id, showToast]);

  const handleSubmit = async (data: QuarterlyReviewContent) => {
    setIsSubmitting(true);
    setError("");

    try {
      const response = await fetch(`/api/reviews/${params.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          content: data,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to update review");
      }

      showToast("Quarterly review updated successfully", "success");
      router.push(`/dashboard/reviews/quarterly/${params.id}`);
      router.refresh();
    } catch (error: any) {
      setError(error.message);
      showToast(error.message, "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-slate-600">Loading...</div>
      </div>
    );
  }

  if (!review) {
    return (
      <div className="text-center py-12">
        <p className="text-slate-600">Review not found</p>
        <Link
          href="/dashboard/reviews/quarterly"
          className="text-slate-900 hover:underline mt-4 inline-block"
        >
          ← Back to Quarterly Reviews
        </Link>
      </div>
    );
  }

  const content: QuarterlyReviewContent = JSON.parse(review.content);

  return (
    <div className="max-w-3xl">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-3xl font-bold text-slate-900">
            Edit Quarterly Review
          </h1>
          <Link
            href={`/dashboard/reviews/quarterly/${review.id}`}
            className="text-sm text-slate-600 hover:text-slate-900"
          >
            ← Back
          </Link>
        </div>
      </div>

      {error && (
        <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      <QuarterlyReviewForm
        initialData={content}
        onSubmit={handleSubmit}
        isSubmitting={isSubmitting}
      />
    </div>
  );
}
