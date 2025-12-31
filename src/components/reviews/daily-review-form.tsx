"use client";

import { useState } from "react";
import { DailyReviewContent } from "@/types/reviews";

interface DailyReviewFormProps {
  initialData?: DailyReviewContent;
  onSubmit: (data: DailyReviewContent) => Promise<void>;
  isSubmitting?: boolean;
}

export function DailyReviewForm({
  initialData,
  onSubmit,
  isSubmitting = false,
}: DailyReviewFormProps) {
  const [formData, setFormData] = useState<DailyReviewContent>(
    initialData || {
      energyLevel: 5,
      meaningfulWin: "",
      frictionPoint: "",
      letGoOf: "",
      tomorrowPriority: "",
    }
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(formData);
  };

  const updateField = <K extends keyof DailyReviewContent>(
    field: K,
    value: DailyReviewContent[K]
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Energy Level */}
      <div className="bg-white rounded-lg border border-slate-200 p-6">
        <label className="block text-lg font-semibold text-slate-900 mb-4">
          1. Energy Level
        </label>
        <p className="text-sm text-slate-600 mb-4">
          Rate your energy today (1 = drained, 10 = energized)
        </p>

        {/* Energy Slider */}
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <span className="text-sm text-slate-500 w-8">1</span>
            <input
              type="range"
              min="1"
              max="10"
              value={formData.energyLevel}
              onChange={(e) =>
                updateField("energyLevel", parseInt(e.target.value))
              }
              className="flex-1 h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer"
            />
            <span className="text-sm text-slate-500 w-8">10</span>
            <span className="text-2xl font-bold text-slate-900 w-12 text-center">
              {formData.energyLevel}
            </span>
          </div>

          {/* Optional notes */}
          <textarea
            value={formData.energyNotes || ""}
            onChange={(e) => updateField("energyNotes", e.target.value)}
            placeholder="What affected your energy today? (optional)"
            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent text-sm"
            rows={2}
          />
        </div>
      </div>

      {/* Meaningful Win */}
      <div className="bg-white rounded-lg border border-slate-200 p-6">
        <label className="block text-lg font-semibold text-slate-900 mb-4">
          2. One Meaningful Win
        </label>
        <p className="text-sm text-slate-600 mb-4">
          What moved the needle today? What are you proud of?
        </p>
        <textarea
          required
          value={formData.meaningfulWin}
          onChange={(e) => updateField("meaningfulWin", e.target.value)}
          placeholder="This doesn't have to be big. A good conversation counts. So does a hard decision."
          className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent"
          rows={3}
        />
      </div>

      {/* Friction Point */}
      <div className="bg-white rounded-lg border border-slate-200 p-6">
        <label className="block text-lg font-semibold text-slate-900 mb-4">
          3. One Friction Point
        </label>
        <p className="text-sm text-slate-600 mb-4">
          What drained you, frustrated you, or slowed you down?
        </p>
        <textarea
          required
          value={formData.frictionPoint}
          onChange={(e) => updateField("frictionPoint", e.target.value)}
          placeholder="Name it specifically. Vague awareness doesn't help."
          className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent"
          rows={3}
        />
      </div>

      {/* Let Go Of */}
      <div className="bg-white rounded-lg border border-slate-200 p-6">
        <label className="block text-lg font-semibold text-slate-900 mb-4">
          4. One Thing to Let Go Of
        </label>
        <p className="text-sm text-slate-600 mb-4">
          What are you carrying that you don't need to?
        </p>
        <textarea
          required
          value={formData.letGoOf}
          onChange={(e) => updateField("letGoOf", e.target.value)}
          placeholder="A worry, a task, a commitment, an expectation, a story you're telling yourself."
          className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent"
          rows={3}
        />
      </div>

      {/* Tomorrow Priority */}
      <div className="bg-white rounded-lg border border-slate-200 p-6">
        <label className="block text-lg font-semibold text-slate-900 mb-4">
          5. One Priority for Tomorrow
        </label>
        <p className="text-sm text-slate-600 mb-4">
          If you could only move one thing forward tomorrow, what would it be?
        </p>
        <textarea
          required
          value={formData.tomorrowPriority}
          onChange={(e) => updateField("tomorrowPriority", e.target.value)}
          placeholder="Be specific. Not 'work on product' but 'finalize pricing page copy.'"
          className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent"
          rows={3}
        />
      </div>

      {/* Optional Notes */}
      <div className="bg-white rounded-lg border border-slate-200 p-6">
        <label className="block text-lg font-semibold text-slate-900 mb-4">
          Additional Notes (Optional)
        </label>
        <p className="text-sm text-slate-600 mb-4">
          Anything else worth capturing?
        </p>
        <textarea
          value={formData.notes || ""}
          onChange={(e) => updateField("notes", e.target.value)}
          placeholder="Optional — use this space for anything else on your mind."
          className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent"
          rows={3}
        />
      </div>

      {/* Submit Button */}
      <div className="flex justify-end gap-4">
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full sm:w-auto px-6 py-3 bg-slate-900 text-white rounded-lg font-medium hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isSubmitting ? "Saving..." : "Complete Check-in"}
        </button>
      </div>
    </form>
  );
}
