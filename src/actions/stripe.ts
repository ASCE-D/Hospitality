"use server"
import Stripe from "stripe";

interface PaymentData {
  firstName: string;
  lastName: string;
  feature: string;
  price: number;
}

export async function stripe(data: PaymentData) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: "2023-10-16",
  });

  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price_data: {
          currency: "eur",
          product_data: {
            name: data.feature,
            description: `${data.feature} service for ${data.firstName} ${data.lastName}`,
          },
          unit_amount: data.price * 100, // Stripe expects the amount in cents
        },
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: `https://hospitality-liart.vercel.app/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `https://hospitality-liart.vercel.app/cancel`,
    metadata: {
      firstName: data.firstName,
      lastName: data.lastName,
      feature: data.feature,
      paymentType: "Hotel Service",
    },
  });

  return session.url;
}