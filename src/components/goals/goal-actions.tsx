"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { GOAL_STATUSES } from "@/types/goals";
import { useToast } from "@/components/ui/toast";

interface GoalActionsProps {
  goalId: string;
  currentProgress: number | null;
  currentStatus: string | null;
}

export function GoalActions({
  goalId,
  currentProgress,
  currentStatus,
}: GoalActionsProps) {
  const router = useRouter();
  const { showToast } = useToast();
  const [progress, setProgress] = useState(currentProgress || 5);
  const [status, setStatus] = useState(currentStatus || "on_track");
  const [isUpdating, setIsUpdating] = useState(false);

  const handleUpdate = async () => {
    setIsUpdating(true);

    try {
      const response = await fetch(`/api/goals/${goalId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ progress, status }),
      });

      if (!response.ok) {
        throw new Error("Failed to update");
      }

      showToast("Progress updated successfully", "success");
      router.refresh();
    } catch (error) {
      showToast("Failed to update progress. Please try again.", "error");
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="bg-slate-50 rounded-lg border border-slate-200 p-6">
      <h3 className="text-lg font-semibold text-slate-900 mb-4">
        Track Progress
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Progress Rating */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Progress (1-10)
          </label>
          <div className="flex items-center gap-4">
            <input
              type="range"
              min="1"
              max="10"
              value={progress}
              onChange={(e) => setProgress(parseInt(e.target.value))}
              className="flex-1 h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer"
            />
            <span className="text-2xl font-bold text-slate-900 w-12 text-center">
              {progress}
            </span>
          </div>
        </div>

        {/* Status */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Status
          </label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent"
          >
            <option value="on_track">On Track</option>
            <option value="off_track">Off Track</option>
            <option value="completed">Completed</option>
            <option value="abandoned">Abandoned</option>
          </select>
        </div>
      </div>

      <div className="mt-4">
        <button
          onClick={handleUpdate}
          disabled={isUpdating}
          className="px-4 py-2 bg-slate-900 text-white rounded-lg text-sm font-medium hover:bg-slate-800 disabled:opacity-50 transition-colors"
        >
          {isUpdating ? "Updating..." : "Update Progress"}
        </button>
      </div>
    </div>
  );
}
