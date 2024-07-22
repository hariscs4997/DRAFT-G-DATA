// src/utils/socket.ts
import { io, Socket } from 'socket.io-client';

let socket: Socket | null = null;

const connectSocket = (namespace: string): Socket => {
  if (!socket) {
    socket = io(`${process.env.NEXT_PUBLIC_REACT_APP_BASE_URL}${namespace}`, {
      transports: ['websocket', 'polling'],
      reconnection: true,
    });
  }
  return socket;
};

const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};

export { connectSocket, disconnectSocket };
