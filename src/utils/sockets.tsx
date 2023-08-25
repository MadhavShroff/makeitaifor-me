import { io, Socket } from "socket.io-client";

async function getGuestAccess() {
  console.log('Getting guest access');
  const response = await fetch('https://api.makeitaifor.me/auth/guest', {
    method: 'GET',
    credentials: 'include', // This will include the cookies in the request
  });

  if (!response.ok) {
    console.error('Failed to get guest access');
    console.error(response);
    await new Promise((resolve) => setTimeout(resolve, 10000));
    throw new Error('Failed to get guest access');
  } else {
    // once cookie is set, try to get the WebSocket token again with the cookie
    await new Promise((resolve) => setTimeout(resolve, 5000));
    return await getWebSocketToken("guest");
  }
}

async function getWebSocketToken(who: string) {
  console.log('Getting WebSocket token');
  const response = await fetch('https://api.makeitaifor.me/auth/ws-token', {
    method: 'GET',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
  });

  if (!response.ok && who === "guest") {
    console.error('Failed to get WebSocket token. Continuing as Guest');
    return await getGuestAccess(); // Get guest access and set the cookie
    // Try to get the WebSocket token again
  }

  const data = await response.json();
  return data.token;
}

let socket: Socket;

export const connectToSocket = async (): Promise<void> => {
  const token = await getWebSocketToken("authenticated user");
  socket = io(`wss://api.makeitaifor.me?token=${token}`);

  socket.on('connect', () => {
    console.log('Connected to WebSocket');
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
