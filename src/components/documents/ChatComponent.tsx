import React, { useContext, useEffect, useState } from "react";
import { ChatComponentNav } from "./ChatComponentNav";
import ChatComponentContent from "./ChatComponentContent";
import { Chat, Message } from "@/utils/types";
import { ChatContext } from "@/pages/chat";

export const ChatComponent = () => {
  const [showSideNav, setShowSideNav] = useState(false);

  const context = useContext(ChatContext);
  if (!context) throw new Error("YourChildComponent must be used within a ChatProvider");
  const {
    chats, 
    selectedChat
  } = context;

  console.log("selectedChat value @ChatComponent: ", selectedChat);

  const toggleSideNav = () => {
    setShowSideNav(!showSideNav);
  };

  return (
    <div className="border-4 sm:border-2 relative bg-black rounded-lg h-[100svh]">
      <ChatComponentNav 
        toggleSideNav={toggleSideNav} 
        showSideNav={showSideNav}/>
      <ChatComponentContent 
        chat={chats.find((chat) => {
          return selectedChat == chat._id
        }) ?? chats[0]} 
      />
    </div>
  );
};
