import { ChatComponent } from "@/components/documents/ChatComponent"
import React, { useEffect, useState } from "react";
import { Chat } from "@/utils/types";
import { fetchChatsMetadata, fetchUser } from "@/utils/fetches";
import { connectToSocket, emitChatSubmitted } from "@/utils/sockets";
import { User, Message } from "@/utils/types";
import LoginPage from "../auth";
import { Environments, whichEnv } from "@/utils/whichEnv";

const ChatPage = () => {
  const [user, setUser] = useState<User | null>(null);
  const [chats, setChats] = useState<Chat[]>([]);

  useEffect(() => {
    connectToSocket().catch(console.error);
  }, [connectToSocket]);

  useEffect(() => {
    // DEV ONLY
    switch (whichEnv(process.env.APP_ENV)) {
      case Environments.Development:
        setUser({ // Mock user in dev
          userId: "91231123-1230u1u-123132",
          name: "John Doe",
          username: "john@doe.com",
          role: "guest",
          chats: [],
          _id: "guest",
          __v: 0
        });
        break;
      case Environments.Production:
        fetchUser(setUser);
        break;
      default:
        console.error("Unknown environment");
    }
  }, []);

  useEffect(() => {
    // if (user) fetchChatsMeta(user).then(setChatsMeta).catch(console.error);
    // if (user && chatsMeta && chatsMeta[0] && chatsMeta[0].id) fetchChatContent(user, chatsMeta[0].id).then(setChatContent).catch(console.error);
    if (user) {
      console.log("Fetching chats metadata for user", user);
      if (user.role == "guest") {
        setChats([
          {
            "_id": "guestChat",
            "messages": [],
            "title": "New Chat",
            "__v": 0,
            createdAt: new Date("2023-09-07T15:25:29.283Z"),
            updatedAt: new Date("2023-09-07T15:25:29.283Z"),
          }
        ]);
      } else {
        fetchChatsMetadata(user.userId).then((user: User) => {
          setChats([...user.chats]);
        }).catch(console.error);
      }
    }
  }, [user]);

  const appendMessageToChat = async (chatId: string, message: Message) => { // returns message id
    const newChat = chats.find((chat) => chat._id == chatId);
    if (newChat == undefined) {
      console.error("Chat with id not found", chatId);
    } else {
      newChat.messages.push(message);
      setChats([
        ...chats.filter((chat) => chat._id != chatId),
        newChat
      ]);
    }
  }

  const appendContentToMessageInChat = (chatId: string, messageId: string, content: string) => {
    const newChat = chats.find((chat) => chat._id == chatId);
    if (newChat == undefined) {
      console.error("Chat with id " + chatId + " not found");
      return;
    }
    const newMessage = newChat.messages?.find((message) => message._id == messageId);
    if (newMessage == undefined) {
      console.error("Message with id " + messageId + " not found"); return;
    }
    newMessage.versions[0].text = content;
    newChat.messages = [
      ...newChat.messages?.filter((message) => message._id != messageId),
      newMessage
    ];
    setChats([
      ...chats.filter((chat) => chat._id != chatId),
      newChat
    ]);
  }

  const onNewChatClicked = () => {
    // console.log("New chat button clicked");
    // emitCreateNewChat(() => {
    //   console.log("New chat created on server");
    //   setChats([{ messages: [], "_id": "temp", "title": "New Chat", __v: 0}, ...chats]);
    // });
    // setChats([{ messages: [], "id": "temp", "title": "New Chat" }, ...chats]);
  }


  // if (user)
  return (
    <div className="h-[100svh]">
      <ChatComponent
        chats={chats}
        onNewChatClicked={onNewChatClicked}
        onChatSubmitted={(chatId: string, content) => {
          console.log("Chat submitted " + chatId + " for user " + user?.userId + "With content " + content);
          emitChatSubmitted(content, chatId, appendMessageToChat, appendContentToMessageInChat);
        }}
        appendContentToMessageInChat={appendContentToMessageInChat}
        appendMessageToChat={appendMessageToChat}
      />
    </div>)

  // else return (
  //   <main className="bg-white dark:bg-black h-[100dvh]">
  //     <LoginPage />
  //   </main>
  // )
}

export default ChatPage;