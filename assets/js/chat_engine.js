// here frontend is established for connection to socket.io

class ChatEngine{
    constructor(chatBoxId , userEmail){
        this.chatBox = $(`#${chatBoxId}`);
        this.userEmail = userEmail;

        this.socket = io.connect('http://localhost:5000');
        

        if(this.userEmail){
            this.connectionHandler();
        }
    }


    // this is the message which is emmited after the connecton is established b/w frontend and backend
    connectionHandler(){
        let self = this;

        this.socket.on('connect' , function(){
            console.log('connection estlablished using sockets..!');


             // ask for joining a room by sending an event
             self.socket.emit('join_room',{
                user_email: self.userEmail,
                chatroom: 'codeial'
             });

            //  detect the event when user has finally joined
            self.socket.on('user_joined', function(data){
                console.log('a user joined' ,data);
            })
        });



        // send a message on clicking the send message button
        $('#send-message').click(function(){
            let msg = $('#chat-message-input').val();

            if(msg != ' '){
                self.socket.emit('send_message' , {
                    message: msg,
                    user_email: self.userEmail,
                    chatroom: 'codeial'
                });
            }
        });


        // detect the receive message event
        self.socket.on('receive_message' , function(data){
            console.log('message received' , data.message);


            // create list item
            let newMessage = $('<li>');

            let messageType = 'other-message';

            if(data.user_email == self.userEmail){
                messageType = 'self-message';
            }

            newMessage.append($('<span>',  {
                'html': data.message
            }));

            newMessage.append($('<sub>', {
                'html': data.user_email
            }));

            newMessage.addClass(messageType);

            $('#chat-messages-list').append(newMessage);
        })
    }
}

