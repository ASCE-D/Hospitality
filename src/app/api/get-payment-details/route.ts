import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe("sk_test_51ORESZFdzidHbKbkt49St8FS4UsUaQsaHvDpEuZ8zIXPn2qnTQ9jK4qgQwwLowljjMNwyFt8SVCUpaBR29qZdpl400O90wUxjO", {
    apiVersion: '2023-10-16',
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