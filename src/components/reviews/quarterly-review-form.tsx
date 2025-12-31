"use client";

import { useState } from "react";
import { QuarterlyReviewContent } from "@/types/reviews";

interface QuarterlyReviewFormProps {
  initialData?: QuarterlyReviewContent;
  onSubmit: (data: QuarterlyReviewContent) => void;
  isSubmitting: boolean;
}

export function QuarterlyReviewForm({
  initialData,
  onSubmit,
  isSubmitting,
}: QuarterlyReviewFormProps) {
  const [formData, setFormData] = useState<QuarterlyReviewContent>(
    initialData || {
      biggestWins: ["", "", ""],
      biggestChallenges: ["", "", ""],
      surprised: "",
      disappointed: "",
      goalProgress: [],
      lifePillarRatings: {
        career: 5,
        relationships: 5,
        health: 5,
        meaning: 5,
        finances: 5,
        fun: 5,
      },
      misalignments: "",
      nextQuarterPriorities: ["", "", ""],
    }
  );

  const updateField = (field: keyof QuarterlyReviewContent, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const updateWin = (index: number, value: string) => {
    const newWins = [...formData.biggestWins];
    newWins[index] = value;
    updateField("biggestWins", newWins);
  };

  const updateChallenge = (index: number, value: string) => {
    const newChallenges = [...formData.biggestChallenges];
    newChallenges[index] = value;
    updateField("biggestChallenges", newChallenges);
  };

  const updatePriority = (index: number, value: string) => {
    const newPriorities = [...formData.nextQuarterPriorities];
    newPriorities[index] = value;
    updateField("nextQuarterPriorities", newPriorities);
  };

  const updateRating = (pillar: keyof typeof formData.lifePillarRatings, value: number) => {
    updateField("lifePillarRatings", {
      ...formData.lifePillarRatings,
      [pillar]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const lifePillars = [
    { key: "career", label: "Career & Purpose" },
    { key: "relationships", label: "Relationships" },
    { key: "health", label: "Health & Energy" },
    { key: "meaning", label: "Meaning & Growth" },
    { key: "finances", label: "Finances" },
    { key: "fun", label: "Fun & Adventure" },
  ] as const;

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Biggest Wins */}
      <div className="bg-white rounded-lg border border-slate-200 p-6">
        <label className="block text-lg font-semibold text-slate-900 mb-4">
          Top 3 biggest wins this quarter *
        </label>
        <div className="space-y-3">
          {[0, 1, 2].map((index) => (
            <div key={index}>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Win {index + 1}
              </label>
              <input
                type="text"
                required
                value={formData.biggestWins[index] || ""}
                onChange={(e) => updateWin(index, e.target.value)}
                placeholder={`Win ${index + 1}`}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Biggest Challenges */}
      <div className="bg-white rounded-lg border border-slate-200 p-6">
        <label className="block text-lg font-semibold text-slate-900 mb-4">
          Top 3 biggest challenges this quarter *
        </label>
        <div className="space-y-3">
          {[0, 1, 2].map((index) => (
            <div key={index}>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Challenge {index + 1}
              </label>
              <input
                type="text"
                required
                value={formData.biggestChallenges[index] || ""}
                onChange={(e) => updateChallenge(index, e.target.value)}
                placeholder={`Challenge ${index + 1}`}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Surprised */}
      <div className="bg-white rounded-lg border border-slate-200 p-6">
        <label className="block text-lg font-semibold text-slate-900 mb-2">
          What surprised you? *
        </label>
        <p className="text-sm text-slate-600 mb-4">
          Unexpected outcomes or realizations
        </p>
        <textarea
          required
          value={formData.surprised}
          onChange={(e) => updateField("surprised", e.target.value)}
          placeholder="e.g., Market shifted faster than expected, team capacity was lower, opportunity emerged"
          className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent"
          rows={3}
        />
      </div>

      {/* Disappointed */}
      <div className="bg-white rounded-lg border border-slate-200 p-6">
        <label className="block text-lg font-semibold text-slate-900 mb-2">
          What disappointed you? *
        </label>
        <p className="text-sm text-slate-600 mb-4">
          What didn't go as hoped?
        </p>
        <textarea
          required
          value={formData.disappointed}
          onChange={(e) => updateField("disappointed", e.target.value)}
          placeholder="e.g., Missed revenue target, key hire didn't work out, delayed product launch"
          className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent"
          rows={3}
        />
      </div>

      {/* Life Pillar Ratings */}
      <div className="bg-white rounded-lg border border-slate-200 p-6">
        <h3 className="text-lg font-semibold text-slate-900 mb-4">
          Life Map Ratings (1-10)
        </h3>
        <p className="text-sm text-slate-600 mb-6">
          Rate each area of your life
        </p>
        <div className="space-y-6">
          {lifePillars.map((pillar) => (
            <div key={pillar.key}>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-medium text-slate-700">
                  {pillar.label}
                </label>
                <span className="text-2xl font-bold text-slate-900">
                  {formData.lifePillarRatings[pillar.key]}
                </span>
              </div>
              <input
                type="range"
                min="1"
                max="10"
                value={formData.lifePillarRatings[pillar.key]}
                onChange={(e) => updateRating(pillar.key, parseInt(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Misalignments */}
      <div className="bg-white rounded-lg border border-slate-200 p-6">
        <label className="block text-lg font-semibold text-slate-900 mb-2">
          Misalignments *
        </label>
        <p className="text-sm text-slate-600 mb-4">
          Where are you out of alignment with your values or goals?
        </p>
        <textarea
          required
          value={formData.misalignments}
          onChange={(e) => updateField("misalignments", e.target.value)}
          placeholder="e.g., Working too much, neglecting health, not spending time with family"
          className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent"
          rows={3}
        />
      </div>

      {/* Next Quarter Priorities */}
      <div className="bg-white rounded-lg border border-slate-200 p-6">
        <label className="block text-lg font-semibold text-slate-900 mb-4">
          Top 3 priorities for next quarter *
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
                value={formData.nextQuarterPriorities[index] || ""}
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
          {isSubmitting ? "Saving..." : "Complete Quarterly Review"}
        </button>
      </div>
    </form>
  );
}
