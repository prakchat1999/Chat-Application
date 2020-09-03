var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

io.on('connection', function(socket) {
    console.log("A user connected");
    socket.on('chat message', (msg) => {
        io.emit('chat message', msg);
        console.log('message: ' + JSON.stringify(msg));
      });
})

http.listen(3001, function(){
  console.log('listening on *:3001');
});