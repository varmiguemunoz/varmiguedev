import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import Mobile from './mobile';
import Social from '@/components/global/hero-gsap/social';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className={cn(' flex w-full bg-gradient-to-br from-primary/20 transition-all duration-300')}>
      <div className="container mx-auto px-6 py-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-8">
            <a href="/" className="text-xl font-bold text-transparent transition-all duration-300">
              <img src="/logo.png" alt="logo" className="h-14 w-14" loading="lazy" width={40} height={40} />
            </a>
          </div>

          {/* Desktop CTA & Social */}
          <div className="hidden items-center space-x-4 md:flex">
            <Social title={false} />
            <a href="https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ3T7zeEOYTFQmof-sbNifFo37K0uW123TO1tf3L6AEUr-2qhDbR8Txol7-9zoAdi6NfmfNTOtQs">
              <Button variant="hero" size="sm">
                Book a Call →
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
        <Mobile isMenuOpen={isMenuOpen} />
      </div>
    </nav>
  );
}
