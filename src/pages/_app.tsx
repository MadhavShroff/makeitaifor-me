// _app.tsx
import React from 'react';
import { AppProps } from 'next/app';
import Script from 'next/script';
import '../styles/globals.css';

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script src="https://fonts.googleapis.com/css2?family=Sora:wght@400;600&display=swap" />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){window.dataLayer.push(arguments);}
              gtag('js', new Date());

              gtag('config', '${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}');
            `}
      </Script>
      <Component {...pageProps}/>
    </>
  );
};

export default App;
