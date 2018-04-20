var socket = io();

socket.on('connect', function(){
  console.log('connected to a server');
});

socket.on('disconnect', function(){
  console.log('disconnected from the server');
});

socket.on('newMessage', function(msg){
  console.log('new msg ', msg);

  var li = jQuery('<li></li>');
  li.text(`${msg.from}: ${msg.text}`);
  jQuery('#msgs').append(li);

});

jQuery('#msg-form').on('submit', function(e){
  e.preventDefault();

  socket.emit('createMessage', {
    'from': 'User',
    'text': jQuery('[name=msg]').val()
  }, function(){

  });
});
