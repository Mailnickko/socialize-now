require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');
const middleware = require('./config/middleware');
const http = require('http');
const routes = require('./config/routes');

middleware(app, express);
routes(app, express);

const server = http.createServer(app);

let port = process.env.PORT || 3000;

server.listen(port, () => {
  console.log(`Server on port: ${port}/`);
});

const io = require('socket.io')(server);

const activeUsers = {};

const userJoin = (eventId, name) => {
  if(!activeUsers[eventId]){
    activeUsers[eventId] = [name];
  } else {
    activeUsers[eventId].push(name);
  }
  io.sockets.in(eventId).emit('userStatus', activeUsers[eventId]);
}

const userLeave = (eventId, name) => {
  activeUsers[eventId].splice(activeUsers[eventId].indexOf(name), 1);
  io.sockets.in(eventId).emit('userStatus', activeUsers[eventId]);
}

io.on('connection', (socket) => {

  console.log('a user connected');

  socket.on('join', ({ eventId, name }) => {
    socket.join(eventId);
    userJoin(eventId, name);
  });

  socket.on('leave', ({eventId, name}) => {
    userLeave(eventId, name);
  });

  socket.on('disconnect', () => {
    console.log('a user disconnected');
  });
});

module.exports.io = io;
module.exports.app = app;
