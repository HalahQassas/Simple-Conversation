/* Halah Qassas 
   Sarah Fahad 
   */
var http = require("http");
var fs = require('fs');
var serveStatic = require("serve-static");
var finalhandler = require("finalhandler");

var express = require('express');
var upload = require("socketio-file-upload");
var app = express().use(upload.router);
var server = require('http').createServer(app);
var io = require('socket.io')(server);
app.use(express.static(__dirname + '/node_modules'));
app.get('/', function(req, res, next) {
    res.sendFile(__dirname + '/index.html');
});

var serve = serveStatic("./Front-end/");

var server = http.createServer(function(req,res) {
var done = finalhandler(req,res);
serve(req,res,done);

}).listen(8000);

var io = require("socket.io")(server);

var clients = [];

io.sockets.on('connection',function (socket){
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
        io.sockets.emit('new message', {msg: data});
    })
    socket.on('file',(data) => {
        socket.emit('new file', {file: data});
    })
    
  
});


