import React, { useEffect, useState } from 'react';
import Navbar from "@/components/Navbar";
import HeroSection from '@/components/HeroSection';
import ProductSection from '@/components/ProductSection';
import Footer from '@/components/Footer';
import { fetchUser } from '@/utils/fetches';

const Scheduler = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchUser(setUser);
  }, []);
  
  return (
    <>
      <Navbar user={user}/>
      {/* ?? */}
      <Footer />
    </>
  );
};

export default Scheduler;