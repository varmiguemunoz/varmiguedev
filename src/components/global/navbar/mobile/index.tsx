import { cn } from '@/lib/utils';
import Social from './social';

export default function Mobile({
  navigation,
  isMenuOpen,
}: {
  navigation: { name: string; href: string }[];
  isMenuOpen: boolean;
}) {
  return (
    <div
      className={cn(
        'overflow-hidden transition-all duration-300 ease-in-out md:hidden',
        isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
      )}
    >
      <div className="mt-4 space-y-2 border-t border-border/50 py-4">
        {navigation.map((item) => (
          <a
            href={item.href}
            key={item.name}
            className="block w-full rounded-lg px-4 py-3 text-left text-muted-foreground transition-colors duration-200 hover:bg-primary/5 hover:text-primary"
          >
            {item.name}
          </a>
        ))}

        {/* Mobile Social & CTA */}
        <Social />
      </div>
    </div>
  );
}
