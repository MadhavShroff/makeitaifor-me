import React, { useEffect, useState } from "react";
import { ChatComponentNav } from "./ChatComponentNav";
import ChatComponentContent from "./ChatComponentContent";
import { Chat, Message } from "@/utils/types";

export const ChatComponent = ({
  chats,
  selectedChat,
  onNewChatClicked,
  onChatSubmitted,
  onChatClicked,
  appendMessageToChat,
  appendContentToMessageInChat,
} : {
  chats: Chat[],
  selectedChat: string | undefined,
  onNewChatClicked: () => void,
  onChatSubmitted: (chatId: string, content: string) => void,
  onChatClicked: (index: number) => void,
  appendMessageToChat : (chatId: string, message: Message) => void,
  appendContentToMessageInChat : (chatId: string, messageId: string, content: string) => void
}) => {
  const [showSideNav, setShowSideNav] = useState(false);
  
  console.log("selectedChat value @ChatComponent: ", selectedChat);

  const toggleSideNav = () => {
    setShowSideNav(!showSideNav);
  };

  return (
    <div className="border-4 sm:border-2 relative bg-black rounded-lg h-[100svh]">
      <ChatComponentNav 
        toggleSideNav={toggleSideNav} 
        showSideNav={showSideNav} 
        onChatClicked={onChatClicked} 
        selectedChat={selectedChat} 
        chats={chats} 
        onNewChatClicked={onNewChatClicked}/>
      <ChatComponentContent chat={chats.find((chat) => {
        return selectedChat == chat._id
      }) ?? chats[0]} 
        onChatSubmitted={onChatSubmitted}
        appendMessageToChat={appendMessageToChat}
        appendContentToMessageInChat={appendContentToMessageInChat}
      />
    </div>
  );
};
