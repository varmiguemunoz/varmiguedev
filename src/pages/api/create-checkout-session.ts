import type { APIRoute } from 'astro';
import Stripe from 'stripe';

const stripeSecretKey = import.meta.env.STRIPE_SECRET_KEY;
const siteUrl = import.meta.env.SITE_URL;

if (!stripeSecretKey) throw new Error('Missing STRIPE_SECRET_KEY');
if (!siteUrl) throw new Error('Missing SITE_URL');

const stripe = new Stripe(stripeSecretKey);

export const POST: APIRoute = async ({ request }) => {
  try {
    const { priceId, planName, hours } = await request.json();
    const origin = request.headers.get('origin') || siteUrl;

    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${origin}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/payment/canceled`,
      metadata: {
        planName,
        hours: hours.toString(),
      },
    });

    return new Response(JSON.stringify({ url: session.url }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: 'Failed to create session' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
