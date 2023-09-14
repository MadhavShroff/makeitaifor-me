import React, { useEffect, useState } from "react";
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
  const [selectedChat, setSelectedChat] = useState<string>(); // Chat.id
  
  useEffect(() => {
    if(selectedChat !== undefined) return;
    const sc = (chats.find(chat => chat.messages.length == 0)?._id || chats[0]?._id || undefined);
    console.log("selectedChat changed to: ", sc);
    setSelectedChat(sc);
  }, [chats]);

  console.log("selectedChat init value: ", ((chats.find(chat => chat.messages.length == 0)) || chats[0] || undefined));

  const toggleSideNav = () => {
    setShowSideNav(!showSideNav);
  };

  const clicked = async (index) => {
    await onChatClicked(index);
    console.log("Selecting existing chat in clicked()", index);
    setSelectedChat(chats[index]._id);
  };

  return (
    <div className="border-4 sm:border-2 relative bg-black rounded-lg h-[100svh]">
      <ChatComponentNav toggleSideNav={toggleSideNav} showSideNav={showSideNav} onChatClicked={clicked} selectedChat={selectedChat} chats={chats} 
        onNewChatClicked={() => {
          console.log("chats:", chats);
          const newChat = chats.find(chat => chat.messages.length == 0);
          if(newChat === undefined) {
            console.log("Creating new chat");
            onNewChatClicked();
          } else {
            console.log("Selecting existing chat in ChatComponent/onNewChatClicked(): ", newChat);
            setSelectedChat(newChat._id);
          }
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
