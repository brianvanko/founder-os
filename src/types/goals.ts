import { Timeframe } from "@prisma/client";

export interface GoalContent {
  what: string; // Specific, measurable outcome
  why: string; // Why does this matter?
  successLooksLike: string; // How will you know you hit it?
  firstAction: string; // What's the very next step?
  milestones: {
    q1?: string;
    q2?: string;
    q3?: string;
    q4?: string;
  };
  constraints?: string; // Obstacles or dependencies
  whatNeedsToBeTrue?: string; // Conditions for success
}

export interface GoalWithContent {
  id: string;
  userId: string;
  timeframe: Timeframe;
  title: string;
  category: string | null;
  content: GoalContent;
  status: string | null;
  progress: number | null;
  createdAt: Date;
  updatedAt: Date;
}

export const GOAL_CATEGORIES = [
  "Business",
  "Personal",
  "Health",
  "Relationships",
  "Finances",
  "Learning",
  "Other",
] as const;

export const GOAL_STATUSES = [
  "on_track",
  "off_track",
  "completed",
  "abandoned",
] as const;

export type GoalCategory = (typeof GOAL_CATEGORIES)[number];
export type GoalStatus = (typeof GOAL_STATUSES)[number];

export function getStatusLabel(status: string | null): string {
  if (!status) return "Not started";

  const labels: Record<string, string> = {
    on_track: "On Track",
    off_track: "Off Track",
    completed: "Completed",
    abandoned: "Abandoned",
  };

  return labels[status] || status;
}

export function getStatusColor(status: string | null): string {
  if (!status) return "bg-slate-100 text-slate-700";

  const colors: Record<string, string> = {
    on_track: "bg-green-100 text-green-700",
    off_track: "bg-yellow-100 text-yellow-700",
    completed: "bg-blue-100 text-blue-700",
    abandoned: "bg-slate-100 text-slate-500",
  };

  return colors[status] || "bg-slate-100 text-slate-700";
}
