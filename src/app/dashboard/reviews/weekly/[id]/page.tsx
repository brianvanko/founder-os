"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { formatDate } from "@/lib/utils";
import { WeeklyReviewContent } from "@/types/reviews";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { useToast } from "@/components/ui/toast";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function ViewWeeklyReviewPage({ params }: PageProps) {
  const router = useRouter();
  const { showToast } = useToast();
  const [reviewId, setReviewId] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);
  const [review, setReview] = useState<any>(null);
  const [content, setContent] = useState<WeeklyReviewContent | null>(null);

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
        router.push("/dashboard/reviews/weekly");
        return;
      }
      const data = await response.json();
      if (data.type !== "WEEKLY") {
        router.push("/dashboard/reviews/weekly");
        return;
      }
      setReview(data);
      setContent(data.content);
    } catch (error) {
      router.push("/dashboard/reviews/weekly");
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
      router.push("/dashboard/reviews/weekly");
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
            <p className="text-sm text-slate-500 mt-1">Weekly Review</p>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href={`/dashboard/reviews/weekly/${review.id}/edit`}
              className="px-4 py-2 bg-slate-100 text-slate-900 rounded-lg text-sm font-medium hover:bg-slate-200 transition-colors"
            >
              Edit
            </Link>
            <ConfirmDialog
              title="Delete Review"
              description="Are you sure you want to delete this weekly review? This action cannot be undone."
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
              href="/dashboard/reviews/weekly"
              className="text-sm text-slate-600 hover:text-slate-900"
            >
              ← Back
            </Link>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        {/* Moved the Needle */}
        <div className="bg-white rounded-lg border border-slate-200 p-6">
          <h3 className="text-lg font-semibold text-slate-900 mb-2">
            What moved the needle?
          </h3>
          <p className="text-slate-700 whitespace-pre-wrap">
            {content.movedNeedle}
          </p>
        </div>

        {/* Was Noise */}
        <div className="bg-white rounded-lg border border-slate-200 p-6">
          <h3 className="text-lg font-semibold text-slate-900 mb-2">
            What was just noise?
          </h3>
          <p className="text-slate-700 whitespace-pre-wrap">
            {content.wasNoise}
          </p>
        </div>

        {/* Time Leaked */}
        <div className="bg-white rounded-lg border border-slate-200 p-6">
          <h3 className="text-lg font-semibold text-slate-900 mb-2">
            Where did time leak?
          </h3>
          <p className="text-slate-700 whitespace-pre-wrap">
            {content.timeLeaked}
          </p>
        </div>

        {/* Energy Gained */}
        <div className="bg-white rounded-lg border border-slate-200 p-6">
          <h3 className="text-lg font-semibold text-slate-900 mb-2">
            What gave you energy?
          </h3>
          <p className="text-slate-700 whitespace-pre-wrap">
            {content.energyGained}
          </p>
        </div>

        {/* Energy Drained */}
        <div className="bg-white rounded-lg border border-slate-200 p-6">
          <h3 className="text-lg font-semibold text-slate-900 mb-2">
            What drained your energy?
          </h3>
          <p className="text-slate-700 whitespace-pre-wrap">
            {content.energyDrained}
          </p>
        </div>

        {/* Energy Pattern */}
        <div className="bg-white rounded-lg border border-slate-200 p-6">
          <h3 className="text-lg font-semibold text-slate-900 mb-2">
            Energy pattern this week
          </h3>
          <p className="text-slate-700 whitespace-pre-wrap">
            {content.energyPattern}
          </p>
        </div>

        {/* Strategic Insight */}
        <div className="bg-white rounded-lg border border-slate-200 p-6">
          <h3 className="text-lg font-semibold text-slate-900 mb-2">
            Strategic insight
          </h3>
          <p className="text-slate-700 whitespace-pre-wrap">
            {content.strategicInsight}
          </p>
        </div>

        {/* Proud */}
        <div className="bg-white rounded-lg border border-slate-200 p-6">
          <h3 className="text-lg font-semibold text-slate-900 mb-2">
            What are you proud of?
          </h3>
          <p className="text-slate-700 whitespace-pre-wrap">{content.proud}</p>
        </div>

        {/* Do Differently */}
        <div className="bg-white rounded-lg border border-slate-200 p-6">
          <h3 className="text-lg font-semibold text-slate-900 mb-2">
            What would you do differently?
          </h3>
          <p className="text-slate-700 whitespace-pre-wrap">
            {content.doDifferently}
          </p>
        </div>

        {/* Next Week Priorities */}
        <div className="bg-white rounded-lg border border-slate-200 p-6">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">
            Top 3 priorities for next week
          </h3>
          <ol className="list-decimal list-inside space-y-2">
            {content.nextWeekPriorities.map((priority, index) => (
              <li key={index} className="text-slate-700">
                {priority}
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
}
