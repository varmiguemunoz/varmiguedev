import { useMemo } from 'react';

import HeroBlog from '../hero-blog';
import FeaturedBlog from '../featured-blog';
import GridBlog from '../grid-blog';

export default function Provider({ allPosts, categories }: any) {
  const searchParams = typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : null;
  const selectedCategory = searchParams?.get('category') || 'all';

  const getCategoryLabel = (categoryId: string) =>
    categories.find((cat: any) => cat.id === categoryId)?.label || categoryId;

  const { featuredPost, filteredPosts } = useMemo(() => {
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
  }, [allPosts, selectedCategory]);

  return (
    <>
      {/* Hero Section */}
      <HeroBlog showFilters={false} selectedCategory={selectedCategory} categories={categories} />

      <div className="mx-auto w-full max-w-6xl px-4 pb-24">
        {/* Featured Article Section */}
        <FeaturedBlog
          selectedCategory={selectedCategory}
          featuredPost={featuredPost as any}
          getCategoryLabel={getCategoryLabel}
        />

        {/* Blog Grid Section */}
        <GridBlog
          getCategoryLabel={getCategoryLabel}
          selectedCategory={selectedCategory}
          filteredPosts={filteredPosts as any}
        />
      </div>
    </>
  );
}
