// components/GoogleSignInButton.tsx
import { useEffect } from "react";

declare global {
  interface Window {
    google: any;
  }
}

const GoogleSignInButton = () => {
  useEffect(() => {
    const handleGoogleSignIn = (response: any) => {
      console.log("Google sign-in response", response);
      // Handle the sign-in response here
    };

    // Ensure that the gapi script is loaded
    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.onload = () => {
      window.google.accounts.id.initialize({
        client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
        callback: handleGoogleSignIn,
      });
      window.google.accounts.id.renderButton(
        document.getElementById("google-signin-button"),
        {
          theme: "",
          size: "large",
          shape: "pill",
        }
      );
      window.google.accounts.id.prompt();
    };
    document.body.appendChild(script);
  }, []);

  return <div id="google-signin-button"></div>;
};

export default GoogleSignInButton;
