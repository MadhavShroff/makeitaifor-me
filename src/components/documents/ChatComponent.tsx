import React, { useState } from "react";
import { MDXProvider } from "@mdx-js/react";
import { ChatComponentNav } from "./ChatComponentNav";
import ChatComponentContent from "./ChatComponentContent";
import { Chat } from "@/utils/types";

export const ChatComponent = ({
  chats: chats,
  onNewChatClicked,
  onChatSubmitted,
  appendEmptyMessageToChat,
  appendContentToMessageInChat,
} : {
  chats: Chat[],
  onNewChatClicked: () => void,
  onChatSubmitted: (chatId: string) => void,
  appendEmptyMessageToChat : (chatId: string) => void,
  appendContentToMessageInChat : (chatId: string, messageId: string, content: string) => void
}) => {
  const [showSideNav, setShowSideNav] = useState(false);
  const [selectedChat, setSelectedChat] = useState<string>("temp"); // Chat.id

  const toggleSideNav = () => {
    setShowSideNav(!showSideNav);
  };

  const onChatClicked = (index) => {
    setSelectedChat(chats[index].id);
    console.log("Chat clicked " + index);
  };

  return (
    <div className="border-4 relative bg-black rounded-lg h-[100vh]">
      <ChatComponentNav toggleSideNav={toggleSideNav} showSideNav={showSideNav} onChatClicked={onChatClicked} selectedChat={selectedChat} chats={chats} 
        onNewChatClicked={() => {
          chats.find((chat) => chat.id == "temp") == undefined &&  onNewChatClicked(); // Only create new chat if it doesn't exist
          setSelectedChat("temp");
        }}/>
      <ChatComponentContent chat={chats.find((chat) => {
        return selectedChat == chat.id
      }) ?? chats[0]} 
        onChatSubmitted={onChatSubmitted}
        appendEmptyMessageToChat={appendEmptyMessageToChat}
        appendContentToMessageInChat={appendContentToMessageInChat}
      />
    </div>
  );
};
