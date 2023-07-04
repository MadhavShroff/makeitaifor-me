import React, { FC } from 'react';
import Img from 'next/image';

interface HeroSectionProps {
  imageUrl?: string;
  children?: React.ReactNode;
}

const HeroSection: FC<HeroSectionProps> = ({
  imageUrl = '/logo_nobg.png',
  children,
}) => {
  return (
    <section className="flex flex-col md:flex-row items-center justify-between p-6 md:p-20 overflow-hidden">
      <div className="text-4xl md:text-6xl font-bold text-center md:text-left mb-4 md:mb-0">
        {children}
      </div>
      <Img
        src={imageUrl}
        alt="Logo"
        width={1000}
        height={1000}
        className="md:w-500 md:h-500"
      />
    </section>
  );
};

export default HeroSection;
