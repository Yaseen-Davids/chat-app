$(function(){
    // make connection
    var socket = io.connect("http://localhost:3000/");

    var message = $("#message");
    var username = $("#username");
    var send_message = $("#send_message");
    var send_username = $("#send_username");
    var chatroom = $("#chatroom");

    // Emit a Message
    send_message.click(function(){
        socket.emit('new_message', { message: message.val() })
        message.val("");
    });

    // Listen on messages
    socket.on("new_message", function(data){
        console.log(data);
        chatroom.append("<p class='message'>" + "<span class='userName'>" + data.username + "</span>" + ": " + data.message + "</p>")
    })

    // Emit a username
    send_username.click(function(){
        alert("Username changed to " + username.val())
        socket.emit('change_username', { username: username.val() })
        username.val("");
    });

});