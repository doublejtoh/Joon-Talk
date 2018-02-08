var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);


app.get('/',function(req,res){
	
	res.sendFile(__dirname + '/index.html');
});

io.on('connection',function(socket){ //io라는 모듈에 on이라는 함수는 connection이라는 이벤트가 일어나면 콜백함수를 실행한다.
	console.log('a user connected');
	
	socket.broadcast.emit('hi');
	socket.on('disconnect',function(){
		
		console.log('user disconnected;');
	});
	
	socket.on('chat message',function(msg){
		io.emit('chat message',msg);
		console.log('message: '+msg);
		
	});
});

http.listen(3000,function(){
	console.log('https://doublejtoh.run.goorm.io에서 돌아갑니다.');
});