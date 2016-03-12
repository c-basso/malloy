'use strict';

var env = require('node-env-file');
var dispatcher = require('httpdispatcher');
var http = require('http');

env(__dirname + '/.env');

var PORT = process.env.PORT;

dispatcher.onGet("/auth", function(req, res) {
	res.writeHead(200, {'Content-Type': 'text/plain'});
	res.end('Page One');
});

function requestHandler(req, res){
	try {
		console.log(req.url);
		dispatcher.dispatch(req, res);
	} catch(err) {
		console.log(err);
	}
}

var server = http.createServer(requestHandler);

server.listen(PORT, function(){
	console.log("Server listening on: http://localhost:%s", PORT);
});