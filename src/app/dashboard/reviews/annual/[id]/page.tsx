"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { AnnualReviewContent } from "@/types/reviews";
import { formatDate } from "@/lib/utils";
import { useToast } from "@/components/ui/toast";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";

export default function AnnualReviewDetailPage() {
  const router = useRouter();
  const params = useParams();
  const { showToast } = useToast();
  const [review, setReview] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

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

  const handleDelete = async () => {
    try {
      const response = await fetch(`/api/reviews/${params.id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete review");

      showToast("Annual review deleted successfully", "success");
      router.push("/dashboard/reviews/annual");
      router.refresh();
    } catch (error: any) {
      showToast(error.message, "error");
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
          href="/dashboard/reviews/annual"
          className="text-slate-900 hover:underline mt-4 inline-block"
        >
          ← Back to Annual Reviews
        </Link>
      </div>
    );
  }

  const content: AnnualReviewContent = JSON.parse(review.content);

  return (
    <div className="max-w-3xl">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">
              Annual Review - {formatDate(review.date)}
            </h1>
            <p className="text-sm text-slate-600 mt-1">
              Theme: <span className="font-medium">{content.nextYearTheme}</span>
            </p>
          </div>
          <Link
            href="/dashboard/reviews/annual"
            className="text-sm text-slate-600 hover:text-slate-900"
          >
            ← Back
          </Link>
        </div>
        <div className="flex gap-3">
          <Link
            href={`/dashboard/reviews/annual/${review.id}/edit`}
            className="px-4 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors"
          >
            Edit
          </Link>
          <ConfirmDialog
            title="Delete Annual Review"
            description="Are you sure you want to delete this annual review? This action cannot be undone."
            confirmText="Delete"
            variant="danger"
            onConfirm={handleDelete}
          >
            {({ onClick }) => (
              <button
                onClick={onClick}
                className="px-4 py-2 border border-red-300 text-red-700 rounded-lg hover:bg-red-50 transition-colors"
              >
                Delete
              </button>
            )}
          </ConfirmDialog>
        </div>
      </div>

      <div className="space-y-6">
        {/* Year Summary */}
        <div className="bg-white rounded-lg border border-slate-200 p-6">
          <h2 className="text-lg font-semibold text-slate-900 mb-2">
            Year Summary
          </h2>
          <p className="text-slate-900 whitespace-pre-wrap">{content.yearSummary}</p>
        </div>

        {/* Most Proud */}
        <div className="bg-white rounded-lg border border-slate-200 p-6">
          <h2 className="text-lg font-semibold text-slate-900 mb-4">
            Most Proud Of
          </h2>
          <div className="space-y-3">
            {content.mostProud.map((achievement, index) => (
              <div key={index}>
                <div className="text-sm font-medium text-slate-700 mb-1">
                  Achievement {index + 1}
                </div>
                <div className="text-slate-900">{achievement}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Best Decision */}
        <div className="bg-white rounded-lg border border-slate-200 p-6">
          <h2 className="text-lg font-semibold text-slate-900 mb-2">
            Best Decision
          </h2>
          <p className="text-slate-900 whitespace-pre-wrap">{content.bestDecision}</p>
        </div>

        {/* Worst Decision */}
        <div className="bg-white rounded-lg border border-slate-200 p-6">
          <h2 className="text-lg font-semibold text-slate-900 mb-2">
            Worst Decision
          </h2>
          <p className="text-slate-900 whitespace-pre-wrap">{content.worstDecision}</p>
        </div>

        {/* Energy */}
        <div className="bg-white rounded-lg border border-slate-200 p-6">
          <h2 className="text-lg font-semibold text-slate-900 mb-4">
            Energy Patterns
          </h2>
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-medium text-slate-700 mb-2">
                What Gave You Energy
              </h3>
              <p className="text-slate-900 whitespace-pre-wrap">{content.energyGained}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-slate-700 mb-2">
                What Drained Your Energy
              </h3>
              <p className="text-slate-900 whitespace-pre-wrap">{content.energyDrained}</p>
            </div>
          </div>
        </div>

        {/* Surprised */}
        <div className="bg-white rounded-lg border border-slate-200 p-6">
          <h2 className="text-lg font-semibold text-slate-900 mb-2">
            What Surprised You Most
          </h2>
          <p className="text-slate-900 whitespace-pre-wrap">{content.surprised}</p>
        </div>

        {/* Relationships */}
        <div className="bg-white rounded-lg border border-slate-200 p-6">
          <h2 className="text-lg font-semibold text-slate-900 mb-4">
            Relationships
          </h2>
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-medium text-slate-700 mb-2">
                Added to Your Life
              </h3>
              <p className="text-slate-900 whitespace-pre-wrap">{content.relationships.added}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-slate-700 mb-2">
                Neglected
              </h3>
              <p className="text-slate-900 whitespace-pre-wrap">{content.relationships.neglected}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-slate-700 mb-2">
                Got Stronger
              </h3>
              <p className="text-slate-900 whitespace-pre-wrap">{content.relationships.stronger}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-slate-700 mb-2">
                Got Weaker
              </h3>
              <p className="text-slate-900 whitespace-pre-wrap">{content.relationships.weaker}</p>
            </div>
          </div>
        </div>

        {/* Patterns */}
        <div className="bg-white rounded-lg border border-slate-200 p-6">
          <h2 className="text-lg font-semibold text-slate-900 mb-2">
            Patterns Noticed
          </h2>
          <p className="text-slate-900 whitespace-pre-wrap">{content.patterns}</p>
        </div>

        {/* Next Year Goals */}
        <div className="bg-white rounded-lg border border-slate-200 p-6">
          <h2 className="text-lg font-semibold text-slate-900 mb-4">
            Next Year Goals
          </h2>
          <div className="space-y-3">
            {content.nextYearGoals.map((goal, index) => (
              <div key={index}>
                <div className="text-sm font-medium text-slate-700 mb-1">
                  Goal {index + 1}
                </div>
                <div className="text-slate-900">{goal}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
