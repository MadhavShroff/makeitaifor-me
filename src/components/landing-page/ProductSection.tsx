import React from 'react';
import Image from 'next/image';
import IntroSection from './IntroSection';
import MarqueeText from '../MarqueeText';
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
    title: 'Launches on July 15th',
    description: [
      "𝑓 (function) = A black box (model like GPT-4, Midjourney or tool like calculator)",
      "Many such 𝑓s can be chained in interesting ways to solve tough problems",
      "Most popular requests for 𝑓s will be built first",
      "Got a request?"
      // TODO: Add button here to link to the requested features page, user can request a feature but must be logged in
    ],
    image: '/circleSpecular.svg',
    subheading: 'Self organizing 𝑓s',
    bg: 'bg-black',
  }
];

const ProductDisplay = ({ product }: { product: Product }) => {
  return (
    <div
      className={
        'flex flex-col md:flex-row items-start justify-between p-6 sm:p-2 rounded-[36px] shadow-lg border-2 border-white ' +
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
              <p key={index} className={"pb-1 sm:text-sm text-lg lg:text-2xl font-normal "} >
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
      <div className="flex h-full w-full md:w-400 md:h-400 relative antialiased justify-end">
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
    <section className="flex flex-col gap-5 sm:gap-5 p-4 sm:p-3 z-10">
      <IntroSection />
      {/* <MarqueeText text={'Engage'} /> */}
      {products.map((product) => (
        <ProductDisplay key={product.title} product={product} />
      ))}
    </section>
  );
};

export default ProductSection;
