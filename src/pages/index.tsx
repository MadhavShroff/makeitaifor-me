// Home.jsx

import React, { useEffect, useState } from 'react';
import Navbar from "@/components/landing-page/Navbar";
import HeroSection from '@/components/landing-page/HeroSection';
import ProductSection from '@/components/landing-page/ProductSection';
import Footer from '@/components/landing-page/Footer';
import { fetchUser } from '@/utils/fetches'; 
import Image from 'next/image';
import ModuleSection from '@/components/Module/ModuleSection';

const Home = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchUser(setUser);
  }, []);

  return (
    <main className={'min-h-screen flex flex-col items-center grid-lines overflow-hidden'}>
      <Navbar user={user} />
      <HeroSection imageUrl="/logo_nobg.png" />
      <Image src="/image16.svg" alt="image" className="z-0 absolute w-[24vh] right-[-5vh] top-[110vh] xl:top-[70vh] 2xl:top-[105vh] 2xl:right-[5vh] rotate-45 text-orange-500 w-[20vh] " width={500} height={500}/>
      <Image src="/image17.svg" alt="image" className="z-0 absolute w-[24vh] left-[-5vh] top-[70vh] xl:top-[110vh] 2xl:top-[70vh] 2xl:left-[5vh] rotate-45 text-orange-500 w-[20vh] " width={500} height={500}/>
      <ProductSection />
{/*       <ModuleSection /> */}
      <Footer />
    </main>
  );
};

export default Home;
