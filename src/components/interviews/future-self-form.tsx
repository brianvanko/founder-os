"use client";

import { useState } from "react";
import { FutureSelfContent } from "@/types/interviews";

interface FutureSelfFormProps {
  initialData?: FutureSelfContent;
  onSubmit: (data: FutureSelfContent) => void;
  isSubmitting: boolean;
}

export function FutureSelfForm({
  initialData,
  onSubmit,
  isSubmitting,
}: FutureSelfFormProps) {
  const [formData, setFormData] = useState<FutureSelfContent>(
    initialData || {
      timeHorizon: "5 years",
      vividVision: "",
      dailyLife: "",
      relationships: "",
      work: "",
      health: "",
      legacy: "",
      valuesAlignment: "",
      firstSteps: ["", "", ""],
    }
  );

  const updateField = (field: keyof FutureSelfContent, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const updateStep = (index: number, value: string) => {
    const newSteps = [...formData.firstSteps];
    newSteps[index] = value;
    updateField("firstSteps", newSteps);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Time Horizon */}
      <div className="bg-white rounded-lg border border-slate-200 p-6">
        <label className="block text-lg font-semibold text-slate-900 mb-2">
          Time Horizon *
        </label>
        <p className="text-sm text-slate-600 mb-4">
          How far into the future are you imagining?
        </p>
        <select
          required
          value={formData.timeHorizon}
          onChange={(e) => updateField("timeHorizon", e.target.value)}
          className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent"
        >
          <option value="3 years">3 years</option>
          <option value="5 years">5 years</option>
          <option value="10 years">10 years</option>
          <option value="20 years">20 years</option>
        </select>
      </div>

      {/* Vivid Vision */}
      <div className="bg-white rounded-lg border border-slate-200 p-6">
        <label className="block text-lg font-semibold text-slate-900 mb-2">
          Vivid Vision *
        </label>
        <p className="text-sm text-slate-600 mb-4">
          Paint a detailed picture of your life at this future point. Write in
          present tense as if you're already there.
        </p>
        <textarea
          required
          value={formData.vividVision}
          onChange={(e) => updateField("vividVision", e.target.value)}
          placeholder="e.g., It's 2030. I wake up at 6am in my home overlooking the ocean. My company employs 50 people..."
          className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent"
          rows={6}
        />
      </div>

      {/* Daily Life */}
      <div className="bg-white rounded-lg border border-slate-200 p-6">
        <label className="block text-lg font-semibold text-slate-900 mb-2">
          Daily Life *
        </label>
        <p className="text-sm text-slate-600 mb-4">
          What does a typical day look like?
        </p>
        <textarea
          required
          value={formData.dailyLife}
          onChange={(e) => updateField("dailyLife", e.target.value)}
          placeholder="e.g., Morning routine, work schedule, evening activities, how you spend weekends"
          className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent"
          rows={5}
        />
      </div>

      {/* Relationships */}
      <div className="bg-white rounded-lg border border-slate-200 p-6">
        <label className="block text-lg font-semibold text-slate-900 mb-2">
          Relationships *
        </label>
        <p className="text-sm text-slate-600 mb-4">
          Who are the key people in your life and what are those relationships
          like?
        </p>
        <textarea
          required
          value={formData.relationships}
          onChange={(e) => updateField("relationships", e.target.value)}
          placeholder="e.g., Close relationship with partner and kids, tight group of 5-6 close friends, strong mentors"
          className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent"
          rows={5}
        />
      </div>

      {/* Work */}
      <div className="bg-white rounded-lg border border-slate-200 p-6">
        <label className="block text-lg font-semibold text-slate-900 mb-2">
          Work & Career *
        </label>
        <p className="text-sm text-slate-600 mb-4">
          What are you working on? What impact are you having?
        </p>
        <textarea
          required
          value={formData.work}
          onChange={(e) => updateField("work", e.target.value)}
          placeholder="e.g., Running a 100-person company, writing books, advising startups, teaching"
          className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent"
          rows={5}
        />
      </div>

      {/* Health */}
      <div className="bg-white rounded-lg border border-slate-200 p-6">
        <label className="block text-lg font-semibold text-slate-900 mb-2">
          Health & Energy *
        </label>
        <p className="text-sm text-slate-600 mb-4">
          How do you feel physically and mentally?
        </p>
        <textarea
          required
          value={formData.health}
          onChange={(e) => updateField("health", e.target.value)}
          placeholder="e.g., Best shape of my life, consistently energetic, mentally sharp, stress managed well"
          className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent"
          rows={4}
        />
      </div>

      {/* Legacy */}
      <div className="bg-white rounded-lg border border-slate-200 p-6">
        <label className="block text-lg font-semibold text-slate-900 mb-2">
          Legacy & Impact *
        </label>
        <p className="text-sm text-slate-600 mb-4">
          What will you be known for? What impact have you made?
        </p>
        <textarea
          required
          value={formData.legacy}
          onChange={(e) => updateField("legacy", e.target.value)}
          placeholder="e.g., Built a company that changed an industry, helped 100 founders succeed, raised great kids"
          className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent"
          rows={5}
        />
      </div>

      {/* Values Alignment */}
      <div className="bg-white rounded-lg border border-slate-200 p-6">
        <label className="block text-lg font-semibold text-slate-900 mb-2">
          Values Alignment *
        </label>
        <p className="text-sm text-slate-600 mb-4">
          How is this future self living your core values?
        </p>
        <textarea
          required
          value={formData.valuesAlignment}
          onChange={(e) => updateField("valuesAlignment", e.target.value)}
          placeholder="e.g., Demonstrating integrity in business, prioritizing family, continuous growth, serving others"
          className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent"
          rows={4}
        />
      </div>

      {/* First Steps */}
      <div className="bg-white rounded-lg border border-slate-200 p-6">
        <label className="block text-lg font-semibold text-slate-900 mb-4">
          First Steps *
        </label>
        <p className="text-sm text-slate-600 mb-4">
          What are the first 3 steps you need to take to become this future
          self?
        </p>
        <div className="space-y-3">
          {[0, 1, 2].map((index) => (
            <div key={index}>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Step {index + 1}
              </label>
              <input
                type="text"
                required
                value={formData.firstSteps[index] || ""}
                onChange={(e) => updateStep(index, e.target.value)}
                placeholder={`First step ${index + 1}`}
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
          {isSubmitting ? "Saving..." : "Complete Future Self Interview"}
        </button>
      </div>
    </form>
  );
}
