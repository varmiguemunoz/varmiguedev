import welcomeEmail from './templates/welcome';

export const templates = {
  default: welcomeEmail,
} as const;

export type EmailTemplateKey = keyof typeof templates;
