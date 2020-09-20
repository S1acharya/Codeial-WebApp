// we receive a request for connection on the server side here



module.exports.chatSockets = function(socketServer){
    let io = require('socket.io')(socketServer);
    

    // whenever is request is received , it send back acknowledgement to the user
    io.sockets.on('connection' , function(socket){
        console.log('new connection received' , socket.id);


        // whenever user disconnects , this event automatically gets fired
        socket.on('disconnect', function(){
            console.log('socket disconnected!');
        });

        // receive the event sent from chat_engine.js here
        socket.on('join_room' , function(data){
            console.log('joining request rec' , data);

            // enter the chat room
            socket.join(data.chatroom);

            // emit the event that other users can join the chatroom
            io.in(data.chatroom).emit('user_joined' , data);
        });

        

        // detect the send message and broadcast to everyone in the room
        socket.on('send_message' ,function(data){
            io.in(data.chatroom).emit('receive_message' , data);
        });
        
    });

}

