var app = require('express')()
  , server = require('http').createServer(app)
  , io = require('socket.io').listen(server);

server.listen(3000);

app.get('/', function (req, res) {
  res.sendfile(__dirname + '/public/index.html');
});

io.sockets.on('connection', function (socket) {
  var randomTimer = setInterval(function () {
    socket.volatile.emit('random', Math.random());
  }, 1000);

  socket.on('disconnect', function () {
    clearInterval(randomTimer);
  });
});
