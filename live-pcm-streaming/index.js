var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var fs = require("fs");

app.get('/producer.html', function(req, res){
  res.sendFile(__dirname + '/producer.html');
});

app.get('/consumer.html', function(req, res){
  res.sendFile(__dirname + '/consumer.html');
});

io.on('connection', function(socket){
	console.log('client connected');
	// forward incoming audio stream to clients
    socket.on('producer audio chunk', function(msg){
	  console.log(msg.length);
      io.emit('consumer audio chunk', msg);
    });
  
  // emit static file from server for testing purpose
//  fs.readFile('/Users/xian/projects/node.js/browser-pcm-stream/public/a.wav',function(error, filedata){
/*  fs.readFile('/Users/xian/Desktop/Untitled3.wav',function(error, filedata){
    if(error) throw error;
    else socket.emit("consumer audio chunk", filedata);
  });
*/});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
