'use strict';

var env = require('node-env-file');
var dispatcher = require('httpdispatcher');
var http = require('http');
var jade = require('jade');
var fs = require('fs');

env(__dirname + '/.env');

var PORT = process.env.PORT;

var fn = jade.compile(fs.readFileSync('templates/auth.js'));
var htmlOutput = fn({
	maintainer: {
		name: 'Forbes Lindesay',
		twitter: '@ForbesLindesay',
		blog: 'forbeslindesay.co.uk'
	}
});

dispatcher.onGet("/auth", function(req, res) {
	res.writeHead(200, {'Content-Type': 'text/html'});
	res.end(htmlOutput);
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