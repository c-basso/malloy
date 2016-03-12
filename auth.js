'use strict';

var _ = require('lodash');
var ym = require('yandex-money-sdk');
var env = require('node-env-file');
var dispatcher = require('httpdispatcher');
var http = require('http');
var jade = require('jade');
var fs = require('fs');
var url = require('url');

env(__dirname + '/.env');

var PORT = process.env.PORT;
var YM_CLIENT_ID = process.env.YM_CLIENT_ID;
var YM_CLIENT_SECRET = process.env.YM_CLIENT_SECRET;



dispatcher.beforeFilter(/\//, function(req, res, chain) { //any url
	var parts = url.parse(req.url, true);
	var params = parts.query;

	var code = params.code;
	var id = params.id;

	ym.Wallet.getAccessToken(
		YM_CLIENT_ID,
		code,
		'https://ymmalloybot.ngrok.io/auth',
		YM_CLIENT_SECRET,
		function (err, data) {
			if(err) {
				console.log(err);
			}
			var access_token = data.access_token;
			console.log(data);

			var fn = jade.compile(fs.readFileSync('templates/auth.js'));
			req.htmlOutput = fn({
				maintainer: {
					name: 'Forbes Lindesay',
					twitter: '@ForbesLindesay',
					blog: 'forbeslindesay.co.uk'
				}
			});

			chain.next(req, res, chain);

		});


});

dispatcher.onGet(/\/auth(.*)/, function(req, res) {
	res.writeHead(200, {'Content-Type': 'text/html'});
	res.end(req.htmlOutput);
});

function requestHandler(req, res){
	try {
		dispatcher.dispatch(req, res);
	} catch(err) {
		console.log(err);
	}
}

var server = http.createServer(requestHandler);

server.listen(PORT, function(){
	console.log("Server listening on: http://localhost:%s", PORT);
});