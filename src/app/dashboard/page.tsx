import { auth } from "@/lib/auth";

import { db } from "@/lib/db";
import Link from "next/link";
import { formatDate } from "@/lib/utils";
import { getStatusColor, getStatusLabel } from "@/types/goals";

export default async function DashboardPage() {
  const session = await auth();

  if (!session?.user) {
    return null;
  }

  // Get all reviews for stats
  const allReviews = await db.review.findMany({
    where: { userId: session.user.id },
    orderBy: { date: "desc" },
  });

  const dailyReviews = allReviews.filter((r) => r.type === "DAILY");

  // Get recent reviews
  const recentReviews = allReviews.slice(0, 5);

  // Get all goals for stats
  const allGoals = await db.goal.findMany({
    where: {
      userId: session.user.id,
      timeframe: "ONE_YEAR",
    },
    orderBy: { createdAt: "desc" },
  });

  const activeGoals = allGoals.slice(0, 5);

  // Calculate streak
  const calculateStreak = () => {
    if (dailyReviews.length === 0) return 0;

    let streak = 0;
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Check if today has a review
    const hasToday = dailyReviews.some((review) => {
      const reviewDate = new Date(review.date);
      reviewDate.setHours(0, 0, 0, 0);
      return reviewDate.getTime() === today.getTime();
    });

    // Start from today or yesterday depending on today's review
    let currentDate = new Date(today);
    if (!hasToday) {
      currentDate.setDate(currentDate.getDate() - 1);
    }

    // Count consecutive days
    while (true) {
      const hasReview = dailyReviews.some((review) => {
        const reviewDate = new Date(review.date);
        reviewDate.setHours(0, 0, 0, 0);
        return reviewDate.getTime() === currentDate.getTime();
      });

      if (!hasReview) break;
      streak++;
      currentDate.setDate(currentDate.getDate() - 1);
    }

    return streak;
  };

  const streak = calculateStreak();

  const todayHasReview = dailyReviews.some((review) => {
    const reviewDate = new Date(review.date);
    const today = new Date();
    return (
      reviewDate.toDateString() === today.toDateString()
    );
  });

  // Calculate goal stats
  const completedGoals = allGoals.filter((g) => g.status === "completed").length;
  const goalCompletionRate =
    allGoals.length > 0
      ? Math.round((completedGoals / allGoals.length) * 100)
      : 0;

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900">
          Welcome back, {session.user.name || "there"}
        </h1>
        <p className="text-slate-600 mt-2">
          {new Date().toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg border border-slate-200 p-6">
          <p className="text-sm text-slate-600 mb-1">Daily Reviews</p>
          <p className="text-3xl font-bold text-slate-900">
            {dailyReviews.length}
          </p>
          <p className="text-xs text-slate-500 mt-1">Total completed</p>
        </div>

        <div className="bg-white rounded-lg border border-slate-200 p-6">
          <p className="text-sm text-slate-600 mb-1">Current Streak</p>
          <p className="text-3xl font-bold text-slate-900">{streak}</p>
          <p className="text-xs text-slate-500 mt-1">
            {streak === 1 ? "day" : "days"}
          </p>
        </div>

        <div className="bg-white rounded-lg border border-slate-200 p-6">
          <p className="text-sm text-slate-600 mb-1">Active Goals</p>
          <p className="text-3xl font-bold text-slate-900">{allGoals.length}</p>
          <p className="text-xs text-slate-500 mt-1">1-year goals</p>
        </div>

        <div className="bg-white rounded-lg border border-slate-200 p-6">
          <p className="text-sm text-slate-600 mb-1">Goal Progress</p>
          <p className="text-3xl font-bold text-slate-900">
            {goalCompletionRate}%
          </p>
          <p className="text-xs text-slate-500 mt-1">
            {completedGoals} of {allGoals.length} completed
          </p>
        </div>
      </div>

      {/* Daily Check-in CTA */}
      {!todayHasReview && (
        <div className="bg-slate-900 text-white rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-2">
            Your daily check-in is waiting
          </h2>
          <p className="text-slate-300 mb-4">
            Take 5 minutes to reflect on today and set your intention for
            tomorrow.
          </p>
          <Link
            href="/dashboard/reviews/daily/new"
            className="inline-block bg-white text-slate-900 px-6 py-3 rounded-lg font-medium hover:bg-slate-100 transition-colors"
          >
            Start Daily Check-in
          </Link>
        </div>
      )}

      {todayHasReview && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-6">
          <h2 className="text-lg font-semibold text-green-900 mb-1">
            ✓ Daily check-in complete
          </h2>
          <p className="text-green-700">
            Great work staying consistent. See you tomorrow.
          </p>
        </div>
      )}

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link
          href="/dashboard/reviews/daily"
          className="bg-white p-6 rounded-lg border border-slate-200 hover:border-slate-300 transition-colors"
        >
          <h3 className="font-semibold text-slate-900 mb-2">Daily Reviews</h3>
          <p className="text-sm text-slate-600">
            View past check-ins and track patterns
          </p>
        </Link>

        <Link
          href="/dashboard/goals"
          className="bg-white p-6 rounded-lg border border-slate-200 hover:border-slate-300 transition-colors"
        >
          <h3 className="font-semibold text-slate-900 mb-2">Goals</h3>
          <p className="text-sm text-slate-600">
            Review and update your 1-year goals
          </p>
        </Link>

        <Link
          href="/dashboard/documents"
          className="bg-white p-6 rounded-lg border border-slate-200 hover:border-slate-300 transition-colors"
        >
          <h3 className="font-semibold text-slate-900 mb-2">Documents</h3>
          <p className="text-sm text-slate-600">
            Principles, North Star, and Memory
          </p>
        </Link>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Reviews */}
        <div className="bg-white rounded-lg border border-slate-200 p-6">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">
            Recent Reviews
          </h3>
          {recentReviews.length > 0 ? (
            <div className="space-y-3">
              {recentReviews.map((review) => (
                <div
                  key={review.id}
                  className="flex justify-between items-center py-2 border-b border-slate-100 last:border-0"
                >
                  <div>
                    <p className="text-sm font-medium text-slate-900">
                      {review.type.charAt(0) +
                        review.type.slice(1).toLowerCase()}{" "}
                      Review
                    </p>
                    <p className="text-xs text-slate-500">
                      {formatDate(review.date)}
                    </p>
                  </div>
                  <Link
                    href={`/dashboard/reviews/${review.type.toLowerCase()}/${
                      review.id
                    }`}
                    className="text-sm text-slate-600 hover:text-slate-900"
                  >
                    View →
                  </Link>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-slate-500">No reviews yet</p>
          )}
        </div>

        {/* Active Goals */}
        <div className="bg-white rounded-lg border border-slate-200 p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-slate-900">
              Active Goals
            </h3>
            <Link
              href="/dashboard/goals"
              className="text-sm text-slate-600 hover:text-slate-900"
            >
              View all →
            </Link>
          </div>
          {activeGoals.length > 0 ? (
            <div className="space-y-4">
              {activeGoals.map((goal) => (
                <Link
                  key={goal.id}
                  href={`/dashboard/goals/${goal.id}`}
                  className="block group"
                >
                  <div className="pb-4 border-b border-slate-100 last:border-0">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex-1">
                        <p className="text-sm font-medium text-slate-900 group-hover:text-slate-700">
                          {goal.title}
                        </p>
                        {goal.category && (
                          <p className="text-xs text-slate-500">
                            {goal.category}
                          </p>
                        )}
                      </div>
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
                    {goal.progress !== null && (
                      <div className="mt-2">
                        <div className="flex items-center gap-2">
                          <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-slate-900 rounded-full transition-all"
                              style={{ width: `${goal.progress * 10}%` }}
                            />
                          </div>
                          <span className="text-xs text-slate-600 w-8">
                            {goal.progress}/10
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div>
              <p className="text-sm text-slate-500 mb-3">No goals yet</p>
              <Link
                href="/dashboard/goals/new"
                className="text-sm text-slate-900 font-medium hover:underline"
              >
                Create your first goal →
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
