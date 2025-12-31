import Stripe from "stripe";

// Initialize Stripe with lazy loading
let _stripe: Stripe | null = null;

export const getStripeClient = () => {
  if (!_stripe) {
    const apiKey = process.env.STRIPE_SECRET_KEY;
    if (!apiKey) {
      throw new Error(
        "Stripe secret key not configured. Please set STRIPE_SECRET_KEY environment variable."
      );
    }
    _stripe = new Stripe(apiKey, {
      apiVersion: "2025-12-15.clover",
      typescript: true,
    });
  }
  return _stripe;
};

// Stripe configuration
export const STRIPE_CONFIG = {
  priceId: process.env.STRIPE_PRICE_ID || "",
  successUrl: `${process.env.NEXTAUTH_URL}/dashboard?session_id={CHECKOUT_SESSION_ID}`,
  cancelUrl: `${process.env.NEXTAUTH_URL}/dashboard/billing`,
};
