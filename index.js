'use strict';

var _ = require('lodash');
var ym = require('yandex-money-sdk');
var env = require('node-env-file');
var TelegramBot = require('node-telegram-bot-api');
var Store = require('./lib/db');
var Stat = require('./lib/stat');
var history = require('./lib/history');
var bar = require('./lib/bar');
var pie = require('./lib/pie');

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
			callback(result);
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
		history(user, function (err, operations) {
			var stat = new Stat(operations);

			var data = stat.getYearBar(stat.byYear());

			bar(userId, 'year', data, function (fname) {
				bot.sendPhoto(userId, fname, {caption: 'Ваши пополнения и снятия с кошелька за год'});

				data = stat.getMonthBar(stat.byMonth(operations));

				bar(userId, 'month', data, function (fname) {
					bot.sendPhoto(userId, fname, {caption: 'Ваши пополнения и снятия с кошелька за месяц'});
				});

			});

		});
	});
};

function typepie (msg) {
	var userId = msg.from.id;

	checkAuth(userId, function (user) {
		history(user, function (err, operations) {

			var stat = new Stat(operations);

			var data = stat.getYearPie(stat.byYear());

			pie(userId, 'year', data, function (fname) {
				bot.sendPhoto(userId, fname, {caption: 'Ваши траты за год'});
			});

		});
	});
};


function help (msg) {
	var userId = msg.from.id;

	var cmds = [
		'/help Показывает возможности',
		'/inout Паказывает пирожок',
		'/typepie Паказывает пирожок'
	];

	var keyboard = getKeyboard(msg);

	bot.sendMessage(userId, cmds.join('\n'), keyboard);
}

function start (msg) {
	var userId = msg.from.id;
	checkAuth(userId, function (user) {
		var keyboard = getKeyboard(msg);
		bot.sendMessage(userId, 'https://youtu.be/f_J8QU1m0Ng', keyboard);
	});
};

bot.onText(/\/help/, help);
bot.onText(/\/start/, start);
bot.onText(/\/inout/, inout);
bot.onText(/\/typepie/, typepie);
