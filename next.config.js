/** @type {import('next').NextConfig} */
import createMDX from '@next/mdx'
const nextConfig = {
  reactStrictMode: true,
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
}

const withMDX = createMDX({
  // Add markdown plugins here, as desired
});

module.exports = withMDX(nextConfig)
