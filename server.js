const express = require('express');
const app = express();
const path = require('path');
const middleware = require('./config/middleware');
const http = require('http');
const routes = require('./config/routes')

middleware(app, express);
routes(app, express);

const server = http.createServer(app);

let port = process.env.PORT || 3001;

server.listen(port, () => {
  console.log(`Server on port: ${port}/`);
});

const io = require('socket.io')(server);

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('disconnect', () => {
    console.log('a user disconnected');
  });
});
