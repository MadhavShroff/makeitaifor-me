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
    <div className="border-4 relative bg-black rounded-lg h-[100vh]">
      <ChatComponentNav toggleSideNav={toggleSideNav} showSideNav={showSideNav} />
      <ChatComponentContent />
    </div>
  );
};

