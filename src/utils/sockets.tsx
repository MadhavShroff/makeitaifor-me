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
  const token = await getWebSocketToken();
  socket = io(`wss://api.makeitaifor.me?/socket.io?token=${token}`);
  
  socket.on('connect', () => {
      console.log('Connected to WebSocket');
  })

  socket.emit('message', 'Hello from client lalalalal', (response) => {
    console.log(response);
  });
  
  socket.on('error', (error) => {
    console.error('Error:', error);
  });  

  socket.on('message', (message) => {
      console.log('Received message from server: ', message);
  });
})()

export const sendButtonClicked = (content: string) => {
  console.log("sendButtonClicked");
  socket.emit('buttonClicked', { content: content })
};
