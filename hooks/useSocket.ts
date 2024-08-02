// src/hooks/useSocket.ts
import { connectSocket, disconnectSocket } from '@/lib/socket';
import { useEffect, useRef } from 'react';
import { Socket } from 'socket.io-client';

const POLLING_ONE_MIN = 10000;

const useSocket = (
  namespace: string,
  eventHandlers: { [event: string]: (...args: any[]) => void } = {},
  onConnect?: (socket: Socket) => void,
  onDisconnect?: (reason: string) => void,
  onError?: (error: any) => void,
) => {
  const socketRef = useRef<Socket | null>(null);
  let intervalId: NodeJS.Timeout | null = null;

  useEffect(() => {
    if (!socketRef.current) {
      const socket = connectSocket(namespace);
      socketRef.current = socket;

      socket.on('connect', () => {
        console.log(`Connected to WebSocket server ${namespace}`);
        if (onConnect) {
          onConnect(socket);
          intervalId = setInterval(() => {
            onConnect(socket);
          }, POLLING_ONE_MIN);
        }
      });

      socket.on('disconnect', (reason) => {
        console.log(`Disconnected from WebSocket server: ${namespace}`, reason);
        if (onDisconnect) onDisconnect(reason);
      });

      socket.on('error', (error) => {
        console.error(`WebSocket error in namespace ${namespace}:`, error);
        if (onError) onError(error);
      });

      // Register additional event handlers
      Object.keys(eventHandlers).forEach((event) => {
        socket.on(event, eventHandlers[event]);
      });
    }

    return () => {
      if (socketRef.current) {
        disconnectSocket();
        socketRef.current = null;
      }
      if (intervalId) clearInterval(intervalId);
    };
  }, [namespace, onConnect, onDisconnect, onError, eventHandlers]);

  return socketRef.current;
};

export default useSocket;
