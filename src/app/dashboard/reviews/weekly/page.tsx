import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import Link from "next/link";
import { formatDate } from "@/lib/utils";
import { WeeklyReviewContent } from "@/types/reviews";

export default async function WeeklyReviewsPage() {
  const session = await auth();

  if (!session?.user) {
    return null;
  }

  const reviews = await db.review.findMany({
    where: {
      userId: session.user.id,
      type: "WEEKLY",
    },
    orderBy: { date: "desc" },
    take: 20,
  });

  const reviewsWithParsedContent = reviews.map((review) => ({
    ...review,
    content: JSON.parse(review.content) as WeeklyReviewContent,
  }));

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Weekly Reviews</h1>
          <p className="text-slate-600 mt-2">
            Your weekly reflections and insights
          </p>
        </div>
        <Link
          href="/dashboard/reviews/weekly/new"
          className="px-6 py-3 bg-slate-900 text-white rounded-lg font-medium hover:bg-slate-800 transition-colors"
        >
          New Weekly Review
        </Link>
      </div>

      {reviewsWithParsedContent.length === 0 ? (
        <div className="bg-white rounded-lg border border-slate-200 p-12 text-center">
          <h3 className="text-lg font-semibold text-slate-900 mb-2">
            No weekly reviews yet
          </h3>
          <p className="text-slate-600 mb-6">
            Start your first weekly review to track patterns and progress
          </p>
          <Link
            href="/dashboard/reviews/weekly/new"
            className="inline-block px-6 py-3 bg-slate-900 text-white rounded-lg font-medium hover:bg-slate-800 transition-colors"
          >
            Start First Weekly Review
          </Link>
        </div>
      ) : (
        <div className="bg-white rounded-lg border border-slate-200">
          <div className="p-6 border-b border-slate-200">
            <h2 className="text-lg font-semibold text-slate-900">
              Recent Weekly Reviews
            </h2>
            <p className="text-sm text-slate-600 mt-1">
              Showing last {reviewsWithParsedContent.length} reviews
            </p>
          </div>

          <div className="divide-y divide-slate-100">
            {reviewsWithParsedContent.map((review) => (
              <Link
                key={review.id}
                href={`/dashboard/reviews/weekly/${review.id}`}
                className="block p-6 hover:bg-slate-50 transition-colors"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-semibold text-slate-900">
                      {formatDate(review.date)}
                    </h3>
                  </div>
                  <span className="text-slate-400">→</span>
                </div>

                <div className="space-y-2 text-sm">
                  <div>
                    <span className="text-slate-500">Moved the needle:</span>{" "}
                    <span className="text-slate-700">
                      {review.content.movedNeedle.substring(0, 80)}
                      {review.content.movedNeedle.length > 80 && "..."}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-500">Strategic insight:</span>{" "}
                    <span className="text-slate-700">
                      {review.content.strategicInsight.substring(0, 80)}
                      {review.content.strategicInsight.length > 80 && "..."}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
