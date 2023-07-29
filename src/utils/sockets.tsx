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

const socket: Socket = io(`wss://api.makeitaifor.me?token=${getWebSocketToken()}`);

socket.on('connect', () => {
    console.log('Connected to WebSocket');
})

socket.emit('message', 'Hello from client lalalalal');

socket.on('message', (message) => {
    console.log('Received message from server: ', message);
});

export const sendButtonClicked = (content: string) => socket.emit('buttonClicked', { content: content });
