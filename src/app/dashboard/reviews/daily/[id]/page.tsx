"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { formatDate } from "@/lib/utils";
import { DailyReviewContent } from "@/types/reviews";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { useToast } from "@/components/ui/toast";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function ViewDailyReviewPage({ params }: PageProps) {
  const router = useRouter();
  const { showToast } = useToast();
  const [reviewId, setReviewId] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);
  const [review, setReview] = useState<any>(null);
  const [content, setContent] = useState<DailyReviewContent | null>(null);

  useEffect(() => {
    params.then((p) => {
      setReviewId(p.id);
      fetchReview(p.id);
    });
  }, []);

  const fetchReview = async (id: string) => {
    try {
      const response = await fetch(`/api/reviews/${id}`);
      if (!response.ok) {
        router.push("/dashboard/reviews/daily");
        return;
      }
      const data = await response.json();
      if (data.type !== "DAILY") {
        router.push("/dashboard/reviews/daily");
        return;
      }
      setReview(data);
      setContent(data.content);
    } catch (error) {
      router.push("/dashboard/reviews/daily");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(`/api/reviews/${reviewId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete review");
      }

      showToast("Review deleted successfully", "success");
      router.push("/dashboard/reviews/daily");
      router.refresh();
    } catch (error) {
      showToast("Failed to delete review. Please try again.", "error");
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

  if (!review || !content) {
    return null;
  }

  return (
    <div className="max-w-3xl">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">
              {formatDate(review.date)}
            </h1>
            <p className="text-sm text-slate-500 mt-1">Daily Check-in</p>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href={`/dashboard/reviews/daily/${review.id}/edit`}
              className="px-4 py-2 bg-slate-100 text-slate-900 rounded-lg text-sm font-medium hover:bg-slate-200 transition-colors"
            >
              Edit
            </Link>
            <ConfirmDialog
              title="Delete Review"
              description="Are you sure you want to delete this daily check-in? This action cannot be undone."
              confirmText="Delete"
              variant="danger"
              onConfirm={handleDelete}
            >
              {({ onClick }) => (
                <button
                  onClick={onClick}
                  className="px-4 py-2 bg-red-50 text-red-600 rounded-lg text-sm font-medium hover:bg-red-100 transition-colors"
                >
                  Delete
                </button>
              )}
            </ConfirmDialog>
            <Link
              href="/dashboard/reviews/daily"
              className="text-sm text-slate-600 hover:text-slate-900"
            >
              ← Back
            </Link>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        {/* Energy Level */}
        <div className="bg-white rounded-lg border border-slate-200 p-6">
          <h3 className="text-lg font-semibold text-slate-900 mb-2">
            Energy Level
          </h3>
          <div className="flex items-center gap-4">
            <div className="text-4xl font-bold text-slate-900">
              {content.energyLevel}
              <span className="text-2xl text-slate-500">/10</span>
            </div>
            <div className="flex-1 h-2 bg-slate-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-slate-900 rounded-full"
                style={{ width: `${content.energyLevel * 10}%` }}
              />
            </div>
          </div>
          {content.energyNotes && (
            <p className="text-slate-700 mt-4">{content.energyNotes}</p>
          )}
        </div>

        {/* Meaningful Win */}
        <div className="bg-white rounded-lg border border-slate-200 p-6">
          <h3 className="text-lg font-semibold text-slate-900 mb-2">
            Meaningful Win
          </h3>
          <p className="text-slate-700 whitespace-pre-wrap">
            {content.meaningfulWin}
          </p>
        </div>

        {/* Friction Point */}
        <div className="bg-white rounded-lg border border-slate-200 p-6">
          <h3 className="text-lg font-semibold text-slate-900 mb-2">
            Friction Point
          </h3>
          <p className="text-slate-700 whitespace-pre-wrap">
            {content.frictionPoint}
          </p>
        </div>

        {/* Let Go Of */}
        <div className="bg-white rounded-lg border border-slate-200 p-6">
          <h3 className="text-lg font-semibold text-slate-900 mb-2">
            Let Go Of
          </h3>
          <p className="text-slate-700 whitespace-pre-wrap">
            {content.letGoOf}
          </p>
        </div>

        {/* Tomorrow Priority */}
        <div className="bg-white rounded-lg border border-slate-200 p-6">
          <h3 className="text-lg font-semibold text-slate-900 mb-2">
            Tomorrow's Priority
          </h3>
          <p className="text-slate-700 whitespace-pre-wrap">
            {content.tomorrowPriority}
          </p>
        </div>

        {/* Additional Notes */}
        {content.notes && (
          <div className="bg-white rounded-lg border border-slate-200 p-6">
            <h3 className="text-lg font-semibold text-slate-900 mb-2">
              Additional Notes
            </h3>
            <p className="text-slate-700 whitespace-pre-wrap">{content.notes}</p>
          </div>
        )}
      </div>
    </div>
  );
}
