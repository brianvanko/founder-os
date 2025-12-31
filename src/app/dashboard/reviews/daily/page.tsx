import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import Link from "next/link";
import { formatDate, formatDateShort } from "@/lib/utils";
import { DailyReviewContent } from "@/types/reviews";

export default async function DailyReviewsPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return null;
  }

  const reviews = await db.review.findMany({
    where: {
      userId: session.user.id,
      type: "DAILY",
    },
    orderBy: { date: "desc" },
    take: 30, // Last 30 reviews
  });

  const reviewsWithParsedContent = reviews.map((review) => ({
    ...review,
    content: JSON.parse(review.content) as DailyReviewContent,
  }));

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const todayReview = reviewsWithParsedContent.find((review) => {
    const reviewDate = new Date(review.date);
    reviewDate.setHours(0, 0, 0, 0);
    return reviewDate.getTime() === today.getTime();
  });

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Daily Reviews</h1>
          <p className="text-slate-600 mt-2">
            Your daily check-ins and patterns
          </p>
        </div>
        {!todayReview && (
          <Link
            href="/dashboard/reviews/daily/new"
            className="px-6 py-3 bg-slate-900 text-white rounded-lg font-medium hover:bg-slate-800 transition-colors"
          >
            Today's Check-in
          </Link>
        )}
      </div>

      {todayReview && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-6">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-lg font-semibold text-green-900 mb-1">
                ✓ Today's check-in complete
              </h2>
              <p className="text-green-700 text-sm">
                Great work staying consistent. See you tomorrow.
              </p>
            </div>
            <Link
              href={`/dashboard/reviews/daily/${todayReview.id}`}
              className="text-sm text-green-900 font-medium hover:underline"
            >
              View →
            </Link>
          </div>
        </div>
      )}

      {reviewsWithParsedContent.length === 0 ? (
        <div className="bg-white rounded-lg border border-slate-200 p-12 text-center">
          <h3 className="text-lg font-semibold text-slate-900 mb-2">
            No daily reviews yet
          </h3>
          <p className="text-slate-600 mb-6">
            Start your first daily check-in to track patterns and maintain
            clarity.
          </p>
          <Link
            href="/dashboard/reviews/daily/new"
            className="inline-block px-6 py-3 bg-slate-900 text-white rounded-lg font-medium hover:bg-slate-800 transition-colors"
          >
            Start First Check-in
          </Link>
        </div>
      ) : (
        <div className="bg-white rounded-lg border border-slate-200">
          <div className="p-6 border-b border-slate-200">
            <h2 className="text-lg font-semibold text-slate-900">
              Recent Check-ins
            </h2>
            <p className="text-sm text-slate-600 mt-1">
              Showing last {reviewsWithParsedContent.length} reviews
            </p>
          </div>

          <div className="divide-y divide-slate-100">
            {reviewsWithParsedContent.map((review) => {
              const isToday =
                new Date(review.date).toDateString() === new Date().toDateString();

              return (
                <Link
                  key={review.id}
                  href={`/dashboard/reviews/daily/${review.id}`}
                  className="block p-6 hover:bg-slate-50 transition-colors"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-semibold text-slate-900">
                        {formatDate(review.date)}
                        {isToday && (
                          <span className="ml-2 text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
                            Today
                          </span>
                        )}
                      </h3>
                      <p className="text-sm text-slate-500 mt-1">
                        Energy level: {review.content.energyLevel}/10
                      </p>
                    </div>
                    <span className="text-slate-400">→</span>
                  </div>

                  <div className="space-y-2 text-sm">
                    <div>
                      <span className="text-slate-500">Win:</span>{" "}
                      <span className="text-slate-700">
                        {review.content.meaningfulWin.substring(0, 80)}
                        {review.content.meaningfulWin.length > 80 && "..."}
                      </span>
                    </div>
                    <div>
                      <span className="text-slate-500">Tomorrow:</span>{" "}
                      <span className="text-slate-700">
                        {review.content.tomorrowPriority.substring(0, 80)}
                        {review.content.tomorrowPriority.length > 80 && "..."}
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
