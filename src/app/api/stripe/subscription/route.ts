import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";

export async function GET() {
  const session = await auth();

  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const subscription = await db.subscription.findUnique({
      where: { userId: session.user.id },
      select: {
        id: true,
        status: true,
        stripeCurrentPeriodEnd: true,
        stripePriceId: true,
      },
    });

    if (!subscription) {
      return NextResponse.json(null);
    }

    return NextResponse.json(subscription);
  } catch (error) {
    console.error("Fetch subscription error:", error);
    return NextResponse.json(
      { error: "Failed to fetch subscription" },
      { status: 500 }
    );
  }
}
