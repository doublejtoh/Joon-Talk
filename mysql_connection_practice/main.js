
// mysql부분
var fs = require('fs');
var ejs = require('ejs');
var mysql = require('mysql');

var express = require('express');
var bodyParser = require('body-parser');


var client = mysql.createConnection({
	user:'root',
	password: 'wnsgus35',
	database: 'Post'
	
	
});

var app = express();
app.use(bodyParser.urlencoded({
	
	extended: false
	
}));

app.get('/',function(req,res){
	res.send('Hello World');
	
});

app.use(express.static(__dirname + '/public'));

app.use('/show_kitten',function(req,res){
	res.writeHead(200,{'content-Type': 'text/html'});
	res.end('<img src="/batch_norm_pic1.png">');
	
});

app.get('/create', function(request,response){
fs.readFile('create.ejs', 'utf8',function(error,data){
		response.send(data);
		
	});
});

app.post('/create', function(req,res){
	var body= req.body;
	client.query('INSERT INTO posts (user, contents) VALUES(?,?)', [body.user,body.contents],function(){
		response.redirect('/read');
	});
	
});

app.get('/read',function(req,res){
	fs.readFile('read.ejs','utf8',function(error,data){
		client.query('SELECT * from posts', function(error,results){
					 res.send(ejs.render(data,{
					 	data: results
					 }));
		});
	});
});


app.listen(3000,function(){
	
	console.log('Example app listening on port 3000!');
});