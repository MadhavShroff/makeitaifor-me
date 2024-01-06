// Home.jsx

import React, { useEffect, useState } from 'react';
import Navbar from "@/components/Navbar";
import HeroSection from '@/components/HeroSection';
import ProductSection from '@/components/ProductSection';
import Footer from '@/components/Footer';
import { fetchUser } from '@/utils/fetches'; // import the fetchUser function
import Button from '@/components/Button';
import Link from 'next/link';

const Home = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchUser(setUser);
  }, []);

  return (
    <main className={'min-h-screen flex flex-col items-center grid-lines'}>
      <Navbar user={user} />
      <HeroSection imageUrl="/logo_nobg.png" />
      <ProductSection />
      <Footer />
    </main>
  );
};

export default Home;
