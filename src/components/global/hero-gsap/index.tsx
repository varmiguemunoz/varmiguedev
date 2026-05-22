import { useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

import { ScrollTrigger } from 'gsap/ScrollTrigger';

import gsap from 'gsap';
import Social from './social';
import Stats from './stats';
import HeroContent, { type HeroContentProps } from './hero-content';
import Scroll from './scroll';

import ThreeScene from './three-model';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

type HeroSectionProps = {
  cta?: {
    primary?: {
      url: string;
      title: string;
    };
    secondary?: {
      url: string;
      title: string;
    };
  };
  heroContent?: HeroContentProps;
};

export default function HeroSection(props: HeroSectionProps) {
  const {
    cta = {
      primary: {
        url: 'https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ3T7zeEOYTFQmof-sbNifFo37K0uW123TO1tf3L6AEUr-2qhDbR8Txol7-9zoAdi6NfmfNTOtQs',
        title: 'Book a free audit',
      },
      secondary: {
        url: '/sales',
        title: 'Talk to sales',
      },
    },
    heroContent = {
      badge: 'Dev Partner for Agencies',
      title: [
        { text: 'Launch your product 3× faster', gradient: true },
        { text: '\n' },
        { text: 'without internal team' },
      ],
      description: [
        { text: 'Need to ' },
        { text: 'launch fast', highlight: true },
        { text: ', deliver ' },
        { text: 'clean code', highlight: true },
        { text: ', and ' },
        { text: 'scale without hiring', highlight: true },
        {
          text: '? I help agencies ship fast, high-performance digital experiences for their clients from landing pages and storefronts to mobile apps and automations.',
        },
      ],
    },
  } = props;

  const heroRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const modelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!heroRef.current || !textRef.current || !modelRef.current) return;

    const tl = gsap.timeline();

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
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative flex min-h-screen items-center overflow-hidden bg-gradient-background pt-8 md:pt-0"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/20 via-transparent to-transparent" />

      {/* Noise Texture */}
      <div className="absolute inset-0 opacity-20 mix-blend-soft-light" />

      <div className="container relative z-10 mx-auto w-full max-w-[1400px] pt-10 md:px-10">
        <div className="grid items-start justify-center gap-12 lg:grid-cols-2">
          {/* Left Content */}
          <div ref={textRef} className="space-y-8">
            <HeroContent {...heroContent} />

            <div className="flex flex-col gap-4 sm:flex-row">
              {cta.primary && (
                <a href={cta?.primary.url} key={'hero-view-services'}>
                  <Button variant="hero" size="xl" className="group">
                    {cta.primary.title}
                    <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </Button>
                </a>
              )}
              {cta?.secondary && (
                <a href={cta?.secondary.url} key={'sales'}>
                  <Button variant="outline" size="xl" className="hover:bg-white hover:text-black">
                    {cta?.secondary.title}
                  </Button>
                </a>
              )}
            </div>

            <Social />
            <Stats />
          </div>

          {/* Right 3D Model */}
          <div ref={modelRef} className="relative flex h-[350px] items-start justify-start md:h-[750px]">
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary/20 to-accent/20 blur-3xl" />
            {/* <Avatar /> */}
            <ThreeScene />
          </div>

          {/* End content*/}
        </div>
      </div>

      <Scroll />
    </section>
  );
}
