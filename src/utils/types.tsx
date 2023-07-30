export type Message = {
    id: string;
    content: string[];
    whoSent: string; // user name or "bot"
    whenSent: Date; // timestamp
}

export type Chat = {
    id: string;
    title: string;
    content: Message[]; // array of strings of markdown with math and images, where each \ is escaped. 
}

export type User = {
    id: string;
    name: string;
    username: string;
};