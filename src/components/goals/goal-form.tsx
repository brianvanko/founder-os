"use client";

import { useState } from "react";
import { GoalContent, GOAL_CATEGORIES, GoalCategory } from "@/types/goals";

interface GoalFormProps {
  initialData?: {
    title: string;
    category: string | null;
    content: GoalContent;
  };
  onSubmit: (data: {
    title: string;
    category: string;
    content: GoalContent;
  }) => Promise<void>;
  isSubmitting?: boolean;
}

export function GoalForm({
  initialData,
  onSubmit,
  isSubmitting = false,
}: GoalFormProps) {
  const [title, setTitle] = useState(initialData?.title || "");
  const [category, setCategory] = useState<string>(
    initialData?.category || "Business"
  );
  const [content, setContent] = useState<GoalContent>(
    initialData?.content || {
      what: "",
      why: "",
      successLooksLike: "",
      firstAction: "",
      milestones: {},
    }
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit({ title, category, content });
  };

  const updateContent = <K extends keyof GoalContent>(
    field: K,
    value: GoalContent[K]
  ) => {
    setContent((prev) => ({ ...prev, [field]: value }));
  };

  const updateMilestone = (quarter: "q1" | "q2" | "q3" | "q4", value: string) => {
    setContent((prev) => ({
      ...prev,
      milestones: { ...prev.milestones, [quarter]: value },
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Title and Category */}
      <div className="bg-white rounded-lg border border-slate-200 p-6 space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Goal Title *
          </label>
          <input
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g., Reach $2M ARR"
            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Category
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent"
          >
            {GOAL_CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* What */}
      <div className="bg-white rounded-lg border border-slate-200 p-6">
        <label className="block text-lg font-semibold text-slate-900 mb-2">
          What *
        </label>
        <p className="text-sm text-slate-600 mb-4">
          Specific, measurable outcome
        </p>
        <textarea
          required
          value={content.what}
          onChange={(e) => updateContent("what", e.target.value)}
          placeholder="e.g., Grow annual recurring revenue from $500K to $2M by December 31"
          className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent"
          rows={3}
        />
      </div>

      {/* Why */}
      <div className="bg-white rounded-lg border border-slate-200 p-6">
        <label className="block text-lg font-semibold text-slate-900 mb-2">
          Why *
        </label>
        <p className="text-sm text-slate-600 mb-4">
          Why does this matter? What changes if you achieve it?
        </p>
        <textarea
          required
          value={content.why}
          onChange={(e) => updateContent("why", e.target.value)}
          placeholder="e.g., This revenue level allows us to hire key team members and gives us 18 months of runway"
          className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent"
          rows={3}
        />
      </div>

      {/* Success Looks Like */}
      <div className="bg-white rounded-lg border border-slate-200 p-6">
        <label className="block text-lg font-semibold text-slate-900 mb-2">
          Success Looks Like *
        </label>
        <p className="text-sm text-slate-600 mb-4">
          How will you know you hit it? Be specific.
        </p>
        <textarea
          required
          value={content.successLooksLike}
          onChange={(e) => updateContent("successLooksLike", e.target.value)}
          placeholder="e.g., $2M in annual contracts signed, 80%+ renewal rate, profitable growth"
          className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent"
          rows={3}
        />
      </div>

      {/* First Action */}
      <div className="bg-white rounded-lg border border-slate-200 p-6">
        <label className="block text-lg font-semibold text-slate-900 mb-2">
          First Action *
        </label>
        <p className="text-sm text-slate-600 mb-4">
          What's the very next step?
        </p>
        <textarea
          required
          value={content.firstAction}
          onChange={(e) => updateContent("firstAction", e.target.value)}
          placeholder="e.g., Review current sales funnel and identify bottlenecks"
          className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent"
          rows={2}
        />
      </div>

      {/* Milestones */}
      <div className="bg-white rounded-lg border border-slate-200 p-6">
        <label className="block text-lg font-semibold text-slate-900 mb-2">
          Key Milestones (Optional)
        </label>
        <p className="text-sm text-slate-600 mb-4">
          Break down the goal by quarter
        </p>
        <div className="space-y-3">
          {(["q1", "q2", "q3", "q4"] as const).map((quarter) => (
            <div key={quarter}>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                {quarter.toUpperCase()}
              </label>
              <input
                type="text"
                value={content.milestones[quarter] || ""}
                onChange={(e) => updateMilestone(quarter, e.target.value)}
                placeholder={`e.g., Q1: ${
                  quarter === "q1"
                    ? "Reach $750K ARR"
                    : quarter === "q2"
                    ? "Reach $1.2M ARR"
                    : quarter === "q3"
                    ? "Reach $1.6M ARR"
                    : "Reach $2M ARR"
                }`}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent text-sm"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Constraints */}
      <div className="bg-white rounded-lg border border-slate-200 p-6">
        <label className="block text-lg font-semibold text-slate-900 mb-2">
          Constraints / Obstacles (Optional)
        </label>
        <p className="text-sm text-slate-600 mb-4">
          What might get in the way?
        </p>
        <textarea
          value={content.constraints || ""}
          onChange={(e) => updateContent("constraints", e.target.value)}
          placeholder="e.g., Limited sales team capacity, market seasonality, competition"
          className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent"
          rows={2}
        />
      </div>

      {/* What Needs to Be True */}
      <div className="bg-white rounded-lg border border-slate-200 p-6">
        <label className="block text-lg font-semibold text-slate-900 mb-2">
          What Needs to Be True (Optional)
        </label>
        <p className="text-sm text-slate-600 mb-4">
          Conditions or dependencies for success
        </p>
        <textarea
          value={content.whatNeedsToBeTrue || ""}
          onChange={(e) => updateContent("whatNeedsToBeTrue", e.target.value)}
          placeholder="e.g., Must hire 2 sales reps by Q2, maintain 80% customer satisfaction"
          className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent"
          rows={2}
        />
      </div>

      {/* Submit Button */}
      <div className="flex justify-end gap-4">
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full sm:w-auto px-6 py-3 bg-slate-900 text-white rounded-lg font-medium hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isSubmitting ? "Saving..." : "Save Goal"}
        </button>
      </div>
    </form>
  );
}
