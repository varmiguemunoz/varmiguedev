import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useState } from 'react';

import { ArrowRight } from 'lucide-react';

export default function FormSalesCRM() {
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
    <div className="relative mx-auto max-w-2xl">
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary/20 to-accent/20 blur-3xl" />
      <div className="relative rounded-3xl border border-primary/20 bg-card/90 px-6 py-8 shadow-glow backdrop-blur-sm md:px-8 md:py-10">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col items-start gap-2 space-y-2">
              <Label htmlFor="firstName" className="px-2 text-foreground">
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
            <div className="flex flex-col items-start gap-2 space-y-2">
              <Label htmlFor="lastName" className="px-2 text-foreground">
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
            <div className="flex flex-col items-start gap-2 space-y-2">
              <Label htmlFor="email" className="px-2 text-foreground">
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
            <div className="flex flex-col items-start gap-2 space-y-2">
              <Label htmlFor="phone" className="px-2 text-foreground">
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

          <div className="flex flex-col items-start gap-2 space-y-2">
            <Label htmlFor="company" className="px-2 text-foreground">
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

          <div className="flex flex-col items-start gap-2 space-y-2">
            <Label htmlFor="message" className="px-2 text-foreground">
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
  );
}
