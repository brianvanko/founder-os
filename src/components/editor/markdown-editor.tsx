"use client";

import { useState } from "react";
import ReactMarkdown from "react-markdown";

interface MarkdownEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  autoFocus?: boolean;
}

export function MarkdownEditor({
  value,
  onChange,
  placeholder = "Start writing...",
  autoFocus = false,
}: MarkdownEditorProps) {
  const [showPreview, setShowPreview] = useState(false);

  return (
    <div className="space-y-4">
      {/* Tabs */}
      <div className="border-b border-slate-200">
        <div className="flex gap-4">
          <button
            onClick={() => setShowPreview(false)}
            className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
              !showPreview
                ? "border-slate-900 text-slate-900"
                : "border-transparent text-slate-600 hover:text-slate-900"
            }`}
          >
            Write
          </button>
          <button
            onClick={() => setShowPreview(true)}
            className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
              showPreview
                ? "border-slate-900 text-slate-900"
                : "border-transparent text-slate-600 hover:text-slate-900"
            }`}
          >
            Preview
          </button>
        </div>
      </div>

      {/* Editor / Preview */}
      {!showPreview ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          autoFocus={autoFocus}
          className="w-full min-h-[500px] px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent font-mono text-sm resize-y"
        />
      ) : (
        <div className="min-h-[500px] px-4 py-3 border border-slate-200 rounded-lg bg-slate-50">
          <div className="prose prose-slate max-w-none">
            <ReactMarkdown>{value || "*Nothing to preview yet*"}</ReactMarkdown>
          </div>
        </div>
      )}

      {/* Helper Text */}
      <div className="flex justify-between items-center text-xs text-slate-500">
        <p>
          Auto-saves every 30 seconds.{" "}
          <a
            href="https://www.markdownguide.org/basic-syntax/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-700 hover:underline"
          >
            Markdown guide
          </a>
        </p>
        <p>{value.length} characters</p>
      </div>
    </div>
  );
}
