// src/pages/api/sitemap.ts
import { getBlogPosts } from '@/utils/getBlogPosts';
import { NextApiRequest, NextApiResponse } from 'next';

const baseUrl = 'https://www.makeitaifor.me'

export default async function sitemap(req: NextApiRequest, res: NextApiResponse) {
  const blogs = getBlogPosts().map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: post.metadata.date,
  }));

  const routes = ['', '/blog'].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString().split('T')[0],
  }));

  const sitemap = [...routes, ...blogs];

  res.setHeader('Content-Type', 'application/xml');
  res.write(createSitemapXml(sitemap));
  res.end();
}

function createSitemapXml(urls: { url: string; lastModified: string }[]) {
  const urlset = urls
    .map(({ url, lastModified }) => {
      return `
        <url>
          <loc>${url}</loc>
          <lastmod>${lastModified}</lastmod>
        </url>
      `;
    })
    .join('');

  return `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${urlset}
    </urlset>
  `;
}
