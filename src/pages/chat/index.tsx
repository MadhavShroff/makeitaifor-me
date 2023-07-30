import { ChatComponent } from "@/components/documents/ChatComponent"
import React, { useEffect, useState } from "react";
import { mockChats } from "../documents";
import { Chat } from "@/utils/types";

const ChatPage = () => {
  // const [user, setUser] = useState(null);
  const [user, setUser] = useState({ // Mock user
    id: "91231123-1230u1u-123132",
    name: "John Doe",
    username: "john@doe.com"
  });
  const [docs, setDocs] = useState<string[]>([]); // names of all documents the user has uploaded
  const [chatsMeta, setChatsMeta] = useState<Chat[]>([]);
  const [chatContent, setChatContent] = useState<Chat | null>(null);

  const appendEmptyMessageToChat = (chatId: string) => {
    console.log("Appending empty message to chat " + chatId);
    setChatsMeta(chatsMeta.map((chat) => {
      if (chat.id == chatId) {
        return {
          ...chat,
          content: [{
            id: "temp",
            content: null,
            whoSent: user?.name ?? "John Doe",
            whenSent: new Date()
          }]
        };
      } else {
        return chat;
      }
    }));
  }

  const appendContentToMessageInChat = (chatId: string, messageId: string, content: string) => {
    const newContent = chatsMeta;
    newContent.forEach((chat) => {
      if (chat.id == chatId) {
        if (chat.content == null) chat.content = [];
        chat.content.forEach((message) => {
          if (message.id == messageId) {
            if (message.content == null) message.content = [];
            message.content.push(content);
          }
        });
      }
    });
  }

  const pointerSensorOptions = {
    activationConstraint: {
      delay: 150,
      tolerance: 5,
    },
  };

  useEffect(() => {
    // fetchUser(setUser);
  }, []);

  useEffect(() => {
    // if (user) fetchDocs(user).then(setDocs).catch(console.error);
    // if (user) fetchChatsMeta(user).then(setChatsMeta).catch(console.error);
    // if (user && chatsMeta && chatsMeta[0] && chatsMeta[0].id) fetchChatContent(user, chatsMeta[0].id).then(setChatContent).catch(console.error);
    setDocs(["Hello Hi", "How", "Are", "You", "Doing", "Today", "On", "This", "Blessed", "Day"]);
    setChatsMeta(mockChats);
    setChatContent(mockChats[0]);
  }, [user]);
  return (
    <main className="overflow-hidden">
      <ChatComponent chatsMeta={chatsMeta}
        onNewChatClicked={() => { setChatsMeta([{ "content": null, "id": "temp", "title": "New Chat" }, ...chatsMeta]) }}
        onChatSubmitted={(chatId: string) => {
          console.log("Chat submitted " + chatId + " for user " + user.username);
        }}
        appendContentToMessageInChat={appendContentToMessageInChat}
        appendEmptyMessageToChat={appendEmptyMessageToChat}
      />
    </main>
  )
}

export default ChatPage;