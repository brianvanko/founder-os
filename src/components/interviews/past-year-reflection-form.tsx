"use client";

import { useState } from "react";
import { PastYearReflectionContent } from "@/types/interviews";

interface PastYearReflectionFormProps {
  initialData?: PastYearReflectionContent;
  onSubmit: (data: PastYearReflectionContent) => void;
  isSubmitting: boolean;
}

export function PastYearReflectionForm({
  initialData,
  onSubmit,
  isSubmitting,
}: PastYearReflectionFormProps) {
  const [formData, setFormData] = useState<PastYearReflectionContent>(
    initialData || {
      significantMoments: ["", "", ""],
      proudestAchievements: "",
      biggestChallenges: "",
      lessonsLearned: "",
      relationshipChanges: "",
      energyPatterns: "",
      surprises: "",
      regrets: "",
      gratefulFor: "",
    }
  );

  const updateField = (
    field: keyof PastYearReflectionContent,
    value: any
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const updateMoment = (index: number, value: string) => {
    const newMoments = [...formData.significantMoments];
    newMoments[index] = value;
    updateField("significantMoments", newMoments);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Significant Moments */}
      <div className="bg-white rounded-lg border border-slate-200 p-6">
        <label className="block text-lg font-semibold text-slate-900 mb-4">
          Three Most Significant Moments *
        </label>
        <p className="text-sm text-slate-600 mb-4">
          What were the moments that defined this year?
        </p>
        <div className="space-y-3">
          {[0, 1, 2].map((index) => (
            <div key={index}>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Moment {index + 1}
              </label>
              <input
                type="text"
                required
                value={formData.significantMoments[index] || ""}
                onChange={(e) => updateMoment(index, e.target.value)}
                placeholder={`Significant moment ${index + 1}`}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Proudest Achievements */}
      <div className="bg-white rounded-lg border border-slate-200 p-6">
        <label className="block text-lg font-semibold text-slate-900 mb-2">
          Proudest Achievements *
        </label>
        <p className="text-sm text-slate-600 mb-4">
          What are you most proud of accomplishing this year?
        </p>
        <textarea
          required
          value={formData.proudestAchievements}
          onChange={(e) => updateField("proudestAchievements", e.target.value)}
          placeholder="e.g., Built a profitable business, improved my health, deepened key relationships"
          className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent"
          rows={4}
        />
      </div>

      {/* Biggest Challenges */}
      <div className="bg-white rounded-lg border border-slate-200 p-6">
        <label className="block text-lg font-semibold text-slate-900 mb-2">
          Biggest Challenges *
        </label>
        <p className="text-sm text-slate-600 mb-4">
          What were the hardest parts of this year?
        </p>
        <textarea
          required
          value={formData.biggestChallenges}
          onChange={(e) => updateField("biggestChallenges", e.target.value)}
          placeholder="e.g., Managing team conflicts, dealing with uncertainty, balancing work and family"
          className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent"
          rows={4}
        />
      </div>

      {/* Lessons Learned */}
      <div className="bg-white rounded-lg border border-slate-200 p-6">
        <label className="block text-lg font-semibold text-slate-900 mb-2">
          Lessons Learned *
        </label>
        <p className="text-sm text-slate-600 mb-4">
          What did you learn about yourself, others, or how the world works?
        </p>
        <textarea
          required
          value={formData.lessonsLearned}
          onChange={(e) => updateField("lessonsLearned", e.target.value)}
          placeholder="e.g., I work best with structure. Trust is built slowly. Markets move faster than I think."
          className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent"
          rows={5}
        />
      </div>

      {/* Relationship Changes */}
      <div className="bg-white rounded-lg border border-slate-200 p-6">
        <label className="block text-lg font-semibold text-slate-900 mb-2">
          Relationship Changes *
        </label>
        <p className="text-sm text-slate-600 mb-4">
          How did your relationships change this year?
        </p>
        <textarea
          required
          value={formData.relationshipChanges}
          onChange={(e) => updateField("relationshipChanges", e.target.value)}
          placeholder="e.g., Grew closer to my co-founder, drifted from old friends, reconnected with family"
          className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent"
          rows={4}
        />
      </div>

      {/* Energy Patterns */}
      <div className="bg-white rounded-lg border border-slate-200 p-6">
        <label className="block text-lg font-semibold text-slate-900 mb-2">
          Energy Patterns *
        </label>
        <p className="text-sm text-slate-600 mb-4">
          What patterns did you notice about your energy this year?
        </p>
        <textarea
          required
          value={formData.energyPatterns}
          onChange={(e) => updateField("energyPatterns", e.target.value)}
          placeholder="e.g., Morning is my best time. Social events drain me. Building energizes me."
          className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent"
          rows={4}
        />
      </div>

      {/* Surprises */}
      <div className="bg-white rounded-lg border border-slate-200 p-6">
        <label className="block text-lg font-semibold text-slate-900 mb-2">
          Surprises *
        </label>
        <p className="text-sm text-slate-600 mb-4">
          What surprised you this year?
        </p>
        <textarea
          required
          value={formData.surprises}
          onChange={(e) => updateField("surprises", e.target.value)}
          placeholder="e.g., How hard it is to hire, how much I enjoy public speaking, how quickly things can change"
          className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent"
          rows={4}
        />
      </div>

      {/* Regrets */}
      <div className="bg-white rounded-lg border border-slate-200 p-6">
        <label className="block text-lg font-semibold text-slate-900 mb-2">
          Regrets *
        </label>
        <p className="text-sm text-slate-600 mb-4">
          What do you wish you had done differently?
        </p>
        <textarea
          required
          value={formData.regrets}
          onChange={(e) => updateField("regrets", e.target.value)}
          placeholder="e.g., Waited too long to fire that person, didn't prioritize health, missed family events"
          className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent"
          rows={4}
        />
      </div>

      {/* Grateful For */}
      <div className="bg-white rounded-lg border border-slate-200 p-6">
        <label className="block text-lg font-semibold text-slate-900 mb-2">
          Grateful For *
        </label>
        <p className="text-sm text-slate-600 mb-4">
          What are you most grateful for from this year?
        </p>
        <textarea
          required
          value={formData.gratefulFor}
          onChange={(e) => updateField("gratefulFor", e.target.value)}
          placeholder="e.g., My health, my team, the opportunities I had, the lessons I learned"
          className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent"
          rows={4}
        />
      </div>

      {/* Submit Button */}
      <div className="flex justify-end gap-4">
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full sm:w-auto px-6 py-3 bg-slate-900 text-white rounded-lg font-medium hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isSubmitting ? "Saving..." : "Complete Past Year Reflection"}
        </button>
      </div>
    </form>
  );
}
