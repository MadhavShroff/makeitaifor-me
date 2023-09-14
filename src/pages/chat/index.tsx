import { ChatComponent } from "@/components/documents/ChatComponent"
import React, { useEffect, useState } from "react";
import { Chat, MessageVersion, isMessage } from "@/utils/types";
import { createNewChat, fetchChatsMetadata, fetchMessagesData, fetchUser } from "@/utils/fetches";
import { connectToSocket, emitChatSubmitted } from "@/utils/sockets";
import { User, Message } from "@/utils/types";
import LoginPage from "../auth";
import { Environments, whichEnv } from "@/utils/whichEnv";

const ChatPage = () => {
  const [user, setUser] = useState<User | null>(null);
  const [chats, setChats] = useState<Chat[]>([]);
  const [selectedChat, setSelectedChat] = useState<string | undefined>();

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
          role: "authenticated",
          chats: [],
          _id: "DUMMY_ID",
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
    if (user) {
      console.log("Fetching chats metadata for user", user);
      if (user.role == "guest") {
        setChats([
          {
            "_id": "123",
            "messages": [],
            "title": "New Chat",
            "__v": 0,
            createdAt: new Date("2023-09-07T15:25:29.283Z"),
            updatedAt: new Date("2023-09-07T15:25:29.283Z"),
          }
        ]);
      } else {
        fetchChatsMetadata(user.userId).then((user: User) => {
          console.log("Fetched chats metadata for user", user);
          setChats(user.chats);  
          setSelectedChat(user.chats[0]._id); 
        }).catch(console.error);
      }
    }
  }, [user]);

  const appendMessageToChat = async (chatId: string, message: Message) => { // returns message id
    const newChat = chats.find((chat) => chat._id == chatId);
    if (newChat == undefined) {
      console.error("Chat with id not found", chatId);
    } else {
      (newChat.messages as Message[]).push(message);
      setChats([
        ...chats.filter((chat) => chat._id != chatId),
        newChat
      ]);
    }
  }

  const appendContentToMessageInChat = (chatId: string, messageId: string, content: string) => {
    const chat = chats.find(c => c._id === chatId);

    if (!chat) {
      console.error(`Chat with id ${chatId} not found`); return;
    }

    if (chat.messages.length === 0)
      throw new Error("Chat has no messages.");

    if (isMessage(chat.messages[0])) {
      const message = (chat.messages as Message[]).find(m => m._id === messageId);
     
      if (!message) {
        console.error(`Message with id ${messageId} not found`); return;
      }
      (message.versions[0] as MessageVersion).text = content;
      chat.messages = [
        ...(chat.messages as Message[]).filter(m => m._id !== messageId),
        message
      ];
      setChats([
        chat,
        ...chats.filter(c => c._id !== chatId),
      ]);

    } else if (typeof chat.messages[0] === 'string') {
      console.log('Chat messages are of type string', chat.messages)
      return;
    } else {
      console.log(chat.messages);
      throw new Error("Chat messages are not of type MessageVersion or Message");
    }
  }


  const onNewChatClicked = () => {
    console.log("chats:", chats);
    const newChat = chats.find(chat => chat.messages.length == 0);
    if(newChat && chats.indexOf(newChat) != 0) {
      console.error("New chat already exists, but is not first chat in chats array");
    }
    if(newChat === undefined) {
      console.log("Creating new chat");
      createNewChat().then((chats) => {
        console.log("Chats returned from createNewChat", chats);
        setChats(chats);
        setSelectedChat(chats[0]._id);
      }).catch(console.error);
    } else {
      console.log("Selecting existing chat in ChatComponent/onNewChatClicked(): ", newChat);
      setSelectedChat(newChat._id);
    }
  }

  /**
   * Precondition: if user is not null, then chats.length >=1
   * Fetches messages data for ObjectIds in chats[index].messages if not already fetched, then updates state. 
   * @param index index of chats[] to fetch messages for if not already fetched
   * @returns void
   */
  const onChatClicked = async (index: number) => {
    console.log("On chat clicked", index, user?.chats);
    if (!user || !chats || index < 0 || index >= chats.length || chats[index] === undefined) {
      console.error("Invalid index or user or chats", index, user, chats);
      return;
    }
    setSelectedChat(chats[index]._id);
    const messages: Message[] = await fetchMessagesData(chats[index].messages);
    console.log("Fetched messages data for user", messages);
    setChats(chats.map((chat, idx) => {
      if (idx === index) {
        return {
          ...chat,
          messages: messages,
        };
      }
      return chat;
    }));
  }

  const onChatSubmitted = (chatId: string, content) => {
    console.log("Chat submitted " + chatId + " for user " + user?.userId + "With content " + content);
    emitChatSubmitted(content, chatId, appendMessageToChat, appendContentToMessageInChat);
  }

  return (
    <div className="h-[100svh] overscroll-contain">
      <ChatComponent
        chats={chats}
        selectedChat={selectedChat}
        onNewChatClicked={onNewChatClicked}
        onChatSubmitted={onChatSubmitted}
        onChatClicked={onChatClicked}
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