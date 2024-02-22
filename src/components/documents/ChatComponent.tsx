import React, { useContext, useEffect, useState } from "react";
import { ChatComponentNav } from "./ChatComponentNav";
import ChatComponentContent from "./ChatComponentContent";
import { Chat, Message } from "@/utils/types";
import { ChatContext } from "@/pages/chat";
import Button from "../Button";
import { getGuestAccess } from "@/utils/fetches";
import { cognitoHostedUI } from "@/utils/constants";

export const ChatComponent = () => {
  const [showSideNav, setShowSideNav] = useState(false);

  const context = useContext(ChatContext);
  if (!context) throw new Error("YourChildComponent must be used within a ChatProvider");
  const {
    chats, 
    selectedChat,
    user,
  } = context;

  const [showModal, setShowModal] = useState(user == null);

  console.log("selectedChat value @ChatComponent: ", selectedChat);

  const toggleSideNav = () => {
    setShowSideNav(!showSideNav);
  };

  const gotoCognitoSignIn = () => {
    window.location.href = cognitoHostedUI
  }

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
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-30">
          <div className="bg-white text-black p-5 rounded-lg shadow-lg h-[40%] w-[40%] sm:h-[40%] sm:w-[80%] text-center flex flex-col justify-around">
            <div className="flex justify-between flex-col">
              <h1 className="font-bold text-3xl sm:text-2xl">Welcome to MakeIt<span className="text-orange-500">Ai</span>For.
              <span className="text-orange-500">Me</span>!</h1>
              <div className="h-10" />
              <p className="sm:text-sm">Looks like you haven't signed up yet...</p>
              <p className="sm:text-sm">Try MakeItAiFor.Me as a guest with limited access, or create an account to continue</p>
            </div>
            <div className="flex justify-center flex-col mt-4">
              <Button onClick={() => getGuestAccess()} text="Continue as Guest" color="black" _key={1}/>
              <Button onClick={() => gotoCognitoSignIn()} text="Login / Sign up" color="black" _key={2}/>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
