import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2023-10-16",
});
  

export async function POST(request: Request) {
  try {
    const { sessionId } = await request.json();

    const session = await stripe.checkout.sessions.retrieve(sessionId);

    return NextResponse.json(session);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch payment details' }, { status: 500 });
  }
}