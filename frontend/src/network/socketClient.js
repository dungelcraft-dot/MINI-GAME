import { io } from 'socket.io-client';

export function createSocketClient() {
  return io(import.meta.env.VITE_API_URL || 'http://localhost:8000', {
    transports: ['websocket'],
    autoConnect: true,
  });
}
