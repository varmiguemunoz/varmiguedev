import { Resend } from 'resend';
import { config } from './config';
import type { WelcomeEmailInput } from '@/interfaces/email';
import { templates, type EmailTemplateKey } from '@/email/registry';

const globalForResend = globalThis as unknown as {
  __alimunozResend?: Resend;
};

function getResend(): Resend {
  if (!globalForResend.__alimunozResend) {
    globalForResend.__alimunozResend = new Resend(config.resend.resendApiKey);
  }
  return globalForResend.__alimunozResend;
}

export async function sendLeadConfirmationEmail(
  input: WelcomeEmailInput,
  options?: { template?: EmailTemplateKey }
): Promise<boolean> {
  const resend = getResend();
  const template = templates[options?.template ?? 'default'];
  const idempotencyKey = crypto.randomUUID();
  const maxAttempts = 2;

  for (let attempt = 1; attempt <= maxAttempts; attempt += 1) {
    const { error } = await resend.emails.send(
      {
        from: config.resend.emailFrom,
        to: input.to,
        subject: template.subject(input),
        html: template.html(input),
        text: template.text(input),
      },
      { idempotencyKey }
    );

    if (!error) {
      return true;
    }

    if (attempt === maxAttempts) {
      console.error('[email] send failed:', error.message);
      return false;
    }
  }

  return false;
}
