import { cn } from '@/lib/utils';
import Social from './social/index.tsx';

export default function Mobile({ isMenuOpen }: { isMenuOpen: boolean }) {
  return (
    <div
      className={cn(
        'overflow-hidden transition-all duration-300 ease-in-out md:hidden',
        isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
      )}
    >
      <div className="mt-4 space-y-2 border-t border-border/50 py-4">
        {/* Mobile Social & CTA */}
        <Social />
      </div>
    </div>
  );
}
