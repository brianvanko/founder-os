"use client";

import { useState } from "react";
import ReactMarkdown from "react-markdown";

const OPENAI_ENABLED = typeof window === 'undefined' ? true : true; // Server-side check happens in API

export default function InsightsPage() {
  const [insights, setInsights] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedType, setSelectedType] = useState<string>("reviews");
  const [timeframe, setTimeframe] = useState<number>(90);

  const handleGenerateInsights = async () => {
    setIsGenerating(true);
    setError(null);
    setInsights(null);

    try {
      const response = await fetch("/api/insights", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type: selectedType,
          timeframe: selectedType === "reviews" ? timeframe : undefined,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to generate insights");
      }

      const data = await response.json();
      setInsights(data.insights);
    } catch (error) {
      console.error("Error generating insights:", error);
      setError(
        error instanceof Error ? error.message : "Failed to generate insights"
      );
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">AI Insights</h1>
        <p className="text-slate-600 mt-2">
          Generate AI-powered insights from your reviews, goals, and interviews
        </p>
      </div>

      {/* Generation Controls */}
      <div className="bg-white rounded-lg border-2 border-slate-200 p-6">
        <h2 className="text-lg font-semibold text-slate-900 mb-4">
          Generate Insights
        </h2>

        <div className="space-y-4">
          <div>
            <label
              htmlFor="type-select"
              className="block text-sm font-medium text-slate-700 mb-2"
            >
              What would you like to analyze?
            </label>
            <select
              id="type-select"
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="block w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900"
            >
              <option value="reviews">Recent Reviews</option>
              <option value="goals">Goals Progress</option>
              <option value="comprehensive">
                Comprehensive Analysis (Reviews + Goals + Interviews)
              </option>
            </select>
          </div>

          {selectedType === "reviews" && (
            <div>
              <label
                htmlFor="timeframe-select"
                className="block text-sm font-medium text-slate-700 mb-2"
              >
                Timeframe
              </label>
              <select
                id="timeframe-select"
                value={timeframe}
                onChange={(e) => setTimeframe(Number(e.target.value))}
                className="block w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900"
              >
                <option value={30}>Last 30 days</option>
                <option value={90}>Last 90 days</option>
                <option value={180}>Last 6 months</option>
                <option value={365}>Last year</option>
              </select>
            </div>
          )}

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex gap-3">
              <span className="text-blue-600 text-xl">💡</span>
              <div className="flex-1 text-sm text-blue-900">
                <p className="font-medium mb-1">How AI Insights Work</p>
                <p className="text-blue-800">
                  The AI analyzes your data to identify patterns, contradictions
                  between goals and behavior, and suggests insights for your
                  operating manual. This uses OpenAI's GPT-4 model and may take
                  20-30 seconds.
                </p>
              </div>
            </div>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          <button
            onClick={handleGenerateInsights}
            disabled={isGenerating}
            className="w-full px-6 py-3 bg-slate-900 text-white rounded-lg font-medium hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isGenerating ? (
              <span className="flex items-center justify-center gap-2">
                <svg
                  className="animate-spin h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Generating insights...
              </span>
            ) : (
              "Generate Insights"
            )}
          </button>
        </div>
      </div>

      {/* Insights Display */}
      {insights && (
        <div className="bg-white rounded-lg border-2 border-green-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-slate-900">
              Your Insights
            </h2>
            <button
              onClick={() => {
                navigator.clipboard.writeText(insights);
                alert("Insights copied to clipboard!");
              }}
              className="text-sm text-slate-600 hover:text-slate-900 font-medium"
            >
              Copy to Clipboard
            </button>
          </div>

          <div className="prose prose-slate max-w-none">
            <ReactMarkdown>{insights}</ReactMarkdown>
          </div>

          <div className="mt-6 pt-6 border-t border-slate-200">
            <p className="text-sm text-slate-600">
              💡 <strong>Tip:</strong> Review these insights and add the most
              valuable patterns to your{" "}
              <a
                href="/dashboard/documents/memory"
                className="text-slate-900 underline hover:text-slate-700"
              >
                Memory document
              </a>{" "}
              to build your operating manual.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
