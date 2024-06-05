// _app.tsx
import React from "react";
import { AppProps } from "next/app";
import Script from "next/script";
import "../styles/globals.css";
import "../styles/FileUpload.css";
import "../styles/markdown.css";
import "../styles/Boxes.module.css";
import Link from "next/link";

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin=""/>
      <Link href="https://fonts.googleapis.com/css2?family=Sora:wght@100&display=swap" 
        rel="stylesheet">
      </Link>
      <Link rel="stylesheet" href="https://latex.now.sh/font?family=cm" />
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-Z9ZPFWBFD4"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){window.dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'G-Z9ZPFWBFD4');
            `}
      </Script>
      <Component {...pageProps} />
    </>
  );
};

export default App;
