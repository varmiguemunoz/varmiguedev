import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Phone, CheckCircle, Clock, Users, ArrowRight } from 'lucide-react';
import { useState } from 'react';

export default function SalesContactForm() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    message: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

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
        <div className="grid items-center gap-12 lg:grid-cols-2">
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
          <div className="relative">
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary/20 to-accent/20 blur-3xl" />
            <div className="relative rounded-3xl border border-primary/20 bg-card/90 p-8 shadow-glow backdrop-blur-sm">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName" className="text-foreground">
                      First Name
                    </Label>
                    <Input
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className="border-border/50 bg-background/50 focus:border-primary/50 focus:ring-primary/20"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName" className="text-foreground">
                      Last Name
                    </Label>
                    <Input
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className="border-border/50 bg-background/50 focus:border-primary/50 focus:ring-primary/20"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-foreground">
                      Email
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="border-border/50 bg-background/50 focus:border-primary/50 focus:ring-primary/20"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-foreground">
                      Phone
                    </Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="border-border/50 bg-background/50 focus:border-primary/50 focus:ring-primary/20"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="company" className="text-foreground">
                    Company
                  </Label>
                  <Input
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    className="border-border/50 bg-background/50 focus:border-primary/50 focus:ring-primary/20"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message" className="text-foreground">
                    How can we help you?
                  </Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={4}
                    className="resize-none border-border/50 bg-background/50 focus:border-primary/50 focus:ring-primary/20"
                    placeholder="Tell us about your project or goals..."
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="consent" className="rounded border-border/50" required />
                  <Label htmlFor="consent" className="text-sm text-muted-foreground">
                    I agree to receive communications from your team
                  </Label>
                </div>

                <Button
                  type="submit"
                  className="group w-full bg-gradient-primary py-6 text-lg font-semibold text-white transition-all duration-300 hover:shadow-glow"
                >
                  Send form
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
