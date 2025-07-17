import { useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Github, Linkedin, Mail } from 'lucide-react';

import { ScrollTrigger } from 'gsap/ScrollTrigger';

import Hero3D from './hero-3d';
import gsap from 'gsap';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function HeroSection() {
  const heroRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const modelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!heroRef.current || !textRef.current || !modelRef.current) return;

    const tl = gsap.timeline();

    // Initial animation on load
    tl.fromTo(
      textRef.current.children,
      {
        opacity: 0,
        y: 50,
        scale: 0.9,
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1,
        stagger: 0.2,
        ease: 'power3.out',
      }
    );

    tl.fromTo(
      modelRef.current,
      {
        opacity: 0,
        x: 100,
        rotationY: 45,
      },
      {
        opacity: 1,
        x: 0,
        rotationY: 0,
        duration: 1.2,
        ease: 'power3.out',
      },
      '-=0.5'
    );

    // Scroll animation
    ScrollTrigger.create({
      trigger: heroRef.current,
      start: 'top center',
      end: 'bottom top',
      scrub: 1,
      onUpdate: (self) => {
        const progress = self.progress;
        gsap.to(modelRef.current, {
          x: -100 * progress,
          rotationY: 360 * progress,
          duration: 0.3,
          ease: 'none',
        });
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <section ref={heroRef} className="bg-gradient-background relative flex min-h-screen items-center overflow-hidden">
      {/* Background Effects */}
      <div className="from-primary/10 to-accent/10 absolute inset-0 bg-gradient-to-br via-transparent" />
      <div className="from-primary/20 absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] via-transparent to-transparent" />

      {/* Noise Texture */}
      <div
        className="absolute inset-0 opacity-20 mix-blend-soft-light"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      <div className="container relative z-10 mx-auto px-6">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Left Content */}
          <div ref={textRef} className="space-y-8">
            <div className="space-y-4">
              <div className="bg-primary/10 border-primary/20 inline-flex items-center gap-2 rounded-full border px-4 py-2 backdrop-blur-sm">
                <div className="bg-accent h-2 w-2 animate-pulse rounded-full" />
                <span className="text-muted-foreground text-sm font-medium">Available for projects</span>
              </div>

              <h1 className="text-5xl font-bold leading-tight lg:text-7xl">
                <span className="from-foreground via-primary to-accent bg-gradient-to-r bg-clip-text text-transparent">
                  Miguel Angel
                </span>
                <br />
                <span className="text-muted-foreground">Software Engineer</span>
              </h1>

              <p className="text-muted-foreground max-w-2xl text-xl leading-relaxed">
                I build <span className="text-primary font-semibold">high-performance</span> digital products that drive
                real business impact. From <span className="text-accent font-semibold">startup MVPs</span> to enterprise
                solutions, I deliver code that scales.
              </p>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row">
              <Button variant="hero" size="xl" className="group">
                View Services
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button variant="outline" size="xl">
                Download CV
              </Button>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-6 pt-4">
              <span className="text-muted-foreground text-sm font-medium">Connect:</span>
              <div className="flex items-center gap-4">
                <a
                  href="https://github.com"
                  className="bg-card hover:bg-primary/10 group rounded-lg p-2 transition-colors"
                >
                  <Github className="text-muted-foreground group-hover:text-primary h-5 w-5 transition-colors" />
                </a>
                <a
                  href="https://linkedin.com"
                  className="bg-card hover:bg-primary/10 group rounded-lg p-2 transition-colors"
                >
                  <Linkedin className="text-muted-foreground group-hover:text-primary h-5 w-5 transition-colors" />
                </a>
                <a
                  href="mailto:hello@miguel.dev"
                  className="bg-card hover:bg-accent/10 group rounded-lg p-2 transition-colors"
                >
                  <Mail className="text-muted-foreground group-hover:text-accent h-5 w-5 transition-colors" />
                </a>
              </div>
            </div>

            {/* Stats */}
            <div className="border-border/50 grid grid-cols-3 gap-8 border-t pt-8">
              <div>
                <div className="text-primary text-2xl font-bold">50+</div>
                <div className="text-muted-foreground text-sm">Projects Delivered</div>
              </div>
              <div>
                <div className="text-accent text-2xl font-bold">5+</div>
                <div className="text-muted-foreground text-sm">Years Experience</div>
              </div>
              <div>
                <div className="text-primary text-2xl font-bold">24h</div>
                <div className="text-muted-foreground text-sm">Response Time</div>
              </div>
            </div>
          </div>

          {/* Right 3D Model */}
          <div ref={modelRef} className="relative h-[600px] lg:h-[700px]">
            <div className="from-primary/20 to-accent/20 absolute inset-0 rounded-3xl bg-gradient-to-br blur-3xl" />
            <div className="border-primary/20 bg-card/50 relative h-full overflow-hidden rounded-3xl border backdrop-blur-sm">
              <Hero3D />
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 transform">
        <div className="text-muted-foreground flex flex-col items-center gap-2">
          <span className="text-sm font-medium">Scroll to explore</span>
          <div className="flex h-10 w-6 justify-center rounded-full border-2 border-current">
            <div className="mt-2 h-3 w-1 animate-bounce rounded-full bg-current" />
          </div>
        </div>
      </div>
    </section>
  );
}
