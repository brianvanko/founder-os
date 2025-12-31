import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import { db } from "@/lib/db";
import { getStripeClient } from "@/lib/stripe";
import Stripe from "stripe";

export async function POST(request: NextRequest) {
  const body = await request.text();
  const signature = (await headers()).get("stripe-signature");

  if (!signature) {
    return NextResponse.json(
      { error: "Missing stripe-signature header" },
      { status: 400 }
    );
  }

  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!webhookSecret) {
    console.error("STRIPE_WEBHOOK_SECRET not configured");
    return NextResponse.json(
      { error: "Webhook secret not configured" },
      { status: 500 }
    );
  }

  let event: Stripe.Event;

  try {
    const stripe = getStripeClient();
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (error) {
    console.error("Webhook signature verification failed:", error);
    return NextResponse.json(
      { error: "Invalid signature" },
      { status: 400 }
    );
  }

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;
        const userId = session.metadata?.userId;

        if (!userId) {
          console.error("No userId in checkout session metadata");
          break;
        }

        // Get subscription details
        const subscriptionId = session.subscription as string;
        const stripe = getStripeClient();
        const subscriptionData = await stripe.subscriptions.retrieve(
          subscriptionId
        );
        const subscription = subscriptionData as Stripe.Subscription;

        // Create or update subscription in database
        const periodEnd = (subscription as any).current_period_end;
        await db.subscription.upsert({
          where: { userId },
          create: {
            userId,
            stripeCustomerId: session.customer as string,
            stripeSubscriptionId: subscriptionId,
            stripePriceId: subscription.items.data[0]!.price.id,
            stripeCurrentPeriodEnd: periodEnd ? new Date(periodEnd * 1000) : null,
            status: subscription.status,
          },
          update: {
            stripeSubscriptionId: subscriptionId,
            stripePriceId: subscription.items.data[0]!.price.id,
            stripeCurrentPeriodEnd: periodEnd ? new Date(periodEnd * 1000) : null,
            status: subscription.status,
          },
        });

        break;
      }

      case "customer.subscription.updated":
      case "customer.subscription.deleted": {
        const subscription = event.data.object as Stripe.Subscription;
        const userId = subscription.metadata?.userId;

        if (!userId) {
          console.error("No userId in subscription metadata");
          break;
        }

        // Update subscription in database
        const periodEnd = (subscription as any).current_period_end;
        await db.subscription.update({
          where: { userId },
          data: {
            stripePriceId: subscription.items.data[0]!.price.id,
            stripeCurrentPeriodEnd: periodEnd ? new Date(periodEnd * 1000) : null,
            status: subscription.status,
          },
        });

        break;
      }

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Webhook handler error:", error);
    return NextResponse.json(
      { error: "Webhook handler failed" },
      { status: 500 }
    );
  }
}
