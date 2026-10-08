// Single source of truth for the homepage funnel copy.
// Edit content here; components only handle layout and interaction.

export const CAL_LINK ="https://calendar.app.google/xEg68kiB9HdDzMvv7"

export const CONTACT_EMAIL = 'varmiguemunoz@gmail.com';

export type CaseKind = 'finance' | 'whatsapp' | 'leads';

export type FlagshipCase = {
  kind: CaseKind;
  name: string;
  before: string;
  after: string;
  metric: { value: string; label: string };
  secondary: string;
  stack: string[];
  /** Optional screenshot or loop (e.g. '/works/finance-dashboard.webm'). Renders only when set. */
  media?: { src: string; alt: string; type: 'image' | 'video' };
};

export const flagshipCases: FlagshipCase[] = [
  {
    kind: 'finance',
    name: 'AI Finance Assistant on WhatsApp',
    before: 'Every receipt and invoice was typed by hand into QuickBooks and Google Sheets. Slow, repetitive and easy to get wrong.',
    after:
      'The team now sends a photo, a PDF or a quick message on WhatsApp. The agent extracts the data, classifies it, reconciles the books and sends the reports. The CEO asks finance questions in the same chat and gets answers from the live numbers.',
    metric: { value: '80%', label: 'less manual finance work' },
    secondary: '35+ hours saved every week',
    stack: ['WhatsApp', 'QuickBooks', 'Google Sheets', 'Gmail', 'LLM agents'],
  },
  {
    kind: 'whatsapp',
    name: 'WhatsApp AI Platform for Sales & Support',
    before: 'Every sales and support conversation needed a person to answer it.',
    after:
      'AI agents now handle about 70% of the work and pass the conversation to a person only when it truly needs one. I built the platform and I still run it.',
    metric: { value: '1,000+', label: 'conversations a day, in production' },
    secondary: '45+ hours saved every week',
    stack: ['WhatsApp Business API', 'LLM agents'],
  },
  {
    kind: 'leads',
    name: 'AI Lead Sourcing & Scoring Pipeline',
    before: 'The sales team spent its week finding leads, qualifying them and typing them into the CRM by hand.',
    after:
      'The pipeline pulls prospects from ZoomInfo, enriches them on the web, finds the decision makers and writes them into Pipedrive. The rep gets an alert the moment a lead lands. Stale accounts are re-processed and duplicates removed automatically.',
    metric: { value: '40+ h', label: 'saved per week for sales' },
    secondary: 'A clean CRM that stays clean on its own',
    stack: ['ZoomInfo', 'Claude', 'Pipedrive', 'Web enrichment'],
  },
];

export type Build = {
  name: string;
  line: string;
  metric: string;
  body: string[];
  features?: string[];
  stack: string[];
  link?: string;
};

export const moreBuilds: Build[] = [
  {
    name: 'Daylios',
    line: 'An AI-native business manager that Claude runs through MCP',
    metric: 'Used daily to run my consultancy',
    body: [
      'It began as a task manager and became the system I run my consultancy on. Every record is exposed through an MCP server, so Claude always has current context on my work and can act on it.',
      'I ask "what is pending this week?" or "prep me for tomorrow\'s meeting," and Claude does the work, not just the answer.',
    ],
    features: [
      'Projects, tasks, clients and a daily plan',
      'Meetings recorded, transcribed and summarized with action items',
      'Sales pipeline, lead intake by webhook with tag-based routing',
      'Email sequences and newsletters',
    ],
    stack: ['MCP', 'Claude', 'SQLite', 'Resend', 'Webhooks'],
  },
  {
    name: 'SprintOS',
    line: 'The developer operating system. Run your sprints from the terminal.',
    metric: 'Open source and live',
    body: [
      'Project management for developers who live in the terminal: Kanban, sprint planning with velocity tracking, Pomodoro timers and two-way GitHub sync.',
      'An MCP server lets Claude and other assistants read and manage the board. Keyboard first, written in Go.',
    ],
    features: ['Interactive terminal Kanban', 'GitHub PR-driven task movement', 'REST API, webhooks and PDF reports'],
    stack: ['Go', 'Bubble Tea', 'PostgreSQL', 'GORM', 'Cobra', 'MCP'],
    link: 'https://www.sprintos.run',
  },
  {
    name: 'Automated Lead Generation System',
    line: 'Content, outreach and email nurture running as one system',
    metric: '70,000+ monthly views',
    body: [
      'Publishes text and video to YouTube, Instagram, X and LinkedIn, runs outreach with Phantombuster, then nurtures leads by email in GoHighLevel until they book a meeting.',
      'An AI agent connected to email and LinkedIn answers questions along the way.',
    ],
    stack: ['Phantombuster', 'Zapier', 'n8n', 'GoHighLevel', 'LLM agents'],
  },
  {
    name: 'Lanatecuenta',
    line: 'A personal finance app where expenses log themselves',
    metric: 'Voice and Apple Pay capture',
    body: [
      'Log an expense by voice, or let Apple Pay automations capture it. AI sorts every expense into categories and tags and keeps a full history. No typing required.',
    ],
    stack: ['iOS', 'Speech-to-text', 'AI classification', 'Apple Pay automations'],
  },
  {
    name: 'TaoFlow',
    line: 'An AI wellness and ritual platform, on iOS and the web',
    metric: 'End-to-end for a client',
    body: [
      'A Daily Flow Coach, generated audio for guided sessions and a Flow Identity Map with a journal. A memory layer built with LangChain lets the experience adapt to each user instead of starting from zero.',
      'Product and technical design, full-stack development, AI integration and App Store delivery.',
    ],
    stack: ['iOS', 'Web', 'LangChain', 'LLM agents', 'Generated audio'],
  },
  {
    name: 'AI Tutor Agent',
    line: 'Teaches trading from a curated, private knowledge base',
    metric: 'RAG over course material',
    body: [
      'Answers from a private knowledge base, so explanations stay consistent with the course instead of drifting into generic internet answers. An educational tool, not a financial advisor.',
    ],
    stack: ['LLM agent', 'RAG', 'Private knowledge base'],
  },
];

export const situations = [
  {
    id: 'owner',
    label: 'Business owner',
    problem: 'Your team re-types data between WhatsApp, spreadsheets, the CRM and accounting.',
    build: [
      'WhatsApp agents that log, answer and escalate',
      'Automatic reconciliations, budget alerts and reports',
      'Dashboards your team actually opens',
    ],
    timeline: '4 to 10 weeks',
    caseLabel: 'AI Finance Assistant on WhatsApp',
    caseHref: '#case-finance',
  },
  {
    id: 'agency',
    label: 'Agency',
    problem: 'You sell outcomes to your clients, but you lack the engineering team to deliver AI at scale.',
    build: [
      'AI agents you can deploy across client accounts',
      'Lead sourcing, scoring and CRM pipelines',
      'White-label backends and dashboards',
    ],
    timeline: '2 to 5 weeks',
    caseLabel: 'AI Lead Sourcing & Scoring Pipeline',
    caseHref: '#case-leads',
  },
  {
    id: 'startup',
    label: 'Startup',
    problem: 'You need AI inside the product, built to survive real users from day one.',
    build: [
      'LLM features with tool use and MCP servers',
      'RAG over your own product data',
      'Go and Node.js backends at sub-100ms latency',
    ],
    timeline: '4 to 12 weeks',
    caseLabel: 'Daylios, Claude running a product through MCP',
    caseHref: '#more-builds',
  },
] as const;

export const integrations = [
  'Claude',
  'OpenAI',
  'WhatsApp Business',
  'Pipedrive',
  'HubSpot',
  'ZoomInfo',
  'Apollo',
  'QuickBooks',
  'Google Sheets',
  'n8n',
  'Supabase',
  'PostgreSQL',
  'AWS',
  'LangChain',
  'MCP',
];

export type Testimonial = { quote: string; author: string; source: string };

export const featuredTestimonial: Testimonial = {
  quote:
    'Miguel not only excels at the technical side of things, but also brings creativity, commitment, and vision. Qualities that make him a reliable partner and a rising leader within the digital ecosystem.',
  author: 'Mauricio Mejía Medina',
  source: 'Corporate IT Manager at Medtronic, on LinkedIn',
};

export const testimonials: Testimonial[] = [
  {
    quote:
      'He is very knowledgeable and always went above and beyond to make sure everything was functional and working. I would recommend.',
    author: 'Upwork client',
    source: 'Full stack project on Upwork',
  },
  {
    quote: 'Absolutely amazing service! Projects delivered on time and on budget. Will use over and over again. Thank you!!',
    author: 'Mathis Riiber',
    source: 'Google Review',
  },
  {
    quote:
      'Miguel was great, really showed his level of expertise with any issues we ran into he was eager to solve it. Project came out great.',
    author: 'Upwork client',
    source: 'Website update on Upwork',
  },
  {
    quote:
      'He delivered high quality web development and provided constant support throughout the project. Professional, reliable, and highly recommended.',
    author: 'David',
    source: 'Google Review',
  },
  {
    quote: 'Miguel is a skilled, proactive, and responsible developer; I been had a very positive experience working with him over the past several years.',
    author: 'Diego Vanegas',
    source: 'Google Review',
  },
  {
    quote:
      'They supported me step by step with the technical side and the design of our Website and tools. You can really feel they care about your projects.',
    author: 'Yeison Romero',
    source: 'Google Review',
  },
  {
    quote: 'Excellent and impeccable work; very reliable and responsible, with a deep understanding of the clients needs.',
    author: 'cristian cbr',
    source: 'Google Review',
  },
  {
    quote:
      'Miguel is an amazing developer and very nice person to work with. He helped us a lot with our web application development.',
    author: 'Upwork client',
    source: 'Software engineering on Upwork',
  },
];

export const faqs = [
  {
    q: 'What kinds of projects do you take?',
    a: 'AI agents and LLM features inside existing products, RAG over company data, WhatsApp sales and support agents, CRM integrations, and the full-stack work around them. If it has to run in production at real volume, it is in scope.',
  },
  {
    q: 'Will this be a real system or a demo?',
    a: 'A real system. The first version runs on your actual data, with validation, deduplication and error handling. It ends with documentation and a clean handoff, so your team can keep adjusting it without depending on me.',
  },
  {
    q: 'Can you work with the stack we already have?',
    a: 'Yes. That is the whole point. I work with Pipedrive, HubSpot, Apollo, ZoomInfo, WhatsApp Business API, QuickBooks, Google Sheets, Airtable and Supabase. I also join projects already in progress to extend Node.js or Next.js apps.',
  },
  {
    q: 'Do you work hourly or fixed-price?',
    a: 'Both. $23 per hour for ongoing or open-ended work, and a fixed price for clearly defined deliverables. We pick the right model on the discovery call.',
  },
  {
    q: 'How long does a project take?',
    a: 'AI agents and automations take 2 to 6 weeks. Business-wide transformations take 4 to 10 weeks. Startup MVPs take 4 to 12 weeks. You get a realistic estimate on the call, in English or Spanish.',
  },
];
