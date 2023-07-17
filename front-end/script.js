

console.log("the script is working");
var socket = io().connect('http://localhost');
var clients = [];

socket.on('connection',function (socket){
    clients.push(socket.id);
    console.log("connected client: "+clients);
    socket.on("dataFromClient",function(ClientData){
console.log(ClientData);
    });

socket.on("disconnect",function(){
    console.log("a client has been disconnected");
    console.log("number of connected client: "+clients.length);
})
socket.on('send message',(data) => {
   socket.emit('new message', {msg: data});
})

socket.on('file',(data) => {
    socket.emit('new file', {file: data});
})

});


