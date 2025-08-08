import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import Mobile from './mobile/index';
import Social from '../hero-gsap/social';

const navigation = [
  { name: 'Services', href: '#pricing' },
  { name: 'Pricing', href: '/pricing' },
  { name: 'Sales', href: '/sales' },
  { name: 'About Me', href: '/about' },
  { name: 'Blog', href: '/blog' },
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className={cn('left-0 right-0 top-0 z-50 block bg-transparent transition-all duration-300')}>
      <div className="container mx-auto px-6 py-2">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-12">
            <a
              href="/"
              className="bg-gradient-to-r from-primary to-accent bg-clip-text text-xl font-bold text-transparent"
            >
              <img src="/logo.png" alt="logo" className="h-14 w-14" loading="lazy" width={40} height={40} />
            </a>

            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <div className="flex items-center space-x-8">
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="group relative text-muted-foreground transition-colors duration-200 hover:text-primary"
                  >
                    {item.name}
                    <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-primary transition-all duration-300 group-hover:w-full" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Desktop CTA & Social */}
          <div className="hidden items-center space-x-4 md:flex">
            <Social title={false} />
            <a href="/sales">
              <Button variant="hero" size="sm">
                Let's Talk
              </Button>
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-muted-foreground hover:text-primary"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <Mobile isMenuOpen={isMenuOpen} navigation={navigation} />
      </div>
    </nav>
  );
}
