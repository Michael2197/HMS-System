import { io, Socket } from 'socket.io-client';
import { SOCKET_URL } from '../app/constants';
let socket: Socket | null = null;

export const connectSocket = (token: string) => {
  if (socket) return socket;
  socket = io(SOCKET_URL, { auth: { token } });
  socket.on('connect', () => { console.log('socket connected', socket?.id); });
  return socket;
};
export const disconnectSocket = () => { if (socket) socket.disconnect(); socket = null; };
