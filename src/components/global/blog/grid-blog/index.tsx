import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, Calendar } from 'lucide-react';

type Props = {
  getCategoryLabel: (parameter: any) => void | any;
  selectedCategory: string;
  filteredPosts: {
    slug: string;
    data: {
      image: string;
      title: string;
      id: string;
      category: string;
      pubDate: Date;
      description: string;
      readTime: string;
    };
  }[];
};

export default function GridBlog({ getCategoryLabel, selectedCategory, filteredPosts }: Props) {
  console.log('filteredPosts', filteredPosts);

  return (
    <section className="w-full overflow-hidden">
      <div className="mb-8 flex items-center justify-between">
        <h2 className="text-2xl font-bold text-foreground md:text-3xl">
          {selectedCategory === 'all' ? 'Latest Articles' : `${getCategoryLabel(selectedCategory)} Articles`}
        </h2>
        <div className="text-sm text-muted-foreground">
          {filteredPosts.length} article{filteredPosts.length !== 1 ? 's' : ''}
        </div>
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {filteredPosts.map((post) => (
          <a href={`/blog/${post.slug}`}>
            <Card
              key={post.data.id}
              className="group cursor-pointer overflow-hidden border-border bg-gradient-card transition-all duration-300 hover:border-accent/30 hover:shadow-accent-glow"
            >
              {/* Image */}
              <div className="relative overflow-hidden">
                <img
                  src={post.data.image}
                  alt={post.data.title}
                  className="h-48 w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </div>

              <CardHeader className="pb-3">
                <div className="mb-2 flex items-center justify-between">
                  <Badge variant="outline" className="border-accent/30 text-xs text-accent-glow">
                    {getCategoryLabel(post.data.category)}
                  </Badge>
                  <div className="flex items-center text-xs text-muted-foreground">
                    <Calendar className="mr-1 h-3 w-3" />
                    <span>{post?.data?.pubDate.toLocaleDateString()}</span>
                  </div>
                </div>

                <CardTitle className="text-lg leading-tight transition-colors duration-300 group-hover:text-primary-glow">
                  {post.data.title}
                </CardTitle>
              </CardHeader>

              <CardContent className="pt-0">
                <CardDescription className="mb-4 leading-relaxed text-muted-foreground">
                  {post.data.description}
                </CardDescription>

                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">{post.data.readTime}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="p-2 transition-colors duration-300 group-hover:text-white"
                  >
                    Read More
                    <ArrowRight className="ml-1 h-3 w-3 transition-transform duration-300 group-hover:translate-x-1" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </a>
        ))}
      </div>

      {filteredPosts.length === 0 && (
        <div className="py-16 text-center">
          <p className="text-lg text-muted-foreground">No articles found in this category.</p>
        </div>
      )}
    </section>
  );
}
