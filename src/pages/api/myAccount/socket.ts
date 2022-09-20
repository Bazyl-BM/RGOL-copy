import { Server } from 'socket.io';

import messageHandler from '@/utils/messageHandler';

export default async function SocketHandler(req, res) {
  // It means that socket server was already initialised
  if (res.socket.server.io) {
    console.log('Already set up');
    res.end();

    return;
  }

  const io = new Server(res.socket.server);
  res.socket.server.io = io;

  // Define actions inside
  io.on('connection', function (socket) {
    socket.on('room', function (room) {
      // take room variable from client side
      socket.join(room); // and join it
    });
    messageHandler(io, socket, req.body);
    socket.on('leave', function (room) {
      // take room variable from client side
      socket.leave(room); // and join it
    });
  });

  console.log('Setting up socket');
  res.end();
}
