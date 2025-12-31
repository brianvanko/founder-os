"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { GoalForm } from "@/components/goals/goal-form";
import { GoalContent } from "@/types/goals";
import Link from "next/link";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function EditGoalPage({ params }: PageProps) {
  const router = useRouter();
  const [goalId, setGoalId] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [goalData, setGoalData] = useState<{
    title: string;
    category: string | null;
    content: GoalContent;
  } | null>(null);

  useEffect(() => {
    params.then((p) => {
      setGoalId(p.id);
      fetchGoal(p.id);
    });
  }, []);

  const fetchGoal = async (id: string) => {
    try {
      const response = await fetch(`/api/goals/${id}`);
      if (!response.ok) throw new Error("Failed to fetch goal");

      const goal = await response.json();
      setGoalData({
        title: goal.title,
        category: goal.category,
        content: goal.content,
      });
    } catch (error) {
      setError("Failed to load goal");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (data: {
    title: string;
    category: string;
    content: GoalContent;
  }) => {
    setIsSubmitting(true);
    setError("");

    try {
      const response = await fetch(`/api/goals/${goalId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to update goal");
      }

      router.push(`/dashboard/goals/${goalId}`);
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
          <p className="text-slate-600">Loading goal...</p>
        </div>
      </div>
    );
  }

  if (!goalData) {
    return (
      <div className="max-w-3xl">
        <div className="text-center py-12">
          <p className="text-red-600">Failed to load goal</p>
          <Link
            href="/dashboard/goals"
            className="text-slate-600 hover:text-slate-900 mt-4 inline-block"
          >
            ← Back to goals
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-3xl font-bold text-slate-900">Edit Goal</h1>
          <Link
            href={`/dashboard/goals/${goalId}`}
            className="text-sm text-slate-600 hover:text-slate-900"
          >
            ← Cancel
          </Link>
        </div>
        <p className="text-slate-600">Update your goal details</p>
      </div>

      {error && (
        <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      <GoalForm
        initialData={goalData}
        onSubmit={handleSubmit}
        isSubmitting={isSubmitting}
      />
    </div>
  );
}
