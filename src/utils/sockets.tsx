import { io, Socket } from "socket.io-client";

async function getWebSocketToken() {
  const response = await fetch('https://api.makeitaifor.me/auth/ws-token', {
    method: 'GET',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
  });

  if (!response.ok) {
    throw new Error('Failed to get WebSocket token: ' + response.statusText);
  }

  const data = await response.json();
  return data.token;
}

let socket: Socket;

(async () => {
  if(process.env.NODE_ENV === 'development') {
    socket = io(`ws://localhost:3000/`);
  } else {
    const token = await getWebSocketToken();
    socket = io(`wss://api.makeitaifor.me?token=${token}`);
  }

  socket.on('connect', () => {
    console.log('Connected to WebSocket');
  })

  socket.on('error', (error) => {
    console.error('Error:', error);
  });

  socket.on('message', (message) => {
    console.log('Received message from server: ', message);
  });
})()

export const emitTryButtonClicked = (
  content: string,
  appendMessageToChat: (chatId: string) => string,
  appendContentToMessageInChat: (chatId: string, messageId: string, content: string) => void
) => {
  socket.emit('tryButtonClicked', { content: content });

  // Create new message row
  let mid = appendMessageToChat("temp");
  appendContentToMessageInChat("temp", mid, content);
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
