"use client";

import { useState } from "react";
import { WeeklyReviewContent } from "@/types/reviews";

interface WeeklyReviewFormProps {
  initialData?: WeeklyReviewContent;
  onSubmit: (data: WeeklyReviewContent) => void;
  isSubmitting: boolean;
}

export function WeeklyReviewForm({
  initialData,
  onSubmit,
  isSubmitting,
}: WeeklyReviewFormProps) {
  const [formData, setFormData] = useState<WeeklyReviewContent>(
    initialData || {
      movedNeedle: "",
      wasNoise: "",
      timeLeaked: "",
      energyGained: "",
      energyDrained: "",
      energyPattern: "",
      strategicInsight: "",
      proud: "",
      doDifferently: "",
      goalProgress: [],
      nextWeekPriorities: ["", "", ""],
    }
  );

  const updateField = (field: keyof WeeklyReviewContent, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const updatePriority = (index: number, value: string) => {
    const newPriorities = [...formData.nextWeekPriorities];
    newPriorities[index] = value;
    updateField("nextWeekPriorities", newPriorities);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Moved the Needle */}
      <div className="bg-white rounded-lg border border-slate-200 p-6">
        <label className="block text-lg font-semibold text-slate-900 mb-2">
          What moved the needle? *
        </label>
        <p className="text-sm text-slate-600 mb-4">
          Real progress toward your goals
        </p>
        <textarea
          required
          value={formData.movedNeedle}
          onChange={(e) => updateField("movedNeedle", e.target.value)}
          placeholder="e.g., Closed two major deals, shipped new feature, hired key team member"
          className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent"
          rows={3}
        />
      </div>

      {/* Was Noise */}
      <div className="bg-white rounded-lg border border-slate-200 p-6">
        <label className="block text-lg font-semibold text-slate-900 mb-2">
          What was just noise? *
        </label>
        <p className="text-sm text-slate-600 mb-4">
          Busy work that didn't matter
        </p>
        <textarea
          required
          value={formData.wasNoise}
          onChange={(e) => updateField("wasNoise", e.target.value)}
          placeholder="e.g., Unnecessary meetings, email chains, low-priority tasks"
          className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent"
          rows={3}
        />
      </div>

      {/* Time Leaked */}
      <div className="bg-white rounded-lg border border-slate-200 p-6">
        <label className="block text-lg font-semibold text-slate-900 mb-2">
          Where did time leak? *
        </label>
        <p className="text-sm text-slate-600 mb-4">
          Unplanned distractions and rabbit holes
        </p>
        <textarea
          required
          value={formData.timeLeaked}
          onChange={(e) => updateField("timeLeaked", e.target.value)}
          placeholder="e.g., Social media, context switching, firefighting"
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
          Activities and interactions that energized you
        </p>
        <textarea
          required
          value={formData.energyGained}
          onChange={(e) => updateField("energyGained", e.target.value)}
          placeholder="e.g., Deep work sessions, team wins, meaningful conversations"
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
          Activities and situations that depleted you
        </p>
        <textarea
          required
          value={formData.energyDrained}
          onChange={(e) => updateField("energyDrained", e.target.value)}
          placeholder="e.g., Difficult conversations, unclear decisions, reactive mode"
          className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent"
          rows={3}
        />
      </div>

      {/* Energy Pattern */}
      <div className="bg-white rounded-lg border border-slate-200 p-6">
        <label className="block text-lg font-semibold text-slate-900 mb-2">
          Energy pattern this week *
        </label>
        <p className="text-sm text-slate-600 mb-4">
          What do you notice about your energy levels?
        </p>
        <textarea
          required
          value={formData.energyPattern}
          onChange={(e) => updateField("energyPattern", e.target.value)}
          placeholder="e.g., High energy mornings, slump after lunch, recharged by exercise"
          className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent"
          rows={3}
        />
      </div>

      {/* Strategic Insight */}
      <div className="bg-white rounded-lg border border-slate-200 p-6">
        <label className="block text-lg font-semibold text-slate-900 mb-2">
          Strategic insight *
        </label>
        <p className="text-sm text-slate-600 mb-4">
          A realization about your business or role
        </p>
        <textarea
          required
          value={formData.strategicInsight}
          onChange={(e) => updateField("strategicInsight", e.target.value)}
          placeholder="e.g., Need to delegate more, should focus on partnerships, hiring is bottleneck"
          className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent"
          rows={3}
        />
      </div>

      {/* Proud */}
      <div className="bg-white rounded-lg border border-slate-200 p-6">
        <label className="block text-lg font-semibold text-slate-900 mb-2">
          What are you proud of? *
        </label>
        <p className="text-sm text-slate-600 mb-4">
          Wins, big or small
        </p>
        <textarea
          required
          value={formData.proud}
          onChange={(e) => updateField("proud", e.target.value)}
          placeholder="e.g., Difficult conversation handled well, decision made with conviction"
          className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent"
          rows={3}
        />
      </div>

      {/* Do Differently */}
      <div className="bg-white rounded-lg border border-slate-200 p-6">
        <label className="block text-lg font-semibold text-slate-900 mb-2">
          What would you do differently? *
        </label>
        <p className="text-sm text-slate-600 mb-4">
          Learning for next week
        </p>
        <textarea
          required
          value={formData.doDifferently}
          onChange={(e) => updateField("doDifferently", e.target.value)}
          placeholder="e.g., Block more focus time, say no sooner, ask for help earlier"
          className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent"
          rows={3}
        />
      </div>

      {/* Next Week Priorities */}
      <div className="bg-white rounded-lg border border-slate-200 p-6">
        <label className="block text-lg font-semibold text-slate-900 mb-4">
          Top 3 priorities for next week *
        </label>
        <div className="space-y-3">
          {[0, 1, 2].map((index) => (
            <div key={index}>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Priority {index + 1}
              </label>
              <input
                type="text"
                required
                value={formData.nextWeekPriorities[index] || ""}
                onChange={(e) => updatePriority(index, e.target.value)}
                placeholder={`Priority ${index + 1}`}
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
          {isSubmitting ? "Saving..." : "Complete Weekly Review"}
        </button>
      </div>
    </form>
  );
}
