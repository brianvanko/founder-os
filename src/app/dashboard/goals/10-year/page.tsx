import { auth } from "@/lib/auth";

import { db } from "@/lib/db";
import Link from "next/link";
import { GoalContent, getStatusLabel, getStatusColor } from "@/types/goals";

export default async function GoalsPage() {
  const session = await auth();

  if (!session?.user) {
    return null;
  }

  const goals = await db.goal.findMany({
    where: {
      userId: session.user.id,
      timeframe: "TEN_YEAR",
    },
    orderBy: { createdAt: "desc" },
  });

  const goalsWithParsedContent = goals.map((goal) => ({
    ...goal,
    content: JSON.parse(goal.content) as GoalContent,
  }));

  const activeGoals = goalsWithParsedContent.filter(
    (g) => g.status !== "completed" && g.status !== "abandoned"
  );
  const completedGoals = goalsWithParsedContent.filter(
    (g) => g.status === "completed"
  );

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <Link
              href="/dashboard/goals"
              className="text-sm text-slate-600 hover:text-slate-900"
            >
              ← Goals
            </Link>
          </div>
          <h1 className="text-3xl font-bold text-slate-900">10-Year Goals</h1>
          <p className="text-slate-600 mt-2">
            Your long-term aspirations
          </p>
        </div>
        <Link
          href="/dashboard/goals/new?timeframe=TEN_YEAR"
          className="px-6 py-3 bg-slate-900 text-white rounded-lg font-medium hover:bg-slate-800 transition-colors"
        >
          New 10-Year Goal
        </Link>
      </div>

      {goalsWithParsedContent.length === 0 ? (
        <div className="bg-white rounded-lg border border-slate-200 p-12 text-center">
          <h3 className="text-lg font-semibold text-slate-900 mb-2">
            No goals yet
          </h3>
          <p className="text-slate-600 mb-6">
            Set your first 10-year goal to envision your future.
          </p>
          <Link
            href="/dashboard/goals/new?timeframe=TEN_YEAR"
            className="inline-block px-6 py-3 bg-slate-900 text-white rounded-lg font-medium hover:bg-slate-800 transition-colors"
          >
            Create First 10-Year Goal
          </Link>
        </div>
      ) : (
        <div className="space-y-8">
          {/* Active Goals */}
          {activeGoals.length > 0 && (
            <div>
              <h2 className="text-xl font-semibold text-slate-900 mb-4">
                Active Goals ({activeGoals.length})
              </h2>
              <div className="grid grid-cols-1 gap-6">
                {activeGoals.map((goal) => (
                  <Link
                    key={goal.id}
                    href={`/dashboard/goals/${goal.id}`}
                    className="bg-white rounded-lg border border-slate-200 p-6 hover:border-slate-300 transition-colors"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-semibold text-slate-900">
                            {goal.title}
                          </h3>
                          {goal.category && (
                            <span className="text-xs bg-slate-100 text-slate-700 px-2 py-1 rounded">
                              {goal.category}
                            </span>
                          )}
                          {goal.status && (
                            <span
                              className={`text-xs px-2 py-1 rounded ${getStatusColor(
                                goal.status
                              )}`}
                            >
                              {getStatusLabel(goal.status)}
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-slate-600 line-clamp-2">
                          {goal.content.what}
                        </p>
                      </div>
                      {goal.progress !== null && (
                        <div className="ml-4 text-right">
                          <div className="text-2xl font-bold text-slate-900">
                            {goal.progress}
                            <span className="text-sm text-slate-500">/10</span>
                          </div>
                          <p className="text-xs text-slate-500">Progress</p>
                        </div>
                      )}
                    </div>

                    {goal.content.firstAction && (
                      <div className="mt-4 pt-4 border-t border-slate-100">
                        <p className="text-xs text-slate-500 mb-1">
                          Next Action:
                        </p>
                        <p className="text-sm text-slate-700">
                          {goal.content.firstAction}
                        </p>
                      </div>
                    )}
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Completed Goals */}
          {completedGoals.length > 0 && (
            <div>
              <h2 className="text-xl font-semibold text-slate-900 mb-4">
                Completed Goals ({completedGoals.length})
              </h2>
              <div className="grid grid-cols-1 gap-4">
                {completedGoals.map((goal) => (
                  <Link
                    key={goal.id}
                    href={`/dashboard/goals/${goal.id}`}
                    className="bg-slate-50 rounded-lg border border-slate-200 p-4 hover:border-slate-300 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold text-slate-900">
                          {goal.title}
                        </h3>
                        {goal.category && (
                          <span className="text-xs text-slate-500">
                            {goal.category}
                          </span>
                        )}
                      </div>
                      <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
                        Completed
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
