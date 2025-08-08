import { Phone } from 'lucide-react';
import FormSalesCRM from '../form-sales-crm';

export default function FormMarketing() {
  return (
    <section className="relative overflow-hidden bg-gradient-background py-24 md:px-4">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/20 via-transparent to-transparent" />

      <div className="container relative z-10 mx-auto flex max-w-3xl flex-col items-center justify-center">
        <div className="mx-auto space-y-8 text-center">
          <div className="flex w-full items-center items-center justify-center gap-2 text-primary">
            <Phone className="h-5 w-5" />
            <span className="text-sm font-medium">Talk to sales</span>
            <span className="font-semibold text-accent">+57 302-327-8057</span>
          </div>

          <div className="space-y-6 text-center">
            <h2 className="text-4xl font-bold leading-tight lg:text-5xl">
              <span className="text-foreground">Build faster, deliver better</span>
              <br />
              <span className="text-foreground">and scale</span>
              <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                {' '}
                without the overhead
              </span>
            </h2>

            <p className="text-xl leading-relaxed text-muted-foreground">
              Discover how flexible monthly dev hours can help your agency deliver faster, scale smarter, and keep
              clients happy without hiring or delays.
            </p>
          </div>

          <FormSalesCRM />
        </div>
      </div>
    </section>
  );
}
