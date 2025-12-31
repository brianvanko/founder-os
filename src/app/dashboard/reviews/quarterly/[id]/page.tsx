"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { QuarterlyReviewContent } from "@/types/reviews";
import { formatDate } from "@/lib/utils";
import { useToast } from "@/components/ui/toast";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";

export default function QuarterlyReviewDetailPage() {
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

      showToast("Quarterly review deleted successfully", "success");
      router.push("/dashboard/reviews/quarterly");
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
          href="/dashboard/reviews/quarterly"
          className="text-slate-900 hover:underline mt-4 inline-block"
        >
          ← Back to Quarterly Reviews
        </Link>
      </div>
    );
  }

  const content: QuarterlyReviewContent = JSON.parse(review.content);

  const lifePillars = [
    { key: "career", label: "Career & Purpose" },
    { key: "relationships", label: "Relationships" },
    { key: "health", label: "Health & Energy" },
    { key: "meaning", label: "Meaning & Growth" },
    { key: "finances", label: "Finances" },
    { key: "fun", label: "Fun & Adventure" },
  ] as const;

  return (
    <div className="max-w-3xl">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-3xl font-bold text-slate-900">
            Quarterly Review - {formatDate(review.date)}
          </h1>
          <Link
            href="/dashboard/reviews/quarterly"
            className="text-sm text-slate-600 hover:text-slate-900"
          >
            ← Back
          </Link>
        </div>
        <div className="flex gap-3">
          <Link
            href={`/dashboard/reviews/quarterly/${review.id}/edit`}
            className="px-4 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors"
          >
            Edit
          </Link>
          <ConfirmDialog
            title="Delete Quarterly Review"
            description="Are you sure you want to delete this quarterly review? This action cannot be undone."
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
        {/* Biggest Wins */}
        <div className="bg-white rounded-lg border border-slate-200 p-6">
          <h2 className="text-lg font-semibold text-slate-900 mb-4">
            Top 3 Biggest Wins
          </h2>
          <div className="space-y-3">
            {content.biggestWins.map((win, index) => (
              <div key={index}>
                <div className="text-sm font-medium text-slate-700 mb-1">
                  Win {index + 1}
                </div>
                <div className="text-slate-900">{win}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Biggest Challenges */}
        <div className="bg-white rounded-lg border border-slate-200 p-6">
          <h2 className="text-lg font-semibold text-slate-900 mb-4">
            Top 3 Biggest Challenges
          </h2>
          <div className="space-y-3">
            {content.biggestChallenges.map((challenge, index) => (
              <div key={index}>
                <div className="text-sm font-medium text-slate-700 mb-1">
                  Challenge {index + 1}
                </div>
                <div className="text-slate-900">{challenge}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Surprised */}
        <div className="bg-white rounded-lg border border-slate-200 p-6">
          <h2 className="text-lg font-semibold text-slate-900 mb-2">
            What Surprised You?
          </h2>
          <p className="text-slate-900 whitespace-pre-wrap">{content.surprised}</p>
        </div>

        {/* Disappointed */}
        <div className="bg-white rounded-lg border border-slate-200 p-6">
          <h2 className="text-lg font-semibold text-slate-900 mb-2">
            What Disappointed You?
          </h2>
          <p className="text-slate-900 whitespace-pre-wrap">{content.disappointed}</p>
        </div>

        {/* Life Map Ratings */}
        <div className="bg-white rounded-lg border border-slate-200 p-6">
          <h2 className="text-lg font-semibold text-slate-900 mb-4">
            Life Map Ratings
          </h2>
          <div className="space-y-4">
            {lifePillars.map((pillar) => {
              const rating = content.lifePillarRatings[pillar.key];
              return (
                <div key={pillar.key}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-slate-700">
                      {pillar.label}
                    </span>
                    <span className="text-2xl font-bold text-slate-900">
                      {rating}
                    </span>
                  </div>
                  <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-slate-900 rounded-full transition-all"
                      style={{ width: `${rating * 10}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Misalignments */}
        <div className="bg-white rounded-lg border border-slate-200 p-6">
          <h2 className="text-lg font-semibold text-slate-900 mb-2">
            Misalignments
          </h2>
          <p className="text-slate-900 whitespace-pre-wrap">{content.misalignments}</p>
        </div>

        {/* Next Quarter Priorities */}
        <div className="bg-white rounded-lg border border-slate-200 p-6">
          <h2 className="text-lg font-semibold text-slate-900 mb-4">
            Top 3 Priorities for Next Quarter
          </h2>
          <div className="space-y-3">
            {content.nextQuarterPriorities.map((priority, index) => (
              <div key={index}>
                <div className="text-sm font-medium text-slate-700 mb-1">
                  Priority {index + 1}
                </div>
                <div className="text-slate-900">{priority}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
