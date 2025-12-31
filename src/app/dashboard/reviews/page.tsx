import { auth } from "@/lib/auth";
import Link from "next/link";

export default async function ReviewsPage() {
  const session = await auth();

  if (!session?.user) {
    return null;
  }

  const reviewTypes = [
    {
      name: "Daily Reviews",
      description: "Quick daily check-ins (<60s)",
      href: "/dashboard/reviews/daily",
      color: "bg-blue-50 border-blue-200 hover:bg-blue-100",
    },
    {
      name: "Weekly Reviews",
      description: "Weekly reflection and planning",
      href: "/dashboard/reviews/weekly",
      color: "bg-green-50 border-green-200 hover:bg-green-100",
    },
    {
      name: "Quarterly Reviews",
      description: "Quarterly goal alignment and Life Map ratings",
      href: "/dashboard/reviews/quarterly",
      color: "bg-purple-50 border-purple-200 hover:bg-purple-100",
    },
    {
      name: "Annual Reviews",
      description: "Comprehensive yearly reflection",
      href: "/dashboard/reviews/annual",
      color: "bg-orange-50 border-orange-200 hover:bg-orange-100",
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Reviews</h1>
        <p className="text-slate-600 mt-2">
          Your reflection and review system
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {reviewTypes.map((type) => (
          <Link
            key={type.name}
            href={type.href}
            className={`p-6 rounded-lg border-2 transition-colors ${type.color}`}
          >
            <h3 className="text-lg font-semibold text-slate-900 mb-2">
              {type.name}
            </h3>
            <p className="text-sm text-slate-600">{type.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
