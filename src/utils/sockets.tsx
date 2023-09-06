import { io, Socket } from "socket.io-client";
import { whichEnv, Environments } from "./whichEnv";
import { Message } from "./types";

let socket: Socket;

async function getWebSocketToken() {
  console.log('Getting WebSocket token');
  const response = await fetch(
    whichEnv(process.env.APP_ENV) === Environments.Production ?
      'https://api.makeitaifor.me/auth/ws-token'
      : 'http://localhost:3000/auth/ws-token'
    , {
      method: 'GET',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
    });

  const data = await response.json();
  console.log(data);
  return data.token;
}

export const connectToSocket = async (): Promise<void> => {
  const token = await getWebSocketToken();
  socket = io(
    whichEnv(process.env.APP_ENV) === Environments.Production ?
      `wss://api.makeitaifor.me?token=${token}`
      : `ws://localhost:3000?token=${token}`);

  socket.on('connect', () => {
    console.log('socket.on(\'connect\'): Connected to WebSocket');
  })

  socket.on('error', (error) => {
    console.error('Error:', error);
  });

  socket.on('message', (message) => {
    console.log('Received message from server: ', message);
  });
};


export const emitTryButtonClicked = (
  content: string,
  appendMessageToChat: (chatId: string) => string,
  appendContentToMessageInChat: (chatId: string, messageId: string, content: string) => void
) => {
  console.log('Emitting tryButtonClicked');
  socket.emit('tryButtonClicked', { content: content });

  // Create new message row
  appendMessageToChat("question1");
  appendContentToMessageInChat("temp", "question1", content);
  appendMessageToChat("temp");

  let buffer: { [key: number]: string } = {};
  let expectedSeq = 0;
  let bufferString = "";

  // Handle individual words as they come in
  socket.on('textGeneratedChunk', (response) => {
    const { data, seq } = response;

    // Store the received chunk in the buffer
    buffer[seq] = data;

    // Check if the next expected chunk has arrived
    while (buffer[expectedSeq] !== undefined) {
      // Append the word to the chat
      bufferString += buffer[expectedSeq];
      appendContentToMessageInChat("temp", "temp", bufferString);
      delete buffer[expectedSeq];
      expectedSeq++;
    }
  });
  socket.on('textGenerated', (response) => {
    appendContentToMessageInChat("temp", "temp", response);
  });
};

export const emitCreateNewChat = (callback) => {
  console.log('Emitting createNewChat');
  socket.emit('startEmptyChat');
  socket.on('emptyChatStarted', (response) => {
    console.log('Received newChatCreated response: ', response);
    callback();
  });
}

export const emitChatSubmitted = (chatId: string, content : string, appendContentToMessageInChat, callback) => {
  console.log('Emitting chatSubmitted');
  socket.emit('chatSubmitted', { chatId: chatId, content: content });
  socket.on('savedChatSubmitted', (newMessage: Message) => {
    console.log('Received chatSubmitted response: ', newMessage);
    callback(newMessage);
    let buffer: { [key: number]: string } = {};
    let expectedSeq = 0;
    let bufferString = "";

    // Handle individual words as they come in
    socket.on('textGeneratedChunk', (response) => {
      const { data, seq } = response;

      // Store the received chunk in the buffer
      buffer[seq] = data;

      // Check if the next expected chunk has arrived
      while (buffer[expectedSeq] !== undefined) {
        // Append the word to the chat
        bufferString += buffer[expectedSeq];
        appendContentToMessageInChat(chatId, newMessage.id, bufferString);
        delete buffer[expectedSeq];
        expectedSeq++;
      }
    });
    socket.on('textGenerated', (response) => {
      appendContentToMessageInChat(chatId, newMessage.id, bufferString);
    });
  });
}
