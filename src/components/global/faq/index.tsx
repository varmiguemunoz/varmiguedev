import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const faqs = [
  {
    question: 'How does the monthly subscription work?',
    answer:
      'You get a fixed number of dev hours each month across web, mobile, automation, and infrastructure. No project-based billing - just predictable monthly costs with expert development support.',
  },
  {
    question: 'What technologies do you work with?',
    answer:
      'Web: React, Next.js, Astro, Node.js. Mobile: iOS native development. Infrastructure: AWS, Docker, CI/CD. Automation: Python scripting, AI agents, API integrations.',
  },
  {
    question: 'Can I change or pause my plan?',
    answer:
      'Yes, you can upgrade, downgrade, or pause your subscription with 30 days notice. I work with growing agencies and understand your needs change.',
  },
  {
    question: 'What if I need more hours in a month?',
    answer:
      "Additional hours are available at $150/hour. I'll always communicate before exceeding your monthly allocation and get approval first.",
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
