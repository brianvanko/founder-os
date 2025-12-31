"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { GoalForm } from "@/components/goals/goal-form";
import { GoalContent } from "@/types/goals";
import Link from "next/link";

export default function NewGoalPage() {
  const router = useRouter();
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
          timeframe: "ONE_YEAR",
          ...data,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to create goal");
      }

      router.push("/dashboard/goals");
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
            Create 1-Year Goal
          </h1>
          <Link
            href="/dashboard/goals"
            className="text-sm text-slate-600 hover:text-slate-900"
          >
            ← Back to goals
          </Link>
        </div>
        <p className="text-slate-600">
          Define a specific, measurable goal for the next 12 months.
        </p>
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
