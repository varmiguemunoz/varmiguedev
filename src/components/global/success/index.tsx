import { useEffect, useState } from 'react';
import { CheckCircle } from 'lucide-react';
import Confetti from 'react-confetti';

type SuccessProps = {
  title?: string;
  description?: string;
  steps?: {
    description: string;
  }[];
};

const Success = ({
  title = 'Payment Successful!',
  description = 'Thank you for your purchase! We’ll contact you shortly to kick off your project.',
  steps = [
    {
      description: 'You’ll receive a confirmation email with your purchase details.',
    },
    {
      description:
        'Please schedule your kickoff call — this meeting is essential to understand your business, align on timelines, deliverables, and ensure a smooth process.',
    },
    {
      description:
        'Before the call, you’ll receive an email requesting key details "brand assets, goals, references". Sharing this info in advance helps us prepare targeted questions and move faster.',
    },
  ],
}: SuccessProps) => {
  const [showConfetti, setShowConfetti] = useState(true);
  const [windowDimensions, setWindowDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);

    // Stop confetti after 5 seconds
    const timer = setTimeout(() => {
      setShowConfetti(false);
    }, 5000);

    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(timer);
    };
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden bg-background">
      {showConfetti && (
        <Confetti
          width={windowDimensions.width}
          height={windowDimensions.height}
          recycle={false}
          numberOfPieces={200}
          gravity={0.1}
        />
      )}

      {/* Background Effects */}
      <div className="bg-gradient-radial absolute inset-0 from-primary/20 via-transparent to-transparent opacity-50" />
      <div className="bg-gradient-conic absolute inset-0 from-primary/10 via-accent/10 to-primary/10 opacity-30" />
      <div className="bg-noise absolute inset-0 opacity-[0.015]" />

      {/* Main Content */}
      <div className="container relative z-10 mx-auto flex min-h-screen items-center justify-center px-4 py-16">
        <div className="mx-auto max-w-4xl text-center">
          {/* Hero Section */}
          <div className="mb-16">
            <div className="mb-8 flex justify-center">
              <div className="rounded-full bg-gradient-primary p-4 shadow-glow">
                <CheckCircle className="h-16 w-16 text-primary-foreground" />
              </div>
            </div>

            <h1 className="bg-gradient-text mb-6 bg-clip-text text-6xl font-bold leading-tight text-transparent text-white md:text-7xl">
              {title}
            </h1>

            <p className="mx-auto max-w-3xl text-xl leading-relaxed text-muted-foreground md:text-2xl">{description}</p>
          </div>

          {/* Next Steps Section */}
          <div className="mx-auto mb-12 max-w-2xl rounded-2xl border border-border/50 bg-card/50 p-8 shadow-elegant backdrop-blur-sm md:p-12">
            <h2 className="mb-8 text-2xl font-semibold text-foreground md:text-3xl">What's next?</h2>

            <div className="space-y-4 text-left">
              {steps.map((step, index) => (
                <div className="flex items-start gap-4">
                  <div className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-primary" />
                  <p className="text-lg text-muted-foreground">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Success;
