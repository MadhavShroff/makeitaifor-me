import React, { useEffect, useState } from 'react';
import Navbar from "@/components/Navbar";
import HeroSection from '@/components/HeroSection';
import ProductSection from '@/components/ProductSection';
import Footer from '@/components/Footer';
import { useRouter } from 'next/router';
import axios from 'axios';
import Cookies from 'js-cookie';

const Home = () => {
  const router = useRouter();
  const { code } = router.query;
  const [user, setUser] = useState(null);

  useEffect(() => {
    const exchangeCodeForTokens = async () => {
      try {
        const response = await axios.post('https://api.makeitaifor.me/exchange', { code });
        const { accessToken, idToken, refreshToken } = response.data;

        // Set tokens as cookies
        Cookies.set('accessToken', accessToken);
        Cookies.set('idToken', idToken);
        Cookies.set('refreshToken', refreshToken);

        // Optionally, you can set the user object as well
        setUser(response.data.user);
      } catch (error) {
        console.error(error);
      }
    };

    if (code) {
      console.log(code);
      exchangeCodeForTokens();
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

export default Home;
