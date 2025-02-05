import Footer from '@/components/landing-page/Footer';
import Navbar from '@/components/landing-page/Navbar';
import { fetchUser } from '@/utils/fetches';
import React, { useEffect, useState } from 'react';

// Sample JSON array of posts. This could also come from an imported JSON file or getStaticProps.
const postsData = [
  {
    id: 'how-are-businesses-using-ai-to-grow',
    title: 'How are Businesses using AI to grow?',
    description:
      'Our goal is to streamline SMB trade, making it easier and faster than ever.',
    imageUrl: 'robot.jpeg', // Replace with your actual image path
  },
  {
    id: 'the-best-ai-tools-for-creativity-in-2024',
    title: 'The Best AI Tools for Creativity in 2024',
    description:
      'Take control of your finances with our advanced invoicing system.',
    imageUrl: 'magnum.avif',
  },
  {
    id: '7-best-productive-ai-tools',
    title: '7 Best Productive AI Tools',
    description:
      'Discover strategies to optimize your business operations effectively.',
    imageUrl: 'cycle.png',
  },
  {
    id: 'can-ai-replace-human-intelligence',
    title: 'Can AI Replace Human Intelligence?',
    description:
      'Learn how to scale your SMB with smart trade solutions and insights.',
    imageUrl: 'bhutan2.png',
  },
  {
    id: 'workflow-automation-what-is-it-how-does-it-help',
    title: 'Workflow Automation: What is it? How does it help?',
    description:
      'Our goal is to streamline SMB trade, making it easier and faster than ever.',
    imageUrl: 'bhutan2.png',
  },
  {
    id: 'best-workflow-automation-tools-for-streamlining-your-business',
    title: 'Best Workflow Automation Tools for Streamlining Your Business',
    description:
      'Take control of your finances with our advanced invoicing system.',
    imageUrl: 'bhutan2.png',
  },
];

const Blog = () => {
  const [user, setUser] = useState(null);
  // const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchUser(setUser);
    // fetchPosts(setPosts);
  }, []);

  return (
    <main className="min-h-screen flex flex-col items-center grid-lines bg-black">
      <Navbar user={user} />
      <div className="w-full py-20 lg:py-40">
        <div className="container mx-auto flex flex-col gap-14">
          <div className="flex w-full flex-col sm:flex-row sm:justify-between sm:items-center gap-8">
            <h4 className="text-3xl md:text-5xl tracking-tighter max-w-xl font-regular">
              Latest articles
            </h4>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {postsData.map((post) => (
              <a
                href={`/blog/${post.id}`}>
                <div
                  key={post.id}
                  className="flex flex-col gap-2 hover:border-orange-500 border-[1px] bg-black rounded-xl cursor-pointer p-4"
                >
                  <div className="bg-muted rounded-xl aspect-video mb-4 overflow-hidden">
                    {/* If you have an image URL, you can render an <img> tag */}
                    <img
                      src={post.imageUrl}
                      alt={post.title}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <h3 className="text-xl tracking-tight">{post.title}</h3>
                  <p className="text-muted-foreground text-sm">
                    {post.description}
                  </p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
};

export default Blog;