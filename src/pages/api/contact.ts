import type { APIRoute } from 'astro';
import { config } from '@/lib/config';
import { sendLeadConfirmationEmail } from '@/lib/email';

export const prerender = false;

const LIMITS = { name: 120, email: 200, message: 2000 };
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const json = (status: number, body: Record<string, unknown>) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' },
  });

export const POST: APIRoute = async ({ request }) => {
  let payload: Record<string, unknown>;
  try {
    payload = await request.json();
  } catch {
    return json(400, { error: 'invalid_json' });
  }

  if (typeof payload.company_website === 'string' && payload.company_website.trim() !== '') {
    return json(200, { ok: true });
  }

  const name = String(payload.name ?? '').trim();
  const email = String(payload.email ?? '').trim();
  const message = String(payload.message ?? '').trim();

  if (!name || name.length > LIMITS.name)
    return json(422, { field: 'name', error: 'Add your name so I know who to reply to.' });
  if (!EMAIL_RE.test(email) || email.length > LIMITS.email)
    return json(422, { field: 'email', error: 'That email looks incomplete. Check it and try again.' });
  if (message.length < 10 || message.length > LIMITS.message)
    return json(422, { field: 'message', error: 'Keep it between one sentence and 2,000 characters.' });

  try {
    const res = await fetch(config.leads_hub.leadsHubUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${config.leads_hub.leadsHubToken}`,
      },
      body: JSON.stringify({ email, name, tags: ['website'], fields: { message } }),
    });

    if (!res.ok) {
      console.error('[contact] leads hub error', res.status, await res.text().catch(() => ''));
      return json(502, { error: 'lead_not_saved' });
    }
  } catch (err) {
    console.error('[contact] leads hub unreachable', err);
    return json(502, { error: 'lead_not_saved' });
  }

  try {
    const sent = await sendLeadConfirmationEmail({ to: email, name, message });
    if (!sent) console.error('[contact] welcome email not sent to', email);
  } catch (err) {
    console.error('[contact] welcome email error', err);
  }

  return json(200, { ok: true });
};
