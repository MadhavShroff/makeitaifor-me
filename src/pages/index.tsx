import React, {useEffect} from 'react';
import Navbar from "@/components/Navbar";
import HeroSection from '@/components/HeroSection';
import ProductSection from '@/components/ProductSection';
import Footer from '@/components/Footer';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';

const Home = () => {
  const router = useRouter();
  const { code } = router.query;

  useEffect(() => {
    if (code) {
      console.log(code);
    }
  }, [code]);

  return (
    <main className={'min-h-screen items-center '}>
      <Navbar />
      <HeroSection imageUrl="/logo_nobg.png">
        <h1>
          {' '}
          Hey There! <br></br>Glad you could make it.
        </h1>
        <br></br>
        <h2 className="md:text-5xl">
          This is MakeIt<span className="text-orange-500">Ai</span>For.
          <span className="text-orange-500">Me</span>
          <br></br>Let&apos;s Put <span className="text-orange-500"> Ai </span>
          to work for <span className="text-orange-500">
            Your Business
          </span>{' '}
          <br></br> <br></br>🦾🤖🦾
        </h2>
      </HeroSection>
      <ProductSection />
      <Footer />
    </main>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { code } = context.query;

  console.log(code);

  return {
    props: {},
  };
};

export default Home;