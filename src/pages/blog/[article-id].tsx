import { GetStaticPaths, GetStaticProps } from 'next';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';
import Footer from '@/components/landing-page/Footer';
import Navbar from '@/components/landing-page/Navbar';
import { fetchUser } from '@/utils/fetches';
import React, { useEffect, useState } from 'react';

interface BlogPostProps {
  source: MDXRemoteSerializeResult;
  frontMatter: {
    [key: string]: any;
  };
}

const components = {
  h1: (props) => <h1 className="text-4xl font-bold mb-4 text-orange-500 text-center pb-10">{props.children}</h1>,
  h2: (props) => <h2 className="text-3xl font-bold mb-3 text-orange-500 text-center pb-5 pt-5">{props.children}</h2>,
  h3: (props) => <h3 className="text-2xl font-bold mb-2 text-orange-500 text-center pb-5 pt-5">{props.children}</h3>,
  p: (props) => <p className="mb-4 text-white">{props.children}</p>,
  img: (props) => <img className="mx-auto" {...props} />, // Center the image horizontally
  // You can define custom components for other elements like lists, images, etc.
};

const BlogPost = ({ source, frontMatter }: BlogPostProps) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchUser(setUser);
  }, []);


  const jsonLd = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: frontMatter.title,
    description: frontMatter.description,
    datePublished: frontMatter.date,
    author: {
      '@type': 'Person',
      name: 'Madhav Shroff', // Replace with the actual author name
    },
    publisher: {
      '@type': 'Organization',
      name: 'makeitaifor.me', // Replace with your website name
      logo: {
        '@type': 'ImageObject',
        url: 'https://makeitaifor.me/logo.png', // Replace with your website logo URL
      },
    },
  });

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex flex-col items-center">
        <Navbar user={user} />
      </div>
      <div className="p-20 sm:p-5">
        <main className="flex-1">
          <article className="prose prose-lg w-full bg-black p-6 text-white">
            <MDXRemote {...source} components={components} />
          </article>
        </main>
      </div>
      <Footer />
      {/* Inject JSON-LD into the page */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} />
    </div>
  );
};


export const getStaticPaths: GetStaticPaths = async () => {
  const blogsDirectory = path.join(process.cwd(), 'src', 'blogs');
  const files = fs.readdirSync(blogsDirectory);

  const paths = files.map((filename) => ({
    params: {
      'article-id': filename.replace('.mdx', ''),
    },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { 'article-id': articleId } = params!;
  const blogsDirectory = path.join(process.cwd(), 'src', 'blogs');
  const filePath = path.join(blogsDirectory, `${articleId}.mdx`);
  const markdownWithMeta = fs.readFileSync(filePath, 'utf-8');

  const { content, data } = matter(markdownWithMeta);

  const mdxSource = await serialize(content, { scope: data });

  return {
    props: {
      source: mdxSource,
      frontMatter: data,
    },
  };
};

export default BlogPost;
