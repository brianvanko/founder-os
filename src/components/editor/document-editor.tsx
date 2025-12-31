"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { MarkdownEditor } from "./markdown-editor";
import { useAutosave } from "@/hooks/use-autosave";

interface DocumentEditorProps {
  documentId: string;
  initialContent: string;
}

export function DocumentEditor({ documentId, initialContent }: DocumentEditorProps) {
  const router = useRouter();
  const [content, setContent] = useState(initialContent);
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  const saveDocument = async () => {
    setIsSaving(true);
    try {
      const response = await fetch(`/api/documents/${documentId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content }),
      });

      if (!response.ok) {
        throw new Error("Failed to save");
      }

      setLastSaved(new Date());
      setHasUnsavedChanges(false);
      router.refresh();
    } catch (error) {
      console.error("Save failed:", error);
      alert("Failed to save. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  const { scheduleSave, saveNow } = useAutosave({
    onSave: saveDocument,
    delay: 30000, // 30 seconds
  });

  // Handle content changes
  const handleContentChange = (newContent: string) => {
    setContent(newContent);
    setHasUnsavedChanges(true);
    scheduleSave();
  };

  // Save on unmount if there are unsaved changes
  useEffect(() => {
    return () => {
      if (hasUnsavedChanges) {
        saveNow();
      }
    };
  }, [hasUnsavedChanges, saveNow]);

  return (
    <div className="space-y-4">
      {/* Save Status */}
      <div className="flex justify-between items-center">
        <div className="text-sm text-slate-600">
          {isSaving && <span>Saving...</span>}
          {!isSaving && lastSaved && (
            <span>
              Last saved at{" "}
              {lastSaved.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
          )}
          {!isSaving && !lastSaved && hasUnsavedChanges && (
            <span>Unsaved changes</span>
          )}
        </div>
        <button
          onClick={saveNow}
          disabled={isSaving || !hasUnsavedChanges}
          className="px-4 py-2 bg-slate-900 text-white text-sm rounded-lg hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isSaving ? "Saving..." : "Save Now"}
        </button>
      </div>

      {/* Editor */}
      <MarkdownEditor
        value={content}
        onChange={handleContentChange}
        autoFocus={true}
      />
    </div>
  );
}
