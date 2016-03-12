'use strict';

var _ = require('lodash');
var ym = require('yandex-money-sdk');
var env = require('node-env-file');
var TelegramBot = require('node-telegram-bot-api');
var Store = require('./lib/db');
var Stat = require('./lib/stat');
var history = require('./lib/history');
var bar = require('./lib/bar');

env(__dirname + '/.env');

var YM_CLIENT_ID = process.env.YM_CLIENT_ID;
var YM_REDIRECT_URI = process.env.YM_REDIRECT_URI;
var YM_CLIENT_SECRET = process.env.YM_CLIENT_SECRET;
var SCOPE = ['account-info', 'operation-history', 'operation-details'];

var store = new Store();
var bot = new TelegramBot('185738543:AAFLunW95X6NvtWhKTeuGhiD-hV7pHvte3M', {polling: {interval: 5000}});


function getKeyboard (msg) {
	return {
		reply_markup: JSON.stringify({
			keyboard: [
				['/typepie', '/inout']
			]
		})
	};
};


function getKeyboard2 (msg) {
	return {
		reply_markup: JSON.stringify({
			keyboard: [
				['year', 'month']
			],
			force_reply: true
		})
	};
};


function checkAuth(userId, callback){

	function findCallback(result){
		if (_.isEmpty(result) || _.isEmpty(result[0].token)) {

			if (_.isEmpty(result)) {
				store.insert({
					table: 'users',
					data: {
						uid: parseInt(userId),
						token: ''
					}
				});
			}

			var redirectUri = [YM_REDIRECT_URI, 'uid=' + userId].join('?');
			var url = ym.Wallet.buildObtainTokenUrl(YM_CLIENT_ID, redirectUri, SCOPE);

			var message = '[Авторизируйтесь](' + url + ') через Яндекс.Деньги';

			bot.sendMessage(userId, message);

		} else {
			store.find({
				table: 'steps',
				data: {uid: userId},
				callback: function (step) {
					callback(result, step);
				}
			});
		}
	}

	store.find({
		table: 'users',
		data: {uid: userId},
		callback: findCallback
	});
}


function inout (msg) {
	var userId = msg.from.id;

	checkAuth(userId, function (user) {
		var keyboard = getKeyboard2(msg);

		store.insert({
			table: 'steps',
			data: {uid: userId, step: 'inout'}
		});

		bot.sendMessage(userId, 'Выберите период', keyboard);
	});
};

function typepie (msg) {
	var userId = msg.from.id;

	checkAuth(userId, function (user) {
		history(user, function (err, operations) {

			var stat = new Stat(operations);

		});
	});
};


function help (msg) {
	var userId = msg.from.id;

	var cmds = [
		'/help Показывает возможности',
		'/inout Паказывает пирожок',
		'/typepie Паказывает граффик пополнений'
	];

	var keyboard = getKeyboard(msg);

	bot.sendMessage(userId, cmds.join('\n'), keyboard);
}

function start (msg) {
	var userId = msg.from.id;
	checkAuth(userId, function (user) {
		var keyboard = getKeyboard(msg);
		bot.sendMessage(userId, 'lol', keyboard);
	});
};

bot.onText(/\/help/, help);
bot.onText(/\/start/, start);
bot.onText(/\/inout/, inout);
bot.onText(/\/typepie/, typepie);

bot.on('message', function (msg) {
	var userId = msg.from.id;

	if (msg.text === 'year' || msg.text === 'month') {

		checkAuth(userId, function (user, step) {
			if (!_.isEmpty(step)) {

				history(user, function (err, operations) {
					var stat = new Stat(operations);

					if(msg.text === 'year'){
						var data = stat.getYearBar(stat.byYear());

						bar(data, function (fname) {
							bot.sendPhoto(userId, fname, {caption: 'Ваши пополнения и снятия с кошелька за год'});
						});
					} else {
						var data = stat.getMonthBar(stat.byMonth(operations));

						bar(data, function (fname) {
							bot.sendPhoto(userId, fname, {caption: 'Ваши пополнения и снятия с кошелька за месяц'});
						});
					}

				});

			}
		});

	}

});

