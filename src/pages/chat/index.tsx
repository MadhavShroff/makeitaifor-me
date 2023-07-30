import { ChatComponent, Message } from "@/components/documents/ChatComponent"
import { Chat } from "@/components/documents/ChatComponent"
import React, { useEffect, useState } from "react";
import { mockChats } from "../documents";

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
            onNewChatClicked={() => {setChatsMeta([{"content": null, "id": "temp", "title" : "New Chat"}, ...chatsMeta])}}
            onChatSubmitted={(chatId : string) => {
              console.log("Chat submitted " + chatId + " for user " + user.username);
            }}/>
        </main>
    )
}

export default ChatPage;