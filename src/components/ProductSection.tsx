import React from 'react';
import Image from 'next/image';
import Box from './Box';
import IntroSection from './IntroSection';
import MarqueeText from './MarqueeText';
import Link from 'next/link';

type Product = {
  title: string;
  description: string[] | string;
  image: string;
  ltr?: boolean | true;
  bg?: string;
  subheading?: string;
};

const defaults: Product[] = [
  {
    title: 'Chat Pro',
    description: [
      'Full access to web browsing ',
      'with the most advanced AI models on the planet.',
      'Models available are updated regularly to make the latest and greatest available at the earliest. No configuarion or API keys needed. Simply sign up and get started.',
    ],
    image: '/logo_nobg.png',
    subheading: 'ChatGPT on Steroids',
    bg: 'bg-black',
  },
  {
    title: 'Content Writing',
    description:
      'Write content for your website, blog, or social media with the help of AI. Simply provide a few keywords and let the AI do the rest.',
    image: '/icon3.png',
    bg: 'bg-black',
    ltr: true,
  },
  {
    title: 'Outreach',
    description: `ChatGPT Pro is a cutting-edge AI tool that can carry out human-like text conversations. It's perfect for customer service, answering queries, and even for personal use as a virtual assistant.`,
    image: '/icon2.png',
    bg: 'bg-black',
  },
  {
    title: 'Scheduler',
    description: '',
    image: '/icon4_nobg.png',
    bg: 'bg-black',
    ltr: true,
  },
  // Add more products here
];

const UserProfile = () => {
  return (
    <Box>
      <Link
        className="px-2 sm:px-4 py-1 sm:py-2 text-lg sm:text-xl font-bold text-black mr-4 hover:underline decoration-orange-500 decoration-4"
        href="/profile"
      >
        Profile
      </Link>
      <a
        className="px-2 sm:px-4 py-1 sm:py-2 text-lg sm:text-xl font-bold text-black mr-4 hover:underline decoration-orange-500 decoration-4"
        href="/settings"
      >
        Settings
      </a>
      <a
        className="px-2 sm:px-4 py-1 sm:py-2 text-lg sm:text-xl font-bold text-black mr-4 hover:underline decoration-orange-500 decoration-4"
        href="/logout"
      >
        Log out
      </a>
    </Box>
  );
};

const ProductDisplay = ({ product }: { product: Product }) => {
  return (
    <div
      className={
        'flex flex-col md:flex-row items-start justify-between p-6 rounded-lg shadow-lg border-2 border-white ' +
        product.bg
      }
    >
      <div className="text-4xl md:text-6xl font-bold text-center md:text-left mb-4 md:mb-0">
        <div className="container mx-auto">
          <h2 className="text-4xl sm:text-6xl lg:text-8xl leading-7 font-normal mb-4">
            {product.title}
          </h2>
          <p className="text-xl sm:text-3xl lg:text-5xl leading-7 font-normal mb-4 text-orange-500">
            {product.subheading}
          </p>
          {Array.isArray(product.description) ? (
            product.description.map((desc, index) => (
              <p
                key={index}
                className="text-xl sm:text-2xl lg:text-4xl leading-7 font-normal"
              >
                {desc}
              </p>
            ))
          ) : (
            <p className="text-xl sm:text-2xl lg:text-4xl leading-7 font-normal">
              {product.description}
            </p>
          )}
        </div>
      </div>
      <div className="flex h-full w-full md:w-400 md:h-400 relative antialiased justify-end">
        <Image
          src={product.image}
          alt={product.title}
          width={500}
          height={500}
          className="md:w-500 md:h-500"
        />
      </div>
    </div>
  );
};

const ProductSection = ({ products = defaults }: { products?: Product[] }) => {
  return (
    <section className="flex flex-col gap-10 p-10">
      <IntroSection />
      <MarqueeText text={'Engage'} />
      {products.map((product) => (
        <ProductDisplay key={product.title} product={product} />
      ))}
    </section>
  );
};

export default ProductSection;
