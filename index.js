require('dotenv').config();
const express = require('express');
const session = require('express-session')
const http = require('http');
const port = process.env.PORT || 3003;
const router = require('./app/routers/router');
const { Server } = require('socket.io');


const app = express();
const server = http.createServer(app);

const io = new Server(server);

app.set('trust proxy', 1) // trust first proxy
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: true,
  saveUninitialized: true,
  cookie: { secure: false }
}));

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(router);

io.on('connection', (socket) => {

    // When a user arrives, a message is sent
    io.emit('chat message', 'A new user has arrived! 🚀');

    // When a user left, a message is sent
    socket.on('disconnect', () => {
        io.emit('chat message', 'A user has left 🚶');
    });

    // When a message is send, we emit the event
    socket.on('chat message', (msg) => {
        io.emit('chat message', msg);
    });

});

server.listen(port, _ => {
    console.log(`Socket.IO Listening at http://localhost:${port}`);
});

module.exports = io;