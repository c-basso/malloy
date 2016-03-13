'use strict';

var _ = require('lodash');
var ym = require('yandex-money-sdk');
var env = require('node-env-file');
var dispatcher = require('httpdispatcher');
var TelegramBot = require('node-telegram-bot-api');
var http = require('http');
var url = require('url');
var Store = require('./lib/db');

var store = new Store();

env(__dirname + '/.env');

var PORT = process.env.PORT;
var BOT_NAME = process.env.BOT_NAME;
var YM_CLIENT_ID = process.env.YM_CLIENT_ID;
var TELEGRAM_TOKEN = process.env.TELEGRAM_TOKEN;
var YM_REDIRECT_URI = process.env.YM_REDIRECT_URI;
var YM_CLIENT_SECRET = process.env.YM_CLIENT_SECRET;
var SCOPE = ['account-info', 'operation-history', 'operation-details'];




dispatcher.beforeFilter(/\//, function(req, res, chain) { //any url
	var parts = url.parse(req.url, true);
	var params = parts.query;

	var code = params.code;
	var uid = parseInt(params.uid);

	function onTokenComplete(err, data) {
		if(err) {
			console.log(err);
			chain.next(req, res, chain);
		}

		var access_token = data.access_token;

		function findCallback(result) {

			if (!_.isEmpty(result)) {

				result = result[0];
				result.token = access_token;

				store.update({
					table: 'users',
					data: result
				});

				var bot = new TelegramBot(TELEGRAM_TOKEN);

				function getKeyboard (msg) {
					return {
						reply_markup: JSON.stringify({
							keyboard: [
								['/typepie', '/inout'],
								['/help']
							]
						})
					};
				};

				var message = [
					'Отлично!',
					'Теперь можно посмотреть твою статистику.',
				];

				bot.sendMessage(uid, message.join('\n'), getKeyboard());
			}

			chain.next(req, res, chain);
		};

		store.find({
			table: 'users',
			data: {uid: uid},
			callback: findCallback
		});
	};

	ym.Wallet.getAccessToken(YM_CLIENT_ID, code, YM_REDIRECT_URI, YM_CLIENT_SECRET, onTokenComplete);
});

dispatcher.onGet(/\/auth(.*)/, function(req, res) {
	res.writeHead(302, {'Location': 'https://telegram.me/' + BOT_NAME});
	res.end();
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