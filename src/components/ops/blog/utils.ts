export const categoryLabels: Record<string, string> = {
  'ai-tools': 'AI agents',
  'dev-tips': 'Engineering',
  'tech-stack': 'Tech stack',
  automation: 'Automation',
  'agency-workflow': 'Agency workflow',
  others: 'Notes',
};

export const categoryLabel = (id: string) => categoryLabels[id] ?? id;

export const formatDate = (date: Date | string) =>
  new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric', timeZone: 'UTC' });

export const isoDate = (date: Date | string) => new Date(date).toISOString();
