import './load-env';

function env(key: string, fallback: string): string {
  return process.env[key] ?? fallback;
}

export const config = {
  leads_hub: {
    leadsHubToken: env('LEADS_HUB_TOKEN', 'XyL43R4Ne0SBn96rjaqyMYEsTL4W1lQj'),
    leadsHubUrl: env('LEADS_HUB_URL', 'https://leads-hub.varmiguemunoz.workers.dev/in/varmiguemunoz-com'),
  },
  resend: {
    resendApiKey: env('RESEND_API_KEY', ''),
    emailFrom: env('EMAIL_FROM', 'noreply@varmiguemunoz.com'),
  },
} as const;
