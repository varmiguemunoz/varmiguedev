import { Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';

type Props = {
  showFilters: boolean;
  selectedCategory: string;
  categories: {
    id: string;
    label: string;
  }[];
};

export default function HeroBlog({ showFilters, selectedCategory, categories }: Props) {
  return (
    <section className="px-4 pb-16 pt-24">
      <div className="mx-auto w-full max-w-6xl text-center">
        <div className="relative">
          {/* Background glow effect */}
          <div className="absolute inset-0 w-full rounded-full bg-gradient-primary opacity-10 blur-3xl md:scale-150"></div>

          <div className="relative">
            <h1 className="mb-6 text-4xl font-bold leading-tight text-foreground md:text-6xl lg:text-7xl">
              Insights, code, and{' '}
              <span className="bg-gradient-primary bg-clip-text text-transparent">client growth strategies</span>
            </h1>

            <p className="mx-auto mb-8 max-w-4xl text-xl leading-relaxed text-muted-foreground md:text-2xl">
              A development blog for agencies, founders, and digital operators
            </p>

            {/* Category Filter */}
            <div className="mb-8 flex flex-wrap justify-center gap-3">
              <Button variant="ghost" size="sm" className="md:hidden">
                <Filter className="mr-2 h-4 w-4" />
                Filter
              </Button>

              <div className={`flex flex-wrap justify-center gap-3 ${showFilters ? 'block' : 'hidden md:flex'}`}>
                {categories.map((category) => (
                  <a href={`/blog?category=${category.id}`}>
                    <Button
                      key={category.id}
                      variant={selectedCategory === category.id ? 'default' : 'outline'}
                      size="sm"
                      className="transition-all duration-300 hover:scale-105"
                    >
                      {category.label}
                    </Button>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
