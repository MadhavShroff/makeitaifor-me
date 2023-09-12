import React, { useState } from "react";
import { MDXProvider } from "@mdx-js/react";
import { ChatComponentNav } from "./ChatComponentNav";
import ChatComponentContent from "./ChatComponentContent";
import { Chat, Message } from "@/utils/types";

export const ChatComponent = ({
  chats: chats,
  onNewChatClicked,
  onChatSubmitted,
  onChatClicked,
  appendMessageToChat,
  appendContentToMessageInChat,
} : {
  chats: Chat[],
  onNewChatClicked: () => void,
  onChatSubmitted: (chatId: string, content: string) => void,
  onChatClicked: (index: number) => void,
  appendMessageToChat : (chatId: string, message: Message) => void,
  appendContentToMessageInChat : (chatId: string, messageId: string, content: string) => void
}) => {
  const [showSideNav, setShowSideNav] = useState(false);
  const [selectedChat, setSelectedChat] = useState<string | undefined>(chats[0]?._id); // Chat.id

  const toggleSideNav = () => {
    setShowSideNav(!showSideNav);
  };

  const clicked = (index) => {
    setSelectedChat(chats[index]._id);
    console.log("Chat clicked " + index);
    onChatClicked(index);
  };

  return (
    <div className="border-4 sm:border-2 relative bg-black rounded-lg h-[100svh]">
      <ChatComponentNav toggleSideNav={toggleSideNav} showSideNav={showSideNav} onChatClicked={clicked} selectedChat={selectedChat} chats={chats} 
        onNewChatClicked={() => {
          console.log("chats:", chats);
          if(chats.find(chat => chat.messages.length == 0) == undefined) {
            console.log("Creating new chat");
            onNewChatClicked();
          }
          setSelectedChat(chats.find((chat) => chat.messages.length == 0)?._id ?? "");
        }}/>
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
