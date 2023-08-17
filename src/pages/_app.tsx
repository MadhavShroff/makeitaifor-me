// _app.tsx
import React from "react";
import { AppProps } from "next/app";
import Script from "next/script";
import "../styles/globals.css";
import "../styles/FileUpload.css";
import "../styles/markdown.css";

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Sora:wght@400;600&display=swap"
        rel="stylesheet"
      ></link>
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
