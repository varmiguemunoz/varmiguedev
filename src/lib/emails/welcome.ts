import { CAL_LINK } from '@/components/ops/data';

const escapeHtml = (value: string) =>
  value.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!);

const C = {
  paper: '#EEF1F4',
  white: '#FFFFFF',
  ink: '#0E1A2B',
  slate: '#3B4A5E',
  line: '#D5DBE3',
  amber: '#F2A93B',
};

export function welcomeEmail({ name, message }: { name: string; message: string }) {
  const first = name.split(/\s+/)[0] || name;
  const subject = `Got your message, ${first}`;

  const text = [
    `Hi ${first},`,
    '',
    'Thanks for reaching out. Your message is in my inbox and I will reply personally within 24 hours, usually sooner.',
    '',
    'What you sent:',
    message,
    '',
    `Want to talk sooner? Book a 30-minute call: ${CAL_LINK}`,
    '',
    'Miguel Angel Muñoz',
    'AI Integration Engineer',
    'https://www.varmiguemunoz.com',
    '',
    'You are receiving this because you contacted me through varmiguemunoz.com.',
  ].join('\n');

  const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<meta name="color-scheme" content="light" />
<title>${escapeHtml(subject)}</title>
</head>
<body style="margin:0;padding:0;background:${C.paper};">
<span style="display:none;max-height:0;overflow:hidden;opacity:0;">I got your message and will reply personally within 24 hours.</span>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:${C.paper};">
  <tr>
    <td align="center" style="padding:40px 16px;">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:560px;">
        <tr>
          <td style="padding:0 4px 24px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;">
            <table role="presentation" cellpadding="0" cellspacing="0" border="0">
              <tr>
                <td width="28" height="28" align="center" valign="middle" style="background:${C.ink};border-radius:6px;">
                  <span style="display:inline-block;width:8px;height:8px;border-radius:4px;background:${C.amber};"></span>
                </td>
                <td style="padding-left:10px;font-size:16px;font-weight:600;color:${C.ink};letter-spacing:-0.01em;">varmiguemunoz</td>
              </tr>
            </table>
          </td>
        </tr>
        <tr>
          <td style="background:${C.white};border-radius:16px;padding:40px 36px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;">
            <h1 style="margin:0 0 20px;font-size:28px;line-height:1.15;font-weight:600;letter-spacing:-0.02em;color:${C.ink};">Got it, ${escapeHtml(first)}. Talk soon.</h1>
            <p style="margin:0 0 16px;font-size:16px;line-height:1.65;color:${C.slate};">Thanks for reaching out. Your message is in my inbox and I will reply personally within <strong style="color:${C.ink};">24 hours</strong>, usually sooner, with a direct read on whether it is a fit.</p>
            <p style="margin:28px 0 8px;font-size:13px;font-weight:600;color:${C.slate};">What you sent</p>
            <div style="margin:0 0 28px;padding:16px 18px;background:${C.paper};border-radius:12px;border-top:2px solid ${C.amber};font-size:15px;line-height:1.6;color:${C.ink};white-space:pre-wrap;">${escapeHtml(message)}</div>
            <p style="margin:0 0 20px;font-size:16px;line-height:1.65;color:${C.slate};">Prefer to talk it through sooner?</p>
            <table role="presentation" cellpadding="0" cellspacing="0" border="0">
              <tr>
                <td style="background:${C.amber};border-radius:12px;">
                  <a href="${CAL_LINK}" target="_blank" style="display:inline-block;padding:14px 22px;font-size:15px;font-weight:600;color:${C.ink};text-decoration:none;">Book a 30-minute call &rarr;</a>
                </td>
              </tr>
            </table>
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-top:36px;border-top:1px solid ${C.line};">
              <tr>
                <td style="padding-top:20px;font-size:15px;line-height:1.5;color:${C.ink};">
                  <strong>Miguel Angel Muñoz</strong><br />
                  <span style="color:${C.slate};">AI Integration Engineer</span><br />
                  <a href="https://www.varmiguemunoz.com" style="color:${C.ink};text-decoration:underline;">varmiguemunoz.com</a>
                </td>
              </tr>
            </table>
          </td>
        </tr>
        <tr>
          <td style="padding:20px 8px 0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;font-size:12px;line-height:1.5;color:${C.slate};text-align:center;">
            You are receiving this because you contacted me through varmiguemunoz.com.
          </td>
        </tr>
      </table>
    </td>
  </tr>
</table>
</body>
</html>`;

  return { subject, html, text };
}
