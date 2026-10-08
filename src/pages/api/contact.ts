import type { APIRoute } from 'astro';

export const prerender = false;

const LIMITS = { name: 120, email: 200, message: 2000 };
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const json = (status: number, body: Record<string, unknown>) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' },
  });

const escapeHtml = (value: string) =>
  value.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!);

const env = (key: string): string | undefined =>
  (import.meta.env as Record<string, string | undefined>)[key] ?? process.env[key];

export const POST: APIRoute = async ({ request }) => {
  if (!request.headers.get('content-type')?.includes('application/json')) {
    return json(415, { error: 'unsupported_media_type' });
  }

  let payload: Record<string, unknown>;
  try {
    payload = await request.json();
  } catch {
    return json(400, { error: 'invalid_json' });
  }

  // Honeypot: pretend success so bots learn nothing.
  if (typeof payload.company_website === 'string' && payload.company_website.trim() !== '') {
    return json(200, { ok: true });
  }

  const name = String(payload.name ?? '').trim();
  const email = String(payload.email ?? '').trim();
  const message = String(payload.message ?? '').trim();

  if (!name || name.length > LIMITS.name) {
    return json(422, { field: 'name', error: 'Add your name so I know who to reply to.' });
  }
  if (!EMAIL_RE.test(email) || email.length > LIMITS.email) {
    return json(422, { field: 'email', error: 'That email looks incomplete — check it and try again.' });
  }
  if (message.length < 10 || message.length > LIMITS.message) {
    return json(422, { field: 'message', error: 'Keep it between one sentence and 2,000 characters.' });
  }

  const apiKey = env('RESEND_API_KEY');
  if (!apiKey) {
    console.error('[contact] RESEND_API_KEY is not configured');
    return json(503, { error: 'email_not_configured' });
  }

  const to = env('CONTACT_TO_EMAIL') ?? 'miguelmunoz@bloomify.tech';
  const from = env('CONTACT_FROM_EMAIL') ?? 'varmiguemunoz.com <onboarding@resend.dev>';

  const text = `New project inquiry from the website\n\nName: ${name}\nEmail: ${email}\n\n${message}`;
  const html = `
    <div style="font-family:system-ui,sans-serif;font-size:15px;line-height:1.6;color:#0E1A2B">
      <p style="margin:0 0 16px;color:#3B4A5E">New project inquiry from the website</p>
      <p style="margin:0"><strong>${escapeHtml(name)}</strong> · <a href="mailto:${escapeHtml(email)}">${escapeHtml(
        email
      )}</a></p>
      <blockquote style="margin:16px 0 0;padding:12px 16px;border-left:2px solid #F2A93B;background:#EEF1F4;white-space:pre-wrap">${escapeHtml(
        message
      )}</blockquote>
    </div>`;

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: email,
        subject: `Project inquiry — ${name.replace(/[\r\n]+/g, ' ')}`,
        text,
        html,
      }),
    });

    if (!res.ok) {
      console.error('[contact] Resend error', res.status, await res.text().catch(() => ''));
      return json(502, { error: 'send_failed' });
    }

    return json(200, { ok: true });
  } catch (err) {
    console.error('[contact] Network error', err);
    return json(502, { error: 'send_failed' });
  }
};
