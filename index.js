var express = require('express')
	, path = require('path')
	, packtrackSchema = require('./packtrackSchema.js').getModel()
	, bodyParser = require('body-parser')
	, http = require('http')
	, async = require('async')
	, fs = require('fs')
	, stream = require('stream')
;

var app = express()
	, port = parseInt(process.env.PORT || '8080')
	, server = http.createServer(app)
;

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'images')));

app.post('/gimmeImgUrlDamnServer', (req, res, next) => {
	if(!req.body.image) return res.send({error: 'not good'});

	const match = req.body.image.match(/^data\:image\/([a-zA-Z0-9]*);base64,(.*)/);
	if( !match || match.length !== 3) return res.send({error: 'not good'});

	const type = (match[1] + '').toLowerCase();
	const imageData = match[2];
	if(!type || !imageData || !['png', 'jpg', 'jpeg', 'tiff',
		'tif', 'gif', 'bmp'].includes(type)) {
		return res.send({error: 'not good'});
	}

	const img = Buffer.from(imageData, 'base64');
	const filename = path.join(__dirname, `./images/${new Date()}${Math.random()}.${type}`);

	var imgStream = new stream.PassThrough();
	imgStream.end(img);

	var wStream = fs.createWriteStream(filename);

	imgStream.once('end', () => {
	    res.send({filename});
	});

	imgStream.once('error', (err) => {
			return res.send({error: 'not good'});
	});

	imgStream.pipe(wStream);
})

app.get('/', (req, res, next) => {
	console.log('home')
	var filePath = path.join(__dirname, './home.html')
	res.sendFile(filePath);
});

app.get('/timer.js', (req, res, next) => {
	console.log('timer')
	var filePath = path.join(__dirname, './timer.js')
	res.sendFile(filePath);
});

app.get('/home.css', (req, res, next) => {
	console.log('home')
	var filePath = path.join(__dirname, './home.css')
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

// app.get('/pcap.js', (req, res, next) => {
// 	var filePath = path.join(__dirname, './pcap.js')
// 	res.sendFile(filePath);
// })

server.on('listening', () => {
	var addr = server.address()
		, bind = typeof addr === 'string'
			? 'pipe ' + addr
			: 'port ' + addr.port
	;
	console.log('Listening on ' + bind);
});

server.listen(port);
