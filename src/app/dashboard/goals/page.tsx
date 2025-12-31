import { auth } from "@/lib/auth";
import Link from "next/link";

export default async function GoalsPage() {
  const session = await auth();

  if (!session?.user) {
    return null;
  }

  const goalTimeframes = [
    {
      name: "1-Year Goals",
      description: "Your goals for the next 12 months",
      href: "/dashboard/goals/1-year",
      color: "bg-blue-50 border-blue-200 hover:bg-blue-100",
    },
    {
      name: "3-Year Goals",
      description: "Your medium-term vision (36 months)",
      href: "/dashboard/goals/3-year",
      color: "bg-purple-50 border-purple-200 hover:bg-purple-100",
    },
    {
      name: "10-Year Goals",
      description: "Your long-term aspirations",
      href: "/dashboard/goals/10-year",
      color: "bg-orange-50 border-orange-200 hover:bg-orange-100",
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Goals</h1>
        <p className="text-slate-600 mt-2">
          Track your 1-year, 3-year, and 10-year goals
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {goalTimeframes.map((timeframe) => (
          <Link
            key={timeframe.name}
            href={timeframe.href}
            className={`p-6 rounded-lg border-2 transition-colors ${timeframe.color}`}
          >
            <h3 className="text-lg font-semibold text-slate-900 mb-2">
              {timeframe.name}
            </h3>
            <p className="text-sm text-slate-600">{timeframe.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
