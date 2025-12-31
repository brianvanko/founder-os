import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import Link from "next/link";
import { formatDate } from "@/lib/utils";

export default async function TimelinePage() {
  const session = await auth();

  if (!session?.user) {
    return null;
  }

  // Fetch all reviews
  const reviews = await db.review.findMany({
    where: { userId: session.user.id },
    orderBy: { date: "desc" },
    take: 100,
  });

  // Fetch all goals
  const goals = await db.goal.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: "desc" },
    take: 50,
  });

  // Fetch all interviews
  const interviews = await db.interview.findMany({
    where: { userId: session.user.id },
    orderBy: { completedAt: "desc" },
  });

  // Create timeline items
  const timelineItems = [
    ...reviews.map((review) => ({
      id: review.id,
      type: "review" as const,
      reviewType: review.type,
      date: review.date,
      createdAt: review.createdAt,
      content: JSON.parse(review.content),
    })),
    ...goals.map((goal) => ({
      id: goal.id,
      type: "goal" as const,
      timeframe: goal.timeframe,
      title: goal.title,
      date: goal.createdAt,
      createdAt: goal.createdAt,
      status: goal.status,
    })),
    ...interviews.map((interview) => ({
      id: interview.id,
      type: "interview" as const,
      interviewType: interview.type,
      date: interview.completedAt,
      createdAt: interview.completedAt,
    })),
  ].sort((a, b) => b.date.getTime() - a.date.getTime());

  const getReviewTypeLabel = (type: string) => {
    const labels: Record<string, string> = {
      DAILY: "Daily Review",
      WEEKLY: "Weekly Review",
      QUARTERLY: "Quarterly Review",
      ANNUAL: "Annual Review",
    };
    return labels[type] || type;
  };

  const getInterviewTypeLabel = (type: string) => {
    const labels: Record<string, string> = {
      PAST_YEAR_REFLECTION: "Past Year Reflection",
      IDENTITY_AND_VALUES: "Identity & Values",
      FUTURE_SELF_INTERVIEW: "Future Self Interview",
    };
    return labels[type] || type;
  };

  const getTimeframeLabel = (timeframe: string) => {
    const labels: Record<string, string> = {
      ONE_YEAR: "1-Year Goal",
      THREE_YEAR: "3-Year Goal",
      TEN_YEAR: "10-Year Goal",
    };
    return labels[timeframe] || timeframe;
  };

  const getItemColor = (type: string) => {
    if (type === "review") return "bg-blue-50 border-blue-200";
    if (type === "goal") return "bg-green-50 border-green-200";
    if (type === "interview") return "bg-purple-50 border-purple-200";
    return "bg-slate-50 border-slate-200";
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Timeline</h1>
        <p className="text-slate-600 mt-2">
          Your complete journey - all reviews, goals, and interviews in one place
        </p>
      </div>

      {timelineItems.length === 0 ? (
        <div className="bg-white rounded-lg border border-slate-200 p-12 text-center">
          <h3 className="text-lg font-semibold text-slate-900 mb-2">
            No timeline items yet
          </h3>
          <p className="text-slate-600 mb-6">
            Start creating reviews, goals, and interviews to build your timeline
          </p>
          <div className="flex gap-4 justify-center">
            <Link
              href="/dashboard/reviews/daily/new"
              className="px-4 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800"
            >
              Daily Review
            </Link>
            <Link
              href="/dashboard/goals/new?timeframe=ONE_YEAR"
              className="px-4 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800"
            >
              New Goal
            </Link>
          </div>
        </div>
      ) : (
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-slate-200" />

          <div className="space-y-6">
            {timelineItems.map((item) => (
              <div key={`${item.type}-${item.id}`} className="relative pl-20">
                {/* Timeline dot */}
                <div className="absolute left-6 top-6 w-4 h-4 bg-slate-900 rounded-full border-4 border-white" />

                <div
                  className={`rounded-lg border-2 p-6 ${getItemColor(item.type)}`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className="text-sm text-slate-500 mb-1">
                        {formatDate(item.date)}
                      </div>
                      <h3 className="text-lg font-semibold text-slate-900">
                        {item.type === "review" &&
                          getReviewTypeLabel(item.reviewType)}
                        {item.type === "goal" && item.title}
                        {item.type === "interview" &&
                          getInterviewTypeLabel(item.interviewType)}
                      </h3>
                      {item.type === "goal" && (
                        <div className="text-sm text-slate-600 mt-1">
                          {getTimeframeLabel(item.timeframe)}
                          {item.status && (
                            <span className="ml-2 text-xs px-2 py-0.5 bg-white rounded">
                              {item.status}
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                    {item.type === "review" && (
                      <Link
                        href={`/dashboard/reviews/${item.reviewType.toLowerCase()}/${
                          item.id
                        }`}
                        className="text-sm text-slate-600 hover:text-slate-900"
                      >
                        View →
                      </Link>
                    )}
                    {item.type === "goal" && (
                      <Link
                        href={`/dashboard/goals/${item.id}`}
                        className="text-sm text-slate-600 hover:text-slate-900"
                      >
                        View →
                      </Link>
                    )}
                  </div>

                  {/* Preview content for reviews */}
                  {item.type === "review" && (
                    <div className="text-sm text-slate-700 mt-2">
                      {item.reviewType === "DAILY" &&
                        item.content.meaningfulWin && (
                          <p className="line-clamp-2">
                            Win: {item.content.meaningfulWin}
                          </p>
                        )}
                      {item.reviewType === "WEEKLY" && item.content.movedNeedle && (
                        <p className="line-clamp-2">
                          Moved needle: {item.content.movedNeedle}
                        </p>
                      )}
                      {item.reviewType === "QUARTERLY" &&
                        item.content.biggestWins?.[0] && (
                          <p className="line-clamp-2">
                            Top win: {item.content.biggestWins[0]}
                          </p>
                        )}
                      {item.reviewType === "ANNUAL" &&
                        item.content.yearSummary && (
                          <p className="line-clamp-2">
                            {item.content.yearSummary}
                          </p>
                        )}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
