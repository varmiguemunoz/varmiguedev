import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const faqs = [
  {
    question: 'How does the monthly subscription work?',
    answer:
      'You choose a plan with a set number of hours which you can allocate to whatever your agency needs, web development, mobile development, automation, infrastructure, etc... Billing is not project based, only predictable monthly hourly costs with our time tracking and reporting software, at the end of the monthly billing cycle you will receive a document with the total number of hours worked and descriptive reporting tables where you can see in detail what the time was used for.',
  },
  {
    question: 'What happens if I do not use 100% of the hours of my current plan?',
    answer:
      'If you don’t use all your hours in a given month, up to 30% of the unused value is converted into service credit, valid for 30 days. That credit can be used for strategy sessions, audits, or additional dev work — no hours are rolled over directly, but you always get full value for what you pay.',
  },
  {
    question: 'What technologies do you work with?',
    answer:
      'Web: React, Next.js, Astro, Node.js, Tailwind CSS, Shadcn UI, CSS, HTML, Webflow, Wordpress, Shopify. Mobile: React Native, Expo. Infrastructure: AWS, Docker, CI/CD. Automation: Python and Javascript scripting, AI agents, MCP, API integrations.',
  },
  {
    question: 'Can I change or pause my plan?',
    answer:
      'Yes, you can upgrade, downgrade, or pause your subscription with 30 days notice. I work with growing agencies and understand your needs change.',
  },
  {
    question: 'What if I need more hours in a month?',
    answer:
      "Additional hours are available at $20/hour. I'll always communicate before exceeding your monthly allocation and get approval first.",
  },
  {
    question: 'How do we communicate and track progress?',
    answer:
      'I use Slack for daily communication and provide weekly progress updates. All work is tracked in shared project boards with clear deliverables and timelines.',
  },
  {
    question: 'Do you handle emergency fixes?',
    answer:
      'Yes, all plans include emergency support within 4 hours during business hours. Critical production issues get immediate attention.',
  },
];

export default function FAQ() {
  return (
    <section className="px-4 py-24">
      <div className="mx-auto max-w-4xl">
        <div className="mb-16 text-center">
          <h2 className="text-foreground mb-6 text-4xl font-bold md:text-5xl">Frequently Asked Questions</h2>
          <p className="text-muted-foreground mx-auto max-w-2xl text-xl">
            Common questions about working with a dedicated development partner
          </p>
        </div>

        <Accordion type="single" collapsible className="space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="bg-gradient-card border-border hover:shadow-glow hover:border-primary/20 group rounded-lg border px-6 transition-all duration-300"
            >
              <AccordionTrigger className="text-foreground hover:text-primary text-left text-lg font-medium transition-colors duration-200">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground pt-2 leading-relaxed">{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
