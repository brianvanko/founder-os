import { auth } from "@/lib/auth";
import Link from "next/link";
import {
  INTERVIEW_TYPE_LABELS,
  INTERVIEW_TYPE_DESCRIPTIONS,
} from "@/types/interviews";

export default async function InterviewsPage() {
  const session = await auth();

  if (!session?.user) {
    return null;
  }

  const interviewTypes = [
    {
      type: "PAST_YEAR_REFLECTION",
      name: INTERVIEW_TYPE_LABELS.PAST_YEAR_REFLECTION,
      description: INTERVIEW_TYPE_DESCRIPTIONS.PAST_YEAR_REFLECTION,
      href: "/dashboard/interviews/past-year-reflection",
      color: "bg-blue-50 border-blue-200 hover:bg-blue-100",
    },
    {
      type: "IDENTITY_AND_VALUES",
      name: INTERVIEW_TYPE_LABELS.IDENTITY_AND_VALUES,
      description: INTERVIEW_TYPE_DESCRIPTIONS.IDENTITY_AND_VALUES,
      href: "/dashboard/interviews/identity-values",
      color: "bg-purple-50 border-purple-200 hover:bg-purple-100",
    },
    {
      type: "FUTURE_SELF_INTERVIEW",
      name: INTERVIEW_TYPE_LABELS.FUTURE_SELF_INTERVIEW,
      description: INTERVIEW_TYPE_DESCRIPTIONS.FUTURE_SELF_INTERVIEW,
      href: "/dashboard/interviews/future-self",
      color: "bg-orange-50 border-orange-200 hover:bg-orange-100",
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Interviews</h1>
        <p className="text-slate-600 mt-2">
          Deep reflection exercises to gain clarity on your past, values, and
          future
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {interviewTypes.map((interview) => (
          <Link
            key={interview.type}
            href={interview.href}
            className={`p-6 rounded-lg border-2 transition-colors ${interview.color}`}
          >
            <h3 className="text-lg font-semibold text-slate-900 mb-2">
              {interview.name}
            </h3>
            <p className="text-sm text-slate-600">{interview.description}</p>
          </Link>
        ))}
      </div>

      <div className="bg-slate-50 border border-slate-200 rounded-lg p-6">
        <h3 className="text-sm font-semibold text-slate-900 mb-2">
          About Interviews
        </h3>
        <p className="text-sm text-slate-600">
          These are one-time deep reflection exercises designed to help you gain
          clarity. Take your time with each one - they're meant to be
          thoughtful and thorough.
        </p>
      </div>
    </div>
  );
}
