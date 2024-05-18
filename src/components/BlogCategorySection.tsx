import React from 'react';
import BlogCard from './BlogCard';

interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  thumbnail: string;
}

const BlogCategorySection: React.FC<{ tag: string; posts: BlogPost[] }> = ({ tag, posts }) => {
  return (
    <div className="mb-12">
      <h2 className="text-3xl font-bold mb-4 capitalize">{tag}</h2>
      <div className="flex space-x-4 overflow-x-auto">
        {posts.map((post) => (
          <BlogCard key={post.slug} {...post} />
        ))}
      </div>
    </div>
  );
};

export default BlogCategorySection;
