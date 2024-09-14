import Stripe from "stripe";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/utils/prismaDB";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2023-10-16",
});

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(req: NextRequest) {
  const body = await req.text();
  const sig = req.headers.get("stripe-signature") as string;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, sig, endpointSecret);
  } catch (err: any) {
    return NextResponse.json(
      { error: `Webhook Error: ${err.message}` },
      { status: 400 },
    );
  }

  // Handle the event
  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const restaurantId = session.metadata?.restaurantId;
    const price = session.amount_total;
    const customerEmail = session.customer_details?.email;

    try {
      await prisma.paymentDetails.create({
        data: {
          stripeSessionId: session.id,
          amount: price || 0,
          currency: session.currency || "usd",
          status: session.payment_status || "unknown",
          restaurantId: restaurantId || "",
          customerEmail: customerEmail || "",
          paymentType: session.metadata?.paymentType || "reservation",
        },
      });
      console.log(
        `Payment completed for Restaurant ID: ${restaurantId}, Price: ${price}, Customer Email: ${customerEmail}`,
      );
    } catch (error) {
      console.error("Error saving payment details:", error);
      return NextResponse.json(
        { error: "Failed to save payment details" },
        { status: 500 },
      );
    }
  }

  return NextResponse.json({ received: true });
}
