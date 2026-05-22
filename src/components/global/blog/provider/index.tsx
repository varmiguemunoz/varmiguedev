import { useMemo, useState, useEffect } from 'react';

import HeroBlog from '../hero-blog';
import FeaturedBlog from '../featured-blog';
import GridBlog from '../grid-blog';

type Post = {
  slug: string;
  title: string;
  description: string;
  pubDate: string;
  image: string;
  category: string;
  readtime: string;
};

type Category = {
  id: string;
  label: string;
  color: string;
};

type Props = {
  posts: Post[];
  categories: Category[];
};

function getInitialCategory(): string {
  if (typeof window === 'undefined') return 'all';
  return new URLSearchParams(window.location.search).get('category') || 'all';
}

export default function Provider({ posts, categories }: Props) {
  const [selectedCategory, setSelectedCategory] = useState<string>(getInitialCategory);

  useEffect(() => {
    const syncCategory = () => {
      setSelectedCategory(new URLSearchParams(window.location.search).get('category') || 'all');
    };

    window.addEventListener('popstate', syncCategory);
    document.addEventListener('astro:page-load', syncCategory);

    return () => {
      window.removeEventListener('popstate', syncCategory);
      document.removeEventListener('astro:page-load', syncCategory);
    };
  }, []);

  const getCategoryLabel = (categoryId: string) =>
    categories.find((cat) => cat.id === categoryId)?.label || categoryId;

  const { featuredPost, filteredPosts } = useMemo(() => {
    if (!posts || posts.length === 0) {
      return { featuredPost: null, filteredPosts: [] };
    }

    const sorted = [...posts].sort(
      (a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime()
    );

    const featured = sorted[0];
    const rest = sorted.slice(1);

    const filtered =
      selectedCategory === 'all'
        ? rest
        : rest.filter((p) => p.category === selectedCategory);

    return { featuredPost: featured, filteredPosts: filtered };
  }, [posts, selectedCategory]);

  const featuredForComponent = featuredPost
    ? {
        slug: featuredPost.slug,
        data: {
          image: featuredPost.image,
          title: featuredPost.title,
          id: featuredPost.slug,
          category: featuredPost.category,
          pubDate: new Date(featuredPost.pubDate),
          description: featuredPost.description,
          readtime: featuredPost.readtime,
          slug: featuredPost.slug,
        },
      }
    : null;

  const gridPostsForComponent = filteredPosts.map((p) => ({
    slug: p.slug,
    data: {
      image: p.image,
      title: p.title,
      id: p.slug,
      category: p.category,
      pubDate: new Date(p.pubDate),
      description: p.description,
      readTime: p.readtime,
    },
  }));

  return (
    <>
      <HeroBlog showFilters={false} selectedCategory={selectedCategory} categories={categories} />

      <div className="w-full max-w-6xl px-4 pb-24 md:mx-auto">
        {featuredForComponent && (
          <FeaturedBlog
            selectedCategory={selectedCategory}
            featuredPost={featuredForComponent as any}
            getCategoryLabel={getCategoryLabel}
          />
        )}

        <GridBlog
          getCategoryLabel={getCategoryLabel}
          selectedCategory={selectedCategory}
          filteredPosts={gridPostsForComponent as any}
        />
      </div>
    </>
  );
}
