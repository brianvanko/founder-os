"use client";

import { useState } from "react";
import { IdentityValuesContent } from "@/types/interviews";

interface IdentityValuesFormProps {
  initialData?: IdentityValuesContent;
  onSubmit: (data: IdentityValuesContent) => void;
  isSubmitting: boolean;
}

export function IdentityValuesForm({
  initialData,
  onSubmit,
  isSubmitting,
}: IdentityValuesFormProps) {
  const [formData, setFormData] = useState<IdentityValuesContent>(
    initialData || {
      coreValues: ["", "", "", ""],
      identityStatement: "",
      nonNegotiables: "",
      dealBreakers: "",
      whenAtBest: "",
      whenAtWorst: "",
      principlesInAction: "",
      valuesToDevelop: "",
    }
  );

  const updateField = (field: keyof IdentityValuesContent, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const updateValue = (index: number, value: string) => {
    const newValues = [...formData.coreValues];
    newValues[index] = value;
    updateField("coreValues", newValues);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Core Values */}
      <div className="bg-white rounded-lg border border-slate-200 p-6">
        <label className="block text-lg font-semibold text-slate-900 mb-4">
          Core Values *
        </label>
        <p className="text-sm text-slate-600 mb-4">
          What are your 4 most important values?
        </p>
        <div className="space-y-3">
          {[0, 1, 2, 3].map((index) => (
            <div key={index}>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Value {index + 1}
              </label>
              <input
                type="text"
                required
                value={formData.coreValues[index] || ""}
                onChange={(e) => updateValue(index, e.target.value)}
                placeholder={`e.g., Integrity, Growth, Family, Excellence`}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Identity Statement */}
      <div className="bg-white rounded-lg border border-slate-200 p-6">
        <label className="block text-lg font-semibold text-slate-900 mb-2">
          Identity Statement *
        </label>
        <p className="text-sm text-slate-600 mb-4">
          Complete this sentence: "I am someone who..."
        </p>
        <textarea
          required
          value={formData.identityStatement}
          onChange={(e) => updateField("identityStatement", e.target.value)}
          placeholder="e.g., I am someone who builds things that matter, shows up for my people, and never stops learning."
          className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent"
          rows={3}
        />
      </div>

      {/* Non-Negotiables */}
      <div className="bg-white rounded-lg border border-slate-200 p-6">
        <label className="block text-lg font-semibold text-slate-900 mb-2">
          Non-Negotiables *
        </label>
        <p className="text-sm text-slate-600 mb-4">
          What must be present in your life for you to be fulfilled?
        </p>
        <textarea
          required
          value={formData.nonNegotiables}
          onChange={(e) => updateField("nonNegotiables", e.target.value)}
          placeholder="e.g., Time with family, meaningful work, physical health, creative expression"
          className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent"
          rows={4}
        />
      </div>

      {/* Deal Breakers */}
      <div className="bg-white rounded-lg border border-slate-200 p-6">
        <label className="block text-lg font-semibold text-slate-900 mb-2">
          Deal Breakers *
        </label>
        <p className="text-sm text-slate-600 mb-4">
          What will you absolutely not tolerate?
        </p>
        <textarea
          required
          value={formData.dealBreakers}
          onChange={(e) => updateField("dealBreakers", e.target.value)}
          placeholder="e.g., Dishonesty, sacrificing family for work, unethical behavior, chronic stress"
          className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent"
          rows={4}
        />
      </div>

      {/* When At Best */}
      <div className="bg-white rounded-lg border border-slate-200 p-6">
        <label className="block text-lg font-semibold text-slate-900 mb-2">
          When I'm At My Best *
        </label>
        <p className="text-sm text-slate-600 mb-4">
          Describe yourself when you're operating at your highest level
        </p>
        <textarea
          required
          value={formData.whenAtBest}
          onChange={(e) => updateField("whenAtBest", e.target.value)}
          placeholder="e.g., I'm decisive, calm, present with people, creating value, taking care of myself"
          className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent"
          rows={4}
        />
      </div>

      {/* When At Worst */}
      <div className="bg-white rounded-lg border border-slate-200 p-6">
        <label className="block text-lg font-semibold text-slate-900 mb-2">
          When I'm At My Worst *
        </label>
        <p className="text-sm text-slate-600 mb-4">
          What does it look like when you're not showing up well?
        </p>
        <textarea
          required
          value={formData.whenAtWorst}
          onChange={(e) => updateField("whenAtWorst", e.target.value)}
          placeholder="e.g., I'm reactive, isolated, avoiding hard conversations, neglecting health"
          className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent"
          rows={4}
        />
      </div>

      {/* Principles In Action */}
      <div className="bg-white rounded-lg border border-slate-200 p-6">
        <label className="block text-lg font-semibold text-slate-900 mb-2">
          Principles In Action *
        </label>
        <p className="text-sm text-slate-600 mb-4">
          Give examples of times you lived your values, even when it was hard
        </p>
        <textarea
          required
          value={formData.principlesInAction}
          onChange={(e) => updateField("principlesInAction", e.target.value)}
          placeholder="e.g., Turned down a lucrative deal that didn't align with values, had a hard conversation with a friend, prioritized family over work milestone"
          className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent"
          rows={5}
        />
      </div>

      {/* Values To Develop */}
      <div className="bg-white rounded-lg border border-slate-200 p-6">
        <label className="block text-lg font-semibold text-slate-900 mb-2">
          Values To Develop *
        </label>
        <p className="text-sm text-slate-600 mb-4">
          What values or principles do you want to strengthen?
        </p>
        <textarea
          required
          value={formData.valuesToDevelop}
          onChange={(e) => updateField("valuesToDevelop", e.target.value)}
          placeholder="e.g., Patience, courage in conflict, generosity, discipline"
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
          {isSubmitting ? "Saving..." : "Complete Identity & Values Interview"}
        </button>
      </div>
    </form>
  );
}
