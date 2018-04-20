const path = require('path');
const express = require('express');
const socketIO = require('socket.io');
const http = require('http');
const {generateMessage} = require('./utils/message')


const app = express();

const publicPath = path.join(__dirname + '/../public');
const port = process.env.PORT || 3000;

app.use(express.static(publicPath));

var server = http.createServer(app);
var io = socketIO(server);

io.on('connection', (socket)=>{
  console.log('New Connection');

  socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));
  socket.broadcast.emit('newMessage', generateMessage('Admin', 'New User connected'));



  socket.on('createMessage', function(msg){
    console.log('createMessage', msg);
    io.emit('newMessage', generateMessage(msg.from, msg.text));

});

socket.on('disconnect', ()=>{
  console.log('Lost Connection');
});
});










server.listen(port, ()=>{
  console.log('Up and Running ');
});
