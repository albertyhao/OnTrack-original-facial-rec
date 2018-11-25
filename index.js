var express = require('express')
	, path = require('path')
	, bodyParser = require('body-parser')
	, http = require('http')
	, async = require('async')
	, fs = require('fs')
;

var app = express()
	, port = parseInt(process.env.PORT || '8080')
	, server = http.createServer(app)
;

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res, next) => {
	console.log('home')
	var filePath = path.join(__dirname, './home.html')
	res.sendFile(filePath);
});

app.get('/signup', (req, res, next) => {
	console.log('signup')
	var filePath = path.join(__dirname, './signup.html')
	res.sendFile(filePath);
})

app.get('/blacklist', (req, res, next) => {
	console.log('blacklist')
	var filePath = path.join(__dirname, './blacklist.html')
	res.sendFile(filePath);
})

app.get('/blacklist.css', (req, res, next) => {
	console.log('blacklist')
	var filePath = path.join(__dirname, './blacklist.css')
	res.sendFile(filePath);
})

app.get('/blacklist.js', (req, res, next) => {
	console.log('blacklist')
	var filePath = path.join(__dirname, './blacklist.js')
	res.sendFile(filePath);
})

app.get('/settings', (req, res, next) => {
	console.log('settings')
	var filePath = path.join(__dirname, './settings.html')
	res.sendFile(filePath);
})

app.get('/settings.js', (req, res, next) => {
	var filePath = path.join(__dirname, './settings.js')
	res.sendFile(filePath);
})

app.get('/navbar.css', (req, res, next) => {
	var filePath = path.join(__dirname, './navbar.css')
	res.sendFile(filePath);
})

app.get('/webcam', (req, res, next) => {
	var filePath = path.join(__dirname, './webcam.html')
	res.sendFile(filePath);
})

app.get('/webcam.js', (req, res, next) => {
	var filePath = path.join(__dirname, './webcam.js')
	res.sendFile(filePath);
})

server.on('listening', () => {
	var addr = server.address()
		, bind = typeof addr === 'string'
			? 'pipe ' + addr
			: 'port ' + addr.port
	;
	console.log('Listening on ' + bind);
});

server.listen(port);
