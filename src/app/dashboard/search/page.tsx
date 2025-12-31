"use client";

import { useState } from "react";
import Link from "next/link";
import { formatDate } from "@/lib/utils";

interface SearchResult {
  id: string;
  type: "review" | "goal" | "interview" | "document";
  reviewType?: string;
  title?: string;
  timeframe?: string;
  interviewType?: string;
  documentType?: string;
  date?: Date;
  createdAt?: Date;
  completedAt?: Date;
  updatedAt?: Date;
  content?: any;
}

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!query.trim()) return;

    setIsSearching(true);
    setHasSearched(true);

    try {
      const response = await fetch(
        `/api/search?q=${encodeURIComponent(query)}`
      );
      const data = await response.json();
      setResults(data.results || []);
    } catch (error) {
      console.error("Search error:", error);
      setResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  const getTypeLabel = (result: SearchResult) => {
    if (result.type === "review") {
      const labels: Record<string, string> = {
        DAILY: "Daily Review",
        WEEKLY: "Weekly Review",
        QUARTERLY: "Quarterly Review",
        ANNUAL: "Annual Review",
      };
      return labels[result.reviewType || ""] || "Review";
    }
    if (result.type === "goal") {
      const labels: Record<string, string> = {
        ONE_YEAR: "1-Year Goal",
        THREE_YEAR: "3-Year Goal",
        TEN_YEAR: "10-Year Goal",
      };
      return labels[result.timeframe || ""] || "Goal";
    }
    if (result.type === "interview") {
      const labels: Record<string, string> = {
        PAST_YEAR_REFLECTION: "Past Year Reflection",
        IDENTITY_AND_VALUES: "Identity & Values",
        FUTURE_SELF_INTERVIEW: "Future Self Interview",
      };
      return labels[result.interviewType || ""] || "Interview";
    }
    if (result.type === "document") {
      const labels: Record<string, string> = {
        PRINCIPLES: "Principles",
        NORTH_STAR: "North Star",
        MEMORY: "Memory",
        FRAMEWORK_ANNUAL_REVIEW: "Annual Review Framework",
        FRAMEWORK_VIVID_VISION: "Vivid Vision",
        FRAMEWORK_IDEAL_LIFE_COSTING: "Ideal Life Costing",
        FRAMEWORK_LIFE_MAP: "Life Map",
      };
      return labels[result.documentType || ""] || "Document";
    }
    return "";
  };

  const getResultLink = (result: SearchResult) => {
    if (result.type === "review") {
      return `/dashboard/reviews/${result.reviewType?.toLowerCase()}/${result.id}`;
    }
    if (result.type === "goal") {
      return `/dashboard/goals/${result.id}`;
    }
    if (result.type === "document") {
      return `/dashboard/documents/${result.documentType?.toLowerCase()}`;
    }
    return "#";
  };

  const getResultColor = (type: string) => {
    if (type === "review") return "bg-blue-50 border-blue-200";
    if (type === "goal") return "bg-green-50 border-green-200";
    if (type === "interview") return "bg-purple-50 border-purple-200";
    if (type === "document") return "bg-orange-50 border-orange-200";
    return "bg-slate-50 border-slate-200";
  };

  const getResultDate = (result: SearchResult) => {
    if (result.date) return formatDate(result.date);
    if (result.createdAt) return formatDate(result.createdAt);
    if (result.completedAt) return formatDate(result.completedAt);
    if (result.updatedAt) return formatDate(result.updatedAt);
    return "";
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Search</h1>
        <p className="text-slate-600 mt-2">
          Search across all your reviews, goals, interviews, and documents
        </p>
      </div>

      <form onSubmit={handleSearch} className="max-w-2xl">
        <div className="flex gap-3">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for anything..."
            className="flex-1 px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent"
          />
          <button
            type="submit"
            disabled={isSearching || !query.trim()}
            className="px-6 py-3 bg-slate-900 text-white rounded-lg font-medium hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isSearching ? "Searching..." : "Search"}
          </button>
        </div>
      </form>

      {hasSearched && (
        <div>
          <div className="mb-4">
            <p className="text-sm text-slate-600">
              Found {results.length} result{results.length !== 1 ? "s" : ""}
              {query && ` for "${query}"`}
            </p>
          </div>

          {results.length === 0 ? (
            <div className="bg-white rounded-lg border border-slate-200 p-12 text-center">
              <p className="text-slate-600">
                No results found. Try a different search term.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {results.map((result) => (
                <Link
                  key={`${result.type}-${result.id}`}
                  href={getResultLink(result)}
                  className={`block rounded-lg border-2 p-6 transition-colors ${getResultColor(
                    result.type
                  )} hover:border-slate-400`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-xs font-medium text-slate-500 uppercase">
                          {result.type}
                        </span>
                        <span className="text-sm text-slate-500">•</span>
                        <span className="text-sm text-slate-600">
                          {getResultDate(result)}
                        </span>
                      </div>
                      <h3 className="text-lg font-semibold text-slate-900 mb-1">
                        {result.type === "goal"
                          ? result.title
                          : getTypeLabel(result)}
                      </h3>
                      {result.type === "review" && result.content && (
                        <p className="text-sm text-slate-700 line-clamp-2 mt-2">
                          {result.reviewType === "DAILY" &&
                            result.content.meaningfulWin &&
                            `Win: ${result.content.meaningfulWin}`}
                          {result.reviewType === "WEEKLY" &&
                            result.content.movedNeedle &&
                            `Moved needle: ${result.content.movedNeedle}`}
                          {result.reviewType === "QUARTERLY" &&
                            result.content.biggestWins?.[0] &&
                            `Top win: ${result.content.biggestWins[0]}`}
                          {result.reviewType === "ANNUAL" &&
                            result.content.yearSummary &&
                            result.content.yearSummary}
                        </p>
                      )}
                    </div>
                    <span className="text-slate-400">→</span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
