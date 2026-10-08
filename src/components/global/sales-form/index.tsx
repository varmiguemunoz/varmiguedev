import { Phone, CheckCircle } from 'lucide-react';
import FormSalesCRM from './form-sales-crm';

export default function SalesContactForm() {
  return (
    <section className="relative overflow-hidden bg-gradient-background py-24 md:px-4">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/20 via-transparent to-transparent" />

      {/* Noise Texture */}
      <div
        className="absolute inset-0 opacity-20 mix-blend-soft-light"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      <div className="container relative z-10 mx-auto">
        <div className="grid w-full items-center gap-12 lg:grid-cols-2">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="flex items-center gap-2 text-primary">
              <Phone className="h-5 w-5" />
              <span className="text-sm font-medium">Talk to sales</span>
              <span className="font-semibold text-accent">+57 302-327-8057</span>
            </div>

            <div className="space-y-6">
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

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <CheckCircle className="h-5 w-5 flex-shrink-0 text-primary" />
                <span className="text-muted-foreground">Expand your team’s technical capacity</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="h-5 w-5 flex-shrink-0 text-primary" />
                <span className="text-muted-foreground">Deliver client work faster and with less stress</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="h-5 w-5 flex-shrink-0 text-accent" />
                <span className="text-muted-foreground">Get expert support across web, mobile & automations</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="h-5 w-5 flex-shrink-0 text-accent" />
                <span className="text-muted-foreground">Stay flexible — no long-term contracts or overhead</span>
              </div>
            </div>
          </div>
          {/* Right Form */}
          <FormSalesCRM />
        </div>
      </div>
    </section>
  );
}
