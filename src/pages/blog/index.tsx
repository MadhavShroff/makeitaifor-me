import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import Footer from '@/components/landing-page/Footer';
import Navbar from '@/components/landing-page/Navbar';
import { fetchUser } from '@/utils/fetches';
import React, { useEffect, useState } from 'react';
import BlogOverview from '@/components/blogs-page/BlogOverview';
import BlogCategorySection from '@/components/blogs-page/BlogCategorySection';

interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  thumbnail: string;
  tags: string[];
}

const BlogIndex = ({ posts }: { posts: BlogPost[] }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchUser(setUser);
  }, []);

  // Filter the first three posts for the overview section
  const overviewPosts = posts.slice(0, 3);

  // Categorize the remaining posts by tags
  const categorizedPosts: { [key: string]: BlogPost[] } = posts.slice(3).reduce((acc, post) => {
    post.tags.forEach((tag) => {
      if (!acc[tag]) {
        acc[tag] = [];
      }
      acc[tag].push(post);
    });
    return acc;
  }, {} as { [key: string]: BlogPost[] });

  const tagsToDisplay = ['research', 'tutorial', 'news']; // Define which tags you want to display

  return (
    <main className="min-h-screen flex flex-col items-center bg-black">
      <Navbar user={user} />
      <div className="w-full max-w-5xl p-6">
        <h1 className="text-4xl font-bold mb-10 text-center">Overview</h1>
        
        {/* Overview Section */}
        <BlogOverview posts={overviewPosts} />

        {/* Categorized Sections */}
        {tagsToDisplay.map((tag) => (
          <BlogCategorySection key={tag} tag={tag} posts={categorizedPosts[tag] || []} />
        ))}
      </div>
      {/* <Footer /> */}
    </main>
  );
};

export const getStaticProps = async () => {
  const blogsDirectory = path.join(process.cwd(), 'src', 'blogs');
  const files = fs.readdirSync(blogsDirectory);

  const posts = files.map((filename) => {
    const filePath = path.join(blogsDirectory, filename);
    const fileContents = fs.readFileSync(filePath, 'utf-8');
    const { data } = matter(fileContents);

    return {
      slug: filename.replace('.mdx', ''),
      title: data.title,
      description: data.description,
      date: data.date,
      thumbnail: data.thumbnail || '/images/default-thumbnail.jpg',
      tags: data.tags || [],
    };
  });

  return {
    props: {
      posts,
    },
  };
};

export default BlogIndex;
