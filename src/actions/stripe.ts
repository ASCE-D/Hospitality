"use server"

import Stripe from "stripe";

export async function stripe(data:any) {
    const stripe = new Stripe(" sk_test_51ORESZFdzidHbKbkt49St8FS4UsUaQsaHvDpEuZ8zIXPn2qnTQ9jK4qgQwwLowljjMNwyFt8SVCUpaBR29qZdpl400O90wUxjO", {
      apiVersion: "2023-10-16",
    });

    let { roomid, price, description } = JSON.parse(data);
  
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: description + " " + roomid,
             
            },
            unit_amount: price,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: "http://localhost:3000/",
      cancel_url: "http://localhost:3000/",
    });
  
    return session.url;
}