import { Button } from '@/components/ui/button';

type Props = {
  showFilters: boolean;
  selectedCategory: string;
  categories: {
    id: string;
    label: string;
  }[];
};
export default function FilterMobileHeroBlog({ showFilters, selectedCategory, categories }: Props) {
  return (
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
  );
}
