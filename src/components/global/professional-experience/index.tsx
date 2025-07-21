import { useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, MapPin, Building } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const experiences = [
  {
    id: 1,
    title: 'Full Stack Developer',
    company: 'Diey.io',
    period: 'December 2023 - February 2025',
    isCurrentRole: true,
    responsibilities: [
      'Front-end development concentrates on crafting an intuitive and visually appealing graphical interface to improve the user experience.',
      'Backend development for multiple endpoints to ensure robust and efficient application functionality.',
      'Seamless integration of new features and components enhances system capability and versatility.',
      'Implement optimizations, refactorings, and enhancements to boost application speed and efficiency.',
      'Close collaboration with design and development teams is crucial to guarantee the consistency and quality of the end product.',
    ],
  },
  {
    id: 2,
    title: 'IT Consultant',
    company: 'Kamay Catalizadora',
    period: 'June 2024 - January 2025',
    responsibilities: [
      'Leadership and management of projects focused on the digitization of processes, improving operational efficiency and customer experience.',
      'Development of digital transformation strategies',
      'Implementation of tools and development of technological platforms and software.',
      'Development Full Stack Applications',
    ],
  },
  {
    id: 3,
    title: 'Full Stack Developer',
    company: 'Parrolabs',
    period: 'March 2023 - November 2024',
    responsibilities: [
      'Front-end development of several websites, with a focus on enhancing user experience and maintaining visual coherence.',
      'Comprehensive server management involves configuring, monitoring, and executing DevOps tasks to maintain system stability and security.',
      'Close collaboration with multidisciplinary teams is crucial for proactively identifying and addressing business needs and customer requirements.',
      'Implementing development and maintenance best practices enhances operational efficiency and final product quality.',
    ],
  },
];

const education = [
  {
    id: 1,
    degree: 'Licenciatura en Comunicación Audiovisual',
    institution: 'Universidad Viñas',
    period: '2019-2023',
  },
  {
    id: 2,
    degree: 'Diplomatura en Producción Creativa',
    institution: 'Universidad Viñas',
    period: '2024',
  },
];

export default function ProfessionalExperience() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !titleRef.current || !cardsRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 80%',
        end: 'bottom 20%',
        toggleActions: 'play none none reverse',
      },
    });

    // Animate title
    tl.fromTo(
      titleRef.current.children,
      {
        opacity: 0,
        y: 30,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power3.out',
      }
    );

    // Animate cards
    tl.fromTo(
      cardsRef.current.children,
      {
        opacity: 0,
        y: 50,
        scale: 0.95,
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power3.out',
      },
      '-=0.4'
    );

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-gradient-background px-4 py-24">
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
        <div className="mx-auto max-w-4xl">
          {/* Section Header */}
          <div ref={titleRef} className="mb-16 space-y-8">
            <div className="flex items-center gap-4">
              <div className="h-3 w-3 flex-shrink-0 rounded-full bg-accent" />
              <h2 className="text-3xl font-bold text-foreground">EXPERIENCIA</h2>
            </div>
          </div>

          {/* Experience Section */}
          <div ref={cardsRef} className="space-y-12">
            {experiences.map((exp, index) => (
              <div key={exp.id} className="space-y-4">
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-foreground">{exp.title}</h3>
                  <div className="font-medium text-muted-foreground">
                    {exp.company} | {exp.period}
                  </div>
                </div>

                <ul className="ml-4 space-y-2">
                  {exp.responsibilities.map((responsibility, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <div className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-accent" />
                      <span className="leading-relaxed text-muted-foreground">{responsibility}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Education Section */}
          <div className="mt-20 space-y-8">
            <div className="flex items-center gap-4">
              <div className="h-3 w-3 flex-shrink-0 rounded-full bg-accent" />
              <h2 className="text-3xl font-bold text-foreground">EDUCACIÓN</h2>
            </div>

            <div className="space-y-8">
              {education.map((edu, index) => (
                <div key={edu.id} className="space-y-2">
                  <h3 className="text-xl font-bold text-foreground">{edu.degree}</h3>
                  <div className="font-medium text-muted-foreground">
                    {edu.institution} | {edu.period}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
