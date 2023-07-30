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
  const [chats, setChats] = useState<Chat[]>([]);

  const appendEmptyMessageToChat = (chatId: string) => {
    console.log("Appending empty message to chat " + chatId);
    setChats(chats.map((chat) => {
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
    console.log(`Appending content to message in chat ${chatId} with message id ${messageId}`);
    console.log("Content: " + content);
    setChats(chats.map((chat) => {
      if (chat.id === chatId) {
        return {
          ...chat,
          content: chat.content ? chat.content.map((message) => {
            if (message.id === messageId) {
              return {
                ...message,
                content: content.split('\n')
              };
            } else {
              return message;
            }
          }) : []
        };
      } else {
        return chat;
      }
    }));
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
    setChats(mockChats);
  }, [user]);
  return (
    <main className="overflow-hidden">
      <ChatComponent chatsMeta={chats}
        onNewChatClicked={() => { setChats([{ "content": null, "id": "temp", "title": "New Chat" }, ...chats]) }}
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