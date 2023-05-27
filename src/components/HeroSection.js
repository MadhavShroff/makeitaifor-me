import React from 'react';

const HeroSection = () => {
  return (
    <section className="flex flex-col md:flex-row items-center justify-between p-6 md:p-20">
      <div className="text-4xl md:text-6xl font-bold text-center md:text-left mb-4 md:mb-0">
        <h1> Hey There! </h1> 
        <h2 className='md:text-5xl'>This is MakeIt<span className="text-orange-500">Ai</span>For.<span className="text-orange-500">Me</span> <br></br><br></br>Let&apos;s <span className="text-orange-500"> Put Ai to work</span> for <span className="text-orange-500">You</span> <br></br>🦾🤖🦾 </h2>
      </div>
      <img src="/logo.png" alt="Logo" width={500} height={500} className="md:w-500 md:h-500"/>
    </section>
  );
};

export default HeroSection;