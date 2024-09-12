import Stripe from "stripe";
import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/utils/prismaDB";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2023-10-16",
});

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(req: NextApiRequest, res: NextApiResponse) {
  const sig = req.headers['stripe-signature'] as string;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
  } catch (err: any) {
    res.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }

  // Handle the event
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;
    
    const restaurantId = session.metadata?.restaurantId;
    const price = session.amount_total;
    const customerEmail = session.customer_details?.email;

    try {
      await prisma.paymentDetails.create({
        data: {
          stripeSessionId: session.id,
          amount: price || 0,
          currency: session.currency || 'usd',
          status: session.payment_status || 'unknown',
          restaurantId: restaurantId || '',
          customerEmail: customerEmail || '',
          paymentType: session.metadata?.paymentType || 'reservation',
        },
      });

      console.log(`Payment completed for Restaurant ID: ${restaurantId}, Price: ${price}, Customer Email: ${customerEmail}`);
    } catch (error) {
      console.error('Error saving payment details:', error);
      res.status(500).json({ error: 'Failed to save payment details' });
      return;
    }
  }

  res.json({ received: true });
}