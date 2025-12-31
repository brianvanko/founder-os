"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { GoalForm } from "@/components/goals/goal-form";
import { GoalContent } from "@/types/goals";
import Link from "next/link";

export default function NewGoalPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const timeframe = searchParams.get("timeframe") || "ONE_YEAR";
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (data: {
    title: string;
    category: string;
    content: GoalContent;
  }) => {
    setIsSubmitting(true);
    setError("");

    try {
      const response = await fetch("/api/goals", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          timeframe,
          ...data,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to create goal");
      }

      const redirectMap: Record<string, string> = {
        ONE_YEAR: "/dashboard/goals/1-year",
        THREE_YEAR: "/dashboard/goals/3-year",
        TEN_YEAR: "/dashboard/goals/10-year",
      };
      router.push(redirectMap[timeframe] || "/dashboard/goals");
      router.refresh();
    } catch (error: any) {
      setError(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const timeframeLabels: Record<string, { title: string; description: string }> = {
    ONE_YEAR: {
      title: "Create 1-Year Goal",
      description: "Define a specific, measurable goal for the next 12 months.",
    },
    THREE_YEAR: {
      title: "Create 3-Year Goal",
      description: "Define your medium-term vision for the next 36 months.",
    },
    TEN_YEAR: {
      title: "Create 10-Year Goal",
      description: "Define your long-term aspirations for the next decade.",
    },
  };

  const labels = timeframeLabels[timeframe] || timeframeLabels.ONE_YEAR;

  return (
    <div className="max-w-3xl">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-3xl font-bold text-slate-900">{labels.title}</h1>
          <Link
            href="/dashboard/goals"
            className="text-sm text-slate-600 hover:text-slate-900"
          >
            ← Back to goals
          </Link>
        </div>
        <p className="text-slate-600">{labels.description}</p>
      </div>

      {error && (
        <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      <GoalForm onSubmit={handleSubmit} isSubmitting={isSubmitting} />
    </div>
  );
}
