// Home.jsx

import React, { useEffect, useState } from 'react';
import Navbar from "@/components/Navbar";
import HeroSection from '@/components/HeroSection';
import ProductSection from '@/components/ProductSection';
import Footer from '@/components/Footer';
import { fetchUser } from '@/utils/fetches'; // import the fetchUser function
import Image from 'next/image';

const Home = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchUser(setUser);
  }, []);

  return (
    <main className={'min-h-screen flex flex-col items-center grid-lines'}>
      <Navbar user={user} />
      <HeroSection imageUrl="/logo_nobg.png" />
      <Image src="/image16.svg" alt="image" className="absolute w-[24vh] right-[-5vh] sm:top-[110vh] top-[70vh] rotate-45 text-white w-[20vh] " width={500} height={500} style={{filter: "invert(100%) sepia(0%) saturate(0%) hue-rotate(93deg) brightness(103%) contrast(103%);"}}/>
      <ProductSection />
      <Footer />
    </main>
  );
};

export default Home;
