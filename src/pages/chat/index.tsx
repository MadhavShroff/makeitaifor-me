import { ChatComponent } from "@/components/documents/ChatComponent"
import React, { useEffect, useState } from "react";
import { Chat } from "@/utils/types";
import { fetchUser } from "@/utils/fetches";
import { User, Message } from "@/utils/types";
import LoginPage from "../auth";

const ChatPage = () => {
  const [user, setUser] = useState<User | null>(null);
  const [chats, setChats] = useState<Chat[]>([]);


  useEffect(() => {
    // DEV ONLY
    if (process.env.NODE_ENV === "development") { // If in development mode, mock user and chats
      setUser({ // Mock user
        id: "91231123-1230u1u-123132",
        name: "John Doe",
        username: "john@doe.com"
      });
    } else fetchUser(setUser);
    }, []);

  useEffect(() => {
    // if (user) fetchChatsMeta(user).then(setChatsMeta).catch(console.error);
    // if (user && chatsMeta && chatsMeta[0] && chatsMeta[0].id) fetchChatContent(user, chatsMeta[0].id).then(setChatContent).catch(console.error);

    setChats(chats.length == 0 ? [{ // If no chats, create a new chat
      id: "temp",
      title: "New Chat",
      messages: []
    },
  ] : chats);
  }, [user]);

  const appendMessageToChat = (id: string): string => { // returns message id
    console.log("Appending empty message to chat temp");
    const tempChat = chats.find((chat) => chat.id == "temp");
    setChats(chats.map((chat) => { // // add a new empty message to the chat with the id "temp"
      if (chat.id == "temp") {
        return {
          ...chat,
          content: [{
            id: "temp",
            content: "",
            whoSent: user?.name ?? "John Doe",
            whenSent: new Date()
          }]
        };
      } else {
        return chat;
      }
    }));
    return "temp";
  }

  const appendContentToMessageInChat = (chatId: string, messageId: string, content: string) => {
    console.log("Appending content to message " + messageId + " in chat ." + content);
    setChats(chats.map((chat) => { // add content to 
      if (chat.id === chatId) {
        const thisMes = chat.messages.find(message => message.id === messageId)
        return {
          ...chat,
          content: [
            ...(chat.messages == null ? [] : chat.messages.filter((message) => message.id != messageId)),
            {
              id: messageId,
              content: content,
              whoSent: thisMes?.whoSent ?? "John Doe",
              whenSent: thisMes?.whenSent ?? new Date()
            }]
        };
      } else {
        return chat;
      }
    }));
  }

  const onNewChatClicked = () => {
    console.log("New chat clicked");
    setChats([{ messages : [], "id": "temp", "title": "New Chat" }, ...chats])
  }

  return (
    <main className="overflow-hidden">
      {!user && 
      <main className="bg-black h-[100vh]">
        <LoginPage />
      </main>}
      {user && <ChatComponent
        chats={chats}
        onNewChatClicked={onNewChatClicked}
        onChatSubmitted={(chatId: string) => {
          console.log("Chat submitted " + chatId + " for user " + user?.username);
        }}
        appendContentToMessageInChat={appendContentToMessageInChat}
        appendMessageToChat={appendMessageToChat}
      />}
    </main>
  )
}

export default ChatPage;