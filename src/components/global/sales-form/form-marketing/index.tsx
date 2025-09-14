import { Phone } from 'lucide-react';
import FormSalesCRM from '../form-sales-crm';

type TextPart = {
  text: string;
  gradient?: boolean;
  highlight?: boolean;
};

type FormMarketingProps = {
  badge?: string;
  title?: TextPart[];
  description?: TextPart[];
};

export default function FormMarketing({
  badge = 'Talk to sales',
  title = [
    { text: 'Build faster, deliver better and scale', gradient: false },
    { text: ' and scale', gradient: true },
    { text: ' without the overhead', gradient: true },
  ],
  description = [
    {
      text: 'From landing pages to full redesigns, we deliver one-time projects with clear pricing and fast turnaround.',
    },
    { text: 'Get a professional digital presence in days, ', highlight: true },
    { text: 'not months—without ' },
    {
      text: 'hidden costs',
      highlight: true,
    },
    { text: 'or' },
    { text: 'the burden of hiring an internal team.', highlight: true },
  ],
}: FormMarketingProps) {
  return (
    <section className="relative overflow-hidden bg-gradient-background py-24 md:px-4">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/20 via-transparent to-transparent" />

      <div className="container relative z-10 mx-auto flex max-w-3xl flex-col items-center justify-center">
        <div className="mx-auto space-y-8 text-center">
          {/* Badge */}
          <div className="flex w-full items-center justify-center gap-2 text-primary">
            <Phone className="h-5 w-5" />
            <span className="text-sm font-medium">{badge}</span>
            <a href="tel:+16028731518" className="font-semibold text-accent">
              +1 602 873‑1518
            </a>
          </div>

          {/* Title */}
          <h2 className="text-4xl font-bold leading-tight lg:text-5xl">
            {title.map((part, i) =>
              part.text === '\n' ? (
                <br key={i} />
              ) : (
                <span
                  key={i}
                  className={
                    part.gradient
                      ? 'bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent'
                      : 'text-foreground'
                  }
                >
                  {part.text}
                </span>
              )
            )}
          </h2>

          {/* Description */}
          <p className="text-xl leading-relaxed text-muted-foreground">
            {description.map((part, i) => (
              <span key={i} className={part.highlight ? 'font-semibold text-accent' : undefined}>
                {part.text}
              </span>
            ))}
          </p>

          {/* Form */}
          <FormSalesCRM />
        </div>
      </div>
    </section>
  );
}
