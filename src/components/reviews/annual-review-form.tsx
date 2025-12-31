"use client";

import { useState } from "react";
import { AnnualReviewContent } from "@/types/reviews";

interface AnnualReviewFormProps {
  initialData?: AnnualReviewContent;
  onSubmit: (data: AnnualReviewContent) => void;
  isSubmitting: boolean;
}

export function AnnualReviewForm({
  initialData,
  onSubmit,
  isSubmitting,
}: AnnualReviewFormProps) {
  const [formData, setFormData] = useState<AnnualReviewContent>(
    initialData || {
      yearSummary: "",
      mostProud: ["", "", ""],
      bestDecision: "",
      worstDecision: "",
      energyGained: "",
      energyDrained: "",
      surprised: "",
      relationships: {
        added: "",
        neglected: "",
        stronger: "",
        weaker: "",
      },
      patterns: "",
      nextYearTheme: "",
      nextYearGoals: ["", "", ""],
    }
  );

  const updateField = (field: keyof AnnualReviewContent, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const updateProud = (index: number, value: string) => {
    const newProud = [...formData.mostProud];
    newProud[index] = value;
    updateField("mostProud", newProud);
  };

  const updateGoal = (index: number, value: string) => {
    const newGoals = [...formData.nextYearGoals];
    newGoals[index] = value;
    updateField("nextYearGoals", newGoals);
  };

  const updateRelationship = (
    field: keyof typeof formData.relationships,
    value: string
  ) => {
    updateField("relationships", {
      ...formData.relationships,
      [field]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Year Summary */}
      <div className="bg-white rounded-lg border border-slate-200 p-6">
        <label className="block text-lg font-semibold text-slate-900 mb-2">
          Year Summary *
        </label>
        <p className="text-sm text-slate-600 mb-4">
          How would you summarize this year in 2-3 sentences?
        </p>
        <textarea
          required
          value={formData.yearSummary}
          onChange={(e) => updateField("yearSummary", e.target.value)}
          placeholder="e.g., The year I went all-in on building the business. Sacrificed health and relationships, but achieved product-market fit and $1M ARR."
          className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent"
          rows={4}
        />
      </div>

      {/* Most Proud */}
      <div className="bg-white rounded-lg border border-slate-200 p-6">
        <label className="block text-lg font-semibold text-slate-900 mb-4">
          What are you most proud of? *
        </label>
        <div className="space-y-3">
          {[0, 1, 2].map((index) => (
            <div key={index}>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Achievement {index + 1}
              </label>
              <input
                type="text"
                required
                value={formData.mostProud[index] || ""}
                onChange={(e) => updateProud(index, e.target.value)}
                placeholder={`Achievement ${index + 1}`}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Best Decision */}
      <div className="bg-white rounded-lg border border-slate-200 p-6">
        <label className="block text-lg font-semibold text-slate-900 mb-2">
          Best decision of the year *
        </label>
        <p className="text-sm text-slate-600 mb-4">
          What decision had the most positive impact?
        </p>
        <textarea
          required
          value={formData.bestDecision}
          onChange={(e) => updateField("bestDecision", e.target.value)}
          placeholder="e.g., Hiring our first engineer in Q1 allowed us to ship 3x faster"
          className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent"
          rows={3}
        />
      </div>

      {/* Worst Decision */}
      <div className="bg-white rounded-lg border border-slate-200 p-6">
        <label className="block text-lg font-semibold text-slate-900 mb-2">
          Worst decision of the year *
        </label>
        <p className="text-sm text-slate-600 mb-4">
          What decision would you reverse if you could?
        </p>
        <textarea
          required
          value={formData.worstDecision}
          onChange={(e) => updateField("worstDecision", e.target.value)}
          placeholder="e.g., Waiting 6 months to fire underperforming co-founder"
          className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent"
          rows={3}
        />
      </div>

      {/* Energy Gained */}
      <div className="bg-white rounded-lg border border-slate-200 p-6">
        <label className="block text-lg font-semibold text-slate-900 mb-2">
          What gave you energy? *
        </label>
        <p className="text-sm text-slate-600 mb-4">
          Activities, people, or situations that energized you
        </p>
        <textarea
          required
          value={formData.energyGained}
          onChange={(e) => updateField("energyGained", e.target.value)}
          placeholder="e.g., Building product, mentoring junior team members, deep work sessions"
          className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent"
          rows={3}
        />
      </div>

      {/* Energy Drained */}
      <div className="bg-white rounded-lg border border-slate-200 p-6">
        <label className="block text-lg font-semibold text-slate-900 mb-2">
          What drained your energy? *
        </label>
        <p className="text-sm text-slate-600 mb-4">
          Activities, people, or situations that depleted you
        </p>
        <textarea
          required
          value={formData.energyDrained}
          onChange={(e) => updateField("energyDrained", e.target.value)}
          placeholder="e.g., Fundraising meetings, managing toxic customer, unstructured days"
          className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent"
          rows={3}
        />
      </div>

      {/* Surprised */}
      <div className="bg-white rounded-lg border border-slate-200 p-6">
        <label className="block text-lg font-semibold text-slate-900 mb-2">
          What surprised you most? *
        </label>
        <p className="text-sm text-slate-600 mb-4">
          Unexpected outcomes, realizations, or events
        </p>
        <textarea
          required
          value={formData.surprised}
          onChange={(e) => updateField("surprised", e.target.value)}
          placeholder="e.g., How hard it is to hire great people, how much I enjoy public speaking"
          className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent"
          rows={3}
        />
      </div>

      {/* Relationships */}
      <div className="bg-white rounded-lg border border-slate-200 p-6">
        <h3 className="text-lg font-semibold text-slate-900 mb-4">
          Relationships
        </h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Who did you add to your life? *
            </label>
            <textarea
              required
              value={formData.relationships.added}
              onChange={(e) => updateRelationship("added", e.target.value)}
              placeholder="New friends, mentors, team members, connections"
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent"
              rows={2}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Who did you neglect? *
            </label>
            <textarea
              required
              value={formData.relationships.neglected}
              onChange={(e) => updateRelationship("neglected", e.target.value)}
              placeholder="People you wish you had spent more time with"
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent"
              rows={2}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Which relationships got stronger? *
            </label>
            <textarea
              required
              value={formData.relationships.stronger}
              onChange={(e) => updateRelationship("stronger", e.target.value)}
              placeholder="Relationships that deepened this year"
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent"
              rows={2}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Which relationships got weaker? *
            </label>
            <textarea
              required
              value={formData.relationships.weaker}
              onChange={(e) => updateRelationship("weaker", e.target.value)}
              placeholder="Relationships that faded or ended"
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent"
              rows={2}
            />
          </div>
        </div>
      </div>

      {/* Patterns */}
      <div className="bg-white rounded-lg border border-slate-200 p-6">
        <label className="block text-lg font-semibold text-slate-900 mb-2">
          What patterns do you notice? *
        </label>
        <p className="text-sm text-slate-600 mb-4">
          Recurring themes, behaviors, or situations throughout the year
        </p>
        <textarea
          required
          value={formData.patterns}
          onChange={(e) => updateField("patterns", e.target.value)}
          placeholder="e.g., I perform best with structure. I avoid conflict. I prioritize urgent over important."
          className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent"
          rows={4}
        />
      </div>

      {/* Next Year Theme */}
      <div className="bg-white rounded-lg border border-slate-200 p-6">
        <label className="block text-lg font-semibold text-slate-900 mb-2">
          Next year's theme *
        </label>
        <p className="text-sm text-slate-600 mb-4">
          What will next year be about? (1-3 words)
        </p>
        <input
          type="text"
          required
          value={formData.nextYearTheme}
          onChange={(e) => updateField("nextYearTheme", e.target.value)}
          placeholder="e.g., Scale, Balance, Building in public"
          className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent"
        />
      </div>

      {/* Next Year Goals */}
      <div className="bg-white rounded-lg border border-slate-200 p-6">
        <label className="block text-lg font-semibold text-slate-900 mb-4">
          Top 3 goals for next year *
        </label>
        <div className="space-y-3">
          {[0, 1, 2].map((index) => (
            <div key={index}>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Goal {index + 1}
              </label>
              <input
                type="text"
                required
                value={formData.nextYearGoals[index] || ""}
                onChange={(e) => updateGoal(index, e.target.value)}
                placeholder={`Goal ${index + 1}`}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Submit Button */}
      <div className="flex justify-end gap-4">
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full sm:w-auto px-6 py-3 bg-slate-900 text-white rounded-lg font-medium hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isSubmitting ? "Saving..." : "Complete Annual Review"}
        </button>
      </div>
    </form>
  );
}
