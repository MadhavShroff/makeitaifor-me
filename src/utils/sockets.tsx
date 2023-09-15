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


export const emitChatSubmitted = (
  content: string,
  chatId: string,
  appendMessageToChat: (chatId: string, message: Message) => void,
  appendContentToMessageInChat: (chatId: string, messageId: string, content: string) => void,
  setChatTitle: (chatId: string, title: string) => void
) => {
  console.log('Emitting messageSubmitted: ' + chatId);
  console.log('Emitting messageSubmitted: ' + content);
  socket.emit('messageSubmitted', { content: content, chatId: chatId });
  let queryText;
  socket.on('addedQueryToChat-' + chatId, async (response) => {
    response =  JSON.parse(response);
    console.log('Received response at addedQueryToChat: ', response);
    queryText = response.message.versions[0].text;
    await appendMessageToChat(chatId, response.message);
    socket.off('addedQueryToChat-' + chatId);
  });
  socket.on('addedResponseToChat-' + chatId, async (response) => {
    response =  JSON.parse(response);
    console.log('Received response at addedResponseToChat: ', response);
    await appendMessageToChat(chatId, response.message);
    socket.off('addedResponseToChat-' + chatId);
    const responseMessageId = response.message._id;
    const versionId = response.message.versions[0]._id;

    socket.emit('generateText', { query: queryText, chatId: chatId, versionId: versionId});

    let buffer: { [key: number]: string } = {};
    let expectedSeq = 0;
    let bufferString = "";

    // Handle individual words as they come in
    socket.on('textGeneratedChunk-' + chatId, (response) => {
      console.log('Received response at textGeneratedChunk: ', response);
      const { data, seq } = response;

      // Store the received chunk in the buffer
      buffer[seq] = data;

      // Check if the next expected chunk has arrived
      while (buffer[expectedSeq] !== undefined) {
        // Append the word to the chat
        bufferString += buffer[expectedSeq];
        appendContentToMessageInChat(chatId, responseMessageId, bufferString);
        delete buffer[expectedSeq];
        expectedSeq++;
      }
    });

    socket.on('textGenerated-' + chatId, async (response) => {
      await appendContentToMessageInChat(chatId, responseMessageId, response);
      socket.off('textGenerated-' + chatId);
      socket.off('textGeneratedChunk-' + chatId);
    });

    socket.on('titleGenerated-' + chatId, async (response) => {
      const { title } = response;
      await setChatTitle(chatId, title);
      socket.off('titleGenerated-' + chatId);
    });
  });
};