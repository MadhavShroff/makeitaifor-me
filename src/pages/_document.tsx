import { Html, Head, Main, NextScript } from "next/document";
import Script from "next/script";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="apple-touch-icon" sizes="180x180" href="/icons/icon180.png" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="mask-icon" href="/icons/icon.svg" color="#5bbad5" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <meta property="og:title" content="Make It AI For Me" />
        <meta property="og:description" content="Empowering your business with cutting-edge AI solutions. Join us on the journey to automation and efficiency." />
        <meta property="og:image" content="https://www.makeitaifor.me/icons/icon512.png" />
        <meta property="og:url" content="https://www.makeitaifor.me/" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Make It AI For Me" />
        <meta name="twitter:description" content="Empowering your business with cutting-edge AI solutions. Join us on the journey to automation and efficiency." />
        <meta name="twitter:image" content="https://www.makeitaifor.me/icons/icon512.png" />
        <meta name="description" content="Empowering your business with cutting-edge AI solutions. Join us on the journey to automation and efficiency." />
        <meta property="fb:app_id" content="621297000134551" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="use-credentials"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Sora:wght@700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <body className="h-screen">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
