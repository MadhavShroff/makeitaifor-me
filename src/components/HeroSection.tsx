import React, { FC } from 'react';
import Img from 'next/image';
import Link from 'next/link';

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
          This Is the <span className="text-orange-500"> World's First </span> AI System <span className="text-orange-500"> capable of Advanced Math</span>, built for <span className="text-orange-500"> Academics. </span> 
          <br></br>
          <br></br>
          <p>🦾🤖🦾</p>
          {/* <br></br>Let&apos;s Put <span className="text-orange-500"> Ai </span>
          to work for <span className="text-orange-500">
            Your Business
          </span>{' '} */}
        </h2>
        <br></br>
        <Link href="/chat">
          <button
            key="1"
            className={"px-3 sm:px-4 py-2 mt-4 text-4xl border rounded-full hover:bg-orange-500 whitespace-nowrap font-bold m-1 text-white border-white hover:text-black hover:border-black "} >
            {"Start for Free →"}
          </button>
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
