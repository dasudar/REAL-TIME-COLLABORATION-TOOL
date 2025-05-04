const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

let sharedContent = "";

app.use(express.static('public'));

io.on('connection', socket => {
  console.log('User connected:', socket.id);

  // Send existing content to the new user
  socket.emit('loadContent', sharedContent);

  // Listen for updates from a user
  socket.on('textUpdate', data => {
    sharedContent = data;
    socket.broadcast.emit('textUpdate', data); // send to other users
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

server.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});