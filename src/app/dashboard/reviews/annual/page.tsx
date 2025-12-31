import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import Link from "next/link";
import { formatDate } from "@/lib/utils";
import { AnnualReviewContent } from "@/types/reviews";

export default async function AnnualReviewsPage() {
  const session = await auth();

  if (!session?.user) {
    return null;
  }

  const reviews = await db.review.findMany({
    where: {
      userId: session.user.id,
      type: "ANNUAL",
    },
    orderBy: { date: "desc" },
    take: 10,
  });

  const reviewsWithParsedContent = reviews.map((review) => ({
    ...review,
    content: JSON.parse(review.content) as AnnualReviewContent,
  }));

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Annual Reviews</h1>
          <p className="text-slate-600 mt-2">
            Your comprehensive yearly reflections
          </p>
        </div>
        <Link
          href="/dashboard/reviews/annual/new"
          className="px-6 py-3 bg-slate-900 text-white rounded-lg font-medium hover:bg-slate-800 transition-colors"
        >
          New Annual Review
        </Link>
      </div>

      {reviewsWithParsedContent.length === 0 ? (
        <div className="bg-white rounded-lg border border-slate-200 p-12 text-center">
          <h3 className="text-lg font-semibold text-slate-900 mb-2">
            No annual reviews yet
          </h3>
          <p className="text-slate-600 mb-6">
            Start your first annual review to reflect on the year
          </p>
          <Link
            href="/dashboard/reviews/annual/new"
            className="inline-block px-6 py-3 bg-slate-900 text-white rounded-lg font-medium hover:bg-slate-800 transition-colors"
          >
            Start First Annual Review
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          {reviewsWithParsedContent.map((review) => (
            <Link
              key={review.id}
              href={`/dashboard/reviews/annual/${review.id}`}
              className="block bg-white p-6 rounded-lg border border-slate-200 hover:border-slate-300 transition-colors"
            >
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-xl font-semibold text-slate-900">
                  {formatDate(review.date)}
                </h3>
                <span className="text-sm font-medium text-slate-600 px-3 py-1 bg-orange-50 rounded-full">
                  {review.content.nextYearTheme}
                </span>
              </div>
              <p className="text-slate-700 mb-4 line-clamp-2">
                {review.content.yearSummary}
              </p>
              <div className="flex flex-wrap gap-2">
                {review.content.mostProud.slice(0, 2).map((achievement, idx) => (
                  <span
                    key={idx}
                    className="text-xs text-slate-600 bg-slate-50 px-2 py-1 rounded"
                  >
                    {achievement}
                  </span>
                ))}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
