// src/utils/getBlogPosts.ts
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export interface BlogPost {
  slug: string;
  metadata: {
    date: string;
    [key: string]: any;
  };
}

export function getBlogPosts(): BlogPost[] {
  const blogsDirectory = path.join(process.cwd(), 'src', 'blogs');
  const filenames = fs.readdirSync(blogsDirectory);

  const blogPosts = filenames.map((filename) => {
    const filePath = path.join(blogsDirectory, filename);
    const fileContents = fs.readFileSync(filePath, 'utf-8');
    const { data } = matter(fileContents);

    if (!data.date) {
      console.error(`Blog post ${filename} is missing 'date' in its front matter`);
      throw new Error(`Blog post ${filename} is missing 'date' in its front matter`);
    }

    return {
      slug: filename.replace('.mdx', ''),
      metadata: data as {
        date: string;
        [key: string]: any;
      },
    };
  });

  return blogPosts;
}
