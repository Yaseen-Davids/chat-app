var express = require('express');
var app = express();
var server = require("http").createServer(app);
var io = require("socket.io")(server);

app.set('view engine', 'ejs');
app.use(express.static('public'));

io.on('connection', function(socket){
    console.log("New user connected");

    socket.username = "Anonymous";

    socket.on('change_username', function(data){
        socket.username = data.username;
    });

    socket.on('new_message', function(data){
        io.sockets.emit('new_message', { message: data.message, username: socket.username })
    });

});

app.get('/', function(req, res) {
    res.render('index', {
        title: "ChatApp"
    })
});

server.listen(3000);