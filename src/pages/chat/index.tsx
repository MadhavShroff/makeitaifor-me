import { ChatComponent } from "@/components/documents/ChatComponent"
import React, { useEffect, useState } from "react";
import { Chat, MessageVersion, isMessage } from "@/utils/types";
import { createNewChat, fetchChatsMetadata, fetchMessagesData, fetchUser, setModelForChat } from "@/utils/fetches";
import { connectToSocket, emitChatSubmitted } from "@/utils/sockets";
import { User, Message } from "@/utils/types";
import LoginPage from "../auth";
import { Environments, whichEnv } from "@/utils/whichEnv";

type ChatContextType = {
  chats: Chat[];
  user: User | null;
  selectedChat: string | undefined;
  onNewChatClicked: () => void;
  onChatSubmitted: (chatId: string, content: any) => void;
  onChatClicked: (index: number) => Promise<void>;
  appendContentToMessageInChat: (chatId: string, messageId: string, content: string) => void;
  appendMessageToChat: (chatId: string, message: Message) => Promise<void>;
  setChatTitle: (chatId: string, title: string) => void;
  setModelUsed: (chatId: string, model: string) => Promise<void>;
};

export const ChatContext = React.createContext<ChatContextType | null>(null);  

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
      fetchChatsMetadata(user.userId).then(async (user: User) => {
        console.log("Fetched chats metadata for user", user);
        const chats = user.chats;
        const messages: Message[] = await fetchMessagesData(chats[0].messages);
        chats[0].messages = messages;
        setChats(chats);  
        setSelectedChat(chats[0]._id); 
      }).catch(console.error);
    }
  }, [user]);

  const appendMessageToChat = async (chatId: string, message: Message) => {
    const newChat = chats.find((chat) => chat._id == chatId);
    if (newChat == undefined) {
      console.error("Chat with id not found", chatId);
    } else {
      (newChat.messages as Message[]).push(message);
      setChats([
        newChat,
        ...chats.filter((chat) => chat._id != chatId),
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
    setSelectedChat(chats[index]._id);
  }


  /**
   * Sets chat title to title, one character at a time
   * @param chatId chatId of chat to set title for
   * @param title title to set
   */
  const setChatTitle = (chatId: string, title: string) => {
    for(let i = 0; i < title.length; i++) {
      setTimeout(() => {
        const chat = chats.find((chat) => chat._id == chatId);
        if (chat == undefined) {
          console.error("Chat with id not found", chatId);
        } else {
          const newChats = chats.map((chat) => {
            if (chat._id == chatId) chat.title = title.substring(0, i+1);
            return chat;
          });
          setChats(newChats);
        }
      }, 100 * i);
    }
  }

  /**
   * Sets the model used for a chat
   * @param chatId chatId of chat to set title for
   * @param title title to set
   */
  const setModelUsed = async (chatId: string, model: string) => {
    // add edge case handling
    const chat = chats.find((chat) => chat._id == chatId);
    if (chat == undefined) {
      console.error("Chat with id not found", chatId);
    } else {
      await setModelForChat(chatId, model);
      const newChats = chats.map((chat) => {
        if (chat._id == chatId) chat.modelUsed = model;
        return chat;
      });
      setChats(newChats);
    }
  }

  const onChatSubmitted = (chatId: string, content) => {
    console.log("Chat submitted " + chatId + " for user " + user?.userId + "With content " + content);
    emitChatSubmitted(content, chatId, appendMessageToChat, appendContentToMessageInChat, setChatTitle);
  }

  return (
    <ChatContext.Provider value={{ 
      chats, 
      user,
      selectedChat, 
      onNewChatClicked, 
      onChatSubmitted, 
      onChatClicked, 
      appendContentToMessageInChat, 
      appendMessageToChat,
      setChatTitle,
      setModelUsed,
    }}>
      <div className="h-[100svh] overscroll-contain">
        <ChatComponent />
      </div>
    </ChatContext.Provider>
  );

  // else return (
  //   <main className="bg-white dark:bg-black h-[100dvh]">
  //     <LoginPage />
  //   </main>
  // )
}

export default ChatPage;