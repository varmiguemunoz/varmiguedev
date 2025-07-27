import { useMemo, useState, useEffect } from 'react';

import HeroBlog from '../hero-blog';
import FeaturedBlog from '../featured-blog';
import GridBlog from '../grid-blog';
import { Loader } from 'lucide-react';

export default function Provider({ allPosts, categories }: any) {
  const searchParams = typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : null;
  const selectedCategory = searchParams?.get('category') || 'all';
  const [isReady, setIsReady] = useState(false);

  // Progressive loading - show content after a short delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsReady(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const getCategoryLabel = (categoryId: string) =>
    categories.find((cat: any) => cat.id === categoryId)?.label || categoryId;

  const { featuredPost, filteredPosts } = useMemo(() => {
    // Only process if allPosts exists and has length
    if (!allPosts || allPosts.length === 0) {
      return { featuredPost: null, filteredPosts: [] };
    }

    const sortedPosts = allPosts
      .filter((post: any) => post.data?.draft !== true)
      .sort((a: any, b: any) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());

    const featuredPost = sortedPosts[0];
    const blogPosts = sortedPosts.slice(1);

    const filteredPosts =
      selectedCategory === 'all'
        ? blogPosts
        : blogPosts.filter((post: any) =>
            Array.isArray(post.data?.category)
              ? post.data.category.includes(selectedCategory)
              : post.data?.category === selectedCategory
          );

    return { featuredPost, filteredPosts };
  }, [allPosts?.length, selectedCategory]);

  if (!isReady) {
    return (
      <div className="flex min-h-[400px] flex-col items-center justify-center">
        <Loader className="h-8 w-8 animate-spin text-primary" />
        <p className="mt-4 text-primary">Loading blog content...</p>
      </div>
    );
  }

  return (
    <>
      {/* Hero Section */}
      <HeroBlog showFilters={false} selectedCategory={selectedCategory} categories={categories} />

      <div className="w-full max-w-6xl px-4 pb-24 md:mx-auto">
        {/* Featured Article Section */}
        <FeaturedBlog
          selectedCategory={selectedCategory}
          featuredPost={featuredPost as any}
          getCategoryLabel={getCategoryLabel}
        />

        <GridBlog
          getCategoryLabel={getCategoryLabel}
          selectedCategory={selectedCategory}
          filteredPosts={filteredPosts as any}
        />
      </div>
    </>
  );
}
