import { GetStaticPaths, GetStaticProps } from 'next';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import { fetchUser } from '@/utils/fetches';
import React, { useEffect, useState } from 'react';

interface BlogPostProps {
  source: MDXRemoteSerializeResult;
  frontMatter: {
    [key: string]: any;
  };
}

const BlogPost = ({ source, frontMatter }: BlogPostProps) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchUser(setUser);
  }, []);

  return (
    <main className="min-h-screen flex flex-col items-center ">
      <Navbar user={user} />
      <article className="prose w-full bg-black p-6">
        <MDXRemote {...source} />
      </article>
      {/* <Footer /> */}
    </main>
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
