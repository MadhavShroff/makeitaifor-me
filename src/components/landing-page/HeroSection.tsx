import React, { FC } from 'react';
import Img from 'next/image';
import Link from 'next/link';
import StartForFreeButton from './StartForFreeButton';

interface HeroSectionProps {
  imageUrl?: string;
}

const HeroSection: FC<HeroSectionProps> = ({
  imageUrl = '/logo_nobg.png',
}) => {
  return (
    <section className="flex flex-col items-center md:flex-row items-center justify-between p-6 md:p-10 overflow-hidden">
      <div className="flex flex-col text-4xl md:text-6xl md:text-left text-center md:ml-10">
        <h1>
          Hey There! <br></br>Glad you could make it.
        </h1>
        <br></br>
        <h2 className="md:text-5xl">
          {/* This is MakeIt<span className="text-orange-500">Ai</span>For.
          <span className="text-orange-500">Me</span> */}
          This is how interacting with <span className="text-orange-500">Ai</span> was always meant to be.
          <br></br>
          <p>🦾🤖🦾</p>
          {/* <br></br>Let&apos;s Put <span className="text-orange-500"> Ai </span>
          to work for <span className="text-orange-500">
            Your Business
          </span>{' '} */}
        </h2>
        <br></br>
        <Link href="/chat">
          <StartForFreeButton />
        </Link>
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
