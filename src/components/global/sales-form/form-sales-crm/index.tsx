import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

import { ArrowRight } from 'lucide-react';

export default function FormSalesCRM() {
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const form = e.currentTarget;
      const formData = new FormData(form);

      for (let [key, value] of formData.entries()) {
        console.log(`${key}: ${value}`);
      }

      // Validate required fields
      const requiredFields = ['firstName', 'lastName', 'email', 'consent'];
      const missingFields = requiredFields.filter((field) => !formData.get(field));

      if (missingFields.length > 0) {
        alert(`Please fill in all required fields: ${missingFields.join(', ')}`);
        return;
      }

      const payload = Object.fromEntries(formData.entries()) as Record<string, any>;

      if (payload.consent === 'on') {
        payload.consent = true;
      } else if (payload.consent === undefined) {
        payload.consent = false;
      }

      const requestBody = JSON.stringify(payload);

      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: requestBody,
      });

      const result = await response.json();

      if (!response.ok) {
        alert(`Error: ${result.error || 'Failed to subscribe'}`);
        return;
      }

      form.reset();
      alert(result.message || 'Form submitted successfully! 🎉');
    } catch (error) {
      console.log('Form submission error:', error);
      alert('Failed to submit form. Please try again.');
    }
  };

  return (
    <div className="relative mx-auto w-full max-w-3xl">
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary/20 to-accent/20 blur-3xl" />
      <div className="relative rounded-3xl border border-primary/20 bg-card/90 px-6 py-8 shadow-glow backdrop-blur-sm md:px-8 md:py-10">
        <form onSubmit={(e) => handleSubmit(e)} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col items-start gap-2 space-y-2">
              <Label htmlFor="firstName" className="px-2 text-foreground">
                First Name
              </Label>
              <Input
                id="firstName"
                name="firstName"
                className="border-border/50 bg-background/50 focus:border-primary/50 focus:ring-primary/20"
                required
              />
            </div>
            <div className="flex flex-col items-start gap-2 space-y-2">
              <Label htmlFor="lastName" className="px-2 text-foreground">
                Last Name
              </Label>
              <Input
                id="lastName"
                name="lastName"
                className="border-border/50 bg-background/50 focus:border-primary/50 focus:ring-primary/20"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col items-start gap-2 space-y-2">
              <Label htmlFor="email" className="px-2 text-foreground">
                Email
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                className="border-border/50 bg-background/50 focus:border-primary/50 focus:ring-primary/20"
                required
              />
            </div>
            <div className="flex flex-col items-start gap-2 space-y-2">
              <Label htmlFor="phone" className="px-2 text-foreground">
                Phone
              </Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                className="border-border/50 bg-background/50 focus:border-primary/50 focus:ring-primary/20"
              />
            </div>
          </div>

          <div className="flex flex-col items-start gap-2 space-y-2">
            <Label htmlFor="company" className="px-2 text-foreground">
              Company
            </Label>
            <Input
              id="company"
              name="company"
              className="border-border/50 bg-background/50 focus:border-primary/50 focus:ring-primary/20"
            />
          </div>

          <div className="flex flex-col items-start gap-2 space-y-2">
            <Label htmlFor="message" className="px-2 text-foreground">
              How can we help you?
            </Label>
            <Textarea
              id="message"
              name="message"
              rows={4}
              className="resize-none border-border/50 bg-background/50 focus:border-primary/50 focus:ring-primary/20"
              placeholder="Tell us about your project or goals..."
            />
          </div>

          <div className="flex items-center space-x-2">
            <input type="checkbox" id="consent" name="consent" className="rounded border-border/50" required />
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
  );
}
