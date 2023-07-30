import React, { useState } from "react";
import { MDXProvider } from "@mdx-js/react";
import { ChatComponentNav } from "./ChatComponentNav";
import ChatComponentContent from "./ChatComponentContent";

export type Message = {
  id: string;
  content: string[] | null; 
  whoSent: string; // user name or "bot"
  whenSent: Date; // timestamp
}

export type Chat = {
  id: string;
  title: string;
  content: Message[] | null; // array of strings of markdown with math and images, where each \ is escaped. 
}

export const ChatComponent = ({
  chatsMeta,
  onNewChatClicked,
  onChatSubmitted,
} : {
  chatsMeta: Chat[],
  onNewChatClicked: () => void,
  onChatSubmitted: (chatId: string) => void,
}) => {
  const [showSideNav, setShowSideNav] = useState(false);
  const [selectedChat, setSelectedChat] = useState<string | null>(null); // Chat.id

  const toggleSideNav = () => {
    setShowSideNav(!showSideNav);
  };

  const onChatClicked = (index) => {
    setSelectedChat(chatsMeta[index].id);
    console.log("Chat clicked " + index);
  };

  return (
    <div className="border-4 relative bg-black rounded-lg h-[100vh]">
      <ChatComponentNav toggleSideNav={toggleSideNav} showSideNav={showSideNav} onChatClicked={onChatClicked} selectedChat={selectedChat} chats={chatsMeta} 
        onNewChatClicked={() => {
          chatsMeta.find((chat) => chat.id == "temp") == undefined &&  onNewChatClicked();
          setSelectedChat("temp");
        }}/>
      <ChatComponentContent chat={chatsMeta.find((chat) => {
        return selectedChat == chat.id;
      })} onChatSubmitted={onChatSubmitted}/>
    </div>
  );
};
