"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { IdentityValuesForm } from "@/components/interviews/identity-values-form";
import { IdentityValuesContent } from "@/types/interviews";
import Link from "next/link";

export default function IdentityValuesPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (data: IdentityValuesContent) => {
    setIsSubmitting(true);
    setError("");

    try {
      const response = await fetch("/api/interviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "IDENTITY_AND_VALUES",
          content: data,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to save interview");
      }

      router.push("/dashboard/interviews");
      router.refresh();
    } catch (error: any) {
      setError(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-3xl font-bold text-slate-900">
            Identity & Values
          </h1>
          <Link
            href="/dashboard/interviews"
            className="text-sm text-slate-600 hover:text-slate-900"
          >
            ← Back
          </Link>
        </div>
        <p className="text-slate-600">
          Define your core values, principles, and identity - who you are at
          your best
        </p>
      </div>

      {error && (
        <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      <IdentityValuesForm onSubmit={handleSubmit} isSubmitting={isSubmitting} />
    </div>
  );
}
