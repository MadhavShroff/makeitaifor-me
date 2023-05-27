import React from 'react';
import Navbar from "@/components/Navbar";
import HeroSection from '@/components/HeroSection';
import ProductSection from '@/components/ProductSection';
import Footer from '@/components/Footer';

const Home = () => {
  return (
    <>
      <Navbar />
      <ProductSection />
      <HeroSection />
      <Footer />
    </>
  );
};

export default Home;