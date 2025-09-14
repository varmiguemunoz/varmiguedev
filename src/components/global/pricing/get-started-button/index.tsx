import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { toast } from 'sonner';

type GetStartedButtonProps = {
  plan: {
    popular: boolean;
    stripePriceId: string;
    name: string;
    hours: string;
    redirectUrl?: string;
  };
};

export default function GetStartedButton({ plan }: GetStartedButtonProps) {
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    try {
      setLoading(true);

      const res = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          priceId: plan.stripePriceId,
          planName: plan.name,
          hours: plan.hours,
          redirectUrl: plan.redirectUrl,
        }),
      });

      if (!res.ok) throw new Error('Failed to create Stripe Checkout Session.');

      const { url } = await res.json();
      if (!url) throw new Error('Missing Checkout URL from server.');

      window.location.href = url;
    } catch (err) {
      console.error(err);
      toast.error('The payment process could not be initiated. Please try again');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      onClick={handleClick}
      className={`w-full ${
        plan.popular ? 'bg-gradient-primary hover:shadow-glow' : 'border border-border hover:bg-secondary'
      }`}
      disabled={loading}
      variant={plan.popular ? 'default' : 'outline'}
    >
      {loading ? 'Redirecting…' : 'Get Started'}
    </Button>
  );
}
