import React, { useState } from "react";
import { MDXProvider } from "@mdx-js/react";
import { ChatComponentNav } from "./ChatComponentNav";
import ChatComponentContent from "./ChatComponentContent";

export const ChatComponent = () => {
  const [showSideNav, setShowSideNav] = useState(false);

  const toggleSideNav = () => {
    setShowSideNav(!showSideNav);
  };

  return (
    <MDXProvider>
      <div className="w-auto border-4 bg-black h-[98vh] m-2 relative rounded-xl">
        <ChatComponentNav toggleSideNav={toggleSideNav} showSideNav={showSideNav} />
        <ChatComponentContent />
      </div>
    </MDXProvider>
  );
};

