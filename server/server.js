const path = require('path');
const express = require('express');
const socketIO = require('socket.io');
const http = require('http');


const app = express();

const publicPath = path.join(__dirname + '/../public');
const port = process.env.PORT || 3000;

app.use(express.static(publicPath));

var server = http.createServer(app);
var io = socketIO(server);

io.on('connection', (socket)=>{
  console.log('New Connection');



  socket.on('createMessage', function(msg){
    io.emit('newMessage', {'from': msg.from,
    'text': msg.text,
    'createdAt': new Date().getTime()
  });

  console.log('createMessage', msg);
});

socket.on('disconnect', ()=>{
  console.log('Lost Connection');
});
});










server.listen(port, ()=>{
  console.log('Up and Running ');
});
