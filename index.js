require('dotenv').config();
const express = require('express');
const http = require('http');
const port = process.env.PORT || 3003;
const router = require('./app/router');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/frontend/index.html');
});

app.use(router);

io.on('connection', (socket) => {

    socket.broadcast.emit('hi');

    console.log('🚀 A user has just logged in');

    socket.on('disconnect', () => {
        console.log('👋 A user has just logged out');
    });

    socket.on('chat message', msg => {
        io.emit('chat message', msg);
      });

    socket.on('chat message', (msg) => {
        console.log('📬 New message are sended in the chat room : ' + msg);
    });

});

server.listen(port, _ => {
    console.log(`Socket.IO Listening at http://localhost:${port}`);
});