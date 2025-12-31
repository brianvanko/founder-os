"use client";

import { useEffect, useState } from "react";
import { formatDate } from "@/lib/utils";

interface Subscription {
  id: string;
  status: string;
  stripeCurrentPeriodEnd: Date | null;
  stripePriceId: string;
}

const STRIPE_ENABLED = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ? true : false;

export default function BillingPage() {
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    fetchSubscription();
  }, []);

  const fetchSubscription = async () => {
    try {
      const response = await fetch("/api/stripe/subscription");
      if (response.ok) {
        const data = await response.json();
        setSubscription(data);
      }
    } catch (error) {
      console.error("Failed to fetch subscription:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCheckout = async () => {
    setIsProcessing(true);
    try {
      const response = await fetch("/api/stripe/checkout", {
        method: "POST",
      });
      const data = await response.json();

      if (data.url) {
        window.location.href = data.url;
      } else {
        alert(data.error || "Failed to create checkout session");
        setIsProcessing(false);
      }
    } catch (error) {
      console.error("Checkout error:", error);
      alert("Failed to start checkout");
      setIsProcessing(false);
    }
  };

  const handleManageBilling = async () => {
    setIsProcessing(true);
    try {
      const response = await fetch("/api/stripe/portal", {
        method: "POST",
      });
      const data = await response.json();

      if (data.url) {
        window.location.href = data.url;
      } else {
        alert(data.error || "Failed to open billing portal");
        setIsProcessing(false);
      }
    } catch (error) {
      console.error("Portal error:", error);
      alert("Failed to open billing portal");
      setIsProcessing(false);
    }
  };

  // Show development mode message if Stripe is not configured
  if (!STRIPE_ENABLED) {
    return (
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Billing</h1>
          <p className="text-slate-600 mt-2">
            Manage your subscription and billing information
          </p>
        </div>
        <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-8">
          <div className="flex gap-3 mb-4">
            <span className="text-2xl">🛠️</span>
            <div>
              <h3 className="text-lg font-semibold text-blue-900 mb-2">
                Development Mode
              </h3>
              <p className="text-blue-800 mb-4">
                Stripe is not configured. All features are available for free during development.
              </p>
              <p className="text-sm text-blue-700">
                To enable payments, add your Stripe API keys to the .env file:
                <br />
                - NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
                <br />
                - STRIPE_SECRET_KEY
                <br />
                - STRIPE_WEBHOOK_SECRET
                <br />- STRIPE_PRICE_ID
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Billing</h1>
          <p className="text-slate-600 mt-2">
            Manage your subscription and billing information
          </p>
        </div>
        <div className="bg-white rounded-lg border border-slate-200 p-12 text-center">
          <p className="text-slate-600">Loading subscription...</p>
        </div>
      </div>
    );
  }

  const isActive = subscription?.status === "active";
  const isPastDue = subscription?.status === "past_due";

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Billing</h1>
        <p className="text-slate-600 mt-2">
          Manage your subscription and billing information
        </p>
      </div>

      {/* Subscription Status */}
      <div className="bg-white rounded-lg border-2 border-slate-200 p-6">
        <h2 className="text-lg font-semibold text-slate-900 mb-4">
          Subscription Status
        </h2>

        {!subscription ? (
          <div className="space-y-4">
            <div className="bg-slate-50 border border-slate-200 rounded-lg p-6">
              <p className="text-slate-700 mb-4">
                You don't have an active subscription. Subscribe to unlock all
                features including:
              </p>
              <ul className="space-y-2 text-slate-600 mb-6">
                <li className="flex items-center gap-2">
                  <span className="text-green-600">✓</span>
                  <span>Unlimited reviews and goals</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-600">✓</span>
                  <span>AI-powered insights</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-600">✓</span>
                  <span>File uploads and storage</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-600">✓</span>
                  <span>Full-text search</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-600">✓</span>
                  <span>Export to markdown</span>
                </li>
              </ul>
              <div className="flex items-baseline gap-2 mb-4">
                <span className="text-3xl font-bold text-slate-900">$20</span>
                <span className="text-slate-600">/month</span>
              </div>
            </div>

            <button
              onClick={handleCheckout}
              disabled={isProcessing}
              className="w-full px-6 py-3 bg-slate-900 text-white rounded-lg font-medium hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isProcessing ? "Processing..." : "Subscribe Now"}
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            <div
              className={`rounded-lg p-6 ${
                isActive
                  ? "bg-green-50 border border-green-200"
                  : isPastDue
                  ? "bg-yellow-50 border border-yellow-200"
                  : "bg-red-50 border border-red-200"
              }`}
            >
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-slate-900">
                    {isActive
                      ? "Active Subscription"
                      : isPastDue
                      ? "Payment Past Due"
                      : "Subscription Inactive"}
                  </h3>
                  <p className="text-sm text-slate-600 mt-1">
                    Status:{" "}
                    <span className="font-medium capitalize">
                      {subscription.status}
                    </span>
                  </p>
                </div>
                {isActive && (
                  <span className="text-2xl text-green-600">✓</span>
                )}
              </div>

              {subscription.stripeCurrentPeriodEnd && (
                <p className="text-sm text-slate-700">
                  {isActive ? "Renews on" : "Expired on"}:{" "}
                  <span className="font-medium">
                    {formatDate(new Date(subscription.stripeCurrentPeriodEnd))}
                  </span>
                </p>
              )}
            </div>

            <button
              onClick={handleManageBilling}
              disabled={isProcessing}
              className="w-full px-6 py-3 bg-slate-900 text-white rounded-lg font-medium hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isProcessing ? "Processing..." : "Manage Billing"}
            </button>

            <p className="text-sm text-slate-600 text-center">
              Update payment method, view invoices, or cancel subscription
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
