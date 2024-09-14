"use server"
import Stripe from "stripe";

export async function stripe(data: any) {
  const stripe = new Stripe("sk_test_51ORESZFdzidHbKbkt49St8FS4UsUaQsaHvDpEuZ8zIXPn2qnTQ9jK4qgQwwLowljjMNwyFt8SVCUpaBR29qZdpl400O90wUxjO", {
    apiVersion: "2023-10-16",
  });

  let { roomId, restaurantId, price, description, extendedNights } = JSON.parse(data);

  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price_data: {
          currency: 'usd',
          product_data: {
            name: `Extended Stay for Room ${roomId}`,
            description: `Extended stay for ${extendedNights} nights`,
          },
          unit_amount: price,
        },
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: `${process.env.NEXT_PUBLIC_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.NEXT_PUBLIC_URL}/cancel`,
    metadata: {
      roomId,
      restaurantId,
      extendedNights,
      paymentType: "Extended Stay",
    },
  });

  return session.url;
}