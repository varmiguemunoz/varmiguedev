import { useEffect, useRef } from 'react';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const experiences = [
  {
    id: 1,
    title: 'Mid. Full Stack Developer',
    company: 'Alpha Agent',
    period: 'March 2025 - Present',
    isCurrentRole: true,
    responsibilities: [
   'Digital Innovation Lead at Alpha Agent. I Drove innovation initiatives focused on the development of new digital products and internal tools. Maintained and optimized production websites across the Alpha Agent ecosystem. Integrated AI agents to boost automation and user engagement, while deploying workflow automations to streamline operations. Ensured high performance and scalability through close collaboration with cross-functional teams.'
    ],
  },
  {
    id: 2,
    title: 'Full Stack Developer',
    company: 'Diey.io',
    period: 'December 2023 - February 2025',
    isCurrentRole: false,
    responsibilities: [
      'Led front-end development with a strong focus on intuitive UI and seamless user experience, while building robust backend endpoints to ensure reliable application functionality. I integrated new features and components to enhance system capability, implemented performance optimizations and refactors to boost speed and scalability, and collaborated closely with design and dev teams to maintain quality and consistency throughout the development process.',
    ],
  },
  {
    id: 3,
    title: 'IT Consultant',
    company: 'Kamay Catalizadora',
    period: 'June 2024 - January 2025',
    responsibilities: [
      'Led strategic digital transformation initiatives for operational efficiency and improved customer experience. I developed tailored transformation strategies, implemented modern tools and platforms, and contributed full-stack development expertise to build reliable custom software solutions aligned with business goals.',
    ],
  },
  {
    id: 4,
    title: 'Full Stack Developer',
    company: 'Parrolabs',
    period: 'March 2023 - November 2024',
    responsibilities: [
      'Executed front-end development across multiple websites to enhance user engagement and maintain visual consistency. I managed server infrastructure with DevOps tools, collaborated with multidisciplinary teams to identify and address client needs, and followed best practices in development and maintenance to ensure long-term stability and product quality.',
    ],
  },
  {
    id: 5,
    title: 'Full Stack Developer',
    company: 'Linnk Tech Solutions',
    period: 'April 2023 - February 2024',
    responsibilities: [
      'Directed full-stack development for multiple commercial projects while managing server infrastructure and aligning deliverables with client strategies. I ensured technical reliability through consistent maintenance, integrated client-specific features, and supported smooth collaboration with cross-functional teams throughout the software lifecycle.',
    ],
  },
  {
    id: 6,
    title: 'Full Stack Developer',
    company: 'The U-Corporate',
    period: 'July 2023 - March 2024',
    responsibilities: [
      'Designed and developed the front-end interface to ensure usability and visual clarity, while implementing backend integrations for seamless communication. I maintained and optimized the application through ongoing improvements, bug fixes, and performance tuning, tailored to client specifications.',
    ],
  },
  {
    id: 7,
    title: 'IT Assistant Support',
    company: 'Parrolabs',
    period: 'October 2022 - February 2023',
    responsibilities: [
      'Maintained internal tech infrastructure, supported onboarding processes, and assisted executives in daily operations. I managed core systems such as Google Admin, Apple Business Manager, and ClickUp, while handling physical IT infrastructure including firewalls, switches, routers, and cabling with high attention to operational reliability.',
    ],
  },
  {
    id: 8,
    title: 'Software Developer',
    company: 'Freelance Projects',
    period: '2020 - 2022',
    responsibilities: [
      'Developed websites for clients using Webflow, WordPress, Shopify, and Drupal, applying custom HTML, CSS, and JavaScript for advanced functionality. I implemented animations, SEO best practices, analytics integrations, and automated scheduling tools, providing clients with well-rounded, high-performing web experiences backed by ongoing support.',
    ],
  },
];

const education = [
  {
    id: 1,
    degree: 'Graduate in Software Engineering',
    institution: '(Universidad internacional de la rioja) - UNIR',
    period: '2025',
  },
  {
    id: 2,
    degree: 'Academic Bachelor Degree',
    institution: 'Merceditas Gomez Martinez',
    period: '2009-2020',
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
              <h2 className="text-3xl font-bold text-foreground">Profesional Experience 👇🏻</h2>
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
              <h2 className="text-3xl font-bold text-foreground">Education 📚</h2>
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
