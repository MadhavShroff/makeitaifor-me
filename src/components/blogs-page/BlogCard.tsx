import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface BlogCardProps {
  slug: string;
  title: string;
  description: string;
  date: string;
  thumbnail: string;
}

const BlogCard: React.FC<BlogCardProps> = ({ slug, title, description, date, thumbnail }) => {
  return (
    <Link href={`/blog/${slug}`}>
      <div className="relative block bg-white rounded-lg shadow hover:shadow-lg transition-shadow duration-200 cursor-pointer overflow-hidden group max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl h-80">
        <div className="absolute inset-0 z-0 transition-transform duration-300 ease-in-out transform group-hover:scale-110">
          <Image
            src={thumbnail}
            alt={`${title} thumbnail`}
            layout="fill"
            objectFit="cover"
            className="rounded-lg"
          />
        </div>
        <div className="relative z-10 p-4 md:p-6 bg-linear-to-t from-black/50 to-transparent text-white rounded-lg h-full flex flex-col justify-end">
          <h2 className="text-xl md:text-2xl font-semibold mb-2">{title}</h2>
          <p className="text-gray-300 mb-4">{description}</p>
          <p className="text-gray-400 text-sm">{date}</p>
        </div>
      </div>
    </Link>
  );
};

export default BlogCard;
