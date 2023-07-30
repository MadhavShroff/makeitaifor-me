import React, { useState } from "react";
import { MDXProvider } from "@mdx-js/react";
import { ChatComponentNav } from "./ChatComponentNav";
import ChatComponentContent from "./ChatComponentContent";
import { Chat } from "@/utils/types";

export const ChatComponent = ({
  chatsMeta,
  onNewChatClicked,
  onChatSubmitted,
  appendEmptyMessageToChat,
  appendContentToMessageInChat,
} : {
  chatsMeta: Chat[],
  onNewChatClicked: () => void,
  onChatSubmitted: (chatId: string) => void,
  appendEmptyMessageToChat : (chatId: string) => void,
  appendContentToMessageInChat : (chatId: string, messageId: string, content: string) => void
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
        return selectedChat == chat.id || (selectedChat == "temp");
      })} 
        onChatSubmitted={onChatSubmitted}
        appendEmptyMessageToChat={appendEmptyMessageToChat}
        appendContentToMessageInChat={appendContentToMessageInChat}
      />
    </div>
  );
};
