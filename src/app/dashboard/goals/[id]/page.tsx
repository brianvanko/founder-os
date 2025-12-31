"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { GoalContent, getStatusLabel, getStatusColor } from "@/types/goals";
import { GoalActions } from "@/components/goals/goal-actions";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { useToast } from "@/components/ui/toast";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function ViewGoalPage({ params }: PageProps) {
  const router = useRouter();
  const { showToast } = useToast();
  const [goalId, setGoalId] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);
  const [goal, setGoal] = useState<any>(null);
  const [content, setContent] = useState<GoalContent | null>(null);

  useEffect(() => {
    params.then((p) => {
      setGoalId(p.id);
      fetchGoal(p.id);
    });
  }, []);

  const fetchGoal = async (id: string) => {
    try {
      const response = await fetch(`/api/goals/${id}`);
      if (!response.ok) {
        router.push("/dashboard/goals");
        return;
      }
      const data = await response.json();
      setGoal(data);
      setContent(data.content);
    } catch (error) {
      router.push("/dashboard/goals");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(`/api/goals/${goalId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete goal");
      }

      showToast("Goal deleted successfully", "success");
      router.push("/dashboard/goals");
      router.refresh();
    } catch (error) {
      showToast("Failed to delete goal. Please try again.", "error");
    }
  };

  if (isLoading) {
    return (
      <div className="max-w-3xl">
        <div className="text-center py-12">
          <p className="text-slate-600">Loading goal...</p>
        </div>
      </div>
    );
  }

  if (!goal || !content) {
    return null;
  }

  return (
    <div className="max-w-3xl">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-3xl font-bold text-slate-900">
                {goal.title}
              </h1>
              {goal.category && (
                <span className="text-sm bg-slate-100 text-slate-700 px-3 py-1 rounded">
                  {goal.category}
                </span>
              )}
            </div>
            {goal.status && (
              <span
                className={`inline-block text-sm px-3 py-1 rounded ${getStatusColor(
                  goal.status
                )}`}
              >
                {getStatusLabel(goal.status)}
              </span>
            )}
          </div>
          <div className="flex items-center gap-3">
            <Link
              href={`/dashboard/goals/${goal.id}/edit`}
              className="px-4 py-2 bg-slate-100 text-slate-900 rounded-lg text-sm font-medium hover:bg-slate-200 transition-colors"
            >
              Edit Goal
            </Link>
            <ConfirmDialog
              title="Delete Goal"
              description="Are you sure you want to delete this goal? This action cannot be undone."
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
              href="/dashboard/goals"
              className="text-sm text-slate-600 hover:text-slate-900"
            >
              ← Back
            </Link>
          </div>
        </div>
      </div>

      {/* Goal Actions */}
      <GoalActions goalId={goal.id} currentProgress={goal.progress} currentStatus={goal.status} />

      <div className="space-y-6 mt-6">
        {/* What */}
        <div className="bg-white rounded-lg border border-slate-200 p-6">
          <h3 className="text-lg font-semibold text-slate-900 mb-2">What</h3>
          <p className="text-slate-700 whitespace-pre-wrap">{content.what}</p>
        </div>

        {/* Why */}
        <div className="bg-white rounded-lg border border-slate-200 p-6">
          <h3 className="text-lg font-semibold text-slate-900 mb-2">Why</h3>
          <p className="text-slate-700 whitespace-pre-wrap">{content.why}</p>
        </div>

        {/* Success Looks Like */}
        <div className="bg-white rounded-lg border border-slate-200 p-6">
          <h3 className="text-lg font-semibold text-slate-900 mb-2">
            Success Looks Like
          </h3>
          <p className="text-slate-700 whitespace-pre-wrap">
            {content.successLooksLike}
          </p>
        </div>

        {/* First Action */}
        <div className="bg-white rounded-lg border border-slate-200 p-6">
          <h3 className="text-lg font-semibold text-slate-900 mb-2">
            First Action
          </h3>
          <p className="text-slate-700 whitespace-pre-wrap">
            {content.firstAction}
          </p>
        </div>

        {/* Milestones */}
        {(content.milestones.q1 ||
          content.milestones.q2 ||
          content.milestones.q3 ||
          content.milestones.q4) && (
          <div className="bg-white rounded-lg border border-slate-200 p-6">
            <h3 className="text-lg font-semibold text-slate-900 mb-4">
              Key Milestones
            </h3>
            <div className="space-y-3">
              {(["q1", "q2", "q3", "q4"] as const).map(
                (quarter) =>
                  content.milestones[quarter] && (
                    <div key={quarter}>
                      <h4 className="text-sm font-medium text-slate-700">
                        {quarter.toUpperCase()}
                      </h4>
                      <p className="text-slate-600 text-sm">
                        {content.milestones[quarter]}
                      </p>
                    </div>
                  )
              )}
            </div>
          </div>
        )}

        {/* Constraints */}
        {content.constraints && (
          <div className="bg-white rounded-lg border border-slate-200 p-6">
            <h3 className="text-lg font-semibold text-slate-900 mb-2">
              Constraints / Obstacles
            </h3>
            <p className="text-slate-700 whitespace-pre-wrap">
              {content.constraints}
            </p>
          </div>
        )}

        {/* What Needs to Be True */}
        {content.whatNeedsToBeTrue && (
          <div className="bg-white rounded-lg border border-slate-200 p-6">
            <h3 className="text-lg font-semibold text-slate-900 mb-2">
              What Needs to Be True
            </h3>
            <p className="text-slate-700 whitespace-pre-wrap">
              {content.whatNeedsToBeTrue}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
