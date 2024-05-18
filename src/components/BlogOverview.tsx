import React from 'react';
import BlogCard from './BlogCard';

interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  thumbnail: string;
}

const BlogOverview: React.FC<{ posts: BlogPost[] }> = ({ posts }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-row-2 md:grid-cols-3 gap-8 mb-12">
      {posts.map((post) => (
        <BlogCard key={post.slug} {...post} />
      ))}
    </div>
  );
};

export default BlogOverview;
