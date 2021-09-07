const express = require('express');
const message = require('./models/messagesModel');
const app = express();

const http = require('http');
const server = http.createServer(app);

const { Server } = require('socket.io');
const io = new Server(server);

const path = require('path');
const cors = require('cors');

const PORT = 3000;

const postingController = require('./controllers/postingController');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/build', express.static(path.resolve(__dirname, '../build')));

app.get('/', function (req, res) {
  res.status(200).sendFile(path.join(__dirname, '../index.html'));
});

app.post('/thomChat', postingController.postMessage, function (req, res) {
  res.status(200).json(res.locals.postedItem);
});

app.get('/messages', postingController.getMessages, function (req, res) {
  res.status(200).json(res.locals.messages);
});

// global error handler

app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).send('Middleware Error');
});

io.on('connection', (socket) => {
  socket.on('chat message', (msg) => {
    console.log('msg ', msg);
    io.emit('chat message', msg);
  });
});

server.listen(3000, () => {
  console.log('listening on *:3000');
});

// app.listen(PORT, () => {
//   console.log('listening on port ', PORT);
// });
