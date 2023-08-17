import React from 'react';
import Image from 'next/image';
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
    title: 'Collections Search',
    description: [
      "AI, understands, and fetches information from a range of document types for you.",
      "Create, modify and then interface with document collections.",
      "Supports ingesting and searching through PDFs, Research papers (Yes, including the math), youtube videos, Web articles. More coming up soon.",
    ],
    image: '/circleSpecular.svg',
    subheading: 'The Future of information retrieval',
    bg: 'bg-black',
  },
  {
    title: 'Content Writing',
    description: [
      'Write content for your website, blog, or social media with the help of AI. Simply provide a few keywords and let the AI do the rest.',
      "Coming Soon ...",
    ],
    image: '/icon3.png',
    bg: 'bg-black',
    ltr: true,
  },
  {
    title: 'And a Lot More',
    description: [
      'As AI becomes more and more powerful, we will provide more and more services that build upon the latest models available.',
      "Stay tuned for more ...",
    ],
    image: '/icon2.png',
    bg: 'bg-black',
    ltr: true,
  },
];

const ProductDisplay = ({ product }: { product: Product }) => {
  return (
    <div
      className={
        'flex flex-col md:flex-row items-start justify-between p-6 sm:p-2 rounded-lg shadow-lg border-2 border-white ' +
        product.bg
      }
    >
      <div className="text-4xl md:text-6xl font-bold text-center md:text-left">
        <div className="container mx-auto max-w-prose">
          <h2 className="text-4xl sm:text-4xl lg:text-7xl leading-7 font-normal mb-4 mt-4">
            {product.title}
          </h2>
          <p className="text-xl lg:text-4xl leading-7 font-normal mb-4 text-orange-500">
            {product.subheading}
          </p>
          {Array.isArray(product.description) ? (
            product.description.map((desc, index) => (
              <p key={index} className={"pb-1 sm:text-sm text-lg lg:text-2xl font-normal " + ((index%2==1) ? "text-orange-500" : "")} >
                {desc}
              </p>
            ))
          ) : (
            <p className="pb-1 sm:text-sm text-normal">
              {product.description}
            </p>
          )}
        </div>
      </div>
      <div className="flex h-full w-full md:w-400 md:h-400 relative antialiased justify-center">
        <Image
          src={product.image}
          alt={product.title}
          width={500}
          height={500}
          style={{color: "white"}}
          className="md:w-500 md:h-500"
        />
      </div>
    </div>
  );
};

const ProductSection = ({ products = defaults }: { products?: Product[] }) => {
  return (
    <section className="flex flex-col gap-5 sm:gap-5 p-10 sm:p-3">
      <IntroSection />
      {/* <MarqueeText text={'Engage'} /> */}
      {products.map((product) => (
        <ProductDisplay key={product.title} product={product} />
      ))}
    </section>
  );
};

export default ProductSection;
