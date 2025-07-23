import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft, ArrowRight } from 'lucide-react';

type NavigationProps = {
  previousPost: any;
  nextPost: any;
};

export default function NavigationBlog({ previousPost, nextPost }: NavigationProps) {
  return (
    <section className="mb-16">
      <div className="grid gap-6 md:grid-cols-2">
        {/* Previous Article */}
        {previousPost && (
          <a href={`/blog/${previousPost.slug}`} className="group">
            <Card className="cursor-pointer border border-border bg-gradient-card transition-all duration-300 hover:border-primary/30 hover:shadow-glow">
              <CardContent className="p-6">
                <div className="mb-3 flex items-center text-sm text-muted-foreground">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Previous Article
                </div>
                <h3 className="text-lg font-semibold text-foreground transition-colors duration-300 group-hover:text-primary-glow">
                  {previousPost.data.title}
                </h3>
              </CardContent>
            </Card>
          </a>
        )}

        {/* Next Article */}
        {nextPost && (
          <a href={`/blog/${nextPost.slug}`} className="group">
            <Card className="cursor-pointer border border-border bg-gradient-card transition-all duration-300 hover:border-primary/30 hover:shadow-glow">
              <CardContent className="p-6">
                <div className="mb-3 flex items-center justify-end text-sm text-muted-foreground">
                  Next Article
                  <ArrowRight className="ml-2 h-4 w-4" />
                </div>
                <h3 className="text-right text-lg font-semibold text-foreground transition-colors duration-300 group-hover:text-primary-glow">
                  {nextPost.data.title}
                </h3>
              </CardContent>
            </Card>
          </a>
        )}
      </div>
    </section>
  );
}
