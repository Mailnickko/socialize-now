require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');
const middleware = require('./config/middleware');
const http = require('http');
const routes = require('./config/routes');
const eventController = require('./controllers/eventController');

middleware(app, express);
routes(app, express);

const server = http.createServer(app);

let port = process.env.PORT || 3000;

server.listen(port, () => {
  console.log(`Server on port: ${port}/`);
});

const io = require('socket.io')(server);

io.on('connection', (socket) => {

  console.log('a user connected');

  socket.on('join', ({ eventId, userId, name, picture }) => {
    socket.join(eventId);
    eventController.addUserStatus(eventId, userId, name, picture);
  });

  socket.on('lockin', ({ eventId, userId }) => {
    eventController.lockInVote(eventId, userId);
  });

  socket.on('disconnect', () => {
    console.log('a user disconnected');
  });
});

module.exports.io = io;
module.exports.app = app;
