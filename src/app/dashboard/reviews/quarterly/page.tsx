import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import Link from "next/link";
import { formatDate } from "@/lib/utils";
import { QuarterlyReviewContent } from "@/types/reviews";

export default async function QuarterlyReviewsPage() {
  const session = await auth();

  if (!session?.user) {
    return null;
  }

  const reviews = await db.review.findMany({
    where: {
      userId: session.user.id,
      type: "QUARTERLY",
    },
    orderBy: { date: "desc" },
    take: 12,
  });

  const reviewsWithParsedContent = reviews.map((review) => ({
    ...review,
    content: JSON.parse(review.content) as QuarterlyReviewContent,
  }));

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Quarterly Reviews</h1>
          <p className="text-slate-600 mt-2">
            Your quarterly goal alignment and Life Map ratings
          </p>
        </div>
        <Link
          href="/dashboard/reviews/quarterly/new"
          className="px-6 py-3 bg-slate-900 text-white rounded-lg font-medium hover:bg-slate-800 transition-colors"
        >
          New Quarterly Review
        </Link>
      </div>

      {reviewsWithParsedContent.length === 0 ? (
        <div className="bg-white rounded-lg border border-slate-200 p-12 text-center">
          <h3 className="text-lg font-semibold text-slate-900 mb-2">
            No quarterly reviews yet
          </h3>
          <p className="text-slate-600 mb-6">
            Start your first quarterly review to track alignment
          </p>
          <Link
            href="/dashboard/reviews/quarterly/new"
            className="inline-block px-6 py-3 bg-slate-900 text-white rounded-lg font-medium hover:bg-slate-800 transition-colors"
          >
            Start First Quarterly Review
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {reviewsWithParsedContent.map((review) => (
            <Link
              key={review.id}
              href={`/dashboard/reviews/quarterly/${review.id}`}
              className="bg-white p-6 rounded-lg border border-slate-200 hover:border-slate-300 transition-colors"
            >
              <h3 className="font-semibold text-slate-900 mb-2">
                {formatDate(review.date)}
              </h3>
              <div className="space-y-2 text-sm text-slate-600">
                <p>{review.content.biggestWins[0]}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
